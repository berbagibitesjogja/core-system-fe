import { Button } from "#/components/ui/button";
import { idPartner } from "#/locales";
import type { PartnerRecord } from "./partner-data";
import { PartnerIllustrationDialog } from "./partner-illustration-dialog";

export interface PartnerDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  partner: PartnerRecord | null;
  isLoading?: boolean;
}

/**
 * PartnerDeleteDialog: Modal konfirmasi sebelum menghapus data mitra donatur (Figma 142:14343).
 */
export function PartnerDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  partner,
  isLoading = false,
}: PartnerDeleteDialogProps) {
  return (
    <PartnerIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      disableDismiss={isLoading}
      titleId="partner-delete-modal-title"
      title={idPartner.dialogs.deleteTitle}
      illustrationAlt={idPartner.dialogs.deleteAlt}
      description={idPartner.dialogs.deleteConfirm(
        partner?.name || idPartner.dialogs.deleteFallbackTarget,
      )}
      footer={
        <>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            {idPartner.form.cancelButton}
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={idPartner.dialogs.deletingButton}
          >
            {idPartner.dialogs.deleteButton}
          </Button>
        </>
      }
    />
  );
}
