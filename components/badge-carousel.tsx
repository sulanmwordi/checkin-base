export function BadgeCarousel({
  badges,
}: {
  badges: { title: string; meta: string; tone: string }[];
}) {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2">
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="min-w-[160px] snap-start rounded-[28px] p-4 text-white shadow-soft"
          style={{ background: badge.tone }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{badge.meta}</p>
          <p className="mt-8 text-xl font-black">{badge.title}</p>
        </div>
      ))}
    </div>
  );
}
