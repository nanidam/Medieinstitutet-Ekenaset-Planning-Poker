import LoginScreen from "../components/LoginScreen";
import { createCardsFront } from "../components/UserCards";
import { app } from "../main";
import User from "../models/User";
import socket from "../socket";
import { changeId } from "./userStore";
import { renderEndSession } from "../components/EndSession";

export let users: User[] = [];

export const pushToUsers = (user: User) => {
  users.push(user);
};

export const getUser = (id: string) => {
  return users.find((u) => u.id == id);
};

socket.on("users", (usersFromServer: User[]) => {
  users = usersFromServer;
  const cardsContainer =
    document.querySelector<HTMLDivElement>("#cards-container");
  cardsContainer && createCardsFront(users);

  changeId(usersFromServer);
});

socket.on("loginscreen", () => {
  renderEndSession(document.querySelector("#app")!);

  setTimeout(() => {
    LoginScreen(app!);
  }, 6000);
});
