import { Button } from "#/components/ui/button";
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
      title="Hapus Donatur"
      illustrationAlt="Ilustrasi konfirmasi hapus donatur"
      description={
        <>
          Apakah Anda yakin ingin menghapus data{" "}
          <span className="font-semibold text-[#142023]">
            {partner?.name || "donatur ini"}
          </span>
          ? Semua data donasi terkait juga akan terpengaruh.
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
            Hapus Donatur
          </Button>
        </>
      }
    />
  );
}
