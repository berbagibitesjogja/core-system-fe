import { Button } from "#/components/ui/button";
import { idPartner } from "#/locales";
import { PartnerIllustrationDialog } from "./partner-illustration-dialog";

export interface PartnerCannotDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PartnerCannotDeleteDialog: Modal pemberitahuan gagal hapus (409) karena donatur masih memiliki riwayat donasi (Figma 142:14590).
 */
export function PartnerCannotDeleteDialog({
  isOpen,
  onClose,
}: PartnerCannotDeleteDialogProps) {
  return (
    <PartnerIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="partner-cannot-delete-modal-title"
      title={idPartner.dialogs.cannotDeleteTitle}
      illustrationAlt={idPartner.dialogs.cannotDeleteAlt}
      description={idPartner.dialogs.cannotDeleteDescription}
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          {idPartner.dialogs.cannotDeleteConfirm}
        </Button>
      }
    />
  );
}
