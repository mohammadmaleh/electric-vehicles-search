interface SelectProps<T extends string> {
  options: { value: T; label: string }[];
  currentSort?: T;
  onChange: (sortValue: T) => void;
}

export default SelectProps;
