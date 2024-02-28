"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Example from "@/components/example";

export default function Home() {
  const router = useRouter();
  // const [loading, setloading] = useState([false]);
  // const [user, setUser] = useState([]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const fetchData = async () => {
  //     setloading(true);
  //     try {
  //       const response = await axios.get(`http://localhost:8000/user`, {
  //         headers: { "x-access-token": token },
  //       });

  //       setUser(response.data.user);
  //     } catch (error) {
  //       alert("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(user);
  // const logoutlogin = () => {
  //   try {
  //     localStorage.removeItem("token");
  //     router.push("/login");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <main className="flex flex-col min-h-screen min-w-screen bg-[#f6f7fb]">
      <div className="h-[10%] w-[100%] flex justify-between p-[15px] bg-[#4d648d]">
        <h1 className="flex items-center text-[48px] font-bold text-[#FFFFFF]">
          NEWS
        </h1>
        <div className="flex items-center gap-[30px]">
          <a
            href="#"
            className="w-[40px] h-[40px] flex justify-center items-center p-[5px] border-2 rounded-[50%] text-[25px]"
          >
            +
          </a>
          <button
            onClick={() => router.push("/login")}
            className="p-[5px] border-2 "
          >
            Нэвтрэх
          </button>
        </div>
      </div>
      <div className="flex items-center ml-[30px] h-[5%]">
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
          {/* <Example /> */}
        </div>
        {/* <div className="h-[50%]">
          <div>
            <img src="" />
            <h1></h1>
          </div>
          <div>
            <h1></h1>
            <img />
          </div>
        </div> */}
      </div>
    </main>
  );
}
