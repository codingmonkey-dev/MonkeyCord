export interface RoomParticipant {
  userId: string;
  socketId: string;
}

export interface RoomDetails {
  roomCreator: RoomParticipant;
  participants: RoomParticipant[];
  roomId: string;
}

export interface ActiveRoom {
  roomCreator: RoomParticipant;
  participants: RoomParticipant[];
  roomId: string;
  creatorUsername: string;
}
