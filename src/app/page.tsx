'use client';

import { useGetCarsQuery } from '@/app/state-management/slices/carSlice/car.slice';
import { useCallback, useMemo, type ReactNode } from 'react';
import type { Car, CarSortValue } from './types/cars.type';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';
import GreyAnimation from '@/app/components/Loading/GreyAnimation/GreyAnimation';

import { carSortOptions } from './static/car.consts';

import {
  filterAbsoluteMaxPrice,
  filterAbsoluteMaxYear,
  filterAbsoluteMinPrice,
  filterAbsoluteMinYear,
} from './static/car.consts';
import Select from '@/app/components/Select/Select';
import Pagination from '@/app/components/Pagination/Pagination';
import Spinner from '@/app/components/Loading/Spinner/Spinner';
import Header from './components/Header/Header';
import dynamic from 'next/dynamic';

const RangeInput = dynamic(
  () => import('@/app/components/RangeInput/RangeInput'),
  {
    loading: () => <GreyAnimation />,
    ssr: false,
  },
);

const CarCard = dynamic(() => import('@/app/components/CarCard/CarCard'), {
  loading: () => <GreyAnimation />,
  ssr: false,
});

export default function Home(): ReactNode {
  const searchParams = useSearchParams();

  const router = useRouter();

  const searchTerm = searchParams.get('search') ?? '';

  const minPrice =
    Number(searchParams.get('minPrice')) || filterAbsoluteMinPrice;

  const maxPrice =
    Number(searchParams.get('maxPrice')) || filterAbsoluteMaxPrice;

  const minYear = Number(searchParams.get('minYear')) || filterAbsoluteMinYear;

  const maxYear = Number(searchParams.get('maxYear')) || filterAbsoluteMaxYear;

  const currentSort = (searchParams.get('sortBy') as CarSortValue) || 'newest';

  const currentPage = Number(searchParams.get('page')) || 1;

  const params = useMemo(
    () => ({
      page: currentPage.toString(),
      search: searchTerm,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      minYear: minYear.toString(),
      maxYear: maxYear.toString(),
      sortBy: currentSort,
    }),
    [searchParams],
  );

  const { data, isLoading } = useGetCarsQuery(params, {
    refetchOnMountOrArgChange: true,
  });

  const updateURL = useCallback(
    (newParams: Partial<typeof params>) => {
      router.push(
        `/?${new URLSearchParams({
          ...params,
          ...newParams,
        })}`,
      );
    },
    [params, router],
  );

  if (!data) {
    return <Spinner />;
  }

  const { cars, totalPages, totalItems } = data;

  const handleSearch = (search: string): void => {
    updateURL({ search, page: '1' });
  };

  const onPriceRangeChange = (min: number, max: number): void => {
    updateURL({ minPrice: min.toString(), maxPrice: max.toString() });
  };

  const onYearRangeChange = (min: number, max: number): void => {
    updateURL({ minYear: min.toString(), maxYear: max.toString() });
  };

  const onSortChange = (sortValue: CarSortValue): void => {
    updateURL({ sortBy: sortValue });
  };

  const handleOnPageChange = (page: number): void => {
    updateURL({ page: page.toString() });
  };

  const handleCarClick = (id: number): void => {
    router.push(`/car/${id}`);
  };

  return (
    <>
      <Header>
        <SearchInput
          onSearch={handleSearch}
          placeholder="Search for a Brand, Model or Location"
          autoFocus
          buttonText="Search Cars"
          {...{ searchTerm }}
        />
      </Header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className=" w-full md:w-64 lg:w-80 shrink-0 space-y-6 bg-white p-4 md:p-6  shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">
            Filter By
          </h2>
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-2 md:mb-3 text-gray-700">
                Price Range (€)
              </h3>
              <RangeInput
                min={minPrice}
                max={maxPrice}
                absoluteMin={filterAbsoluteMinPrice}
                absoluteMax={filterAbsoluteMaxPrice}
                onSubmit={onPriceRangeChange}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 md:mb-3 text-gray-700">
                Year Range
              </h3>
              <RangeInput
                min={minYear}
                max={maxYear}
                absoluteMin={filterAbsoluteMinYear}
                absoluteMax={filterAbsoluteMaxYear}
                onSubmit={onYearRangeChange}
              />
            </div>
          </div>
        </div>
        {isLoading && <Spinner />}
        {cars.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 w-full bg-white">
            <h3 className="text-xl font-semibold text-gray-700">
              No Cars Found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn&apos;t find any cars matching your search. Try adjusting
              your filters or search terms.
            </p>{' '}
          </div>
        )}
        {cars.length > 0 && (
          <div className="flex-1 flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-160px)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Select
                  options={carSortOptions}
                  currentSort={currentSort}
                  onChange={onSortChange}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                {cars.map((car: Car) => (
                  <CarCard key={car.id} {...{ car, handleCarClick }} />
                ))}
              </div>
            </div>

            <div className=" mt-4 bg-white p-4  shadow-sm">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handleOnPageChange}
                disabled={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
