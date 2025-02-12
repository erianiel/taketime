import { SHOW_TYPE } from "../utils/consts";

function ReleaseInfo({ show, showType }) {
  return (
    <p className="flex gap-1 text-xs text-stone-600 sm:text-sm">
      <span>{show.release}</span>
      {showType.value === SHOW_TYPE.TV && (
        <>
          <span>-</span>
          <span> {show.lastEpisode} </span>
          {!show.inProduction && (
            <span className="italic text-pink-600">(ended)</span>
          )}
        </>
      )}
    </p>
  );
}

export default ReleaseInfo;
