import type { CarApiResponse } from '@/app/types/cars.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCars: builder.query<CarApiResponse, { search: string }>({
      query: ({ search }) => ({
        url: 'cars',
        params: {
          search,
        },
      }),
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
