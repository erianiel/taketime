import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import SearchItem from "./SearchItem";

function InputSearchResults({
  isError,
  isPending,
  results,
  onSelectItem,
  selectedShowType,
}) {
  const renderResults = () => {
    if (isPending)
      return (
        <li>
          <Loader />
        </li>
      );

    if (isError)
      return (
        <li>
          <ErrorMessage />
        </li>
      );

    if (!isPending && results?.length === 0)
      return (
        <li className="flex h-16 items-center justify-center font-medium text-neutral-700">
          No result found
        </li>
      );

    return results.map((item) => (
      <SearchItem
        item={item}
        key={item.id}
        onSelectItem={onSelectItem}
        selectedShowType={selectedShowType}
      />
    ));
  };

  return (
    <ul
      className={`${(isPending || results?.length < 3) && "scrollNone"} scroll min-h-30 absolute top-20 z-30 max-h-80 w-full overflow-y-auto rounded-lg border-solid bg-stone-50 bg-opacity-75 p-2 backdrop-blur-md`}
    >
      {renderResults()}
    </ul>
  );
}

export default InputSearchResults;
