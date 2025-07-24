"use client";

import { useState } from "react";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons";

const Room: React.FC = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const handleRoomResize = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  const roomStyle = isRoomMinimized
    ? "bottom-4 right-4 w-80 h-60"
    : "w-full h-screen";

  return (
    <div
      className={`absolute rounded-lg flex flex-col overflow-hidden shadow-lg ${roomStyle}`}
      style={{ backgroundColor: "var(--monkeycode-bg-tertiary)" }}
    >
      <VideoContainer />
      <RoomButtons />

      <button
        className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center text-xs hover:bg-opacity-20 hover:bg-white transition-colors"
        onClick={handleRoomResize}
        style={{ color: "var(--monkeycode-text-muted)" }}
      >
        {isRoomMinimized ? "⛶" : "⊡"}
      </button>
    </div>
  );
};

export default Room;
