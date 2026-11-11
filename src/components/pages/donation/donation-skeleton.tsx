import { Skeleton } from "#/components/ui/skeleton";

/**
 * DonationSkeleton: State memuat (loading skeleton) untuk halaman Donasi.
 * Menampilkan placeholder shimmer untuk kartu statistik, toolbar filter, dan baris tabel.
 */
export function DonationSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* 1. Baris Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
            <div className="space-y-2 pt-1">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-3.5 w-44 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Toolbar Filter & Search Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4 shadow-xs w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-[38px] w-28 rounded-full" />
            <Skeleton className="h-[38px] w-36 rounded-full" />
            <Skeleton className="h-[38px] w-24 rounded-full" />
          </div>
          <Skeleton className="h-11 w-36 rounded-full" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <Skeleton className="h-11 flex-1 rounded-xl" />
          <Skeleton className="h-11 w-full md:w-[200px] rounded-xl" />
          <Skeleton className="hidden md:block size-2 rounded-full" />
          <Skeleton className="h-11 w-full md:w-[200px] rounded-xl" />
        </div>
      </div>

      {/* 3. Table Card Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs overflow-hidden w-full">
        {/* Header */}
        <div className="bg-neutral-50 border-b border-neutral-200 px-4 h-11 flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-36 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* Rows */}
        <div className="divide-y divide-neutral-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="px-4 h-16 flex items-center justify-between gap-4"
            >
              <div className="w-[200px] space-y-1.5">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="flex-1 flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>
              <div className="w-[120px]">
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="w-[120px]">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="w-[120px] flex justify-end gap-1.5">
                <Skeleton className="size-9 rounded-full" />
                <Skeleton className="size-9 rounded-full" />
                <Skeleton className="size-9 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 px-5 py-4 flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-9 w-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
