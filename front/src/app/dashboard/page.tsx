"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms/auth";
import { isUserInRoomAtom } from "@/store/atoms/room";
import { connectWithSocketServer } from "@/lib/socket";
import { logout } from "@/lib/utils";
import SideBar from "@/components/dashboard/SideBar";
import FriendsSideBar from "@/components/dashboard/FriendsSideBar";
import Messenger from "@/components/dashboard/Messenger";
import AppBar from "@/components/dashboard/AppBar";
import Room from "@/components/room/Room";

export default function DashboardPage() {
  const [user, setUser] = useAtom(userAtom);
  const [isUserInRoom] = useAtom(isUserInRoomAtom);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDetails = localStorage.getItem("user");
      if (!userDetails) {
        logout();
      } else {
        const parsedUser = JSON.parse(userDetails);
        setUser(parsedUser);
        connectWithSocketServer(parsedUser);
      }
    }
  }, [setUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </div>
  );
}
