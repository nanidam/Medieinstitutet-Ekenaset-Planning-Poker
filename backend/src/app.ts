import express, { Application } from "express";
import mongoose from "mongoose";
import tasksRouter from "./routes/tasks.route.js";
import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import { Socket, Server } from "socket.io";
import * as http from "http";
import User from "./models/User.js";
import { TaskModel } from "./models/TaskModel.js";
import { Task } from "./models/Task.js";
import { calculateRating } from "./helpers/calculateRating.js";
import type { ClientVoteMsg } from "./models/ClientVoteMsg.js";
import { ServerVoteMsg } from "./models/ServerVoteMsg.js";

const app: Application = express();
const server = http.createServer(app);
const port = 3000;

async function init() {
  try {
    await mongoose.connect(
      process.env["NODE_ENV"] === "production"
        ? "mongodb://mongodb:27017/ekenaset"
        : "mongodb://127.0.0.1:27017/ekenaset"
    );
    console.log("Vi är uppkopplade mot databasen!");
  } catch (error) {
    console.error(error);
  }
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const publicPath = path.resolve(
  new URL(import.meta.url).pathname,
  "..",
  "public"
);

app.use(cors());
app.use(express.static(publicPath));
app.use("/tasks", tasksRouter);

let users: User[] = [];
let votes = new Map<string, number>();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket: Socket) => {
  console.log("Client connected: ", socket.id);
  const tasks = await TaskModel.find();
  socket.emit("tasks", tasks);

  socket.on("login", (userName: string) => {
    const user = new User(userName, socket.id);
    users.push(user);
    io.emit("users", users);
  });

  socket.on("logout", (userName: string) => {
    console.log(userName + " has logged out");

    const userIndex = users.findIndex(
      (user) => user.name === userName && user.id === socket.id
    );

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      io.emit("users", users);
      io.emit("logout", userName);
    }
  });

  socket.on("endsession", () => {
    users.forEach((user) => {
      console.log(user.name + " has logged out");
      io.emit("loginscreen");
    });

    users = [];
    io.emit("users", users);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
    users = users.filter((user) => user.id !== socket.id);

    io.emit("users", users);
  });

  socket.on("tasks", async (taskTitle) => {
    const taskToAdd = new TaskModel(new Task(taskTitle, null));
    try {
      await TaskModel.create(taskToAdd);
      const tasks = await TaskModel.find();
      io.emit("tasks", tasks);
    } catch (err: any) {
      console.error(err);
    }
  });

  socket.on("set-current-task", (task: Task) => {
    io.emit("set-current-task", task);
  });

  socket.on("accept-score", async (task: Task) => {
    const updatedTask = await TaskModel.findByIdAndUpdate(task._id, {
      rating: task.rating,
    });
    console.log("Task updated: ", updatedTask);
    const tasks = await TaskModel.find();
    io.emit("tasks", tasks);
  });

  socket.on("vote", (msg: ClientVoteMsg) => {
    votes.set(msg.userId, msg.vote);
    const rating = calculateRating(Array.from(votes.values()));

    if (votes.size >= users.length) {
      io.emit(
        "vote",
        new ServerVoteMsg(JSON.stringify(Array.from(votes)), rating)
      );
      votes.clear();
    }
  });
});

server.listen(port, () => {
  console.log(`Socket started on port ${port}`);
});

init();
