import * as React from "react";
import { Button } from "#/components/ui/button";
import raguHapusSvg from "#/assets/illustrations/ragu-hapus.svg";

export interface DonationLeaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * DonationLeaveDialog: Modal konfirmasi keluar tanpa simpan (Figma Node 122:5232).
 * Muncul saat admin menekan Batal atau Kembali pada formulir yang memiliki perubahan belum tersimpan.
 */
export function DonationLeaveDialog({
  isOpen,
  onClose,
  onConfirm,
}: DonationLeaveDialogProps) {
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
        className="fixed inset-0 bg-[#0b1416]/55 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Konten Modal Dialog 440px Rounded 24px */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-leave-title"
        className="relative z-10 w-full max-w-[460px] rounded-[24px] bg-white p-6 shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-200 transition-all animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-6"
      >
        {/* Body dengan Ilustrasi di Kiri & Teks di Kanan */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
          <div className="size-[130px] sm:size-[150px] shrink-0 flex items-center justify-center select-none pointer-events-none">
            <img
              src={raguHapusSvg}
              alt="Ilustrasi ragu tinggalkan halaman"
              className="size-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-0 text-center sm:text-left pt-1">
            <h3
              id="modal-leave-title"
              className="font-heading text-lg sm:text-xl font-bold text-neutral-900 leading-snug"
            >
              Tinggalkan halaman ini?
            </h3>
            <p className="font-caption text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Perubahan yang kamu buat belum disimpan dan akan hilang jika
              keluar sekarang.
            </p>
          </div>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="flex items-center justify-end gap-3 pt-1 border-t border-neutral-100">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Tetap di sini
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirm}
            className="drop-shadow-[0px_2px_0px_#142023]"
          >
            Keluar tanpa simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
