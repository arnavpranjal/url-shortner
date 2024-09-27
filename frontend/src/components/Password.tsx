"use client";

import { Label } from "@radix-ui/react-label";
import React, { useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useToast } from "./ui/use-toast";
import Loading from "./Loading";
export default function Password({ setPage }: any) {
  const [email, setEmail] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [screen, setScreen] = useState("email");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const { toast } = useToast();

  const validateEmailagain = (email: string) => {
    const regex: RegExp =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]{2,}\.[A-Za-z0-9]{2,}$/;
    return regex.test(email);
  };
  const validatePassword = (password: string, isConfirmPassword: boolean) => {
    const setError = isConfirmPassword
      ? setConfirmPasswordError
      : setPasswordError;
    if (!password) {
      setError("Password is required");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else {
      setError("");
    }
  };
  const generateOtp = async () => {
    console.log(email);
    const emailValid = validateEmailagain(email);

    if (!emailValid) {
      toast({ variant: "destructive", title: "Enter valid Email" });
      return;
    }
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(
        `${backendUrl}/email/send-code-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message === "Code sent successfully") {
        toast({ title: "code sent Successfully" });
        setScreen("otp");
      } else {
        toast({ variant: "destructive", title: data.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Some Error Occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const enterOtp = async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(
        `${backendUrl}/email/verify-code-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, value }),
        }
      );

      const data = await response.json();

      if (data.message == "Email Verified") {
        toast({ title: "Congrats your email was verified " });
        setVerifiedEmail(data.email);
        setScreen("confirm");
      } else {
        toast({ variant: "destructive", title: data.message });
      }

      setIsLoading(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message || "unknow error",
      });
    }
  };
  const setNewPassword = async () => {
    validatePassword(password, false);
    validatePassword(confirmNewPassword, true);

    if (password != confirmNewPassword) {
      toast({ variant: "destructive", title: "Password Mismatch" });
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(`${backendUrl}/user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      toast({
        title: "Password Successfully Updated ! Login with your new password",
      });

      setPage("Login");
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to update Paasword !" });
    }
  };
  const enterEmail = () => {
    return (
      <div className="flex flex-col w-full h-[250px] justify-between">
        <div className="grid">
          <Label htmlFor="email">Enter Your Email</Label>
          <Input
            id="email"
            placeholder="Type your email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <p className="text-sm mt-1 color-grey">
            Enter your registered email id{" "}
          </p>
        </div>

        <Button className="w-full" variant="secondary" onClick={generateOtp}>
          Generate Otp
        </Button>
      </div>
    );
  };
  const confirmPassword = () => {
    return (
      <div className="flex flex-col w-full h-[250px] justify-between">
        <div className="grid">
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            value={password}
            placeholder="new password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
            {passwordError != "" && "*"}
            {passwordError}
          </p>
        </div>

        <div className="grid mt-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm new password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmNewPassword(e.target.value)
            }
          />
          <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
            {confirmPasswordError != "" && "*"}
            {confirmPasswordError}
          </p>
        </div>

        <Button onClick={setNewPassword}>Confirm</Button>
      </div>
    );
  };
  const enterOtpComponent = () => {
    return (
      <div className="flex flex-col w-full  h-[250px] justify-between">
        <div className="grid">
          <div className="flex justify-start">
            <InputOTP
              maxLength={4}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-sm mt-1 color-grey">
            You will receive a 4 digit code on your email id to verify it's you{" "}
          </p>
        </div>
        <Button className="w-full" onClick={enterOtp}>
          Submit
        </Button>
      </div>
    );
  };
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="flex items-center h-full w-full justify-center py-6 px-3">
      <div className="grid gap-4 w-7/12 h-[250px]">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        {screen === "email" && enterEmail()}
        {screen === "otp" && enterOtpComponent()}
        {screen === "confirm" && confirmPassword()}

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
  );
}
