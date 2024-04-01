"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [inputData, setInputData] = useState({});
  const category = ["Choose a Category", "health", "sports", "tech", "entertainment"];
  const handleClick = async () => {
    const { data } = await axios.get(`http://localhost:7001/testAPI`);
  };
  return (
    <div className="bg-gray-400 min-h-screen flex justify-center items-center gap-[20px]">
      <select
        className="p-[10px] rounded-[5px] w-[200px bg-[#FFFFFF] text-[black]"
        onChange={(e) => setInputData((prev) => ({ ...prev, category: e.target.value }))}
      >
        {category.map((el, id) => (
          <option key={id} value={el}>
            {el}
          </option>
        ))}
      </select>
      <button className="py-[5px] px-[10px] border-2 bg-white text-[black]" onClick={handleClick}>
        datadata
      </button>
    </div>
  );
};

export default page;
