export interface Friend {
  id: string;
  username: string;
  mail: string;
}

export interface FriendWithOnlineStatus extends Friend {
  isOnline: boolean;
}

export interface FriendInvitation {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    mail: string;
  };
  receiverId: string;
}

export interface OnlineUser {
  socketId: string;
  userId: string;
}
