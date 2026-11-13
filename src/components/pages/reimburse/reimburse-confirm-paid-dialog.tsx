import * as React from "react";
import { FileUpload } from "#/components/shared/file-upload";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import {
  detectUploadedFileType,
  formatFileSize,
  formatRupiah,
  REIMBURSE_MAX_FILE_SIZE_BYTES,
  REIMBURSE_UPLOAD_DEFAULT_DESC,
} from "./reimburse-data";
import type {
  ReimburseTransferProof,
  ReimburseUploadedFileMeta,
} from "./reimburse-data";
import { REIMBURSE_TRANSFER_FILE_REJECTED_MESSAGE } from "./reimburse-management-data";
import type { ReimburseDataItem } from "./reimburse-management-data";

export interface ReimburseConfirmPaidDialogProps {
  item: ReimburseDataItem | null;
  onClose: () => void;
  onConfirm: (proof?: ReimburseTransferProof) => void;
}

const ACCEPTED_FILE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf"];

// Modal konfirmasi pencairan reimburse beserta unggah bukti transfer opsional
export function ReimburseConfirmPaidDialog({
  item,
  onClose,
  onConfirm,
}: ReimburseConfirmPaidDialogProps) {
  const [uploadedFile, setUploadedFile] =
    React.useState<ReimburseUploadedFileMeta | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const previewUrlRef = React.useRef<string | null>(null);

  const clearPreviewUrl = React.useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    setUploadedFile(null);
    setUploadError(null);
    clearPreviewUrl();
  }, [item, clearPreviewUrl]);

  React.useEffect(() => clearPreviewUrl, [clearPreviewUrl]);

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

  const summaryRows = [
    { id: "applicant", label: "Pemohon", value: item.applicantName },
    {
      id: "destination",
      label: "Tujuan Transfer",
      value: `${item.method} · ${item.destinationNumber}`,
    },
    {
      id: "amount",
      label: "Nominal",
      value: formatRupiah(item.amount),
      emphasize: true,
    },
  ];

  const handleFileSelect = (file: File) => {
    const lowerName = file.name.toLowerCase();
    const hasValidExtension = ACCEPTED_FILE_EXTENSIONS.some((ext) =>
      lowerName.endsWith(ext),
    );
    if (!hasValidExtension || file.size > REIMBURSE_MAX_FILE_SIZE_BYTES) {
      setUploadError(REIMBURSE_TRANSFER_FILE_REJECTED_MESSAGE);
      setUploadedFile(null);
      clearPreviewUrl();
      return;
    }

    clearPreviewUrl();
    const previewUrl = URL.createObjectURL(file);
    previewUrlRef.current = previewUrl;

    setUploadError(null);
    setUploadedFile({
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      fileType: detectUploadedFileType(file.name),
      previewUrl,
    });
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadError(null);
    clearPreviewUrl();
  };

  const handleConfirm = () => {
    const proof: ReimburseTransferProof | undefined = uploadedFile
      ? {
          fileName: uploadedFile.name,
          fileSize: uploadedFile.sizeLabel,
          fileType: uploadedFile.fileType,
          filePreviewUrl: uploadedFile.previewUrl,
          transferredAtLabel: "Baru saja dicatat",
          transferredBy: "Bendahara BBJ",
          referenceNumber: `TRF-BBJ-${item.id.toUpperCase()}`,
        }
      : undefined;

    // Preview URL dipindahkan ke item tabel bila tersedia agar tetap dapat dilihat
    previewUrlRef.current = null;
    onConfirm(proof);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-neutral-950/55 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-confirm-paid-title"
        className="relative z-10 flex w-full max-w-[480px] flex-col gap-5 rounded-3xl border border-neutral-200 bg-surface p-6 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="space-y-1.5">
          <h3
            id="modal-confirm-paid-title"
            className="font-heading-h3 text-xl font-bold leading-tight text-neutral-900"
          >
            Tandai sudah dibayar?
          </h3>
          <p className="font-body-m text-sm leading-relaxed text-neutral-600">
            Pastikan dana reimburse telah ditransfer ke rekening atau e-wallet
            tujuan sebelum menandai pengajuan ini selesai.
          </p>
        </div>

        {/* Kartu ringkasan pengajuan */}
        <div className="space-y-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          {summaryRows.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-neutral-500">{row.label}</span>
              <span
                className={cn(
                  "text-right",
                  row.emphasize
                    ? "font-bold text-neutral-900 tabular-nums"
                    : "font-medium text-neutral-800",
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Unggah bukti transfer opsional */}
        <FileUpload
          label="Bukti Transfer (Opsional)"
          description={REIMBURSE_UPLOAD_DEFAULT_DESC}
          accept=".jpg,.jpeg,.png,.pdf"
          state={uploadError ? "error" : uploadedFile ? "uploaded" : "default"}
          fileName={uploadedFile?.name}
          fileSize={uploadedFile?.sizeLabel}
          errorMessage={uploadError ?? undefined}
          onFileSelect={handleFileSelect}
          onRemove={handleRemoveFile}
        />

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Kembali
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleConfirm}
            className="shadow-pop-xs"
          >
            Konfirmasi Selesai
          </Button>
        </div>
      </div>
    </div>
  );
}
