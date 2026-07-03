import uniSchedule from "../data/uniSchedule";
import { SEMESTER_START, DAY_NAMES, DAY_FULL } from "../data/constants";

function getDayInfo(dayNumber) {
  const date = new Date(SEMESTER_START);
  date.setDate(SEMESTER_START.getDate() + (dayNumber - 1));
  const dow = date.getDay();
  const semesterWeek = Math.ceil(dayNumber / 7);
  const pattern = semesterWeek % 2 === 1 ? "week1" : "week2";
  const patternLabel = semesterWeek % 2 === 1 ? "A" : "B";
  return { dow, semesterWeek, pattern, patternLabel, dayName: DAY_NAMES[dow], dayFull: DAY_FULL[dow] };
}

function getUniClasses(dayNumber) {
  const { dow, pattern } = getDayInfo(dayNumber);
  return uniSchedule[pattern][dow] || [];
}

export default function UniversityView({ activeDay, setActiveDay, setView }) {
  const { dayName, semesterWeek, patternLabel } = getDayInfo(activeDay);
  const todayClasses = getUniClasses(activeDay);
  const isWeekend = ["Fri", "Sat"].includes(dayName);
  const isCompleted = activeDay <= 14;

  return (
    <div className="max-w-[680px] mx-auto px-4 pb-10">
      <div className="mt-4">
        {isCompleted ? (
          <div className="text-center py-[50px] px-5">
            <div className="text-[52px] mb-3">✅</div>
            <p className="text-[15px] text-[#34d399]">Week {semesterWeek} — Already Completed</p>
            <p className="text-[12px] text-[#555] mt-2">Days 1–14 are locked in. You crushed it.</p>
          </div>
        ) : isWeekend ? (
          <div className="text-center py-[50px] px-5">
            <div className="text-[52px] mb-3">🏖️</div>
            <p className="text-[15px] text-[#888]">No classes today</p>
            <p className="text-[12px] text-[#555] mt-[6px]">Rest, recover, prepare.</p>
          </div>
        ) : todayClasses.length === 0 ? (
          <div className="text-center py-[50px] px-5">
            <div className="text-[52px] mb-3">📭</div>
            <p className="text-[13px] text-[#666]">No classes scheduled.</p>
          </div>
        ) : (
          <>
            <div className="flex gap-[10px] items-center mb-[14px] py-[10px] px-[14px] bg-[#0e0e18] border border-[#1e1e2e] rounded-[10px]">
              <div className="text-[20px]">🎓</div>
              <div>
                <div className="text-[12px] text-[#c4b5fd] font-medium">Week {semesterWeek} · Pattern {patternLabel} · A1 Group</div>
                <div className="text-[11px] text-[#555] mt-[2px]">{todayClasses.length} session{todayClasses.length !== 1 ? "s" : ""} today</div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              {todayClasses.map((cls, i) => (
                <div
                  key={i}
                  className={`flex gap-3 items-start py-[14px] px-4 rounded-xl bg-[#0e0e18] border ${cls.type === "lab" ? "border-[#6b21a8]" : "border-[#1e2a3a]"}`}
                >
                  <div className={`w-[3px] rounded-[99px] self-stretch flex-shrink-0 ${cls.type === "lab" ? "bg-[#a855f7]" : "bg-[#38bdf8]"}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-[5px]">
                      <span className="text-[11px] text-[#666] font-mono">{cls.time} – {cls.end}</span>
                      <span className={`text-[10px] py-[1px] px-2 rounded-[99px] uppercase tracking-[1px] ${cls.type === "lab" ? "bg-[#3b0764] text-[#e879f9] border border-[#6b21a8]" : "bg-[#082f49] text-[#38bdf8] border border-[#0c4a6e]"}`}>
                        {cls.type === "lab" ? "🔬 Lab" : "📖 Theory"}
                      </span>
                    </div>
                    <div className="text-[15px] text-[#d4d0c8] font-medium mb-1">{cls.title}</div>
                    <div className="flex gap-3 flex-wrap">
                      <span className="text-[11px] text-[#555]">📌 {cls.code}</span>
                      <span className="text-[11px] text-[#555]">🚪 {cls.room}</span>
                      <span className="text-[11px] text-[#555]">👤 {cls.teacher}</span>
                    </div>
                    {cls.note && (
                      <div className="mt-2 py-[5px] px-[10px] bg-[#1a1025] border border-[#4c1d95] rounded-md text-[11px] text-[#a78bfa]">⚠️ {cls.note}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[18px] p-[14px] bg-[#0e0e18] border border-[#1e1e2e] rounded-xl">
              <p className="text-[10px] text-[#555] tracking-[2px] uppercase mt-0 mr-0 mb-[10px] ml-0">Course Reference</p>
              {[
                ["CSE 3200","Software Dev-V Lab","Broti"],
                ["CSE 3201","Computer Networks","Joy"],
                ["CSE 3202","Networks Lab","Islam, TAN"],
                ["CSE 3207","Intro to AI","Al-Mamun / Tabassum"],
                ["CSE 3208","AI Lab","Tanvir, Tabassum"],
                ["CSE 3213","Operating System","MMH / Islam"],
                ["CSE 3214","OS Lab","MMH, Islam"],
                ["CSE 3223","Info System Design & SE","Taher"],
                ["CSE 3224","ISDS & SE Lab","Rahman, Taher"],
                ["HUM 3207","Industrial Law & Safety","TBA"],
              ].map(([code, title, teacher]) => (
                <div key={code} className="flex gap-2 items-center mb-[7px] pb-[7px] border-b border-[#1a1a2a]">
                  <span className="text-[10px] text-[#38bdf8] font-mono min-w-[72px]">{code}</span>
                  <span className="text-[11px] text-[#888] flex-1">{title}</span>
                  <span className="text-[10px] text-[#555]">{teacher}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
