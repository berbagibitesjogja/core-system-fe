import * as React from "react";
import { cn } from "#/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom";
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean; // For static showcase or controlled state
}

export function Tooltip({
  content,
  placement = "top",
  children,
  className,
  isOpen: controlledOpen,
}: TooltipProps) {
  const [hovered, setHovered] = React.useState(false);
  const show = controlledOpen !== undefined ? controlledOpen : hovered;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}
      {show && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs font-semibold font-label text-white bg-[#142023] rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150 animate-in fade-in zoom-in-95 select-none",
            placement === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
            placement === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2",
            className,
          )}
        >
          {content}
          {/* 12x6px Arrow */}
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent",
              placement === "top" &&
                "top-full border-t-[6px] border-t-[#142023]",
              placement === "bottom" &&
                "bottom-full border-b-[6px] border-b-[#142023]",
            )}
          />
        </div>
      )}
    </div>
  );
}
