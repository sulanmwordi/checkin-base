import Link from "next/link";
import { AlertTriangle, CheckCircle2, CircleDashed, Sparkle, XCircle } from "lucide-react";

import { BottomTab } from "@/components/bottom-tab";
import { CheckInResultCard } from "@/components/checkin-result-card";
import { StatusPill } from "@/components/status-pill";

const stateMap = {
  success: {
    icon: CheckCircle2,
    title: "Check-in done",
    pill: "Success",
    tone: "done" as const,
    accent: "bg-green-100 text-green-700",
  },
  done: {
    icon: Sparkle,
    title: "Already checked",
    pill: "Done",
    tone: "done" as const,
    accent: "bg-green-100 text-green-700",
  },
  pending: {
    icon: CircleDashed,
    title: "Waiting on chain",
    pill: "Pending",
    tone: "pending" as const,
    accent: "bg-amber-100 text-amber-700",
  },
  failed: {
    icon: XCircle,
    title: "Check-in failed",
    pill: "Failed",
    tone: "missed" as const,
    accent: "bg-red-100 text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    title: "Already checked today",
    pill: "Done",
    tone: "pending" as const,
    accent: "bg-amber-100 text-amber-700",
  },
};

type Props = {
  searchParams: Promise<{ state?: string; tx?: string; streak?: string; ts?: string }>;
};

export default async function StatusPage({ searchParams }: Props) {
  const params = await searchParams;
  const state = (params.state || "pending") as keyof typeof stateMap;
  const tx = params.tx || "0x919b...d64";
  const streak = Number(params.streak || 0);
  const ts = Number(params.ts || Math.floor(Date.now() / 1000));
  const current = stateMap[state] || stateMap.pending;
  const Icon = current.icon;

  return (
    <>
      <main className="page-wrap flex min-h-screen flex-col items-center justify-center gap-5">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <div className={`flex h-24 w-24 items-center justify-center rounded-full ${current.accent}`}>
            <Icon className="h-10 w-10" />
          </div>
          <StatusPill label={current.pill} tone={current.tone} />
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{current.title}</h1>
        </div>

        <div className="w-full max-w-sm">
          <CheckInResultCard id={tx} status={state === "success" ? "success" : state === "failed" ? "failed" : state === "done" ? "done" : "pending"} timestamp={ts} streak={streak} />
        </div>

        <div className="flex w-full max-w-sm gap-3">
          <Link href="/" className="flex-1 rounded-full bg-primary px-5 py-4 text-center text-sm font-bold text-white">
            Back
          </Link>
          <Link href="/history" className="flex-1 rounded-full bg-white px-5 py-4 text-center text-sm font-bold text-slate-900 shadow-soft">
            View
          </Link>
        </div>
      </main>
      <BottomTab />
    </>
  );
}
