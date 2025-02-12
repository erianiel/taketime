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

function FilmSection({ selectedId, showType }) {
  const { isLoading, item } = useItemId(selectedId.value, showType.value);

  const show = getShowInfo(item, showType.value);

  const { isLoading: isRuntimeLoading, totalRuntime } = useTvRuntime(
    selectedId.value,
    show.numSeasons,
  );

  const isShowLoading =
    showType.value === SHOW_TYPE.MOVIE ? isLoading : isRuntimeLoading;
  const runtime =
    showType.value === SHOW_TYPE.MOVIE ? show.runtime : totalRuntime;
  console.log(runtime);

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
    <div className="h-30 w-90 rounded-lg border-4 border-neutral-300 bg-stone-100 p-3 md:w-96">
      {isShowLoading ? (
        <span>is Loading</span>
      ) : (
        <div className="flex gap-4">
          <img className="h-30 w-fit rounded-md" src={show.posterPath} />
          <div className="flex flex-col justify-evenly gap-1">
            <div>
              <h3 className="font-bold text-neutral-800">{show.title}</h3>
              <ShowInfo show={show} showType={showType} />
            </div>

            <p className="text-xl font-bold text-neutral-800 md:text-2xl">
              {days}
              <span className="text-blue-400">d</span> {hours}
              <span className="text-blue-400">h</span> {minutes}
              <span className="text-blue-400">m</span>
            </p>

            <div className="flex gap-1 text-xs sm:text-sm">
              <p className="text-neutral-700">End at</p>
              <p className="relative z-20 px-1 font-medium text-neutral-700 after:absolute after:left-0 after:top-0 after:-z-10 after:block after:h-full after:w-full after:bg-blue-200 after:opacity-70 after:content-[''] after:[transform:scale(0.99,1.05)_skewX(-15deg)]">
                {computedCompletionDate.value}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmSection;
