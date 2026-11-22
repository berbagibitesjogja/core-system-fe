import { Button } from "#/components/ui/button";
import { idVolunteer } from "#/locales";
import type { VolunteerRecord } from "./volunteer-data";
import { VolunteerIllustrationDialog } from "./volunteer-illustration-dialog";

export interface VolunteerDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  volunteer: VolunteerRecord | null;
  isLoading?: boolean;
}

/**
 * VolunteerDeleteDialog: Modal konfirmasi tindakan sebelum menghapus akun volunteer (Figma 149:21677).
 */
export function VolunteerDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  volunteer,
  isLoading = false,
}: VolunteerDeleteDialogProps) {
  const displayName = volunteer?.name || "Kevin Halim";

  return (
    <VolunteerIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      disableDismiss={isLoading}
      titleId="volunteer-delete-modal-title"
      title={idVolunteer.dialogs.deleteTitle}
      illustrationAlt={idVolunteer.dialogs.deleteAlt}
      description={idVolunteer.dialogs.deleteDescription(displayName)}
      footer={
        <>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            {idVolunteer.dialogs.deleteCancelButton}
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={idVolunteer.dialogs.deletingButton}
          >
            {idVolunteer.dialogs.deleteSubmitButton}
          </Button>
        </>
      }
    />
  );
}
