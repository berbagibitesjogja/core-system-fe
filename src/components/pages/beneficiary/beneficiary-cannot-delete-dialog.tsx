import { Button } from "#/components/ui/button";
import { idBeneficiary } from "#/locales";
import { BeneficiaryIllustrationDialog } from "./beneficiary-illustration-dialog";

export interface BeneficiaryCannotDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * BeneficiaryCannotDeleteDialog: Modal pemberitahuan gagal hapus (409) karena masih memiliki riwayat distribusi (Figma 138:9986).
 */
export function BeneficiaryCannotDeleteDialog({
  isOpen,
  onClose,
}: BeneficiaryCannotDeleteDialogProps) {
  return (
    <BeneficiaryIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="beneficiary-cannot-delete-modal-title"
      title={idBeneficiary.dialogs.cannotDeleteTitle}
      illustrationAlt={idBeneficiary.dialogs.cannotDeleteAlt}
      description={idBeneficiary.dialogs.cannotDeleteDescription}
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          {idBeneficiary.dialogs.cannotDeleteButton}
        </Button>
      }
    />
  );
}
