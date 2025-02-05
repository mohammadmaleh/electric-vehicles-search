import type { Car } from '@/app/types/cars.type';

interface CarCardProps {
  car: Car;
  detailed?: boolean;
  handleCarClick?: (id: number) => void;
}

export default CarCardProps;
