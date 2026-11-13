import { Skeleton } from "#/components/ui/skeleton";

const historySkeletonSlots = [1, 2, 3, 4];

/**
 * ReimburseRequestSkeleton: Skeleton layout 2 kolom saat memuat halaman Ajukan Reimburse.
 */
export function ReimburseRequestSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Kolom Kiri: Form Card Skeleton */}
      <div className="flex-1 min-w-0 w-full rounded-lg border border-neutral-200 bg-surface overflow-hidden shadow-xs">
        <div className="bg-brand/15 px-6 py-6 space-y-2">
          <Skeleton className="h-6 w-44 rounded-md" />
          <Skeleton className="h-3.5 w-72 rounded-md" />
        </div>
        <div className="p-6 space-y-5">
          <Skeleton className="h-16 w-full rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-44 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </div>

      {/* Kolom Kanan: History Card Skeleton */}
      <div className="w-full xl:w-[440px] shrink-0 rounded-lg border border-neutral-200 bg-surface p-6 space-y-4 shadow-xs">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-3.5 w-56 rounded-md" />
        </div>
        <div className="space-y-3">
          {historySkeletonSlots.map((slot) => (
            <div
              key={slot}
              className="rounded-md border border-neutral-200 p-4 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3.5 w-40 rounded-md" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
