import * as React from "react";
import { Avatar } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { getPresetAvatarSrc } from "#/lib/avatars";
import { cn } from "#/lib/utils";
import { idReimburse } from "#/locales";
import { formatRupiah } from "./reimburse-data";
import type { ReimburseDataItem } from "./reimburse-management-data";

export interface ReimburseRejectDialogProps {
  item: ReimburseDataItem | null;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void> | void;
  isSubmitting?: boolean;
}

// Modal dialog penolakan pengajuan reimburse beserta input alasan penolakan
export function ReimburseRejectDialog({
  item,
  onClose,
  onConfirm,
  isSubmitting = false,
}: ReimburseRejectDialogProps) {
  const [reason, setReason] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setReason("");
    setError(null);
  }, [item]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, isSubmitting]);

  if (!item) return null;

  const summaryRows = [
    {
      id: "applicant",
      label: idReimburse.dialogs.rejectApplicantLabel,
      value: item.applicantName,
    },
    {
      id: "destination",
      label: idReimburse.dialogs.rejectDestinationLabel,
      value: `${item.method} · ${item.destinationNumber}`,
    },
    {
      id: "amount",
      label: idReimburse.dialogs.rejectAmountLabel,
      value: formatRupiah(item.amount),
      emphasize: true,
    },
    {
      id: "note",
      label: idReimburse.dialogs.rejectNoteLabel,
      value: item.note,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = reason.trim();
    if (!trimmed) {
      setError(idReimburse.dialogs.rejectReasonRequired);
      return;
    }
    if (trimmed.length < 5) {
      setError(idReimburse.dialogs.rejectReasonMinLength);
      return;
    }
    setError(null);
    onConfirm(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-neutral-950/55 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-reject-reimburse-title"
        className="relative z-10 flex w-full max-w-[480px] flex-col gap-5 rounded-3xl border border-neutral-200 bg-surface p-6 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="space-y-1.5">
          <h3
            id="modal-reject-reimburse-title"
            className="font-heading-h3 text-xl font-bold leading-tight text-neutral-900"
          >
            {idReimburse.dialogs.rejectTitle}
          </h3>
          <p className="font-body-m text-sm leading-relaxed text-neutral-600">
            {idReimburse.dialogs.rejectDescription}
          </p>
        </div>

        {/* Kartu ringkasan pengajuan */}
        <div className="space-y-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          {summaryRows.map((row) => (
            <div
              key={row.id}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <span className="shrink-0 text-neutral-500">{row.label}</span>
              {row.id === "applicant" ? (
                <div className="flex min-w-0 items-center justify-end gap-2">
                  <Avatar
                    src={
                      item.applicantAvatarSrc ??
                      getPresetAvatarSrc(item.applicantName)
                    }
                    alt={item.applicantName}
                    name={item.applicantName}
                    size="sm"
                    shape="circle"
                    className="size-6 shrink-0 border-bondi-200 bg-bondi-50 text-[10px] text-bondi-800"
                  />
                  <span className="truncate font-semibold text-neutral-900">
                    {row.value}
                  </span>
                </div>
              ) : (
                <span
                  className={cn(
                    "text-right",
                    row.emphasize
                      ? "font-bold text-neutral-900 tabular-nums"
                      : "font-medium text-neutral-800",
                    row.id === "note" && "line-clamp-2 max-w-[260px] text-xs",
                  )}
                >
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Formulir alasan penolakan */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Textarea
            label={idReimburse.dialogs.rejectReasonLabel}
            placeholder={idReimburse.dialogs.rejectReasonPlaceholder}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError(null);
            }}
            error={error ?? undefined}
            helperText={idReimburse.dialogs.rejectReasonHelper}
            disabled={isSubmitting}
            className="w-full"
            rows={3}
            autoFocus
          />

          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {idReimburse.dialogs.rejectBackButton}
            </Button>
            <Button
              type="submit"
              variant="danger"
              size="md"
              disabled={isSubmitting || !reason.trim()}
              className="shadow-pop-xs"
            >
              {isSubmitting
                ? idReimburse.dialogs.rejectSubmittingButton
                : idReimburse.dialogs.rejectSubmitButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
