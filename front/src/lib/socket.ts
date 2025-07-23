import { io, Socket } from "socket.io-client";
import { User } from "@/types/auth";

let socket: Socket | null = null;

export const connectWithSocketServer = (userDetails: User) => {
  const jwtToken = userDetails.token;

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("웹소켓 서버 연결 성공");
    console.log("Socket ID:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("웹소켓 서버 연결 해제");
  });

  socket.on("connect_error", (error) => {
    console.error("웹소켓 연결 에러:", error);
  });

  return socket;
};

export const getSocket = () => socket;

export const sendDirectMessage = (data: {
  receiverUserId: string;
  content: string;
}) => {
  console.log("Sending direct message:", data);
  socket?.emit("direct-message", data);
};

export const getDirectChatHistory = (data: { receiverUserId: string }) => {
  console.log("Getting direct chat history:", data);
  socket?.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  console.log("Creating new room");
  socket?.emit("room-create");
};

export const joinRoom = (data: { roomId: string }) => {
  console.log("Joining room:", data);
  socket?.emit("room-join", data);
};

export const leaveRoom = (data: { roomId: string }) => {
  console.log("Leaving room:", data);
  socket?.emit("room-leave", data);
};

export const signalPeerData = (data: {
  connUserSocketId: string;
  signal: any;
}) => {
  console.log("Signaling peer data:", data);
  socket?.emit("conn-signal", data);
};
