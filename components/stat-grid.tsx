export function StatGrid({
  stats,
}: {
  stats: { label: string; value: string | number; tone?: "blue" | "violet" | "green" | "slate" }[];
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-900",
    violet: "bg-violet-50 text-violet-900",
    green: "bg-green-50 text-green-900",
    slate: "bg-slate-100 text-slate-900",
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className={`rounded-[28px] p-4 ${tones[stat.tone || "slate"]}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">{stat.label}</p>
          <p className="mt-3 text-3xl font-black leading-none">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
