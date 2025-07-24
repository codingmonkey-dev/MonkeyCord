"use client";

import { useAtom } from "jotai";
import { activeRoomsAtom, isUserInRoomAtom } from "@/store/atoms/room";
import { createNewRoom, joinRoom } from "@/lib/socket";
import { getLocalStreamPreview } from "@/lib/webrtc";

const SideBar: React.FC = () => {
  const [activeRooms] = useAtom(activeRoomsAtom);
  const [isUserInRoom] = useAtom(isUserInRoomAtom);

  const handleCreateRoom = async () => {
    try {
      await getLocalStreamPreview(false);
      createNewRoom();
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await getLocalStreamPreview(false);
      joinRoom({ roomId });
    } catch (error) {
      console.error("Failed to join room:", error);
    }
  };

  return (
    <div
      className="w-[72px] h-full flex flex-col items-center py-3 border-r"
      style={{
        backgroundColor: "var(--monkeycode-bg-tertiary)",
        borderColor: "var(--monkeycode-border)",
      }}
    >
      <div className="relative mb-2">
        <button
          className="w-12 h-12 flex items-center justify-center text-white font-bold rounded-2xl transition-all duration-200 hover:rounded-lg group"
          onClick={() => window.location.reload()}
          style={{ backgroundColor: "var(--monkeycode-accent)" }}
        >
          <span className="text-lg">🐵</span>
        </button>
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 group-hover:h-5 rounded-r-full transition-all duration-200"
          style={{
            backgroundColor: "var(--monkeycode-text-primary)",
            left: "-8px",
          }}
        ></div>
      </div>

      <div
        className="w-8 h-px mb-2"
        style={{ backgroundColor: "var(--monkeycode-border)" }}
      ></div>

      <div className="relative mb-2">
        <button
          className="w-12 h-12 flex items-center justify-center text-2xl font-light rounded-2xl transition-all duration-200 hover:rounded-lg group"
          onClick={handleCreateRoom}
          style={{
            backgroundColor: "var(--monkeycode-bg-primary)",
            color: "var(--monkeycode-success)",
          }}
        >
          +
        </button>
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 group-hover:h-5 rounded-r-full transition-all duration-200"
          style={{
            backgroundColor: "var(--monkeycode-text-primary)",
            left: "-8px",
          }}
        ></div>
      </div>

      {activeRooms.map((room) => (
        <div key={room.roomId} className="relative mb-2">
          <button
            className="w-12 h-12 flex items-center justify-center text-white text-xs font-semibold rounded-2xl transition-all duration-200 hover:rounded-lg group disabled:opacity-50"
            onClick={() => handleJoinRoom(room.roomId)}
            disabled={isUserInRoom}
            title={`Creator: ${room.creatorUsername}, Participants: ${room.participants.length}`}
            style={{ backgroundColor: "var(--monkeycode-bg-primary)" }}
          >
            {room.creatorUsername?.substring(0, 2).toUpperCase()}
          </button>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 group-hover:h-5 rounded-r-full transition-all duration-200"
            style={{
              backgroundColor: "var(--monkeycode-text-primary)",
              left: "-8px",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
