import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "#/lib/utils";

export interface NavItemProps {
  label: string;
  icon?: React.ReactNode;
  to?: string;
  isActive?: boolean;
  isOpen?: boolean;
  hasChildren?: boolean;
  disabled?: boolean;
  badge?: React.ReactNode;
  badgeCount?: number;
  variant?: "default" | "danger";
  onClick?: () => void;
  className?: string;
}

/**
 * NavItem: Item navigasi menu sidebar admin BBJ (Figma 112:319 / Node 19:220).
 * Mendukung navigasi Link (TanStack Router), Button, Accordion, dan Disabled item dengan Badge.
 */
export function NavItem({
  label,
  icon,
  to,
  isActive = false,
  isOpen = false,
  hasChildren = false,
  disabled = false,
  badge,
  badgeCount,
  variant = "default",
  onClick,
  className,
}: NavItemProps) {
  const isDanger = variant === "danger";

  const itemClasses = cn(
    "group flex min-h-[40px] w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-150 outline-none select-none text-left",
    isDanger
      ? "font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
      : disabled
        ? "font-medium text-neutral-400 cursor-not-allowed"
        : isActive
          ? "bg-bondi-50 text-brand-strong font-semibold"
          : "font-semibold text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 cursor-pointer",
    className,
  );

  const iconClasses = cn(
    "size-5 shrink-0 transition-colors flex items-center justify-center",
    isDanger
      ? "text-neutral-500 group-hover:text-red-600"
      : disabled
        ? "text-neutral-400"
        : isActive
          ? "text-brand-strong"
          : "text-neutral-500 group-hover:text-neutral-700",
  );

  const innerContent = (
    <>
      {icon && <span className={iconClasses}>{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge}
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
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
            isOpen && "rotate-180",
            !isDanger && "group-hover:text-neutral-700",
          )}
        />
      )}
    </>
  );

  if (disabled) {
    return (
      <div className={itemClasses} aria-disabled="true">
        {innerContent}
      </div>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={itemClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={itemClasses}>
      {innerContent}
    </button>
  );
}
