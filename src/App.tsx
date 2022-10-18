import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider, createTheme,
} from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { store } from './store';
import { getGlobalStyles } from './styles';
import { Routes } from './routes/Routes';

const theme = createTheme();

const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={getGlobalStyles} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
