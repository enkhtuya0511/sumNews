// import React, { useState } from "react";
// import { MdOutlineDateRange } from "react-icons/md";
// import { IoAddOutline } from "react-icons/io5";
// import { IoMdCheckmark } from "react-icons/io";

// const Checkbox = ({ setSubscribeData, subscribeData, setSelectedNewsletters }) => {
//   // console.log(subscribeData);
//   return (
//     <>
//       {testArr.map((el, idx) => (
//         <label
//           key={idx}
//           className="max-w-[580px] mb-[14px] box-border text-[#FFFFFF] flex"
//           style={
//             subscribeData[el.newsletter] === true
//               ? { backgroundColor: "#333", color: "#fff" }
//               : { backgroundColor: "#98bc62", color: "#000000" }
//           }
//         >
//           <input
//             type="checkbox"
//             value={el.newsletter}
//             onChange={(e) => setSubscribeData((prev) => ({ ...prev, [el.newsletter]: e.target.checked }))}
//             className="invisible h-0 w-0"
//           />
//           <div className="py-[24px] px-[32px] flex gap-[8px]">
//             <div className="text-[12px]">
//               <strong className="text-[24px] mb-[18px]">{el.newsletter}</strong>
//               <div className="flex items-center gap-[5px] mb-[9px] font-[600]">
//                 <MdOutlineDateRange />
//                 <h5>{el.deliveryDay}</h5>
//               </div>
//               <p className="text-wrap">{el.description}</p>
//             </div>
//             <div>
//               <div
//                 style={
//                   subscribeData[el.newsletter] === true
//                     ? { backgroundColor: "#FFFFFF", borderColor: "#d9d9d9" }
//                     : { backgroundColor: "#e4e8dc", borderColor: "#333" }
//                 }
//                 className="py-[5px] px-[10px] flex items-center justify-center whitespace-nowrap text-[14px] 
//           text-[#333] border-1 rounded-[4px] gap-[4px] h-[40px] w-[100px]"
//               >
//                 {subscribeData[el.newsletter] === true ? (
//                   <>
//                     <IoMdCheckmark className="text-[14px] text-[#000000]" /> <span>Selected</span>
//                   </>
//                 ) : (
//                   <>
//                     <IoAddOutline className="text-[14px] text-[#000000]" /> <span>Add</span>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </label>
//       ))}
//     </>
//   );
// };
// export default Checkbox;

// const testArr = [
//   {
//     newsletter: "First Up",
//     deliveryDay: "Monday through Friday",
//     description:
//       "FIRST UP is a civil, commercial and military space newsletter put together by veteran journalist Jeff Foust, who writes about space policy, commercial space, and related topics for SpaceNews.",
//   },
//   {
//     newsletter: "Upshot",
//     deliveryDay: "Every Monday",
//     description: "blah blah blah",
//   },
//   {
//     newsletter: "SpaceNews This Week",
//     deliveryDay: "Every Friday",
//     description:
//       "SpaceNews This Week rounds up the week’s top stories and includes our conference coverage, such as our annual News from Space Symposium and News from SmallSat newsletter dailies.",
//   },
// ];
