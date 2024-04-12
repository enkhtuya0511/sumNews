"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function Home() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [loginData, setLoginData] = useState({});

  const handleLogin = async () => {
    const { data } = await axios.post(`http://localhost:7001/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    if (data?.token) {
      localStorage.setItem("ui", data.token);
      router.push("/");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Step 1: User tries to sign in using Google.
      let result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("result:", result, credential, token, user);

      if (user) {
        const { data } = await axios.post("http://localhost:7001/signInWithGoogle", {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        });
        console.log("data", data);
        if (data?.token) {
          localStorage.setItem("ui", data.token);
          router.push("/");
        }
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
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
              className="px-[10px] py-[5px] border border-[#e0e0e1] rounded w-[80%]"
            />
          </div>
          <div className="w-full mt-[10px]">
            <p className="font-[600] block">Password</p>
            <input
              type="text"
              onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              className="px-[10px] py-[5px] border border-[#e0e0e1] rounded w-[80%]"
            />
          </div>
          <a href="/forgotPass" className="text-[#4483c5] my-[8px]">
            Forgot your password?
          </a>
          <button onClick={handleLogin} className="py-[5px] px-[25px] text-[#ffffff] bg-[#0f151e] rounded-[5px] w-[120px]">
            Log In
          </button>
          <div className="w-full flex flex-col justify-center items-center mt-[10px] gap-[10px]">
            <p>or login with</p>
            <div className="flex gap-[15px]">
              <button onClick={handleGoogleAuth} className="bg-[black] p-[10px] rounded-[50%]">
                <FaGoogle className="text-[white]" />
              </button>
              <button className="bg-[black] p-[10px] rounded-[50%]">
                <FaFacebook className="text-[white]" />
              </button>
            </div>
          </div>
          <h4 className="mt-[20px] flex gap-[5px]">
            Need an account ?
            <a href="#" className="text-[#4483c5]">
              Sign Up
            </a>
          </h4>
        </div>
      </main>
    </div>
  );
}
