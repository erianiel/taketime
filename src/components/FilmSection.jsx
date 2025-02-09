import { SHOW_TYPE } from "../utils/consts";
import { getShowInfo } from "../utils/helpers";
import CalcBox from "./CalcBox";
import ItemDetails from "./ItemDetails";
import { useItemId } from "./useItemId";
import { useTvRuntime } from "./useTvRuntime";

function FilmSection({ selectedId, showType }) {
  const { isLoading, item } = useItemId(selectedId.value, showType.value);

  const show = getShowInfo(item, showType.value);

  const { isLoading: isRuntimeLoading, totalRuntime } = useTvRuntime(
    selectedId.value,
    show.numSeasons
  );
  const loading =
    showType.value === SHOW_TYPE.MOVIE ? isLoading : isRuntimeLoading;
  const runtime =
    showType.value === SHOW_TYPE.MOVIE ? show.runtime : totalRuntime;

  return (
    <section className="p-4 flex flex-col items-center gap-8">
      <ItemDetails
        showType={showType}
        isLoading={loading}
        show={show}
        runtime={runtime}
      />
      <CalcBox runtime={runtime} />
    </section>
  );
}

export default FilmSection;
