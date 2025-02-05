'use client';

import { useGetCarByIdQuery } from '@/app/state-management/slices/carSlice/car.slice';
import { useParams } from 'next/navigation';
import Spinner from '@/app/components/Loading/Spinner/Spinner';
import { useRouter } from 'next/navigation';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import Header from '@/app/components/Header/Header';
import dynamic from 'next/dynamic';
import GreyAnimation from '@/app/components/Loading/GreyAnimation/GreyAnimation';

const CarCard = dynamic(() => import('@/app/components/CarCard/CarCard'), {
  loading: () => <GreyAnimation />,
  ssr: false,
});

const CarDetailsPage: React.FC = () => {
  const { id } = useParams();

  const router = useRouter();

  const carId = Array.isArray(id) ? id[0] : id;

  const { data: car, isLoading, error } = useGetCarByIdQuery(carId as string);

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
