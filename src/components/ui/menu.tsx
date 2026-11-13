import * as React from "react";
import { Check, Search } from "lucide-react";
import { cn } from "#/lib/utils";

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "plain" | "checkbox";
  icon?: React.ReactNode;
  label: string;
  meta?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export function MenuItem({
  type = "plain",
  icon,
  label,
  meta,
  selected = false,
  disabled = false,
  onSelect,
  className,
  ...props
}: MenuItemProps) {
  return (
    <div
      role="menuitem"
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled && onSelect) onSelect();
      }}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors cursor-pointer select-none",
        selected
          ? "bg-bondi-50 text-brand font-semibold"
          : "text-neutral-800 hover:bg-neutral-100",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className,
      )}
      {...props}
    >
      {/* Leading indicator */}
      {type === "plain" && icon && (
        <span
          className={cn(
            "size-5 flex items-center justify-center shrink-0",
            selected ? "text-brand" : "text-neutral-500",
          )}
        >
          {icon}
        </span>
      )}

      {type === "checkbox" && (
        <span
          className={cn(
            "size-4 rounded border flex items-center justify-center shrink-0 transition-colors",
            selected
              ? "bg-brand border-brand text-white"
              : "border-neutral-300 bg-white",
          )}
        >
          {selected && <Check className="size-3 stroke-[3]" />}
        </span>
      )}

      {/* Label & Meta */}
      <div className="flex-1 min-w-0">
        <div className="font-label-m text-sm leading-tight truncate">
          {label}
        </div>
        {meta && (
          <div className="font-body-s text-xs text-neutral-500 truncate mt-0.5">
            {meta}
          </div>
        )}
      </div>
    </div>
  );
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  children: React.ReactNode;
}

export function Menu({
  searchable = false,
  searchPlaceholder = "Cari menu...",
  searchValue,
  onSearchChange,
  children,
  className,
  ...props
}: MenuProps) {
  return (
    <div
      role="menu"
      className={cn(
        "w-72 rounded-md border border-neutral-200 bg-white p-2 shadow-md space-y-1",
        className,
      )}
      {...props}
    >
      {searchable && (
        <div className="relative mb-2 px-1 pt-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
