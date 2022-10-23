import { combineReducers } from '@reduxjs/toolkit';

import { reducerPath, reducer as apiReducer } from '../services';
import { syncSlice } from '../pages/Demo/slice/slice';

export const reducer = combineReducers({
  sync: syncSlice.reducer,
  [reducerPath]: apiReducer,
});
