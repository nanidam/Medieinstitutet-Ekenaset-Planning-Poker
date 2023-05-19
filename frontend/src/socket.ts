import { io } from "socket.io-client";

const socket = io(
  import.meta.env.DEV ? "http://localhost:3000" : "http://164.92.152.210:3000"
);

socket.on("connect", () => {
  console.log("Connected to Socket server");
});

export default socket;
