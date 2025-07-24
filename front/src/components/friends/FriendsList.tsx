"use client";

import { useAtom, useSetAtom } from "jotai";
import { friendsWithOnlineStatusAtom } from "@/store/atoms/friends";
import { chosenChatDetailsAtom, chatTypeAtom } from "@/store/atoms/chat";
import { ChatType } from "@/types/chat";
import Avatar from "@/components/ui/Avatar";

const FriendsList: React.FC = () => {
  const [friends] = useAtom(friendsWithOnlineStatusAtom);
  const setChosenChatDetails = useSetAtom(chosenChatDetailsAtom);
  const setChatType = useSetAtom(chatTypeAtom);

  const handleChooseActiveConversation = (
    friendId: string,
    friendName: string
  ) => {
    setChosenChatDetails({ id: friendId, name: friendName });
    setChatType(ChatType.DIRECT);
  };

  return (
    <div className="flex flex-col space-y-1">
      {friends.map((friend) => (
        <button
          key={friend.id}
          className="monkeycode-sidebar-item flex items-center px-2 py-2 rounded group"
          onClick={() =>
            handleChooseActiveConversation(friend.id, friend.username)
          }
        >
          <div className="relative">
            <Avatar username={friend.username} />
            {friend.isOnline && (
              <div className="monkeycode-online-indicator"></div>
            )}
          </div>
          <span
            className="ml-3 font-medium truncate"
            style={{ color: "var(--monkeycode-text-secondary)" }}
          >
            {friend.username}
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: "var(--monkeycode-bg-tertiary)" }}
            >
              💬
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FriendsList;
