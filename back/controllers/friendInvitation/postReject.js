const friendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const invitationExists = await friendInvitation.exists({ _id: id });

    if (invitationExists) {
      await friendInvitation.findByIdAndDelete(id);
    }

    friendsUpdates.updateFriendsPendingInvitations(userId);

    return res.status(200).send("초대가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("처리 중 에러가 발생하였습니다.");
  }
};

module.exports = postReject;
