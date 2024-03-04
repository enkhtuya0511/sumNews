"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Example from "@/components/example";
import NavBar from "@/components/NavBar";

export default function Home() {
  const router = useRouter();
  const [loading, setloading] = useState([false]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      setloading(true);
      try {
        if (token) {
          const response = await axios.post(`http://localhost:7000/user`, {
            headers: { "x-access-token": token },
          });

          setUser(response.data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(user);
  const logoutlogin = () => {
    try {
      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex flex-col min-h-screen min-w-screen bg-[#f6f7fb]">
      <NavBar />
      <div>homepage</div>
      <div className="flex items-center m-[30px] h-[5%]">
        <input placeholder="email" />
        <button>subscribe</button>
      </div>
      <div className="h-[70%] m-[30px]">
        <div className="h-[50%]">
          <div className="flex flex-col items-center w-[50%] h-full">
            <img src="/ulstur.jpeg" className="h-[50%]" />
            <h1>Л.Жамбаа: Монголд жижиг станцууд тохиромжтой.</h1>
            <p>
              Энэ өвлийн туршид нийслэлчүүд цахилгаан, шатахуун гээд амин чухал
              хэрэгцээгээрээ бусдаас хараат байхын горыг тултал амслаа. Өөрсдийн
              нөөц боломжоо ашиглан бие дааж, "том болох" цаг уг нь хэдийнээ
              болчихсон. Гэхдээ л улсын цаашдын ирээдүйд тун чухал төслүүд
              хөдөлж өгдөггүй гачлантай.
            </p>
          </div>
          <Example />
        </div>
        <div className="h-[50%]">
          <div>
            <img src="" />
            <h1></h1>
          </div>
          <div>
            <h1></h1>
            <img />
          </div>
        </div>
      </div>
    </main>
  );
}
