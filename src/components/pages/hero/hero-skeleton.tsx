import { StatCardGrid } from "#/components/shared/stat-card";
import { StatCardSkeleton } from "#/components/shared/stat-card-skeleton";
import { Skeleton } from "#/components/ui/skeleton";

const HERO_SKELETON_ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * HeroSkeleton: State memuat (loading skeleton) untuk halaman Heroes sesuai Figma 147:16737.
 */
export function HeroSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Baris Stat Cards Skeleton */}
      <StatCardGrid>
        {[1, 2, 3].map((i, index) => (
          <StatCardSkeleton
            key={i}
            styleVariant={index === 0 ? "brand" : "default"}
          />
        ))}
      </StatCardGrid>

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
        {/* Header Tabel: Nama Hero, Sektor / Beneficiary, Status, Jumlah Aksi, Aksi */}
        <div className="bg-neutral-100 border-b border-neutral-200 px-4 h-11 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-[200px]">
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
          <div className="w-[300px] min-w-[200px] hidden sm:block shrink-0">
            <Skeleton className="h-3.5 w-36 rounded" />
          </div>
          <div className="w-[130px] hidden md:block shrink-0">
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          <div className="w-[130px] hidden md:block shrink-0">
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
          <div className="w-[120px] md:w-[224px] flex justify-end shrink-0">
            <Skeleton className="h-3.5 w-14 rounded" />
          </div>
        </div>

        {/* 10 Baris Skeleton */}
        <div className="divide-y divide-neutral-200">
          {HERO_SKELETON_ROWS.map((row) => (
            <div
              key={row}
              className="px-4 h-16 flex items-center justify-between gap-4"
            >
              {/* Kolom 1: Avatar, Nama Hero, dan Kontak WhatsApp */}
              <div className="flex flex-1 min-w-[200px] items-center gap-3">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                  <Skeleton className="h-3.5 w-36 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              </div>

              {/* Kolom 2: Sektor dan Beneficiary */}
              <div className="w-[300px] min-w-[200px] hidden sm:flex flex-col gap-1.5 shrink-0">
                <Skeleton className="h-3.5 w-36 rounded" />
                <Skeleton className="h-3 w-44 rounded" />
              </div>

              {/* Kolom 3: Status Badge */}
              <div className="w-[130px] hidden md:flex items-center shrink-0">
                <Skeleton className="h-[22px] w-20 rounded-full" />
              </div>

              {/* Kolom 4: Jumlah Aksi */}
              <div className="w-[130px] hidden md:flex items-center shrink-0">
                <Skeleton className="h-3.5 w-16 rounded" />
              </div>

              {/* Kolom 5: Tombol Aksi Rinci (Detail + Edit + Hapus) */}
              <div className="w-[120px] md:w-[224px] flex items-center justify-end gap-2 shrink-0">
                <Skeleton className="h-9 w-[82px] rounded-full shrink-0" />
                <Skeleton className="size-9 rounded-full shrink-0" />
                <Skeleton className="size-9 rounded-full shrink-0 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tabel: Rentang Data & Kontrol Paginasi */}
        <div className="border-t border-neutral-200 px-5 py-4 flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-9 w-56 rounded-md hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
