import { Socket } from "socket.io-client";
import { useSetAtom } from "jotai";
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
  getLocalStreamPreview,
} from "./webrtc";

// 타입을 추론하도록 하는 방식
type SetterFn<T> = (value: T | ((prevValue: T) => T)) => void;

export const setupSocketHandlers = (
  socket: Socket,
  setFriends: SetterFn<any[]>,
  setPendingInvitations: SetterFn<any[]>,
  setOnlineUsers: SetterFn<any[]>,
  setMessages: SetterFn<any[]>,
  setActiveRooms: SetterFn<any[]>,
  setRoomDetails: SetterFn<any>,
  setIsUserInRoom: SetterFn<boolean>,
  setIsUserRoomCreator: SetterFn<boolean>,
  setLocalStream: SetterFn<MediaStream | null>,
  setRemoteStreams: SetterFn<MediaStream[]>
) => {
  socket.on("friends-list", (data) => {
    const { friends } = data;
    setFriends(friends);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    setPendingInvitations(pendingInvitations);
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    setOnlineUsers(onlineUsers);
  });

  socket.on("direct-chat-history", (data) => {
    setMessages(data.messages);
  });

  socket.on("room-create", (data) => {
    const { roomDetails } = data;
    setRoomDetails(roomDetails);
    setIsUserInRoom(true);
    setIsUserRoomCreator(true);
  });

  socket.on("active-rooms", (data) => {
    const { activeRooms } = data;
    setActiveRooms(activeRooms);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    // WebRTC connection preparation logic would go here
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    // WebRTC connection initialization logic would go here
  });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    handleParticipantLeftRoom(data);
  });
};
