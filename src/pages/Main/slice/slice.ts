import { createGenericSlice } from '../../../store/generic-slice';
import { getGreetingsThunk } from './thunks';

export const greetingsSlice = createGenericSlice({
  name: 'greeting',
  extraState: {
    syncActionData: 'init',
  },
  reducers: {
    syncReducer: (state, { payload }: { payload: string }) => ({
      ...state,
      syncActionData: payload,
    }),
  },
  asyncThunk: getGreetingsThunk,
});
