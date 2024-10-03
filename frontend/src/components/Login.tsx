"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Loading from "./Loading";
import { toast } from "./ui/use-toast";
export default function Login({ setPage }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const guestLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/main");
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      try {
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        console.log(data);

        if (response?.ok) {
          sessionStorage.setItem("jwt", data.access_token);
          sessionStorage.setItem("user", JSON.stringify(data.user));

          router.push("/main");
        } else {
          toast({ variant: "destructive", title: "failed to Login" });
          setIsLoading(false);
        }
      } catch (error) {
        toast({ variant: "destructive", title: "failed to Login" });
        setIsLoading(false);
      }
    }
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
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
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
  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex items-center h-full justify-center py-6 px-3">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-[360px] gap-4"
        noValidate
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Type Your Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              autoComplete="off"
              // required
            />

            <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
              {emailError}
            </p>
          </div>

          <div className="grid">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <div className="ml-auto  text-sm underline">
                <button
                  onClick={() => {
                    setPage("Password");
                  }}
                  className="underline font-inherit text-inherit bg-transparent border-none p-0 cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <Input
              id="Password"
              type="Password"
              placeholder="Type Your Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }

              // required
            />

            <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
              {passwordError}
            </p>
          </div>

          <div className="grid gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div>
              <svg width="360" height="40">
                <line
                  x1="60"
                  y1="20"
                  x2="300"
                  y2="20"
                  strokeWidth="2"
                  stroke="grey"
                ></line>
              </svg>
            </div>

            <Button variant="secondary" className="w-full" onClick={guestLogin}>
              Login as Guest <User className="ml-2 h-4 w-4" />
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  setPage("Signup");
                }}
                className="underline font-inherit text-inherit bg-transparent border-none p-0 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
