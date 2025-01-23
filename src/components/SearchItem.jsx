import { formatVoteRate } from "../utils/helpers";

function SearchItem({ result, onSelectItem }) {
  return (
    <li
      className="flex gap-2 p-2 border-b-2 hover:bg-violet-50  border-stone-200"
      onClick={() => onSelectItem(result.id)}
    >
      <img
        className="h-20"
        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
        alt={`show's poster`}
      />
      <div className="flex flex-col">
        <span>{result.original_title}</span>
        <span className="text-sm text-stone-600">{`vote: ${formatVoteRate(
          result.vote_average
        )}`}</span>
      </div>
    </li>
  );
}

export default SearchItem;
