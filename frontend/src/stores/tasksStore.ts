import { setCurrentTask } from '../components/CurrentTask';
import { renderRatedTasks } from '../components/RatedTasks';
import { renderUnratedTasks } from '../components/UnratedTasks';
import { VoteCards, clearVoteCards } from '../components/VoteCards';
import Task from '../models/Task';
import socket from '../socket';

export let unratedTasks: Task[];
export let ratedTasks: Task[];

socket.on('tasks', (tasks: Task[]) => {
  setCurrentTask();
  
  unratedTasks = tasks.filter((task) => task.rating === null);
  ratedTasks = tasks.filter((task) => task.rating !== null);

  const unratedTasksList = document.getElementById(
    'unrated-tasks-list'
  ) as HTMLUListElement;
  unratedTasksList && renderUnratedTasks(unratedTasksList, unratedTasks);

  const ratedTasksList = document.getElementById(
    'rated-tasks-list'
  ) as HTMLUListElement;
  ratedTasksList && renderRatedTasks(ratedTasksList, ratedTasks);

  const voteCards = document.getElementById(
    'game-bottom-section'
  ) as HTMLDivElement;

  if (voteCards) {
    clearVoteCards(voteCards);
  }
});

socket.on('set-current-task', (task: Task) => {
  setCurrentTask(task);
  const container = document.getElementById(
    'game-bottom-section'
  ) as HTMLDivElement;

  if (container) {
    VoteCards(container);
  }
});

socket.on('clear-current-task', () => {
  setCurrentTask();
});
