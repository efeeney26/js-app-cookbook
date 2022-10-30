import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider, createTheme, responsiveFontSizes,
} from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { store } from './store';
import { getGlobalStyles } from './styles';
import { Routes } from './routes/Routes';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={getGlobalStyles} />
      <CssBaseline />
      <Container maxWidth="xl">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  </Provider>
);

export default App;
