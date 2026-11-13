import { Skeleton } from "#/components/ui/skeleton";

const donationRowSlots = [1, 2, 3, 4, 5, 6];
const sectorRowSlots = [1, 2, 3, 4, 5, 6];

/**
 * BeneficiaryDetailSkeleton: State memuat (loading skeleton) halaman detail penerima manfaat.
 */
export function BeneficiaryDetailSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Action Bar Skeleton */}
      <div className="flex items-center justify-between gap-4 w-full">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-11 w-32 rounded-full" />
      </div>

      {/* Stat Cards Skeleton */}
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

      {/* Dua Kolom Tabel Skeleton */}
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        {/* Kolom Kiri: Tabel Donasi */}
        <div className="flex-1 min-w-0 w-full rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <Skeleton className="h-6 w-56 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="divide-y divide-neutral-100">
            {donationRowSlots.map((slot) => (
              <div
                key={slot}
                className="px-4 h-16 flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 w-32">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-3 w-14 rounded" />
                </div>
                <Skeleton className="h-4 w-16 rounded" />
                <div className="hidden sm:flex items-center gap-3">
                  <Skeleton className="size-8 rounded-sm shrink-0" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
                <Skeleton className="h-4 w-12 rounded hidden sm:block" />
                <Skeleton className="size-9 rounded-full" />
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-neutral-100 flex items-center justify-between">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-9 w-48 rounded-md" />
          </div>
        </div>

        {/* Kolom Kanan: Tabel Sektor */}
        <div className="w-full xl:w-[400px] shrink-0 rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="h-9 w-36 rounded-full" />
          </div>
          <div className="divide-y divide-neutral-100">
            {sectorRowSlots.map((slot) => (
              <div
                key={slot}
                className="px-4 h-16 flex items-center justify-between gap-3"
              >
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="size-9 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
