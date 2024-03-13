"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import Button from "@/components/Button";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const categories = [
    "All News",
    "Politics",
    "Business",
    "Health",
    "Entertainment",
    "Sports",
    "About Us",
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(`http://localhost:7000/user`, {
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
    <main className="flex min-h-screen flex-col items-center bg-[#f9f8f6] ">
      <div className="flex w-full h-[10vh] justify-between items-center py-[10px] px-[10vh] bg-[plum] tablet:h-[5vh] tablet:px-[20px] 
      laptop:h-[7vh] laptop:px-[60px] desktop:h-[8vh] desktop:px-[80px] 3xl:px-[120px] ">
        <h1 className="font-bold text-[32px] tablet:text-[20px] laptop:text-[25px] desktop:text-[30px] 3xl:text-[40px]">
          newsletter.
        </h1>
        <div className="flex justify-center items-center gap-[10px] tablet:text-[12px] laptop:text-[13px] 
        desktop:text-[15px] 3xl:text-[18px] laptop:gap-[15px] desktop:gap-[20px] 3xl:gap-[25px]">
          <Button onClick={() => router.push("/createNews")} >Create</Button>
          <div className="flex justify-center items-center gap-[10px]">
            <a href="/signup">Sign Up</a>
            <span>/</span>
            <a href="/login">Log in</a>
          </div>
          <button className="flex items-center justify-center h-[50px] w-[250px] px-[10px] py-[5px] border-lime-600 bg-[#ffffff]
           tablet:h-[25px] tablet:w-[100px] desktop:h-[30px] desktop:w-[120px] 3xl:h-[40px] 3xl:w-[180px] 3xl:text-[20px]">
            Subscribe
          </button>
        </div>
      </div>

      <div className="flex w-full h-[5vh] justify-between items-center bg-[green] py-[10px] px-[10vh] 
      tablet:h-[3.5vh] tablet:px-[20px] laptop:px-[60px] desktop:px-[80px] desktop:h-[4vh] 3xl:px-[120px] 3xl:h-[5vh]">
        <div className="flex justify-start font-bold gap-[40px] tablet:gap-[10px] tablet:text-[12px] desktop:text-[13px] 3xl:text-[16px]">
          {categories.map((category, idx) => (
            <button key={idx}>{category}</button>
          ))}
        </div>
        <IoSearch className="flex justify-end text-[20px] tablet:text-[16px] desktop:text-[18px] 3xl:text-[23px]" />
      </div>

      <div className="flex justify-between h-auto w-full bg-cyan-500 px-[10vh] py-[5vh] tablet:py-[30px] 
      tablet:px-[50px] laptop:px-[60px] desktop:px-[80px] 3xl:px-[300px]">
        <div className="w-[22vw] bg-white 3xl:w-[18vw]">
          <Card />
          <Card />
          <Card />
        </div>

        <div className="w-[45vw] bg-white flex flex-col border-2 border-r-indigo-500 border-l-indigo-500 3xl:w-[38vw]">
          <div className="h-[740px] tablet:h-[360px] tablet:text-[13px] laptop:h-[520px] w-full tablet:pt-[15px] tablet:gap-[5px] pt-[5px] pb-[40px] 
          px-[15px] flex flex-col justify-between bg-amber-200 border-2 border-b-indigo-500 desktop:h-[680px] desktop:text-[17px] 3xl:h-[960px] 3xl:text-[21px]
          3xl:px-[25px] 3xl:py-[35px]">
            <img
              src="test.jpeg"
              alt="testPicture"
              // height={360}
              className="w-full h-[80%] laptop:h-[60%]"
            />
            <h5 className="text-[#747371]">Civil</h5>
            <h1 className="font-bold text-[32px] font-inherit tablet:text-[17px] laptop:text-[25px] desktop:text-[33px] 3xl:text-[41px]">
              Office of Space Commerce examines options for commercial SSA pilot
              project in LEO
            </h1>
            <h5 className="text-[#747371]">Jeff Foust | February 18, 2023</h5>
          </div>

          <div className="flex">
            <Card />
            <Card />
          </div>
        </div>

        <div className="w-[22vw] bg-white 3xl:w-[18vw]">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </main>
  );
}
