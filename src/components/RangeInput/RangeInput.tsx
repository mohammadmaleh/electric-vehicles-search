import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const rangeSchema = yup.object().shape({
  min: yup
    .number()
    .min(0, 'Minimum value cannot be negative')
    .required('Minimum value is required'),
  max: yup
    .number()
    .min(0, 'Maximum value cannot be negative')
    .required('Maximum value is required'),
});

type RangeInputProps = {
  min: number;
  max: number;
  absoluteMin: number;
  absoluteMax: number;
  onSubmit: (min: number, max: number) => void;
  minLabel?: string;
  maxLabel?: string;
  submitLabel?: string;
  className?: string;
};

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  absoluteMin,
  absoluteMax,
  onSubmit,
  minLabel = 'Minimum',
  maxLabel = 'Maximum',
  submitLabel = 'Apply',
  className = '',
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { min, max },
    resolver: yupResolver(rangeSchema),
  });

  const onFormSubmit = (data: { min: number; max: number }): void => {
    onSubmit(data.min, data.max);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              {minLabel}
            </label>
            <Controller
              name="min"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  data-testid="range-input-min"
                  type="number"
                  min={absoluteMin}
                  max={absoluteMax}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              {maxLabel}
            </label>
            <Controller
              name="max"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  data-testid="range-input-max"
                  type="number"
                  min={absoluteMin}
                  max={absoluteMax}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            />
          </div>
        </div>

        <button
          data-testid="range-input-submit"
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default RangeInput;
