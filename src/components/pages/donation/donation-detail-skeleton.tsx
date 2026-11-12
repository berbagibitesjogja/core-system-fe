import { Skeleton } from "#/components/ui/skeleton";

const HERO_SKELETON_ROWS = [1, 2, 3, 4, 5, 6];
const SURPLUS_SKELETON_ROWS = [1, 2, 3];

/**
 * DonationDetailSkeleton: State memuat (loading skeleton) untuk halaman Detail Donasi.
 */
export function DonationDetailSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Action Bar Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>

      {/* Grid Utama 2 Kolom */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Kolom Kiri */}
        <div className="space-y-6">
          {/* Kartu Daftar Heroes */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-36 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-9 w-36 rounded-full" />
            </div>

            <div className="divide-y divide-neutral-100">
              {HERO_SKELETON_ROWS.map((row) => (
                <div
                  key={row}
                  className="px-5 py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                  <Skeleton className="h-4 w-24 rounded hidden md:block" />
                  <Skeleton className="h-4 w-36 rounded hidden md:block" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-8 w-28 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Kartu Daftar Surplus Food */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-44 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
              <Skeleton className="h-9 w-36 rounded-full" />
            </div>

            <div className="divide-y divide-neutral-100">
              {SURPLUS_SKELETON_ROWS.map((row) => (
                <div
                  key={row}
                  className="px-5 py-4 flex items-center justify-between gap-4"
                >
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-14 rounded hidden md:block" />
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-40 rounded hidden md:block" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="size-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs space-y-5">
            <Skeleton className="h-6 w-36 rounded-md" />
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
            <div className="border-t border-neutral-100 pt-4 space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-7 w-20 rounded" />
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs space-y-4">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
