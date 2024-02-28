"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import NavBar from "@/components/NavBar";
import Button from "@/components/Button";

export default function CreateNews() {
  const category = ["Health", "Sports", "Tech", "Entertainment", "Other"];
  const [newData, setNewData] = useState({});
  const [img, setImg] = useState(null);
  const handleSubmit = async () => {
    try {
      const data = axios.post("http://localhost:7000/news", {
        title: newData.title,
        category: newData.category,
        // image:
        author: newData.author,
        description: newData.description,
        createdOn: new Date(),
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const firebaseConfig = {
    apiKey: "AIzaSyBGlmc-ELFCwl4-SzXa2POPkyPCuuZnT1M",
    authDomain: "news-fab3a.firebaseapp.com",
    projectId: "news-fab3a",
    storageBucket: "news-fab3a.appspot.com",
    messagingSenderId: "532352840559",
    appId: "1:532352840559:web:8c93c73430e34e8f08ae9a",
    measurementId: "G-CG473HW27S",
  };
//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://my-custom-bucket");
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-[#f6f7fb] justify-center items-center">
      <NavBar />
      <div className="h-[700px] w-[900px] flex flex-col justify-center items-center bg-zinc-400 p-[40px] gap-[40px]">
        {/*Title/Category*/}
        <div className="w-full flex gap-[50px]">
          {/* {newData.image && <img src={URL.createObjectURL(newData.image)} width={30} height={30}/>} */}
          {img && <img src={URL.createObjectURL(img)} width={30} height={30} />}
          <input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="title"
            className="p-[10px] outline-none"
            type="text"
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
        {/*Img/Author*/}
        <div className="w-full flex gap-[40px]">
          <input
            type="file"
            accept="image/*"
            id="newsImage"
            onChange={(e) => {
              console.log(e.target.files[0]),
                // newData((prev) => ({...prev, image: e.target.files[0]})),
                setImg(e.target.files[0]);
            }}
          />
          <input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, author: e.target.value }))
            }
            type="text"
            placeholder="author"
            className="p-[10px] outline-none"
          />
        </div>
        {/*desc*/}
        <div className="w-full flex">
          <input
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
          <Button onClick={() => console.log(newData)}>Send</Button>
        </div>
      </div>
    </div>
  );
}
//<div className="w-full h-full flex flex-col justify-center items-center gap-[40px]">
