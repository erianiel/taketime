import { POSTER_PATH_BASE_URL, SEARCH_TYPE } from "../services/tmdb";

export const formatVoteRate = (value) =>
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(value);

export const formatRuntime = (minutes) => {
  if (!minutes) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0 };

  const units = {
    year: 365 * 24 * 60,
    month: 30 * 24 * 60,
    day: 24 * 60,
    hour: 60,
  };

  const years = Math.floor(minutes / units.year);
  minutes %= units.year;
  const months = Math.floor(minutes / units.month);
  minutes %= units.month;
  const days = Math.floor(minutes / units.day);
  minutes %= units.day;
  const hours = Math.floor(minutes / units.hour);
  minutes %= units.hour;

  return { years, months, days, hours, minutes };
};

export const getCompletionDate = ({
  runtime,
  time,
  unit = "hour",
  cadence = "day",
}) => {
  const minutes = unit === "hour" ? time * 60 : time;

  const unitDurations = {
    day: 1,
    week: 7,
    month: 30,
  };

  const daysNeeded = (runtime / minutes) * unitDurations[cadence];

  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + daysNeeded);

  return completionDate;
};

export const getShowInfo = (item, showType) => {
  if (!item) return {};

  let posterPath = `${POSTER_PATH_BASE_URL}${item.poster_path}`;
  let title;
  let runtime;
  let release;
  let numSeasons = item?.number_of_seasons;
  const lastEpisode = item.last_air_date?.slice(0, 4);
  const inProduction = item.in_production;

  if (showType === SEARCH_TYPE.MOVIE) {
    title = item.original_title;
    runtime = item.runtime;
    release = item.release_date?.slice(0, 4);
  }

  if (showType === SEARCH_TYPE.TV) {
    title = item.name;
    release = item.first_air_date?.slice(0, 4);
  }

  return {
    id: item.id,
    title,
    posterPath,
    voteAverage: item.vote_average,
    runtime,
    release,
    lastEpisode,
    inProduction,
    numSeasons,
  };
};
