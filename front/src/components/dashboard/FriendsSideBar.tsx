"use client";

import { useEffect } from "react";
import AddFriendDialog from "@/components/friends/AddFriendDialog";
import FriendsList from "@/components/friends/FriendsList";
import PendingInvitations from "@/components/friends/PendingInvitations";
import { getSocket } from "@/lib/socket";
import { useSocketHandlers } from "@/lib/socketHandlers";

const FriendsSideBar: React.FC = () => {
  const socket = getSocket();

  // 소켓 핸들러 등록
  useSocketHandlers(socket);

  useEffect(() => {
    console.log("FriendsSideBar mounted, socket:", socket?.id);
  }, [socket]);

  return (
    <div className="w-56 h-full flex flex-col items-center bg-gray-800 py-4">
      <AddFriendDialog />

      <div className="mt-4 mb-2">
        <span className="text-gray-400 text-xs uppercase font-semibold">
          개인 메시지
        </span>
      </div>

      <FriendsList />

      <div className="mt-4 mb-2">
        <span className="text-gray-400 text-xs uppercase font-semibold">
          초대
        </span>
      </div>

      <PendingInvitations />
    </div>
  );
};

export default FriendsSideBar;
