import { Skeleton } from "#/components/ui/skeleton";

const skeletonCardSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * BeneficiarySkeleton: State memuat (loading skeleton) untuk halaman Beneficiaries.
 */
export function BeneficiarySkeleton() {
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
              <Skeleton className="h-4 w-36 rounded-md" />
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
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Skeleton className="h-[38px] w-24 rounded-full" />
            <Skeleton className="h-[38px] w-28 rounded-full" />
            <Skeleton className="h-[38px] w-24 rounded-full" />
            <Skeleton className="h-[38px] w-36 rounded-full" />
          </div>
          <Skeleton className="h-11 flex-1 min-w-[200px] rounded-md" />
          <Skeleton className="h-11 w-full sm:w-44 rounded-full shrink-0" />
        </div>
      </div>

      {/* Grid Kartu Penerima Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {skeletonCardSlots.map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col gap-5 shadow-2xs"
          >
            <div className="flex items-center gap-3 min-h-[76px]">
              <Skeleton className="size-16 rounded-2xl shrink-0" />
              <div className="flex-1 space-y-2 min-w-0">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-6 rounded shrink-0" />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-12 rounded" />
                <Skeleton className="h-6 w-24 rounded-md" />
              </div>
              <div className="w-px h-10 bg-neutral-200" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-12 rounded" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-1.5 w-full rounded-full" />
              <Skeleton className="h-3.5 w-36 rounded" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-9 flex-1 rounded-full" />
              <Skeleton className="size-9 rounded-full shrink-0" />
              <Skeleton className="size-9 rounded-full shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between w-full">
        <Skeleton className="h-4 w-44 rounded" />
        <Skeleton className="h-11 w-44 rounded-full" />
      </div>
    </div>
  );
}
