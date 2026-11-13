import { Skeleton } from "#/components/ui/skeleton";

export interface VolunteerDetailSkeletonProps {
  showActivityTab?: boolean;
  showDangerZone?: boolean;
}

/**
 * VolunteerDetailSkeleton: Kerangka loading skeleton untuk halaman Detail Volunteer.
 */
export function VolunteerDetailSkeleton({
  showActivityTab = true,
  showDangerZone = true,
}: VolunteerDetailSkeletonProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-pulse">
      {/* Kolom Kiri: Skeleton Panel Profil */}
      <aside className="w-full lg:w-[340px] shrink-0 bg-surface border border-neutral-200 rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xs">
        <Skeleton className="size-[90px] rounded-full" />
        <div className="flex flex-col items-center gap-2 w-full">
          <Skeleton className="h-6 w-44 rounded-md" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <div className="w-full h-px bg-neutral-200" />
        <div className="flex flex-col gap-4 w-full">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start gap-3 w-full">
              <Skeleton className="size-[18px] rounded shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 w-full">
                <Skeleton className="h-3.5 w-16 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-11 w-full rounded-full mt-1" />
      </aside>

      {/* Kolom Kanan: Skeleton Tab Panel & Danger Zone */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-6">
        <div className="bg-surface border border-neutral-200 rounded-2xl overflow-hidden shadow-xs">
          {/* Header Tab */}
          <div className="flex items-center gap-2 px-5 border-b border-neutral-200">
            {showActivityTab && (
              <div className="flex items-center gap-2 px-2 py-4">
                <Skeleton className="size-[18px] rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            )}
            <div className="flex items-center gap-2 px-2 py-4">
              <Skeleton className="size-[18px] rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
          </div>

          {/* Konten Tab */}
          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>
          </div>
        </div>

        {/* Zona Bahaya */}
        {showDangerZone && (
          <div className="bg-surface border border-neutral-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-4 w-72 rounded" />
            </div>
            <Skeleton className="h-10 w-44 rounded-full shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
