import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GreetingsRs } from './types/greetings';

export const {
  reducer,
  reducerPath,
  middleware,
  useLazyGetGreetingsQuery,
} = createApi({
  reducerPath: 'cookbook',
  baseQuery: fetchBaseQuery(
    {
      baseUrl: '/api',
    },
  ),
  endpoints: (builder) => ({
    getGreetings: builder.query<GreetingsRs, void>({
      query: () => ({
        url: '/greetings',
      }),
    }),
  }),
});
