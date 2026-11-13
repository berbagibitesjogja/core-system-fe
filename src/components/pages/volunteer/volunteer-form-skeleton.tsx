import { Skeleton } from "#/components/ui/skeleton";

/**
 * VolunteerFormSkeleton: Kerangka loading skeleton untuk halaman Form Volunteer (Tambah & Edit).
 */
export function VolunteerFormSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-pulse">
      {/* Kolom Kiri: Skeleton Formulir */}
      <div className="flex-1 min-w-0 w-full bg-surface border border-neutral-200 rounded-2xl overflow-hidden flex flex-col shadow-xs">
        {/* Seksi 1: Penempatan */}
        <div className="p-6 border-b border-neutral-200 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-36 rounded-md" />
            <Skeleton className="h-4 w-80 rounded-md" />
          </div>

          {/* Field: Pilih Divisi */}
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* Field: Pilih Role (2x2 Grid) */}
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-20 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-xl border border-neutral-200 flex flex-col gap-3 bg-surface"
                >
                  <div className="flex items-center justify-between w-full">
                    <Skeleton className="size-10 rounded-lg" />
                    <Skeleton className="size-5 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-4 w-44 rounded-md" />
                </div>
              ))}
            </div>
            <Skeleton className="h-4 w-60 rounded-md" />
          </div>
        </div>

        {/* Seksi 2: Identitas & Kontak */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>

          {/* Field: Nama Lengkap */}
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="h-5 w-28 rounded-md" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* Field: Email & WA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col gap-1.5 w-full">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-4 w-52 rounded-md" />
              </div>
            ))}
          </div>

          {/* Field: Alamat Domisili */}
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>

        {/* Footer Form */}
        <div className="p-6 border-t border-neutral-200 bg-surface flex items-center justify-end gap-3">
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Kolom Kanan: Skeleton Panel Tips */}
      <aside className="w-full lg:w-[320px] shrink-0 bg-surface border border-neutral-200 rounded-2xl p-6 flex flex-col gap-6 shadow-xs">
        <div className="flex flex-col items-center text-center gap-4">
          <Skeleton className="size-28 rounded-2xl" />
          <Skeleton className="h-6 w-48 rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Skeleton className="size-2 rounded-full mt-1.5 shrink-0" />
              <div className="flex flex-col gap-1.5 w-full">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-4/5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
