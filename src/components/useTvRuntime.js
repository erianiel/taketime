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

  const isLoading = queries.every((query) => query.isLoading);
  const seasons = queries.map((query) => query.data);

  const totalRuntime = seasons
    .map((season) => {
      const episodeRuntimeSum = season?.episodes.reduce((acc, episode) => {
        return acc + episode.runtime;
      }, 0);

      return episodeRuntimeSum;
    })
    .reduce((acc, runtime) => {
      return acc + runtime;
    }, 0);

  return { isLoading, totalRuntime };
}
