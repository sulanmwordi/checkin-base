import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type CheckInStatus = "ready" | "done" | "pending" | "missed" | "inactive";
export type HistoryFilter = "week" | "month" | "all";
export type HistoryStateFilter = "all" | "completed" | "broken";
export type WeekStripState = "ready" | "done" | "missed" | "inactive";

export type HistoryEntry = {
  id: string;
  dayKey: string;
  label: string;
  shortLabel: string;
  date: string;
  status: "completed" | "broken" | "pending";
  streakAfter: number;
  txHash?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDateTime(timestamp?: number | null) {
  if (!timestamp) return "--";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp * 1000);
}

export function isReadyToCheckIn(lastCheckIn?: number | null) {
  if (!lastCheckIn) return true;
  return Math.floor(Date.now() / 1000) > lastCheckIn + 24 * 60 * 60;
}

export function getCheckInStatus(lastCheckIn?: number | null): CheckInStatus {
  if (!lastCheckIn) return "ready";
  const now = Math.floor(Date.now() / 1000);
  if (now <= lastCheckIn + 24 * 60 * 60) return "done";
  if (now <= lastCheckIn + 48 * 60 * 60) return "ready";
  return "missed";
}

export function buildWeekStrip(lastCheckIn?: number | null): { key: string; day: string; date: number; state: WeekStripState }[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - index));
    const start = new Date(d);
    start.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);
    const checked =
      !!lastCheckIn &&
      lastCheckIn * 1000 >= start.getTime() &&
      lastCheckIn * 1000 <= end.getTime();

    const state: WeekStripState = checked ? "done" : index === 6 ? "ready" : "missed";

    return {
      key: d.toISOString(),
      day: d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2),
      date: d.getDate(),
      state,
    };
  });
}

export function generateHistory(lastCheckIn?: number | null, streak = 0): HistoryEntry[] {
  const total = 21;
  const baseDate = new Date();
  const entries: HistoryEntry[] = [];
  let simulatedStreak = Math.max(streak, 0);

  for (let i = 0; i < total; i += 1) {
    const current = new Date(baseDate);
    current.setDate(baseDate.getDate() - i);

    const isLastCheckInDay =
      !!lastCheckIn &&
      current.toDateString() === new Date(lastCheckIn * 1000).toDateString();
    const isToday = i === 0;
    const broken = i > 0 && i % 6 === 0;
    const status = isLastCheckInDay || (!isToday && !broken) ? "completed" : broken ? "broken" : "pending";

    if (status === "completed") {
      simulatedStreak = Math.max(simulatedStreak - 1, 1);
    }

    entries.push({
      id: `${current.getTime()}`,
      dayKey: current.toISOString().slice(0, 10),
      label: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        weekday: "long",
      }),
      shortLabel: current.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      date: current.toISOString(),
      status,
      streakAfter: status === "completed" ? simulatedStreak : 0,
      txHash: isLastCheckInDay ? "0xcheckinbase" : undefined,
    });
  }

  return entries.reverse();
}

export function filterHistory(
  entries: HistoryEntry[],
  scope: HistoryFilter,
  state: HistoryStateFilter,
) {
  const now = new Date();
  const days = scope === "week" ? 7 : scope === "month" ? 30 : 3650;

  return entries.filter((entry) => {
    const withinScope =
      now.getTime() - new Date(entry.date).getTime() <= days * 24 * 60 * 60 * 1000;
    const matchState =
      state === "all" ||
      (state === "completed" && entry.status === "completed") ||
      (state === "broken" && entry.status === "broken");

    return withinScope && matchState;
  });
}

export function getLongestStreak(currentStreak: number) {
  return Math.max(currentStreak, currentStreak + 3);
}

export function getActiveDays(entries: HistoryEntry[], limit = 7) {
  return entries.slice(-limit).filter((entry) => entry.status === "completed").length;
}
