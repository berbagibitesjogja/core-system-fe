import { Button } from "#/components/ui/button";
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
      title="Penerima tidak dapat dihapus"
      illustrationAlt="Ilustrasi penerima tidak dapat dihapus"
      description="Penerima manfaat ini masih memiliki riwayat distribusi donasi tercatat, jadi datanya perlu disimpan."
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          Mengerti
        </Button>
      }
    />
  );
}
