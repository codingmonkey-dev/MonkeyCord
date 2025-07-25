import { Socket } from "socket.io-client";
import { useSetAtom, useAtom } from "jotai";
import {
  friendsAtom,
  pendingInvitationsAtom,
  onlineUsersAtom,
} from "@/store/atoms/friends";
import { messagesAtom } from "@/store/atoms/chat";
import {
  activeRoomsAtom,
  roomDetailsAtom,
  isUserInRoomAtom,
  isUserRoomCreatorAtom,
  localStreamAtom,
  remoteStreamsAtom,
} from "@/store/atoms/room";
import {
  prepareNewPeerConnection,
  handleSignalingData,
  handleParticipantLeftRoom,
  setOnRemoteStreamCallback,
} from "./webrtc";

export const useSocketHandlers = (socket: Socket | null) => {
  const setFriends = useSetAtom(friendsAtom);
  const setPendingInvitations = useSetAtom(pendingInvitationsAtom);
  const setOnlineUsers = useSetAtom(onlineUsersAtom);
  const setMessages = useSetAtom(messagesAtom);
  const setActiveRooms = useSetAtom(activeRoomsAtom);
  const setRoomDetails = useSetAtom(roomDetailsAtom);
  const setIsUserInRoom = useSetAtom(isUserInRoomAtom);
  const setIsUserRoomCreator = useSetAtom(isUserRoomCreatorAtom);
  const [localStream] = useAtom(localStreamAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

  // 원격 스트림 콜백 설정
  setOnRemoteStreamCallback((remoteStream: MediaStream) => {
    setRemoteStreams((prev) => [...prev, remoteStream]);
  });

  if (socket) {
    socket.off("friends-list");
    socket.off("friends-invitations");
    socket.off("online-users");
    socket.off("direct-chat-history");
    socket.off("room-create");
    socket.off("active-rooms");
    socket.off("conn-prepare");
    socket.off("conn-init");
    socket.off("conn-signal");
    socket.off("room-participant-left");

    socket.on("friends-list", (data) => {
      console.log("Friends list received:", data);
      const { friends } = data;
      setFriends(friends);
    });

    socket.on("friends-invitations", (data) => {
      console.log("Friends invitations received:", data);
      const { pendingInvitations } = data;
      setPendingInvitations(pendingInvitations);
    });

    socket.on("online-users", (data) => {
      console.log("Online users received:", data);
      const { onlineUsers } = data;
      setOnlineUsers(onlineUsers);
    });

    socket.on("direct-chat-history", (data) => {
      console.log("Direct chat history received:", data);
      setMessages(data.messages);
    });

    socket.on("room-create", (data) => {
      console.log("Room create received:", data);
      const { roomDetails } = data;
      setRoomDetails(roomDetails);
      setIsUserInRoom(true);
      setIsUserRoomCreator(true);
    });

    socket.on("active-rooms", (data) => {
      console.log("Active rooms received:", data);
      const { activeRooms } = data;
      setActiveRooms(activeRooms);
    });

    socket.on("conn-prepare", (data) => {
      console.log("Connection prepare received:", data);
      const { connUserSocketId } = data;

      // 기존 참가자가 새 참가자와 연결을 준비 (연결 시작자가 됨)
      if (localStream) {
        prepareNewPeerConnection(connUserSocketId, true, localStream);
        // 새 참가자에게 연결 초기화 신호 전송
        socket.emit("conn-init", { connUserSocketId: connUserSocketId });
      }
    });

    socket.on("conn-init", (data) => {
      console.log("Connection init received:", data);
      const { connUserSocketId } = data;

      // 새로 들어온 참가자가 기존 참가자와 연결 (연결 시작자가 아님)
      if (localStream) {
        prepareNewPeerConnection(connUserSocketId, false, localStream);
      }
    });

    socket.on("conn-signal", (data) => {
      console.log("Connection signal received:", data);
      handleSignalingData(data);
    });

    socket.on("room-participant-left", (data) => {
      console.log("Room participant left received:", data);
      handleParticipantLeftRoom(data);

      // 원격 스트림에서 해당 참가자 제거
      setRemoteStreams((prev) => prev.slice(0, -1));
    });
  }
};
