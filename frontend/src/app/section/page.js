"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { MdKeyboardArrowRight } from "react-icons/md";

const page = ({ searchParams }) => {
  const router = useRouter();
  const inputValue = searchParams.n;
  const [results, setResults] = useState([]);
  const [Loading, setLoading] = useState(false);

  const getArticlesBySection = async (section) => {
    try {
      let apiUrl;
      if (section === "news") apiUrl = `https://newsletter-gilt-nu.vercel.app/news`;
      else apiUrl = `https://newsletter-gilt-nu.vercel.app/news?section=${section}`;
      setLoading(true);
      const res = await axios.get(apiUrl);
      setResults(res.data.data);
      console.log("news", results);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue) {
      getArticlesBySection(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <div className="w-[90vw] max-w-[1288px] flex items-start mx-auto flex flex-col text-[#0f151e] gap-[15px] mb-[50px]">
        <div className="w-full text-[15px] font-[400] flex justify-start mb-[20px]">
          <div className="flex items-center cursor-pointer hover:underline">
            <a href="/">Home</a> <MdKeyboardArrowRight className="text-[21px]" />
          </div>
          <p className="font-bold first-letter:text-[14px] first-letter:uppercase ">{inputValue}</p>
        </div>

        {Loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="font-[500]">{results?.length} results found</p>

            {results?.map((article, idx) => (
              <article
                key={idx}
                onClick={() => router.push(`/newsarticle?id=${article?._id}`)}
                className="flex flex-row-reverse w-[65%] py-[20px] pr-[30px] gap-[25px] border-b-[2px] border-y-[#CCCCCC] cursor-pointer"
              >
                <div className="box-border w-[25%]">
                  <img src={article.imageUrl} alt="searchPic" className="w-full h-auto aspect-[4/3]" />
                </div>
                <div className="flex flex-col w-full">
                  <a href="#" className="text-[14px] font-[700] text-[#666] mb-[5px]">
                    {article.section}
                  </a>
                  <h2 className="text-[#0f151e] font-[600] text-[24px] mb-[8px]">{article.title}</h2>
                  <p className="text-[16px] font-[400] text-[#0f151e] mb-[8px] line-clamp-2">{article.summary}</p>
                  <div className="text-[13px] font-[400] text-[#333]">
                    {article.author} | {article.publishedDate}
                  </div>
                </div>
              </article>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
