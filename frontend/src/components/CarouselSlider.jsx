import React from "react";

const CarouselSlider = () => {
  return (
    <div className="w-full bg-purple-400 mt-[40px] box-border flex flex-col text-[#0f151e] relative">
      <div className="bg-green-200 flex flex-col">
        <h1 className="font-[600] text-[25px] w-[100%] mb-[10px]">Science</h1>
        <div className="w-full flex bg-plum gap-[30px] overflow-x-auto">
            <button className="absolute bg-[red] top-[50%] left-[30px]" onClick={console.log("clicked")}>Prev</button>
          {testArr.map((el, idx) => (
            <article key={idx} className="basis-[20%] min-w-[215px]">
              <div className="pb-[8px] box-border">
                <img
                  src="testPic1.webp"
                  alt="testPic1"
                  className="h-auto w-[100%]"
                />
              </div>
              <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">
                {el.title}
              </h2>
              <div className="text-[12px] font-[400] text-[#333]">
                {el.author} {el.date ? `| ${el.date}` : null}
              </div>
            </article>
          ))}
            <button className="absolute bg-[red] top-[50%] right-[30px]" onClick={console.log("clicked")}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;

const testArr = [
  {
    category: "Opinion",
    title:
      "Koons on the Moon? Artists’ crucial role in shaping humanity’s image on Earth and beyond",
    author: "Jess Bush",
  },
  {
    category: "Commercial",
    title:
      "Terran Orbital announces plans to produce small satellites for geostationary orbit",
    author: "Sandra Erwin",
    date: "March 14, 2024",
  },
  {
    category: "Launch",
    title: "Surprise Chinese lunar mission hit by launch anomaly",
    author: "Andrew Jones",
    date: "March 14, 2024",
  },
  {
    category: "Civil",
    title: "NASA restructures Earth System Observatory to reduce costs",
    author: "Jeff Foust",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title:
      "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title:
      "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title:
      "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
  {
    category: "Military",
    title:
      "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
];
