"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (data.newPassword !== data.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (data.newPassword.length < 7) {
      setMessage("Password must be at least 7 characters long");
      return;
    }
    try {
      const response = await axios.post("http://localhost:7001/resetPassword", {
        resetPasswordToken: data.resetPasswordToken,
        newPassword: data.newPassword,
      });
      router.push("/login");
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0e4e5]">
      <div className="bg-[#ffffff] px-[15px] py-[20px] flex flex-col text-[black] shadow-lg rounded-[10px] gap-[15px] max-w-[400px] w-full">
        <h1 className="text-[20px] font-[500] ">Forgot your password ?</h1>
        <p>The code to reset your password was sent to your email. </p>
        <div className="flex flex-col text-[black]">
          <input
            type="password"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                resetPasswordToken: e.target.value,
              }))
            }
            placeholder="4-digits code"
            className="w-full p-[10px] mb-[10px] border border-[#ccc] rounded box-border outline-none"
          />

          <input
            type="password"
            onChange={(e) => setData((prev) => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Enter new password"
            className="w-full p-[10px] mb-[10px] border border-[#ccc] rounded box-border outline-none"
          />
          <input
            type="password"
            onChange={(e) => setData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm new password"
            className="w-full p-[10px] mb-[10px] border border-[#ccc] rounded box-border outline-none"
          />
          <button
            onClick={handleSubmit}
            className="py-[5px] px-[25px] text-[#ffffff] bg-[#0f151e] rounded-[5px] w-full hover:bg-[#3B3C3D]"
          >
            Submit
          </button>
        </div>

        {message && <p className="mt-[20px] text-[#007bff]">{message}</p>}
      </div>
    </div>
  );
}
