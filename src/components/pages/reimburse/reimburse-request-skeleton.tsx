import { Skeleton } from "#/components/ui/skeleton";

const HISTORY_SKELETON_ITEMS = [
  { id: 1, hasTransferProof: true },
  { id: 2, hasTransferProof: false },
  { id: 3, hasTransferProof: true },
] as const;

// Placeholder satu field input (label, kolom isian, teks bantu)
function FieldSkeleton({
  labelWidth,
  helperWidth,
}: {
  labelWidth: string;
  helperWidth?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Skeleton className={`h-4 ${labelWidth} rounded-md`} />
      <Skeleton className="h-11 w-full rounded-md" />
      {helperWidth && <Skeleton className={`h-3 ${helperWidth} rounded-md`} />}
    </div>
  );
}

/**
 * ReimburseRequestSkeleton: State memuat halaman Ajukan Reimburse
 * (kartu form dengan header teal, banner AI, field, upload invoice, tombol kirim + panel riwayat).
 */
export function ReimburseRequestSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Kolom Kiri: Form Card Skeleton */}
      <div className="flex-1 min-w-0 w-full rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-xs">
        {/* Header Teal */}
        <div className="bg-brand px-6 py-6 flex flex-col gap-1.5">
          <Skeleton className="h-6 w-44 rounded-md bg-white/35" />
          <Skeleton className="h-3.5 w-72 max-w-full rounded-md bg-white/25" />
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Banner Informasi AI */}
          <div className="bg-bondi-50 rounded-md px-4 py-3 flex items-start gap-3">
            <Skeleton className="size-5 shrink-0 rounded-full bg-bondi-200/70" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-60 max-w-full rounded-md bg-bondi-200/60" />
              <Skeleton className="h-3 w-full rounded-md bg-bondi-200/40" />
              <Skeleton className="h-3 w-2/3 rounded-md bg-bondi-200/40" />
            </div>
          </div>

          {/* Baris Metode & Nomor Tujuan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <FieldSkeleton labelWidth="w-32" helperWidth="w-44" />
            <FieldSkeleton labelWidth="w-28" helperWidth="w-40" />
          </div>

          {/* Catatan Keperluan */}
          <FieldSkeleton labelWidth="w-36" helperWidth="w-64" />

          {/* Upload Invoice */}
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="h-4 w-28 rounded-md" />
            <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-300 px-6 py-8">
              <Skeleton className="size-11 rounded-full" />
              <Skeleton className="h-4 w-52 max-w-full rounded-md" />
              <Skeleton className="h-3 w-64 max-w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Footer Tombol Submit */}
        <div className="px-6 pb-6">
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </div>

      {/* Kolom Kanan: Riwayat Pengajuan */}
      <div className="w-full xl:w-[440px] shrink-0 rounded-lg border border-neutral-200 bg-white p-6 flex flex-col gap-4 shadow-xs">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-3 w-56 rounded-md" />
        </div>

        <div className="flex flex-col gap-3 w-full">
          {HISTORY_SKELETON_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-neutral-200 p-4 flex flex-col gap-2"
            >
              {/* Metode, Nomor Tujuan, Tanggal, dan Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-40 rounded-md" />
                </div>
                <Skeleton className="h-[22px] w-16 rounded-full" />
              </div>

              {/* Nominal */}
              <Skeleton className="h-6 w-32 rounded-md" />

              {/* Catatan */}
              <Skeleton className="h-3 w-full rounded-md" />

              {/* Tautan Invoice & Bukti Transfer */}
              <div className="flex flex-col items-start gap-1.5">
                <Skeleton className="h-3.5 w-16 rounded-md" />
                {item.hasTransferProof && (
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
