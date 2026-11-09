import * as React from "react";
import { cn } from "#/lib/utils";

export interface BottomNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export function BottomNavItem({
  icon,
  label,
  active = false,
  className,
  ...props
}: BottomNavItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-[72px] h-[68px] flex flex-col items-center justify-center gap-1 select-none transition-colors group cursor-pointer",
        active ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-14 h-8 rounded-full flex items-center justify-center transition-all",
          active
            ? "bg-accent border-[1.5px] border-neutral-900 text-neutral-900 shadow-2xs"
            : "bg-transparent text-neutral-600 group-hover:bg-neutral-100",
        )}
      >
        <span className="size-5 flex items-center justify-center">{icon}</span>
      </div>
      <span
        className={cn(
          "font-label text-xs leading-tight truncate px-1",
          active
            ? "font-semibold text-neutral-900"
            : "font-normal text-neutral-600",
        )}
      >
        {label}
      </span>
    </button>
  );
}
