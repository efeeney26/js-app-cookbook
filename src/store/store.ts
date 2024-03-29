import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer';
import { middleware as apiMiddleware } from '../services';

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => ([
    ...getDefaultMiddleware(),
    apiMiddleware,
  ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
