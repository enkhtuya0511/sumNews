"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import style from "./signup.css";

export default function Home() {
  const [signData, setSignData] = useState({});
  const [showPass, setShowPass] = useState();
  const pressShow = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  const router = useRouter();

  const handleSignup = async () => {
    const { data } = await axios.post(`http://localhost:7000/signup`, {
      name: signData.name,
      email: signData.email,
      password: signData.password,
    });
    if (data?.user) {
      localStorage.setItem("uid", data.user.id);
    }
  };
  return (
    <div className="main-login">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            <h1>SIGN UP</h1>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                onChange={(e) =>
                  setSignData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Password"
                onChange={(e) =>
                  setSignData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                onChange={(e) =>
                  setSignData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <button className="button login__submit">
              <Link href="/login">
                <span onClick={() => handleSignup()} className="button__text">
                  SignUp
                </span>
                <i className="button__icon fas fa-chevron-right"></i>
              </Link>
            </button>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
