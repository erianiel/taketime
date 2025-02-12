import { formatVoteRate, getShowInfo } from "../utils/helpers";

function SearchItem({ item, onSelectItem, selectedShowType }) {
  const show = getShowInfo(item, selectedShowType);

  return (
    <li
      className="flex gap-2 border-b-2 border-stone-200 p-2 hover:bg-blue-100"
      onClick={() => onSelectItem(show.id)}
    >
      <img className="h-20" src={show.posterPath} alt={`show's poster`} />
      <div className="flex flex-col">
        <span>{show.title}</span>
        <div className="flex items-center gap-1 text-sm text-stone-600">
          <span>{show.release}</span>
          <span>·</span>
          <span>{formatVoteRate(show.voteAverage)}</span>
        </div>
      </div>
    </li>
  );
}

export default SearchItem;
