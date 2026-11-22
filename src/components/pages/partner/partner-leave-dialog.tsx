import { Button } from "#/components/ui/button";
import { idPartner } from "#/locales";
import { PartnerIllustrationDialog } from "./partner-illustration-dialog";

export interface PartnerLeaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * PartnerLeaveDialog: Modal konfirmasi keluar halaman saat formulir donatur belum disimpan.
 */
export function PartnerLeaveDialog({
  isOpen,
  onClose,
  onConfirm,
}: PartnerLeaveDialogProps) {
  return (
    <PartnerIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="modal-leave-partner-title"
      title={idPartner.dialogs.leaveTitle}
      description={idPartner.dialogs.leaveDescription}
      illustrationAlt={idPartner.dialogs.leaveAlt}
      footer={
        <>
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            {idPartner.dialogs.leaveStayButton}
          </Button>
          <Button type="button" variant="primary" size="md" onClick={onConfirm}>
            {idPartner.dialogs.leaveConfirmButton}
          </Button>
        </>
      }
    />
  );
}
