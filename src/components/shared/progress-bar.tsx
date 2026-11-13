import { cn } from "#/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "brand" | "accent" | "success";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = "brand",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const fillColors = {
    brand: "bg-bondi-700",
    accent: "bg-sunny-500",
    success: "bg-green-600",
  }[color];

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between font-['Inter'] text-[12px] text-neutral-500">
          <span>Progres</span>
          <span className="font-semibold text-neutral-900">
            {clampedValue}%
          </span>
        </div>
      )}
      <div className="h-[6px] w-full overflow-hidden rounded-[999px] bg-neutral-200">
        <div
          className={cn(
            "h-[6px] rounded-[999px] transition-all duration-300",
            fillColors,
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
