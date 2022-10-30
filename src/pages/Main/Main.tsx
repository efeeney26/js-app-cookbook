import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import { navigation } from '../../routes/navigation';

const Main: FC = () => (
  <Box pt={3} minHeight="100vh">
    <Typography variant="h3">Привет, это главная</Typography>
    {navigation.map(({ to, title }) => (
      <Link key={to} to={to} component={RouterLink}>
        <Typography variant="subtitle1">{title}</Typography>
      </Link>
    ))}

  </Box>
);

export default Main;
