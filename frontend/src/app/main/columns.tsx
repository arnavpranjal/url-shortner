"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, Link, Pen, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageWithFallback from "./ImageWithFallback";
import { MouseEventHandler } from "react";
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

  return `${month}-${day}-${year}`;
}

export const columns = ({
  setUser,
  setLinkId,
  setDeleteDialog,
  setActiveDialog,
  toast,
}: any): ColumnDef<url>[] => {
  const baseColumns: ColumnDef<url>[] = [
    {
      accessorKey: "shortCode",
      header: () => {
        return (
          <div className="text-left text-[#C9CED6] font-bold">Short Link</div>
        );
      },
      cell: ({ row }) => {
        const shortCode: string = row.getValue("shortCode");
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const shortUrl = `${backendUrl}/${shortCode}`;
        return (
          <div className="text-left text-white font-medium flex items-center justify-between max-w-[500px] ">
            <div className=" max-w-[350px] truncate">{shortUrl}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(shortUrl);
                      toast({ title: "Link successfully copied" });
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
      accessorKey: "originalUrl",
      header: () => {
        return (
          <div className="text-left text-[#C9CED6] font-bold">Original Url</div>
        );
      },
      cell: ({ row }) => {
        const originalUrl: string = row.getValue("originalUrl");
        const rootDomain: string = getDomain(originalUrl);
        return (
          <div className="text-left text-white font-medium flex items-center justify-start ">
            <ImageWithFallback
              src={`https://${rootDomain}/favicon.ico`}
              alt="Example Image"
            />

            <div className="max-w-[380px] truncate">{originalUrl}</div>
          </div>
        );
      },
      maxSize: 400,
    },
    {
      accessorKey: "Clicks",
      header: () => {
        return <div className="text-left text-[#C9CED6] font-bold">Clicks</div>;
      },

      cell: ({ row }) => {
        const clickCount = row.getValue("Clicks");
        return (
          <div className="text-left ml-1 max-w-[40px] truncate text-white font-medium">{`${clickCount}`}</div>
        );
      },
      size: 50,
    },
    {
      accessorKey: "isActive",
      header: () => {
        return <div className="text-left text-[#C9CED6] font-bold">Status</div>;
      },
      cell: ({ row }) => {
        const status: boolean = row.getValue("isActive");

        return (
          <div
            className={`text-left ml-1 ${
              status ? "text-green-500" : "text-yellow-500"
            } font-medium`}
          >
            {status ? "Active" : "inActive"}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return <div className="text-left text-[#C9CED6] font-bold">Date</div>;
      },
      cell: ({ row }) => {
        const date: string = row.getValue("createdAt");
        const formattedDate = formatDate(date);

        return (
          <div className="text-left text-white font-medium">
            {formattedDate}
          </div>
        );
      },
    },
  ];

  const ActionColumn: ColumnDef<url> = {
    accessorKey: "id",
    header: () => {
      return <div className="text-left text-[#C9CED6] font-bold">Actions</div>;
    },

    cell: ({ row }) => {
      const active = row.getValue("isActive");
      const toggleActive = (id: any): void => {
        setActiveDialog({ open: true, active: active });
        setLinkId(id);
      };
      const deleteLink = (id: any): void => {
        setDeleteDialog(true);
        setLinkId(id);
      };
      const id = row.getValue("id");
      return (
        <div className="flex justify-start gap-2 font-medium">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="bg-[#353C4A] w-[30px] h-[30px] flex items-center justify-center rounded-full px-auto py-auto cursor-pointer"
                  onClick={() => toggleActive(id)}
                >
                  <Link size={15} color="white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="bg-[#353C4A] w-[30px] h-[30px] flex items-center justify-center rounded-full px-auto py-auto cursor-pointer"
                  onClick={() => deleteLink(id)}
                >
                  <Trash2 size={15} color="white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  };

  if (sessionStorage.getItem("user")) {
    baseColumns.push(ActionColumn);
  }

  return baseColumns;
};
