"use client";

import { useAtom } from "jotai";
import { chosenChatDetailsAtom } from "@/store/atoms/chat";
import Messages from "@/components/chat/Messages";
import MessageInput from "@/components/chat/MessageInput";

const Messenger: React.FC = () => {
  const [chosenChatDetails] = useAtom(chosenChatDetailsAtom);

  return (
    <div className="flex-1 bg-gray-700 mt-12 flex flex-col">
      {!chosenChatDetails ? (
        <div className="flex-1 flex items-center justify-center">
          <h3 className="text-white text-xl">대화 상대를 선택하세요</h3>
        </div>
      ) : (
        <>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default Messenger;
