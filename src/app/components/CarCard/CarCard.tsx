'use client';

import type CarCardProps from './carCard.props';
import Carousel from '../Carousel/Carousel';
import { MapPinIcon } from '@heroicons/react/24/solid';
import React from 'react';

const CarCard: React.FC<CarCardProps> = ({
  car,
  detailed = false,
  handleCarClick,
}) => {
  const {
    id,
    images,
    model,
    price,
    range_km,
    year,
    location,
    accident_description,
    accidents,
    kilometer_count,
    autopilot,
    battery_capacity_kWh,
    charging_speed_kW,
    drivetrain,
    condition,
    color,
    seats,
  } = car;

  const onCarClick = (): void => {
    if (handleCarClick) {
      handleCarClick(id);
    }
  };

  return (
    <div
      className={`group bg-white    ${
        detailed
          ? 'flex flex-col max-w-4xl mx-auto'
          : 'cursor-pointer min-w-[280px] shadow-md hover:shadow-lg transition-all duration-300 h-full'
      }`}
      data-testid="car-card"
    >
      <div className={`${detailed ? 'h-96' : 'aspect-video'} overflow-hidden`}>
        <Carousel images={images} />
      </div>

      <div className="p-6 space-y-4" onClick={onCarClick}>
        <div className="flex justify-between items-start">
          <h2
            className="text-2xl font-bold text-gray-900"
            data-testid="car-name"
          >
            {car.brand} {model}
            <span className="text-gray-500 ml-2 text-lg">({year})</span>
          </h2>
          <span
            className={`bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1   ${
              detailed ? 'hidden' : ''
            }`}
          >
            {condition}
          </span>
        </div>

        <div
          className={` ${
            detailed ? 'grid grid-cols-2 gap-4' : ' grid-cols-1 gap-0'
          }`}
        >
          <div className="space-y-2">
            <p className="flex items-center text-gray-600">
              <span className="w-24 font-medium text-gray-500">Price:</span>
              <span
                className="font-bold text-green-600 text-lg"
                data-testid="car-price"
              >
                {price.toLocaleString()} €
              </span>
            </p>
            <p className="flex items-center text-gray-600">
              <span className="w-24 font-medium text-gray-500">Range:</span>
              <span className="font-semibold" data-testid="car-range">
                {range_km} km
              </span>
            </p>
            <p className="flex items-center text-gray-600">
              <span className="w-24 font-medium text-gray-500">Location:</span>
              <MapPinIcon className="w-5 h-5 mr-1 text-red-500" />
              <span className="truncate" data-testid="car-location">
                {location}
              </span>
            </p>
          </div>

          {detailed && (
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <span className="w-24 font-medium text-gray-500">
                  Drivetrain:
                </span>
                <span className="font-semibold">{drivetrain}</span>
              </p>
              <p className="flex items-center text-gray-600">
                <span className="w-24 font-medium text-gray-500">Color:</span>
                <span className="font-semibold">{color}</span>
              </p>
              <p className="flex items-center text-gray-600">
                <span className="w-24 font-medium text-gray-500">Seats:</span>
                <span className="font-semibold">{seats}</span>
              </p>
            </div>
          )}
        </div>

        {detailed && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="space-y-2">
              <DetailItem label="Accidents" value={accidents ? 'Yes' : 'No'} />
              {accidents && (
                <DetailItem
                  label="Accident Details"
                  value={accident_description ?? 'None'}
                />
              )}
              <DetailItem label="Mileage" value={`${kilometer_count} km`} />
              <DetailItem label="Autopilot" value={autopilot ? 'Yes' : 'No'} />
            </div>
            <div className="space-y-2">
              <DetailItem
                label="Battery"
                value={`${battery_capacity_kWh} kWh`}
              />
              <DetailItem
                label="Charging Speed"
                value={`${charging_speed_kW} kW`}
              />
              <DetailItem label="Color" value={color} />
              <DetailItem label="Interior" value={condition} />
            </div>
          </div>
        )}
        {!detailed && (
          <p className="mt-4 font-semibold text-green-600 text-lg">
            <button className="underline">View Details</button>
          </p>
        )}
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <p className="flex justify-between text-gray-600">
    <span className="text-gray-500 font-medium">{label}:</span>
    <span className="font-semibold">{value}</span>
  </p>
);

export default CarCard;
