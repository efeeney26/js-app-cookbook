import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Chapter, Section, Task } from './components';
import { TEXTBOOK_STRUCTURE } from './constants';

export const Textbook: FC = () => (
  <Box pt={3} minHeight="100vh">
    <Typography variant="h3">Учебник</Typography>
    <Box mt={3}>
      <Stack direction="row" spacing={3}>
        {TEXTBOOK_STRUCTURE.map(({ title, sections }) => (
          <Chapter key={title} title={title}>
            {sections.map(({ title: sectionTitle, tasks }) => (
              <Section key={sectionTitle} title={sectionTitle}>
                {tasks.map(({ title: taskTitle, link, solution }) => (
                  <Task key={title} title={taskTitle} link={link} solution={solution} />
                ))}
              </Section>
            ))}
          </Chapter>
        ))}
      </Stack>
    </Box>
  </Box>
);

export default Textbook;
