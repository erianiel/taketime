import { useEffect, useState } from "react";
import { useSearch } from "./useSearch";
import { SEARCH_TYPE } from "../services/tmdb";
import SearchItem from "./SearchItem";

function InputSearch({ selectedId, showType }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { isLoading, error, results } = useSearch(
    debouncedSearchTerm,
    showType.value
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function handleSelectResult(id) {
    selectedId.value = id;
  }

  return (
    <div className="flex flex-col gap-2">
      <fieldset className="flex gap-3 self-end">
        <div className="flex items-center gap-1">
          <input
            className="peer hidden"
            type="radio"
            id="movie"
            value={SEARCH_TYPE.MOVIE}
            checked={showType.value === SEARCH_TYPE.MOVIE}
            onChange={(e) => {
              showType.value = e.target.value;
            }}
          />
          <div className="w-4 h-4 bg-white peer-checked:bg-cyan-600 shadow border-2 border-gray-300 rounded-full">
            {" "}
          </div>
          <label
            className="peer-checked:text-sky-700 text-sm font-semibold"
            htmlFor="movie"
          >
            Movie
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            className="peer hidden"
            type="radio"
            id="tvshow"
            value={SEARCH_TYPE.TV}
            checked={showType.value === SEARCH_TYPE.TV}
            onChange={(e) => {
              showType.value = e.target.value;
            }}
          />
          <div className="w-4 h-4 bg-white peer-checked:bg-cyan-600 shadow border-2 border-slate-300 focus:ring-sky-300 rounded-full">
            {" "}
          </div>
          <label
            className="peer-checked:text-sky-700 text-sm font-semibold"
            htmlFor="tvshow"
          >
            Tv show
          </label>
        </div>
      </fieldset>

      <input
        className="py-2 px-2 w-80 md:w-96 rounded-lg border-solid focus:outline-none focus:ring focus:ring-cyan-600 bg-red-50"
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {results?.results.length && (
        <ul className="p-2 max-h-80 w-80 md:w-96 overflow-y-auto rounded-lg bord-solid bg-red-50">
          {isLoading && <span>Loading...</span>}
          {results?.results?.map((r) => (
            <SearchItem
              result={r}
              key={r.id}
              onSelectItem={handleSelectResult}
            />
          ))}
          {error && <span>{error.message}</span>}
        </ul>
      )}
    </div>
  );
}

export default InputSearch;
