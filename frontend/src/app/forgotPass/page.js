"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (email) {
        setLoading(true);
        await axios.post("https://newsletter-gilt-nu.vercel.app/forgotPassword", { email });
        router.push("/resetPass");
      } else {
        alert("Please enter your email!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0e4e5]">
      {!loading ? (
        <div className="bg-[#ffffff] px-[15px] py-[20px] flex flex-col text-[black] shadow-lg rounded-[10px] gap-[15px] max-w-[400px] w-full">
          <h4 className="text-[20px] font-[400] ">Forgot your password ?</h4>
          <div className="w-full">
            <p className="font-[600] block">Email</p>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-[10px] py-[5px] border border-[#e0e0e1] rounded w-[80%] outline-none"
            />
          </div>
          <div className="flex gap-[20px]">
            <button
              onClick={() => router.push("/login")}
              className="py-[5px] px-[25px] text-[#0f151e] bg-[#787D82] rounded-[5px] w-[120px]"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="py-[5px] px-[25px] text-[#ffffff] bg-[#0f151e] rounded-[5px] w-[120px]">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};
export default ForgotPassword;
