import { useState } from "react";
import useProgress from "./hooks/useProgress";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import DailyView from "./components/DailyView";
import UniversityView from "./components/UniversityView";
import TrackerView from "./components/TrackerView";

export default function App() {
  const [activeDay, setActiveDay] = useState(15);
  const [view, setView] = useState("daily");
  const { checked, loaded, saving, toggle, dayProgress, totalProgress } = useProgress();

  return (
    <div className="font-serif bg-[#0a0a0f] min-h-screen text-[#e8e4d9]">
      {!loaded && (
        <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-[999]">
          <div className="text-center">
            <div className="text-[32px] mb-3">⏳</div>
            <p className="text-[#555] text-[12px] tracking-[2px]">LOADING...</p>
          </div>
        </div>
      )}

      <Header totalProgress={totalProgress()} saving={saving} />
      <NavBar view={view} setView={setView} />
      <DaySelector
        activeDay={activeDay}
        setActiveDay={setActiveDay}
        setView={setView}
        dayProgress={dayProgress}
      />

      {view === "daily" && (
        <DailyView
          activeDay={activeDay}
          checked={checked}
          toggle={toggle}
          dayProgress={dayProgress}
        />
      )}

      {view === "university" && (
        <UniversityView
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          setView={setView}
        />
      )}

      {view === "tracker" && (
        <TrackerView
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          setView={setView}
          dayProgress={dayProgress}
        />
      )}
    </div>
  );
}
