"use client";
import { createContext, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const UserDataContext = createContext({});

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);

  const checkToken = () => {
    if (window) {
      const localToken = localStorage.getItem("ui");

      if (localToken) {
        setToken(localToken);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <UserDataContext.Provider value={{ token }}>{children}</UserDataContext.Provider>
      </body>
    </html>
  );
}
