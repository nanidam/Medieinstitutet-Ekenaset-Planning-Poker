import { userId } from '../stores/userStore';
import '../style/VoteCards.scss';
import socket from '../socket';
import { GameBottomSection } from './GameScreen';

const fibonacci = [0, 1, 3, 5, 8, '?'];
const fibonacciExplained = [
  '~ 10-15 min',
  '~ 0.5 day',
  '~ 1 day',
  '~ 2-3 days',
  '~ 1 week',
  "I don't know...",
];

let clickedCard: HTMLDivElement | null = null;
let selectedFibonacci: string | number = 0;

export function VoteCards(parentElement: HTMLDivElement) {
  parentElement.innerHTML = '';
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('vote-btn-wrapper');
  btnWrapper.id = 'vote-button-wrapper';

  const submitVoteBtn = document.createElement('button');
  submitVoteBtn.id = 'submit-vote-btn';
  submitVoteBtn.className = 'submit-vote-btn';
  submitVoteBtn.innerHTML = 'Submit your vote';
  submitVoteBtn.disabled = true;

  btnWrapper.appendChild(submitVoteBtn);

  for (let i = 0; i < fibonacci.length; i++) {
    const voteCardsContainer = document.createElement('div') as HTMLDivElement;
    voteCardsContainer.classList.add('vote-card');

    const fibonacciContainer = document.createElement('div');
    fibonacciContainer.classList.add('fibonacci-container');

    const voteCardCircle = document.createElement('div');
    voteCardCircle.classList.add('vote-card-circle');

    const voteCardFibonacci = document.createElement('p');
    voteCardFibonacci.classList.add('vote-card-fibonacci');
    voteCardFibonacci.innerHTML = fibonacci[i].toString();

    const voteCardText = document.createElement('p');
    voteCardText.classList.add('vote-card-text');
    voteCardText.innerHTML = fibonacciExplained[i];

    fibonacciContainer.appendChild(voteCardCircle);
    fibonacciContainer.appendChild(voteCardFibonacci);
    voteCardsContainer.appendChild(fibonacciContainer);
    voteCardsContainer.appendChild(voteCardText);
    parentElement.appendChild(voteCardsContainer);

    //check if only one vote card is clicked at a time
    voteCardsContainer.addEventListener('click', () => {
      if (clickedCard === null) {
        clickedCard = voteCardsContainer;
        clickedCard.classList.add('vote-card--clicked');
        submitVoteBtn.disabled = false;

        selectedFibonacci = fibonacci[i];
      } else {
        clickedCard.classList.remove('vote-card--clicked');
        submitVoteBtn.disabled = true;
        if (clickedCard === voteCardsContainer) {
          clickedCard = null;
        } else {
          clickedCard = voteCardsContainer;
          clickedCard.classList.add('vote-card--clicked');
          submitVoteBtn.disabled = false;

          selectedFibonacci = fibonacci[i];
        }
      }
    });
  }

  parentElement.appendChild(btnWrapper);

  submitVoteBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    submitVote();
  });
}

export function clearVoteCards(parentElement: HTMLDivElement) {
  parentElement.innerHTML = '';
  GameBottomSection(document.getElementById('game-screen') as HTMLDivElement);
}

const submitVote = () => {
  if (clickedCard?.classList.value.includes('vote-card--clicked')) {
    socket.emit('vote', { userId: userId, vote: selectedFibonacci });
    const btnWrapper = document.getElementById('vote-button-wrapper');

    console.log(btnWrapper);

    if (btnWrapper) {
      btnWrapper.innerHTML = '';
    }
  }
};
