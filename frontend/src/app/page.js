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
          <div className="w-full bg-purple-400 mt-[40px] box-border flex flex-col text-[#0f151e]">
            <div className="bg-green-200 flex flex-col">
              <h1 className="font-[600] text-[25px] w-[100%] mb-[10px]">Science</h1>
              <div className="w-full flex bg-plum gap-[30px] overflow-x-auto">
                {testArr.map((el, idx) => (
                  <article key={idx} className="basis-[20%] grow">
                    <div className="pb-[8px] box-border">
                      <img src="testPic1.webp" alt="testPic1" className="h-auto w-[100%]" />
                    </div>
                    <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">{el.title}</h2>
                    <div className="text-[12px] font-[400] text-[#333]">
                      {el.author} {el.date ? `| ${el.date}` : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

const testArr = [
  {
    category: "Opinion",
    title: "Koons on the Moon? Artists’ crucial role in shaping humanity’s image on Earth and beyond",
    author: "Jess Bush",
  },
  {
    category: "Commercial",
    title: "Terran Orbital announces plans to produce small satellites for geostationary orbit",
    author: "Sandra Erwin",
    date: "March 14, 2024",
  },
  {
    category: "Launch",
    title: "Surprise Chinese lunar mission hit by launch anomaly",
    author: "Andrew Jones",
    date: "March 14, 2024",
  },
  {
    category: "Civil",
    title: "NASA restructures Earth System Observatory to reduce costs",
    author: "Jeff Foust",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title: "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title: "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title: "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title: "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
];
