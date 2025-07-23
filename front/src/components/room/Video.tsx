"use client";

import { useEffect, useRef } from "react";

interface VideoProps {
  stream: MediaStream;
  isLocalStream?: boolean;
}

const Video: React.FC<VideoProps> = ({ stream, isLocalStream = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [stream]);

  return (
    <div className="h-1/2 w-1/2 bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted={isLocalStream}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Video;
