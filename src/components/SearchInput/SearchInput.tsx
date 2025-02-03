import React, { useEffect, useRef, useState } from 'react';

import type SearchInputProps from './searchInput.props';
import { sanitizeInput } from '@/app/utils/security.utils';

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  searchTerm,
  placeholder = 'Search...',
  buttonText = 'Search',
  autoFocus = false,
}) => {
  const [search, setSearch] = useState<string>(searchTerm);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const cleanedInput = sanitizeInput(search);

    onSearch(cleanedInput);
  };

  return (
    <form onSubmit={handleSubmit} className={'flex gap-2 max-w-md mx-auto $'}>
      <input
        data-testid="search-input"
        type="text"
        value={search}
        ref={inputRef}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
      />
      <button
        data-testid="search-button"
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        aria-label="Submit search"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default SearchInput;
