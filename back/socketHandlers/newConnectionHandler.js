const serverStore = require("../serverStore");
const friendsUpdate = require("./updates/friends");
const roomsUpdate = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  console.log("새 연결 처리 - 사용자:", userDetails.userId);

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  console.log("사용자 연결 추가 완료, 친구 데이터 업데이트 중...");

  await friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);
  await friendsUpdate.updateFriends(userDetails.userId);

  setTimeout(async () => {
    await roomsUpdate.updateRooms(socket.id);
    console.log("방 목록 업데이트 완료 - 소켓:", socket.id);
  }, 500);
};

module.exports = newConnectionHandler;
