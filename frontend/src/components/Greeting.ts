import '../style/Greetings.scss';
import { Logout } from './Logout';

export const createPlayerNameContainer = (
  userName: string,
  parentElement: HTMLDivElement
) => {
  const playerNameContainer = document.createElement('div');
  playerNameContainer.classList.add('player-name-container');

  const playerNameHeading = document.createElement('h3');
  playerNameHeading.classList.add('greeting');
  playerNameHeading.innerText = `Welcome, `;

  const playerNameSpan = document.createElement('span');
  playerNameSpan.classList.add('player-name');
  playerNameSpan.innerHTML = `${userName}`;

  playerNameHeading.appendChild(playerNameSpan);
  playerNameContainer.appendChild(playerNameHeading);

  parentElement.appendChild(playerNameContainer);
  Logout(playerNameContainer);
};
