'use client';

import type { ReactNode } from 'react';
import type CarCardProps from './carCard.props';
import Carousel from '../Carousel/Carousel';

const CarCard = ({ car }: CarCardProps): ReactNode => {
  const { images, model, price, range_km, year, location } = car;

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
      data-testid="car-card"
    >
      <Carousel images={images} />
      <div className="p-4">
        <h2
          className="text-xl font-semibold text-gray-800"
          data-testid="car-name"
        >
          {car.brand} {model} <span className="text-gray-500">({year})</span>
        </h2>

        <div className="mt-3 space-y-2">
          <p
            className="flex items-center text-gray-600"
            data-testid="car-price"
          >
            <span className="inline-block w-20">Price:</span>
            <span className="font-medium text-blue-600">
              ${price.toLocaleString()}
            </span>
          </p>
          <p
            className="flex items-center text-gray-600"
            data-testid="car-range"
          >
            <span className="inline-block w-20">Range:</span>
            <span>{range_km} km</span>
          </p>
          <p
            className="flex items-center text-gray-600"
            data-testid="car-location"
          >
            <span className="inline-block w-20">Location:</span>
            <span className="flex items-center">{location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
