'use client';

import { useGetCarByIdQuery } from '@/app/state-management/slices/carSlice/car.slice';
import { useParams } from 'next/navigation';
import CarCard from '@/app/components/CarCard/CarCard';
import Spinner from '@/app/components/Spinner/Spinner';
import { useRouter } from 'next/navigation';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import Header from '@/app/components/Header/Header';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams();

  const router = useRouter();

  const { data: car, isLoading, error } = useGetCarByIdQuery(id);

  if (isLoading) return <Spinner />;

  if (error || !car)
    return <p className="text-center text-red-500">Car not found</p>;

  const handleSearch = (search: string): void => {
    router.push(`/?search=${search}`);
  };

  return (
    <>
      <Header>
        <SearchInput
          onSearch={handleSearch}
          placeholder="Search for a Brand, Model or Location"
          autoFocus
          buttonText="Search Cars"
        />
      </Header>
      <CarCard car={car} detailed />
    </>
  );
};

export default CarDetailsPage;
