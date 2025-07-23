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
    <div className="absolute right-0 top-0 h-12 bg-gray-800 border-b border-gray-600 w-[calc(100%-18rem)] flex items-center justify-between px-4">
      <div className="text-white font-bold">
        {chosenChatDetails?.name || ""}
      </div>

      <div className="relative">
        <button
          className="text-white p-2 hover:bg-gray-700 rounded"
          onClick={() => setShowMenu(!showMenu)}
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-600 rounded shadow-lg py-2 min-w-48">
            <button
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              onClick={logout}
            >
              로그아웃
            </button>
            <button
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              onClick={handleAudioOnlyToggle}
            >
              {audioOnly ? "오디오만 사용 해제" : "오디오만 사용"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
