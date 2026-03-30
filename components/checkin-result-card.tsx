import Link from "next/link";
import { ArrowUpRight, CalendarDays, Flame, Hash } from "lucide-react";

import { formatDateTime } from "@/lib/utils";
import { StatusPill } from "./status-pill";

export function CheckInResultCard({
  id,
  status,
  timestamp,
  streak,
}: {
  id: string;
  status: "success" | "done" | "failed" | "pending";
  timestamp?: number | null;
  streak?: number;
}) {
  const tone =
    status === "success" ? "done" : status === "failed" ? "missed" : status === "pending" ? "pending" : "done";

  return (
    <section className="rounded-[32px] bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <StatusPill
          label={
            status === "success"
              ? "Success"
              : status === "failed"
                ? "Failed"
                : status === "pending"
                  ? "Pending"
                  : "Done"
          }
          tone={tone}
        />
        <Link href="/history" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 space-y-3">
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Time</span>
          </div>
          <p className="mt-2 text-base font-bold text-slate-900">{formatDateTime(timestamp || undefined)}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-violet-50 p-4">
            <div className="flex items-center gap-2 text-violet-600">
              <Flame className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Streak</span>
            </div>
            <p className="mt-2 text-3xl font-black text-violet-900">{streak ?? "--"}</p>
          </div>
          <div className="rounded-3xl bg-blue-50 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Hash className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Chain</span>
            </div>
            <p className="mt-2 text-base font-bold text-blue-900">Base Mainnet</p>
          </div>
        </div>
      </div>
      <p className="mt-4 break-all text-xs font-medium text-slate-400">{id}</p>
    </section>
  );
}
