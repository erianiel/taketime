import SearchItem from "./SearchItem";

function InputSearchResults({
  isPending,
  results,
  onSelectItem,
  selectedShowType,
}) {
  return (
    <ul className="absolute top-20 z-20 backdrop-blur-md p-2 max-h-80 w-80 md:w-96 overflow-y-auto rounded-lg bord-solid bg-opacity-75 bg-stone-50">
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
