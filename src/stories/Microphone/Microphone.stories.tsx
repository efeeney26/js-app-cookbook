import React, {
  type FC, useCallback, useEffect, useRef, useState,
} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { type ComponentMeta } from '@storybook/react';
import { Microphone } from '.';

export const StoryComponent: FC<{ fileExtension?: string; timeslice?: number }> = (args) => {
  const { fileExtension, timeslice } = args;
  const microphone = useRef(new Microphone());
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [isNativeRecognitionStart, setIsNativeRecognitionStart] = useState(false);
  const nativeRecognitionIndex = useRef(0);
  const [transcription, setTranscription] = useState('');

  const startRecord = useCallback(async () => {
    setAudioBlob(undefined);
    try {
      await microphone.current.startRecording({ timeslice });
    } catch (error) {
      console.error(error);
    }
  }, [microphone, timeslice]);

  const stopRecord = useCallback(async () => {
    try {
      const audioBlob = await microphone.current.stopRecording(fileExtension);
      setAudioBlob(audioBlob);
      console.info(audioBlob);
    } catch (error) {
      console.error(error);
    }
  }, [fileExtension, microphone]);

  const handleStartNativeRecognizer = useCallback(async () => {
    setIsNativeRecognitionStart(true);
  }, []);

  useEffect(() => {
    if (isNativeRecognitionStart) {
      const nativeRecognizer = microphone.current.getNativeRecognizer();
      if (nativeRecognizer) {
        nativeRecognizer.onresult = (event) => {
          const { transcript } = event.results[nativeRecognitionIndex.current][0];
          nativeRecognitionIndex.current += 1;
          setTranscription((prev) => `${prev} ${transcript}`);
        };

        nativeRecognizer.onerror = (event) => {
          console.error('Speech recognition error detected:', event.error);
        };

        nativeRecognizer.start();
      }
    }
  }, [isNativeRecognitionStart]);

  const handleStopNativeRecognizer = useCallback(() => {
    microphone.current.nativeRecognizerStop();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Button variant="contained" onClick={startRecord}> Начать запись </Button>
        <Button variant="contained" onClick={stopRecord}> Остановить запись </Button>
      </Box>
      <Box>
        <Button variant="contained" onClick={handleStartNativeRecognizer}>Начать распознование речи(нативный распознователь)</Button>
        <Button variant="contained" onClick={handleStopNativeRecognizer}>Закончить распознование речи(нативный распознователь)</Button>
      </Box>
      {audioBlob
        && (
          <div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={URL.createObjectURL(audioBlob)} controls />
          </div>
        )}
      {transcription
        && (
          <Typography>
            {transcription}
          </Typography>
        )}
    </Box>
  );
};
export default {
  component: StoryComponent,
  args: {
    fileExtension: 'mp3',
    timeslice: undefined,
  },
} as ComponentMeta<typeof StoryComponent>;
