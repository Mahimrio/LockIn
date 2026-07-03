import { TOTAL_DAYS } from "../data/constants";

export default function Header({ totalProgress, saving }) {
  return (
    <div className="bg-[linear-gradient(135deg,#0f0f1a_0%,#1a1020_50%,#0f1a14_100%)] border-b border-[#2a2a3a] pt-[26px] pr-5 pb-[18px] pl-5 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_40px)]" />
      <p className="text-[10px] tracking-[6px] text-[#888] uppercase mt-0 mr-0 mb-[5px] ml-0">AUST CSE · SEMESTER LOCK-IN · 14 WEEKS</p>
      <h1 className="text-[clamp(22px,5vw,40px)] mt-0 mb-[4px] font-normal tracking-[-1px] text-[#f0ece0]">The Daily Standard</h1>
      <p className="text-[#666] text-[12px] mt-0 mb-[4px] ml-0 mr-0 italic">Discipline is the bridge between goals and greatness.</p>
      <p className={`text-[10px] mb-[14px] tracking-[1px] transition-colors duration-300 ${saving ? "text-[#a78bfa]" : "text-[#222]"}`}>
        {saving ? "💾 SAVING..." : "✓ PROGRESS SAVED"}
      </p>
      <div className="max-w-[360px] mx-auto">
        <div className="flex justify-between text-[10px] text-[#888] mb-[5px]">
          <span>SEMESTER PROGRESS</span>
          <span>{totalProgress}%</span>
        </div>
        <div className="bg-[#1a1a2a] rounded-[99px] h-[5px]">
          <div
            className="h-full rounded-[99px] bg-[linear-gradient(90deg,#7c3aed,#059669,#d97706)] transition-[width] duration-500 ease-in-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <div className="text-[10px] text-[#3a6a4a] mt-[6px]">
          ✅ Weeks 1–2 complete · 14 / {TOTAL_DAYS} days done · 12 weeks remaining
        </div>
      </div>
    </div>
  );
}
