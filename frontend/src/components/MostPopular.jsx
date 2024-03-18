import React from "react";

const MostPopularNews = () => {
  return (
    <div className="flex bg-[yellow] max-w-[100%] flex-wrap text-[#0f151e] mt-[40px]">
      <h2 className="font-[600] text-[32px] border-b-4 border-black w-[100%]">Most Popular</h2>
      {testArr.map((el, idx) => (
        <article
          key={idx}
          className="flex w-[50%] bg-[#f9f8f6] py-[28px] pr-[88px] border-b-4 border-black relative"
          style={
            idx % 2 !== 0
              ? { backgroundColor: "yellow", paddingLeft: "24px" }
              : { backgroundColor: "red", borderRight: "4px solid black" }
          }
        >
          <div className="basis-[25%] box-border mr-[24px] pb-[8px]">
            <img src="testPic1.webp" alt="testPic1" className="h-auto max-w-[100%] aspect-square" />
          </div>
          <div className="basis-[75%] box-border break-words text-left bg-green-200 pl-[20px]">
            <h3 className="text-[18px] font-[600]" key={idx}>
              {el}
            </h3>
            <div className="absolute right-[25px] mt-[-50px] top-[50%] text-[48px] text-[#dfdacd] font-[600]">{idx + 1}</div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MostPopularNews;

const testArr = [
  "Surprise Chinese lunar mission hit by launch anomaly",
  "NASA restructures Earth System Observatory to reduce costs",
  "Space Force selects startup Defense Unicorns to update software at launch ranges",
  "Omnispace to test direct-to-smartphone LEO plans with Africa’s biggest telco",
  "Space Development Agency marks five-year milestone",
  "Global communications are under attack — optical satellite networks can bolster them",
];
