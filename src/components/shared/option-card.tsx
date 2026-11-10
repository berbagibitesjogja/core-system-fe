import * as React from "react";
import { Building } from "lucide-react";
import { cn } from "#/lib/utils";

export type OptionCardState = "default" | "hover" | "selected" | "error";

export interface OptionCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  forcedState?: OptionCardState;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function OptionCard({
  title,
  description,
  selected = false,
  forcedState,
  onClick,
  disabled = false,
  icon,
  badge,
  className,
}: OptionCardProps) {
  const currentState: OptionCardState =
    forcedState ?? (selected ? "selected" : "default");

  const isSelected = currentState === "selected";
  const isHover = currentState === "hover";
  const isError = currentState === "error";

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onClick?.()}
      onKeyDown={(e) => {
        if (!disabled && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "relative flex flex-col gap-3 p-4 rounded-[12px] transition-all duration-150 select-none cursor-pointer outline-none text-left w-full",
        isError
          ? "bg-white border-2 border-[#ef4444]"
          : isSelected
            ? "bg-[#e6f5f6] border-2 border-[#009ca6] shadow-2xs"
            : isHover
              ? "bg-[#eef1f2] border border-[#cdd4d6]"
              : "bg-white border border-[#e2e7e8] hover:bg-[#eef1f2] hover:border-[#cdd4d6]",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        "focus-visible:ring-3 focus-visible:ring-[#b0e0e3]",
        className,
      )}
    >
      {/* Top Row: Icon Badge & Radio */}
      <div className="flex items-center justify-between w-full">
        <div
          className={cn(
            "size-[40px] rounded-[10px] flex items-center justify-center shrink-0 transition-colors",
            isSelected
              ? "bg-white text-[#007d85] shadow-2xs"
              : isHover
                ? "bg-[#e2e7e8] text-[#142023]"
                : "bg-[#eef1f2] text-[#142023]",
          )}
        >
          {icon || <Building className="size-[20px]" />}
        </div>

        {/* Custom Radio Icon */}
        <div className="size-[20px] flex items-center justify-center shrink-0">
          {isSelected ? (
            <div className="size-5 rounded-full bg-[#007d85] flex items-center justify-center shadow-2xs">
              <div className="size-2 rounded-full bg-white" />
            </div>
          ) : isError ? (
            <div className="size-5 rounded-full border border-[#ef4444] bg-white" />
          ) : (
            <div className="size-5 rounded-full border border-[#cdd4d6] bg-white" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-1">
          <p className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#142023] whitespace-nowrap">
            {title}
          </p>
          {badge}
        </div>
        {description && (
          <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-[#6b777a]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
