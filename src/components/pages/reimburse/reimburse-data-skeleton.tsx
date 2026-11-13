import { Skeleton } from "#/components/ui/skeleton";

const STAT_PLACEHOLDERS = [1, 2, 3] as const;
const FILTER_PLACEHOLDERS = [1, 2, 3] as const;
const ROW_PLACEHOLDERS = [1, 2, 3, 4, 5] as const;

// Skeleton loading untuk halaman Manajemen Data Reimburse
export function ReimburseDataSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STAT_PLACEHOLDERS.map((item) => (
          <Skeleton key={item} className="h-[140px] rounded-3xl" />
        ))}
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex shrink-0 flex-wrap gap-2">
          {FILTER_PLACEHOLDERS.map((item) => (
            <Skeleton key={item} className="h-9 w-36 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-11 w-full flex-1 rounded-xl" />
      </div>

      <div className="space-y-3 rounded-2xl border border-neutral-200 bg-surface p-4">
        {ROW_PLACEHOLDERS.map((row) => (
          <Skeleton key={row} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
