"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import News1 from "@/components/News1";
import News2 from "@/components/News2";
import { GlobalNews } from "@/components/GlobalNews";
import { MostPopularNews } from "@/components/MostPopular";
import { CarouselSlider } from "@/components/CarouselSlider";
import Footer from "@/components/Footer";

export default function Home() {
  const [allNews, setAllNews] = useState();
  const fetchAllNews = async () => {
    try {
      const res = await axios.get(`https://newsletter-backend-xi.vercel.app/homepageNews`);
      console.log("news", res.data);
      setAllNews(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <main className="bg-[#f8f8f8] w-full scroll-smooth">
        <div className="flex flex-col w-[90vw] max-w-[1288px] m-auto my-[40px]">
          <News1 mostViewed={allNews?.mostViewed} />
          <News2 sections={allNews?.sections} />
        </div>
        <GlobalNews globalNews={allNews?.globalNews} />
        <div className="flex flex-col w-[90vw] max-w-[1288px] m-auto my-[40px]">
          <MostPopularNews MostPopular={allNews?.mostPopular} />
          <CarouselSlider test={allNews?.upshot} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
///vercel url ->>>> https://newsletter-backend-xi.vercel.app/ || http://localhost:7001
