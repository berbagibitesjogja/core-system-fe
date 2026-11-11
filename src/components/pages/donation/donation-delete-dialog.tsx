import * as React from "react";
import { Button } from "#/components/ui/button";
import raguHapusSvg from "#/assets/illustrations/ragu-hapus.svg";
import type { DonationItem } from "./donation-data";

export interface DonationDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  donation: DonationItem | null;
  isLoading?: boolean;
}

/**
 * DonationDeleteDialog: Modal konfirmasi tindakan hapus donasi (Figma Node 119:3350).
 * Menampilkan ilustrasi resmi `IllustrationRaguHapus`, detail donatur, dan tombol aksi Batal / Hapus Donasi.
 */
export function DonationDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  donation,
  isLoading = false,
}: DonationDeleteDialogProps) {
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

  if (!isOpen || !donation) return null;

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
        aria-labelledby="modal-delete-title"
        className="relative z-10 w-full max-w-[480px] rounded-[24px] bg-white p-6 shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-200 transition-all animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-6"
      >
        {/* Body dengan Ilustrasi di Kiri & Teks di Kanan */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
          <div className="size-[140px] sm:size-[160px] shrink-0 flex items-center justify-center select-none pointer-events-none">
            <img
              src={raguHapusSvg}
              alt="Ilustrasi konfirmasi hapus donasi"
              className="size-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-0 text-center sm:text-left pt-1">
            <h3
              id="modal-delete-title"
              className="font-heading-h3 text-xl font-semibold text-neutral-900 leading-7"
            >
              Konfirmasi Tindakan
            </h3>
            <p className="font-sans text-sm text-neutral-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus donasi dari{" "}
              <strong className="text-neutral-900 font-semibold">
                {donation.donorName}
              </strong>{" "}
              pada tanggal{" "}
              <span className="text-neutral-900">
                {donation.day}, {donation.date}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>

        {/* Footer Tombol Aksi: Batal & Hapus Donasi */}
        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full shadow-2xs"
          >
            Batal
          </Button>

          <Button
            type="button"
            variant="danger"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            className="rounded-full shadow-pop-xs"
          >
            Hapus Donasi
          </Button>
        </div>
      </div>
    </div>
  );
}
