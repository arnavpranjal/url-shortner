"use client";

import { Link, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { url, columns } from "./columns";
import { DataTable } from "./data-table";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

import { error } from "console";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  interface activedailogshape {
    open: boolean;
    active: boolean;
  }
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const [storedUrls, SetstoredUrls] = useState<any>([]);
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);
  const [linkId, setLinkId] = useState<number | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [activeDialog, setActiveDialog] = useState<activedailogshape>({
    open: false,
    active: false,
  });
  const router = useRouter();

  const fetchData = async (id: number | null) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint: string = id
      ? `${backendUrl}/url/get/${id}`
      : `${backendUrl}/url/get`;
    try {
      setIsLoading(true);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        data.sort((a: any, b: any) => b.id - a.id);
      }
      console.log(data);
      SetstoredUrls(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== undefined) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const id = JSON.parse(user).id;
      fetchData(id);
    } else {
      fetchData(null);
    }
  }, []);

  const logout = () => {
    setLogoutDialog(true);
  };
  const logoutDialogConfirm = () => {
    console.log(user);
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    router.push("/");
  };
  const deleteDialogConfirm = async (id: number) => {
    try {
      setDeleteDialog(false);
      setIsLoading(true);
      const token = sessionStorage.getItem("jwt");
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(`${backendUrl}/url/delete/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
          "content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data?.message === "link deleted successfully") {
        fetchData(user?.id);

        toast({ title: "link Deleted" });
      } else {
        toast({ variant: "destructive", title: "Some error occured" });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Some error occured" });
    } finally {
      setIsLoading(false);
    }

    console.log(linkId);
  };
  const activeDialogConfirm = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("jwt");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/url/toggle/${linkId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data?.message === "Link Status Toggled") {
        fetchData(user?.id);

        toast({ title: "link status Togged" });
      } else {
        toast({ variant: "destructive", title: "Some error occured" });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Some error occured" });
    }
  };
  const isValidUrl = (text: string) => {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-z0-9_-]+(\.[a-z0-9_-]+)*(\.[a-z0-9-]{2,})(\/\S*)?$/i;
    return urlPattern.test(text);
  };
  const handleShorten = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Here you would implement the actual URL shortening logic
    console.log(user);
    const validUrl = isValidUrl(url);
    console.log(validUrl);
    if (!validUrl) {
      toast({ variant: "destructive", title: "Not valid URL" });

      return;
    }

    try {
      setIsLoading(true);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      let userId = null;
      console.log(user);
      if (user?.id) {
        userId = user?.id;
      }

      const response = await fetch(`${backendUrl}/url/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url, id: userId }),
      });

      const data = await response.json();

      fetchData(userId);
      setUrl("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col w-full text-center">
      <div className="flex item-center justify-between border-box p-4">
        <h1 className="font-bold  text-2xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-100% bg-clip-text text-transparent">
          Url-Shortner
        </h1>
        <p>{user?.name}</p>

        {/* <h1 className="font-bold text-2xl w-[150px]  ">Url-Shortner</h1> */}

        {user?.name == undefined ? (
          <Button
            className="bg-[#144EE3] px-2 py-1 text-sm ml-4"
            onClick={() => router.push("/")}
          >
            Login <LogIn className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <div className="flex justify-between">
            <div className="bg-gray-800 text-white rounded-full py-2 px-5 flex items-center justify-between max-w-[250px] min-w-[150px] cursor-default ">
              <div className="flex flex-col items-start ">
                <span className="text-xs text-gray-400">Welcome</span>
                <span className="text-sm font-semibold truncate max-w-[200px]">
                  {user?.name}
                </span>
              </div>
            </div>
            <Button
              variant="destructive"
              className="ml-2 h-[80%] my-auto"
              onClick={logout}
            >
              LogOut
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between flex-col w-full h-[250px]">
        <h1 className="font-bold  text-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-100% bg-clip-text text-transparent h-[60px]">
          Shorten Your Looong Links :)
        </h1>
        <p className="text-[#C9CED6] w-[40%] text-l text-center">
          Use this efficient and easy to use URL shortening service that
          streamlines your user experience{" "}
        </p>

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
      {storedUrls.length > 0 ? (
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns({
              setUser,
              setLinkId,
              setDeleteDialog,
              setActiveDialog,
              toast,
            })}
            data={storedUrls || urls}
          />
        </div>
      ) : (
        <div className="bg-slate-800 italic tracking-wider text-white font-bold h-[100px] w-[80%] flex items-center justify-center mx-auto mt-[40px] rounded-lg text-2xl">
          <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-100% bg-clip-text text-transparent">
            Shorten your First Url
          </span>
        </div>
      )}

      <AlertDialog open={logoutDialog} onOpenChange={setLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setLogoutDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={() => {
                logoutDialogConfirm();
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This shortened Link will be deleted .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={() => {
                deleteDialogConfirm(linkId || 1);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={activeDialog?.open}
        onOpenChange={() => setActiveDialog({ open: false, active: false })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This link will be{" "}
              {activeDialog?.active ? "deactivated" : "activated"} .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setActiveDialog({ open: false, active: false });
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-yellow-500"
              onClick={() => {
                activeDialogConfirm();
              }}
            >
              Toggle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
