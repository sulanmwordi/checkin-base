import type { ReactNode } from "react";
import { CheckCircle2, Clock3, Flame, Slash } from "lucide-react";

import { cn } from "@/lib/utils";

type DayState = "ready" | "done" | "missed" | "inactive";

const iconMap: Record<DayState, ReactNode> = {
  ready: <Clock3 className="h-4 w-4" />,
  done: <CheckCircle2 className="h-4 w-4" />,
  missed: <Slash className="h-4 w-4" />,
  inactive: <Flame className="h-4 w-4" />,
};

const colorMap: Record<DayState, string> = {
  ready: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  done: "bg-green-50 text-green-700 ring-1 ring-green-100",
  missed: "bg-red-50 text-red-700 ring-1 ring-red-100",
  inactive: "bg-slate-100 text-slate-400 ring-1 ring-slate-200",
};

export function WeekStrip({
  days,
}: {
  days: { key: string; day: string; date: number; state: DayState }[];
}) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div
          key={day.key}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center",
            colorMap[day.state],
          )}
        >
          <span className="text-[10px] font-bold uppercase tracking-wide">{day.day}</span>
          <span>{iconMap[day.state]}</span>
          <span className="text-sm font-semibold">{day.date}</span>
        </div>
      ))}
    </div>
  );
}

