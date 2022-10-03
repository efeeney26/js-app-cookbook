import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';

import { store } from './store';
import { getGlobalStyles } from './utils';
import { Routes } from './routes/Routes';

const theme = {
  colors: {},
};

const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Global styles={getGlobalStyles} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
