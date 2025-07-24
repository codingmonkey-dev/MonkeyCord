"use client";

import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  localStreamAtom,
  roomDetailsAtom,
  isUserInRoomAtom,
  isUserRoomCreatorAtom,
  remoteStreamsAtom,
} from "@/store/atoms/room";
import { leaveRoom } from "@/lib/socket";
import { closeAllConnections } from "@/lib/webrtc";

const RoomButtons: React.FC = () => {
  const [localStream, setLocalStream] = useAtom(localStreamAtom);
  const [roomDetails] = useAtom(roomDetailsAtom);
  const setIsUserInRoom = useSetAtom(isUserInRoomAtom);
  const setIsUserRoomCreator = useSetAtom(isUserRoomCreatorAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !micEnabled;
        setMicEnabled(!micEnabled);
      }
    }
  };

  const handleToggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !cameraEnabled;
        setCameraEnabled(!cameraEnabled);
      }
    }
  };

  const handleLeaveRoom = () => {
    if (roomDetails) {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
      }
      setRemoteStreams([]);
      closeAllConnections();
      leaveRoom({ roomId: roomDetails.roomId });
      setIsUserInRoom(false);
      setIsUserRoomCreator(false);
    }
  };

  return (
    <div
      className="h-14 w-full flex items-center justify-center gap-3 px-4"
      style={{ backgroundColor: "var(--monkeycode-bg-secondary)" }}
    >
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors hover:brightness-110"
        onClick={handleToggleMic}
        style={{
          backgroundColor: micEnabled
            ? "var(--monkeycode-bg-primary)"
            : "var(--monkeycode-danger)",
          color: "var(--monkeycode-text-primary)",
        }}
      >
        {micEnabled ? "🎤" : "🔇"}
      </button>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors hover:brightness-110"
        onClick={handleToggleCamera}
        style={{
          backgroundColor: cameraEnabled
            ? "var(--monkeycode-bg-primary)"
            : "var(--monkeycode-danger)",
          color: "var(--monkeycode-text-primary)",
        }}
      >
        {cameraEnabled ? "📹" : "📷"}
      </button>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors hover:brightness-110"
        onClick={handleLeaveRoom}
        style={{ backgroundColor: "var(--monkeycode-danger)", color: "white" }}
      >
        ✕
      </button>
    </div>
  );
};

export default RoomButtons;
