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
    <div className="flex-1 w-full overflow-y-auto">
      {friends.map((friend) => (
        <button
          key={friend.id}
          className="w-full h-12 mt-2 flex items-center justify-start px-2 hover:bg-gray-700 rounded transition-colors relative"
          onClick={() =>
            handleChooseActiveConversation(friend.id, friend.username)
          }
        >
          <Avatar username={friend.username} />
          <span className="ml-2 text-gray-300 font-semibold">
            {friend.username}
          </span>
          {friend.isOnline && (
            <div className="absolute right-2 w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default FriendsList;
