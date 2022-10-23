import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../store/store';

export const getSyncData = createSelector(
  [
    (state: RootState) => state.sync.syncActionData,
  ],
  (data) => data,
);
