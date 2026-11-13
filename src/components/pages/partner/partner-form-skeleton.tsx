import { Skeleton } from "#/components/ui/skeleton";

/**
 * PartnerFormSkeleton: Kerangka loading untuk halaman form Edit Donatur.
 */
export function PartnerFormSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-pulse">
      {/* Kolom Kiri: Skeleton Kartu Formulir Donatur */}
      <div className="flex-1 min-w-0 w-full bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col">
        {/* Seksi 1: Identitas Donatur */}
        <div className="p-6 border-b border-neutral-200 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>

          {/* Field: Pilih Jenis */}
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-24 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-xl border border-neutral-200 flex flex-col gap-3 bg-white"
                >
                  <div className="flex items-center justify-between w-full">
                    <Skeleton className="size-10 rounded-lg" />
                    <Skeleton className="size-5 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-28 rounded-md" />
                  <Skeleton className="h-4 w-48 rounded-md" />
                </div>
              ))}
            </div>
            <Skeleton className="h-4 w-56 rounded-md" />
          </div>

          {/* Field: Nama Donatur */}
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-4 w-64 rounded-md" />
          </div>

          {/* Field: Logo Donatur */}
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="h-5 w-44 rounded-md" />
            <Skeleton className="h-36 w-full rounded-xl" />
          </div>
        </div>

        {/* Seksi 2: Kontak */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-4 w-64 rounded-md" />
          </div>

          {/* Field: Alamat */}
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>

          {/* Field: Email & Nomor Telepon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col gap-1.5 w-full">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Form */}
        <div className="p-6 bg-neutral-100 border-t border-neutral-200 flex items-center justify-end gap-3">
          <Skeleton className="h-11 w-20 rounded-full" />
          <Skeleton className="h-11 w-40 rounded-full" />
        </div>
      </div>

      {/* Kolom Kanan: Skeleton Panel Tips */}
      <div className="bg-bondi-50/70 border border-bondi-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0">
        <Skeleton className="h-[204px] w-full rounded-2xl bg-bondi-100/70" />
        <Skeleton className="h-6 w-48 rounded-md bg-bondi-200/50" />
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <Skeleton className="size-4.5 rounded-full shrink-0 bg-bondi-200/70 mt-0.5" />
              <Skeleton className="h-8 flex-1 rounded-md bg-bondi-200/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
