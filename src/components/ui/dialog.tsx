import * as React from "react";
import { AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "#/lib/utils";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  tone?: "default" | "danger";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isConfirmLoading?: boolean;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  tone = "default",
  confirmText,
  cancelText = "Batal",
  onConfirm,
  isConfirmLoading = false,
  className,
}: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDanger = tone === "danger";
  const defaultConfirmText = isDanger ? "Hapus" : "Simpan";
  const effectiveConfirmText = confirmText || defaultConfirmText;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full max-w-[440px] rounded-[24px] bg-white p-6 shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-200 transition-all animate-in fade-in zoom-in-95 space-y-6",
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "size-12 rounded-full flex items-center justify-center shrink-0",
              isDanger ? "bg-red-50 text-red-600" : "bg-bondi-50 text-brand",
            )}
          >
            {isDanger ? (
              <AlertTriangle className="size-6" />
            ) : (
              <HelpCircle className="size-6" />
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-heading-h3 text-xl font-bold text-neutral-900 leading-tight">
              {title}
            </h3>
            {description && (
              <p className="font-body-m text-sm text-neutral-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {children && <div className="text-sm">{children}</div>}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              variant={isDanger ? "danger" : "primary"}
              size="md"
              isLoading={isConfirmLoading}
              onClick={onConfirm}
              className={!isDanger ? "shadow-pop-xs" : ""}
            >
              {effectiveConfirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
