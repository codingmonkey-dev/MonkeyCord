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
  getCurrentLocalStream,
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
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

  setOnRemoteStreamCallback((remoteStream: MediaStream) => {
    console.log("Adding remote stream to state");
    setRemoteStreams((prev) => {
      const newStreams = [...prev, remoteStream];
      console.log("Total remote streams:", newStreams.length);
      return newStreams;
    });
  });

  if (socket) {
    socket.off("friends-list");
    socket.off("friends-invitations");
    socket.off("online-users");
    socket.off("direct-chat-history");
    socket.off("room-create");
    socket.off("room-join");
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

    socket.on("room-join", (data) => {
      console.log("Room join success received:", data);
      const { roomDetails } = data;
      setRoomDetails(roomDetails);
      setIsUserInRoom(true);
      setIsUserRoomCreator(false);
    });

    socket.on("active-rooms", (data) => {
      console.log("Active rooms received:", data);
      const { activeRooms } = data;
      setActiveRooms(activeRooms);
    });

    socket.on("conn-prepare", (data) => {
      console.log("Connection prepare received from:", data.connUserSocketId);
      const { connUserSocketId } = data;

      const currentStream = getCurrentLocalStream();
      if (currentStream) {
        console.log("Preparing peer connection as initiator");
        prepareNewPeerConnection(connUserSocketId, true);
        socket.emit("conn-init", { connUserSocketId: connUserSocketId });
      } else {
        console.error("No local stream available for conn-prepare");
      }
    });

    socket.on("conn-init", (data) => {
      console.log("Connection init received from:", data.connUserSocketId);
      const { connUserSocketId } = data;

      const currentStream = getCurrentLocalStream();
      if (currentStream) {
        console.log("Preparing peer connection as receiver");
        prepareNewPeerConnection(connUserSocketId, false);
      } else {
        console.error("No local stream available for conn-init");
      }
    });

    socket.on("conn-signal", (data) => {
      console.log("Connection signal received from:", data.connUserSocketId);
      handleSignalingData(data);
    });

    socket.on("room-participant-left", (data) => {
      console.log("Room participant left:", data.connUserSocketId);
      handleParticipantLeftRoom(data);

      setRemoteStreams((prev) => {
        if (prev.length > 0) {
          const newStreams = prev.slice(0, -1);
          console.log("Remaining remote streams:", newStreams.length);
          return newStreams;
        }
        return prev;
      });
    });
  }
};
