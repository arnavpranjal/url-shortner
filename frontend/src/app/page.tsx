"use client";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { User } from "lucide-react";

import React, { useState, FormEvent } from "react";
export default function Home() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("Email is required");
    } else if (!re.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };
  return (
    <main className="flex min-h-screen flex-col  ">
      <div className="flex flex-row flex-grow ">
        <div
          className="bg-slate-300 flex-grow bg-cover bg-center w-5/12"
          style={{
            backgroundImage: "url('/url-shortner-img (2).jpg')",
            backdropFilter: "blur(15px)",
          }}
        ></div>
        <div className="flex-grow w-7/12">
        
          <Login />
        </div>
      </div>
    </main>
  );
}
