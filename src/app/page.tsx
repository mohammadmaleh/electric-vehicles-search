'use client';

import { useGetCarsQuery } from '@/app/state-management/slices/carSlice/car.slice';
import CarCard from '@/components/CarCard/CarCard';
import type { ReactNode } from 'react';
import type { Car } from './types/cars.type';

export default function Home(): ReactNode {
  const { data, isLoading, error } = useGetCarsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  const { cars } = data;

  console.log(cars);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car: Car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
