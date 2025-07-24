"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { pendingInvitationsAtom } from "@/store/atoms/friends";
import { acceptFriendInvitation, rejectFriendInvitation } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";

const PendingInvitations: React.FC = () => {
  const [pendingInvitations] = useAtom(pendingInvitationsAtom);
  const [buttonsDisabled, setButtonsDisabled] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAcceptInvitation = async (id: string) => {
    setButtonsDisabled((prev) => ({ ...prev, [id]: true }));

    const response = await acceptFriendInvitation({ id });

    if (response.error) {
      console.error("Failed to accept invitation:", response.exception);
      setButtonsDisabled((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleRejectInvitation = async (id: string) => {
    setButtonsDisabled((prev) => ({ ...prev, [id]: true }));

    const response = await rejectFriendInvitation({ id });

    if (response.error) {
      console.error("Failed to reject invitation:", response.exception);
      setButtonsDisabled((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      {pendingInvitations.map((invitation) => (
        <div
          key={invitation._id}
          className="flex items-center justify-between p-2 rounded group"
          title={invitation.senderId.mail}
          style={{ backgroundColor: "rgba(114, 118, 125, 0.1)" }}
        >
          <div className="flex items-center flex-1 min-w-0">
            <Avatar username={invitation.senderId.username} />
            <span
              className="ml-3 text-sm font-medium truncate"
              style={{ color: "var(--monkeycode-text-secondary)" }}
            >
              {invitation.senderId.username}
            </span>
          </div>

          <div className="flex gap-1 ml-2">
            <button
              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold disabled:opacity-50 hover:scale-105 transition-transform"
              onClick={() => handleAcceptInvitation(invitation._id)}
              disabled={buttonsDisabled[invitation._id]}
              style={{
                backgroundColor: "var(--monkeycode-success)",
                color: "white",
              }}
            >
              ✓
            </button>
            <button
              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold disabled:opacity-50 hover:scale-105 transition-transform"
              onClick={() => handleRejectInvitation(invitation._id)}
              disabled={buttonsDisabled[invitation._id]}
              style={{
                backgroundColor: "var(--monkeycode-danger)",
                color: "white",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingInvitations;
