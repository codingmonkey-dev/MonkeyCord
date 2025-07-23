const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    console.log("updateFriendsPendingInvitations called for userId:", userId);

    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    console.log("Found pending invitations:", pendingInvitations);

    const receiverList = serverStore.getActiveConnections(userId);
    console.log("Active connections for user:", receiverList);

    const io = serverStore.getSocketServerInstance();

    if (receiverList.length > 0) {
      receiverList.forEach((receiverSocketId) => {
        console.log(
          "Emitting friends-invitations to socket:",
          receiverSocketId
        );
        io.to(receiverSocketId).emit("friends-invitations", {
          pendingInvitations: pendingInvitations ? pendingInvitations : [],
        });
      });
    } else {
      console.log("No active connections found for user:", userId);
    }
  } catch (error) {
    console.log("Error in updateFriendsPendingInvitations:", error);
  }
};

const updateFriends = async (userId) => {
  try {
    console.log("updateFriends called for userId:", userId);

    const receiverList = serverStore.getActiveConnections(userId);
    console.log("Active connections for friends update:", receiverList);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username mail"
      );

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        console.log("Friends list to send:", friendsList);

        const io = serverStore.getSocketServerInstance();
        receiverList.forEach((receiverSocketId) => {
          console.log("Emitting friends-list to socket:", receiverSocketId);
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    } else {
      console.log("No active connections found for friends update:", userId);
    }
  } catch (error) {
    console.log("Error in updateFriends:", error);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
