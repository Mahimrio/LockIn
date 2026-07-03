import { TOTAL_DAYS, DAY_FULL, DAY_NAMES, SEMESTER_START } from "../data/constants";

function getDayInfo(dayNumber) {
  const date = new Date(SEMESTER_START);
  date.setDate(SEMESTER_START.getDate() + (dayNumber - 1));
  const dow = date.getDay();
  const semesterWeek = Math.ceil(dayNumber / 7);
  const patternLabel = semesterWeek % 2 === 1 ? "A" : "B";
  return { dow, semesterWeek, patternLabel, dayName: DAY_NAMES[dow], dayFull: DAY_FULL[dow] };
}

export default function DaySelector({ activeDay, setActiveDay, dayProgress }) {
  const { dayFull, dayName, semesterWeek, patternLabel } = getDayInfo(activeDay);
  const isWeekend = ["Fri", "Sat"].includes(dayName);
  const isCompleted = activeDay <= 14;
  const pct = dayProgress(activeDay);

  return (
    <div className="sticky top-[49px] z-40 bg-[#0a0a0f] border-b border-[#1a1a2a]">
      <div className="max-w-[680px] mx-auto px-4">
        <div className="py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveDay(d => Math.max(1, d - 1))}
              className="bg-[#1a1a2a] border border-[#2a2a3a] text-[#888] rounded-lg w-[34px] h-[34px] cursor-pointer text-[16px] flex items-center justify-center flex-shrink-0 select-none min-h-[44px] min-w-[44px]"
            >‹</button>
            <div className="flex-1 text-center">
              <div className="text-[14px] font-semibold text-[#e8e4d9] leading-tight">{dayFull}</div>
              <div className="text-[11px] text-[#666] mt-[1px]">Day {activeDay} / {TOTAL_DAYS}</div>
              <div className="flex items-center justify-center gap-2 mt-[5px]">
                <span className="text-[9px] py-[2px] px-[7px] rounded-[99px] bg-[#1a1a2a] text-[#888] border border-[#2a2a3a]">
                  Week {semesterWeek}
                </span>
                <span className={`text-[9px] py-[2px] px-[7px] rounded-[99px] border ${patternLabel === "A" ? "bg-[#082f4940] text-[#38bdf8] border-[#0c4a6e]" : "bg-[#052e1640] text-[#34d399] border-[#065f46]"}`}>
                  Pattern {patternLabel}
                </span>
                {isCompleted && <span className="text-[9px] text-[#059669]">✅ Done</span>}
                {isWeekend && !isCompleted && <span className="text-[9px]">🏖️ Weekend</span>}
              </div>
              <div className="bg-[#1a1a2a] rounded-[99px] h-[3px] mt-3 mx-2">
                <div
                  className={`h-full rounded-[99px] transition-[width] duration-400 ${pct === 100 ? "bg-[#059669]" : "bg-[#7c3aed]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-[#555] mt-[3px] block">{pct}% complete</span>
            </div>
            <button
              onClick={() => setActiveDay(d => Math.min(TOTAL_DAYS, d + 1))}
              className="bg-[#1a1a2a] border border-[#2a2a3a] text-[#888] rounded-lg w-[34px] h-[34px] cursor-pointer text-[16px] flex items-center justify-center flex-shrink-0 select-none min-h-[44px] min-w-[44px]"
            >›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
