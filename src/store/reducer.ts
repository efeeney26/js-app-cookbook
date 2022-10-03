import { combineReducers } from '@reduxjs/toolkit';
import { greetingsSlice } from '../pages/Demo/slice/slice';

export const reducer = combineReducers({
  greetings: greetingsSlice.reducer,
});
