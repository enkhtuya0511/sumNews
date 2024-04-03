"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Checkbox from "@/components/Checkbox";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [signData, setSignData] = useState({});

  const handleSignup = async () => {
    const { data } = await axios.post(`http://localhost:7001/signup`, {
      name: signData.name,
      email: signData.email,
      password: signData.password,
    });
    if (data?.user) {
      localStorage.setItem("uid", data.user.id);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
    </div>
  );
}
