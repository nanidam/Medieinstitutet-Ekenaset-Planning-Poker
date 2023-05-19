import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number || null,
  },
});

export const TaskModel = mongoose.model("task", TaskSchema, "tasks");
