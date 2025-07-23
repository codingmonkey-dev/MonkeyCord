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

export const useSocketHandlers = (socket: Socket | null) => {
  const setFriends = useSetAtom(friendsAtom);
  const setPendingInvitations = useSetAtom(pendingInvitationsAtom);
  const setOnlineUsers = useSetAtom(onlineUsersAtom);
  const setMessages = useSetAtom(messagesAtom);
  const setActiveRooms = useSetAtom(activeRoomsAtom);
  const setRoomDetails = useSetAtom(roomDetailsAtom);
  const setIsUserInRoom = useSetAtom(isUserInRoomAtom);
  const setIsUserRoomCreator = useSetAtom(isUserRoomCreatorAtom);
  const setLocalStream = useSetAtom(localStreamAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

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
      // WebRTC connection preparation logic would go here
    });

    socket.on("conn-init", (data) => {
      console.log("Connection init received:", data);
      const { connUserSocketId } = data;
      // WebRTC connection initialization logic would go here
    });

    socket.on("conn-signal", (data) => {
      console.log("Connection signal received:", data);
      handleSignalingData(data);
    });

    socket.on("room-participant-left", (data) => {
      console.log("Room participant left received:", data);
      handleParticipantLeftRoom(data);
    });
  }
};
