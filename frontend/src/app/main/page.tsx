"use client";

import { Link, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { url, columns } from "./columns";
import { DataTable } from "./data-table";
export default function Home() {
  const [url, setUrl] = useState("");

  const handleShorten = () => {
    // Here you would implement the actual URL shortening logic
    console.log("Shortening URL:", url);
  };
  type url = {
    id: number;
    shortLink: string;
    originalLink: string;
    date: string;
  };
  const urls: url[] = [
    {
      id: 1,
      shortLink:
        "abckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      originalLink: "https://spam-check1.b-cdn.net/captcha-verify-v9.html",
      date: "2024-10-10T15:30:00.123Z",
    },
    {
      id: 2,
      shortLink:
        "abckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      originalLink: "https://www.youtube.com/watch?v=75oMMZ_hxi4",
      date: "2024-10-10T15:30:00.123Z",
    },
    {
      id: 3,
      shortLink:
        "abckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      originalLink:
        "https://stackoverflow.com/questions/72440381/react-img-onerror-not-firing",
      date: "2024-10-10T15:30:00.123Z",
    },
  ];
  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col w-screen text-center">
      <div className="flex item-center justify-between border-box p-4">
        <h1 className="font-bold  text-2xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-100% bg-clip-text text-transparent">
          Url-Shortner
        </h1>

        {/* <h1 className="font-bold text-2xl w-[150px]  ">Url-Shortner</h1> */}
        <Button className="bg-[#144EE3] px-2 py-1 text-sm ml-4">
          Login <LogIn className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="flex items-center justify-between flex-col w-full h-[250px]">
        <h1 className="font-bold  text-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-100% bg-clip-text text-transparent h-[60px]">
          Shorten Your Looong Links :)
        </h1>
        <p className="text-[#C9CED6] w-[40%] text-l text-center">
          Use this efficient and easy to use URL shortening service that
          streamlines your user experience{" "}
        </p>

        {/* <div className="flex flex-row w-full p-2 bg-gray-600">
        <div className="w-[10%] flex items-center justify-center">
            <Link></Link>
        </div>
        <div className="w-[60%]">
            <Input/>
        </div>
        <div className="w-[30%]">
  <Button className="w-full">button</Button>
        </div>
        </div> */}
        <div className="w-[40%] px-4">
          <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-2 pl-4 mx-auto">
            <div className="relative w-[75%]">
              <Input
                type="url"
                placeholder="Enter the link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:shadow-none pl-8"
              />
              <Link
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Button
              onClick={handleShorten}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200 ease-in-out w-[25%]"
            >
              Shorten Now!
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={urls} />
      </div>
    </div>
  );
}
