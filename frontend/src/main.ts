import "./style/main.scss";
import "./stores/votesStore";
import LoginScreen from "./components/LoginScreen";
import socket from "./socket";

socket.connect();

export const app = document.querySelector<HTMLDivElement>("#app");

LoginScreen(app!);
