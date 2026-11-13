import { FileText } from "lucide-react";
import { Dialog } from "#/components/ui/dialog";
import { formatRupiah } from "./reimburse-data";
import type { ReimburseHistoryItem } from "./reimburse-data";
import {
  ReimburseDocumentPreviewBody,
  openReimburseDocumentInNewTab,
} from "./reimburse-document-preview";
import type { ReimbursePreviewMetaItem } from "./reimburse-document-preview";

export interface ReimburseTransferProofDialogProps {
  item: ReimburseHistoryItem | null;
  onClose: () => void;
}

/**
 * ReimburseTransferProofDialog: Modal pratinjau bukti transfer untuk pengajuan berstatus Selesai.
 */
export function ReimburseTransferProofDialog({
  item,
  onClose,
}: ReimburseTransferProofDialogProps) {
  if (!item || item.status !== "Selesai") return null;

  const proof = item.transferProof;

  const metaItems: ReimbursePreviewMetaItem[] = [
    {
      id: "destination",
      label: "Tujuan Transfer",
      value: `${item.method} · ${item.destinationNumber}`,
    },
    {
      id: "amount",
      label: "Nominal Ditransfer",
      value: formatRupiah(item.amount),
    },
    {
      id: "transferredAt",
      label: "Tanggal Transfer",
      value: proof?.transferredAtLabel ?? item.dateLabel,
    },
    {
      id: "transferredBy",
      label: "Diproses Oleh",
      value: proof?.transferredBy ?? "Bendahara BBJ",
    },
    ...(proof?.referenceNumber
      ? [
          {
            id: "reference",
            label: "No. Referensi",
            value: proof.referenceNumber,
          },
        ]
      : []),
    ...(proof
      ? [
          {
            id: "size",
            label: "Ukuran Berkas",
            value: proof.fileSize,
          },
        ]
      : []),
  ];

  return (
    <Dialog
      isOpen={Boolean(item)}
      onClose={onClose}
      title="Bukti Transfer Reimburse"
      description="Rincian pembayaran dan lampiran bukti transfer yang telah diproses."
      icon={<FileText className="size-6" />}
      iconTone="success"
      cancelText="Tutup"
      confirmText={proof?.filePreviewUrl ? "Buka Bukti Transfer" : undefined}
      onConfirm={
        proof?.filePreviewUrl
          ? () => openReimburseDocumentInNewTab(proof.filePreviewUrl)
          : undefined
      }
      className="max-w-[540px]"
    >
      <ReimburseDocumentPreviewBody
        status={item.status}
        metaItems={metaItems}
        fileName={proof?.fileName}
        fileType={proof?.fileType}
        filePreviewUrl={proof?.filePreviewUrl}
        placeholderTone="success"
        placeholderBadgeLabel={proof ? "Transfer Terkonfirmasi" : undefined}
        emptyPreviewTitle={proof?.fileName ?? "Belum ada berkas bukti transfer"}
        emptyPreviewDescription={
          proof
            ? `Dana sebesar ${formatRupiah(item.amount)} telah dikirim ke ${item.method} (${item.destinationNumber}). Berkas contoh ini tersimpan untuk pratinjau UI.`
            : "Pengajuan telah ditandai selesai oleh bendahara tanpa lampiran berkas bukti transfer."
        }
      />
    </Dialog>
  );
}
