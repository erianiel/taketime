import { useSignals } from "@preact/signals-react/runtime";
import FilmSection from "../components/FilmSection";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import { selectedId, showType } from "../utils/signalsStore";
import CalcBox from "../components/CalcBox";

function AppLayout() {
  useSignals();

  return (
    <div className="bg-appBgColor h-screen p-6">
      <div className="flex h-full flex-col items-center p-2">
        <Header />
        <div className="flex flex-col gap-1">
          <CalcBox />
          <InputSearch />
        </div>
        {selectedId.value && (
          <FilmSection selectedId={selectedId} showType={showType} />
        )}
      </div>
    </div>
  );
}

export default AppLayout;
