import * as React from "react";
import { cn } from "#/lib/utils";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  count?: number | string;
  showCount?: boolean;
  label?: React.ReactNode;
  forcedState?: "default" | "hover" | "selected";
}

export function FilterChip({
  children,
  label,
  selected = false,
  count,
  showCount = true,
  forcedState,
  className,
  ...props
}: FilterChipProps) {
  const isSelected = forcedState ? forcedState === "selected" : selected;
  const isForcedHover = forcedState === "hover";
  const displayLabel = children ?? label;
  const hasCount = count !== undefined && showCount;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 h-[38px] px-4 py-2 rounded-full font-['Inter'] text-[14px] font-semibold leading-[20px] transition-all duration-150 select-none outline-none cursor-pointer whitespace-nowrap",
        isSelected
          ? "bg-[#142023] text-white border border-transparent shadow-2xs hover:bg-[#1e2f33]"
          : isForcedHover
            ? "bg-[#eef1f2] border border-[#cdd4d6] text-[#142023]"
            : "bg-white border border-[#cdd4d6] text-[#142023] hover:bg-[#eef1f2] hover:border-[#cdd4d6]",
        "focus-visible:ring-3 focus-visible:ring-[#b0e0e3]",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <span>{displayLabel}</span>
      {hasCount && (
        <span
          className={cn(
            "inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[12px] font-semibold leading-[16px] transition-colors",
            isSelected
              ? "bg-[#ffda57] text-[#142023]"
              : isForcedHover
                ? "bg-[#e2e7e8] text-[#4d585b]"
                : "bg-[#eef1f2] text-[#4d585b]",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
