import { useQuery } from "@tanstack/react-query";
import { search } from "../services/apiMovies";

export function useSearch(query, searchType) {
  const {
    isPending,
    isError,
    data: results,
  } = useQuery({
    queryKey: [query, searchType],
    queryFn: () => search(query, searchType),
    enabled: !!query,
  });

  return { isPending, isError, results };
}
