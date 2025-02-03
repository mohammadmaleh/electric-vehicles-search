'use client';

import { useGetCarsQuery } from '@/app/state-management/slices/carSlice/car.slice';
import CarCard from '@/components/CarCard/CarCard';
import { useState, type ReactNode } from 'react';
import type { Car } from './types/cars.type';
import SearchInput from '@/components/SearchInput/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';
import RangeInput from '@/components/RangeInput/RangeInput';

import {
  filterAbsoluteMaxPrice,
  filterAbsoluteMaxYear,
  filterAbsoluteMinPrice,
  filterAbsoluteMinYear,
} from './utils/consts';

export default function Home(): ReactNode {
  const searchParams = useSearchParams();

  const router = useRouter();

  const getInitialNumberValue = (
    searchParams: URLSearchParams,
    paramName: string,
    defaultValue: number,
  ): number => {
    const param = searchParams.get(paramName);

    return param !== null && param.trim() !== '' ? Number(param) : defaultValue;
  };

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') ?? '',
  );

  const [minPrice, setMinPrice] = useState<number>(() =>
    getInitialNumberValue(searchParams, 'minPrice', filterAbsoluteMinPrice),
  );

  const [maxPrice, setMaxPrice] = useState<number>(() =>
    getInitialNumberValue(searchParams, 'maxPrice', filterAbsoluteMaxPrice),
  );

  const [minYear, setMinYear] = useState<number>(() =>
    getInitialNumberValue(searchParams, 'minYear', filterAbsoluteMinYear),
  );

  const [maxYear, setMaxYear] = useState<number>(() =>
    getInitialNumberValue(searchParams, 'maxYear', filterAbsoluteMaxYear),
  );

  const { data, isLoading, error } = useGetCarsQuery({
    search: searchTerm,
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
    minYear: minYear.toString(),
    maxYear: maxYear.toString(),
  });

  const submitSearch = (): void => {
    const params = {
      search: searchTerm,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      minYear: minYear.toString(),
      maxYear: maxYear.toString(),
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

  const onYearRangeChange = (min: number, max: number): void => {
    setMinYear(min);
    setMaxYear(max);
    submitSearch();
  };

  return (
    <div>
      <RangeInput
        min={minPrice}
        max={maxPrice}
        absoluteMin={filterAbsoluteMinPrice}
        absoluteMax={filterAbsoluteMaxPrice}
        onSubmit={onPriceRangeChange}
      />
      <RangeInput
        min={minYear}
        max={maxYear}
        absoluteMin={filterAbsoluteMinYear}
        absoluteMax={filterAbsoluteMaxYear}
        onSubmit={onYearRangeChange}
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
