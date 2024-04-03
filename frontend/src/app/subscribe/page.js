"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Checkbox from "@/components/Checkbox";
import Footer from "@/components/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Home() {
  const router = useRouter();
  //   const [signData, setSignData] = useState({});

  //   const handleSignup = async () => {
  //     const { data } = await axios.post(`http://localhost:7001/signup`, {
  //       name: signData.name,
  //       email: signData.email,
  //       password: signData.password,
  //     });
  //     if (data?.user) {
  //       localStorage.setItem("uid", data.user.id);
  //     }
  //   };
  const submit = (event) => {
    event.preventDefault();
    console.log("first", event.target);
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6]">
      <NavBar />
      <div className="w-[90vw] max-w-[1288px] flex flex-col bg-purple-300 m-auto text-[#0f151e]">
        <div className="w-full text-[15px] font-[400] flex justify-start">
          <div className="flex items-center cursor-pointer hover:underline">
            <a href="/">Home</a> <MdKeyboardArrowRight className="text-[21px]" />
          </div>
          <h5 className="font-bold">Subscribe</h5>
        </div>

        <main className="my-[60px] h-auto bg-lime-400 box-border">
          <header className="text-[#333] text-[60px] font-[600] text-left">
            <h1>Subscribe to Our Newsletter</h1>
          </header>

          <div className="w-full bg-blue-500 box-border">
            <p className="my-[40px] text-[18px]">Check the names of the newsletters you'd like to receive directly in your email</p>
            <div className="w-full box-border flex gap-[100px] bg-orange-400">
              <div className="max-w-[580px] min-w-[420px] basis-[50%] bg-blue-600">
                <h3 className="text-[32px] font-[600] mb-[16px]">Newsletters to select</h3>
                <Checkbox />
              </div>

              <div className="max-w-[480px] basis-[50%] bg-blue-200 text-[#333]">
                <h3 className="text-[32px] font-[600] mb-[16px]">Required Info</h3>
                <form onSubmit={submit}>
                  <div className="flex flex-col gap-[3px] text-[14px] mb-[16px]">
                    <label>Your E-mail Address*</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="px-[11px] py-[6px] border border-[#ccc] outline-none hover:border-[#333]"
                    />
                  </div>
                  <div className="flex flex-col gap-[3px] text-[14px] mb-[16px]">
                    <label>Username*</label>
                    <input
                      name="username"
                      type="text"
                      required
                      className="px-[11px] py-[6px] border border-[#ccc] outline-none hover:border-[#333]"
                    />
                  </div>
                  <input
                    type="submit"
                    className="bg-[#333] px-[24px] py-[10px] text-[#fff] text-[14px] font-[400] 
                rounded-[4px] h-[40px] w-[95px] flex justify-center items-center"
                    value="Subscribe"
                  />
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
