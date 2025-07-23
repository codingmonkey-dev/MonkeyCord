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
    <div className="h-1/5 w-full bg-blue-600 rounded-t-lg flex items-center justify-center gap-4">
      <button
        className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
        onClick={handleToggleMic}
      >
        {micEnabled ? "🎤" : "🔇"}
      </button>

      <button
        className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
        onClick={handleToggleCamera}
      >
        {cameraEnabled ? "📹" : "📷"}
      </button>

      <button
        className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
        onClick={handleLeaveRoom}
      >
        ✕
      </button>
    </div>
  );
};

export default RoomButtons;
