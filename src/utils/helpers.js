import { POSTER_PATH_BASE_URL } from "../services/tmdb";
import { SHOW_TYPE, TIME_UNITS } from "./consts";

export const formatVoteRate = (value) =>
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(value);

export const formattedDate = (date) => {
  let option = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formatDate = new Intl.DateTimeFormat("en-US", option).format(date);

  return formatDate;
};

export const formatRuntime = (minutes) => {
  if (!minutes) return { days: 0, hours: 0, minutes: 0 };

  const minutesPerUnit = {
    day: 24 * 60,
    hour: 60,
  };

  const days = Math.floor(minutes / minutesPerUnit.day);
  minutes %= minutesPerUnit.day;
  const hours = Math.floor(minutes / minutesPerUnit.hour);
  minutes %= minutesPerUnit.hour;

  return { days, hours, minutes };
};

export const getCompletionDate = ({
  runtime,
  time,
  unit = TIME_UNITS.HOUR,
  cadence = TIME_UNITS.DAY,
}) => {
  const minutes = unit === TIME_UNITS.HOUR ? time * 60 : time;

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

  let posterPath = item.poster_path
    ? `${POSTER_PATH_BASE_URL}${item.poster_path}`
    : null;
  let title;
  let runtime;
  let release;
  let numSeasons = item?.number_of_seasons;
  const lastEpisode = item.last_air_date?.slice(0, 4);
  const inProduction = item.in_production;

  if (showType === SHOW_TYPE.MOVIE) {
    title = item.original_title;
    runtime = item.runtime;
    release = item.release_date?.slice(0, 4);
  }

  if (showType === SHOW_TYPE.TV) {
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
