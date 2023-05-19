import User from "../models/User";

export let userName = "";
export let userId: string | undefined;

export let isAdmin: boolean;

export const changeName = (value: string) => {
  userName = value;

  isAdmin = userName === "admin";
};

export const changeId = (usersFromServer: User[]) => {
  userId = usersFromServer.find((u) => u.name == userName)?.id;
};
