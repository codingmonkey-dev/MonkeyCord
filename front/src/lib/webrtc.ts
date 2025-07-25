import Peer from "simple-peer";
import { signalPeerData } from "./socket";

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};

const audioOnlyConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

export const getLocalStreamPreview = async (
  audioOnly = false
): Promise<MediaStream> => {
  const constraints = audioOnly ? audioOnlyConstraints : defaultConstraints;

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.log("로컬 스트림에 액세스 할 수 없습니다.");
    throw error;
  }
};

let peers: { [key: string]: Peer.Instance } = {};
let onRemoteStreamCallback: ((stream: MediaStream) => void) | null = null;

export const setOnRemoteStreamCallback = (
  callback: (stream: MediaStream) => void
) => {
  onRemoteStreamCallback = callback;
};

export const prepareNewPeerConnection = (
  connUserSocketId: string,
  isInitiator: boolean,
  localStream: MediaStream
) => {
  console.log(
    isInitiator
      ? "새로운 피어 커넥션을 시작자로써 준비합니다."
      : "새로운 피어 커넥션을 참여자로써 준비합니다."
  );

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    console.log("원격 스트림 정보가 다른 유저로부터 도착했습니다");
    if (onRemoteStreamCallback) {
      onRemoteStreamCallback(remoteStream);
    }
  });

  peers[connUserSocketId].on("connect", () => {
    console.log("피어 연결이 성공적으로 설정되었습니다");
  });

  peers[connUserSocketId].on("error", (error) => {
    console.error("피어 연결 에러:", error);
  });

  return peers[connUserSocketId];
};

export const handleSignalingData = (data: {
  connUserSocketId: string;
  signal: any;
}) => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach(([connUserSocketId, peer]) => {
    if (peer) {
      peer.destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data: {
  connUserSocketId: string;
}) => {
  const { connUserSocketId } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }
};
