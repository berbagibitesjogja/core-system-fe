import { Skeleton } from "#/components/ui/skeleton";
import dashboardTrailSvg from "#/assets/illustrations/dashboard-trail.svg";
import dashboardCharitySvg from "#/assets/illustrations/dashboard-charity.svg";

export interface DashboardSkeletonProps {
  isSuperAdmin?: boolean;
}

/**
 * DashboardSkeleton: State memuat (loading) penuh halaman Admin Dashboard BBJ sesuai desain Figma 114:835.
 */
export function DashboardSkeleton({
  isSuperAdmin = true,
}: DashboardSkeletonProps) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Welcome Banner Skeleton */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-bondi-50 p-6 md:p-8 min-h-[188px] flex items-center justify-between border border-bondi-100">
        <div className="space-y-3 z-10 max-w-md">
          <Skeleton className="h-8 w-48 rounded-lg bg-bondi-200/60" />
          <Skeleton className="h-4 w-72 rounded-md bg-bondi-200/40" />
          <Skeleton className="h-4 w-60 rounded-md bg-bondi-200/40" />
        </div>

        {/* Trail & Charity Background Ornaments */}
        <div
          aria-hidden="true"
          className="absolute -right-6 -top-6 w-[480px] h-[190px] pointer-events-none opacity-40"
        >
          <img
            src={dashboardTrailSvg}
            alt=""
            className="size-full object-contain"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute right-4 -top-2 size-56 pointer-events-none opacity-40"
        >
          <img
            src={dashboardCharitySvg}
            alt=""
            className="size-full object-contain"
          />
        </div>
      </div>

      {/* 2. Dampak Kami Stat Cards Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="size-10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-3.5 w-32 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-36 rounded-md" />
                <Skeleton className="h-3.5 w-48 rounded-md" />
              </div>
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-20 rounded-lg" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* 4. Bottom Row Skeleton (Aksi Cepat Penuh untuk Staff/Core atau Berdampingan untuk Super Admin) */}
      {isSuperAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Aktivitas Terbaru Skeleton */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 shadow-xs lg:col-span-2">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-36 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <Skeleton className="size-8 rounded-full shrink-0" />
                  <Skeleton className="h-4 flex-1 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Aksi Cepat Skeleton Vertical */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 shadow-xs">
            <Skeleton className="h-5 w-28 rounded-md mb-2" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-md border border-neutral-200"
                >
                  <Skeleton className="size-10 rounded-md shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Aksi Cepat Skeleton Horizontal (Figma 114:643 saat Aktivitas Terbaru Disembunyikan) */
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 shadow-xs w-full">
          <Skeleton className="h-5 w-28 rounded-md mb-2" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-md border border-neutral-200"
              >
                <Skeleton className="size-10 rounded-md shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
