import { Skeleton } from "#/components/ui/skeleton";

/**
 * VolunteerPageSkeleton: Tampilan kerangka pemuatan (loading state) halaman Volunteer.
 */
export function VolunteerPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Skeleton 3 StatCard */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-surface border border-neutral-200 rounded-lg p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-9 rounded-sm" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      {/* Skeleton Toolbar */}
      <div className="bg-surface border border-neutral-200 rounded-lg p-5 flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-[42px] w-full sm:w-[220px] rounded-sm" />
        <Skeleton className="h-[42px] flex-1 rounded-sm" />
        <Skeleton className="h-[42px] w-full sm:w-[190px] rounded-full" />
      </div>

      {/* Skeleton Tabel */}
      <div className="bg-surface border border-neutral-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-neutral-200 p-4 flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 py-2"
            >
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-4 w-44 hidden md:block" />
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
