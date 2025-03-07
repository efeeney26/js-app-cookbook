import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { type ComponentMeta } from '@storybook/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { Camera as CameraComponent } from './components/Camera';
import { useCamera } from './hooks/useCamera';
// import { main } from './models/GigaChat';

interface StoryComponentProps {
  mediaTrackConstraints?: MediaTrackConstraints;
  canvasRenderingContext2DSettings?: CanvasRenderingContext2DSettings;
}

export const StoryComponent: FC<StoryComponentProps> = ({
  mediaTrackConstraints,
  canvasRenderingContext2DSettings,
}) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const index = useRef(0);

  const {
    isCameraInit,
    isCameraStarted,
    isCameraPaused,
    startCamera,
    resumeCamera,
    pauseCamera,
    getFrameCanvas,
    stopCamera,
    error,
    getCameraSettings,
    getCameraCapabilities,
  } = useCamera(videoElementRef);

  // фото
  const [frameCanvasData, setFrameCanvasData] = useState<{ width: number, height: number }>();
  const [frameBlob, setFrameBlob] = useState<Blob>();

  // видео
  const [videoConstraints, setVideoConstraints] = useState<string>();
  const [videoSetting, setVideoSettings] = useState<string>();
  const [videoCapabilities, setVideoCapabilities] = useState<string>();

  const [frameCheck, setFrameCheck] = useState<string>();

  useEffect(() => {
    if (isCameraStarted) {
      setVideoConstraints(JSON.stringify(mediaTrackConstraints, null, '\t'));
      setVideoSettings(JSON.stringify(getCameraSettings(), null, '\t'));
      setVideoCapabilities(JSON.stringify(getCameraCapabilities(), null, '\t'));
    }
  }, [getCameraCapabilities, getCameraSettings, isCameraStarted, mediaTrackConstraints]);

  useEffect(() => {
    // не работает в браузере из-за того, что при авторизации не обрабатывается метод OPTIONS
    // void main();
  }, []);

  const handleCheckFrame = useCallback(async (photo: Blob) => {
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      const response = await axios.post<Record<string, string>>(
        'http://localhost:8080/api/giga',
        formData,

      );
      setFrameCheck(response.data.gigaResponse);
    } catch (error) {
      console.error(error);
      // ignore
    }
  }, []);

  useEffect(() => {
    if (frameBlob) {
      void handleCheckFrame(frameBlob);
    }
  }, [frameBlob, handleCheckFrame]);

  const handleStartCamera = useCallback(async () => {
    setFrameBlob(undefined);
    setFrameCanvasData(undefined);
    setFrameCheck(undefined);

    if (isCameraInit) {
      await startCamera(mediaTrackConstraints);
    }
  }, [isCameraInit, mediaTrackConstraints, startCamera]);

  const handleGetFrameCanvas = useCallback(async () => {
    const frameCanvas = getFrameCanvas(canvasRenderingContext2DSettings);

    if (frameCanvas) {
      setFrameCanvasData({
        width: frameCanvas.width,
        height: frameCanvas.height,
      });
      frameCanvas.toBlob((blob) => {
        if (blob) {
          stopCamera();
          setFrameBlob(blob);
        }
      });
    }
  }, [canvasRenderingContext2DSettings, getFrameCanvas, stopCamera]);

  useEffect(() => () => {
    stopCamera();
  }, [stopCamera]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
      >
        {isCameraStarted
          && (
            <>
              <Button variant="outlined" onClick={stopCamera}>Стоп камеры</Button>
              <Box marginLeft={16}>
                <Button variant="outlined" onClick={handleGetFrameCanvas}>Сделать снимок</Button>
              </Box>
              <Box marginLeft={16}>
                <Button variant="outlined" onClick={pauseCamera}>Пауза</Button>
              </Box>
              {
                isCameraPaused
                && (
                <Box marginLeft={16}>
                  <Button variant="outlined" onClick={resumeCamera}>Возобновить</Button>
                </Box>
                )
              }
            </>
          )}
      </Box>
      {!isCameraStarted && (
        <>
          <Button variant="contained" onClick={handleStartCamera}>Старт камеры</Button>
          {videoCapabilities && videoSetting
            && (
              <>
                <Typography>Камера:</Typography>
                <Typography>{`Переданные ограничения: ${videoConstraints ?? 'Не переданы'}`}</Typography>
                <Typography>{`Возможности: ${videoCapabilities}`}</Typography>
                <Typography>{`Конечные настройки: ${videoSetting}`}</Typography>
                <br />
                <br />
              </>
            )}
          {frameBlob && frameCanvasData
            && (
              <>
                <Typography>Фото:</Typography>
                <Typography>{ `Размер: ${frameBlob.size / 1e6} Мб`}</Typography>
                <Typography>{ `Расширение: ${frameBlob.type}`}</Typography>
                <Typography>{ `Ширина: ${frameCanvasData?.width}`}</Typography>
                <Typography>{ `Высота: ${frameCanvasData?.height}`}</Typography>
                <Typography>{frameCheck}</Typography>
                <img
                  src={URL.createObjectURL(frameBlob)}
                  alt="img"
                />
              </>
            )}
          {error
            && (
              <Alert severity="error">{error}</Alert>
            )}
        </>
      )}
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
    </>
  );
};

export default {
  component: StoryComponent,
  argTypes: {
    mediaTrackConstraints: {
      control: {
        type: 'object',
        value: {
          deviceId: {
            exact: undefined,
            ideal: undefined,
          },
          groupId: {
            exact: undefined,
            ideal: undefined,
          },
          aspectRatio: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          facingMode: {
            exact: undefined,
            ideal: undefined,
          },
          frameRate: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          height: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          width: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          resizeMode: {
            exact: undefined,
            ideal: undefined,
          },
        },
      },
    },
  },
} as ComponentMeta<typeof StoryComponent>;
