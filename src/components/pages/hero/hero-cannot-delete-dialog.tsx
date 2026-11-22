import { Button } from "#/components/ui/button";
import { idHero } from "#/locales/id/hero";
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
      title={idHero.dialogs.cannotDeleteTitle}
      illustrationAlt={idHero.dialogs.cannotDeleteAlt}
      description={idHero.dialogs.cannotDeleteDescription}
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          {idHero.dialogs.cannotDeleteButton}
        </Button>
      }
    />
  );
}
