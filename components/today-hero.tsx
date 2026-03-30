"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flame, Sparkles, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { checkInBaseAbi, checkInBaseAddress } from "@/lib/contracts";
import { buildWeekStrip, formatDateTime, getCheckInStatus, isReadyToCheckIn } from "@/lib/utils";
import { StatusPill } from "./status-pill";
import { StreakRing } from "./streak-ring";
import { WeekStrip } from "./week-strip";

export function TodayHero() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
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
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } });

  const streakNumber = Number(streak ?? 0);
  const lastCheckInNumber = Number(lastCheckIn ?? 0);
  const ready = isReadyToCheckIn(lastCheckInNumber);
  const status = getCheckInStatus(lastCheckInNumber);
  const weekDays = useMemo(() => buildWeekStrip(lastCheckInNumber), [lastCheckInNumber]);

  useEffect(() => {
    if (receipt.isSuccess && hash) {
      const params = new URLSearchParams({
        state: "success",
        tx: hash,
        streak: String(streakNumber + 1),
        ts: String(Math.floor(Date.now() / 1000)),
      });
      router.push(`/status?${params.toString()}`);
    }
  }, [hash, receipt.isSuccess, router, streakNumber]);

  useEffect(() => {
    if (error) {
      router.push("/status?state=failed");
    }
  }, [error, router]);

  const handleCheckIn = () => {
    if (!isConnected) return;
    writeContract({
      abi: checkInBaseAbi,
      address: checkInBaseAddress,
      functionName: "checkIn",
    });
    router.push("/status?state=pending");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Today</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">CheckIn Base</h1>
        </div>
        <div className="origin-right scale-90">
          <ConnectButton.Custom>
            {({ account, chain, mounted, openConnectModal, openChainModal, openAccountModal }) => {
              const connected = mounted && account && chain;

              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-700 shadow-soft"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect
                  </button>
                );
              }

              if (chain.id !== 8453) {
                return (
                  <button
                    onClick={openChainModal}
                    className="inline-flex h-11 items-center rounded-full bg-amber-100 px-4 text-sm font-semibold text-amber-700"
                  >
                    Switch Base
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="inline-flex h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-slate-700 shadow-soft"
                >
                  {account.displayName}
                </button>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>

      <section className="glass-card overflow-hidden rounded-[32px] p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <StatusPill
            label={status === "done" ? "Done" : status === "missed" ? "Missed" : "Ready"}
            tone={status}
          />
          <StatusPill label={isPending ? "Pending" : "Live"} tone={isPending ? "pending" : "streak"} />
        </div>
        <div className="mt-5 flex items-center justify-center">
          <StreakRing streak={streakNumber} ready={ready} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Last</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{formatDateTime(lastCheckInNumber)}</p>
          </div>
          <div className="rounded-3xl bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">Status</p>
            <p className="mt-2 text-sm font-semibold text-blue-900">{ready ? "Ready for today" : "Already checked"}</p>
          </div>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={!isConnected || !ready || isPending}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Flame className="h-5 w-5" />
          {isConnected ? (ready ? (isPending ? "Pending" : "Check In") : "Done") : "Connect to Check In"}
        </button>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Week Flow</p>
          <Sparkles className="h-4 w-4 text-violet-500" />
        </div>
        <div className="mt-4">
          <WeekStrip days={weekDays} />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-3xl bg-violet-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">Current</p>
          <p className="mt-2 text-2xl font-black text-violet-900">{streakNumber}</p>
        </div>
        <div className="rounded-3xl bg-green-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">Today</p>
          <p className="mt-2 text-sm font-bold text-green-900">{ready ? "Open" : "Done"}</p>
        </div>
        <Link href={hash ? `/checkin/${hash}` : "/status"} className="rounded-3xl bg-slate-900 p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Recent</p>
          <p className="mt-2 text-sm font-bold">{hash ? "View" : "Status"}</p>
        </Link>
      </section>
    </div>
  );
}
