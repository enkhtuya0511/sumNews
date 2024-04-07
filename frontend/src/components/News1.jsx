import React from "react";

const News1 = ({ mostViewed }) => {
  const firstTwoArticle = mostViewed?.slice(0, 2);
  if (!mostViewed || mostViewed.length < 2) {
    return (
      <div className="flex w-full justify-center items-center">
        {" "}
        <p>No data available</p>{" "}
      </div>
    );
  }
  return (
    <div className="flex w-full">
      <div className="bg-cyan-600 min-w-[25%] basis-[25%] flex flex-col justify-between">
        {firstTwoArticle.map((article, idx) => (
          <article className="mb-[10px] pb-[10px] pr-[16px]" key={idx}>
            <img src={article?.imageUrl} alt="mostViewedPic" className="h-auto min-h-[130px] w-[100%] mb-[8px]" />
            <div className="break-words text-left">
              <h2 className="text-[18px] text-[#0f151e] font-[600] mb-[8px]">{article?.title}</h2>
              <div className="text-[12px] font-[400] text-[#333]">
                {article?.author} | {article?.publishedDate}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="bg-blue-400 basis-[50%]">
        <article className="pb-[10px] px-[16px]">
          <img src={mostViewed[2]?.imageUrl} alt="testPic2" className="h-auto w-[100%] mb-[8px]" />
          <div className="break-words text-left">
            <h2 className="text-[32px] text-[#0f151e] font-[600] mb-[8px]">{mostViewed[2]?.title}</h2>
            <p className="text-[16px] font-[400] text-[#0f151e] mb-[8px] line-clamp-4">{mostViewed[2]?.summary}</p>
            <div className="text-[12px] font-[400] text-[#333]">
              {mostViewed[2]?.author} | {mostViewed[2]?.publishedDate}
            </div>
          </div>
        </article>
      </div>
      <div className="bg-rose-300 min-w-[25%] basis-[25%] text-black flex flex-col gap-[5px]">
        <a href="/createNews">write</a>
        <a href="/testApi">fetchNews</a>
      </div>
    </div>
  );
};

export default News1;
