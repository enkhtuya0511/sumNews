import React from "react";
import { RxCaretUp } from "react-icons/rx";
// import { FaFacebook } from "react-icons/fa";
// import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="w-full bg-[#0f151e] pt-[64px] m-auto">
      <div className="w-[90vw] max-w-[1288px] flex flex-col m-auto">
        <div className="w-[100%] flex justify-end box-border pr-[30px] mb-[35px]">
          <a href="#" className="flex items-center gap-[10px] text-[#666]">
            Back to top <RxCaretUp className="p-[5px] bg-white text-black h-[32px] w-[32px]" />
          </a>
        </div>
        <h1 className="w-full font-bold text-[#e9eaeb]">NEWSLETTERS.</h1>
        <div className="w-full box-border mt-[35px] mb-[80px] flex justify-start text-[#fff]">
          <div className="flex flex-col basis-[25%]">
            <h2 className="text-[16px] mb-[5px] font-[600]">About</h2>
            <ul className="border-box text-[14px] text-left">
              <li className="py-[8px]">
                <a href="#">About Newsletters.</a>
              </li>
              {/* <li className="pb-[8px]">
                <a href="#">Advertise</a>
              </li> */}
            </ul>
          </div>

          <div className="flex flex-col basis-[25%]">
            <h2 className="text-[16px] mb-[5px] font-[600]">Subscribe</h2>
            <ul className="border-box text-[14px] text-left">
              <li className="py-[8px]">
                <a href="/subscribe">Subscribe to Our Newsletters</a>
              </li>
            </ul>
          </div>

          {/* <div className="flex flex-col basis-[25%] ml-[25%]">
            <h2 className="text-[16px] mb-[5px] font-[600]">Follow us on</h2>
            <ul className="bg-brown-300 flex mt-[8px] box-border gap-[5px]">
              <li className="bg-white rounded-[50%] h-[40px] w-[40px] flex justify-center items-center">
                <a href="#">
                  <FaFacebook className="text-black h-[24px] w-[24px] p-[2px]" />
                </a>
              </li>
              <li className="bg-white rounded-[50%] h-[40px] w-[40px] flex justify-center items-center">
                <a href="#">
                  <RiTwitterXFill className="text-black h-[24px] w-[24px] p-[2px]" />
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
