import { formatVoteRate, getShowInfo } from "../utils/helpers";

function SearchItem({ item, onSelectItem, selectedShowType }) {
  const show = getShowInfo(item, selectedShowType);

  return (
    <li
      className="flex gap-2 p-2 border-b-2 hover:bg-blue-100  border-stone-200"
      onClick={() => onSelectItem(show.id)}
    >
      <img className="h-20" src={show.posterPath} alt={`show's poster`} />
      <div className="flex flex-col">
        <span>{show.title}</span>
        <span className="text-sm text-stone-600">{show.release}</span>
        <span className="text-sm text-stone-600">{`vote: ${formatVoteRate(
          show.voteAverage
        )}`}</span>
      </div>
    </li>
  );
}

export default SearchItem;
