"use client";

import { useAtom } from "jotai";
import { localStreamAtom, remoteStreamsAtom } from "@/store/atoms/room";
import Video from "./Video";

const VideoContainer: React.FC = () => {
  const [localStream] = useAtom(localStreamAtom);
  const [remoteStreams] = useAtom(remoteStreamsAtom);

  const totalParticipants = (localStream ? 1 : 0) + remoteStreams.length;

  console.log(
    "VideoContainer render - Local stream:",
    !!localStream,
    "Remote streams:",
    remoteStreams.length
  );

  return (
    <div className="w-full h-full flex flex-wrap p-2 gap-2 overflow-hidden">
      {localStream && (
        <div
          className={`rounded-lg overflow-hidden relative ${
            totalParticipants === 1
              ? "w-full h-full"
              : totalParticipants === 2
              ? "w-full h-1/2"
              : "w-1/2 h-1/2"
          }`}
          style={{ minHeight: "80px" }}
        >
          <Video stream={localStream} isLocalStream />
          <div
            className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "var(--monkeycode-text-primary)",
            }}
          >
            나
          </div>
        </div>
      )}

      {remoteStreams.map((stream, index) => (
        <div
          key={`remote-${index}`}
          className={`rounded-lg overflow-hidden relative ${
            totalParticipants === 1
              ? "w-full h-full"
              : totalParticipants === 2
              ? "w-full h-1/2"
              : "w-1/2 h-1/2"
          }`}
          style={{ minHeight: "80px" }}
        >
          <Video stream={stream} />
          <div
            className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "var(--monkeycode-text-primary)",
            }}
          >
            참가자 {index + 1}
          </div>
        </div>
      ))}

      {!localStream && remoteStreams.length === 0 && (
        <div
          className="w-full h-full flex items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--monkeycode-bg-secondary)" }}
        >
          <div
            className="text-center"
            style={{ color: "var(--monkeycode-text-muted)" }}
          >
            <div className="text-2xl mb-2">📹</div>
            <div className="text-sm">카메라 연결 중...</div>
          </div>
        </div>
      )}

      <div className="absolute top-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        로컬: {localStream ? "✓" : "✗"} | 원격: {remoteStreams.length}개
      </div>
    </div>
  );
};

export default VideoContainer;
