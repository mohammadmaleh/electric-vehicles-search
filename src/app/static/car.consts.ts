import type { CarSortOption } from '../types/cars.type';

export const filterAbsoluteMinPrice = 0;

export const filterAbsoluteMaxPrice = 1000000;

export const filterAbsoluteMinYear = 1980;

export const filterAbsoluteMaxYear = new Date().getFullYear();

export const carSortOptions: CarSortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];
