"use client";
import React, { useEffect } from "react";
import axios from "axios";

const page = ({ searchParams }) => {
  const userID = searchParams.id;
  const confirmUser = async () => {
    try {
      const res = await axios.put(`http://localhost:7001/sub/${userID}`);
      console.log(res, "res");
      if (res.status === 204) alert("Invalid User ID");
    } catch (err) {
      console.log(err);
      if (err) alert("Incorrect ID");
    }
  };
  useEffect(() => {
    confirmUser();
  }, []);
  return (
    <main className="bg-[#eff2f3] m-0 p-0 min-h-screen">
      <div className="max-w-[600px] h-[80px] m-auto bg-[#ffffff] p-[20px] mb-[10px] text-[black]">
        <h1 className="text-[28px] font-bold">SumNews</h1>
      </div>
      <div className="max-w-[600px] m-auto bg-[#ffffff] p-[20px] mb-[20px] text-[#333]">
        {/* <h1 className="text-[28px] font-bold mb-[20px]">Science Newsletters</h1> */}
        <div className="bg-[#eeeeee] flex flex-col p-[20px] rounded-[4px]">
          <h2 className="text-[22px] font-[600] mb-[20px]">Subscription Confirmed ꩜</h2>
          <p className="mb-[20px] text-[black]">
            Your subscription to our list has been confirmed. <br></br>
            Thank you for subscribing ⋆⭒˚｡⋆
          </p>
          <div>
            <a href="/" className="bg-[#4d4d4d] hover:bg-[#333333] text-[#fff] px-[20px] py-[10px] rounded-[4px]">
              continue to our website
            </a>
            {/* {" "}or{" "}
            <button className="bg-[#4d4d4d] hover:bg-[#333333] text-[#fff] px-[20px] py-[10px] rounded-[4px]">manage your list</button> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
