import { ACCESS_TOKEN } from "./tmdb";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export async function search(query, type) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/${type}?query=${query}`,
    options,
  );

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}

export async function getShowById(id, showType) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${showType}/${id}`,
    options,
  );

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}

export async function getSeasonInfoById(id, seasonNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`,
    options,
  );

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
