import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "#/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  description?: string;
  onClose?: () => void;
}

export function Alert({
  tone = "info",
  title,
  description,
  children,
  onClose,
  className,
  ...props
}: AlertProps) {
  const icons = {
    info: <Info className="size-5 shrink-0 text-blue-600" />,
    success: <CheckCircle2 className="size-5 shrink-0 text-green-700" />,
    warning: <AlertTriangle className="size-5 shrink-0 text-orange-600" />,
    danger: <XCircle className="size-5 shrink-0 text-red-600" />,
  };

  const toneClasses = {
    info: "bg-blue-50/70 border-blue-500 text-blue-900",
    success: "bg-green-50/70 border-green-600 text-green-900",
    warning: "bg-orange-50/70 border-orange-500 text-orange-950",
    danger: "bg-red-50/70 border-red-500 text-red-950",
  }[tone];

  const titleToneClasses = {
    info: "text-blue-700",
    success: "text-green-800",
    warning: "text-orange-800",
    danger: "text-red-800",
  }[tone];

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3 rounded-md border px-4 py-3 text-sm select-none",
        toneClasses,
        className,
      )}
      {...props}
    >
      <div className="mt-0.5">{icons[tone]}</div>
      <div className="flex-1 min-w-0 space-y-0.5">
        {title && (
          <h5
            className={cn(
              "font-label text-sm font-semibold leading-tight",
              titleToneClasses,
            )}
          >
            {title}
          </h5>
        )}
        {description && (
          <p className="font-body-s text-xs text-neutral-900 leading-relaxed">
            {description}
          </p>
        )}
        {children && (
          <div className="font-body-s text-xs text-neutral-900 leading-relaxed">
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup alert"
          className="size-6 -mr-1 -mt-0.5 rounded-md inline-flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
