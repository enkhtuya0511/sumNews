"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import News1 from "@/components/News1";
import News2 from "@/components/News2";
import MostPopularNews from "@/components/MostPopular";
import { GlobalNews } from "@/components/GlobalNews";
import Footer from "@/components/Footer";
import CarouselSlider from "@/components/CarouselSlider";

export default function Home() {
  // const sections = {};
  const [sections, setSections] = useState({})
  const fetchAllNews = async (section) => {
    try {
      const response = await axios.get(`http://localhost:7001/news?section=${section}`);
      const newsData = response.data.data;

      return newsData
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
   const data =  fetchAllNews();
   setSections(data)
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <main className="bg-green-400 w-full scroll-smooth">
        <div className="flex flex-col w-[90vw] max-w-[1288px] m-auto my-[40px]">
          <News1 fetchAllNews={fetchAllNews}/>
          {/* <News1/> */}
          <News2 />
        </div>
        <GlobalNews />
        <div className="flex flex-col w-[90vw] max-w-[1288px] m-auto my-[40px]">
          <MostPopularNews />
          <CarouselSlider />
        </div>
        <Footer />
      </main>
    </div>
  );
}
