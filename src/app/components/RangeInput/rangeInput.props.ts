interface RangeInputProps {
  min: number;
  max: number;
  absoluteMin: number;
  absoluteMax: number;
  onSubmit: (min: number, max: number) => void;
  minLabel?: string;
  maxLabel?: string;
  submitLabel?: string;
}

export default RangeInputProps;
