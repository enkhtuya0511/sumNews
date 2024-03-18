import React from "react";

export const GlobalNews = () => {
  return (
    <div className="w-full bg-lime-100 box-border pt-[40px] border-y-4 border-[black] mb-[40px]">
      <div className="w-[90vw] max-w-[1288px] bg-[#f0ede6] m-auto text-[#0f151e]">
        <div className="flex justify-between w-[100%] mb-[20px]">
          <h2 className="font-[600] text-[32px] w-[100%]">Global News</h2>
          <div className="flex text-[#3c3a30] border-2">
            <button className="py-[5px] px-[30px] bg-[#3c3a30] border-r-2 text-[#f9f8f6]">All</button>
            <button className="py-[5px] px-[30px] bg-[#f9f8f6] border-r-2">Asia</button>
            <button className="py-[5px] px-[30px] bg-[#f9f8f6] border-r-2">Europe</button>
            <button className="py-[5px] px-[30px] bg-[#f9f8f6]">Australia</button>
          </div>
        </div>
        <div className="flex flex-wrap w-[100%] gap-[1%]">
          {testArr.map((el, idx) => (
            <article key={idx} className="w-[24%] bg-[plum] flex flex-col">
              <div className="pb-[8px] box-border">
                <img src="testPic1.webp" alt="testPic1" className="h-auto w-[100%]" />
              </div>
              <div className="basis-[40%] bg-lime-400 pb-[30px]">
                <a href="#" className="text-[14px] font-[700] text-[#666] mb-[5px]">
                  {el.category}
                </a>
                <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">{el.title}</h2>
                <div className="text-[12px] font-[400] text-[#333]">
                  {el.author} | {el.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const testArr = [
  {
    category: "Commercial",
    title: "Terran Orbital announces plans to produce small satellites for geostationary orbit",
    author: "Sandra Erwin",
    date: "March 14, 2024",
  },
  {
    category: "Launch",
    title: "Surprise Chinese lunar mission hit by launch anomaly",
    author: "Andrew Jones",
    date: "March 14, 2024",
  },
  {
    category: "Civil",
    title: "NASA restructures Earth System Observatory to reduce costs",
    author: "Jeff Foust",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title: "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
];
