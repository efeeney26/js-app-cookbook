import React, { FC, useCallback, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

interface TaskProps {
  title: string;
  link: string;
  solution: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Task: FC<TaskProps> = ({ title, link, solution }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <Typography>{title}</Typography>
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Link href={link} target="_blank" rel="noopener">Ссылка</Link>
          <Box mt={3}>
            <Typography>
              Решение:
              <br />
              <code>
                {solution}
              </code>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
