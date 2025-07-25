"use client";

import { useAtom, useSetAtom } from "jotai";
import {
  activeRoomsAtom,
  isUserInRoomAtom,
  localStreamAtom,
  audioOnlyAtom,
} from "@/store/atoms/room";
import { createNewRoom, joinRoom } from "@/lib/socket";
import { getLocalStreamPreview } from "@/lib/webrtc";

const SideBar: React.FC = () => {
  const [activeRooms] = useAtom(activeRoomsAtom);
  const [isUserInRoom] = useAtom(isUserInRoomAtom);
  const setLocalStream = useSetAtom(localStreamAtom);
  const setAudioOnly = useSetAtom(audioOnlyAtom);

  const handleCreateRoom = async () => {
    try {
      // 기본적으로 비디오 + 오디오로 시작
      const stream = await getLocalStreamPreview(false);
      setLocalStream(stream);
      setAudioOnly(false);
      createNewRoom();
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      // 기본적으로 비디오 + 오디오로 시작
      const stream = await getLocalStreamPreview(false);
      setLocalStream(stream);
      setAudioOnly(false);
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
          title="몽키코드 홈"
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
          className="w-12 h-12 flex items-center justify-center text-2xl font-light rounded-2xl transition-all duration-200 hover:rounded-lg group disabled:opacity-50"
          onClick={handleCreateRoom}
          disabled={isUserInRoom}
          title="새 화상회의 방 만들기"
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
            title={`${room.creatorUsername}님의 방 (참가자: ${room.participants.length}명)`}
            style={{ backgroundColor: "var(--monkeycode-bg-primary)" }}
          >
            {room.creatorUsername?.substring(0, 2).toUpperCase() || "방"}
          </button>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 group-hover:h-5 rounded-r-full transition-all duration-200"
            style={{
              backgroundColor: "var(--monkeycode-text-primary)",
              left: "-8px",
            }}
          ></div>

          {/* 참가자 수 표시 */}
          {room.participants.length > 1 && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "var(--monkeycode-success)",
                color: "white",
              }}
            >
              {room.participants.length}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
