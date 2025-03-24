import { useQuery } from "@tanstack/react-query";
import { getShowById } from "../services/apiMovies";

export function useItemId(id, showType) {
  const {
    isLoading,
    isError,
    data: item,
  } = useQuery({
    queryKey: [id],
    queryFn: () => getShowById(id, showType),
  });

  return { isLoading, isError, item };
}
