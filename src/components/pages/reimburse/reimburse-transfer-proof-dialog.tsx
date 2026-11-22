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
      label: idReimburse.dialogs.transferProofDestinationLabel,
      value: `${item.method} · ${item.destinationNumber}`,
    },
    {
      id: "amount",
      label: idReimburse.dialogs.transferProofAmountLabel,
      value: formatRupiah(item.amount),
    },
    {
      id: "transferredAt",
      label: idReimburse.dialogs.transferProofDateLabel,
      value: proof?.transferredAtLabel ?? item.dateLabel,
    },
    {
      id: "transferredBy",
      label: idReimburse.dialogs.transferProofProcessedByLabel,
      value:
        proof?.transferredBy ??
        idReimburse.dialogs.transferProofDefaultProcessor,
    },
    ...(proof?.referenceNumber
      ? [
          {
            id: "reference",
            label: idReimburse.dialogs.transferProofReferenceLabel,
            value: proof.referenceNumber,
          },
        ]
      : []),
    ...(proof
      ? [
          {
            id: "size",
            label: idReimburse.dialogs.transferProofSizeLabel,
            value: proof.fileSize,
          },
        ]
      : []),
  ];

  return (
    <Dialog
      isOpen={Boolean(item)}
      onClose={onClose}
      title={idReimburse.dialogs.transferProofTitle}
      description={idReimburse.dialogs.transferProofDescription}
      icon={<FileText className="size-6" />}
      iconTone="success"
      cancelText={idReimburse.dialogs.transferProofClose}
      confirmText={
        proof?.filePreviewUrl
          ? idReimburse.dialogs.transferProofOpen
          : undefined
      }
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
        placeholderBadgeLabel={
          proof ? idReimburse.dialogs.transferProofConfirmedBadge : undefined
        }
        emptyPreviewTitle={
          proof?.fileName ?? idReimburse.dialogs.transferProofEmptyTitle
        }
        emptyPreviewDescription={
          proof
            ? idReimburse.dialogs.transferProofEmptyDescWithProof(
                formatRupiah(item.amount),
                item.method,
                item.destinationNumber,
              )
            : idReimburse.dialogs.transferProofEmptyDescNoProof
        }
      />
    </Dialog>
  );
}
