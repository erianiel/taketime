import { useQueries } from "@tanstack/react-query";
import { getSeasonInfoById } from "../services/apiMovies";

export function useTvRuntime(id, totalSeasons) {
  const seasonsList = Array.from({ length: totalSeasons }, (_, i) => ++i);

  const queries = useQueries({
    queries: seasonsList.map((seasonNumber) => ({
      queryKey: [id, seasonNumber],
      queryFn: () => getSeasonInfoById(id, seasonNumber),
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const seasons = queries.map((query) => query.data);
  let totalRuntime = 0;

  if (!isError) {
    totalRuntime = seasons
      .map((season) => {
        const episodeRuntimeSum = season?.episodes.reduce((acc, episode) => {
          return acc + episode.runtime;
        }, 0);

        return episodeRuntimeSum;
      })
      .reduce((acc, runtime) => {
        return acc + runtime;
      }, 0);
  }

  return { isLoading, isError, totalRuntime };
}
