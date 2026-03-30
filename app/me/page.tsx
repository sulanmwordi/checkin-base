"use client";

import { Trophy, Wallet } from "lucide-react";
import { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";

import { BadgeCarousel } from "@/components/badge-carousel";
import { BottomTab } from "@/components/bottom-tab";
import { StatGrid } from "@/components/stat-grid";
import { checkInBaseAbi, checkInBaseAddress } from "@/lib/contracts";
import { formatAddress, generateHistory, getActiveDays, getLongestStreak } from "@/lib/utils";

export default function MePage() {
  const { address } = useAccount();
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

  const currentStreak = Number(streak ?? 0);
  const history = useMemo(() => generateHistory(Number(lastCheckIn ?? 0), currentStreak), [currentStreak, lastCheckIn]);
  const total = history.filter((entry) => entry.status === "completed").length;

  return (
    <>
      <main className="page-wrap space-y-5">
        <header className="rounded-[32px] bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Me</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Achievement Deck</h1>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-5 rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            {formatAddress(address)}
          </p>
        </header>

        <StatGrid
          stats={[
            { label: "Current", value: currentStreak, tone: "violet" },
            { label: "Longest", value: getLongestStreak(currentStreak), tone: "blue" },
            { label: "Total", value: total, tone: "green" },
            { label: "7D Active", value: getActiveDays(history), tone: "slate" },
          ]}
        />

        <section className="rounded-[32px] bg-slate-950 p-5 text-white shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Badges</p>
              <h2 className="mt-2 text-xl font-black">Unlocked</h2>
            </div>
            <Trophy className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="mt-5">
            <BadgeCarousel
              badges={[
                { title: "Day One", meta: "Live", tone: "linear-gradient(135deg, #2563EB, #14B8A6)" },
                { title: "3 Day Run", meta: "Current", tone: "linear-gradient(135deg, #7C3AED, #2563EB)" },
                { title: "Week Pulse", meta: "Week", tone: "linear-gradient(135deg, #14B8A6, #22C55E)" },
              ]}
            />
          </div>
        </section>

        <section className="rounded-[32px] bg-white p-5 shadow-soft">
          <div className="grid grid-cols-4 gap-2">
            {history.slice(-7).map((entry) => (
              <div
                key={entry.id}
                className={`rounded-2xl px-2 py-4 text-center text-xs font-bold ${
                  entry.status === "completed"
                    ? "bg-green-50 text-green-700"
                    : entry.status === "broken"
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                }`}
              >
                {new Date(entry.date).getDate()}
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomTab />
    </>
  );
}
