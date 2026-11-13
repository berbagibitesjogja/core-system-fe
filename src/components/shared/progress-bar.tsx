import { cn } from "#/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "brand" | "accent" | "success";
  trackColor?: "neutral" | "sunny";
  showLabel?: boolean;
  indeterminate?: boolean;
  ariaLabel?: string;
  className?: string;
}

// Indikator progress bar horizontal reusable berbasis token desain
export function ProgressBar({
  value,
  color = "brand",
  trackColor = "neutral",
  showLabel = false,
  indeterminate = false,
  ariaLabel = "Progres",
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const roundedValue = Math.round(clampedValue);

  const fillColors = {
    brand: "bg-bondi-700",
    accent: "bg-sunny-500",
    success: "bg-green-600",
  }[color];

  const trackColors = {
    neutral: "bg-neutral-200",
    sunny: "bg-sunny-100",
  }[trackColor];

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
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : roundedValue}
        className={cn(
          "h-[6px] w-full overflow-hidden rounded-[999px]",
          trackColors,
        )}
      >
        <div
          className={cn(
            "h-[6px] rounded-[999px] transition-[width] duration-150 ease-out motion-reduce:transition-none",
            indeterminate && "w-[60%] animate-pulse",
            fillColors,
          )}
          style={indeterminate ? undefined : { width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
