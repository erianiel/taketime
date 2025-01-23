import { useQuery } from "@tanstack/react-query";
import { search } from "../services/apiMovies";

export function useSearch(query, searchType) {
  const {
    isLoading,
    error,
    data: results,
  } = useQuery({
    queryKey: [query, searchType],
    queryFn: () => search(query, searchType),
    enabled: !!query,
  });

  return { isLoading, error, results };
}
