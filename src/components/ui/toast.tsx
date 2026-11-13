import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import type { ToasterProps as SonnerToasterProps } from "sonner";
import { cn } from "#/lib/utils";

export type ToastTone = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id?: string | number;
  tone?: ToastTone;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}

export function Toast({
  tone = "success",
  message,
  actionLabel,
  onAction,
  onClose,
  className,
}: ToastProps) {
  const isError = tone === "error";
  const isWarning = tone === "warning";
  const isInfo = tone === "info";

  return (
    <div
      role="status"
      className={cn(
        "bg-neutral-900 text-white flex items-center gap-3 px-4 py-3 rounded-md w-[380px] max-w-full shadow-[0px_8px_16px_rgba(20,32,35,0.18)] transition-all select-none pointer-events-auto",
        className,
      )}
    >
      {/* Icon Badge 28x28px */}
      <div
        className={cn(
          "size-7 rounded-full flex items-center justify-center shrink-0",
          isInfo
            ? "bg-blue-100 text-blue-700"
            : isWarning
              ? "bg-orange-100 text-orange-700"
              : isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700",
        )}
      >
        {isInfo && <Info className="size-4" />}
        {isWarning && <AlertTriangle className="size-4" />}
        {isError && <XCircle className="size-4" />}
        {!isInfo && !isWarning && !isError && (
          <CheckCircle2 className="size-4" />
        )}
      </div>

      {/* Message */}
      <p className="font-label text-sm font-semibold text-white flex-1 min-w-0">
        {message}
      </p>

      {/* Action Button */}
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="font-label text-sm font-semibold text-accent hover:underline shrink-0 cursor-pointer"
        >
          {actionLabel}
        </button>
      )}

      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="p-1 -mr-1 rounded-md text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

// Backward-compatible alias
export const ToastCard = Toast;

export interface ToastCustomOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  id?: string | number;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

/**
 * Custom Toast BBJ yang menindih default Sonner
 * Mempertahankan API logic yang sama persis: toast.success, toast.error, toast.warning, toast.info
 */
function createCustomToast(
  message: string,
  tone: ToastTone = "info",
  options?: ToastCustomOptions,
) {
  // Figma Spec: error tetap sampai ditutup (atau lebih lama), yang lain 4 detik
  const defaultDuration = tone === "error" ? 8000 : 4000;
  const duration = options?.duration ?? defaultDuration;

  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        tone={tone}
        message={message}
        actionLabel={options?.action?.label}
        onAction={() => {
          options?.action?.onClick();
          sonnerToast.dismiss(id);
        }}
        onClose={() => sonnerToast.dismiss(id)}
      />
    ),
    {
      id: options?.id,
      duration,
      unstyled: true,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    },
  );
}

export const toast = Object.assign(
  (message: string, options?: ToastCustomOptions) =>
    createCustomToast(message, "info", options),
  {
    success: (message: string, options?: ToastCustomOptions) =>
      createCustomToast(message, "success", options),
    error: (message: string, options?: ToastCustomOptions) =>
      createCustomToast(message, "error", options),
    warning: (message: string, options?: ToastCustomOptions) =>
      createCustomToast(message, "warning", options),
    info: (message: string, options?: ToastCustomOptions) =>
      createCustomToast(message, "info", options),
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  },
);

export interface ToasterProps extends SonnerToasterProps {}

/**
 * Toaster: Kontainer notifikasi pop-up BBJ
 * Menimpa gaya kartu bawaan Sonner sehingga seluruh notifikasi merender kartu BBJ #142023.
 */
export function Toaster({
  position = "top-right",
  className,
  toastOptions,
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      className={cn("toaster group", className)}
      toastOptions={{
        unstyled: true,
        className:
          "w-auto max-w-full !p-0 !border-0 !bg-transparent !shadow-none flex justify-end",
        ...toastOptions,
      }}
      {...props}
    />
  );
}
