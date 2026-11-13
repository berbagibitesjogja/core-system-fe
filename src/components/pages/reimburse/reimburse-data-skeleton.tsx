import { StatCardSkeleton } from "#/components/shared/stat-card-skeleton";
import { Skeleton } from "#/components/ui/skeleton";

const STAT_PLACEHOLDERS = [1, 2, 3] as const;
const FILTER_PLACEHOLDERS = [
  { id: 1, width: "w-24" },
  { id: 2, width: "w-28" },
  { id: 3, width: "w-28" },
] as const;
const ROW_PLACEHOLDERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/**
 * ReimburseDataSkeleton: State memuat halaman Manajemen Data Reimburse
 * (3 kartu statistik, filter chip + pencarian, tabel 6 kolom, paginasi).
 */
export function ReimburseDataSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Baris Stat Cards Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STAT_PLACEHOLDERS.map((item) => (
          <StatCardSkeleton key={item} />
        ))}
      </div>

      {/* Toolbar: Filter Chip Status & Kolom Pencarian */}
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {FILTER_PLACEHOLDERS.map((item) => (
            <Skeleton
              key={item.id}
              className={`h-9 ${item.width} rounded-full`}
            />
          ))}
        </div>
        <Skeleton className="h-11 w-full flex-1 rounded-md" />
      </div>

      {/* Table Card Skeleton */}
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
        {/* Header Tabel: Pemohon, Catatan, Jumlah, Bukti, Status, Aksi */}
        <div className="flex h-11 items-center gap-4 border-b border-neutral-200 bg-neutral-100 px-4">
          <div className="min-w-[230px] flex-1">
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
          <div className="hidden w-[340px] shrink-0 lg:block">
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          <div className="hidden w-[120px] shrink-0 md:block">
            <Skeleton className="h-3.5 w-14 rounded" />
          </div>
          <div className="hidden w-[150px] shrink-0 md:block">
            <Skeleton className="h-3.5 w-12 rounded" />
          </div>
          <div className="hidden w-[110px] shrink-0 sm:block">
            <Skeleton className="h-3.5 w-12 rounded" />
          </div>
          <div className="flex w-[150px] shrink-0 justify-end">
            <Skeleton className="h-3.5 w-10 rounded" />
          </div>
        </div>

        {/* Baris Tabel */}
        <div className="divide-y divide-neutral-100">
          {ROW_PLACEHOLDERS.map((row) => (
            <div key={row} className="flex h-18 items-center gap-4 px-4">
              {/* Pemohon: Foto Profil & Nama */}
              <div className="flex min-w-[230px] flex-1 items-center gap-3">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-32 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>

              {/* Catatan */}
              <div className="hidden w-[340px] shrink-0 flex-col gap-1.5 lg:flex">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-2/3 rounded" />
              </div>

              {/* Jumlah */}
              <div className="hidden w-[120px] shrink-0 md:block">
                <Skeleton className="h-3.5 w-20 rounded" />
              </div>

              {/* Bukti: Tautan Invoice & Bukti Transfer */}
              <div className="hidden w-[150px] shrink-0 flex-col gap-1.5 md:flex">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>

              {/* Status */}
              <div className="hidden w-[110px] shrink-0 sm:block">
                <Skeleton className="h-[22px] w-[72px] rounded-full" />
              </div>

              {/* Aksi: Tombol Tandai Lunas & Batalkan */}
              <div className="flex w-[150px] shrink-0 items-center justify-end gap-2">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="size-9 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tabel: Rentang Data & Paginasi */}
        <div className="flex items-center justify-between gap-4 border-t border-neutral-100 px-5 py-4">
          <Skeleton className="h-4 w-52 rounded" />
          <Skeleton className="hidden h-9 w-56 rounded-md sm:block" />
        </div>
      </div>
    </div>
  );
}
