"use client";
import React from "react";
import Image from "next/image";

export default function Example() {
  return (
    <div>
      {fruits.map((el, id) => (
        <div key={id}>
          <p>{el.desc}</p>
          {/* <Image src={el.img} width={100} height={60} /> */}
        </div>
      ))}
    </div>
  );
}
const fruits = [
  { desc: "shfksdhgkjsh", img: "/ulstur.jpeg" },
  { desc: "shfksdhgkjsh", img: "/ulstur.jpeg" },
  { desc: "shfksdhgkjsh", img: "/ulstur.jpeg" },
  { desc: "shfksdhgkjsh", img: "/ulstur.jpeg" },
];
