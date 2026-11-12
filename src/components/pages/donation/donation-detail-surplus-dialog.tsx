import * as React from "react";
import { X } from "lucide-react";
import raguHapusSvg from "#/assets/illustrations/volunteer-thinking.svg";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { IconButton } from "#/components/ui/icon-button";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import type {
  DonationSurplusFoodItem,
  DonationSurplusFormValues,
  DonationSurplusUnit,
} from "./donation-detail-data";

export interface DonationDetailSurplusDialogProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialFood?: DonationSurplusFoodItem | null;
  onClose: () => void;
  onSubmit: (values: DonationSurplusFormValues) => void;
}

interface SurplusFormErrors {
  name?: string;
  weight?: string;
}

const SURPLUS_UNITS: Array<{ value: DonationSurplusUnit; label: string }> = [
  { value: "gr", label: "gr" },
  { value: "ml", label: "ml" },
];

/**
 * DonationDetailSurplusDialog: Modal tambah dan edit item surplus food beserta satuan gr/ml dan penanda basi (Figma 124:5548).
 */
export function DonationDetailSurplusDialog({
  isOpen,
  mode,
  initialFood = null,
  onClose,
  onSubmit,
}: DonationDetailSurplusDialogProps) {
  const [name, setName] = React.useState("");
  const [quantityText, setQuantityText] = React.useState("");
  const [weightText, setWeightText] = React.useState("");
  const [unit, setUnit] = React.useState<DonationSurplusUnit>("gr");
  const [isSpoiled, setIsSpoiled] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState<SurplusFormErrors>({});
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialFood) {
      setName(initialFood.name);
      setQuantityText(
        initialFood.quantity !== undefined ? String(initialFood.quantity) : "",
      );
      setWeightText(String(initialFood.weight));
      setUnit(initialFood.unit);
      setIsSpoiled(initialFood.isSpoiled);
      setNotes(initialFood.notes ?? "");
    } else {
      setName("");
      setQuantityText("");
      setWeightText("");
      setUnit("gr");
      setIsSpoiled(false);
      setNotes("");
    }
    setErrors({});

    const timer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 30);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, mode, initialFood, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: SurplusFormErrors = {};
    const trimmedName = name.trim();
    const parsedWeight = Number(weightText);

    if (!trimmedName) {
      nextErrors.name = "Nama makanan wajib diisi.";
    }
    if (!weightText.trim() || Number.isNaN(parsedWeight) || parsedWeight <= 0) {
      nextErrors.weight = "Berat harus lebih besar dari 0.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const trimmedQty = quantityText.trim();
    const parsedQty = trimmedQty ? Number(trimmedQty) : undefined;

    onSubmit({
      name: trimmedName,
      quantity:
        parsedQty !== undefined && !Number.isNaN(parsedQty) && parsedQty > 0
          ? parsedQty
          : undefined,
      weight: parsedWeight,
      unit,
      isSpoiled,
      notes: notes.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1416]/55 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="surplus-dialog-title"
    >
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[480px] shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-100">
          <div>
            <h2
              id="surplus-dialog-title"
              className="font-heading-h3 text-neutral-900"
            >
              {mode === "edit" ? "Edit Surplus Food" : "Tambah Surplus Food"}
            </h2>
            <p className="font-sans text-sm text-neutral-600 mt-0.5">
              Catat detail makanan yang masuk ke inventaris aksi donasi.
            </p>
          </div>
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Tutup modal surplus food"
            tooltip="Tutup"
            onClick={onClose}
          >
            <X className="size-4" />
          </IconButton>
        </div>

        {/* Form Surplus Food */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <Input
            ref={nameInputRef}
            label="Nama Makanan"
            placeholder="Contoh: Roti Manis"
            value={name}
            error={errors.name}
            showHelper={Boolean(errors.name)}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className="max-w-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <Input
              label="Jumlah (Opsional)"
              type="number"
              min={1}
              placeholder="Contoh: 40"
              value={quantityText}
              showHelper={false}
              onChange={(e) => setQuantityText(e.target.value)}
              className="max-w-none"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="surplus-weight-input"
                  className="font-label text-sm font-semibold text-neutral-900"
                >
                  Berat
                </label>
                <div className="inline-flex rounded-full bg-neutral-100 p-0.5 border border-neutral-200">
                  {SURPLUS_UNITS.map((option) => {
                    const isSelected = unit === option.value;
                    return (
                      <Button
                        key={option.value}
                        type="button"
                        variant={isSelected ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setUnit(option.value)}
                        className="h-6 px-2.5 text-xs rounded-full shadow-none"
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <Input
                id="surplus-weight-input"
                type="number"
                min={1}
                showLabel={false}
                placeholder={`Contoh: 2500 (${unit})`}
                value={weightText}
                error={errors.weight}
                showHelper={Boolean(errors.weight)}
                onChange={(e) => {
                  setWeightText(e.target.value);
                  if (errors.weight) {
                    setErrors((prev) => ({ ...prev, weight: undefined }));
                  }
                }}
                className="max-w-none"
              />
            </div>
          </div>

          <div className="pt-1">
            <Checkbox
              checked={isSpoiled}
              onChange={setIsSpoiled}
              label="Basi / Tidak Layak"
            />
          </div>

          <Textarea
            label="Keterangan (Opsional)"
            rows={3}
            placeholder="Catatan kondisi makanan atau instruksi penyimpanan..."
            value={notes}
            showHelper={false}
            onChange={(e) => setNotes(e.target.value)}
            className="max-w-none"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Makanan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export interface DonationSurplusDeleteDialogProps {
  food: DonationSurplusFoodItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * DonationSurplusDeleteDialog: Modal konfirmasi penghapusan item surplus food.
 */
export function DonationSurplusDeleteDialog({
  food,
  onClose,
  onConfirm,
}: DonationSurplusDeleteDialogProps) {
  React.useEffect(() => {
    if (!food) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [food, onClose]);

  if (!food) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1416]/55 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-surplus-title"
    >
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[440px] flex flex-col gap-6 shadow-[0px_20px_24px_rgba(20,32,35,0.16)] border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="shrink-0 size-[136px] flex items-center justify-center">
            <img
              src={raguHapusSvg}
              alt="Konfirmasi hapus surplus food"
              className="size-full object-contain"
              draggable={false}
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1 min-w-0 text-center sm:text-left">
            <h2
              id="delete-surplus-title"
              className="font-heading-h3 text-neutral-900"
            >
              Hapus Surplus Food?
            </h2>
            <p className="font-sans text-sm leading-relaxed text-neutral-600">
              Item{" "}
              <span className="font-semibold text-neutral-900">
                {food.name}
              </span>{" "}
              akan dihapus permanen dari catatan donasi ini.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-full">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            Hapus Makanan
          </Button>
        </div>
      </div>
    </div>
  );
}
