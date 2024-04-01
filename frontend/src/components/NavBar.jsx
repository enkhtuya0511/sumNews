"use client";
import React from "react";
import Button from "./Button";
import { IoSearch } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const categories = ["News", "Science", "Business", "Health", "Entertainment", "Tech", "About Us"];
  return (
    <header className="bg-[plum] w-full">
      <div className="flex justify-between max-w-[1288px] w-[90vw] m-auto py-[24px]">
        <a href="/">
          <h1 className="font-black text-[35px] text-[#000000]">NEWSLETTERS</h1>
        </a>
        <div className="flex gap-[20px]">
          <div className="flex items-center text-[#000000] gap-[10px]">
            <a href="/login" style={pathname === "/login" ? { textDecorationLine: "underline", textDecorationStyle: "wavy" } : null}>
              Log In
            </a>{" "}
            <span> / </span>{" "}
            <a href="/signup" style={pathname === "/signup" ? { textDecorationLine: "underline", textDecorationStyle: "wavy" } : null}>
              Sign Up
            </a>
          </div>
          <Button>Subscribe to Our newsletter</Button>
        </div>
      </div>

      <div className="flex justify-between items-center max-w-[1288px] w-[90vw] m-auto bg-orange-200 text-[#000]">
        {/* <div>categories</div> */}
        <ul className="flex gap-[5px] py-[6px]">
          {categories.map((category, idx) => (
            <li key={idx} className="mr-[8px] font-medium">
              <a href="#">{category}</a>
            </li>
          ))}
        </ul>
        <IoSearch className="w-[22px] h-[22px]" />
      </div>
    </header>
  );
}
