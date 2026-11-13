import * as React from "react";
import raguHapusSvg from "#/assets/illustrations/volunteer-thinking.svg";
import { Button } from "#/components/ui/button";

export interface ProfileLeaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * ProfileLeaveDialog: Modal konfirmasi keluar tanpa simpan pada halaman Profil
 * (Figma Node 157:26738).
 */
export function ProfileLeaveDialog({
  isOpen,
  onClose,
  onConfirm,
}: ProfileLeaveDialogProps) {
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
      {/* Backdrop Modal */}
      <div
        className="fixed inset-0 bg-neutral-950/55 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200 motion-reduce:animate-none"
        onClick={onClose}
      />

      {/* Konten Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-leave-modal-title"
        className="relative z-10 w-full max-w-[440px] rounded-xl bg-surface p-6 shadow-lg border border-neutral-200 transition-all animate-in fade-in zoom-in-95 duration-150 motion-reduce:animate-none flex flex-col gap-6"
      >
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
              id="profile-leave-modal-title"
              className="font-heading text-xl font-bold text-neutral-900 leading-tight"
            >
              Tinggalkan halaman ini?
            </h3>
            <p className="font-sans text-sm text-neutral-600 leading-relaxed">
              Perubahan data profil kamu belum disimpan dan akan hilang jika
              keluar sekarang.
            </p>
          </div>
        </div>

        {/* Tombol Aksi Modal */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Tetap di sini
          </Button>
          <Button type="button" variant="primary" size="md" onClick={onConfirm}>
            Keluar tanpa simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
