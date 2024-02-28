"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button.jsx";

export default function NavBar() {
    const router = useRouter();
  return (
    <div className="h-[10%] w-[100%] flex fixed top-0 left-0 right-0 justify-between py-[15px] px-[60px] bg-[#ffffff]">
      <h1 className="flex items-center text-[48px] font-bold text-[#000000]">NEWS</h1>
      <div className="flex items-center gap-[30px]">
        <Button onClick={() => router.push("/createNews")} className="w-[40px] h-[40px] flex justify-center items-center p-[5px] rounded-[50%] border-[10px] text-[25px]">Create</Button>
        <Button onClick={() => router.push("/login")}>Log in</Button>
        <Button onClick={() => router.push("/signup")}>Sign up</Button>
      </div>
    </div>
  );
}
