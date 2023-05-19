import asyncHandler from "express-async-handler";
import { addTasks } from "../services/tasks.service.js";
import type { Task } from "../models/Task.js";

export const postTasks = asyncHandler(async (req, res) => {
  try {
    const tasks: Task[] = req.body;
    addTasks(tasks);
    res.json({}).status(200);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error });
  }
});
