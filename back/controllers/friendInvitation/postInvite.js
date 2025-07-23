const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  try {
    const { targetMailAddress } = req.body;
    const { userId, mail } = req.user;

    console.log("Friend invitation request:", {
      from: mail,
      to: targetMailAddress,
      userId: userId,
    });

    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
      return res.status(409).send("자신을 친구로 등록할 수는 없습니다.");
    }

    const targetUser = await User.findOne({
      mail: targetMailAddress.toLowerCase(),
    });

    if (!targetUser) {
      console.log("Target user not found:", targetMailAddress);
      return res
        .status(404)
        .send(`${targetMailAddress}는 존재하지 않는 유저입니다.`);
    }

    console.log("Target user found:", targetUser._id);

    const invitationAlreadyReceived = await FriendInvitation.findOne({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (invitationAlreadyReceived) {
      console.log("Invitation already exists");
      return res.status(409).send("이미 초대가 발송된 친구입니다.");
    }

    const usersAlreadyFriends = targetUser.friends.find(
      (friendId) => friendId.toString() === userId.toString()
    );

    if (usersAlreadyFriends) {
      console.log("Users are already friends");
      return res.status(409).send("이미 친구입니다");
    }

    const newInvitation = await FriendInvitation.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    console.log("New invitation created:", newInvitation._id);
    console.log(
      "Updating pending invitations for user:",
      targetUser._id.toString()
    );

    // 초대받은 사용자에게 펜딩 초대 목록 업데이트
    await friendsUpdates.updateFriendsPendingInvitations(
      targetUser._id.toString()
    );

    return res.status(201).send("초대가 발송되었습니다.");
  } catch (error) {
    console.error("Error in postInvite:", error);
    return res.status(500).send("처리 중 에러가 발생하였습니다.");
  }
};

module.exports = postInvite;
