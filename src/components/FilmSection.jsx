import CalcBox from "./CalcBox";
import ItemDetails from "./ItemDetails";

function FilmSection({ selectedId, showType }) {
  return (
    <section className="p-4 flex flex-col lg:flex-row gap-4">
      <ItemDetails selectedId={selectedId} showType={showType} />
      <CalcBox />
    </section>
  );
}

export default FilmSection;
