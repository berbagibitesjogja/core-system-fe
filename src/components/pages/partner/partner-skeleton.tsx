import { Skeleton } from "#/components/ui/skeleton";

const PARTNER_SKELETON_ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PARTNER_SKELETON_CHIPS = [1, 2, 3];

/**
 * PartnerSkeleton: State memuat (loading skeleton) untuk halaman Partner.
 */
export function PartnerSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Baris Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-5 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
            <div className="space-y-2 pt-1">
              <Skeleton className="h-9 w-28 rounded-sm" />
              <Skeleton className="h-3.5 w-44 rounded-sm" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-xs w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {PARTNER_SKELETON_CHIPS.map((chip) => (
              <Skeleton key={chip} className="h-9 w-28 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-11 flex-1 rounded-md min-w-[180px]" />
          <Skeleton className="h-11 w-full sm:w-44 rounded-full shrink-0" />
        </div>
      </div>

      {/* Table Card Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-lg flex flex-col shadow-xs overflow-hidden w-full">
        {/* Header Tabel */}
        <div className="bg-[#eef1f2] border-b border-neutral-200 px-4 h-11 flex items-center justify-between gap-4">
          <Skeleton className="h-3.5 w-6 rounded" />
          <Skeleton className="h-3.5 w-24 rounded flex-1 max-w-[160px]" />
          <Skeleton className="h-3.5 w-24 rounded hidden sm:block" />
          <Skeleton className="h-3.5 w-16 rounded hidden md:block" />
          <Skeleton className="h-3.5 w-24 rounded hidden md:block" />
          <Skeleton className="h-3.5 w-16 rounded" />
        </div>

        {/* 10 Baris Skeleton */}
        <div className="divide-y divide-neutral-200">
          {PARTNER_SKELETON_ROWS.map((row) => (
            <div
              key={row}
              className="px-4 h-16 flex items-center justify-between gap-4"
            >
              <Skeleton className="h-3 w-4 rounded shrink-0" />
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Skeleton className="size-8 rounded-sm shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <Skeleton className="h-3.5 w-40 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>
              <div className="w-[190px] hidden sm:flex items-center gap-3 shrink-0">
                <Skeleton className="h-3 w-14 rounded" />
                <Skeleton className="h-1.5 flex-1 rounded-full" />
              </div>
              <div className="w-[110px] hidden md:block shrink-0">
                <Skeleton className="h-3 w-14 rounded" />
              </div>
              <div className="w-[140px] hidden md:block shrink-0">
                <Skeleton className="h-3 w-20 rounded" />
              </div>
              <div className="w-[120px] md:w-[224px] flex justify-end gap-2 shrink-0">
                <Skeleton className="h-9 w-20 rounded-full" />
                <Skeleton className="size-9 rounded-full hidden sm:block" />
                <Skeleton className="size-9 rounded-full hidden sm:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tabel */}
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <span className="font-['Josefin_Sans'] text-[14px] leading-[20px] text-[#4d585b]">
            Memuat data donatur…
          </span>
          <Skeleton className="h-9 w-56 rounded-sm hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
