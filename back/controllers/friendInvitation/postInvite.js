const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send("자신을 친구로 등록할 수는 없습니다.");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(`${targetMailAddress}는 존재하지 않는 유저입니다.`);
  }

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("이미 초대가 발송된 친구입니다.");
  }

  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res.status(409).send("이미 친구입니다");
  }

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("초대가 발송되었습니다.");
};

module.exports = postInvite;
