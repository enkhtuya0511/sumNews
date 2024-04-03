"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({});
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
    <main className="min-h-screen flex flex-col bg-green-300">
      <NavBar />
    </main>
  );
}
