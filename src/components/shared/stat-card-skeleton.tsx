import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";

export interface StatCardSkeletonProps {
  className?: string;
}

/**
 * StatCardSkeleton: Placeholder kartu statistik (ikon + judul, angka, subteks)
 * dengan ukuran yang sama seperti skeleton halaman Donasi.
 */
export function StatCardSkeleton({ className }: StatCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white p-5 space-y-4 shadow-xs",
        className,
      )}
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
  );
}
