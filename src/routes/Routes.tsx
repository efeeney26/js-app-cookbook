import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Main, Demo, Textbook } from '../pages';

export const Routes = () => useRoutes([
  {
    path: '',
    element: <Main />,
  },
  {
    path: 'demo',
    element: <Demo />,
  },
  {
    path: 'textbook',
    element: <Textbook />,
  },
]);
