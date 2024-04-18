"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { data } from "autoprefixer";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { en } from "date-fns/locale";
const Comment = () => {
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const router = useRouter();

  const handleSub = async () => {
    const token = localStorage.getItem("ui");
    try {
      const { data } = await axios.post(
        `http://localhost:7001/commentCreate`,
        {
          comment: comment,
          name: user?.name,
          id: user?.user_id,
        },
        {
          headers: { "x-access-token": token },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("ui");
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:7001/currentUser`, {
          headers: { "x-access-token": token },
        });
        setUser(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7001/comment");
        setComments(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (CommentId) => {
    const token = localStorage.getItem("ui");
    if (CommentId !== null) {
      try {
        const response = await axios.delete(
          `http://localhost:7001/commentDelete/${CommentId}`,
          { headers: { "x-access-token": token } }
        );
        if (response.data.success) {
          setDeleteSuccess(true);
        } else {
          console.error(response.data.message);
        }
        const data = response.data;
        setDeleteSuccess(data);
        if (data.success) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="  max-w-[1288px] text-black m-auto py-[24px] p-[20px] flex flex-col gap-[10px]  text-black">
      <div className="bg-orange-700 text-white flex items-center justify-center rounded-3xl w-[50px] h-[50px]">
        <FaUser />
      </div>
      <div>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          cols="50"
          name="comment"
          form="usrform"
          placeholder="Сэтгэгдлээ энд бичнэ үү..."
          className="border-current p-[10px]   w-[100%] border-2"
        ></textarea>
        <p className="text-lg "> All Comments : {comments.length}</p>
        <div className="flex items-end justify-end">
          <button
            className="text-white bg-gray-700 rounded-xs w-[100px] h-[30px]"
            type="submit"
            onClick={() => handleSub()}
          >
            sent
          </button>
        </div>
      </div>
      <div>
        {comments?.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex   p-[10px] gap-[15px] ">
                <div className="bg-orange-700 p-[12px]  text-white flex items-center justify-center rounded-3xl w-[40px] h-[40px]">
                  <FaUser />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">{item?.name}</p>
                  <p className="text-gray-500 p-[px] text-xs">
                    <span className="text-blue-500 text-xs"> Posted :</span>{" "}
                    {/* {formatDistance(subDays(item.createdOn, 0), new Date(), {
                      addSuffix: true,
                    })} */}
                    {formatRelative(subDays(item.createdOn, 0), new Date(), {
                      locale: en,
                    })}
                  </p>
                  <p className="text-gray-500"> comment : {item?.comment}</p>
                </div>
                <div className="flex items-end justify-end w-[80%]">
                  {user._id === item?.id ? (
                    <div className="flex w-[35px] h-[35px] bg-slate-200 items-center justify-center">
                      <button onClick={() => handleDelete(item?.CommentId)}>
                        <AiFillDelete className="text-lg text-orange-700" />
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Comment;
