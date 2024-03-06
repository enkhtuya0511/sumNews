"use client";
import axios from "axios";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import ImgInput from "@/components/ImgInput";

export default function CreateNews() {
  const category = ["Health", "Sports", "Tech", "Entertainment", "Other"];
  const [newData, setNewData] = useState({});
  const [img, setImg] = useState(null);
  const handleSubmit = async () => {
    try {
      const data = await axios.post("http://localhost:7000/news", {
        title: newData.title,
        category: newData.category,
        image: img,
        author: newData.author,
        description: newData.description,
        createdOn: new Date(),
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-[#f6f7fb] justify-center items-center">
      <NavBar />
      <div className="h-[50%] w-[60%] flex flex-col justify-center  bg-zinc-400 p-[40px] gap-[40px]">
        {/*Title*/}
        <input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title"
          className="p-[10px] outline-none w-[90%]"
          type="text"
        />
        {/*Img/Author/Category*/}
        <div className="w-[90%] flex gap-[40px] justify-between">
          <ImgInput title={newData.title} img={img} setImg={setImg} />
          <div className="flex flex-col gap-[10px]">
            <input
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, author: e.target.value }))
              }
              type="text"
              placeholder="author"
              className="p-[10px] outline-none"
            />
            <select
              className="p-[10px]"
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              {category.map((el, id) => (
                <option key={id} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*desc*/}
        <div className="w-[90%] flex">
          <textarea
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, description: e.target.value }))
            }
            type="text"
            placeholder="desc"
            className="p-[10px] outline-none w-[700px] h-[300px] flex "
          />
        </div>
        {/**Send->>> */}
        <div className="w-full flex flex-end">
          <Button onClick={() => handleSubmit()}>Send</Button>
        </div>
      </div>
    </div>
  );
}
//<div className="w-full h-full flex flex-col justify-center items-center gap-[40px]">
