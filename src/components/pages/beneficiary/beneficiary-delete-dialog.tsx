import { Button } from "#/components/ui/button";
import { idBeneficiary } from "#/locales";
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
      title={idBeneficiary.dialogs.deleteTitle}
      illustrationAlt={idBeneficiary.dialogs.deleteAlt}
      description={
        <>
          {idBeneficiary.dialogs.deleteConfirmPrefix}
          <span className="font-semibold text-neutral-900">
            {beneficiary?.name || idBeneficiary.dialogs.deleteFallbackTarget}
          </span>
          {idBeneficiary.dialogs.deleteConfirmSuffix}
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
            {idBeneficiary.dialogs.cancelButton}
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={idBeneficiary.dialogs.deletingButton}
          >
            {idBeneficiary.dialogs.deleteButton}
          </Button>
        </>
      }
    />
  );
}
