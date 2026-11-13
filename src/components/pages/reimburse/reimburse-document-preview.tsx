import {
  CheckCircle2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import { REIMBURSE_STATUS_BADGE_TONE } from "./reimburse-data";
import type { ReimburseHistoryStatus } from "./reimburse-data";

export interface ReimbursePreviewMetaItem {
  id: string;
  label: string;
  value: string;
}

export interface ReimburseDocumentPreviewBodyProps {
  status: ReimburseHistoryStatus;
  metaItems: ReimbursePreviewMetaItem[];
  fileName?: string;
  fileType?: "image" | "pdf";
  filePreviewUrl?: string;
  emptyPreviewTitle: string;
  emptyPreviewDescription: string;
  pdfReadyDescription?: string;
  placeholderTone?: "brand" | "success";
  placeholderBadgeLabel?: string;
}

// Membuka URL berkas pratinjau di tab browser baru secara aman
export function openReimburseDocumentInNewTab(url?: string) {
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/**
 * ReimburseDocumentPreviewBody: Konten pratinjau dokumen & ringkasan metadata bersama untuk dialog reimburse.
 */
export function ReimburseDocumentPreviewBody({
  status,
  metaItems,
  fileName,
  fileType = "image",
  filePreviewUrl,
  emptyPreviewTitle,
  emptyPreviewDescription,
  pdfReadyDescription = "Dokumen PDF siap dibuka di tab baru untuk pratinjau penuh.",
  placeholderTone = "brand",
  placeholderBadgeLabel,
}: ReimburseDocumentPreviewBodyProps) {
  const isPdf = fileType === "pdf";
  const isSuccessTone = placeholderTone === "success";

  return (
    <div className="flex flex-col gap-4">
      {/* Ringkasan Metadata Pengajuan */}
      <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3.5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-label text-xs font-semibold text-neutral-600">
            Status Pengajuan
          </span>
          <Badge
            tone={REIMBURSE_STATUS_BADGE_TONE[status]}
            styleVariant="soft"
            dot
          >
            {status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {metaItems.map((meta) => (
            <div key={meta.id} className="space-y-0.5 min-w-0">
              <p className="font-sans text-[11px] font-medium text-neutral-500">
                {meta.label}
              </p>
              <p className="font-label text-xs font-semibold text-neutral-900 truncate">
                {meta.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Area Pratinjau Visual Berkas */}
      {filePreviewUrl && !isPdf ? (
        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-2 flex items-center justify-center max-h-[320px] overflow-hidden">
          <img
            src={filePreviewUrl}
            alt={`Pratinjau ${fileName || emptyPreviewTitle}`}
            className="max-h-[300px] w-auto rounded-sm object-contain"
          />
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-5 py-8 flex flex-col items-center justify-center text-center gap-2.5">
          <div
            className={cn(
              "size-12 rounded-full flex items-center justify-center",
              isSuccessTone
                ? "bg-green-50 text-green-700"
                : "bg-bondi-50 text-brand",
            )}
          >
            {isPdf ? (
              <FileText className="size-6" />
            ) : isSuccessTone ? (
              <CheckCircle2 className="size-6" />
            ) : (
              <ImageIcon className="size-6" />
            )}
          </div>

          {placeholderBadgeLabel && (
            <Badge tone="success" styleVariant="soft" dot>
              {placeholderBadgeLabel}
            </Badge>
          )}

          <div className="space-y-1 max-w-[360px]">
            <p className="font-label text-sm font-semibold text-neutral-900 break-all">
              {emptyPreviewTitle}
            </p>
            <p className="font-body text-xs leading-4 text-neutral-600">
              {isPdf && filePreviewUrl
                ? pdfReadyDescription
                : emptyPreviewDescription}
            </p>
          </div>

          {filePreviewUrl && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
              <ExternalLink className="size-3.5" />
              Siap dibuka di tab baru
            </span>
          )}
        </div>
      )}
    </div>
  );
}
