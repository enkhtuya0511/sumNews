import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation} from "swiper/modules";

const CarouselSlider = ({ test }) => {
  return (
    <div className="w-full bg-purple-400 mt-[40px] box-border flex flex-col text-[#0f151e] relative">
      <div className=" flex flex-col box-border max-w-[1200px]">
        <h1 className="font-[600] text-[25px] w-[100%] mb-[10px] first-letter:text-[25px] first-letter:uppercase">
          {test?.[0].section}
        </h1>
        <div className="w-full flex gap-[30px] mx-[44px] justify-center">
          <Swiper
            slidesPerView={4}
            freeMode={true}
            spaceBetween={40}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {test?.map((article, idx) => (
              <SwiperSlide key={idx} className="basis-[20%] min-w-[215px] mb-[15px]">
                <div className="pb-[8px] box-border">
                  <img
                    src={article.imageUrl}
                    alt="upshotPic"
                    className="h-auto w-[100%]"
                  />
                </div>
                <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">
                  {article.title}
                </h2>
                <div className="text-[12px] font-[400] text-[#333]">
                  {article.author}{" "}
                  {article.publishedDate ? `| ${article.publishedDate}` : null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;
