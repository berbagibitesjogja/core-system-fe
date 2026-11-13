import { Button } from "#/components/ui/button";
import { PartnerIllustrationDialog } from "./partner-illustration-dialog";

export interface PartnerLeaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * PartnerLeaveDialog: Modal konfirmasi keluar halaman saat formulir donatur belum disimpan.
 */
export function PartnerLeaveDialog({
  isOpen,
  onClose,
  onConfirm,
}: PartnerLeaveDialogProps) {
  return (
    <PartnerIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="modal-leave-partner-title"
      title="Tinggalkan halaman ini?"
      description="Perubahan yang kamu buat belum disimpan dan akan hilang jika keluar sekarang."
      illustrationAlt="Ilustrasi konfirmasi tinggalkan halaman partner"
      footer={
        <>
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Tetap di sini
          </Button>
          <Button type="button" variant="primary" size="md" onClick={onConfirm}>
            Keluar tanpa simpan
          </Button>
        </>
      }
    />
  );
}
