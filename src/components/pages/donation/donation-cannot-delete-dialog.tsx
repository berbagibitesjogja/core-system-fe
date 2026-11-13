import * as React from "react";
import { Button } from "#/components/ui/button";
import raguHapusSvg from "#/assets/illustrations/volunteer-thinking.svg";

export interface DonationCannotDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DonationCannotDeleteDialog: Modal peringatan saat donasi tidak dapat dihapus (Figma Node 119:3525).
 * Digunakan jika donasi telah memiliki keterkaitan dengan data klaim heroes atau surplus food.
 */
export function DonationCannotDeleteDialog({
  isOpen,
  onClose,
}: DonationCannotDeleteDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Gelap Sesuai Figma #0b1416 dengan Opacity 55% */}
      <div
        className="fixed inset-0 bg-neutral-950/55 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Konten Modal Dialog 440px Rounded 24px */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-cannot-delete-title"
        className="relative z-10 w-full max-w-[480px] rounded-[24px] bg-white p-6 shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-200 transition-all animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-6"
      >
        {/* Body dengan Ilustrasi di Kiri & Teks di Kanan */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
          <div className="size-[140px] sm:size-[160px] shrink-0 flex items-center justify-center select-none pointer-events-none">
            <img
              src={raguHapusSvg}
              alt="Ilustrasi donasi tidak dapat dihapus"
              className="size-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-0 text-center sm:text-left pt-1">
            <h3
              id="modal-cannot-delete-title"
              className="font-heading-h3 text-xl font-semibold text-neutral-900 leading-7"
            >
              Donasi tidak dapat dihapus
            </h3>
            <p className="font-sans text-sm text-neutral-600 leading-relaxed">
              Donasi ini sudah memiliki data klaim heroes atau surplus food.
              Hapus data terkait terlebih dahulu, lalu coba lagi.
            </p>
          </div>
        </div>

        {/* Footer Tombol Aksi: Mengerti */}
        <div className="flex items-center justify-end w-full">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="rounded-full shadow-2xs"
          >
            Mengerti
          </Button>
        </div>
      </div>
    </div>
  );
}
