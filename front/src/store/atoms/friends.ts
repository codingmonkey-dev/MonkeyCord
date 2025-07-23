import { atom } from "jotai";
import { Friend, FriendInvitation, OnlineUser } from "@/types/friend";

export const friendsAtom = atom<Friend[]>([]);
export const pendingInvitationsAtom = atom<FriendInvitation[]>([]);
export const onlineUsersAtom = atom<OnlineUser[]>([]);

export const friendsWithOnlineStatusAtom = atom((get) => {
  const friends = get(friendsAtom);
  const onlineUsers = get(onlineUsersAtom);

  return friends.map((friend) => ({
    ...friend,
    isOnline: onlineUsers.some((user) => user.userId === friend.id),
  }));
});
