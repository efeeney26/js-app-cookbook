import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Global, ThemeProvider } from '@emotion/react';

import { store } from './store';
import { Main } from './pages';
import { getGlobalStyles } from './utils';

const theme = {
  colors: {
    primary: 'hotpink',
  },
};

const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Global styles={getGlobalStyles} />
      <Main />
    </ThemeProvider>
  </Provider>
);

export default App;
