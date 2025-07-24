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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chosenChatDetails) return null;

  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={`${chosenChatDetails.name}님에게 메시지 보내기`}
          className="w-full px-4 py-3 pr-12 rounded-lg border-none outline-none text-sm resize-none"
          style={{
            backgroundColor: "var(--monkeycode-bg-secondary)",
            color: "var(--monkeycode-text-primary)",
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded flex items-center justify-center disabled:opacity-50 hover:opacity-80 transition-opacity"
          style={{ backgroundColor: "var(--monkeycode-accent)" }}
        >
          <span className="text-white text-sm">→</span>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
