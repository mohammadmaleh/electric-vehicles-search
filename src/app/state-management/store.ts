import { carsApi } from './slices/carSlice/car.slice';
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});
