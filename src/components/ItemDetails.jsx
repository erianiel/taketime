import { SHOW_TYPE } from "../utils/consts";
import { formatRuntime } from "../utils/helpers";

function ItemDetails({ showType, isLoading, show, runtime }) {
  const { days, hours, minutes } = formatRuntime(runtime);

  return (
    <div className="p-4 h-30 w-80 md:w-96 rounded-lg border border-slate-600 bg-[#e9dfd2]">
      {isLoading ? (
        <span>is Loading</span>
      ) : (
        <div className="p-2 h-30 flex gap-4 rounded-xl bg-stone-50">
          <img className="h-30 rounded-md" src={show.posterPath} />
          <div className="flex flex-col gap-3 justify-evenly">
            <div>
              <h3 className="font-bold">{show.title}</h3>

              <p className="text-sm text-stone-600">
                {show.release}{" "}
                {showType.value === SHOW_TYPE.TV ? (
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
              {showType.value === SHOW_TYPE.TV && (
                <p className="text-sm text-stone-600">
                  total seasons: {show.numSeasons}
                </p>
              )}
            </div>

            <p className="font-bold text-2xl">
              {days}
              <span className="text-fuchsia-700">d</span> {hours}
              <span className="text-fuchsia-700">h</span> {minutes}
              <span className="text-fuchsia-700">m</span>{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
