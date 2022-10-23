import { createSlice } from '@reduxjs/toolkit';

export const syncSlice = createSlice({
  name: 'sync',
  initialState: {
    syncActionData: '',
  },
  reducers: {
    syncReducer: (state, { payload }: { payload: string }) => ({
      ...state,
      syncActionData: payload,
    }),
  },
});
