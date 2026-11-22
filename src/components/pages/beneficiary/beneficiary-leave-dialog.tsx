import { Button } from "#/components/ui/button";
import { idBeneficiary } from "#/locales";
import { BeneficiaryIllustrationDialog } from "./beneficiary-illustration-dialog";

export interface BeneficiaryLeaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * BeneficiaryLeaveDialog: Modal konfirmasi keluar halaman saat formulir belum disimpan.
 */
export function BeneficiaryLeaveDialog({
  isOpen,
  onClose,
  onConfirm,
}: BeneficiaryLeaveDialogProps) {
  return (
    <BeneficiaryIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="modal-leave-beneficiary-title"
      title={idBeneficiary.dialogs.leaveTitle}
      description={idBeneficiary.dialogs.leaveDescription}
      illustrationAlt={idBeneficiary.dialogs.leaveAlt}
      footer={
        <>
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            {idBeneficiary.dialogs.leaveCancel}
          </Button>
          <Button type="button" variant="primary" size="md" onClick={onConfirm}>
            {idBeneficiary.dialogs.leaveConfirm}
          </Button>
        </>
      }
    />
  );
}
