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
      className={`absolute rounded-lg flex flex-col shadow-lg ${roomStyle}`}
      style={{
        backgroundColor: "var(--monkeycode-bg-tertiary)",
        overflow: "hidden",
      }}
    >
      {/* 비디오 컨테이너 - 고정 높이로 제한 */}
      <div
        className="flex-1 w-full"
        style={{
          height: isRoomMinimized ? "calc(100% - 56px)" : "calc(100vh - 56px)",
          minHeight: isRoomMinimized ? "144px" : "calc(100vh - 56px)",
        }}
      >
        <VideoContainer />
      </div>

      {/* 버튼 컨테이너 - 항상 보이도록 고정 */}
      <div className="flex-shrink-0">
        <RoomButtons />
      </div>

      {/* 리사이즈 버튼 */}
      <button
        className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center text-xs hover:bg-opacity-20 hover:bg-white transition-colors z-10"
        onClick={handleRoomResize}
        style={{
          color: "var(--monkeycode-text-muted)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {isRoomMinimized ? "⛶" : "⊡"}
      </button>
    </div>
  );
};

export default Room;
