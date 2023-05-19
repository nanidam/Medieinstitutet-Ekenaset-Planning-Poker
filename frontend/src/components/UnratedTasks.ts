import Task from "../models/Task";
import socket from "../socket";
import { unratedTasks } from "../stores/tasksStore";
import { isAdmin } from "../stores/userStore";
import "../style/UnratedTasks.scss";

export function UnratedTasks(parentElement: HTMLDivElement) {
  const unratedTasksContainer = document.createElement("div");
  unratedTasksContainer.classList.add("unrated-tasks-container");

  const unratedTaskTitle = document.createElement("h3");
  unratedTaskTitle.classList.add("unrated-task-title");
  unratedTaskTitle.innerText = "Unrated tasks:";
  unratedTasksContainer.appendChild(unratedTaskTitle);
  parentElement.appendChild(unratedTasksContainer);

  UnratedTasksList(unratedTasksContainer);
  isAdmin && AddTaskForm(unratedTasksContainer);
}

const UnratedTasksList = (parentElement: HTMLDivElement) => {
  const unratedTasksList = document.createElement("ul");
  unratedTasksList.classList.add("unrated-tasks-list");
  unratedTasksList.id = "unrated-tasks-list";
  parentElement.appendChild(unratedTasksList);

  renderUnratedTasks(unratedTasksList, unratedTasks);
};

export const renderUnratedTasks = (
  parentElement: HTMLUListElement,
  unratedTasks: Task[]
) => {
  parentElement.innerHTML = "";
  unratedTasks.forEach((task) => UnratedTask(parentElement, task));
};

const UnratedTask = (parentElement: HTMLUListElement, task: Task) => {
  const unratedTask = document.createElement("li");
  unratedTask.classList.add("unrated-task");
  unratedTask.id = `unrated-task${task._id}`;

  if (isAdmin) {
    const unratedTaskBtn = document.createElement("button");
    unratedTaskBtn.classList.add("unrated-task-btn");
    unratedTaskBtn.innerHTML = task.title;
    unratedTaskBtn.addEventListener("click", () =>
      socket.emit("set-current-task", task)
    );
    unratedTask.appendChild(unratedTaskBtn);
  } else {
    unratedTask.innerHTML = task.title;
  }
  parentElement.appendChild(unratedTask);
};

const AddTaskForm = (parentElement: HTMLDivElement) => {
  const addTaskForm = document.createElement("form");
  addTaskForm.classList.add("add-task-form");
  addTaskForm.id = "add-task-form";
  parentElement.appendChild(addTaskForm);

  const addTaskInput = document.createElement("input");
  addTaskInput.classList.add("add-task-input");
  addTaskInput.id = "add-task-input";
  addTaskInput.type = "text";
  addTaskInput.placeholder = "Add a task";
  addTaskForm.appendChild(addTaskInput);

  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("add-task-btn");
  addTaskBtn.id = "add-task-btn";
  addTaskBtn.type = "submit";
  addTaskBtn.innerHTML = "&rarr;";
  addTaskForm.appendChild(addTaskBtn);

  addTaskForm.addEventListener("submit", addTask);
};

const addTask = (evt: Event) => {
  evt.preventDefault();
  const addTaskInput = document.getElementById(
    "add-task-input"
  ) as HTMLInputElement;
  const taskTitle = addTaskInput.value;

  socket.emit("tasks", taskTitle);
  addTaskInput.value = "";
};
