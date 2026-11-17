import { StatCardGrid } from "#/components/shared/stat-card";
import { StatCardSkeleton } from "#/components/shared/stat-card-skeleton";
import { Skeleton } from "#/components/ui/skeleton";

const HERO_DETAIL_SKELETON_ROWS = [1, 2, 3, 4, 5, 6];

/**
 * HeroDetailSkeleton: State memuat (loading skeleton) untuk halaman Detail Hero.
 */
export function HeroDetailSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Action Bar Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-36 rounded" />
        </div>
        <Skeleton className="h-11 w-32 rounded-full" />
      </div>

      {/* Stat Cards Skeleton */}
      <StatCardGrid>
        {[1, 2, 3].map((i, index) => (
          <StatCardSkeleton
            key={i}
            styleVariant={index === 0 ? "brand" : "default"}
          />
        ))}
      </StatCardGrid>

      {/* Tabel Riwayat Skeleton */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden w-full">
        <div className="p-5 flex items-center justify-between border-b border-neutral-100">
          <Skeleton className="h-6 w-56 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        <div className="bg-neutral-100 border-b border-neutral-200 px-4 h-11 flex items-center justify-between gap-4">
          <Skeleton className="h-3.5 w-20 rounded" />
          <Skeleton className="h-3.5 w-28 rounded hidden sm:block" />
          <Skeleton className="h-3.5 w-28 rounded hidden md:block" />
          <Skeleton className="h-3.5 w-24 rounded hidden md:block" />
          <Skeleton className="h-3.5 w-20 rounded hidden lg:block" />
          <Skeleton className="h-3.5 w-16 rounded" />
        </div>

        <div className="divide-y divide-neutral-200">
          {HERO_DETAIL_SKELETON_ROWS.map((row) => (
            <div
              key={row}
              className="px-4 h-16 flex items-center justify-between gap-4"
            >
              <div className="w-[180px] space-y-1.5">
                <Skeleton className="h-3.5 w-28 rounded" />
                <Skeleton className="h-3 w-14 rounded" />
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <Skeleton className="size-8 rounded-sm shrink-0" />
                <Skeleton className="h-3.5 w-32 rounded" />
              </div>
              <Skeleton className="h-3.5 w-40 rounded hidden md:block" />
              <Skeleton className="h-3.5 w-24 rounded hidden md:block" />
              <Skeleton className="h-3.5 w-16 rounded hidden lg:block" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="size-9 rounded-full shrink-0" />
            </div>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-neutral-100 flex items-center justify-between">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-9 w-48 rounded-md" />
        </div>
      </div>
    </div>
  );
}
