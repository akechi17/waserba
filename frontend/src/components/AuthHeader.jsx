import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Pagination, Scrollbar, Autoplay } from "swiper/modules";

const AuthHeader = () => {
  return (
    <div className='relative hidden w-0 flex-1 bg-primary-400 lg:block'>
      <div className='absolute inset-0 m-auto flex items-center justify-center'>
        <Swiper
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Scrollbar, Autoplay]}
          loop={true}
        >
          <SwiperSlide>
            <div className='space-y-4 text-center text-white'>
              <img
                src='/images/illustrations/ilustration-6.png'
                alt='Membership Area'
                className='mx-auto w-[400px]'
              />
              <h5 className='text-4xl font-extrabold'>Membership Area</h5>
              <p className='max-w-md font-light'>
                Dapatkan berbagai macam benefit dengan join membership
                waserba!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='space-y-4 text-center text-white'>
              <img
                src='/images/illustrations/ilustration-6.png'
                alt='Membership Area'
                className='mx-auto w-[400px]'
              />
              <h5 className='text-4xl font-extrabold'>Membership Area</h5>
              <p className='max-w-md font-light'>
                Dapatkan berbagai macam benefit dengan join membership
                waserba!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='space-y-4 text-center text-white'>
              <img
                src='/images/illustrations/ilustration-6.png'
                alt='Membership Area'
                className='mx-auto w-[400px]'
              />
              <h5 className='text-4xl font-extrabold'>Membership Area</h5>
              <p className='max-w-md font-light'>
                Dapatkan berbagai macam benefit dengan join membership
                waserba!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default AuthHeader;
