import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "#/lib/utils";

export interface FieldHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
  helperText?: string;
  className?: string;
}

/**
 * FieldHelper: Komponen terpusat untuk menampilkan pesan error dan teks bantuan pada formulir.
 * Menampilkan ikon peringatan dan warna merah saat terjadi galat, atau teks netral untuk petunjuk pengisian.
 */
export const FieldHelper = React.forwardRef<HTMLDivElement, FieldHelperProps>(
  ({ error, helperText, className, ...props }, ref) => {
    const isError = Boolean(error);
    const text = isError ? error : helperText;

    if (!text) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1 min-h-[16px] w-full text-[12px] leading-[16px] font-sans",
          isError ? "text-red-700" : "text-neutral-600",
          className,
        )}
        {...props}
      >
        {isError && (
          <AlertTriangle
            className="size-3.5 shrink-0 text-red-600"
            aria-hidden="true"
          />
        )}
        <p className="break-words font-normal">{text}</p>
      </div>
    );
  },
);

FieldHelper.displayName = "FieldHelper";
