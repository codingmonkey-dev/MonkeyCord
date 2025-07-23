export enum ChatType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}

export interface Message {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  date: string;
  type: string;
}

export interface ChatDetails {
  id: string;
  name: string;
}
