import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { type ComponentMeta } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const StoryComponent: FC = () => {
  const index = useRef(0);

  const [transcription, setTranscription] = useState<string>();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'ru';

    recognition.onresult = (event) => {
      const { transcript } = event.results[index.current][0];
      index.current += 1;
      setTranscription((prev) => `${prev ?? ''} ${transcript}`);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error detected:', event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Typography>{transcription}</Typography>
    </Box>
  );
};

export default {
  component: StoryComponent,
} as ComponentMeta<typeof StoryComponent>;
