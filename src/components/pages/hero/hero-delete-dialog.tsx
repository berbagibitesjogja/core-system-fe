import { Button } from "#/components/ui/button";
import { idHero } from "#/locales/id/hero";
import type { HeroRecord } from "./hero-data";
import { HeroIllustrationDialog } from "./hero-illustration-dialog";

export interface HeroDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hero: HeroRecord | null;
  isLoading?: boolean;
}

/**
 * HeroDeleteDialog: Modal konfirmasi tindakan sebelum menghapus data hero (Figma 147:18001).
 */
export function HeroDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  hero,
  isLoading = false,
}: HeroDeleteDialogProps) {
  return (
    <HeroIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      disableDismiss={isLoading}
      titleId="hero-delete-modal-title"
      title={idHero.dialogs.deleteTitle}
      illustrationAlt={idHero.dialogs.deleteAlt}
      description={
        <>
          {idHero.dialogs.deleteDescriptionPrefix}
          <span className="font-semibold text-neutral-900">
            {hero?.name || idHero.dialogs.deleteDefaultTarget}
          </span>
          {idHero.dialogs.deleteDescriptionSuffix}
        </>
      }
      footer={
        <>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            {idHero.dialogs.deleteCancelButton}
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={idHero.dialogs.deletingButton}
          >
            {idHero.dialogs.deleteSubmitButton}
          </Button>
        </>
      }
    />
  );
}
