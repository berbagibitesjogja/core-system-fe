import { ExternalLink, FileText, Image as ImageIcon } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Dialog } from "#/components/ui/dialog";
import { REIMBURSE_STATUS_BADGE_TONE, formatRupiah } from "./reimburse-data";
import type { ReimburseHistoryItem } from "./reimburse-data";

export interface ReimburseFilePreviewDialogProps {
  item: ReimburseHistoryItem | null;
  onClose: () => void;
}

interface PreviewMetaItem {
  id: string;
  label: string;
  value: string;
}

/**
 * ReimburseFilePreviewDialog: Modal pratinjau berkas invoice/struk dari riwayat pengajuan.
 */
export function ReimburseFilePreviewDialog({
  item,
  onClose,
}: ReimburseFilePreviewDialogProps) {
  if (!item) return null;

  const isPdf = item.fileType === "pdf";

  const metaItems: PreviewMetaItem[] = [
    {
      id: "method",
      label: "Tujuan Transfer",
      value: `${item.method} · ${item.destinationNumber}`,
    },
    {
      id: "date",
      label: "Tanggal Pengajuan",
      value: item.dateLabel,
    },
    {
      id: "amount",
      label: "Nominal Terdeteksi",
      value: formatRupiah(item.amount),
    },
    {
      id: "size",
      label: "Ukuran Berkas",
      value: item.fileSize,
    },
  ];

  const handleOpenExternal = () => {
    if (item.filePreviewUrl) {
      window.open(item.filePreviewUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog
      isOpen={Boolean(item)}
      onClose={onClose}
      title={item.fileName}
      description="Pratinjau dokumen bukti transaksi reimburse."
      cancelText="Tutup"
      confirmText={item.filePreviewUrl ? "Buka Berkas" : undefined}
      onConfirm={item.filePreviewUrl ? handleOpenExternal : undefined}
      className="max-w-[540px]"
    >
      <div className="flex flex-col gap-4">
        {/* Ringkasan Metadata Pengajuan */}
        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3.5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-label text-xs font-semibold text-neutral-600">
              Status Pengajuan
            </span>
            <Badge
              tone={REIMBURSE_STATUS_BADGE_TONE[item.status]}
              styleVariant="soft"
              dot
            >
              {item.status}
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
        {item.filePreviewUrl && !isPdf ? (
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-2 flex items-center justify-center max-h-[320px] overflow-hidden">
            <img
              src={item.filePreviewUrl}
              alt={`Pratinjau ${item.fileName}`}
              className="max-h-[300px] w-auto rounded-sm object-contain"
            />
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-5 py-8 flex flex-col items-center justify-center text-center gap-2.5">
            <div className="size-12 rounded-full bg-bondi-50 text-brand flex items-center justify-center">
              {isPdf ? (
                <FileText className="size-6" />
              ) : (
                <ImageIcon className="size-6" />
              )}
            </div>
            <div className="space-y-1 max-w-[340px]">
              <p className="font-label text-sm font-semibold text-neutral-900">
                {item.fileName}
              </p>
              <p className="font-body text-xs leading-4 text-neutral-600">
                {isPdf && item.filePreviewUrl
                  ? "Dokumen PDF siap dibuka di tab baru untuk pratinjau penuh."
                  : "Berkas contoh bawaan tersimpan untuk keperluan pratinjau UI. Unggah berkas baru melalui form untuk melihat pratinjau gambar langsung."}
              </p>
            </div>
            {item.filePreviewUrl && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                <ExternalLink className="size-3.5" />
                Siap dibuka di tab baru
              </span>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}
