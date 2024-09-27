"use client";
import { Label } from "@radix-ui/react-label";
import React, { useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useToast } from "./ui/use-toast";
import Loading from "./Loading";
export default function Signup({ setPage }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [value, setValue] = React.useState("");
  const [screen, setScreen] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [verfiedEmail, setVerifiedEmail] = useState("");
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

  const validateEmailagain = (email: string) => {
    const regex: RegExp =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]{2,}\.[A-Za-z0-9]{2,}$/;
    return regex.test(email);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    if (firstName.length <= 0) {
      setFirstNameError("cannot be empty");
    } else {
      setFirstNameError("");
    }

    if (lastName.length <= 0) {
      setLastNameError("cannot be empty");
    } else {
      setLastNameError("");
    }

    if (!passwordError && !firstNameError && !lastNameError && !emailError) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        // process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
        const response = await fetch(`${backendUrl}/user/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: verfiedEmail,
            name: firstName + lastName,
            password: password,
          }),
        });

        const data = await response.json();

        if (data.message == "User successfully registered") {
          toast({ title: "User Successfully registeted" });
        } else {
          toast({
            variant: "destructive",
            title: "Error Ocurred ! Try again !",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error Ocurred ! Try again !",
        });
      }
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
      // process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
      const response = await fetch(`${backendUrl}/email/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Code sent successfully") {
        toast({ title: "code sent Successfully" });
        setScreen("otp");
      } else {
        toast({ variant: "destructive", title: "Some Error Occurred" });
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

      const response = await fetch(`${backendUrl}/email/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, value }),
      });

      const data = await response.json();

      if (data.message == "email verified") {
        toast({ title: "Congrats your email was verified " });
        setVerifiedEmail(data.email);
        setScreen("profile");
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
  const enterEmail = () => {
    return (
      <div className="flex flex-col w-7/12 h-[200px] justify-around">
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
            You will receive a 4 digit code on this email
          </p>
        </div>

        <Button className="w-full" variant="secondary" onClick={generateOtp}>
          Generate Otp
        </Button>
      </div>
    );
  };

  const enterOtpComponent = () => {
    return (
      <div className="flex flex-col w-7/12  h-[200px] justify-around">
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
            Check your mail for 4 digit code
          </p>
        </div>
        <Button className="w-full" onClick={enterOtp}>
          Submit
        </Button>
      </div>
    );
  };

  const setProfile = () => {
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-7/12 gap-4"
        noValidate
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid ">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="first-name"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
            <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
              {firstNameError != "" && "*"}
              {firstNameError}
            </p>
          </div>

          <div className="grid ">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              placeholder="last-name"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
            <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
              {lastNameError != "" && "*"}
              {lastNameError}
            </p>
          </div>
        </div>
        <div className="grid ">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Type Your Email"
            value={verfiedEmail}
            disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="grid ">
          <Label htmlFor="email">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Type Your Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <p className="text-red-500 text-sm mt-1 h-3 transition-opacity duration-300">
            {passwordError != "" && "*"}
            {passwordError}
          </p>
        </div>
        <div className="grid ">
          <Button type="submit" className="w-full">
            Create an Account
          </Button>
        </div>
      </form>
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
    <div className="flex flex-col items-center h-full justify-center py-6 px-3">
      <div className="grid gap-2 text-center mb-5">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your Infomation to create an account
        </p>
      </div>
      {screen === "email" && enterEmail()}
      {screen === "otp" && enterOtpComponent()}
      {screen === "profile" && setProfile()}

      <div className="mt-4 text-center text-sm">
        Already have an account?
        <button
          onClick={() => {
            setPage("Login");
          }}
          className="underline font-inherit text-inherit bg-transparent border-none p-0 cursor-pointer ml-1"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
