import React from "react";
const News1 = ({ sections }) => {
  if (!sections || sections.length < 2) {
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
        <article className="mb-[10px] pb-[10px] pr-[16px]">
          <img
            src={sections[0]?.imageUrl}
            alt="testPic1"
            className="h-auto min-h-[130px] w-[100%] mb-[8px]"
          />
          <div className="break-words text-left">
            <h2 className="text-[18px] text-[#0f151e] font-[600] mb-[8px]">
              {sections[0]?.title}
            </h2>
            <div className="text-[12px] font-[400] text-[#333]">
              {sections[0]?.author} | March 14, 2024
            </div>
          </div>
        </article>
        <article className="mb-[10px] pb-[10px] pr-[16px]">
          <img
            src={sections[sections.length - 1]?.imageUrl}
            alt="testPic1"
            className="h-auto min-h-[130px] w-[100%] mb-[8px]"
          />
          <div className="break-words text-left">
            <h2 className="text-[18px] text-[#0f151e] font-[600] mb-[8px]">
              {sections[sections.length - 1]?.title}
            </h2>
            <div className="text-[12px] font-[400] text-[#333]">
              {sections[sections.length - 1]?.author} | March 14, 2024
            </div>
          </div>
        </article>
      </div>
      <div className="bg-blue-400 basis-[50%]">
        <article className="pb-[10px] px-[16px]">
          <img
            src="testPic2.webp"
            alt="testPic2"
            className="h-auto w-[100%] mb-[8px]"
          />
          <div className="break-words text-left">
            <h2 className="text-[32px] text-[#0f151e] font-[600] mb-[8px]">
              {" "}
              Sierra Space developing dual-use spacecraft with military
              potential{" "}
            </h2>
            <p className="text-[16px] font-[400] text-[#0f151e] mb-[8px]">
              {" "}
              U.S. regulators have approved ground rules for allowing SpaceX and
              other satellite operators to use radio wavesfrom terrestrial
              mobile partners to keep smartphone users connected outside…{" "}
            </p>
            <div className="text-[12px] font-[400] text-[#333]">
              Sandra Erwin | March 14, 2024
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
