import { cn, type CheckInStatus } from "@/lib/utils";

const styles: Record<CheckInStatus | "streak", string> = {
  ready: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  missed: "bg-red-100 text-red-700",
  inactive: "bg-slate-200 text-slate-500",
  streak: "bg-violet-100 text-violet-700",
};

export function StatusPill({
  label,
  tone,
  className,
}: {
  label: string;
  tone: CheckInStatus | "streak";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        styles[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
