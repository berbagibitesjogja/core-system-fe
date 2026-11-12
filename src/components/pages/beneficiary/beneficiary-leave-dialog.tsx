import { Button } from "#/components/ui/button";
import { BeneficiaryIllustrationDialog } from "./beneficiary-illustration-dialog";

export interface BeneficiaryLeaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * BeneficiaryLeaveDialog: Modal konfirmasi keluar halaman saat formulir belum disimpan.
 */
export function BeneficiaryLeaveDialog({
  isOpen,
  onClose,
  onConfirm,
}: BeneficiaryLeaveDialogProps) {
  return (
    <BeneficiaryIllustrationDialog
      isOpen={isOpen}
      onClose={onClose}
      titleId="modal-leave-beneficiary-title"
      title="Tinggalkan halaman ini?"
      description="Perubahan yang kamu buat belum disimpan dan akan hilang jika keluar sekarang."
      illustrationAlt="Ilustrasi ragu tinggalkan halaman beneficiary"
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
