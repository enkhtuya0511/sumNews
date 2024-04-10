import React, { useState } from "react";

export const GlobalNews = ({ globalNews }) => {
  const subsections = ["Asia Pacific", "Africa", "Europe", "Middle East"];
  const [index, setIndex] = useState(0);
  return (
    <div className="w-full bg-lime-100 box-border pt-[40px] border-y-4 border-[black] mb-[40px]">
      <div className="w-[90vw] max-w-[1288px] bg-[#f0ede6] m-auto text-[#0f151e]">
        <div className="flex justify-between w-[100%] mb-[20px]">
          <h2 className="font-[600] text-[32px] w-[100%]">Global News</h2>
          <div className="flex text-[#3c3a30] border-2">
            {subsections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`py-[5px] px-[30px] border-r-2 ${
                  index === idx ? "bg-[#3c3a30] text-[#f9f8f6]" : "bg-[#f9f8f6] text-[#333]"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
        {!globalNews ? (
          <div className="flex flex-wrap w-[100%] gap-[1%] bg-[plum]">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : (
          <div className="flex flex-wrap w-[100%] gap-[1%] bg-[plum]">
            {globalNews?.[subsections[index]].map((article, idx) => (
              <article key={idx} className="w-[24%] bg-[plum] flex flex-col">
                <div className="pb-[8px] box-border">
                  <img src={article.imageUrl} alt="globalNewsPic" className="h-auto w-[100%]" />
                </div>
                <div className="basis-[40%] bg-lime-400 pb-[30px]">
                  <a href="#" className="text-[14px] font-[700] text-[#666] mb-[5px]">
                    {article.subsection}
                  </a>
                  <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">{article.title}</h2>
                  <div className="text-[12px] font-[400] text-[#333]">
                    {article.author} | {article.publishedDate}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function Loading() {
  return (
    <article className="w-[24%] p-[8px] animate-pulse">
      <div className="min-h-20 h-[110px] bg-[#eee] mb-[8px] rounded"></div>
      <div className="basis-[40%]">
        <p className="mb-[5px] bg-[#eee] h-[17px] rounded"></p>
        <h2 className="mb-[8px] bg-[#eee] h-[60px] rounded"></h2>
        <div className="bg-[#eee] h-[36px] rounded"></div>
      </div>
    </article>
  );
}
