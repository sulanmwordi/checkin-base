"use client";

export function StreakRing({ streak, ready }: { streak: number; ready: boolean }) {
  const progress = Math.min(100, Math.max(18, streak * 10));
  const angle = (progress / 100) * 360;

  return (
    <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-soft">
      <div
        className="absolute inset-3 rounded-full"
        style={{
          background: `conic-gradient(${ready ? "#2563EB" : "#22C55E"} ${angle}deg, rgba(226, 232, 240, 0.85) ${angle}deg)`,
        }}
      />
      <div className="absolute inset-6 rounded-full bg-slate-50" />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Current</span>
        <span className="text-6xl font-black leading-none text-slate-900">{streak}</span>
        <span className="mt-2 text-sm font-medium text-slate-500">day streak</span>
      </div>
    </div>
  );
}
