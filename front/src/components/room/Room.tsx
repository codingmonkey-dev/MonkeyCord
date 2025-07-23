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
    ? "bottom-0 right-0 w-80 h-60"
    : "w-full h-screen";

  return (
    <div
      className={`absolute rounded-lg flex flex-col items-center justify-center bg-gray-900 ${roomStyle}`}
    >
      <VideoContainer />
      <RoomButtons />

      <button
        className="absolute bottom-4 right-4 text-white p-2 hover:bg-gray-700 rounded"
        onClick={handleRoomResize}
      >
        {isRoomMinimized ? "⛶" : "⊡"}
      </button>
    </div>
  );
};

export default Room;
