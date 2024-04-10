"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  const router = useRouter();
  // const [loginData, setLoginData] = useState({});
  // const handleLogin = async () => {
  //   const { data } = await axios.post(`http://localhost:7001/login`, {
  //     email: loginData.email,
  //     password: loginData.password,
  //   });
  //   if (data?.token) {
  //     localStorage.setItem("token", data.token);
  //     router.push("/");
  //   }
  // };
  return (
    <div className="min-h-screen flex flex-col bg-green-300">
      <NavBar />
      <main className="w-full flex justify-center items-center h-full">
        <div className="bg-orange-600">
          <h1 className="text-[30px] font-bold text-[black]">
            Welcome to your Newsletter. account
          </h1>
          <h4 className="text-[20px] font-[400] text-[black]">Log in with your email and password</h4>
        </div>
      </main>
    </div>
  );
}
