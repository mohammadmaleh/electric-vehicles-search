import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => ({
        url: 'cars',
      }),
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
