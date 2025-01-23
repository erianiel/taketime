export const formatVoteRate = (value) =>
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(value);
