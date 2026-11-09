import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "#/lib/utils";

export interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasChildren?: boolean;
  badgeCount?: number;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function NavItem({
  label,
  icon,
  isActive = false,
  hasChildren = false,
  badgeCount,
  onClick,
  className,
}: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-10 w-full items-center gap-3 rounded-xl px-3 font-label text-sm font-medium transition-all duration-150 outline-none select-none text-left cursor-pointer",
        isActive
          ? "bg-bondi-50 text-bondi-900 font-semibold"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        className,
      )}
    >
      <span
        className={cn(
          "size-5 shrink-0 transition-colors flex items-center justify-center",
          isActive
            ? "text-brand"
            : "text-neutral-500 group-hover:text-neutral-700",
        )}
      >
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {typeof badgeCount === "number" && (
        <span
          className={cn(
            "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold",
            isActive
              ? "bg-bondi-200 text-bondi-900"
              : "bg-neutral-200 text-neutral-700",
          )}
        >
          {badgeCount}
        </span>
      )}
      {hasChildren && (
        <ChevronDown className="size-4 shrink-0 text-neutral-400 group-hover:text-neutral-600 transition-transform" />
      )}
    </button>
  );
}
