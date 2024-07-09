import React, {
  FC, LegacyRef, useCallback, useRef, useState,
} from 'react';
import { type ComponentMeta } from '@storybook/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const VideoStyled = styled.video({
  objectFit: 'cover',
});

export const StoryComponent: FC = () => {
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const [img, setImg] = useState('');

  const handleStartCamera = useCallback(async () => {
    setImg('');
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    });

    if (videoElement.current) {
      Object.assign(videoElement.current, {
        srcObject: cameraStream,
      });

      await videoElement.current?.play();
    }
  }, []);

  const handleStopCamera = useCallback(() => {
    if (videoElement.current) {
      const { srcObject: stream } = videoElement.current;
      if (stream) {
        (stream as MediaStream).getTracks().forEach((track) => {
          track.stop();
        });

        Object.assign(videoElement.current, {
          srcObject: null,
        });
      }
    }
  }, []);

  const handlePhoto = useCallback(async () => {
    if (videoElement.current) {
      const canvas = document.createElement('canvas');

      const {
        videoWidth,
        videoHeight,
      } = videoElement.current;

      canvas.width = videoElement.current?.videoWidth;
      canvas.height = videoElement.current?.videoHeight;

      const context = canvas.getContext('2d', { alpha: false });
      context?.drawImage(
        videoElement.current,
        0,
        0,
        videoWidth,
        videoHeight,
      );

      canvas.toBlob((blob) => {
        if (blob) {
          handleStopCamera();
          setImg(URL.createObjectURL(blob));
        }
      });
    }
  }, [handleStopCamera]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
      >
        <Button variant="contained" onClick={handleStartCamera}>Старт камеры</Button>
        <Box marginLeft={16}>
          <Button variant="outlined" onClick={handleStopCamera}>Стоп камеры</Button>
        </Box>
        <Box marginLeft={16}>
          <Button variant="outlined" onClick={handlePhoto}>Сделать снимок</Button>
        </Box>
      </Box>
      <Box
        zIndex={-1}
        width="100%"
        height="100%"
        position="fixed"
        top={0}
        left={0}
      >
        <VideoStyled
          autoPlay
          muted
          playsInline
          ref={videoElement as LegacyRef<HTMLVideoElement>}
          width="100%"
          height="100%"
        />
      </Box>
      {img
        && (
        <img
          src={img}
          alt="img"
        />
        )}
    </>
  );
};

export default {
  component: StoryComponent,
} as ComponentMeta<typeof StoryComponent>;
