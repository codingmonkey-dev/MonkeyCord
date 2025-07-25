const serverStore = require("../serverStore");
const roomUpdates = require("./updates/rooms");

const roomCreateHandler = (socket) => {
  console.log("방 생성 요청 - 사용자:", socket.user.userId);
  const socketId = socket.id;
  const userId = socket.user.userId;

  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

  console.log("방 생성 완료:", roomDetails.roomId);

  socket.emit("room-create", {
    roomDetails,
  });

  roomUpdates.updateRooms();
};

module.exports = roomCreateHandler;
