export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  range_km: number;
  color: string;
  condition: string;
  battery_capacity_kWh: number;
  charging_speed_kW: number;
  seats: number;
  drivetrain: string;
  location: string;
  autopilot: boolean;
  kilometer_count: number;
  accidents: boolean;
  accident_description?: string;
  images: string[];
}
export interface CarsDBResponse {
  count: number;
  data: Car[];
}

export interface CarApiResponse {
  count: number;
  cars: Car[];
}
