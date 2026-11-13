import * as React from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

export interface BeneficiaryAddSectorDialogProps {
  isOpen: boolean;
  beneficiaryName: string;
  existingSectorNames: string[];
  onClose: () => void;
  onSubmit: (sectorName: string) => Promise<void> | void;
  isSubmitting?: boolean;
}

/**
 * BeneficiaryAddSectorDialog: Modal tambah sektor baru untuk penerima manfaat (Figma 140:10318, 140:10513).
 * Memvalidasi input kosong serta duplikasi nama sektor dengan umpan balik Focus/Ring Danger.
 */
export function BeneficiaryAddSectorDialog({
  isOpen,
  beneficiaryName,
  existingSectorNames,
  onClose,
  onSubmit,
  isSubmitting = false,
}: BeneficiaryAddSectorDialogProps) {
  const [sectorName, setSectorName] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Reset form dan fokuskan input setiap kali modal dibuka
  React.useEffect(() => {
    if (isOpen) {
      setSectorName("");
      setErrorMessage("");
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Tutup modal via tombol Escape serta kunci scroll halaman
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
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
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = sectorName.trim();

    if (!trimmed) {
      setErrorMessage("Nama sektor wajib diisi.");
      inputRef.current?.focus();
      return;
    }

    const isDuplicate = existingSectorNames.some(
      (existing) => existing.trim().toLowerCase() === trimmed.toLowerCase(),
    );

    if (isDuplicate) {
      setErrorMessage(
        "Nama sektor sudah terdaftar untuk penerima manfaat ini.",
      );
      inputRef.current?.focus();
      return;
    }

    await onSubmit(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/55 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-sector-modal-title"
    >
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[480px] shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
          {/* Header Modal Tambah Sektor */}
          <div className="space-y-1">
            <h2
              id="add-sector-modal-title"
              className="font-['Gabarito'] text-xl font-semibold leading-7 text-neutral-900"
            >
              Tambah Sektor
            </h2>
            <p className="font-sans text-sm leading-5 text-neutral-600">
              Tambahkan sektor baru untuk {beneficiaryName}
            </p>
          </div>

          {/* Input Nama Sektor */}
          <Input
            ref={inputRef}
            id="sector-name-input"
            label="Nama Sektor"
            placeholder="Contoh: Kedokteran Gigi"
            helperText="Gunakan nama fakultas atau unit yang resmi."
            value={sectorName}
            onChange={(e) => {
              setSectorName(e.target.value);
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            error={errorMessage}
            disabled={isSubmitting}
            className="max-w-none"
          />

          {/* Footer Aksi Modal */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              loadingText="Menyimpan..."
            >
              Simpan Sektor
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
