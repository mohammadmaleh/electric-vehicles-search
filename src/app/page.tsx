'use client';

import { useGetCarsQuery } from '@/app/state-management/slices/carSlice/car.slice';
import CarCard from '@/components/CarCard/CarCard';
import { useState, type ReactNode } from 'react';
import type { Car } from './types/cars.type';
import SearchInput from '@/components/SearchInput/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';
import RangeInput from '@/components/RangeInput/RangeInput';

export default function Home(): ReactNode {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') ?? '',
  );

  const [minPrice, setMinPrice] = useState<number>(
    Number(searchParams.get('minPrice')) ?? 0,
  );

  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const param = searchParams.get('maxPrice');

    return param !== null && param.trim() !== '' ? Number(param) : 99999999;
  });

  const { data, isLoading, error } = useGetCarsQuery({
    search: searchTerm,
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
  });

  const submitSearch = (): void => {
    const params = {
      search: searchTerm,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
    };

    router.push(`/?${new URLSearchParams(params).toString()}`);
  };

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

  const onSearch = (searchText: string): void => {
    setSearchTerm(searchText);
    submitSearch();
  };

  const onPriceRangeChange = (min: number, max: number): void => {
    setMinPrice(min);
    setMaxPrice(max);
    submitSearch();
  };

  console.log({ minPrice, maxPrice });

  return (
    <div>
      <RangeInput
        min={minPrice}
        max={maxPrice}
        absoluteMin={100}
        absoluteMax={1000000000}
        onSubmit={onPriceRangeChange}
      />
      <SearchInput
        {...{ onSearch, searchTerm }}
        placeholder="Search for a Bran, Model or Location"
        autoFocus
        buttonText="Search Cars"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car: Car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
