import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { type ComponentMeta } from '@storybook/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Camera } from './models';
import { Camera as CameraComponent } from './components/Camera';
import { Constraints } from './models/types';

export const StoryComponent: FC<Constraints> = ({ cameraWidth, cameraHeight }) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  // фото
  const [frameCanvasData, setFrameCanvasData] = useState<{ width: number, height: number }>();
  const [frameBlob, setFrameBlob] = useState<Blob>();

  // видео
  const [videoConstraints, setVideoConstraints] = useState<string>();
  const [videoSetting, setVideoSettings] = useState<string>();
  const [videoCapabilities, setVideoCapabilities] = useState<string>();

  const [error, setError] = useState<string>();

  const [isCameraInit, setIsCameraInit] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCameraPaused, setIsCameraPaused] = useState(false);

  const initCamera = useCallback(() => {
    if (videoElementRef.current) {
      cameraRef.current = new Camera({
        videoElement: videoElementRef.current,
      });
      setIsCameraInit(true);
    } else {
      setError('Видеоэлемент не проинициализирован');
    }
  }, []);

  useEffect(() => {
    initCamera();
  }, [initCamera]);

  useEffect(() => {
    setVideoConstraints(JSON.stringify({
      cameraWidth,
      cameraHeight,
    }));
  }, [cameraHeight, cameraWidth]);

  const handleStartCamera = useCallback(async () => {
    setFrameBlob(undefined);
    setError(undefined);

    if (isCameraInit) {
      try {
        await cameraRef.current?.startCamera({
          cameraWidth,
          cameraHeight,
        });

        setIsCameraStarted(true);
      } catch (errorStart) {
        setError((errorStart as Error).message);
        setIsCameraStarted(false);
      }
    }
  }, [cameraHeight, cameraWidth, isCameraInit]);

  const handleStopCamera = useCallback(() => {
    cameraRef.current?.stopCamera();
    setIsCameraStarted(false);
  }, []);

  const handleGetFrame = useCallback(async () => {
    const videoTrack = (videoElementRef.current?.srcObject as MediaStream)?.getVideoTracks()[0];
    setVideoSettings(JSON.stringify(videoTrack.getSettings()));
    setVideoCapabilities(JSON.stringify(videoTrack.getCapabilities()));

    const frameCanvas = cameraRef.current?.getFrameCanvas();

    if (frameCanvas) {
      setFrameCanvasData({
        width: frameCanvas.width,
        height: frameCanvas.height,
      });
      frameCanvas.toBlob((blob) => {
        if (blob) {
          handleStopCamera();
          setFrameBlob(blob);
        }
      });
    }
  }, [handleStopCamera]);

  const handlePause = useCallback(() => {
    cameraRef?.current?.pauseCamera();
    setIsCameraPaused(true);
  }, []);

  const handleResume = useCallback(async () => {
    await cameraRef.current?.resumeCamera();
    setIsCameraPaused(false);
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
      >
        {isCameraStarted
          ? (
            <>
              <Button variant="outlined" onClick={handleStopCamera}>Стоп камеры</Button>
              <Box marginLeft={16}>
                <Button variant="outlined" onClick={handleGetFrame}>Сделать снимок</Button>
              </Box>
              <Box marginLeft={16}>
                <Button variant="outlined" onClick={handlePause}>Пауза</Button>
              </Box>
              {
                isCameraPaused
                && (
                <Box marginLeft={16}>
                  <Button variant="outlined" onClick={handleResume}>Возобновить</Button>
                </Box>
                )
              }
            </>
          )
          : (
            <Button variant="contained" onClick={handleStartCamera}>Старт камеры</Button>
          )}
      </Box>
      <Box
        zIndex={-1}
        width="100%"
        height="100%"
        position="fixed"
        top={0}
        left={0}
      >
        <CameraComponent
          ref={videoElementRef}
        />
      </Box>
      {error
        && (
        <Alert severity="error">{error}</Alert>
        )}
      {frameBlob && frameCanvasData
        && (
          <>
            <Typography>Фото:</Typography>
            <Typography>{ `Размер: ${frameBlob.size / 1e6} Мб`}</Typography>
            <Typography>{ `Ширина: ${frameCanvasData?.width}`}</Typography>
            <Typography>{ `Высота: ${frameCanvasData?.height}`}</Typography>
            <br />
            <br />
            <Typography>Камера:</Typography>
            <Typography>{`Возможности: ${videoCapabilities}`}</Typography>
            <br />
            <Typography>{`Настройки: ${videoSetting}`}</Typography>
            <img
              src={URL.createObjectURL(frameBlob)}
              alt="img"
            />
          </>
        )}
    </>
  );
};

export default {
  component: StoryComponent,
  args: {
    cameraWidth: undefined,
    cameraHeight: undefined,
  },
} as ComponentMeta<typeof StoryComponent>;
