import Task from "../models/Task";
import socket from "../socket";
import { isAdmin } from "../stores/userStore";
import { calculatedRating } from "../stores/votesStore";
import "../style/CurrentTask.scss";


export function CurrentTask(parentElement: HTMLDivElement) {
  const currentTaskContainer = document.createElement('div');
  currentTaskContainer.id = 'current-task-container';
  currentTaskContainer.classList.add('current-tasks-container');
  currentTaskContainer.innerHTML = isAdmin
    ? 'Choose task to vote on'
    : 'Waiting for task to vote on';

  parentElement.appendChild(currentTaskContainer);
}

export const setCurrentTask = (task?: Task) => {
  const currentTaskContainer = document.getElementById(
    'current-task-container'
  ) as HTMLDivElement;
  if (task) {
    currentTaskContainer.innerHTML = '';
    const currentTaskTitle = document.createElement('h2');
    currentTaskTitle.classList.add('current-task-title');
    currentTaskTitle.innerHTML = `Voting on `;

    const currentTaskTitleSpan = document.createElement('span');
    currentTaskTitleSpan.classList.add('current-task-span');
    currentTaskTitleSpan.innerHTML = `"${task.title}"`;

    currentTaskTitle.appendChild(currentTaskTitleSpan);
    currentTaskContainer.appendChild(currentTaskTitle);

    if (isAdmin) {
      const scoreWrapper = document.createElement('div');
      scoreWrapper.classList.add('score-wrapper');

      const scoreInput = document.createElement("input");
      scoreInput.id = "score-input";
      scoreInput.classList.add("score-input");


      scoreInput.addEventListener('input', () => {
        acceptScoreBtn.disabled = scoreInput.value === '';
      });
      scoreWrapper.appendChild(scoreInput);
      currentTaskContainer.appendChild(scoreWrapper);

      const acceptScoreBtn = document.createElement("button");
      acceptScoreBtn.classList.add("accept-score-btn");
      acceptScoreBtn.id = "accept-score-btn";
      acceptScoreBtn.innerHTML = "Accept score";
      acceptScoreBtn.disabled = scoreInput.value == "";

      acceptScoreBtn.addEventListener("click", () => {
        if (calculatedRating || calculatedRating === 0) {
          let finalRating = scoreInput.value;
          task.rating = Number(finalRating);
          socket.emit('accept-score', task);

          CurrentTask(currentTaskContainer);
        }
      });
      scoreWrapper.appendChild(acceptScoreBtn);
    }
  } else {
    if (currentTaskContainer)
      currentTaskContainer.innerHTML = isAdmin
        ? 'Choose task to vote on'
        : 'Waiting for task to vote on';
  }
};
