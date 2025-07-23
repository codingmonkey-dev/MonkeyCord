"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { chosenChatDetailsAtom } from "@/store/atoms/chat";
import { sendDirectMessage } from "@/lib/socket";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chosenChatDetails] = useAtom(chosenChatDetailsAtom);

  const handleSendMessage = () => {
    if (message.trim().length > 0 && chosenChatDetails) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message.trim(),
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!chosenChatDetails) return null;

  return (
    <div className="h-15 w-full flex items-center justify-center p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={`${chosenChatDetails.name}님에게 메시지를 보내세요`}
        className="w-full h-11 bg-gray-600 border-none rounded-lg text-white px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default MessageInput;
