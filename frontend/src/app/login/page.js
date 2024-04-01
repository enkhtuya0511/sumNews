"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Checkbox from "@/components/Checkbox";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "@/components/Footer";

export default function Home() {
  const [loginData, setLoginData] = useState({});
  const router = useRouter();
  const handleLogin = async () => {
    const { data } = await axios.post(`http://localhost:7001/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      router.push("/");
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <div className="w-[90vw] max-w-[1288px] flex flex-col bg-purple-300 m-auto text-[#0f151e]">
        <div className="w-full text-[15px] font-[400] flex justify-start">
          <div className="flex items-center cursor-pointer hover:underline">
            <a href="/">Home</a> <MdKeyboardArrowRight className="text-[21px]" />
          </div>
          <h5 className="font-bold">Login</h5>
        </div>

        <main className="my-[60px] h-auto bg-lime-400 box-border">
          <header className="text-[#333] text-[60px] font-[600] text-left">
            <h1>Log in to NEWSLETTERS</h1>
          </header>

          <div className="w-full bg-blue-500 box-border">
            <p className="my-[40px] text-[18px]">Check the names of the newsletters you'd like to receive directly in your email</p>
            <div className="w-full box-border flex gap-[110px] bg-orange-400">
              <div className="max-w-[580px] basis-[50%] bg-blue-600">
                <h3 className="text-[32px] font-[600] mb-[16px]">Newsletters to select</h3>
                <Checkbox />
                <Checkbox />
                <Checkbox />
              </div>
              <div className="max-w-[480px] basis-[50%] bg-blue-200">block2</div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
