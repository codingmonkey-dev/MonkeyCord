export interface RoomDetails {
  roomId: string;
  roomCreator?: {
    userId: string;
    socketId: string;
  };
  participants?: Array<{
    userId: string;
    socketId: string;
  }>;
}

export interface ActiveRoom {
  roomId: string;
  roomCreator: {
    userId: string;
    socketId: string;
  };
  participants: Array<{
    userId: string;
    socketId: string;
  }>;
  creatorUsername?: string;
}
