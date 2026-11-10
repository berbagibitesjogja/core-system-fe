import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-label text-xs font-semibold rounded-full px-2.5 py-0.5 h-6 transition-colors",
  {
    variants: {
      tone: {
        neutral: "",
        brand: "",
        accent: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
      },
      styleVariant: {
        soft: "border",
        solid: "text-white border border-transparent",
      },
    },
    compoundVariants: [
      // Soft styles
      {
        tone: "neutral",
        styleVariant: "soft",
        class: "bg-neutral-100 text-neutral-800 border-neutral-300",
      },
      {
        tone: "brand",
        styleVariant: "soft",
        class: "bg-bondi-50 text-bondi-700 border-bondi-200",
      },
      {
        tone: "accent",
        styleVariant: "soft",
        class: "bg-sunny-50 text-neutral-900 border-sunny-200",
      },
      {
        tone: "success",
        styleVariant: "soft",
        class: "bg-green-50 text-green-700 border-green-200",
      },
      {
        tone: "warning",
        styleVariant: "soft",
        class: "bg-orange-50 text-orange-800 border-orange-200",
      },
      {
        tone: "danger",
        styleVariant: "soft",
        class: "bg-red-50 text-red-700 border-red-200",
      },
      {
        tone: "info",
        styleVariant: "soft",
        class: "bg-blue-50 text-blue-700 border-blue-200",
      },
      // Solid styles
      {
        tone: "neutral",
        styleVariant: "solid",
        class: "bg-neutral-900 text-white",
      },
      {
        tone: "brand",
        styleVariant: "solid",
        class: "bg-brand text-white",
      },
      {
        tone: "accent",
        styleVariant: "solid",
        class: "bg-accent text-neutral-900 border border-neutral-900",
      },
      {
        tone: "success",
        styleVariant: "solid",
        class: "bg-green-600 text-white",
      },
      {
        tone: "warning",
        styleVariant: "solid",
        class: "bg-orange-500 text-white",
      },
      {
        tone: "danger",
        styleVariant: "solid",
        class: "bg-red-600 text-white",
      },
      {
        tone: "info",
        styleVariant: "solid",
        class: "bg-blue-600 text-white",
      },
    ],
    defaultVariants: {
      tone: "brand",
      styleVariant: "soft",
    },
  },
);

export type BadgeTone =
  "neutral" | "brand" | "accent" | "success" | "warning" | "danger" | "info";

export type BadgeStyleVariant = "soft" | "solid";

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  tone?: BadgeTone;
  styleVariant?: BadgeStyleVariant;
  dot?: boolean;
}

const dotColors: Record<string, string> = {
  "neutral-soft": "bg-neutral-500",
  "neutral-solid": "bg-white",
  "brand-soft": "bg-bondi-600",
  "brand-solid": "bg-white",
  "accent-soft": "bg-neutral-800",
  "accent-solid": "bg-neutral-900",
  "success-soft": "bg-green-600",
  "success-solid": "bg-white",
  "warning-soft": "bg-orange-600",
  "warning-solid": "bg-white",
  "danger-soft": "bg-red-600",
  "danger-solid": "bg-white",
  "info-soft": "bg-blue-600",
  "info-solid": "bg-white",
};

export function Badge({
  className,
  tone = "brand",
  styleVariant = "soft",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const dotKey = `${tone}-${styleVariant}`;
  const dotColorClass = dotColors[dotKey] || "bg-current";

  return (
    <div
      className={cn(badgeVariants({ tone, styleVariant }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("mr-1.5 size-1.5 shrink-0 rounded-full", dotColorClass)}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
