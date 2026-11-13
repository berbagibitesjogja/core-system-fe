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
        "relative flex flex-col gap-3 p-4 rounded-[12px] border transition-colors duration-150 select-none cursor-pointer outline-none text-left w-full min-w-0",
        isError
          ? "bg-white border-red-500 after:content-[''] after:pointer-events-none after:absolute after:-inset-px after:rounded-[12px] after:border-2 after:border-red-500"
          : isSelected
            ? "bg-bondi-50 border-bondi-500 shadow-2xs after:content-[''] after:pointer-events-none after:absolute after:-inset-px after:rounded-[12px] after:border-2 after:border-bondi-500"
            : isHover
              ? "bg-neutral-100 border-neutral-300"
              : "bg-white border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        "focus-visible:ring-3 focus-visible:ring-bondi-200",
        className,
      )}
    >
      {/* Top Row: Icon Badge & Radio */}
      <div className="flex items-center justify-between w-full">
        <div
          className={cn(
            "size-[40px] rounded-[10px] flex items-center justify-center shrink-0 transition-colors",
            isSelected
              ? "bg-white text-bondi-700 shadow-2xs"
              : isHover
                ? "bg-neutral-200 text-neutral-900"
                : "bg-neutral-100 text-neutral-900",
          )}
        >
          {icon || <Building className="size-[20px]" />}
        </div>

        {/* Custom Radio Icon */}
        <div className="size-[20px] flex items-center justify-center shrink-0">
          {isSelected ? (
            <div className="size-5 rounded-full bg-bondi-700 flex items-center justify-center shadow-2xs">
              <div className="size-2 rounded-full bg-white" />
            </div>
          ) : isError ? (
            <div className="size-5 rounded-full border border-red-500 bg-white" />
          ) : (
            <div className="size-5 rounded-full border border-neutral-300 bg-white" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-1">
          <p className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-neutral-900 whitespace-nowrap">
            {title}
          </p>
          {badge}
        </div>
        {description && (
          <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-neutral-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
