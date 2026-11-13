import * as React from "react";
import volunteerThinkingIllustration from "#/assets/illustrations/volunteer-thinking.svg";
import { Button } from "#/components/ui/button";
import { formatRupiah } from "./reimburse-data";
import type { ReimburseDataItem } from "./reimburse-management-data";

export interface ReimburseCancelDialogProps {
  item: ReimburseDataItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

// Modal konfirmasi pembatalan pengajuan reimburse untuk Super Admin & Core Team
export function ReimburseCancelDialog({
  item,
  onClose,
  onConfirm,
}: ReimburseCancelDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-neutral-950/55 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-cancel-reimburse-title"
        className="relative z-10 flex w-full max-w-[480px] flex-col gap-6 rounded-3xl border border-neutral-200 bg-surface p-6 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="pointer-events-none flex size-[140px] shrink-0 select-none items-center justify-center sm:size-[160px]">
            <img
              src={volunteerThinkingIllustration}
              alt="Ilustrasi konfirmasi pembatalan pengajuan reimburse"
              className="size-full object-contain"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3
              id="modal-cancel-reimburse-title"
              className="font-heading-h3 text-xl font-bold leading-tight text-neutral-900"
            >
              Batalkan Pengajuan Reimburse
            </h3>
            <p className="font-body-m text-sm leading-relaxed text-neutral-600">
              Apakah kamu yakin ingin membatalkan pengajuan reimburse dari{" "}
              <span className="font-semibold text-neutral-900">
                {item.applicantName}
              </span>{" "}
              sebesar{" "}
              <span className="font-semibold text-neutral-900">
                {formatRupiah(item.amount)}
              </span>
              ?
            </p>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-left">
              <p className="text-xs font-medium text-neutral-500">
                {item.method} · {item.destinationNumber}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-neutral-700">
                {item.note}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Kembali
          </Button>
          <Button type="button" variant="danger" size="md" onClick={onConfirm}>
            Batalkan Pengajuan
          </Button>
        </div>
      </div>
    </div>
  );
}
