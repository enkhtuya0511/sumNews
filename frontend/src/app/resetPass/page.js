"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdChangeCircle } from "react-icons/md";
import style from "./reset-password.css";
export default function ResetPasswordPage() {
  const router = useRouter();
  const [data, setData] = useState({});
  //   const [resetPasswordToken, setResetPasswordToken] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (newPassword !== confirmPassword) {
  //       setMessage("Passwords do not match");
  //       return;
  //     }
  //     if (newPassword.length < 6) {
  //       setMessage("Password must be at least 6 characters long");
  //       return;
  //     }
  //     try {
  //       const response = await axios.post("http://localhost:8000/reset-password", {
  //         resetPasswordToken: resetPasswordToken,
  //         newPassword: newPassword,
  //       });
  //       router.push("../components/login");
  //       setMessage(response.data.message);
  //     } catch (error) {
  //       setMessage(error.response.data.message);
  //     }
  //   };
  return (
    <div className="chnageEtseg">
      <div className="change-password-container">
        <div className="icon-container">
          <MdChangeCircle className="change-icon" />
        </div>
        <h1 className="text-[black]">Reset Password</h1>
        <form onSubmit={handleSubmit} className="password-form text-[black]">
          <input
            type="password"
            value={data.resetPasswordToken}
            // onChange={(e) => setResetPasswordToken(e.target.value)}
            onChange={(e) => setData((prev) => ({ ...prev, resetPasswordToken: e.target.value }))}
            placeholder="your email sent 4-digits code"
            className="password-input"
          />

          <input
            type="password"
            value={data.newPassword}
            // onChange={(e) => setNewPassword(e.target.value)}
            onChange={(e) => setData((prev) => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Enter new password"
            className="password-input"
          />
          <input
            type="password"
            value={data.confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            onChange={(e) => setData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm new password"
            className="password-input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
