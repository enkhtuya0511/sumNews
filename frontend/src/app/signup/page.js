"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState({});
  const handleSignup = async () => {
    try {
      const { data } = await axios.post(`http://localhost:7001/signup`, {
        email: signUpData.email,
        password: signUpData.password,
      });
      if (data?.token) {
        localStorage.setItem("ui", data.token);
        window.location.reload();
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
      <NavBar />
      <main className="w-full h-[80vh] flex justify-center items-center">
        <div className="bg-[#ffffff] px-[15px] py-[20px] flex flex-col text-[black] shadow-lg rounded-[10px]">
          <h1 className="text-[30px] font-bold mb-[15px] break-words">Welcome to your Newsletter. account</h1>
          <h4 className="text-[20px] font-[400] mb-[10px]">Sign up and create a new account ⋆⭒˚｡⋆</h4>
          <div className="w-full">
            <p className="font-[600] block">Email</p>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setSignUpData((prev) => ({ ...prev, email: e.target.value }))}
              className="px-[10px] py-[5px] border border-[#e0e0e1] rounded w-[80%] outline-none"
            />
          </div>
          <div className="w-full my-[10px]">
            <p className="font-[600] block">Password</p>
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => setSignUpData((prev) => ({ ...prev, password: e.target.value }))}
              className="px-[10px] py-[5px] border border-[#e0e0e1] rounded w-[80%] outline-none"
            />
          </div>
          <button onClick={handleSignup} className="py-[5px] px-[25px] text-[#ffffff] bg-[#0f151e] rounded-[5px] w-[120px]">
            Sign Up
          </button>
          <h4 className="mt-[20px] flex gap-[5px]">
            Already have an account ?
            <a href="/login" className="text-[#4483c5]">
              Log In
            </a>
          </h4>
        </div>
      </main>
    </div>
  );
}
