"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";

const page = ({ searchParams }) => {
  const inputValue = searchParams.n;
  const [articles, setArticles] = useState([]);
  const getArticlesBySection = async (section) => {
    try {
      const articles = await axios.get(`http://localhost:7001/news?section=${section}`);
      console.log("first", articles);
    } catch (err) {
      console.log("error", err);
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
      <div className="w-[90vw] max-w-[1288px] flex items-start mx-auto flex flex-col text-[#0f151e] gap-[15px] mb-[50px]">section</div>
    </div>
  );
};

export default page;
