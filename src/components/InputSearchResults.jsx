import Loader from "../ui/Loader";
import SearchItem from "./SearchItem";

function InputSearchResults({
  isPending,
  results,
  onSelectItem,
  selectedShowType,
}) {
  return (
    <ul
      className={`${(isPending || results?.length < 3) && "scrollNone"} scroll min-h-30 absolute top-20 z-30 max-h-80 w-full overflow-y-auto rounded-lg border-solid bg-stone-50 bg-opacity-75 p-2 backdrop-blur-md`}
    >
      {isPending ? (
        <li>
          <Loader />
        </li>
      ) : !isPending && results?.length === 0 ? (
        <span>Nothing found! 🙁</span>
      ) : (
        results.map((item) => (
          <SearchItem
            item={item}
            key={item.id}
            onSelectItem={onSelectItem}
            selectedShowType={selectedShowType}
          />
        ))
      )}
    </ul>
  );
}

export default InputSearchResults;
