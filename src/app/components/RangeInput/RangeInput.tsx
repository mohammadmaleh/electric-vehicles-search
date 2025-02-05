import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type RangeInputProps from './rangeInput.props';

const rangeSchema = yup.object().shape({
  min: yup
    .number()
    .min(0, 'Minimum value cannot be negative')

    .required('Minimum value is required')
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    ),
  max: yup
    .number()
    .min(0, 'Maximum value cannot be negative')
    .required('Maximum value is required')
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .test(
      'is-greater-or-equal',
      'Maximum value must be greater than or equal to minimum',
      function (value) {
        const min = this.parent.min;

        return typeof min === 'number' && typeof value === 'number'
          ? value >= min
          : true;
      },
    ),
});

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  absoluteMin,
  absoluteMax,
  onSubmit,
  minLabel = 'Minimum',
  maxLabel = 'Maximum',
  submitLabel = 'Apply',
  dataTestIdLabel = '',
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { min, max },
    resolver: yupResolver(rangeSchema),
  });

  const onFormSubmit = (data: { min: number; max: number }): void => {
    onSubmit(data.min, data.max);
  };

  return (
    <div className="my-2">
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
                  data-testid={`range-input-min-${dataTestIdLabel}`}
                  type="number"
                  min={absoluteMin}
                  max={absoluteMax}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-700"
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
                  data-testid={`range-input-max-${dataTestIdLabel}`}
                  type="number"
                  min={absoluteMin}
                  max={absoluteMax}
                  className="w-full rounded-md border-red-500 shadow-sm  text-gray-600 "
                />
              )}
            />
          </div>
        </div>
        {errors.min && (
          <p className="text-sm text-red-600 mt-1">{errors.min.message}</p>
        )}
        {errors.max && (
          <p className="text-sm text-red-600 mt-1">{errors.max.message}</p>
        )}

        <button
          data-testid={`range-input-submit-${dataTestIdLabel}`}
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default RangeInput;
