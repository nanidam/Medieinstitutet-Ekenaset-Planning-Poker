export const calculateRating = (votes: (number | string | null)[]) => {
  const filteredVotes = votes.filter(
    (vote) => vote !== null && vote !== "?"
  ) as number[];
  const voteSum = filteredVotes.reduce((a, b) => a + b, 0);
  const rating = voteSum / filteredVotes.length;

  if (!Number.isNaN(rating)) {
    if (rating < 0.5) return 0;
    if (rating < 2) return 1;
    if (rating < 4) return 3;
    if (rating < 6.5) return 5;

    return 8;
  } else {
    return -1; // If all users voted 'I don't know' (?)
  }
};
