const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let activeRooms = [];
let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log("User connected:", { socketId, userId });
  console.log("Total connected users:", connectedUsers.size);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    const user = connectedUsers.get(socketId);
    connectedUsers.delete(socketId);
    console.log("User disconnected:", { socketId, userId: user.userId });
    console.log("Remaining connected users:", connectedUsers.size);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  console.log("Active connections for userId", userId, ":", activeConnections);
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });
  return onlineUsers;
};

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };
  activeRooms = [...activeRooms, newActiveRoom];
  console.log("방 생성됨 - 참가자 수:", newActiveRoom.participants.length);
  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};

const getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find(
    (activeRoom) => activeRoom.roomId === roomId
  );
  return activeRoom || null;
};

const joinActiveRoom = (roomId, newParticipant) => {
  const roomIndex = activeRooms.findIndex((room) => room.roomId === roomId);

  if (roomIndex !== -1) {
    const room = activeRooms[roomIndex];

    const isAlreadyParticipant = room.participants.some(
      (p) => p.socketId === newParticipant.socketId
    );

    if (!isAlreadyParticipant) {
      room.participants.push(newParticipant);
      console.log(
        `참가자 추가됨 - 방 ${roomId}, 총 참가자 수: ${room.participants.length}`
      );
    } else {
      console.log("참가자가 이미 방에 있음:", newParticipant.socketId);
    }
  } else {
    console.log("방을 찾을 수 없음:", roomId);
  }
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const roomIndex = activeRooms.findIndex((room) => room.roomId === roomId);

  if (roomIndex !== -1) {
    const room = activeRooms[roomIndex];

    room.participants = room.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );

    console.log(
      `참가자 제거됨 - 방 ${roomId}, 남은 참가자 수: ${room.participants.length}`
    );

    if (room.participants.length === 0) {
      activeRooms.splice(roomIndex, 1);
      console.log("빈 방 제거됨:", roomId);
    }
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
};
