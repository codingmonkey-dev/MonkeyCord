"use client";

import { useAtom } from "jotai";
import { localStreamAtom, remoteStreamsAtom } from "@/store/atoms/room";
import Video from "./Video";

const VideoContainer: React.FC = () => {
  const [localStream] = useAtom(localStreamAtom);
  const [remoteStreams] = useAtom(remoteStreamsAtom);

  return (
    <div className="h-4/5 w-full flex flex-wrap">
      {localStream && <Video stream={localStream} isLocalStream />}
      {remoteStreams.map((stream, index) => (
        <Video key={index} stream={stream} />
      ))}
    </div>
  );
};

export default VideoContainer;
