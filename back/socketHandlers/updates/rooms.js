const serverStore = require("../../serverStore");
const User = require("../../models/user");

const updateRooms = async (toSpecifiedSocketId = null) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  const roomsWithUsernames = await Promise.all(
    activeRooms.map(async (room) => {
      try {
        const creatorUser = await User.findById(room.roomCreator.userId);
        return {
          ...room,
          creatorUsername: creatorUser ? creatorUser.username : "알 수 없음",
        };
      } catch (error) {
        console.error("사용자 정보 조회 오류:", error);
        return {
          ...room,
          creatorUsername: "알 수 없음",
        };
      }
    })
  );

  console.log("방 목록 업데이트 - 총 방 개수:", roomsWithUsernames.length);

  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit("active-rooms", {
      activeRooms: roomsWithUsernames,
    });
  } else {
    io.emit("active-rooms", {
      activeRooms: roomsWithUsernames,
    });
  }
};

module.exports = {
  updateRooms,
};
