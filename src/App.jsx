import { useState, useEffect } from "react";

const SEMESTER_START = new Date("2026-06-15");
const TOTAL_DAYS = 98;
const SCHEDULE_LEN = 23;

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_FULL  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const SEED_CHECKED = (() => {
  const c = {};
  for (let d = 1; d <= 14; d++)
    for (let i = 0; i < SCHEDULE_LEN; i++)
      c[`d${d}-i${i}`] = true;
  return c;
})();

const uniSchedule = {
  week1: {
    0: [
      { time:"10:30 AM", end:"11:20 AM", code:"CSE 3207", title:"Intro to AI",         room:"7A05", teacher:"Al-Mamun",        type:"theory" },
      { time:"11:20 AM", end:"12:10 PM", code:"CSE 3201", title:"Computer Networks",   room:"7A05", teacher:"Joy",              type:"theory" },
      { time:"12:10 PM", end:"1:00 PM",  code:"CSE 3213", title:"Operating System",    room:"7A05", teacher:"MMH",              type:"theory" },
      { time:"1:50 PM",  end:"4:20 PM",  code:"CSE 3200", title:"Software Dev-V Lab",  room:"7B06", teacher:"Broti",            type:"lab", note:"~2.5 hr gap before lab" },
    ],
    1: [
      { time:"8:00 AM",  end:"8:50 AM",  code:"CSE 3223", title:"Info System Design",  room:"7A05", teacher:"Taher",            type:"theory" },
      { time:"8:50 AM",  end:"9:40 AM",  code:"CSE 3207", title:"Intro to AI",         room:"7A05", teacher:"Tabassum",         type:"theory" },
      { time:"9:40 AM",  end:"10:30 AM", code:"CSE 3201", title:"Computer Networks",   room:"7A05", teacher:"Joy",              type:"theory" },
    ],
    2: [
      { time:"1:50 PM",  end:"2:40 PM",  code:"CSE 3213", title:"Operating System",    room:"7A03", teacher:"MMH",              type:"theory" },
      { time:"2:40 PM",  end:"3:30 PM",  code:"HUM 3207", title:"Industrial Law",      room:"7A03", teacher:"TBA",              type:"theory" },
      { time:"3:30 PM",  end:"4:20 PM",  code:"HUM 3207", title:"Industrial Law",      room:"7A03", teacher:"TBA",              type:"theory" },
    ],
    3: [
      { time:"10:30 AM", end:"11:20 AM", code:"HUM 3207", title:"Industrial Law",      room:"7A03", teacher:"TBA",              type:"theory" },
      { time:"11:20 AM", end:"12:10 PM", code:"CSE 3207", title:"Intro to AI",         room:"7A03", teacher:"Al-Mamun",         type:"theory" },
      { time:"12:10 PM", end:"1:00 PM",  code:"CSE 3223", title:"Info System Design",  room:"7A03", teacher:"Taher",            type:"theory" },
      { time:"1:50 PM",  end:"4:20 PM",  code:"CSE 3214", title:"OS Lab",              room:"7B03", teacher:"MMH, Islam",       type:"lab", note:"No break — back to back" },
    ],
    4: [
      { time:"1:50 PM",  end:"4:20 PM",  code:"CSE 3224", title:"ISDS & SE Lab",       room:"7B05", teacher:"Rahman, Taher",    type:"lab" },
      { time:"3:30 PM",  end:"4:20 PM",  code:"CSE 3223", title:"Info System Design",  room:"7A06", teacher:"Taher",            type:"theory" },
      { time:"4:20 PM",  end:"5:10 PM",  code:"CSE 3201", title:"Computer Networks",   room:"7A06", teacher:"Joy",              type:"theory" },
      { time:"5:10 PM",  end:"6:00 PM",  code:"CSE 3213", title:"Operating System",    room:"7A06", teacher:"Islam",            type:"theory" },
    ],
    5: [], 6: [],
  },
  week2: {
    0: [
      { time:"10:30 AM", end:"11:20 AM", code:"CSE 3207", title:"Intro to AI",         room:"7A05", teacher:"Al-Mamun",        type:"theory" },
      { time:"11:20 AM", end:"12:10 PM", code:"CSE 3201", title:"Computer Networks",   room:"7A05", teacher:"Joy",              type:"theory" },
      { time:"12:10 PM", end:"1:00 PM",  code:"CSE 3213", title:"Operating System",    room:"7A05", teacher:"MMH",              type:"theory" },
      { time:"1:50 PM",  end:"4:20 PM",  code:"CSE 3202", title:"Networks Lab",        room:"7B01", teacher:"Islam, TAN",       type:"lab" },
    ],
    1: [
      { time:"8:00 AM",  end:"8:50 AM",  code:"CSE 3223", title:"Info System Design",  room:"7A05", teacher:"Taher",            type:"theory" },
      { time:"8:50 AM",  end:"9:40 AM",  code:"CSE 3207", title:"Intro to AI",         room:"7A05", teacher:"Tabassum",         type:"theory" },
      { time:"9:40 AM",  end:"10:30 AM", code:"CSE 3201", title:"Computer Networks",   room:"7A05", teacher:"Joy",              type:"theory" },
    ],
    2: [
      { time:"1:50 PM",  end:"2:40 PM",  code:"CSE 3213", title:"Operating System",    room:"7A03", teacher:"MMH",              type:"theory" },
      { time:"2:40 PM",  end:"3:30 PM",  code:"HUM 3207", title:"Industrial Law",      room:"7A03", teacher:"TBA",              type:"theory" },
      { time:"3:30 PM",  end:"4:20 PM",  code:"HUM 3207", title:"Industrial Law",      room:"7A03", teacher:"TBA",              type:"theory" },
    ],
    3: [
      { time:"10:30 AM", end:"11:20 AM", code:"HUM 3207", title:"Industrial Law",      room:"7A03", teacher:"TBA",              type:"theory" },
      { time:"11:20 AM", end:"12:10 PM", code:"CSE 3207", title:"Intro to AI",         room:"7A03", teacher:"Al-Mamun",         type:"theory" },
      { time:"12:10 PM", end:"1:00 PM",  code:"CSE 3223", title:"Info System Design",  room:"7A03", teacher:"Taher",            type:"theory" },
      { time:"1:50 PM",  end:"4:20 PM",  code:"CSE 3208", title:"AI Lab",              room:"7B07", teacher:"Tanvir, Tabassum", type:"lab", note:"~2.5 hr gap before lab" },
    ],
    4: [
      { time:"3:30 PM",  end:"4:20 PM",  code:"CSE 3223", title:"Info System Design",  room:"7A06", teacher:"Taher",            type:"theory" },
      { time:"4:20 PM",  end:"5:10 PM",  code:"CSE 3201", title:"Computer Networks",   room:"7A06", teacher:"Joy",              type:"theory" },
      { time:"5:10 PM",  end:"6:00 PM",  code:"CSE 3213", title:"Operating System",    room:"7A06", teacher:"Islam",            type:"theory" },
    ],
    5: [], 6: [],
  }
};

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

