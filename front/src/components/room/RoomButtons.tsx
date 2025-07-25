"use client";

import { useState, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  localStreamAtom,
  roomDetailsAtom,
  isUserInRoomAtom,
  isUserRoomCreatorAtom,
  remoteStreamsAtom,
} from "@/store/atoms/room";
import { leaveRoom } from "@/lib/socket";
import { closeAllConnections, setCurrentLocalStream } from "@/lib/webrtc";

const RoomButtons: React.FC = () => {
  const [localStream, setLocalStream] = useAtom(localStreamAtom);
  const [roomDetails] = useAtom(roomDetailsAtom);
  const setIsUserInRoom = useSetAtom(isUserInRoomAtom);
  const setIsUserRoomCreator = useSetAtom(isUserRoomCreatorAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  useEffect(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      const videoTrack = localStream.getVideoTracks()[0];

      if (audioTrack) {
        setMicEnabled(audioTrack.enabled);
      }
      if (videoTrack) {
        setCameraEnabled(videoTrack.enabled);
      }
    }
  }, [localStream]);

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
        setCurrentLocalStream(null);
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
        title={micEnabled ? "마이크 끄기" : "마이크 켜기"}
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
        title={cameraEnabled ? "카메라 끄기" : "카메라 켜기"}
      >
        {cameraEnabled ? "📹" : "📷"}
      </button>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors hover:brightness-110"
        onClick={handleLeaveRoom}
        style={{ backgroundColor: "var(--monkeycode-danger)", color: "white" }}
        title="통화 종료"
      >
        ✕
      </button>
    </div>
  );
};
export default RoomButtons;
