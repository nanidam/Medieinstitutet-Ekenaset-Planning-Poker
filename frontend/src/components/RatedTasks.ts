import Task from "../models/Task";
import { ratedTasks } from "../stores/tasksStore";
import "../style/RatedTasks.scss";

export function RatedTasks(parentElement: HTMLDivElement) {
  const ratedTasksContainer = document.createElement("div");
  ratedTasksContainer.classList.add("rated-tasks-container");

  const ratedTaskTitle = document.createElement("h3");
  ratedTaskTitle.classList.add("rated-task-title");
  ratedTaskTitle.innerText = "Rated tasks:";

  ratedTasksContainer.appendChild(ratedTaskTitle);
  parentElement.appendChild(ratedTasksContainer);

  RatedTasksList(ratedTasksContainer);
}

const RatedTasksList = (parentElement: HTMLDivElement) => {
  const ratedTasksList = document.createElement("ul");
  ratedTasksList.classList.add("rated-tasks-list");
  ratedTasksList.id = "rated-tasks-list";
  parentElement.appendChild(ratedTasksList);

  renderRatedTasks(ratedTasksList, ratedTasks);
};

export const renderRatedTasks = (
  parentElement: HTMLUListElement,
  ratedTasks: Task[]
) => {
  parentElement.innerHTML = "";
  ratedTasks.forEach((task) => RatedTask(parentElement, task));
};

const RatedTask = (parentElement: HTMLUListElement, task: Task) => {
  const ratedTaskList = document.createElement("li");
  ratedTaskList.classList.add("rated-task-wrapper");
  ratedTaskList.id = `rated-task${task._id}`;

  const ratingCircle = document.createElement("div");
  ratingCircle.classList.add("rating-circle");
  ratingCircle.innerHTML = `${task.rating} SP`;
  ratedTaskList.appendChild(ratingCircle);

  const ratedTask = document.createElement("p");
  ratedTask.classList.add("rated-task");
  ratedTask.innerHTML = `${task.title}`;

  ratedTaskList.appendChild(ratedTask);
  parentElement.appendChild(ratedTaskList);
};
