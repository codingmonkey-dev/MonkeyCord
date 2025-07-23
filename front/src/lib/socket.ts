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
    console.log(socket?.id);
  });

  return socket;
};

export const getSocket = () => socket;

export const sendDirectMessage = (data: {
  receiverUserId: string;
  content: string;
}) => {
  socket?.emit("direct-message", data);
};

export const getDirectChatHistory = (data: { receiverUserId: string }) => {
  socket?.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  socket?.emit("room-create");
};

export const joinRoom = (data: { roomId: string }) => {
  socket?.emit("room-join", data);
};

export const leaveRoom = (data: { roomId: string }) => {
  socket?.emit("room-leave", data);
};

export const signalPeerData = (data: {
  connUserSocketId: string;
  signal: any;
}) => {
  socket?.emit("conn-signal", data);
};
