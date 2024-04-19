"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImgInput from "@/components/ImgInput";

export default function CreateNews() {
  const router = useRouter();
  const [img, setImg] = useState(null);
  const [newData, setNewData] = useState({});
  const category = ["Choose a Category", "Health", "Science", "Travel", "World", "Space", "Other"];

  const handleSubmit = async () => {
    try {
      const data = await axios.post("http://localhost:7001/news", {
        title: newData.title,
        category: newData.category,
        image: img,
        author: newData.author,
        description: newData.description,
        source: newData.source,
        createdOn: new Date(),
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-screen min-w-screen bg-[#f0ede6] justify-center items-center text-black">
      <div className="h-auto w-[50vw] flex flex-col bg-[#f9f8f6] p-[40px] gap-[40px]">
        <div className="flex justify-between ">
          <h1 className="font-bold text-[25px] pl-[10px]">Create new...</h1>
          <button onClick={() => router.push("/")} className="w-[30px] h-[30px] bg-[plum] rounded">
            x
          </button>
        </div>

        <div className="flex flex-col gap-[5px]">
          <h5 className="ml-[5px]">Title</h5>
          <input
            onChange={(e) => setNewData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="title"
            className="p-[10px] outline-none w-[100%] rounded-[10px]"
            type="text"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-[5px]">
            <h5 className="ml-[5px]">Author</h5>
            <input
              onChange={(e) => setNewData((prev) => ({ ...prev, author: e.target.value }))}
              type="text"
              placeholder="author"
              className="p-[10px] outline-none rounded-[10px] w-[20vw] "
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <h5 className="ml-[5px]">Category</h5>
            <select
              className="p-[10px] rounded-[10px] w-[20vw]"
              onChange={(e) => setNewData((prev) => ({ ...prev, category: e.target.value }))}
            >
              {category.map((el, id) => (
                <option key={id} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ImgInput img={img} setImg={setImg} />

        <div className="flex flex-col gap-[5px]">
          <h5 className="ml-[5px]">Summary</h5>
          <textarea
            onChange={(e) => setNewData((prev) => ({ ...prev, description: e.target.value }))}
            type="text"
            placeholder="desc"
            className="p-[10px] outline-none w-full h-[300px] flex rounded"
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <h5 className="ml-[5px]">Source</h5>
          <input
            onChange={(e) => setNewData((prev) => ({ ...prev, source: e.target.value }))}
            type="text"
            placeholder="source/url"
            className="p-[10px] outline-none w-[100%] rounded-[10px]"
          />
        </div>

        <div className="flex justify-end pr-[10px] mb-[10px]">
          <button onClick={() => handleSubmit()} className="w-[65px] h-[30px] bg-[plum] rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
