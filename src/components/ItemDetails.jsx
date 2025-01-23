import { SEARCH_TYPE } from "../services/tmdb";
import { useItemId } from "./useItemId";

function ItemDetails({ selectedId, showType }) {
  const { isLoading, error, item } = useItemId(
    selectedId.value,
    showType.value
  );

  let title = "";

  if (showType.value === SEARCH_TYPE.MOVIE) {
    title = item?.original_title;
  }

  if (showType.value === SEARCH_TYPE.TV) {
    title = item?.name;
  }

  return (
    <div className="p-2 h-30 w-80 md:w-96 rounded-lg bg-opacity-40 bg-white">
      {isLoading && <span>Loading...</span>}
      {item && (
        <div className="flex gap-4">
          <img
            className="h-18 rounded-md"
            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold">{title}</h3>
            <p>
              directed by: <span></span>
            </p>
            <p>{item.runtime}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
