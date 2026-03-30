"use client";

import { useMemo, useState } from "react";
import { CalendarFold, Filter } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";

import { BottomTab } from "@/components/bottom-tab";
import { HistoryTimeline } from "@/components/history-timeline";
import { checkInBaseAbi, checkInBaseAddress } from "@/lib/contracts";
import { filterHistory, generateHistory, type HistoryFilter, type HistoryStateFilter } from "@/lib/utils";

const scopes: HistoryFilter[] = ["week", "month", "all"];
const states: HistoryStateFilter[] = ["all", "completed", "broken"];

export default function HistoryPage() {
  const { address } = useAccount();
  const [scope, setScope] = useState<HistoryFilter>("week");
  const [state, setState] = useState<HistoryStateFilter>("all");
  const { data: lastCheckIn } = useReadContract({
    abi: checkInBaseAbi,
    address: checkInBaseAddress,
    functionName: "lastCheckIn",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  const { data: streak } = useReadContract({
    abi: checkInBaseAbi,
    address: checkInBaseAddress,
    functionName: "streak",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const filtered = useMemo(() => {
    const entries = generateHistory(Number(lastCheckIn ?? 0), Number(streak ?? 0));
    return filterHistory(entries, scope, state);
  }, [lastCheckIn, scope, state, streak]);

  return (
    <>
      <main className="page-wrap space-y-5">
        <header className="rounded-[32px] bg-slate-950 px-5 py-6 text-white shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">History</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">Track Flow</h1>
            </div>
            <CalendarFold className="h-5 w-5 text-slate-500" />
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Filter className="h-4 w-4" />
            <span>{filtered.length} records</span>
          </div>
        </header>

        <section className="space-y-3">
          <div className="segmented">
            {scopes.map((item) => (
              <button
                key={item}
                onClick={() => setScope(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${scope === item ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                {item === "week" ? "Week" : item === "month" ? "Month" : "All"}
              </button>
            ))}
          </div>
          <div className="segmented">
            {states.map((item) => (
              <button
                key={item}
                onClick={() => setState(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${state === item ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                {item === "all" ? "All" : item === "completed" ? "Done" : "Break"}
              </button>
            ))}
          </div>
        </section>

        <HistoryTimeline entries={filtered} />
      </main>
      <BottomTab />
    </>
  );
}
