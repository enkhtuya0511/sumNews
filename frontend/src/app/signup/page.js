"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [signData, setSignData] = useState({});
  const [showPass, setShowPass] = useState();
  const pressShow = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  const router = useRouter();

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
    <main className="min-h-screen flex flex-col bg-green-300">
      <NavBar />
    </main>
  );
}
