import { SEMESTER_START } from "../data/constants";

function getWeekInfo() {
  const now = new Date();
  const diff = Math.floor((now - SEMESTER_START) / (1000 * 60 * 60 * 24)) + 1;
  const currentWeek = Math.min(Math.max(Math.ceil(diff / 7), 1), 14);
  const pattern = currentWeek % 2 === 1 ? "A" : "B";
  return { currentWeek, pattern };
}

export default function Header({ totalProgress, saving }) {
  const { currentWeek, pattern } = getWeekInfo();

  return (
    <div className="bg-[linear-gradient(135deg,#0f0f1a_0%,#1a1020_50%,#0f1a14_100%)] border-b border-[#2a2a3a] pt-5 pb-[18px] px-5 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_40px)]" />
      <p className="text-[10px] tracking-[6px] text-[#888] uppercase m-0 mb-[6px]">AUST CSE · SEMESTER LOCK-IN · 14 WEEKS</p>
      <h1 className="text-[clamp(28px,8vw,44px)] m-0 mb-[6px] font-normal tracking-[-1px] text-[#f0ece0]">LockIn</h1>
      <p className="text-[#666] text-[12px] m-0 mb-[4px] italic">
        Discipline is the bridge between goals and greatness.
      </p>
      <p className={`text-[10px] mb-3 tracking-[1px] transition-colors duration-300 ${saving ? "text-[#a78bfa]" : "text-transparent"}`}>
        {saving ? "💾 SAVING..." : "•"}
      </p>

      <div className="max-w-[400px] mx-auto px-2">
        <div className="flex justify-between text-[10px] text-[#888] mb-[5px]">
          <span>SEMESTER PROGRESS</span>
          <span>{totalProgress}%</span>
        </div>
        <div className="bg-[#1a1a2a] rounded-[99px] h-[4px]">
          <div
            className="h-full rounded-[99px] bg-[linear-gradient(90deg,#7c3aed,#059669,#d97706)] transition-[width] duration-500 ease-in-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-[6px]">
          <span className="text-[10px] text-[#059669]">✅ Weeks 1–2 complete · 14/98 days done</span>
          <span className="text-[9px] text-[#555]">Week {currentWeek} of 14 · Pattern {pattern}</span>
        </div>
      </div>
    </div>
  );
}
