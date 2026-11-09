import * as React from "react";
import { X } from "lucide-react";
import { cn } from "#/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  forcedState?: "default" | "hover";
}

export function Tag({
  children,
  label,
  removable,
  onRemove,
  forcedState,
  className,
  ...props
}: TagProps) {
  const isRemovable = removable ?? Boolean(onRemove);
  const isHover = forcedState === "hover";
  const displayLabel = children ?? label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-[30px] px-3 py-1.5 rounded-[8px] font-['Inter'] text-[12px] font-semibold leading-[16px] transition-colors duration-150 select-none whitespace-nowrap",
        isHover
          ? "bg-[#b0e0e3] border border-[#b0e0e3] text-[#00464b]"
          : "bg-[#e6f5f6] border border-[#b0e0e3] text-[#00464b] hover:bg-[#b0e0e3]",
        className,
      )}
      {...props}
    >
      <span>{displayLabel}</span>
      {isRemovable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="size-[14px] inline-flex items-center justify-center text-[#00464b] hover:text-[#00282b] transition-colors cursor-pointer rounded-xs"
          aria-label="Hapus tag"
        >
          <X className="size-[14px] stroke-[2.5]" />
        </button>
      )}
    </span>
  );
}
