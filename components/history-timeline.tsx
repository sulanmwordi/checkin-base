import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDot, XCircle } from "lucide-react";

import { cn, type HistoryEntry } from "@/lib/utils";

const iconMap = {
  completed: <CheckCircle2 className="h-4 w-4" />,
  broken: <XCircle className="h-4 w-4" />,
  pending: <CircleDot className="h-4 w-4" />,
};

const colorMap = {
  completed: "bg-green-50 text-green-700 ring-1 ring-green-100",
  broken: "bg-red-50 text-red-700 ring-1 ring-red-100",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
};

export function HistoryTimeline({ entries }: { entries: HistoryEntry[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[30px] bg-white p-5 shadow-soft">
        <div className="grid grid-cols-7 gap-2">
          {entries.slice(-14).map((entry) => (
            <div key={entry.id} className="space-y-2 text-center">
              <div
                className={cn(
                  "flex h-12 items-center justify-center rounded-2xl text-xs font-bold",
                  colorMap[entry.status],
                )}
              >
                {new Date(entry.date).getDate()}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative pl-4">
        <div className="absolute left-[9px] top-0 h-full w-px bg-slate-200" />
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              href={`/checkin/${entry.id}?status=${entry.status}&date=${encodeURIComponent(entry.date)}&streak=${entry.streakAfter}`}
              key={entry.id}
              className="relative flex items-center gap-4 rounded-[28px] bg-white p-4 shadow-soft"
            >
              <div className={cn("relative z-10 flex h-9 w-9 items-center justify-center rounded-full", colorMap[entry.status])}>
                {iconMap[entry.status]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">{entry.shortLabel}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{entry.label}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {entry.status === "completed" ? "Done" : entry.status === "broken" ? "Missed" : "Pending"}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">{entry.streakAfter || "--"}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
