"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loginData, setLoginData] = useState({});
  const router = useRouter();
  const handleLogin = async () => {
    const { data } = await axios.post(`http://localhost:7001/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      router.push("/");
    }
  };
  return (
    <div className="main-login">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            <h1>LOGIN</h1>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Email"
                onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Password"
                onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <button className="button login__submit">
              <span onClick={() => handleLogin()} className="button__text">
                Log In Now
              </span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <div className="signUp">
              <p>
                Don't have an account? <br></br>
                <Link href="/signup">
                  <span>Sign Up?</span>
                </Link>
              </p>
            </div>
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
