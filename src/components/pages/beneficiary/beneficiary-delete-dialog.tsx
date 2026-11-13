import { Button } from "#/components/ui/button";
import type { BeneficiaryItem } from "./beneficiary-data";
import { BeneficiaryIllustrationDialog } from "./beneficiary-illustration-dialog";

export interface BeneficiaryDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  beneficiary: BeneficiaryItem | null;
  isLoading?: boolean;
}

/**
 * BeneficiaryDeleteDialog: Modal konfirmasi tindakan sebelum menghapus kelompok penerima manfaat (Figma 138:9855).
 */
export function BeneficiaryDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  beneficiary,
  isLoading = false,
}: BeneficiaryDeleteDialogProps) {
  return (
    <BeneficiaryIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      disableDismiss={isLoading}
      titleId="beneficiary-delete-modal-title"
      title="Konfirmasi Tindakan"
      illustrationAlt="Ilustrasi konfirmasi hapus"
      description={
        <>
          Apakah Anda yakin ingin menghapus penerima manfaat{" "}
          <span className="font-semibold text-neutral-900">
            {beneficiary?.name || "ini"}
          </span>
          ? Tindakan ini tidak dapat dibatalkan.
        </>
      }
      footer={
        <>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Menghapus..."
          >
            Hapus Penerima
          </Button>
        </>
      }
    />
  );
}
