import { FileText } from "lucide-react";
import { Dialog } from "#/components/ui/dialog";
import { formatRupiah } from "./reimburse-data";
import type { ReimburseHistoryItem } from "./reimburse-data";
import {
  ReimburseDocumentPreviewBody,
  openReimburseDocumentInNewTab,
} from "./reimburse-document-preview";
import type { ReimbursePreviewMetaItem } from "./reimburse-document-preview";

export interface ReimburseFilePreviewDialogProps {
  item: ReimburseHistoryItem | null;
  onClose: () => void;
}

/**
 * ReimburseFilePreviewDialog: Modal pratinjau berkas invoice/struk dari riwayat pengajuan.
 */
export function ReimburseFilePreviewDialog({
  item,
  onClose,
}: ReimburseFilePreviewDialogProps) {
  if (!item) return null;

  const metaItems: ReimbursePreviewMetaItem[] = [
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

  return (
    <Dialog
      isOpen={Boolean(item)}
      onClose={onClose}
      title={item.fileName}
      description="Pratinjau dokumen bukti transaksi reimburse."
      icon={<FileText className="size-6" />}
      cancelText="Tutup"
      confirmText={item.filePreviewUrl ? "Buka Berkas" : undefined}
      onConfirm={
        item.filePreviewUrl
          ? () => openReimburseDocumentInNewTab(item.filePreviewUrl)
          : undefined
      }
      className="max-w-[540px]"
    >
      <ReimburseDocumentPreviewBody
        status={item.status}
        metaItems={metaItems}
        fileName={item.fileName}
        fileType={item.fileType}
        filePreviewUrl={item.filePreviewUrl}
        emptyPreviewTitle={item.fileName}
        emptyPreviewDescription="Berkas contoh bawaan tersimpan untuk keperluan pratinjau UI. Unggah berkas baru melalui form untuk melihat pratinjau gambar langsung."
      />
    </Dialog>
  );
}
