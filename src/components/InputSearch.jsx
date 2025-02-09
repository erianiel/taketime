import { useEffect, useState } from "react";
import { SEARCH_TYPE } from "../services/tmdb";
import InputRadio from "../ui/InputRadio";
import { selectedId, showType } from "../utils/signalsStore";
import SearchItem from "./SearchItem";
import { useSearch } from "./useSearch";

function InputSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedShowType, setSelectedShowType] = useState(SEARCH_TYPE.MOVIE);
  const { isPending, results } = useSearch(
    debouncedSearchTerm,
    selectedShowType
  );

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchTerm(searchTerm), 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function handleSelectResult(id) {
    selectedId.value = id;
    showType.value = selectedShowType;
    setSearchTerm("");
  }

  function handleOnSearchTypeChange(type) {
    setSelectedShowType(type);
    setSearchTerm("");
  }

  return (
    <div className="relative h-24 flex flex-col gap-2">
      <fieldset className="flex gap-5 self-end">
        <InputRadio
          id="movie"
          label="Movie"
          value={SEARCH_TYPE.MOVIE}
          checked={selectedShowType === SEARCH_TYPE.MOVIE}
          onChange={(e) => handleOnSearchTypeChange(e.target.value)}
        />
        <InputRadio
          id="tvshow"
          label="TV Show"
          value={SEARCH_TYPE.TV}
          checked={selectedShowType === SEARCH_TYPE.TV}
          onChange={(e) => handleOnSearchTypeChange(e.target.value)}
        />
      </fieldset>

      <input
        className="py-2 px-2 w-80 md:w-96 rounded-lg border border-solid border-slate-400 focus:outline-none focus:ring focus:ring-blue-400 bg-stone-50"
        type="text"
        placeholder={
          selectedShowType === SEARCH_TYPE.MOVIE
            ? "Search movies"
            : "Search TV shows"
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <ul className="absolute top-20 z-20 backdrop-blur-md p-2 max-h-80 w-80 md:w-96 overflow-y-auto rounded-lg bord-solid bg-opacity-75 bg-stone-50">
          {isPending ? (
            <span>Loading...</span>
          ) : !isPending && results?.results.length === 0 ? (
            <span>Nothing found! 🙁</span>
          ) : (
            results?.results?.map((item) => (
              <SearchItem
                item={item}
                key={item.id}
                onSelectItem={handleSelectResult}
                selectedShowType={selectedShowType}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default InputSearch;
