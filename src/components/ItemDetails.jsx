import { SEARCH_TYPE } from "../services/tmdb";
import { useItemId } from "./useItemId";
import { formatRuntime, getShowInfo } from "../utils/helpers";
import { useTvRuntime } from "./useTvRuntime";

function ItemDetails({ selectedId, showType }) {
  const { isLoading, error, item } = useItemId(
    selectedId.value,
    showType.value
  );
  const show = getShowInfo(item, showType.value);
  const { isLoading: isRuntimeLoading, totalRuntime } = useTvRuntime(
    selectedId.value,
    show.numSeasons
  );

  const { years, months, days, hours, minutes } = formatRuntime(
    showType.value === SEARCH_TYPE.MOVIE ? show.runtime : totalRuntime
  );

  return (
    <div className="p-2 h-30 w-80 md:w-96 rounded-lg bg-opacity-40 bg-white">
      {isLoading && <span>Loading...</span>}
      {item && (
        <div className="flex gap-4">
          <img className="h-18 rounded-md" src={show.posterPath} />
          <div className="flex flex-col gap-3 justify-evenly">
            <div>
              <h3 className="font-bold">{show.title}</h3>

              <p className="text-sm text-stone-600">
                {show.release}{" "}
                {showType.value === SEARCH_TYPE.TV ? (
                  <>
                    <span>- {show.lastEpisode} </span>
                    {show.inProduction ? (
                      <>
                        <span>🟢</span>{" "}
                        <span className="italic">in production</span>
                      </>
                    ) : (
                      <>
                        <span>🔴</span> <span className="italic">ended</span>
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
              <p className="text-sm text-stone-600">
                total seasons: {show.numSeasons}
              </p>
            </div>

            {showType.value === SEARCH_TYPE.MOVIE && show.runtime && (
              <p className="font-bold text-2xl">
                {years}
                <span className="text-fuchsia-700">y</span> {months}
                <span className="text-fuchsia-700">M</span> {days}
                <span className="text-fuchsia-700">d</span> {hours}
                <span className="text-fuchsia-700">h</span> {minutes}
                <span className="text-fuchsia-700">m</span>{" "}
              </p>
            )}
            {showType.value === SEARCH_TYPE.TV &&
              (isRuntimeLoading ? (
                <span>Loading...</span>
              ) : (
                <p className="font-bold text-2xl">
                  {years}
                  <span className="text-fuchsia-700">y</span> {months}
                  <span className="text-fuchsia-700">M</span> {days}
                  <span className="text-fuchsia-700">d</span> {hours}
                  <span className="text-fuchsia-700">h</span> {minutes}
                  <span className="text-fuchsia-700">m</span>{" "}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
