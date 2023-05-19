import { Task } from "../models/Task.js";
import { TaskModel } from "../models/TaskModel.js";

export async function addTasks(tasks: Task[]) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i] as Task;

    const newTask = new Task(task?.title, null);

    await TaskModel.create(newTask);
  }
}
