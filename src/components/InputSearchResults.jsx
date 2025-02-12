import SearchItem from "./SearchItem";

function InputSearchResults({
  isPending,
  results,
  onSelectItem,
  selectedShowType,
}) {
  return (
    <ul className="scroll absolute top-20 z-20 max-h-80 w-80 overflow-y-auto rounded-lg border-solid bg-stone-50 bg-opacity-75 p-2 backdrop-blur-md md:w-96">
      {isPending ? (
        <span>Loading...</span>
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
