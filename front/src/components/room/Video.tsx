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

      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.error("비디오 재생 실패:", error);
        }
      };

      videoRef.current.onloadedmetadata = () => {
        playVideo();
      };

      // 이미 메타데이터가 로드된 경우 즉시 재생
      if (videoRef.current.readyState >= 1) {
        playVideo();
      }
    }

    // 클린업: 컴포넌트 언마운트 시 비디오 정지
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden relative"
      style={{ backgroundColor: "var(--monkeycode-bg-tertiary)" }}
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocalStream}
          className="w-full h-full object-cover"
          style={{ transform: isLocalStream ? "scaleX(-1)" : "none" }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: "var(--monkeycode-bg-secondary)" }}
        >
          <div
            className="text-center"
            style={{ color: "var(--monkeycode-text-muted)" }}
          >
            <div className="text-2xl mb-2">📹</div>
            <div className="text-xs">비디오 없음</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
