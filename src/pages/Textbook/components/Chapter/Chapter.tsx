import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

interface ChapterProps {
  title: string
}

const Chapter: FC<ChapterProps> = ({ title, children }) => (
  <Paper elevation={3}>
    <List
      subheader={(
        <ListSubheader component={Typography} variant="h6">
          {title}
        </ListSubheader>
      )}
    >
      {children}
    </List>
  </Paper>
);

export default Chapter;
