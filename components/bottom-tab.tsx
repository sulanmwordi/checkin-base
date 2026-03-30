"use client";

import Link from "next/link";
import { Activity, CalendarRange, House, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Today", icon: House },
  { href: "/history", label: "History", icon: CalendarRange },
  { href: "/status", label: "Status", icon: Activity },
  { href: "/me", label: "Me", icon: UserRound },
];

export function BottomTab() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-[398px] -translate-x-1/2 rounded-full bg-slate-950/92 px-2 py-2 text-white shadow-soft backdrop-blur">
      <ul className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold transition",
                  active ? "bg-white text-slate-950" : "text-slate-400",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
