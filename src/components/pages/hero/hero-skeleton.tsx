import { Skeleton } from "#/components/ui/skeleton";

const HERO_SKELETON_ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * HeroSkeleton: State memuat (loading skeleton) untuk halaman Heroes sesuai Figma 147:16737.
 */
export function HeroSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Baris Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
            <div className="space-y-2 pt-1">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-3.5 w-44 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
          <Skeleton className="h-11 w-full lg:w-[240px] rounded-md shrink-0" />
          <Skeleton className="h-11 w-full lg:w-[210px] rounded-md shrink-0" />
          <Skeleton className="h-11 flex-1 rounded-md min-w-[180px]" />
          <Skeleton className="h-11 w-full sm:w-40 rounded-full shrink-0" />
        </div>
      </div>

      {/* Table Card Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs overflow-hidden w-full">
        {/* Header Tabel */}
        <div className="bg-[#eef1f2] border-b border-neutral-200 px-4 h-11 flex items-center justify-between gap-4">
          <Skeleton className="h-3.5 w-24 rounded" />
          <Skeleton className="h-3.5 w-36 rounded hidden sm:block" />
          <Skeleton className="h-3.5 w-16 rounded hidden md:block" />
          <Skeleton className="h-3.5 w-20 rounded hidden md:block" />
          <Skeleton className="h-3.5 w-14 rounded" />
        </div>

        {/* 10 Baris Skeleton */}
        <div className="divide-y divide-neutral-200">
          {HERO_SKELETON_ROWS.map((row) => (
            <div
              key={row}
              className="px-4 h-16 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <Skeleton className="h-3 w-40 rounded" />
              </div>
              <div className="w-[300px] hidden sm:block shrink-0">
                <Skeleton className="h-3 w-44 rounded" />
              </div>
              <div className="w-[130px] hidden md:block shrink-0">
                <Skeleton className="h-[22px] w-16 rounded-full" />
              </div>
              <div className="w-[130px] hidden md:block shrink-0">
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="w-[120px] md:w-[224px] flex justify-end shrink-0">
                <Skeleton className="h-3 w-28 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tabel */}
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <span className="font-['Josefin_Sans'] text-[14px] leading-[20px] text-[#4d585b]">
            Memuat data hero…
          </span>
          <Skeleton className="h-9 w-56 rounded-md hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
