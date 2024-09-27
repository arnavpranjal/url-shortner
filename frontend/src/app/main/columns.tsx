"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageWithFallback from "./ImageWithFallback";
export type url = {
  id: number;
  shortLink: string;
  originalLink: string;
  date: string;
};
function getDomain(url: string) {
  url = url.replace(/^(https?:\/\/)/, "");

  return url.split("/")[0];
}
function formatDate(date: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const month = months[d.getMonth()];
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  console.log(`${month}-${day}-${year}`);
  return `${month}-${day}-${year}`;
}
export const columns: ColumnDef<url>[] = [
  {
    accessorKey: "shortLink",
    header: () => {
      return (
        <div className="text-left text-[#C9CED6] font-bold">Short Link</div>
      );
    },
    cell: ({ row }) => {
      const shortLink: string = row.getValue("shortLink");

      return (
        <div className="text-left text-white font-medium flex items-center justify-between max-w-[500px] ">
          <div className=" max-w-[450px] truncate">{shortLink}</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(shortLink);
                  }}
                  className=" rounded-full bg-[#144EE3] flex items-center justify-center w-[30px] h-[30px] ml-1 cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                </div>
              </TooltipTrigger>{" "}
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>{" "}
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    maxSize: 200,
  },
  {
    accessorKey: "originalLink",
    header: () => {
      return (
        <div className="text-left text-[#C9CED6] font-bold">Original Link</div>
      );
    },
    cell: ({ row }) => {
      const originalLink: string = row.getValue("originalLink");
      const rootDomain: string = getDomain(originalLink);
      return (
        <div className="text-left text-white font-medium flex items-center justify-start ">
          <ImageWithFallback
            src={`https://${rootDomain}/favicon.ico`}
            alt="Example Image"
            className="mr-2"
          />

          <div className="max-w-[380px] truncate">{originalLink}</div>
        </div>
      );
    },
    maxSize: 400,
  },
  {
    accessorKey: "date",
    header: () => {
      return <div className="text-left text-[#C9CED6] font-bold">Date</div>;
    },
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      const formattedDate = formatDate(date);

      return (
        <div className="text-left text-white font-medium">{formattedDate}</div>
      );
    },
  },
];
