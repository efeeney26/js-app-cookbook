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

export const StoryComponent: FC = () => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [error, setError] = useState<string>();
  const [frameBlob, setFrameBlob] = useState<Blob>();
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

  const handleStartCamera = useCallback(async () => {
    setFrameBlob(undefined);
    setError(undefined);

    if (isCameraInit) {
      try {
        await cameraRef.current?.startCamera();

        setIsCameraStarted(true);
      } catch (errorStart) {
        setError((errorStart as Error).message);
        setIsCameraStarted(false);
      }
    }
  }, [isCameraInit]);

  const handleStopCamera = useCallback(() => {
    cameraRef.current?.stopCamera();
    setIsCameraStarted(false);
  }, []);

  const handleGetFrame = useCallback(async () => {
    const frame = cameraRef.current?.getFrame();

    if (frame) {
      frame.toBlob((blob) => {
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
      {frameBlob
        && (
          <>
            <Typography>{ `Размер фото: ${frameBlob.size / 1e6} Мб`}</Typography>
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
} as ComponentMeta<typeof StoryComponent>;
