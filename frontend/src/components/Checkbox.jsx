import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";

const Checkbox = () => {
  return (
    <label className="max-w-[580px] mb-[14px] box-border bg-[#333] text-[#FFFFFF] flex">
      <input type="checkbox" onChange={(e) => console.log(e.target.checked)} value="firstUP" className="invisible h-0 w-0" />
      <div className="py-[24px] px-[32px] flex gap-[8px] bg-[#333]">
        <div className="text-[12px]">
          <strong className="text-[24px] mb-[18px]">First Up</strong>
          <div className="flex items-center gap-[5px] mb-[9px] font-[600]">
            <MdOutlineDateRange />
            <h5>Monday through Friday</h5>
          </div>
          <p className="text-wrap">
            FIRST UP is a civil, commercial and military space newsletter put together by veteran journalist Jeff Foust, who writes
            about space policy, commercial space, and related topics for SpaceNews.
          </p>
        </div>

        <div>
          <div
            className="py-[7px] px-[12px] flex items-start whitespace-nowrap text-[14px] 
          bg-[#FFFFFF] text-[#333] border-1 border-[#d9d9d9] rounded-[4px] gap-[4px] h-auto"
          >
            <IoAddOutline className="text-[16px]" /> <span>Add to follow</span>
          </div>
        </div>
      </div>
    </label>
  );
};

export default Checkbox;
