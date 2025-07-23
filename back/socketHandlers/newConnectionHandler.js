const serverStore = require("../serverStore");
const friendsUpdate = require("./updates/friends");
const roomsUpdate = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  console.log("New connection handler for user:", userDetails.userId);

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  console.log("User added to connected users, updating friends data...");

  // 즉시 친구 초대 목록 업데이트
  await friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // 즉시 친구 목록 업데이트
  await friendsUpdate.updateFriends(userDetails.userId);

  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id);
  }, 500);
};

module.exports = newConnectionHandler;
