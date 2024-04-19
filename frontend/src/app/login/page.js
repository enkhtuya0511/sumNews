"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { auth } from "@/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [loginData, setLoginData] = useState({});
  const [showHide, setShowHide] = useState(false);

  const handleLogin = async () => {
    const { data } = await axios.post(`https://newsletter-gilt-nu.vercel.app/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    if (data?.token) {
      localStorage.setItem("ui", data.token);
      router.push("/");
      window.location.reload();
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Step 1: User tries to sign in using Google.
      let result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log("result:", result, credential, token, user);

      if (user) {
        const { data } = await axios.post("https://newsletter-gilt-nu.vercel.app/signInWithGoogle", {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        });
        console.log("data", data);
        if (data?.token) {
          localStorage.setItem("ui", data.token);
          router.push("/");
          window.location.reload();
        }
      }
    } catch (error) {
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("err", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
      <NavBar />
      <main className="w-full h-[80vh] flex justify-center items-center">
        <div className="bg-[#ffffff] px-[15px] py-[20px] flex flex-col text-[black] shadow-lg rounded-[10px]">
          <h1 className="text-[30px] font-bold mb-[15px] break-words">Welcome to your Newsletter. account</h1>
          <h4 className="text-[20px] font-[400] mb-[10px]">Log in with your email and password ⋆𖦹°★</h4>
          <div className="w-full">
            <p className="font-[600] block">Email</p>
            <input
              type="text"
              onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              className="px-[10px] py-[5px] border border-[#e0e0e1] rounded w-[80%] outline-none"
            />
          </div>
          <div className="w-full mt-[10px]">
            <p className="font-[600] block">Password</p>
            <div className="bg-[#ffffff] w-[80%] px-[10px] py-[5px] flex justify-between border border-[#e0e0e1] rounded">
              <input
                type={showHide ? "text" : "password"}
                onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Password"
                className="outline-none"
              />
              <button onClick={() => setShowHide(!showHide)}>{showHide ? "Hide" : "Show"}</button>
            </div>
          </div>
          <a href="/forgotPass" className="text-[#4483c5] my-[8px]">
            Forgot your password?
          </a>
          <button onClick={handleLogin} className="py-[5px] px-[25px] text-[#ffffff] bg-[#0f151e] rounded-[5px] w-[120px]">
            Log In
          </button>
          <div className="w-full flex justify-center items-center mt-[10px] gap-[10px]">
            <p>or login with</p>
            <button onClick={handleGoogleAuth} className="bg-[black] p-[10px] rounded-[50%]">
              <FaGoogle className="text-[white]" />
            </button>
          </div>
          <h4 className="mt-[20px] flex gap-[5px]">
            Need an account ?
            <a href="/signup" className="text-[#4483c5]">
              Sign Up
            </a>
          </h4>
        </div>
      </main>
    </div>
  );
}
