import { combineReducers } from '@reduxjs/toolkit';
import { greetingsSlice } from '../pages/Main/slice/slice';

export const reducer = combineReducers({
  greetings: greetingsSlice.reducer,
});
