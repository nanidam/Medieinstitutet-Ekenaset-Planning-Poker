import '../style/GameScreen.scss';
import { userName } from '../stores/userStore.ts';
import { users } from '../stores/usersStore.ts';
import { createPlayerNameContainer } from './Greeting.ts';
import { createCardContainer, createCardsFront } from './UserCards.ts';
import { renderLogo } from './Logo.ts';
import { RatedTasks } from './RatedTasks.ts';
import { CurrentTask } from './CurrentTask.ts';
import { UnratedTasks } from './UnratedTasks.ts';

const GameScreen = (parentElement: HTMLDivElement) => {
  parentElement.innerHTML = '';

  const gameScreen = document.createElement('div');
  gameScreen.id = 'game-screen';
  gameScreen.classList.add('game-screen');

  parentElement.appendChild(gameScreen);
  GameTopSection(gameScreen);
  GameMiddleSection(gameScreen);
  GameBottomSection(gameScreen);
};

const GameTopSection = (parentElement: HTMLDivElement) => {
  const gameTopSection = document.createElement('div');
  gameTopSection.classList.add('game-top-section');
  gameTopSection.id = 'game-top-section';

  parentElement.appendChild(gameTopSection);

  createPlayerNameContainer(userName, gameTopSection);

  const cardContainer = createCardContainer();
  gameTopSection.appendChild(cardContainer);
  createCardsFront(users);

  renderLogo(gameTopSection);

  return gameTopSection;
};

const GameMiddleSection = (parentElement: HTMLDivElement) => {
  const gameMiddleSection = document.createElement('div');
  gameMiddleSection.classList.add('game-middle-section');
  gameMiddleSection.id = 'game-middle-section';

  parentElement.appendChild(gameMiddleSection);

  UnratedTasks(gameMiddleSection);
  CurrentTask(gameMiddleSection);
  RatedTasks(gameMiddleSection);
};

export const GameBottomSection = (parentElement: HTMLDivElement) => {
  const gameBottomSection = document.createElement('div');
  gameBottomSection.classList.add('game-bottom-section');
  gameBottomSection.id = 'game-bottom-section';

  parentElement.appendChild(gameBottomSection);
};

export default GameScreen;
