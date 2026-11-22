import { FileText } from "lucide-react";
import { Dialog } from "#/components/ui/dialog";
import { idReimburse } from "#/locales";
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
      label: idReimburse.dialogs.filePreviewDestinationLabel,
      value: `${item.method} · ${item.destinationNumber}`,
    },
    {
      id: "date",
      label: idReimburse.dialogs.filePreviewDateLabel,
      value: item.dateLabel,
    },
    {
      id: "amount",
      label: idReimburse.dialogs.filePreviewAmountLabel,
      value: formatRupiah(item.amount),
    },
    {
      id: "size",
      label: idReimburse.dialogs.filePreviewSizeLabel,
      value: item.fileSize,
    },
  ];

  return (
    <Dialog
      isOpen={Boolean(item)}
      onClose={onClose}
      title={item.fileName}
      description={idReimburse.dialogs.filePreviewDescription}
      icon={<FileText className="size-6" />}
      cancelText={idReimburse.dialogs.filePreviewCloseButton}
      confirmText={
        item.filePreviewUrl
          ? idReimburse.dialogs.filePreviewOpenButton
          : undefined
      }
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
        emptyPreviewDescription={idReimburse.dialogs.filePreviewEmptyDesc}
      />
    </Dialog>
  );
}
