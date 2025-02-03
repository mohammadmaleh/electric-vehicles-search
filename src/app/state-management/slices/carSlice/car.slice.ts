import type { CarApiResponse } from '@/app/types/cars.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCars: builder.query<
      CarApiResponse,
      {
        search: string;
        minPrice: string;
        maxPrice: string;
        minYear: string;
        maxYear: string;
        sortBy: string;
      }
    >({
      query: ({ search, minPrice, maxPrice, minYear, maxYear, sortBy }) => ({
        url: 'cars',
        params: {
          search,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          sortBy,
        },
      }),
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
