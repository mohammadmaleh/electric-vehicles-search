import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import type CarouselProps from './carousel.props';

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className={'relative h-full cursor-grab'} data-testid="carousel">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation]}
        navigation
        className="h-full w-full "
      >
        {images.map((image: string) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt={`Image ${image}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              data-testid={`image-${image}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
