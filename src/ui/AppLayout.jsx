import { useSignals } from "@preact/signals-react/runtime";
import FilmSection from "../components/FilmSection";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import { selectedId, showType } from "../utils/signalsStore";

function AppLayout() {
  useSignals();

  return (
    <div className="h-screen p-6 bg-gradient-to-br from-red-200 to-violet-200">
      <div className="h-full flex flex-col items-center p-2 border-2 border-gray-600">
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
