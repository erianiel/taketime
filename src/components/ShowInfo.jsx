import { SHOW_TYPE } from "../utils/consts";
import { formatVoteRate } from "../utils/helpers";
import ReleaseInfo from "./ReleaseInfo";

function ShowInfo({ show, showType }) {
  const tv = showType.value === SHOW_TYPE.TV;

  return (
    <div className={`flex ${tv && "flex-col gap-0"} gap-1 text-xs sm:text-sm`}>
      <ReleaseInfo show={show} showType={showType} />
      <p className={`text-stone-600 ${tv && "flex gap-1"}`}>
        {tv && (
          <span className="text-stone-600">
            {show.numSeasons} {show.numSeasons === 1 ? "season" : "seasons"}
          </span>
        )}
        - {formatVoteRate(show.voteAverage)}
      </p>
    </div>
  );
}

export default ShowInfo;
