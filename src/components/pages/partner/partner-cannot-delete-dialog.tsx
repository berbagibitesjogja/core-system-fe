import { Button } from "#/components/ui/button";
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
      title="Donatur tidak dapat dihapus"
      illustrationAlt="Ilustrasi donatur tidak dapat dihapus"
      description="Donatur ini masih memiliki riwayat donasi tercatat, jadi datanya perlu disimpan."
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          Mengerti
        </Button>
      }
    />
  );
}
