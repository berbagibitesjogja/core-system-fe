import * as React from "react";
import raguHapusSvg from "#/assets/illustrations/volunteer-thinking.svg";
import { FilterChip } from "#/components/shared/filter-chip";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { idDonation } from "#/locales";
import type {
  DonationSurplusFoodItem,
  DonationSurplusFormValues,
  DonationSurplusUnit,
} from "./donation-detail-data";

export interface DonationDetailSurplusDialogProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialFood?: DonationSurplusFoodItem | null;
  foodSuggestions?: Array<{ id: number; name: string }>;
  isSubmitting?: boolean;
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
  foodSuggestions = [],
  isSubmitting = false,
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
      nextErrors.name = idDonation.detail.surplusDialog.validationNameRequired;
    }
    if (!weightText.trim() || Number.isNaN(parsedWeight) || parsedWeight <= 0) {
      nextErrors.weight =
        idDonation.detail.surplusDialog.validationWeightPositive;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/55 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="surplus-dialog-title"
    >
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[520px] flex flex-col gap-5 shadow-[0px_20px_48px_-8px_rgba(20,32,35,0.16)] border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        {/* Header Modal */}
        <h2
          id="surplus-dialog-title"
          className="font-heading text-xl font-semibold leading-7 text-neutral-900"
        >
          {mode === "edit"
            ? idDonation.detail.surplusDialog.editTitle
            : idDonation.detail.surplusDialog.addTitle}
        </h2>

        {/* Form Surplus Food */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            ref={nameInputRef}
            label={idDonation.detail.surplusDialog.foodNameLabel}
            placeholder={idDonation.detail.surplusDialog.foodNamePlaceholder}
            value={name}
            error={errors.name}
            showHelper={Boolean(errors.name)}
            list="surplus-food-options"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className="max-w-none"
          />

          {foodSuggestions.length > 0 && (
            <datalist id="surplus-food-options">
              {foodSuggestions.map((item) => (
                <option key={item.id} value={item.name} />
              ))}
            </datalist>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 items-start">
            <Input
              label={idDonation.detail.surplusDialog.quantityLabel}
              type="number"
              min={1}
              placeholder={idDonation.detail.surplusDialog.quantityPlaceholder}
              helperText={idDonation.detail.surplusDialog.optionalHelper}
              value={quantityText}
              showHelper={true}
              onChange={(e) => setQuantityText(e.target.value)}
              className="max-w-none min-w-0"
            />

            <Input
              label={idDonation.detail.surplusDialog.weightLabel}
              type="number"
              min={1}
              placeholder={idDonation.detail.surplusDialog.weightPlaceholder}
              value={weightText}
              error={errors.weight}
              showHelper={Boolean(errors.weight)}
              onChange={(e) => {
                setWeightText(e.target.value);
                if (errors.weight) {
                  setErrors((prev) => ({ ...prev, weight: undefined }));
                }
              }}
              className="max-w-none min-w-0"
            />

            <div className="flex flex-col gap-[6px] items-start shrink-0">
              <span className="font-sans font-semibold text-sm leading-5 text-neutral-900 select-none">
                {idDonation.detail.surplusDialog.unitLabel}
              </span>
              <div className="min-h-[44px] flex items-center gap-2">
                {SURPLUS_UNITS.map((option) => (
                  <FilterChip
                    key={option.value}
                    label={option.label}
                    showCount={false}
                    selected={unit === option.value}
                    onClick={() => setUnit(option.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          <Checkbox
            checked={isSpoiled}
            onChange={setIsSpoiled}
            label={idDonation.detail.surplusDialog.spoiledCheckboxLabel}
          />

          <Textarea
            label={idDonation.detail.surplusDialog.notesLabel}
            helperText={idDonation.detail.surplusDialog.optionalHelper}
            rows={4}
            placeholder={idDonation.detail.surplusDialog.notesPlaceholder}
            value={notes}
            showHelper={true}
            onChange={(e) => setNotes(e.target.value)}
            className="max-w-none"
          />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {idDonation.detail.surplusDialog.cancelButton}
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {idDonation.detail.surplusDialog.saveButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export interface DonationSurplusDeleteDialogProps {
  food: DonationSurplusFoodItem | null;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * DonationSurplusDeleteDialog: Modal konfirmasi penghapusan item surplus food.
 */
export function DonationSurplusDeleteDialog({
  food,
  isDeleting = false,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/55 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
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
              alt={idDonation.detail.surplusDialog.deleteConfirmAlt}
              className="size-full object-contain"
              draggable={false}
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1 min-w-0 text-center sm:text-left">
            <h2
              id="delete-surplus-title"
              className="font-heading-h3 text-neutral-900"
            >
              {idDonation.detail.surplusDialog.deleteConfirmTitle}
            </h2>
            <p className="font-sans text-sm leading-relaxed text-neutral-600">
              {idDonation.detail.surplusDialog.deleteConfirmDesc(food.name)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            {idDonation.detail.surplusDialog.cancelButton}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            isLoading={isDeleting}
            disabled={isDeleting}
          >
            {isDeleting
              ? idDonation.detail.surplusDialog.deletingButton
              : idDonation.detail.surplusDialog.deleteButton}
          </Button>
        </div>
      </div>
    </div>
  );
}
