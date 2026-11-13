import { StatCardSkeleton } from "#/components/shared/stat-card-skeleton";
import { Skeleton } from "#/components/ui/skeleton";

const VOLUNTEER_SKELETON_STATS = [1, 2, 3];
const VOLUNTEER_SKELETON_ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * VolunteerPageSkeleton: State memuat halaman Volunteer sesuai struktur Figma 149:19230
 * (3 kartu statistik, toolbar filter divisi + pencarian + tombol tambah, tabel 4 kolom, paginasi).
 */
export function VolunteerPageSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Baris Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {VOLUNTEER_SKELETON_STATS.map((item) => (
          <StatCardSkeleton key={item} />
        ))}
      </div>

      {/* Toolbar Skeleton: Dropdown Divisi, Pencarian, Tombol Tambah */}
      <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-xs w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
          <Skeleton className="h-[42px] w-full sm:w-[220px] rounded-sm shrink-0" />
          <Skeleton className="h-[42px] flex-1 rounded-sm min-w-[180px]" />
          <Skeleton className="h-11 w-full sm:w-[190px] rounded-full shrink-0" />
        </div>
      </div>

      {/* Table Card Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-lg flex flex-col shadow-xs overflow-hidden w-full">
        {/* Header Tabel: Nama & Kontak, Email, Divisi & Role, Aksi */}
        <div className="bg-neutral-100 border-b border-neutral-200 px-4 h-11 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-3.5 w-28 rounded" />
          </div>
          <div className="w-[280px] hidden md:block shrink-0">
            <Skeleton className="h-3.5 w-14 rounded" />
          </div>
          <div className="w-[230px] hidden sm:block shrink-0">
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
          <div className="w-[150px] flex justify-end shrink-0">
            <Skeleton className="h-3.5 w-10 rounded" />
          </div>
        </div>

        {/* 10 Baris Skeleton */}
        <div className="divide-y divide-neutral-100">
          {VOLUNTEER_SKELETON_ROWS.map((row) => (
            <div
              key={row}
              className="px-4 h-16 flex items-center justify-between gap-4"
            >
              {/* Foto Profil, Nama, dan Nomor WhatsApp */}
              <div className="flex flex-1 min-w-0 items-center gap-3">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                  <Skeleton className="h-3.5 w-36 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              </div>

              {/* Email */}
              <div className="w-[280px] hidden md:block shrink-0">
                <Skeleton className="h-3.5 w-48 rounded" />
              </div>

              {/* Badge Divisi & Role */}
              <div className="w-[230px] hidden sm:flex items-center gap-1.5 shrink-0">
                <Skeleton className="h-[22px] w-24 rounded-full" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>

              {/* Tombol Detail & Hapus */}
              <div className="w-[150px] flex items-center justify-end gap-2 shrink-0">
                <Skeleton className="h-9 w-[84px] rounded-full" />
                <Skeleton className="size-9 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tabel: Rentang Data & Paginasi */}
        <div className="border-t border-neutral-100 px-5 py-4 flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-52 rounded" />
          <Skeleton className="h-9 w-56 rounded-md hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
