import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";

export interface StatCardSkeletonProps {
  styleVariant?: "default" | "brand";
  className?: string;
}

/**
 * StatCardSkeleton: Placeholder kartu statistik (ikon + judul, angka, subteks)
 * dengan varian warna default maupun brand.
 */
export function StatCardSkeleton({
  styleVariant = "default",
  className,
}: StatCardSkeletonProps) {
  const isBrand = styleVariant === "brand";

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 space-y-4 shadow-xs",
        isBrand ? "bg-brand border-transparent" : "bg-white border-neutral-200",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton
          className={cn(
            "size-10 rounded-md",
            isBrand ? "bg-bondi-800/80" : undefined,
          )}
        />
        <Skeleton
          className={cn(
            "h-4 w-36 rounded-md",
            isBrand ? "bg-white/30" : undefined,
          )}
        />
      </div>
      <div className="space-y-2 pt-1">
        <Skeleton
          className={cn(
            "h-9 w-28 rounded-lg",
            isBrand ? "bg-white/30" : undefined,
          )}
        />
        <Skeleton
          className={cn(
            "h-3.5 w-44 rounded-md",
            isBrand ? "bg-white/25" : undefined,
          )}
        />
      </div>
    </div>
  );
}
