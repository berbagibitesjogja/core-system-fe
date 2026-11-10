import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "#/lib/utils";
import cariKosongSvg from "#/assets/illustrations/cari-kosong.svg";

export interface IllustrationCariKosongProps {
  className?: string;
  alt?: string;
}

/**
 * IllustrationCariKosong: Komponen visual ilustrasi SVG resmi BBJ (Figma Node 130:578 / 128:43).
 */
export function IllustrationCariKosong({
  className,
  alt = "Ilustrasi data kosong",
}: IllustrationCariKosongProps) {
  return (
    <img
      src={cariKosongSvg}
      alt={alt}
      className={cn(
        "size-full object-contain pointer-events-none select-none",
        className,
      )}
    />
  );
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
  action?: React.ReactNode;
  size?: "default" | "compact";
  visual?: "icon" | "illustration";
}

export function EmptyState({
  title,
  description,
  icon,
  illustration,
  action,
  size = "default",
  visual = "icon",
  className,
  ...props
}: EmptyStateProps) {
  const isCompact = size === "compact";
  const isIllustration = visual === "illustration";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        isCompact
          ? "w-full max-w-[320px] p-6"
          : "w-full max-w-[400px] px-6 py-10",
        className,
      )}
      {...props}
    >
      {/* Visual Container */}
      <div
        className={cn(
          "mb-3 flex items-center justify-center overflow-hidden shrink-0",
          isIllustration
            ? isCompact
              ? "size-[140px] rounded-xl"
              : "size-[200px] rounded-2xl"
            : isCompact
              ? "h-[72px] w-[96px] rounded-xl bg-bondi-50 text-brand"
              : "h-[120px] w-[160px] rounded-2xl bg-bondi-50 text-brand",
        )}
      >
        {isIllustration
          ? illustration || <IllustrationCariKosong />
          : icon || <Inbox className={isCompact ? "size-7" : "size-10"} />}
      </div>

      {/* Content */}
      <h4 className="font-heading-h4 text-lg font-semibold text-neutral-900">
        {title}
      </h4>
      {description && (
        <p className="mt-1 font-body-m text-sm text-neutral-500 max-w-sm">
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
