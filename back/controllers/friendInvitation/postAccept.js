const friendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");
const User = require("../../models/user");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await friendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send("에러가 발생했습니다. 다시 시도해 주세요");
    }

    const { senderId, receiverId } = invitation;

    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    await friendInvitation.findByIdAndDelete(id);

    friendsUpdates.updateFriends(senderId.toString());
    friendsUpdates.updateFriends(receiverId.toString());

    friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());
    return res.status(200).send("친구를 성공적으로 추가했습니다.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("처리 중 에러가 발생하였습니다.");
  }
};

module.exports = postAccept;
