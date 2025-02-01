'use client';

import { useGetCarsQuery } from '@/state-management/slices/carSlice/car.slice';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  const { data } = useGetCarsQuery({});

  console.log(data);

  return <div>home</div>;
}
