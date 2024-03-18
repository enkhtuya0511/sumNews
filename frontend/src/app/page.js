"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import News1 from "@/components/News1";
import News2 from "@/components/News2";
import MostPopularNews from "@/components/MostPopular";
import { GlobalNews } from "@/components/GlobalNews";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(`http://localhost:7001/user`, {
            headers: { "x-access-token": token },
          });
          setUser(response);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("user", user);
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <main className="bg-green-400 w-full">
        <div className="flex flex-col w-[90vw] max-w-[1288px] m-auto my-[40px]">
          <News1 />
          <News2 />
        </div>
        <GlobalNews />
        <div className="flex flex-col w-[90vw] max-w-[1288px] m-auto my-[40px]">
          <MostPopularNews />
          <div className="w-full flex flex-col bg-purple-400 mt-[40px] box-border">News..</div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
