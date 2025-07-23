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
    <div className="w-full h-1/5 overflow-y-auto">
      {pendingInvitations.map((invitation) => (
        <div
          key={invitation._id}
          className="w-full h-12 mt-2 flex items-center justify-between px-2"
          title={invitation.senderId.mail}
        >
          <div className="flex items-center">
            <Avatar username={invitation.senderId.username} />
            <span className="ml-2 text-gray-300 text-sm font-semibold">
              {invitation.senderId.username}
            </span>
          </div>

          <div className="flex gap-1">
            <button
              className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded flex items-center justify-center text-white disabled:opacity-50"
              onClick={() => handleAcceptInvitation(invitation._id)}
              disabled={buttonsDisabled[invitation._id]}
            >
              ✓
            </button>
            <button
              className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center text-white disabled:opacity-50"
              onClick={() => handleRejectInvitation(invitation._id)}
              disabled={buttonsDisabled[invitation._id]}
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
