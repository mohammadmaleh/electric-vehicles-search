import React, { useState } from 'react';
import type SelectProps from './select.props';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Select = <T extends string>({
  options,
  currentSort,
  onChange,
}: SelectProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((opt) => opt.value === currentSort) || options[0];

  const handleSelect = (value: T): void => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        data-testid="sort-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedOption.label}
        <ChevronDownIcon
          data-testid="select-icon"
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                data-testid={`option-${option.value}`}
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                  option.value === currentSort
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
