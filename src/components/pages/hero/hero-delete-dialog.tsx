import { Button } from "#/components/ui/button";
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
      title="Hapus Hero"
      illustrationAlt="Ilustrasi konfirmasi hapus hero"
      description={
        <>
          Apakah Anda yakin ingin menghapus data{" "}
          <span className="font-semibold text-neutral-900">
            {hero?.name || "hero ini"}
          </span>
          ? Tindakan ini tidak dapat dibatalkan.
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
            Batal
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Menghapus..."
          >
            Hapus Hero
          </Button>
        </>
      }
    />
  );
}
