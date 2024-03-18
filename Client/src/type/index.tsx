export type messageType = {
  createdAt: string;
  from: string;
  msg: string;
  to: string;
  _id: string;
};

export type UserType = {
  avatar: string;
  createdAt: string;
  email: string;
  name: string;
  role: number;
  socketId: string;
  state: "Online" | "Offline";
  updatedAt: string;
  _id: string;
};

export type GetMessageResponseType = {
  messages: messageType[];
  _id: string;
  user: UserType;
};
