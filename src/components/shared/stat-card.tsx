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
  illustrationClassName?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  styleVariant?: StatCardStyleVariant;
}

export interface StatCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section";
  containerClassName?: string;
}

/**
 * StatCardGrid: Kontainer grid responsif berbasis CSS Container Queries (@container)
 * untuk baris kartu statistik (1 kolom -> 2 kolom seimbang -> 3 kolom) agar aman
 * saat sidebar desktop terbuka maupun saat zoom/display scale tinggi.
 */
export function StatCardGrid({
  as = "div",
  containerClassName,
  className,
  children,
  ...props
}: StatCardGridProps) {
  const gridClassName = cn(
    "grid w-full grid-cols-1 gap-4 @[620px]:grid-cols-2 @[620px]:gap-6 @[620px]:[&>*:nth-child(odd):last-child]:col-span-2 @[900px]:grid-cols-3 @[900px]:[&>*:nth-child(odd):last-child]:col-span-1",
    className,
  );

  return (
    <div className={cn("@container w-full", containerClassName)}>
      {as === "section" ? (
        <section className={gridClassName} {...props}>
          {children}
        </section>
      ) : (
        <div className={gridClassName} {...props}>
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * StatCard: Kartu metrik ringkasan BBJ dengan varian gaya, tren, subteks, serta
 * ilustrasi dekoratif terklip di sudut kanan-bawah yang terpisah secara z-layer
 * dan zona aman agar konten teks tetap terbaca di semua ukuran kontainer.
 */
export function StatCard({
  title,
  value,
  unit,
  subtext,
  illustrationSrc,
  illustrationAlt,
  illustrationClassName,
  icon,
  iconPosition = "left",
  trend,
  styleVariant = "default",
  className,
  children,
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
    brand: "bg-bondi-800 text-white",
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

  const subtextClasses = {
    default: "text-neutral-500",
    brand: "text-white",
    accent: "text-neutral-800",
  }[styleVariant];

  const valueText = String(value);
  const isVeryLongValue = valueText.length >= 13;
  const isLongValue = valueText.length >= 9;

  const valueSizeClasses = illustrationSrc
    ? isVeryLongValue
      ? "text-[20px] leading-[26px] @[320px]:text-[24px] @[320px]:leading-[30px] @[380px]:text-[28px] @[380px]:leading-[32px] @[440px]:text-[34px] @[440px]:leading-[38px]"
      : isLongValue
        ? "text-[24px] leading-[30px] @[320px]:text-[28px] @[320px]:leading-[34px] @[380px]:text-[32px] @[380px]:leading-[38px] @[440px]:text-[40px] @[440px]:leading-[44px]"
        : "text-[30px] leading-[36px] @[320px]:text-[36px] @[320px]:leading-[40px] @[350px]:text-[40px] @[350px]:leading-[44px]"
    : isVeryLongValue
      ? "text-[26px] leading-[32px] @[280px]:text-[32px] @[280px]:leading-[36px] @[340px]:text-[40px] @[340px]:leading-[44px]"
      : "text-[32px] leading-[36px] @[260px]:text-[40px] @[260px]:leading-[44px]";

  // Zona aman teks agar konten tidak bertabrakan dengan ilustrasi absolut di kanan-bawah
  const headerSafeZoneClasses = illustrationSrc
    ? "pr-[80px] @[320px]:pr-[96px] @[380px]:pr-[112px] @[440px]:pr-[128px]"
    : undefined;

  const bodySafeZoneClasses = illustrationSrc
    ? "pr-[104px] @[320px]:pr-[116px] @[380px]:pr-[124px] @[440px]:pr-[140px]"
    : undefined;

  const iconEl = icon ? (
    <div
      className={cn(
        "size-10 rounded-md flex items-center justify-center shrink-0",
        iconBgClasses,
      )}
    >
      {icon}
    </div>
  ) : null;

  const titleEl = (
    <span
      className={cn(
        "font-label text-sm font-semibold leading-5 min-w-0",
        labelClasses,
      )}
    >
      {title}
    </span>
  );

  return (
    <div
      className={cn(
        "@container relative flex flex-col rounded-2xl border p-4 @[320px]:p-5 transition-all duration-150 overflow-hidden",
        illustrationSrc && "min-h-[144px] @[320px]:min-h-[156px]",
        variantClasses,
        className,
      )}
      {...props}
    >
      {/* Ilustrasi dekoratif di sudut kanan-bawah, terklip tepi kartu (z-0) agar tinggi kartu tetap ringkas */}
      {illustrationSrc && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none select-none absolute z-0 hidden @[240px]:block",
            "size-[156px] -right-10 -bottom-9",
            "@[320px]:size-[176px] @[320px]:-right-11 @[320px]:-bottom-10",
            "@[380px]:size-[192px] @[380px]:-right-11 @[380px]:-bottom-11",
            "@[440px]:size-[206px] @[440px]:right-[-41px] @[440px]:-bottom-[46px]",
            illustrationClassName,
          )}
        >
          <img
            src={illustrationSrc}
            alt={illustrationAlt || ""}
            className="size-full object-contain pointer-events-none select-none"
          />
        </div>
      )}

      {/* Header Row: Ikon dan judul tetap di layer atas (z-10) dalam zona aman */}
      <div
        className={cn(
          "relative z-10 flex items-center",
          iconPosition === "left" ? "gap-3" : "justify-between gap-4",
          headerSafeZoneClasses,
        )}
      >
        {iconPosition === "left" ? (
          <>
            {iconEl}
            {titleEl}
          </>
        ) : (
          <>
            {titleEl}
            {iconEl}
          </>
        )}
      </div>

      {/* Body Content: Angka utama, tren, dan subteks di layer atas (z-10) bebas overlap */}
      <div
        className={cn("relative z-10 mt-3 min-w-0 flex-1", bodySafeZoneClasses)}
      >
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span
            className={cn(
              "font-heading font-bold tracking-[-0.02em] break-words",
              valueSizeClasses,
              valueClasses,
            )}
          >
            {value}
          </span>
          {unit && (
            <span
              className={cn(
                "font-label font-semibold text-sm @[350px]:text-base",
                unitClasses,
              )}
            >
              {unit}
            </span>
          )}
        </div>

        {trend && (
          <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-sans leading-4">
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
              "mt-2 font-sans text-xs leading-4 break-words",
              subtextClasses,
            )}
          >
            {subtext}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}
