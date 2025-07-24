"use client";

import { useAtom } from "jotai";
import { localStreamAtom, remoteStreamsAtom } from "@/store/atoms/room";
import Video from "./Video";

const VideoContainer: React.FC = () => {
  const [localStream] = useAtom(localStreamAtom);
  const [remoteStreams] = useAtom(remoteStreamsAtom);

  return (
    <div className="flex-1 w-full flex flex-wrap p-2 gap-2">
      {localStream && (
        <div className="flex-1 min-w-0 rounded-lg overflow-hidden relative">
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
          key={index}
          className="flex-1 min-w-0 rounded-lg overflow-hidden relative"
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
    </div>
  );
};

export default VideoContainer;
