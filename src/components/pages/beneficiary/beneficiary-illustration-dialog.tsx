import * as React from "react";
import raguHapusSvg from "#/assets/illustrations/ragu-hapus.svg";

export interface BeneficiaryIllustrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  description: React.ReactNode;
  footer: React.ReactNode;
  illustrationAlt?: string;
  disableDismiss?: boolean;
}

/**
 * BeneficiaryIllustrationDialog: Kerangka modal ilustrasi untuk konfirmasi dan peringatan hapus penerima manfaat.
 */
export function BeneficiaryIllustrationDialog({
  isOpen,
  onClose,
  titleId,
  title,
  description,
  footer,
  illustrationAlt = "Ilustrasi konfirmasi tindakan",
  disableDismiss = false,
}: BeneficiaryIllustrationDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableDismiss) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, disableDismiss]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1416]/55 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
      onClick={(e) => {
        if (e.target === e.currentTarget && !disableDismiss) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[440px] flex flex-col gap-6 shadow-2xl border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        {/* Isi Modal: Ilustrasi Ragu Hapus + Teks Informasi */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="shrink-0 size-[160px] flex items-center justify-center">
            <img
              src={raguHapusSvg}
              alt={illustrationAlt}
              className="size-full object-contain"
              draggable={false}
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-0 text-center sm:text-left">
            <h2
              id={titleId}
              className="font-['Gabarito'] font-semibold text-[20px] leading-[28px] text-[#142023]"
            >
              {title}
            </h2>
            <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b]">
              {description}
            </p>
          </div>
        </div>

        {/* Footer Modal: Aksi Tombol */}
        <div className="flex items-center justify-end gap-3 w-full">
          {footer}
        </div>
      </div>
    </div>
  );
}
