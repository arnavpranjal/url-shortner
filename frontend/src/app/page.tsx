"use client";
import Login from "@/components/Login";
import Password from "@/components/Password";
import Signup from "@/components/Signup";

import React, { useEffect, useState } from "react";
export default function Home() {
  const [page, setPage] = useState("Login");

  // useEffect(() => {
  //   setPage("Login");
  // }, []);

  return (
    <div className="flex flex-row min-h-screen">
      <div
        className="bg-slate-300 flex-grow bg-cover bg-center w-5/12"
        style={{
          backgroundImage: "url('/kkkl.jpg')",
          backdropFilter: "blur(15px)",
        }}
      ></div>
      <div className="flex-grow w-7/12">
        {page == "Login" && <Login setPage={setPage} />}
        {page == "Signup" && <Signup setPage={setPage} />}
        {page == "Password" && <Password setPage={setPage} />}
      </div>
    </div>
  );
}
