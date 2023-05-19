import { users } from "../stores/usersStore";
import "../style/UserCards.scss";

export const createCardContainer = () => {
  const cardsWrapper = document.createElement("div") as HTMLDivElement;
  cardsWrapper.classList.add("cards-wrapper");

  const cardContainer = document.createElement("div");
  cardContainer.id = "cards-container";
  cardContainer.classList.add("cards-container");

  cardsWrapper.appendChild(cardContainer);

  return cardsWrapper;
};

export const createCardsFront = (voteList: any[]) => {
  const cardsContainer = document.querySelector(
    "#cards-container"
  ) as HTMLDivElement;

  cardsContainer.innerHTML = "";

  voteList.forEach((vote: any) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const nameHeading = document.createElement("h3");
    nameHeading.classList.add("user-card-name");
    nameHeading.innerText = vote.name;
    card.appendChild(nameHeading);

    const cardValue = document.createElement("p");
    cardValue.classList.add("user-pending-text");
    cardValue.id = vote.userId;
    card.appendChild(cardValue);

    cardsContainer.appendChild(card);
  });
};

export const showUsersScore = (voteList: any[]) => {
  //Check all players have voted:
  if (voteList.length === users.length) {
    const cardsContainer = document.querySelector(
      "#cards-container"
    ) as HTMLDivElement;

    cardsContainer.innerHTML = "";

    voteList.forEach((vote: any) => {
      const card = document.createElement("div") as HTMLDivElement;
      card.classList.add("card");

      const delayAnimation = () => {
        card.classList.add("flipped");
      };

      const nameHeading = document.createElement("h3") as HTMLElement;
      nameHeading.classList.add("user-card-name");
      nameHeading.innerText = vote.name;
      card.appendChild(nameHeading);

      const cardValueContainer = document.createElement(
        "div"
      ) as HTMLDivElement;
      cardValueContainer.classList.add("user-card-circle-container");

      const cardCircle = document.createElement("div") as HTMLDivElement;
      cardCircle.classList.add("user-card-circle");
      cardValueContainer.appendChild(cardCircle);

      const cardValue = document.createElement("p") as HTMLParagraphElement;
      cardValue.innerText = vote.rating;
      cardValue.classList.add("user-card-score");
      cardValue.id = vote.userId;
      cardCircle.appendChild(cardValue);

      card.appendChild(cardValueContainer);
      cardsContainer.appendChild(card);

      setTimeout(delayAnimation, 20); // Minimum is 4ms
    });
  }
};
