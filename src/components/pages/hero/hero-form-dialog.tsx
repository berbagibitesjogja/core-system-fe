import * as React from "react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { idHero } from "#/locales/id/hero";
import { normalizePhoneNumber } from "./hero-data";
import type {
  HeroBeneficiaryOption,
  HeroFormValues,
  HeroRecord,
} from "./hero-data";
import { HeroSelectField } from "./hero-select-field";
import type { HeroSelectOption } from "./hero-select-field";

export interface HeroFormDialogProps {
  isOpen: boolean;
  mode: "add" | "edit";
  hero?: HeroRecord | null;
  beneficiaries: HeroBeneficiaryOption[];
  existingHeroes: HeroRecord[];
  defaultBeneficiaryId?: string;
  defaultSectorId?: string;
  onClose: () => void;
  onSubmit: (values: HeroFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

interface HeroFormErrors {
  beneficiaryId?: string;
  sectorId?: string;
  name?: string;
  phone?: string;
}

/**
 * HeroFormDialog: Modal tambah hero baru dan edit data hero beserta validasi duplikasi nomor telepon dan opsi blokir (Figma 147:17452, 147:17522, 147:17762).
 */
export function HeroFormDialog({
  isOpen,
  mode,
  hero = null,
  beneficiaries,
  existingHeroes,
  defaultBeneficiaryId = "",
  defaultSectorId = "",
  onClose,
  onSubmit,
  isSubmitting = false,
}: HeroFormDialogProps) {
  const [formData, setFormData] = React.useState<HeroFormValues>({
    beneficiaryId: "",
    sectorId: "",
    name: "",
    phone: "",
    isBlocked: false,
  });
  const [errors, setErrors] = React.useState<HeroFormErrors>({});
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  // Sinkronkan nilai awal setiap kali modal dibuka
  React.useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && hero) {
      setFormData({
        beneficiaryId: hero.beneficiaryId,
        sectorId: hero.sectorId,
        name: hero.name,
        phone: hero.phone ?? "",
        isBlocked: hero.status === "diblokir",
      });
    } else {
      const initialBen =
        defaultBeneficiaryId && defaultBeneficiaryId !== "all"
          ? defaultBeneficiaryId
          : "";
      const initialBenObj = beneficiaries.find((b) => b.id === initialBen);
      const initialSec =
        initialBenObj &&
        defaultSectorId &&
        defaultSectorId !== "all" &&
        initialBenObj.sectors.some((s) => s.id === defaultSectorId)
          ? defaultSectorId
          : "";

      setFormData({
        beneficiaryId: initialBen,
        sectorId: initialSec,
        name: "",
        phone: "",
        isBlocked: false,
      });
    }

    setErrors({});
  }, [
    isOpen,
    mode,
    hero,
    beneficiaries,
    defaultBeneficiaryId,
    defaultSectorId,
  ]);

  // Tutup modal dengan Escape dan kunci scroll body
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

  const selectedBeneficiary = beneficiaries.find(
    (b) => b.id === formData.beneficiaryId,
  );

  const beneficiaryOptions: HeroSelectOption[] = React.useMemo(
    () =>
      beneficiaries.map((item) => ({
        id: item.id,
        label: item.name,
      })),
    [beneficiaries],
  );

  const sectorOptions: HeroSelectOption[] = React.useMemo(
    () =>
      selectedBeneficiary
        ? selectedBeneficiary.sectors.map((sec) => ({
            id: sec.id,
            label: sec.name,
          }))
        : [],
    [selectedBeneficiary],
  );

  const findDuplicatePhoneOwner = React.useCallback(
    (phoneValue: string): HeroRecord | undefined => {
      const normalizedInput = normalizePhoneNumber(phoneValue);
      if (!normalizedInput) return undefined;

      return existingHeroes.find((item) => {
        if (mode === "edit" && hero && item.id === hero.id) {
          return false;
        }
        const normalizedExisting = normalizePhoneNumber(item.phone);
        return (
          Boolean(normalizedExisting) && normalizedExisting === normalizedInput
        );
      });
    },
    [existingHeroes, mode, hero],
  );

  if (!isOpen) return null;

  const handleBeneficiaryChange = (nextBeneficiaryId: string) => {
    const nextBen = beneficiaries.find((b) => b.id === nextBeneficiaryId);
    const firstSectorId = nextBen?.sectors[0]?.id ?? "";

    setFormData((prev) => ({
      ...prev,
      beneficiaryId: nextBeneficiaryId,
      sectorId: firstSectorId,
    }));

    setErrors((prev) => ({
      ...prev,
      beneficiaryId: undefined,
      sectorId: undefined,
    }));
  };

  const handleSectorChange = (nextSectorId: string) => {
    setFormData((prev) => ({
      ...prev,
      sectorId: nextSectorId,
    }));

    setErrors((prev) => ({
      ...prev,
      sectorId: undefined,
    }));
  };

  const handlePhoneChange = (nextPhone: string) => {
    setFormData((prev) => ({ ...prev, phone: nextPhone }));
    const duplicateOwner = findDuplicatePhoneOwner(nextPhone);
    setErrors((prev) => ({
      ...prev,
      phone: duplicateOwner
        ? idHero.form.validationPhoneDuplicate(duplicateOwner.name)
        : undefined,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: HeroFormErrors = {};
    if (!formData.beneficiaryId) {
      nextErrors.beneficiaryId = idHero.form.validationBeneficiaryRequired;
    }
    if (!formData.sectorId) {
      nextErrors.sectorId = idHero.form.validationSectorRequired;
    }
    if (!formData.name.trim()) {
      nextErrors.name = idHero.form.validationNameRequired;
    }

    const duplicateOwner = findDuplicatePhoneOwner(formData.phone);
    if (duplicateOwner) {
      nextErrors.phone = idHero.form.validationPhoneDuplicate(
        duplicateOwner.name,
      );
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (
        nextErrors.name &&
        !nextErrors.beneficiaryId &&
        !nextErrors.sectorId
      ) {
        nameInputRef.current?.focus();
      }
      return;
    }

    await onSubmit({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
    });
  };

  const isEdit = mode === "edit";

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
      aria-labelledby="hero-form-modal-title"
    >
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[520px] shadow-[0px_20px_48px_-8px_rgba(20,32,35,0.16)] border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-5 w-full"
        >
          {/* Header Modal */}
          <div className="flex flex-col gap-1">
            <h2
              id="hero-form-modal-title"
              className="font-['Gabarito'] font-semibold text-[20px] leading-[28px] text-neutral-900"
            >
              {isEdit ? idHero.form.editTitle : idHero.form.addTitle}
            </h2>
            <p className="font-['Josefin_Sans'] font-normal text-[12px] leading-[16px] text-neutral-500">
              {isEdit
                ? idHero.form.editSubtitle(hero?.name ?? "")
                : idHero.form.addSubtitle}
            </p>
          </div>

          {/* Baris Pilihan Beneficiary & Sektor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <HeroSelectField
              id="hero-form-beneficiary"
              label={idHero.form.beneficiaryLabel}
              showLabel
              value={formData.beneficiaryId}
              options={beneficiaryOptions}
              placeholder={idHero.form.beneficiaryPlaceholder}
              onChange={handleBeneficiaryChange}
              searchable={beneficiaries.length > 7}
              searchPlaceholder={idHero.form.beneficiarySearchPlaceholder}
              error={errors.beneficiaryId}
              disabled={isSubmitting}
            />
            <HeroSelectField
              id="hero-form-sector"
              label={idHero.form.sectorLabel}
              showLabel
              value={formData.sectorId}
              options={sectorOptions}
              placeholder={
                selectedBeneficiary
                  ? idHero.form.sectorPlaceholder
                  : idHero.form.sectorDisabledPlaceholder
              }
              onChange={handleSectorChange}
              disabled={isSubmitting || !selectedBeneficiary}
              searchable
              searchPlaceholder={idHero.form.sectorSearchPlaceholder}
              emptyText={idHero.form.sectorEmpty}
              error={errors.sectorId}
            />
          </div>

          {/* Field Nama Hero */}
          <Input
            ref={nameInputRef}
            id="hero-form-name"
            label={idHero.form.nameLabel}
            placeholder={idHero.form.namePlaceholder}
            value={formData.name}
            onChange={(e) => {
              const nextName = e.target.value;
              setFormData((prev) => ({ ...prev, name: nextName }));
              if (errors.name && nextName.trim()) {
                setErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            error={errors.name}
            disabled={isSubmitting}
            className="max-w-none"
          />

          {/* Field Nomor Telepon */}
          <Input
            id="hero-form-phone"
            label={idHero.form.phoneLabel}
            placeholder={idHero.form.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            helperText={idHero.form.phoneHelper}
            error={errors.phone}
            disabled={isSubmitting}
            className="max-w-none"
          />

          {/* Opsi Blokir Hero (Khusus Mode Edit) */}
          {isEdit && (
            <div className="bg-red-50 rounded-xl px-4 py-3 flex flex-col gap-1 w-full">
              <Checkbox
                id="hero-form-blocked"
                checked={formData.isBlocked}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isBlocked: checked }))
                }
                disabled={isSubmitting}
                label={idHero.form.blockToggleLabel}
              />
              <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-neutral-600">
                {idHero.form.blockToggleHelper}
              </p>
            </div>
          )}

          {/* Footer Modal */}
          <div className="flex items-center justify-end gap-3 w-full pt-1">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {idHero.form.cancelButton}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              loadingText={idHero.form.savingButton}
            >
              {isEdit ? idHero.form.saveChangesButton : idHero.form.saveButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
