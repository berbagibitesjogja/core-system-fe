import { Button } from "#/components/ui/button";
import { HeroIllustrationDialog } from "./hero-illustration-dialog";

export interface HeroCannotDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * HeroCannotDeleteDialog: Modal peringatan gagal hapus hero yang memiliki riwayat pengambilan donasi (Figma 147:18215).
 */
export function HeroCannotDeleteDialog({
  isOpen,
  onClose,
}: HeroCannotDeleteDialogProps) {
  return (
    <HeroIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="hero-cannot-delete-modal-title"
      title="Hero tidak dapat dihapus"
      illustrationAlt="Ilustrasi hero tidak dapat dihapus"
      description="Hero ini memiliki riwayat pengambilan donasi tercatat. Jika tidak boleh menerima donasi lagi, blokir hero ini saja."
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          Mengerti
        </Button>
      }
    />
  );
}
