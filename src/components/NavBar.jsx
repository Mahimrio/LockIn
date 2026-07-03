export default function NavBar({ view, setView }) {
  const tabs = [
    ["daily", "📋 Daily"],
    ["university", "🎓 University"],
    ["tracker", "📆 Tracker"],
  ];
  return (
    <div className="flex border-b border-[#1e1e2e] bg-[#0c0c14]">
      {tabs.map(([v, label]) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`flex-1 py-[13px] px-1 text-[11px] tracking-[1.5px] uppercase bg-transparent border-0 border-b-2 cursor-pointer transition-all duration-200 ${view === v ? "border-b-[#7c3aed] text-[#c4b5fd]" : "border-b-transparent text-[#555]"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
