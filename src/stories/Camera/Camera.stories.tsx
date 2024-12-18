import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { type ComponentMeta } from '@storybook/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Camera as CameraComponent } from './components/Camera';
import { useCamera } from './hooks/useCamera';

interface StoryComponentProps {
  mediaTrackConstraints?: MediaTrackConstraints;
  canvasRenderingContext2DSettings?: CanvasRenderingContext2DSettings;
}

export const StoryComponent: FC<StoryComponentProps> = ({
  mediaTrackConstraints,
  canvasRenderingContext2DSettings,
}) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (isCameraStarted) {
      setVideoConstraints(JSON.stringify(mediaTrackConstraints, null, '\t'));
      setVideoSettings(JSON.stringify(getCameraSettings(), null, '\t'));
      setVideoCapabilities(JSON.stringify(getCameraCapabilities(), null, '\t'));
    }
  }, [getCameraCapabilities, getCameraSettings, isCameraStarted, mediaTrackConstraints]);

  const handleStartCamera = useCallback(async () => {
    setFrameBlob(undefined);
    setFrameCanvasData(undefined);

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
          aspectRatio: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          autoGainControl: {
            exact: undefined,
            ideal: undefined,
          },
          channelCount: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          deviceId: {
            exact: undefined,
            ideal: undefined,
          },
          echoCancellation: {
            exact: undefined,
            ideal: undefined,
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
          groupId: {
            exact: undefined,
            ideal: undefined,
          },
          height: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          latency: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          noiseSuppression: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          sampleRate: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          sampleSize: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
          suppressLocalAudioPlayback: {
            exact: undefined,
            ideal: undefined,
          },
          width: {
            exact: undefined,
            ideal: undefined,
            min: undefined,
            max: undefined,
          },
        },
      },
    },
  },
} as ComponentMeta<typeof StoryComponent>;
