import { createCardsFront, showUsersScore } from "../components/UserCards";
import { IServerVoteMsg } from "../models/IServerVoteMsg";
import { IVote } from "../models/IVote";
import socket from "../socket";
import { isAdmin } from "./userStore";
import { getUser } from "./usersStore";

const votes: IVote[] = [];

export let calculatedRating: number;

socket.on("vote", (msg: IServerVoteMsg) => {
  const voteMap: Map<string, number> = new Map(JSON.parse(msg.votes));

  const rating = msg.rating;
  calculatedRating = rating;

  if (isAdmin) {
    const ratingInput = document.getElementById(
      "score-input"
    ) as HTMLInputElement;
    ratingInput.value = rating.toString();

    const acceptRatingBtn = document.getElementById(
      "accept-score-btn"
    ) as HTMLButtonElement;
    acceptRatingBtn.disabled = false;
  }

  voteMap.forEach((vote, userId) => {
    const index = votes.findIndex((v) => v.name === getUser(userId)?.name); // Find the index of the previous vote by the user, if it exists
    if (index !== -1) {
      // If the user has previously submitted a vote, update it instead of pushing a new entry
      votes[index].rating = vote;
    } else {
      votes.push({ name: getUser(userId)!.name, rating: vote }); // Otherwise, push a new entry into the votes
    }
  });

  createCardsFront(votes);
  showUsersScore(votes);
});
