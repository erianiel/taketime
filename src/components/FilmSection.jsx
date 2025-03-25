import { SHOW_TYPE } from "../utils/consts";
import {
  formatRuntime,
  formattedDate,
  getCompletionDate,
  getShowInfo,
} from "../utils/helpers";
import { useItemId } from "./useItemId";
import { useTvRuntime } from "./useTvRuntime";
import { completionDateData } from "../utils/signalsStore";
import { computed } from "@preact/signals-react";
import ShowInfo from "./ShowInfo";
import Loader from "../ui/Loader";
import EmptyPoster from "../ui/EmptyPoster";
import ErrorMessage from "../ui/ErrorMessage";

function FilmSection({ selectedId, showType }) {
  const { isLoading, isError, item } = useItemId(
    selectedId.value,
    showType.value,
  );

  const show = getShowInfo(item, showType.value);

  const {
    isLoading: isRuntimeLoading,
    isError: isTvRuntimeError,
    totalRuntime,
  } = useTvRuntime(selectedId.value, show.numSeasons);

  const isShowLoading =
    showType.value === SHOW_TYPE.MOVIE ? isLoading : isRuntimeLoading;
  const runtime =
    showType.value === SHOW_TYPE.MOVIE ? show.runtime : totalRuntime;

  const computedCompletionDate = computed(() => {
    if (runtime && completionDateData.value) {
      const date = getCompletionDate({
        runtime,
        ...completionDateData.value,
      });

      return formattedDate(date);
    }

    return "";
  });

  const { days, hours, minutes } = formatRuntime(runtime);

  return (
    <div className="h-30 w-full rounded-lg border-4 border-neutral-300 bg-stone-100 p-3">
      {isError ? (
        <ErrorMessage />
      ) : isShowLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4">
          {!show.posterPath ? (
            <EmptyPoster size="md" />
          ) : (
            <img className="h-30 w-fit rounded-md" src={show.posterPath} />
          )}
          <div className="flex flex-col justify-evenly gap-1">
            <div>
              <h3
                className={`${show.title?.length > 40 ? "text-sm" : "text-base"} font-bold text-neutral-800`}
              >
                {show.title}
              </h3>
              <ShowInfo show={show} showType={showType} />
            </div>

            {isTvRuntimeError ? (
              <ErrorMessage message="No data available" />
            ) : (
              <div className="flex flex-row-reverse items-baseline justify-end gap-1">
                <p className="text-xs text-stone-600">(total)</p>
                <p className="text-xl font-bold text-neutral-800 md:text-2xl">
                  {days}
                  <span className="text-blue-400">d</span> {hours}
                  <span className="text-blue-400">h</span> {minutes}
                  <span className="text-blue-400">m</span>
                </p>
              </div>
            )}

            <div className="flex flex-col text-xs sm:text-sm">
              {!isTvRuntimeError && !isShowLoading && (
                <>
                  <p className="text-xs text-neutral-700">Finished by</p>
                  <p className="relative z-20 text-xs font-medium text-neutral-700 sm:text-sm">
                    <span className="relative inline-block px-1 after:absolute after:inset-0 after:-z-10 after:block after:h-full after:w-full after:bg-blue-200 after:opacity-70 after:content-[''] after:[transform:scale(0.99,1.05)_skewX(-15deg)]">
                      {computedCompletionDate.value}
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmSection;
