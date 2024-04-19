"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "@/app/layout";
import { formatRelative, subDays } from "date-fns";
import { FaUser } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Comment = ({ newsId, articleComments }) => {
  const { token } = useContext(UserDataContext);
  const [comment, setComment] = useState();
  const [user, setUser] = useState();

  const getCurrentUser = async () => {
    try {
      //get current user's data
      const { data } = await axios.get(`https://newsletter-gilt-nu.vercel.app/currentUser`, {
        headers: { "x-access-token": token },
      });
      setUser(data.data);
      console.log("userData", data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (CommentId) => {
    if (CommentId !== null) {
      try {
        const response = await axios.delete(`https://newsletter-gilt-nu.vercel.app/commentDelete/${CommentId}?articleID=${newsId}`);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const createComment = async () => {
    try {
      const response = await axios.post(`https://newsletter-gilt-nu.vercel.app/commentCreate/${newsId}`, {
        comment: comment,
        email: user?.email,
      });
      console.log("createComment", response.data);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="w-full block border-b-gray-500 border-b-2">
        <p className="text-[16px] text-[#737579] font-[700] my-[5px]">
          {articleComments?.length} {articleComments?.length === 1 ? " comment" : " comments"}
        </p>
      </div>
      <div className="flex gap-[15px] mt-[10px]">
        <FaUser className="bg-orange-700 text-[#fff] flex items-center justify-center rounded-[50%] w-[40px] h-[40px] p-[5px]" />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          placeholder="Join the discussion..."
          className="w-[100%] p-[10px] border-2 rounded-[20px]"
        />
      </div>
      <div className="flex justify-end">
        {token ? (
          <button className="text-white bg-gray-700 rounded-xs w-[100px] h-[30px]" onClick={() => createComment()}>
            send
          </button>
        ) : (
          <button
            onClick={() => alert("please log in")}
            className="text-white bg-gray-700 rounded-xs w-[100px] h-[30px] opacity-[0.5]"
          >
            send
          </button>
        )}
      </div>
      {articleComments?.map((comment, idx) => (
        <div className="flex gap-[15px]" key={idx}>
          <FaUser className="bg-orange-700 text-[#fff] flex items-center justify-center rounded-[50%] w-[40px] h-[40px] p-[5px]" />
          <div className="flex flex-col">
            <p className="text-[15px] font-[700]">{comment?.email}</p>
            <p className="text-[12px] font-[500] text-[#494E58]">{formatRelative(subDays(comment.createdOn, 0), new Date())}</p>
            <p className="text-[15px] font-[400] text-[#2A2E2E] mt-[5px]">{comment?.comment}</p>
          </div>
          <div className="flex pr-[10px] items-center justify-end w-[80%]">
            {user?.email === comment?.email ? (
              <button
                onClick={() => handleDelete(comment?.CommentId)}
                className="flex w-[35px] h-[35px] bg-slate-200 items-center justify-center"
              >
                <AiFillDelete className="text-lg text-orange-700" />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
