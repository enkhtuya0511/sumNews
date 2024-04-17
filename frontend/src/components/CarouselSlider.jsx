"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

export const CarouselSlider = ({ test }) => {
  const router=useRouter();

  return (
    <div className="w-full bg-[#ebeae8] mt-[40px] box-border text-[#0f151e]">
      <h1 className="font-[600] text-[25px] w-[100%] mb-[10px] first-letter:text-[25px] first-letter:uppercase">
        {test?.[0].section}
      </h1>
      <div className="w-full flex justify-center px-[30px]">
        {!test ? (
          <div className="flex gap-[40px]">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : (
          <>
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
                <SwiperSlide key={idx} className="basis-[20%] min-w-[215px] mb-[30px]">
                  <div className="pb-[8px] box-border">
                    <img src={article.imageUrl} alt="upshotPic" className="h-auto w-[100%]" />
                  </div>
                  <h2 onClick={()=>router.push(`/newsarticle?id=${article?._id}`)} className="text-[#0f151e] font-[600] text-[16px] mb-[8px] cursor-pointer">{article.title}</h2>
                  <div className="text-[12px] font-[400] text-[#333]">
                    {article.author} {article.publishedDate ? `| ${article.publishedDate}` : null}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

function Loading() {
  return (
    <article className="basis-[20%] min-w-[215px] mb-[30px] animate-pulse">
      <div className="w-full h-[110px] min-h-20 bg-gray-300 rounded mb-[8px]"></div>
      <h2 className="bg-gray-300 h-[60px] rounded mb-[8px]"></h2>
      <div className="bg-gray-300 h-[30px] rounded"></div>
    </article>
  );
}
