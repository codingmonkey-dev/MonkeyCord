"use client";

import { useEffect } from "react";
import AddFriendDialog from "@/components/friends/AddFriendDialog";
import FriendsList from "@/components/friends/FriendsList";
import PendingInvitations from "@/components/friends/PendingInvitations";
import { getSocket } from "@/lib/socket";
import { useSocketHandlers } from "@/lib/socketHandlers";

const FriendsSideBar: React.FC = () => {
  const socket = getSocket();

  useSocketHandlers(socket);

  useEffect(() => {
    console.log("FriendsSideBar mounted, socket:", socket?.id);
  }, [socket]);

  return (
    <div
      className="w-60 h-full flex flex-col monkeycode-scrollbar border-r"
      style={{
        backgroundColor: "var(--monkeycode-bg-secondary)",
        borderColor: "var(--monkeycode-border)",
      }}
    >
      <div
        className="p-4 border-b"
        style={{ borderColor: "var(--monkeycode-border)" }}
      >
        <AddFriendDialog />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 py-4">
          <div className="flex items-center mb-4">
            <span
              className="text-xs uppercase font-semibold tracking-wide"
              style={{ color: "var(--monkeycode-text-muted)" }}
            >
              개인 메시지
            </span>
          </div>
          <div className="flex-1 overflow-y-auto monkeycode-scrollbar">
            <FriendsList />
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center mb-4">
            <span
              className="text-xs uppercase font-semibold tracking-wide"
              style={{ color: "var(--monkeycode-text-muted)" }}
            >
              초대
            </span>
          </div>
          <div className="max-h-32 overflow-y-auto monkeycode-scrollbar">
            <PendingInvitations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsSideBar;