export default function App() {
  const [checked, setChecked]     = useState(SEED_CHECKED);
  const [activeDay, setActiveDay] = useState(15);
  const [view, setView]           = useState("university");
  const [loaded, setLoaded]       = useState(false);
  const [saving, setSaving]       = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("routine-progress-v4");
        if (result && result.value) {
          const stored = JSON.parse(result.value);
          setChecked({ ...stored, ...SEED_CHECKED });
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      setSaving(true);
      try { await window.storage.set("routine-progress-v4", JSON.stringify(checked)); } catch (e) {}
      setTimeout(() => setSaving(false), 800);
    })();
  }, [checked, loaded]);

  const dayKey = (day, idx) => `d${day}-i${idx}`;

  const dayProgress = (day) => {
    if (day <= 14) return 100;
    const done = Array.from({ length: SCHEDULE_LEN }, (_, i) => checked[dayKey(day, i)]).filter(Boolean).length;
    return Math.round((done / SCHEDULE_LEN) * 100);
  };

  const totalProgress = () => {
    const done = Object.values(checked).filter(Boolean).length;
    return Math.round((done / (SCHEDULE_LEN * TOTAL_DAYS)) * 100);
  };

  const { dayFull, dayName, semesterWeek, patternLabel } = getDayInfo(activeDay);
  const todayClasses = getUniClasses(activeDay);
  const isWeekend    = ["Fri", "Sat"].includes(dayName);
  const isCompleted  = activeDay <= 14;

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

      {/* HEADER */}
      <div className="bg-[linear-gradient(135deg,#0f0f1a_0%,#1a1020_50%,#0f1a14_100%)] border-b border-[#2a2a3a] pt-[26px] pr-5 pb-[18px] pl-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_40px)]" />
        <p className="text-[10px] tracking-[6px] text-[#888] uppercase mt-0 mr-0 mb-[5px] ml-0">AUST CSE · SEMESTER LOCK-IN · 14 WEEKS</p>
        <h1 className="text-[clamp(22px,5vw,40px)] mt-0 mb-[4px] font-normal tracking-[-1px] text-[#f0ece0]">The Daily Standard</h1>
        <p className="text-[#666] text-[12px] mt-0 mb-[4px] ml-0 mr-0 italic">Discipline is the bridge between goals and greatness.</p>
        <p className={`text-[10px] mb-[14px] tracking-[1px] transition-colors duration-300 ${saving ? "text-[#a78bfa]" : "text-[#222]"}`}>{saving ? "💾 SAVING..." : "✓ PROGRESS SAVED"}</p>

        <div className="max-w-[360px] mx-auto">
          <div className="flex justify-between text-[10px] text-[#888] mb-[5px]">
            <span>SEMESTER PROGRESS</span>
            <span>{totalProgress()}%</span>
          </div>
          <div className="bg-[#1a1a2a] rounded-[99px] h-[5px]">
            <div
              className="h-full rounded-[99px] bg-[linear-gradient(90deg,#7c3aed,#059669,#d97706)] transition-[width] duration-500 ease-in-out"
              style={{ width: `${totalProgress()}%` }}
            />
          </div>
          <div className="text-[10px] text-[#3a6a4a] mt-[6px]">✅ Weeks 1–2 complete · 14 / {TOTAL_DAYS} days done · 12 weeks remaining</div>
        </div>
      </div>

      {/* NAV */}
      <div className="flex border-b border-[#1e1e2e] bg-[#0c0c14]">
        {[["university","🎓 University"],["tracker","📆 Tracker"]].map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 py-[13px] px-1 text-[11px] tracking-[1.5px] uppercase bg-transparent border-0 border-b-2 cursor-pointer transition-all duration-200 ${view === v ? "border-b-[#7c3aed] text-[#c4b5fd]" : "border-b-transparent text-[#555]"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* DAY SELECTOR */}
      <div className="max-w-[680px] mx-auto px-4">
        <div className="py-[14px] pb-[10px] sticky top-0 bg-[#0a0a0f] z-10 border-b border-[#1a1a2a]">
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => setActiveDay(d => Math.max(1, d-1))}
              className="bg-[#1a1a2a] border border-[#2a2a3a] text-[#888] rounded-lg w-[34px] h-[34px] cursor-pointer text-[16px]"
            >‹</button>
            <div className="flex-1 text-center">
              <div className="text-[13px] text-[#a78bfa] tracking-[1px]">{dayFull} · Day {activeDay} / {TOTAL_DAYS}</div>
              <div className="text-[10px] text-[#555] mt-[2px]">
                Week {semesterWeek} · {patternLabel === "A" ? "🔵 Pattern A" : "🟢 Pattern B"} · A1
                {isCompleted && <span className="text-[#059669] ml-[6px]">✅ Done</span>}
                {isWeekend && !isCompleted && <span className="ml-[6px]">🏖️ Weekend</span>}
              </div>
              <div className="bg-[#1a1a2a] rounded-[99px] h-[3px] mt-[6px]">
                <div
                  className={`h-full rounded-[99px] transition-[width] duration-400 ${dayProgress(activeDay) === 100 ? "bg-[#059669]" : "bg-[#7c3aed]"}`}
                  style={{ width: `${dayProgress(activeDay)}%` }}
                />
              </div>
              <span className="text-[10px] text-[#555] mt-[2px] block">{dayProgress(activeDay)}% complete</span>
            </div>
            <button
              onClick={() => setActiveDay(d => Math.min(TOTAL_DAYS, d+1))}
              className="bg-[#1a1a2a] border border-[#2a2a3a] text-[#888] rounded-lg w-[34px] h-[34px] cursor-pointer text-[16px]"
            >›</button>
          </div>
        </div>
      </div>

      {/* UNIVERSITY VIEW */}
      {view === "university" && (
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
      )}

      {/* TRACKER VIEW */}
      {view === "tracker" && (
        <div className="max-w-[680px] mx-auto pt-5 px-4 pb-10">
          <p className="text-[#666] text-[11px] text-center mb-4 tracking-[1px] uppercase">
            🟢 complete · 🟣 in progress · ⬛ upcoming
          </p>

          {Array.from({ length: 14 }, (_, w) => w + 1).map(week => {
            const startDay   = (week - 1) * 7 + 1;
            const days       = Array.from({ length: 7 }, (_, i) => startDay + i).filter(d => d <= TOTAL_DAYS);
            const wkPattern  = week % 2 === 1 ? "A" : "B";
            const weekIsDone = week <= 2;
            return (
              <div key={week} className="mb-[14px]">
                <div className="flex items-center gap-2 mb-[7px]">
                  <span className={`text-[10px] tracking-[2px] uppercase ${weekIsDone ? "text-[#059669]" : "text-[#555]"}`}>
                    {weekIsDone ? "✅ " : ""}Week {week}
                  </span>
                  <span className={`text-[9px] py-[1px] px-[7px] rounded-[99px] border ${wkPattern === "A" ? "bg-[#082f4940] text-[#38bdf8] border-[#0c4a6e]" : "bg-[#052e1640] text-[#34d399] border-[#065f46]"}`}>
                    Pattern {wkPattern}
                  </span>
                  <div className="flex-1 h-px bg-[#1e1e2e]" />
                </div>
                <div className="grid grid-cols-7 gap-[5px]">
                  {days.map(day => {
                    const pct      = dayProgress(day);
                    const { dayName } = getDayInfo(day);
                    const isActive = day === activeDay;
                    const isWknd   = ["Fri","Sat"].includes(dayName);
                    const ringColor = pct === 100 ? "#059669" : pct > 0 ? "#7c3aed" : "#2a2a3a";
                    const cellBase = "rounded-[10px] py-[9px] px-[5px] text-center cursor-pointer transition-all duration-200";
                    let cellState = "";
                    if (isActive) {
                      cellState = "border-2 border-[#7c3aed] bg-[#1a1025]";
                    } else {
                      const borderCls = pct === 100 ? "border-[#065f46]" : "border-[#1e1e2e]";
                      const bgCls = weekIsDone ? "bg-[#071a0f]" : isWknd ? "bg-[#0c0c10]" : "bg-[#0e0e18]";
                      cellState = `border ${borderCls} ${bgCls}`;
                    }
                    const dayNameColor = isWknd ? "text-[#444]" : "text-[#555]";
                    let dayNumColor = "text-[#666]";
                    if (isActive) dayNumColor = "text-[#c4b5fd]";
                    else if (pct === 100) dayNumColor = "text-[#34d399]";
                    let ringLabelColor = "text-[#333]";
                    if (pct === 100) ringLabelColor = "text-[#34d399]";
                    else if (pct > 0) ringLabelColor = "text-[#a78bfa]";
                    return (
                      <div
                        key={day}
                        onClick={() => { setActiveDay(day); setView("university"); }}
                        className={`${cellBase} ${cellState}`}
                        style={{ opacity: isWknd && !weekIsDone ? 0.4 : 1 }}
                      >
                        <div className={`text-[8px] mb-[2px] ${dayNameColor}`}>{dayName}</div>
                        <div className={`text-[13px] mb-[5px] ${dayNumColor}`}>{day}</div>
                        <div className="relative w-[26px] h-[26px] mx-auto">
                          <svg viewBox="0 0 36 36" className="w-[26px] h-[26px]" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#1e1e2e" strokeWidth="3"/>
                            <circle
                              cx="18" cy="18" r="14" fill="none"
                              stroke={ringColor} strokeWidth="3"
                              strokeDasharray={`${(pct/100)*87.96} 87.96`}
                              strokeLinecap="round"
                              style={{ transition: "stroke-dasharray 0.4s" }}
                            />
                          </svg>
                          <div className={`absolute inset-0 flex items-center justify-center text-[6px] ${ringLabelColor}`}>
                            {pct === 100 ? "✓" : pct > 0 ? `${pct}%` : ""}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-[10px]">
            {[
              { label:"Weeks Done",      value:"2 / 14",  icon:"📅" },
              { label:"Days Complete",   value:`14 / ${TOTAL_DAYS}`, icon:"✅" },
              { label:"Weeks Remaining", value:"12",       icon:"⏳" },
              { label:"Current Week",    value:`Week ${Math.ceil(activeDay/7)}`, icon:"🎓" },
            ].map(stat => (
              <div key={stat.label} className="bg-[#0e0e18] border border-[#1e1e2e] rounded-xl p-4">
                <div className="text-[20px] mb-1">{stat.icon}</div>
                <div className="text-[22px] text-[#c4b5fd] mb-[2px]">{stat.value}</div>
                <div className="text-[10px] text-[#555] uppercase tracking-[1px]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Pillars */}
          <div className="mt-4 bg-[#0e0e18] border border-[#1e1e2e] rounded-xl p-4">
            <p className="text-[10px] text-[#555] tracking-[2px] uppercase mt-0 mr-0 mb-3 ml-0">The 4 Pillars</p>
            {[
              { label:"Prayer",            desc:"5 daily prayers are your anchor. Never skip them.",      color:"#fbbf24" },
              { label:"Fitness & Health",  desc:"Move your body daily. Eat clean. Sleep 8 hours.",        color:"#34d399" },
              { label:"Study & Career",    desc:"CP + Web Dev + University subjects. Every single day.",  color:"#38bdf8" },
              { label:"Mental Discipline", desc:"Journal, plan, reflect. Win the morning, win the day.",  color:"#a78bfa" },
            ].map(p => (
              <div key={p.label} className="flex gap-[10px] items-start mb-[10px]">
                <div className="w-[3px] rounded-[99px] self-stretch flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <div className="text-[12px] mb-[2px]" style={{ color: p.color }}>{p.label}</div>
                  <div className="text-[11px] text-[#666]">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
