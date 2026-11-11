import * as React from "react";
import { cn } from "#/lib/utils";

export type StatCardStyleVariant = "default" | "brand" | "accent";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  styleVariant?: StatCardStyleVariant;
}

export function StatCard({
  title,
  value,
  unit,
  subtext,
  illustrationSrc,
  illustrationAlt,
  icon,
  iconPosition = "left",
  trend,
  styleVariant = "default",
  className,
  ...props
}: StatCardProps) {
  const variantClasses = {
    default: "bg-white border-neutral-200 shadow-xs text-neutral-900",
    brand: "bg-brand text-white border-transparent",
    accent:
      "bg-accent border-[1.5px] border-neutral-900 shadow-pop-sm text-neutral-900",
  }[styleVariant];

  const iconBgClasses = {
    default: "bg-bondi-50 text-brand",
    brand: "bg-[#005e64] text-white",
    accent: "bg-white border-[1.5px] border-neutral-900 text-neutral-900",
  }[styleVariant];

  const labelClasses = {
    default: "text-neutral-600",
    brand: "text-white",
    accent: "text-neutral-900",
  }[styleVariant];

  const unitClasses = {
    default: "text-neutral-600",
    brand: "text-white",
    accent: "text-neutral-900",
  }[styleVariant];

  const valueClasses = {
    default: "text-neutral-900",
    brand: "text-white",
    accent: "text-neutral-900",
  }[styleVariant];

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5 transition-all duration-150 overflow-hidden",
        variantClasses,
        className,
      )}
      {...props}
    >
      {illustrationSrc && (
        <div className="absolute right-[-41px] size-[206px] top-[11px] pointer-events-none select-none overflow-hidden">
          <img
            src={illustrationSrc}
            alt={illustrationAlt || ""}
            className="size-full object-contain pointer-events-none"
          />
        </div>
      )}

      {iconPosition === "left" ? (
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={cn(
                "size-10 rounded-md flex items-center justify-center shrink-0",
                iconBgClasses,
              )}
            >
              {icon}
            </div>
          )}
          <span
            className={cn("font-label text-sm font-semibold", labelClasses)}
          >
            {title}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn("font-label text-sm font-semibold", labelClasses)}
          >
            {title}
          </span>
          {icon && (
            <div
              className={cn(
                "size-10 rounded-md flex items-center justify-center shrink-0",
                iconBgClasses,
              )}
            >
              {icon}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className={cn("font-number-xl", valueClasses)}>{value}</span>
        {unit && (
          <span
            className={cn("font-label font-semibold text-base", unitClasses)}
          >
            {unit}
          </span>
        )}
      </div>

      {trend && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-sans">
          <span
            className={cn(
              "font-semibold",
              styleVariant === "brand"
                ? "text-white"
                : styleVariant === "accent"
                  ? "text-neutral-900"
                  : trend.isPositive
                    ? "text-green-700"
                    : "text-red-700",
            )}
          >
            {trend.value}
          </span>
          {trend.label && (
            <span
              className={
                styleVariant === "brand"
                  ? "text-white/80"
                  : styleVariant === "accent"
                    ? "text-neutral-800"
                    : "text-neutral-500"
              }
            >
              {trend.label}
            </span>
          )}
        </div>
      )}

      {subtext && (
        <p
          className={cn(
            "mt-2 font-sans text-xs leading-4 truncate relative z-10",
            styleVariant === "brand" ? "text-white" : "text-neutral-500",
          )}
        >
          {subtext}
        </p>
      )}

      {props.children}
    </div>
  );
}
