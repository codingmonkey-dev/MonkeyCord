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
let currentLocalStream: MediaStream | null = null;

export const setCurrentLocalStream = (stream: MediaStream | null) => {
  currentLocalStream = stream;
  console.log("Local stream updated:", !!stream);
};

export const getCurrentLocalStream = () => currentLocalStream;

export const setOnRemoteStreamCallback = (
  callback: (stream: MediaStream) => void
) => {
  onRemoteStreamCallback = callback;
};

export const prepareNewPeerConnection = (
  connUserSocketId: string,
  isInitiator: boolean
) => {
  console.log(
    `Preparing peer connection with ${connUserSocketId}, initiator: ${isInitiator}`
  );

  if (peers[connUserSocketId]) {
    console.log("Peer already exists, destroying old connection");
    peers[connUserSocketId].destroy();
  }

  const localStream = getCurrentLocalStream();
  console.log("Local stream available:", !!localStream);

  if (!localStream) {
    console.error("No local stream available for peer connection");
    return null;
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    console.log(`Sending signal to ${connUserSocketId}`);
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    console.log(`Remote stream received from ${connUserSocketId}`);
    if (onRemoteStreamCallback) {
      onRemoteStreamCallback(remoteStream);
    }
  });

  peers[connUserSocketId].on("connect", () => {
    console.log(`Peer connection established with ${connUserSocketId}`);
  });

  peers[connUserSocketId].on("error", (error) => {
    console.error(`Peer connection error with ${connUserSocketId}:`, error);
  });

  peers[connUserSocketId].on("close", () => {
    console.log(`Peer connection closed with ${connUserSocketId}`);
  });

  return peers[connUserSocketId];
};

export const handleSignalingData = (data: {
  connUserSocketId: string;
  signal: any;
}) => {
  const { connUserSocketId, signal } = data;
  console.log(`Handling signal from ${connUserSocketId}`);

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  } else {
    console.warn(`No peer found for ${connUserSocketId}`);
  }
};

export const closeAllConnections = () => {
  console.log("Closing all peer connections");
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
  console.log(`Participant ${connUserSocketId} left room`);

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }
};
