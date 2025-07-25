const serverStore = require("../serverStore");
const roomsUpdated = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);

  if (!roomDetails) {
    console.log("Room not found:", roomId);
    socket.emit("room-join-error", { message: "방을 찾을 수 없습니다." });
    return;
  }

  console.log(`User ${socket.user.userId} joining room ${roomId}`);
  console.log("Current participants:", roomDetails.participants.length);

  const isAlreadyInRoom = roomDetails.participants.some(
    (p) => p.userId === participantDetails.userId
  );

  if (isAlreadyInRoom) {
    console.log("User already in room");
    socket.emit("room-join", { roomDetails });
    return;
  }

  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      console.log(
        `Sending conn-prepare to existing participant: ${participant.socketId}`
      );
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  serverStore.joinActiveRoom(roomId, participantDetails);

  const updatedRoomDetails = serverStore.getActiveRoom(roomId);
  console.log(
    "Participants after join:",
    updatedRoomDetails.participants.length
  );

  socket.emit("room-join", { roomDetails: updatedRoomDetails });

  roomsUpdated.updateRooms();
};

module.exports = roomJoinHandler;
