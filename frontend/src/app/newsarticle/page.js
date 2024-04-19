"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import Comment from "@/components/Comment";

export default function Page({ searchParams }) {
  const [article, setArticle] = useState([]);
  const newsId = searchParams.id;
  const fetchArticle = async () => {
    try {
      const res = await axios.get(`https://newsletter-gilt-nu.vercel.app/homepageNews/${newsId}`);
      console.log(res.data.data);
      setArticle(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (newsId) {
      fetchArticle();
    }
  }, [newsId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      {!article ? (
        <div className="w-[90vw] max-w-[1288px] flex justify-center mx-auto text-[#0f151e] my-[20px] bg-orange-300">
          <p>loading...</p>
        </div>
      ) : (
        <div className="w-[90vw] max-w-[1288px] flex items-start mx-auto flex-col text-[#0f151e] my-[20px]">
          <a href="/section?n=world" className="text-[17px] font-[600] text-[#666] mb-[10px]">
            {article?.section}
          </a>
          <h1 className="text-[48px] font-[600] text-[#0F151E]">{article?.title}</h1>
          <div className="text-[16px] font-[400] text-[#333]">
            {article?.author} | {article?.publishedDate}
          </div>
          <img alt="articlePic" className="max-w-full h-auto mt-[30px]" src={article?.imageUrl} />
          <p className="text-[18px] mt-[20px] text-[#333] break-words">{article?.summary}</p>
          <a href={article?.source} className="text-[18px] mt-[10px] mb-[30px]">
            source: <span className="text-[blue] underline decoration-1">{article?.title}</span>
          </a>

          <Comment newsId={newsId} articleComments={article?.Comments} />
        </div>
      )}
    </div>
  );
}
