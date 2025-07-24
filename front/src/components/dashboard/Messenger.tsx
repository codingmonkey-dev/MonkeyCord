"use client";

import { useAtom } from "jotai";
import { chosenChatDetailsAtom } from "@/store/atoms/chat";
import Messages from "@/components/chat/Messages";
import MessageInput from "@/components/chat/MessageInput";

const Messenger: React.FC = () => {
  const [chosenChatDetails] = useAtom(chosenChatDetailsAtom);

  return (
    <div
      className="flex-1 mt-12 flex flex-col"
      style={{ backgroundColor: "var(--monkeycode-bg-primary)" }}
    >
      {!chosenChatDetails ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: "var(--monkeycode-bg-secondary)" }}
          >
            <span className="text-4xl">🐵</span>
          </div>
          <h3
            className="text-2xl font-semibold mb-2"
            style={{ color: "var(--monkeycode-text-primary)" }}
          >
            몽키코드에 오신 것을 환영합니다!
          </h3>
          <p
            className="text-center max-w-md"
            style={{ color: "var(--monkeycode-text-secondary)" }}
          >
            왼쪽에서 친구를 선택하여 대화를 시작하거나 음성 채널에 참여하세요.
          </p>
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
