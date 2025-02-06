import { useSignals } from "@preact/signals-react/runtime";
import FilmSection from "../components/FilmSection";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import { selectedId, showType } from "../utils/signalsStore";

function AppLayout() {
  useSignals();

  return (
    <div className="h-screen p-6 bg-[#f4efe7]">
      <div className="h-full flex flex-col items-center p-2">
        <Header />
        <InputSearch />
        {selectedId.value && (
          <FilmSection selectedId={selectedId} showType={showType} />
        )}
      </div>
    </div>
  );
}

export default AppLayout;
