import { StatCardGrid } from "#/components/shared/stat-card";
import { StatCardSkeleton } from "#/components/shared/stat-card-skeleton";
import { Skeleton } from "#/components/ui/skeleton";

const donationRowSlots = [1, 2, 3, 4, 5, 6];
const contactRowSlots = [1, 2, 3];

/**
 * PartnerDetailSkeleton: State memuat (loading skeleton) halaman detail partner / donatur.
 */
export function PartnerDetailSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Action Bar Skeleton */}
      <div className="flex items-center justify-between gap-4 w-full">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-11 w-36 rounded-full" />
      </div>

      {/* Stat Cards Skeleton */}
      <StatCardGrid>
        {[1, 2, 3].map((slot, index) => (
          <StatCardSkeleton
            key={slot}
            styleVariant={index === 0 ? "brand" : "default"}
          />
        ))}
      </StatCardGrid>

      {/* Dua Kolom Konten Skeleton */}
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        {/* Kolom Kiri: Tabel Riwayat Donasi */}
        <div className="flex-1 min-w-0 w-full rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <Skeleton className="h-6 w-52 rounded-md" />
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

        {/* Kolom Kanan: Kartu Profil Donatur */}
        <div className="w-full xl:w-[380px] shrink-0 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col gap-4">
          <Skeleton className="h-6 w-32 rounded-md" />

          <div className="flex items-center gap-3">
            <Skeleton className="size-16 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-3.5 w-28 rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {contactRowSlots.map((slot) => (
              <div key={slot} className="flex items-start gap-3">
                <Skeleton className="size-9 rounded-xl shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-4 w-48 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
