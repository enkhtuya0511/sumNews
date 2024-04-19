"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const MostPopularNews = ({ MostPopular }) => {
  const router = useRouter();
  return (
    <div className="flex bg-[#ebeae8] max-w-[100%] flex-wrap text-[#0f151e] mt-[40px]">
      <h2 className="font-[600] text-[32px] border-b-4 border-black w-[100%]">Most Popular</h2>
      {!MostPopular ? (
        <>
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        <>
          {MostPopular?.map((article, idx) => (
            <article
              key={idx}
              onClick={() => router.push(`/newsarticle?id=${article?._id}`)}
              className="flex w-[50%] bg-[#f9f8f6] py-[28px] pr-[88px] border-b-4 border-black relative cursor-pointer"
              style={idx % 2 !== 0 ? { paddingLeft: "24px" } : { borderRight: "4px solid black" }}
            >
              <div className="basis-[25%] box-border mr-[24px] pb-[8px]">
                <img src={article.imageUrl} alt="mostPopularPic" className="h-auto max-w-[100%] aspect-square" />
              </div>
              <div className="basis-[75%] box-border break-words text-left pl-[20px]">
                <h2 className="text-[18px] font-[600]">{article.title}</h2>
                <div className="absolute right-[25px] mt-[-50px] top-[50%] text-[48px] text-[#dfdacd] font-[600]">{idx + 1}</div>
              </div>
            </article>
          ))}
        </>
      )}
    </div>
  );
};

function Loading() {
  return (
    <article className="flex w-[50%] py-[28px] pr-[88px] border-b-4 border-black animate-pulse">
      <div className="basis-[25%] mr-[24px] w-full aspect-square bg-gray-300 shadow-lg"></div>
      <div className="basis-[75%]">
        <h3 className="bg-gray-300 h-[81px] rounded shadow-lg"></h3>
      </div>
    </article>
  );
}
