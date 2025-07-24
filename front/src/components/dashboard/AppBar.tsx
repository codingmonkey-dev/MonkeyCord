"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { chosenChatDetailsAtom } from "@/store/atoms/chat";
import { audioOnlyAtom } from "@/store/atoms/room";
import { logout } from "@/lib/utils";

const AppBar: React.FC = () => {
  const [chosenChatDetails] = useAtom(chosenChatDetailsAtom);
  const [audioOnly, setAudioOnly] = useAtom(audioOnlyAtom);
  const [showMenu, setShowMenu] = useState(false);

  const handleAudioOnlyToggle = () => {
    setAudioOnly(!audioOnly);
  };

  return (
    <div
      className="absolute right-0 top-0 h-12 border-b flex items-center justify-between px-4 shadow-sm"
      style={{
        width: "calc(100% - 332px)",
        backgroundColor: "var(--monkeycode-bg-primary)",
        borderColor: "var(--monkeycode-border)",
      }}
    >
      <div className="flex items-center">
        <div className="mr-2 text-lg">#</div>
        <div
          className="font-semibold"
          style={{ color: "var(--monkeycode-text-primary)" }}
        >
          {chosenChatDetails?.name || "몽키코드"}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded hover:bg-opacity-10 hover:bg-white transition-colors"
            style={{ color: "var(--monkeycode-text-muted)" }}
          >
            📞
          </button>
          <button
            className="p-2 rounded hover:bg-opacity-10 hover:bg-white transition-colors"
            style={{ color: "var(--monkeycode-text-muted)" }}
          >
            📹
          </button>
          <button
            className="p-2 rounded hover:bg-opacity-10 hover:bg-white transition-colors"
            style={{ color: "var(--monkeycode-text-muted)" }}
          >
            📌
          </button>
        </div>

        <div className="relative">
          <button
            className="p-2 rounded hover:bg-opacity-10 hover:bg-white transition-colors"
            onClick={() => setShowMenu(!showMenu)}
            style={{ color: "var(--monkeycode-text-muted)" }}
          >
            ⋯
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg z-20 py-1"
                style={{ backgroundColor: "var(--monkeycode-bg-modal)" }}
              >
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-10 hover:bg-white transition-colors"
                  onClick={handleAudioOnlyToggle}
                  style={{ color: "var(--monkeycode-text-secondary)" }}
                >
                  {audioOnly ? "오디오만 사용 해제" : "오디오만 사용"}
                </button>
                <div
                  className="h-px mx-2 my-1"
                  style={{ backgroundColor: "var(--monkeycode-border)" }}
                ></div>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-10 hover:bg-red-500 transition-colors"
                  onClick={logout}
                  style={{ color: "var(--monkeycode-danger)" }}
                >
                  로그아웃
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
