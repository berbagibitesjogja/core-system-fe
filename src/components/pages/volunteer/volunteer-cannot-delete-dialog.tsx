import { Button } from "#/components/ui/button";
import type { VolunteerRecord } from "./volunteer-data";
import { VolunteerIllustrationDialog } from "./volunteer-illustration-dialog";

export interface VolunteerCannotDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  volunteer: VolunteerRecord | null;
}

/**
 * VolunteerCannotDeleteDialog: Modal gagal hapus volunteer (409 — Terikat Data) sesuai Figma 149:21949.
 */
export function VolunteerCannotDeleteDialog({
  isOpen,
  onClose,
  volunteer,
}: VolunteerCannotDeleteDialogProps) {
  const firstName = (volunteer?.name || "Kevin Halim").split(" ")[0] || "Kevin";

  return (
    <VolunteerIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="volunteer-cannot-delete-modal-title"
      title="Volunteer tidak dapat dihapus"
      illustrationAlt="Ilustrasi volunteer tidak dapat dihapus"
      description={`${firstName} masih terikat pada penugasan war aktif atau pengajuan reimburse. Selesaikan dulu, lalu coba hapus lagi.`}
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          Mengerti
        </Button>
      }
    />
  );
}
