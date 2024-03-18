import React from "react";

const News2 = () => {
  return (
    <div className="flex my-[40px] gap-[64px] bg-orange-400">
      {testArr.map((el, idx) => (
        <article key={idx} className="basis-0 grow">
          <a href="#" className="text-[14px] font-[700] text-[#666] mb-[4px]">
            {el.category}
          </a>
          <h2 className="text-[#0f151e] font-[600] text-[16px] mb-[8px]">{el.title}</h2>
          <div className="text-[12px] font-[400] text-[#333]">
            {el.author} {el.date ? `| ${el.date}` : null}
          </div>
        </article>
      ))}
    </div>
  );
};

export default News2;

const testArr = [
  {
    category: "Opinion",
    title: "Koons on the Moon? Artists’ crucial role in shaping humanity’s image on Earth and beyond",
    author: "Jess Bush",
  },
  {
    category: "Commercial",
    title: "Terran Orbital announces plans to produce small satellites for geostationary orbit",
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
    title: "Space Force selects startup Defense Unicorns to update software at launch ranges",
    author: "Sandra Erwin",
    date: "March 13, 2024",
  },
];
