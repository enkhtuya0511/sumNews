import React from "react";
import { useRouter } from "next/navigation";

const News2 = ({ sections }) => {
  const router = useRouter();
  return (
    <div className="w-full flex my-[40px] gap-[64px] p-[8px] bg-lime-300 ">
      {!sections ? (
        <>
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        <>
          {sections?.map((article, idx) => (
            <article key={idx} className="basis-0 grow">
              <p
                onClick={() => router.push("#")}
                className="text-[14px] font-[700] text-[#666] mb-[4px] first-letter:text-[14px] first-letter:uppercase hover:cursor-pointer"
              >
                {article.section}
              </p>
              <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">{article.title}</h2>
              <div className="text-[12px] font-[400] text-[#333]">
                {article.author} {article.publishedDate ? `| ${article.publishedDate}` : null}
              </div>
            </article>
          ))}
        </>
      )}
    </div>
  );
};

export default News2;

function Loading() {
  return (
    <article className="basis-[20%] animate-pulse">
      <p className="mb-[4px] bg-gray-300 h-[21px] rounded"></p>
      <h2 className="mb-[8px] bg-gray-300 h-[84px] rounded"></h2>
      <div className="bg-gray-300 h-[36px] rounded"></div>
    </article>
  );
}
