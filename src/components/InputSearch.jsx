import { useEffect, useState } from "react";
import InputRadio from "../ui/InputRadio";
import { selectedId, showType } from "../utils/signalsStore";
import { useSearch } from "./useSearch";
import { SHOW_TYPE } from "../utils/consts";
import InputSearchResults from "./InputSearchResults";
import { useOutsideClick } from "./useOutsideClick";

function InputSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedShowType, setSelectedShowType] = useState(SHOW_TYPE.MOVIE);
  const [isOpen, setIsOpen] = useState(true);

  const { isPending, results } = useSearch(
    debouncedSearchTerm,
    selectedShowType,
  );
  const ref = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchTerm(searchTerm), 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function handleOnSelectItem(id) {
    selectedId.value = id;
    showType.value = selectedShowType;
    setSearchTerm("");
  }

  function handleOnSearchTypeChange(type) {
    setSelectedShowType(type);
    setSearchTerm("");
  }

  return (
    <div ref={ref} className="relative flex h-24 flex-col gap-2">
      <fieldset className="flex gap-5 self-start">
        <InputRadio
          id="movie"
          label="Movie"
          value={SHOW_TYPE.MOVIE}
          checked={selectedShowType === SHOW_TYPE.MOVIE}
          onChange={(e) => handleOnSearchTypeChange(e.target.value)}
        />
        <InputRadio
          id="tvshow"
          label="TV Show"
          value={SHOW_TYPE.TV}
          checked={selectedShowType === SHOW_TYPE.TV}
          onChange={(e) => handleOnSearchTypeChange(e.target.value)}
        />
      </fieldset>

      <input
        className="w-90 h-10 rounded-lg border border-solid border-slate-400 bg-stone-50 py-2 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-96"
        type="text"
        placeholder={
          selectedShowType === SHOW_TYPE.MOVIE
            ? "Search movies"
            : "Search TV shows"
        }
        value={searchTerm}
        autoFocus
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {searchTerm && isOpen && (
        <InputSearchResults
          isPending={isPending}
          results={results?.results}
          onSelectItem={handleOnSelectItem}
          selectedShowType={selectedShowType}
        />
      )}
    </div>
  );
}

export default InputSearch;
