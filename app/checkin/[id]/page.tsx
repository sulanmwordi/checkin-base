import Link from "next/link";
import { ArrowLeft, Blocks, CalendarClock, Flame } from "lucide-react";

import { CheckInResultCard } from "@/components/checkin-result-card";
import { StatusPill } from "@/components/status-pill";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; date?: string; streak?: string }>;
};

export default async function CheckInDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;
  const status = query.status === "broken" ? "failed" : query.status === "pending" ? "pending" : "success";
  const timestamp = query.date ? Math.floor(new Date(query.date).getTime() / 1000) : Math.floor(Number(id) / 1000);
  const streak = Number(query.streak || 0);

  return (
    <main className="page-wrap space-y-5">
      <header className="flex items-center justify-between">
        <Link href="/history" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-soft">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <StatusPill label="Detail" tone="streak" />
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-blue-600 to-violet-600 p-5 text-white shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">Single Event</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Check-in Detail</h1>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-white/15 p-4">
            <CalendarClock className="h-4 w-4 text-blue-100" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-100">Time</p>
            <p className="mt-1 text-sm font-bold">{timestamp ? new Date(timestamp * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "--"}</p>
          </div>
          <div className="rounded-3xl bg-white/15 p-4">
            <Flame className="h-4 w-4 text-blue-100" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-100">Streak</p>
            <p className="mt-1 text-sm font-bold">{streak || "--"}</p>
          </div>
          <div className="rounded-3xl bg-white/15 p-4">
            <Blocks className="h-4 w-4 text-blue-100" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-100">Chain</p>
            <p className="mt-1 text-sm font-bold">Base</p>
          </div>
        </div>
      </section>

      <CheckInResultCard id={id} status={status} timestamp={timestamp} streak={streak} />
    </main>
  );
}
