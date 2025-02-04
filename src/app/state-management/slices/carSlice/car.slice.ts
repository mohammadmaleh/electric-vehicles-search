import type { CarApiResponse } from '@/app/types/cars.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CarQueryParams {
  page: string;
  search?: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  sortBy: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
});

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery,
  tagTypes: ['CarList'],
  endpoints: (builder) => ({
    getCars: builder.query<CarApiResponse, CarQueryParams>({
      query: (params) => {
        return {
          url: 'cars',
          params,
        };
      },
      providesTags: ['CarList'],
      keepUnusedDataFor: 300,
    }),
    getCarByID: builder.query<CarApiResponse, string>({
      query: (id) => {
        return {
          url: `cars/${id}`,
        };
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
