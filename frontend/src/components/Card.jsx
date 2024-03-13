import React from "react";

export const Card = () => {
  return (
    <div className="flex flex-col justify-between w-full h-[370px] bg-rose-400 border-2 border-b-indigo-500 p-[15px] 
    tablet:h-[180px] tablet:text-[8px] laptop:h-[260px] laptop:text-[11px] desktop:h-[340px] desktop:text-[15px] 3xl:h-[480px] 3xl:text-[19px]
    3xl:py-[35px] 3xl:px-[25px]">
      <img src="test.jpeg" alt="testPicture" height={180} width={298} className="3xl:h-[220px] 3xl:w-full"/>
      <h6 className="text-[#747371]">Civil</h6>
      <h4 className="font-bold 3xl:text-[22px]">Office of Space Commerce examines options for commercial SSA pilot project in LEO</h4>
      <h6 className="text-[#747371]">Jeff Foust | February 18, 2023</h6>
    </div>
  );
};