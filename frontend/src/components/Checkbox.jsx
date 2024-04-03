import React, { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState({});
  // console.log(isChecked[0], isChecked);
  return (
    <>
      {testArr.map((el, idx) => (
        <label
          key={idx}
          className="max-w-[580px] mb-[14px] box-border text-[#FFFFFF] flex"
          style={isChecked[idx] === true ? { backgroundColor: "red", color: "black" } : { backgroundColor: "white", color: "red" }}
        >
          <input
            type="checkbox"
            onChange={(e) => setIsChecked((prev) => ({ ...prev, [idx]: e.target.checked }))}
            value="firstUP"
            className="invisible h-0 w-0"
          />
          <div className="py-[24px] px-[32px] flex gap-[8px]">
            <div className="text-[12px]">
              <strong className="text-[24px] mb-[18px]">{el.newsletter}</strong>
              <div className="flex items-center gap-[5px] mb-[9px] font-[600]">
                <MdOutlineDateRange />
                <h5>{el.deliveryDay}</h5>
              </div>
              <p className="text-wrap">{el.description}</p>
            </div>
            <div>
              {isChecked[idx] === true ? (
                <div
                  className="py-[5px] px-[10px] flex items-center justify-center whitespace-nowrap text-[14px] 
          bg-[#FFFFFF] text-[#333] border-1 border-[#d9d9d9] rounded-[4px] gap-[4px] h-[40px] w-[100px]"
                >
                  <IoMdCheckmark className="text-[14px] text-[#000000]" /> <span>Selected</span>
                </div>
              ) : (
                <div
                  className="py-[5px] px-[10px] flex items-center justify-center whitespace-nowrap text-[14px] 
          bg-[green] text-[#333] border-1 border-[#333] rounded-[4px] gap-[4px] h-[40px] w-[100px]"
                >
                  <IoAddOutline className="text-[14px] text-[#000000]" /> <span>Add</span>
                </div>
              )}
            </div>
          </div>
        </label>
      ))}
    </>
  );
};
export default Checkbox;

const testArr = [
  {
    newsletter: "First Up",
    deliveryDay: "Monday through Friday",
    description:
      "FIRST UP is a civil, commercial and military space newsletter put together by veteran journalist Jeff Foust, who writes about space policy, commercial space, and related topics for SpaceNews.",
  },
  {
    newsletter: "Military.Space",
    deliveryDay: "Every Tuesday",
    description: "Veteran defense journalist Sandra Erwin delivers news and insights for the military space professional.",
  },
  {
    newsletter: "SpaceNews This Week",
    deliveryDay: "Every Friday",
    description:
      "SpaceNews This Week rounds up the week’s top stories and includes our conference coverage, such as our annual News from Space Symposium and News from SmallSat newsletter dailies.",
  },
];
