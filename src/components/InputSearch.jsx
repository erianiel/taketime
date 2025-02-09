import { useEffect, useState } from "react";
import { useSearch } from "./useSearch";
import { SEARCH_TYPE } from "../services/tmdb";
import SearchItem from "./SearchItem";
import { selectedId, showType } from "../utils/signalsStore";

function InputSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedShowType, setSelectedShowType] = useState(SEARCH_TYPE.MOVIE);
  const [isItemClicked, setIsItemClicked] = useState(false);
  const { isLoading, results } = useSearch(
    debouncedSearchTerm,
    selectedShowType
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function handleSelectResult(id) {
    selectedId.value = id;
    showType.value = selectedShowType;
    setSearchTerm("");
    setIsItemClicked(!isItemClicked);
  }

  return (
    <div className="relative h-[6rem] flex flex-col gap-2">
      <fieldset className="flex gap-5 self-end">
        <label
          className="flex items-center gap-1 peer-checked:text-sky-700 text-sm font-semibold"
          htmlFor="movie"
        >
          <input
            className="peer hidden"
            type="radio"
            id="movie"
            value={SEARCH_TYPE.MOVIE}
            checked={selectedShowType === SEARCH_TYPE.MOVIE}
            onChange={(e) => {
              setSelectedShowType(e.target.value);
              setSearchTerm("");
            }}
          />
          <div className="w-4 h-4 bg-white peer-checked:bg-blue-400 shadow border-2 border-gray-300 rounded-full"></div>
          Movie
        </label>
        <label
          className="flex items-center gap-1 peer-checked:text-blue-400 text-sm font-semibold"
          htmlFor="tvshow"
        >
          <input
            className="peer hidden"
            type="radio"
            id="tvshow"
            value={SEARCH_TYPE.TV}
            checked={selectedShowType === SEARCH_TYPE.TV}
            onChange={(e) => {
              setSelectedShowType(e.target.value);
              setSearchTerm("");
            }}
          />
          <div className="w-4 h-4 bg-stone-100 peer-checked:bg-blue-400 shadow border-2 border-slate-300 focus:ring-sky-300 rounded-full"></div>
          Tv show
        </label>
      </fieldset>

      <input
        className="py-2 px-2 w-80 md:w-96 rounded-lg border border-solid border-slate-400 focus:outline-none focus:ring focus:ring-blue-400 bg-stone-50"
        type="text"
        placeholder={
          selectedShowType === SEARCH_TYPE.MOVIE
            ? "Search movies..."
            : "Search Tv show..."
        }
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsItemClicked(false);
        }}
      />
      {Boolean(results?.results.length) && !isItemClicked && (
        <ul className="absolute top-20 z-20 backdrop-blur-md p-2 max-h-80 w-80 md:w-96 overflow-y-auto rounded-lg bord-solid bg-opacity-75 bg-stone-50">
          {isLoading && <span>Loading...</span>}
          {results?.results?.map((item) => (
            <SearchItem
              item={item}
              key={item.id}
              onSelectItem={handleSelectResult}
              selectedShowType={selectedShowType}
            />
          ))}
        </ul>
      )}

      {results?.results.length === 0 && <span>Nothing found! 🙁</span>}
    </div>
  );
}

export default InputSearch;
