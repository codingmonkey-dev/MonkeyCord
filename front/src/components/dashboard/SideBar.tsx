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
    <div className="w-18 h-full flex flex-col items-center bg-gray-900 py-3">
      <button
        className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold mb-3 hover:bg-blue-700 transition-colors"
        onClick={() => window.location.reload()}
      >
        D
      </button>

      <button
        className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-3 hover:bg-blue-700 transition-colors"
        onClick={handleCreateRoom}
      >
        +
      </button>

      {activeRooms.map((room) => (
        <button
          key={room.roomId}
          className="w-12 h-12 bg-gray-700 rounded-2xl flex items-center justify-center text-white text-sm mb-3 hover:bg-gray-600 transition-colors disabled:opacity-50"
          onClick={() => handleJoinRoom(room.roomId)}
          disabled={isUserInRoom}
          title={`Creator: ${room.creatorUsername}, Participants: ${room.participants.length}`}
        >
          {room.creatorUsername?.substring(0, 2).toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
