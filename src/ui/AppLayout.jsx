import { useSignals } from "@preact/signals-react/runtime";
import FilmSection from "../components/FilmSection";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import { selectedId, showType } from "../utils/signalsStore";
import CalcBox from "../components/CalcBox";

function AppLayout() {
  useSignals();

  return (
    <div className="flex h-screen flex-col bg-appBgColor pb-6 pt-6">
      <div className="w-90 h-full items-center self-center p-2 md:w-96">
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
