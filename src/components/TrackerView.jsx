import { TOTAL_DAYS, DAY_NAMES, SEMESTER_START } from "../data/constants";

function getDayInfo(dayNumber) {
  const date = new Date(SEMESTER_START);
  date.setDate(SEMESTER_START.getDate() + (dayNumber - 1));
  const dow = date.getDay();
  const semesterWeek = Math.ceil(dayNumber / 7);
  return { dow, semesterWeek, dayName: DAY_NAMES[dow] };
}

export default function TrackerView({ activeDay, setActiveDay, setView, dayProgress }) {
  return (
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
          <div key={week} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
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
                const pct = dayProgress(day);
                const { dayName } = getDayInfo(day);
                const isActive = day === activeDay;
                const isWknd   = ["Fri","Sat"].includes(dayName);
                const ringColor = pct === 100 ? "#059669" : pct > 0 ? "#7c3aed" : "#2a2a3a";
                let cellState = "";
                if (isActive) {
                  cellState = "border-2 border-[#7c3aed] bg-[#1a1025]";
                } else {
                  const borderCls = pct === 100 ? "border-[#065f46]" : "border-[#1e1e2e]";
                  const bgCls = weekIsDone ? "bg-[#071a0f]" : isWknd ? "bg-[#0c0c10]" : "bg-[#0e0e18]";
                  cellState = `border ${borderCls} ${bgCls}`;
                }
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
                    className={`rounded-[10px] py-[9px] px-[5px] text-center cursor-pointer transition-all duration-200 min-h-[64px] card-hover ${cellState}`}
                    style={{ opacity: isWknd && !weekIsDone ? 0.4 : 1 }}
                  >
                    <div className={`text-[8px] mb-[2px] ${isWknd ? "text-[#444]" : "text-[#555]"}`}>{dayName}</div>
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

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { label:"Weeks Done",      value:"2 / 14",  icon:"📅" },
          { label:"Days Complete",   value:`14 / ${TOTAL_DAYS}`, icon:"✅" },
          { label:"Weeks Remaining", value:"12",       icon:"⏳" },
          { label:"Current Week",    value:`Week ${Math.ceil(activeDay/7)}`, icon:"🎓" },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0e0e18] border border-[#1e1e2e] rounded-xl p-4 card-hover">
            <div className="text-[22px] mb-1">{stat.icon}</div>
            <div className="text-[23px] text-[#c4b5fd] mb-[2px]">{stat.value}</div>
            <div className="text-[10px] text-[#555] uppercase tracking-[1px]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-[#0e0e18] border border-[#1e1e2e] rounded-xl p-4">
        <p className="text-[10px] text-[#555] tracking-[2px] uppercase m-0 mb-3">The 4 Pillars</p>
        {[
          { label:"Prayer",            desc:"5 daily prayers are your anchor. Never skip them.",      color:"#fbbf24" },
          { label:"Fitness & Health",  desc:"Move your body daily. Eat clean. Sleep 8 hours.",        color:"#34d399" },
          { label:"Study & Career",    desc:"CP + Web Dev + University subjects. Every single day.",  color:"#38bdf8" },
          { label:"Mental Discipline", desc:"Journal, plan, reflect. Win the morning, win the day.",  color:"#a78bfa" },
        ].map(p => (
          <div key={p.label} className="flex gap-3 items-start mb-3 last:mb-0">
            <div className="w-[3px] rounded-[99px] self-stretch flex-shrink-0" style={{ background: p.color }} />
            <div>
              <div className="text-[13px] mb-[2px]" style={{ color: p.color }}>{p.label}</div>
              <div className="text-[11px] text-[#666]">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
