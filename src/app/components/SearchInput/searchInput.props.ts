interface SearchInputProps {
  onSearch: (query: string) => void;
  searchTerm: string;
  placeholder?: string;
  autoFocus?: boolean;
  buttonText?: string;
}

export default SearchInputProps;
