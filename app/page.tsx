import { BottomTab } from "@/components/bottom-tab";
import { TodayHero } from "@/components/today-hero";

export default function TodayPage() {
  return (
    <>
      <main className="page-wrap">
        <TodayHero />
      </main>
      <BottomTab />
    </>
  );
}
