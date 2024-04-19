import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

const Checkbox = ({ setSelectedNewsletters, selectedNewsletters }) => {
  return (
    <>
      {testArr.map((el, idx) => (
        <label
          key={idx}
          className="max-w-[580px] mb-[14px] box-border text-[#FFFFFF] flex border-1 border-[gray]"
          style={
            selectedNewsletters[el.newsletter] === true
              ? { backgroundColor: "#333", color: "#fff" }
              : { backgroundColor: "#e4e8dc", color: "#000000" }
          }
        >
          <input
            type="checkbox"
            value={el.newsletter}
            onChange={(e) =>
              setSelectedNewsletters((prev) => ({
                ...prev,
                [el.newsletter]: e.target.checked,
              }))
            }
            className="invisible h-0 w-0"
          />
          <div className="w-full py-[24px] px-[32px] flex justify-between">
            <div className="text-[12px]">
              <strong className="text-[24px] mb-[18px]">{el.newsletter}</strong>
              <div className="flex items-center gap-[5px] mb-[9px] font-[600]">
                <MdOutlineDateRange />
                <h5>{el.deliveryDay}</h5>
              </div>
            </div>
            <div>
              <div
                style={
                  selectedNewsletters[el.newsletter] === true
                    ? { backgroundColor: "#FFFFFF", borderColor: "#d9d9d9" }
                    : { backgroundColor: "#FCFDFB", borderColor: "#333" }
                }
                className="py-[5px] px-[10px] flex items-center justify-center whitespace-nowrap text-[14px] 
          text-[#333] border-1 rounded-[4px] gap-[4px] h-[40px] w-[100px]"
              >
                {selectedNewsletters[el.newsletter] === true ? (
                  <>
                    <IoMdCheckmark className="text-[14px] text-[#000000]" /> <span>Selected</span>
                  </>
                ) : (
                  <>
                    <IoAddOutline className="text-[14px] text-[#000000]" /> <span>Add</span>
                  </>
                )}
              </div>
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
    newsletter: "space",
    deliveryDay: "Every Mon, Wed, Fri",
  },
  {
    newsletter: "upshot",
    deliveryDay: "Every Tue, Thurs, Sat",
  },
  {
    newsletter: "mostViewed",
    deliveryDay: "Everyday",
  },
];
