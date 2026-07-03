import { TOTAL_DAYS, DAY_FULL, DAY_NAMES, SEMESTER_START } from "../data/constants";

function getDayInfo(dayNumber) {
  const date = new Date(SEMESTER_START);
  date.setDate(SEMESTER_START.getDate() + (dayNumber - 1));
  const dow = date.getDay();
  const semesterWeek = Math.ceil(dayNumber / 7);
  const patternLabel = semesterWeek % 2 === 1 ? "A" : "B";
  return { dow, semesterWeek, patternLabel, dayName: DAY_NAMES[dow], dayFull: DAY_FULL[dow] };
}

export default function DaySelector({ activeDay, setActiveDay, setView, dayProgress, dayKey }) {
  const { dayFull, dayName, semesterWeek, patternLabel } = getDayInfo(activeDay);
  const isWeekend = ["Fri", "Sat"].includes(dayName);
  const isCompleted = activeDay <= 14;
  const pct = dayProgress(activeDay);

  return (
    <div className="max-w-[680px] mx-auto px-4">
      <div className="py-[14px] pb-[10px] sticky top-0 bg-[#0a0a0f] z-10 border-b border-[#1a1a2a]">
        <div className="flex items-center gap-[10px]">
          <button
            onClick={() => setActiveDay(d => Math.max(1, d - 1))}
            className="bg-[#1a1a2a] border border-[#2a2a3a] text-[#888] rounded-lg w-[34px] h-[34px] cursor-pointer text-[16px]"
          >‹</button>
          <div className="flex-1 text-center">
            <div className="text-[13px] text-[#a78bfa] tracking-[1px]">
              {dayFull} · Day {activeDay} / {TOTAL_DAYS}
            </div>
            <div className="text-[10px] text-[#555] mt-[2px]">
              Week {semesterWeek} · {patternLabel === "A" ? "🔵 Pattern A" : "🟢 Pattern B"} · A1
              {isCompleted && <span className="text-[#059669] ml-[6px]">✅ Done</span>}
              {isWeekend && !isCompleted && <span className="ml-[6px]">🏖️ Weekend</span>}
            </div>
            <div className="bg-[#1a1a2a] rounded-[99px] h-[3px] mt-[6px]">
              <div
                className={`h-full rounded-[99px] transition-[width] duration-400 ${pct === 100 ? "bg-[#059669]" : "bg-[#7c3aed]"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-[#555] mt-[2px] block">{pct}% complete</span>
          </div>
          <button
            onClick={() => setActiveDay(d => Math.min(TOTAL_DAYS, d + 1))}
            className="bg-[#1a1a2a] border border-[#2a2a3a] text-[#888] rounded-lg w-[34px] h-[34px] cursor-pointer text-[16px]"
          >›</button>
        </div>
      </div>
    </div>
  );
}
