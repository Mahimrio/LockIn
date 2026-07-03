const categoryConfig = {
  prayer:     { dot: "#fbbf24", badgeBg: "#3b0764", badgeText: "#fbbf24", border: "#4c1d95", label: "Prayer" },
  fitness:    { dot: "#34d399", badgeBg: "#052e16", badgeText: "#34d399", border: "#065f46", label: "Fitness" },
  career:     { dot: "#38bdf8", badgeBg: "#082f49", badgeText: "#38bdf8", border: "#0c4a6e", label: "Career" },
  discipline: { dot: "#a78bfa", badgeBg: "#1a1025", badgeText: "#a78bfa", border: "#4c1d95", label: "Discipline" },
};

export default function DailyView({ activeDay, checked, toggle, dayProgress }) {
  const dailySchedule = [
    { time:"6:00 AM",  category:"discipline", icon:"🌅", label:"Wake Up", desc:"Rise immediately. Drink a full glass of water. No phone." },
    { time:"6:05 AM",  category:"prayer", icon:"🤲", label:"Fajr / Morning Prayer", desc:"Start your day with God. Pray, reflect, set your intention." },
    { time:"6:30 AM",  category:"fitness", icon:"🚿", label:"Shower & Groom", desc:"Cold rinse at the end. Get dressed as if you have somewhere to be." },
    { time:"6:50 AM",  category:"fitness", icon:"🥗", label:"Healthy Breakfast", desc:"Protein-rich, whole foods. No junk. Fuel your brain and body." },
    { time:"7:15 AM",  category:"discipline", icon:"📓", label:"Plan & Journal", desc:"Write your 3 must-do tasks. Review your semester goal. Visualize success." },
    { time:"7:40 AM",  category:"career", icon:"🧩", label:"Competitive Programming", desc:"2 hrs of pure CP. Solve problems, sharpen logic. Phone on DND." },
    { time:"9:40 AM",  category:"discipline", icon:"🧘", label:"Short Break", desc:"10 min — stretch, hydrate, breathe. No scrolling." },
    { time:"9:50 AM",  category:"career", icon:"💻", label:"Web Development", desc:"2 hrs of focused web dev. Build, code, debug, ship." },
    { time:"11:50 AM",  category:"discipline", icon:"☕", label:"Short Break", desc:"10–15 min before Dhuhr. Rest your eyes, hydrate." },
    { time:"12:10 PM",  category:"prayer", icon:"🤲", label:"Dhuhr Prayer", desc:"Pause everything. Pray. Reset your mind at midday." },
    { time:"12:25 PM",  category:"fitness", icon:"🏋", label:"Post-Dhuhr Workout", desc:"30 min strength training or calisthenics." },
    { time:"1:00 PM",  category:"fitness", icon:"🍱", label:"Lunch + Rest", desc:"Eat a light, balanced meal. Rest your eyes." },
    { time:"1:45 PM",  category:"career", icon:"📚", label:"University / Semester Study", desc:"Classes or 2 hrs dedicated study. Check your uni schedule tab." },
    { time:"4:00 PM",  category:"prayer", icon:"🤲", label:"Asr Prayer + Reflection", desc:"Pray Asr. Reflect on your morning." },
    { time:"4:15 PM",  category:"fitness", icon:"🚶", label:"Physical Reset", desc:"30 min walk, jog, or stretching. Get sunlight." },
    { time:"5:00 PM",  category:"discipline", icon:"🧹", label:"Prep & Wind Down", desc:"Tidy your space. Protect your peace." },
    { time:"5:30 PM",  category:"prayer", icon:"🤲", label:"Maghrib Prayer", desc:"Pray Maghrib as soon as it enters." },
    { time:"6:00 PM",  category:"fitness", icon:"🍽", label:"Dinner & Family Time", desc:"Eat well. Be present with family. Unplug from work." },
    { time:"7:00 PM",  category:"career", icon:"🌙", label:"Evening Review / Light Study", desc:"Light revision of CP, web dev, or uni subjects." },
    { time:"8:30 PM",  category:"prayer", icon:"🤲", label:"Isha Prayer", desc:"Pray Isha. Spiritual anchor before the night." },
    { time:"9:00 PM",  category:"discipline", icon:"✍", label:"Night Journal + Gratitude", desc:"Write 3 wins from today." },
    { time:"9:20 PM",  category:"discipline", icon:"😴", label:"Wind Down — No Screens", desc:"Read something light, stretch, or meditate." },
    { time:"10:00 PM",  category:"discipline", icon:"🌑", label:"Lights Out", desc:"Sleep. 8 hours is not optional. Champions rest well." },
  ];

  const pct = dayProgress(activeDay);
  const doneCount = dailySchedule.filter((_, i) => checked[`d${activeDay}-i${i}`]).length;
  const total = dailySchedule.length;

  return (
    <div className="max-w-[680px] mx-auto px-4 pb-10">
      <div className="mt-4 mb-5">
        <div className="flex justify-between text-[10px] text-[#888] mb-[5px]">
          <span>TODAY&#39;S ROUTINE</span>
          <span>{doneCount} / {total} done ({pct}%)</span>
        </div>
        <div className="bg-[#1a1a2a] rounded-[99px] h-[4px]">
          <div className={`h-full rounded-[99px] transition-[width] duration-400 ${pct === 100 ? "bg-[#059669]" : "bg-[#7c3aed]"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {dailySchedule.map((item, i) => {
          const cfg = categoryConfig[item.category];
          const isDone = !!checked[`d${activeDay}-i${i}`];
          return (
            <div
              key={i}
              onClick={() => toggle(activeDay, i)}
              className={`flex gap-3 items-start py-3 px-4 rounded-xl bg-[#0e0e18] border cursor-pointer transition-all duration-200 min-h-[48px] card-hover ${isDone ? "border-[#2a2a3a] opacity-55 checked-stripe" : "border-[#1e1e2e]"}`}
            >
              <div className={`mt-[2px] w-[18px] h-[18px] rounded border-2 flex items-center justify-center text-[10px] flex-shrink-0 transition-all duration-200 ${isDone ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "border-[#555] bg-transparent"}`}>
                {isDone && "x"}
              </div>
              <div className="w-[3px] rounded-[99px] self-stretch flex-shrink-0" style={{ background: cfg.dot }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-[2px]">
                  <span className="text-[11px] text-[#666] font-mono">{item.time}</span>
                  <span className="text-[9px] py-[1px] px-[6px] rounded-[99px] uppercase tracking-[1px]" style={{ background: cfg.badgeBg, color: cfg.badgeText, border: `1px solid ${cfg.border}` }}>
                    {cfg.label}
                  </span>
                </div>
                <div className="text-[14px] text-[#d4d0c8] font-medium">
                  {item.icon} {item.label}
                </div>
                <div className="text-[11px] text-[#555] mt-[2px]">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
