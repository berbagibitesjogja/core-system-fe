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
                <Skeleton className="size-8 rounded-sm" />
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

/**
 * DonationFormSkeleton: State memuat (loading skeleton) untuk formulir Tambah/Edit Donasi.
 * Menampilkan placeholder shimmer untuk struktur form bertahap dan kartu tips.
 */
export function DonationFormSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-pulse">
      {/* Kolom Kiri: Formulir Card Skeleton */}
      <div className="flex-1 min-w-0 w-full bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs divide-y divide-neutral-200">
        {/* Seksi 1: Informasi Donasi */}
        <div className="p-6 sm:p-7 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start pt-1">
            {/* Field: Sponsor */}
            <div className="sm:col-span-8 flex flex-col gap-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Field: Kuota */}
            <div className="sm:col-span-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>

          {/* Row 2: Tanggal, Waktu, Durasi */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
            <div className="sm:col-span-5 flex flex-col gap-2">
              <Skeleton className="h-4 w-36 rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            <div className="sm:col-span-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-36 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-11 flex-1 rounded-md" />
                <span className="font-heading text-lg font-bold text-neutral-300 select-none">
                  :
                </span>
                <Skeleton className="h-11 flex-1 rounded-md" />
              </div>
            </div>

            <div className="sm:col-span-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>

          {/* Row 3: Lokasi & Link Maps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Seksi 2: Penerima & Catatan */}
        <div className="p-6 sm:p-7 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-44 rounded-md" />
            <Skeleton className="h-4 w-80 rounded-md" />
          </div>

          {/* Field: Beneficiaries */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-48 rounded-md" />
            <Skeleton className="h-[46px] w-full rounded-md" />
            <Skeleton className="h-3 w-56 rounded-md" />
          </div>

          {/* Field: Pesan Khusus */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-3 w-64 rounded-md" />
          </div>

          {/* Options: Switches */}
          <div className="flex flex-col gap-3 pt-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-4 rounded-md border border-neutral-200 flex items-center justify-between gap-4 bg-white"
              >
                <div className="flex flex-col gap-1.5 flex-1">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-60 rounded-md" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Aksi */}
        <div className="p-6 bg-neutral-100/40 flex items-center justify-end gap-3 rounded-b-2xl">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>

      {/* Kolom Kanan: Tips Card Skeleton */}
      <div className="bg-bondi-50/70 border border-bondi-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0">
        <Skeleton className="h-[204px] w-full rounded-xl bg-bondi-100/70" />
        <Skeleton className="h-6 w-44 rounded-md bg-bondi-200/50" />
        <div className="space-y-3 pt-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-2.5">
              <Skeleton className="size-4.5 rounded-full shrink-0 bg-bondi-200/70 mt-0.5" />
              <Skeleton className="h-4 flex-1 rounded-md bg-bondi-200/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
