"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const Page = ({ searchParams }) => {
  const router = useRouter();
  const inputValue = searchParams.query;
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Search = async (input) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://newsletter-backend-xi.vercel.app/news?search=${input}`);
      setResults(response.data.filteredArticle);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue) {
      Search(inputValue);
    }
  }, [inputValue]);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`search?query=${searchInput}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <main className="w-[90vw] max-w-[1288px] flex items-start mx-auto flex-col text-[#0f151e] gap-[15px] mb-[50px]">
        <div className="w-full text-[15px] font-[400] flex justify-start mb-[20px]">
          <div className="flex items-center cursor-pointer hover:underline">
            <a href="/">Home</a> <MdKeyboardArrowRight className="text-[21px]" />
          </div>
          <h5 className="font-bold">You searched for "{inputValue}"</h5>
        </div>
        <div className="flex">
          <div className="w-[500px] h-[50px] bg-[#fff] flex items-center p-[8px] pl-[10px] mr-[10px] gap-[10px] border-2 border-[#cccccc]">
            <IoSearch className="text-[#586380] h-[25px] w-[25px]" />
            <input
              type="text"
              placeholder="Search by article name"
              className="w-full h-[25px] outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") return handleSearch();
              }}
            />
          </div>
          <button onClick={handleSearch} className="h-[50px] px-[25px] bg-[#0f151e] text-[#fff] rounded" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        {results.length > 0 ? (
          <>
            <p className="font-[500]">{results.length} results found</p>
            {results.map((article, idx) => (
              <article
                key={idx}
                onClick={() => router.push(`/newsarticle?id=${article?._id}`)}
                className="flex flex-row-reverse w-[65%] py-[20px] pr-[30px] gap-[25px] border-b-[2px] border-y-[#CCCCCC] cursor-pointer"
              >
                <div className="box-border w-[30%]">
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
        ) : (
          <p>No results found for "{inputValue}"</p>
        )}
      </main>
    </div>
  );
};

export default Page;
