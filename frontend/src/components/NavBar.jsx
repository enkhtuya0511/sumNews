"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "@/app/layout";
import { useRouter, usePathname } from "next/navigation";
import Button from "./Button";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useContext(UserDataContext);
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const categories = ["News", "Science", "World", "Health", "Space", "Travel", "Upshot"];

  const handleLogOut = () => {
    localStorage.removeItem("ui");
    setCurrentUser(null);
    window.location.reload();
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:7001/currentUser`, {
        headers: { "x-access-token": token },
      });
      setCurrentUser(data.data);
      console.log(data, "currentUser", data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <header className="bg-[#EBEAE8] w-full">
      <div className="flex justify-between max-w-[1288px] w-[90vw] m-auto py-[24px]">
        <a href="/">
          <h1 className="font-black text-[35px] text-[#000000]">NEWSLETTERS</h1>
        </a>
        <div className="flex gap-[20px]">
          {token ? (
            <div className="flex justify-center items-center gap-[10px] text-[#000000]">
              <div>{currentUser?.email}</div>
              <button onClick={handleLogOut} className="py-[10px] px-[15px] justify-center items-center">
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center text-[#000000] gap-[10px]">
              <a
                href="/login"
                style={
                  pathname === "/login"
                    ? {
                        textDecorationLine: "underline",
                        textDecorationStyle: "wavy",
                      }
                    : null
                }
              >
                Log In
              </a>{" "}
              <span> / </span>{" "}
              <a
                href="/signup"
                style={
                  pathname === "/signup"
                    ? {
                        textDecorationLine: "underline",
                        textDecorationStyle: "wavy",
                      }
                    : null
                }
              >
                Sign Up
              </a>
            </div>
          )}
          {/* )} */}
          <Button onClick={() => router.push("/subscribe")}>Subscribe to Our newsletter</Button>
        </div>
      </div>

      <div className="flex justify-between items-center max-w-[1288px] w-[90vw] m-auto bg-[#C7C7C7] text-[#000]">
        {/* <div>categories</div> */}
        <ul className="flex gap-[5px] py-[6px]">
          {categories.map((category, idx) => (
            <li key={idx} className="mr-[8px] font-medium">
              <button onClick={() => router.push(`/section?n=${category.toLowerCase()}`)}>{category}</button>
            </li>
          ))}
        </ul>
        {show ? (
          <div className="w-[300px] h-[25px] bg-[#fff] flex items-center p-[8px] pl-[10px] mr-[10px] gap-[10px] rounded-[20px]">
            <IoSearch style={{ color: "#586380" }} />
            <input
              type="text"
              value={searchInput}
              placeholder="Search by article name"
              className="w-full h-[25px] outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") return router.push(`search?query=` + searchInput);
              }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <RxCross2 style={{ color: "#586380" }} onClick={() => setShow(false)} />
          </div>
        ) : (
          <IoSearch className="w-[22px] h-[22px]" onClick={() => setShow(true)} />
        )}
      </div>
    </header>
  );
}
