import * as React from "react";
import {
  Building,
  Building2,
  GraduationCap,
  Heart,
  HeartHandshake,
  HelpCircle,
  Home,
  Landmark,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { Switch } from "#/components/ui/switch";
import { OptionCard } from "#/components/shared/option-card";
import { idBeneficiary } from "#/locales";
import {
  defaultBeneficiaryCategoryOptions,
  defaultEmptyBeneficiaryForm,
} from "./beneficiary-data";
import type {
  BeneficiaryFormCategoryId,
  BeneficiaryFormData,
} from "./beneficiary-data";
import { cn } from "#/lib/utils";

export interface BeneficiaryFormProps {
  initialData?: Partial<BeneficiaryFormData>;
  mode?: "add" | "edit";
  onSubmit: (data: BeneficiaryFormData) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
  className?: string;
}

interface BeneficiaryFormErrors {
  categoryId?: string;
  name?: string;
}

const CATEGORY_ICON_MAP = {
  building: Building,
  "graduation-cap": GraduationCap,
  heart: Heart,
  "heart-handshake": HeartHandshake,
  home: Home,
  landmark: Landmark,
  "building-2": Building2,
  users: Users,
  "help-circle": HelpCircle,
} as const;

// Membangun pesan ringkasan alert berdasarkan field yang belum lengkap
function buildValidationAlertCopy(errors: BeneficiaryFormErrors) {
  const count = Object.values(errors).filter(Boolean).length;
  const title = idBeneficiary.form.validationSummary(count);

  if (errors.categoryId && errors.name) {
    return {
      title,
      description: idBeneficiary.form.validationCategoryAndName,
    };
  }

  if (errors.categoryId) {
    return {
      title,
      description: idBeneficiary.form.validationCategoryOnly,
    };
  }

  return {
    title,
    description: idBeneficiary.form.validationNameOnly,
  };
}

/**
 * BeneficiaryForm: Formulir tambah dan ubah penerima manfaat BBJ (Figma 138:11321, 138:11734, 138:12032, 138:12294).
 */
export function BeneficiaryForm({
  initialData,
  mode = "add",
  onSubmit,
  onCancel,
  isSubmitting = false,
  className,
}: BeneficiaryFormProps) {
  const [formData, setFormData] = React.useState<BeneficiaryFormData>(() => ({
    ...defaultEmptyBeneficiaryForm,
    ...initialData,
  }));
  const [errors, setErrors] = React.useState<BeneficiaryFormErrors>({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  // Sinkronkan nilai formulir ketika initialData diperbarui dari server (misal mode edit)
  React.useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const validateForm = (data: BeneficiaryFormData): BeneficiaryFormErrors => {
    const nextErrors: BeneficiaryFormErrors = {};
    if (!data.categoryId) {
      nextErrors.categoryId = idBeneficiary.form.validationCategoryRequired;
    }
    if (!data.name.trim()) {
      nextErrors.name = idBeneficiary.form.validationNameRequired;
    }
    return nextErrors;
  };

  const handleCategorySelect = (categoryId: BeneficiaryFormCategoryId) => {
    setFormData((prev) => ({ ...prev, categoryId }));
    if (hasSubmitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.categoryId;
        return next;
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextName = e.target.value;
    setFormData((prev) => ({ ...prev, name: nextName }));
    if (hasSubmitted) {
      setErrors((prev) => {
        const next = { ...prev };
        if (nextName.trim()) {
          delete next.name;
        } else {
          next.name = idBeneficiary.form.validationNameRequired;
        }
        return next;
      });
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
  };

  const handleMapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, maps: e.target.value }));
  };

  const handleEmailDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, emailDomain: e.target.value }));
  };

  const handlePriorityChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPriority: checked }));
  };

  const handleHiddenChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, hidden: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      address: formData.address?.trim() || "",
      maps: formData.maps?.trim() || "",
      emailDomain: formData.emailDomain?.trim() || "",
    });
  };

  const hasErrors = hasSubmitted && Object.keys(errors).length > 0;
  const alertCopy = buildValidationAlertCopy(errors);
  const isUniversity = formData.categoryId === "university";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col w-full",
        className,
      )}
    >
      {/* Isi Formulir: Data Penerima */}
      <div className="p-6 flex flex-col gap-6 w-full">
        {/* Banner Peringatan Validasi Gagal (Figma 138:11734) */}
        {hasErrors && (
          <Alert
            tone="danger"
            title={alertCopy.title}
            description={alertCopy.description}
            onClose={() => setHasSubmitted(false)}
          />
        )}

        {/* Judul Bagian Formulir */}
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-[18px] leading-[24px] font-semibold text-neutral-900">
            {idBeneficiary.form.sectionTitle}
          </h2>
          <p className="font-body text-[12px] leading-[16px] text-neutral-500">
            {idBeneficiary.form.sectionSubtitle}
          </p>
        </div>

        {/* Field 1: Pilih Jenis */}
        <div className="flex flex-col gap-2 w-full">
          <label
            id="beneficiary-category-label"
            className="font-sans text-[14px] leading-[20px] font-semibold text-neutral-900"
          >
            {idBeneficiary.form.categoryLabel}
          </label>

          <div
            role="radiogroup"
            aria-labelledby="beneficiary-category-label"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full"
          >
            {defaultBeneficiaryCategoryOptions.map((option) => {
              const IconComponent = CATEGORY_ICON_MAP[option.iconName];
              const isSelected = formData.categoryId === option.id;

              return (
                <OptionCard
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={<IconComponent className="size-6" />}
                  selected={isSelected}
                  forcedState={
                    errors.categoryId && !isSelected ? "error" : undefined
                  }
                  disabled={isSubmitting}
                  onClick={() => handleCategorySelect(option.id)}
                />
              );
            })}
          </div>

          <FieldHelper
            error={errors.categoryId}
            helperText={idBeneficiary.form.categoryHelper}
          />
        </div>

        {/* Field 2: Nama Beneficiary */}
        <Input
          id="beneficiary-name"
          label={idBeneficiary.form.nameLabel}
          placeholder={idBeneficiary.form.namePlaceholder}
          helperText={idBeneficiary.form.nameHelper}
          value={formData.name}
          onChange={handleNameChange}
          error={errors.name}
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Field 3: Domain Email Otomatis Hero (Khusus Perguruan Tinggi) */}
        {isUniversity && (
          <Input
            id="beneficiary-email-domain"
            label={idBeneficiary.form.emailDomainLabel}
            placeholder={idBeneficiary.form.emailDomainPlaceholder}
            helperText={idBeneficiary.form.emailDomainHelper}
            value={formData.emailDomain ?? ""}
            onChange={handleEmailDomainChange}
            leftIcon={<Mail className="size-4 text-neutral-400" />}
            disabled={isSubmitting}
            className="max-w-none"
          />
        )}

        {/* Field 4: Alamat Fisik */}
        <Input
          id="beneficiary-address"
          label={idBeneficiary.form.addressLabel}
          placeholder={idBeneficiary.form.addressPlaceholder}
          helperText={idBeneficiary.form.addressHelper}
          value={formData.address ?? ""}
          onChange={handleAddressChange}
          leftIcon={<Building className="size-4 text-neutral-400" />}
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Field 5: Tautan Google Maps */}
        <Input
          id="beneficiary-maps"
          label={idBeneficiary.form.mapsLabel}
          placeholder={idBeneficiary.form.mapsPlaceholder}
          helperText={idBeneficiary.form.mapsHelper}
          value={formData.maps ?? ""}
          onChange={handleMapsChange}
          leftIcon={<MapPin className="size-4 text-neutral-400" />}
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Bagian Konfigurasi Operasional & Visibilitas */}
        <div className="border-t border-neutral-200 pt-5 flex flex-col gap-4">
          <h3 className="font-heading text-[16px] leading-[22px] font-semibold text-neutral-900">
            {idBeneficiary.form.settingsSectionTitle}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[14px] font-semibold text-neutral-900">
                {idBeneficiary.form.priorityTitle}
              </span>
              <span className="font-sans text-[12px] text-neutral-500">
                {idBeneficiary.form.priorityDescription}
              </span>
            </div>
            <Switch
              id="beneficiary-is-priority"
              checked={Boolean(formData.isPriority)}
              onChange={handlePriorityChange}
              disabled={isSubmitting}
              showLabel={false}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[14px] font-semibold text-neutral-900">
                {idBeneficiary.form.hiddenTitle}
              </span>
              <span className="font-sans text-[12px] text-neutral-500">
                {idBeneficiary.form.hiddenDescription}
              </span>
            </div>
            <Switch
              id="beneficiary-hidden"
              checked={Boolean(formData.hidden)}
              onChange={handleHiddenChange}
              disabled={isSubmitting}
              showLabel={false}
            />
          </div>
        </div>
      </div>

      {/* Footer Aksi Formulir */}
      <footer className="bg-neutral-100 border-t border-neutral-200 p-6 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          {idBeneficiary.form.cancelButton}
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          loadingText={idBeneficiary.form.savingButton}
        >
          {mode === "edit"
            ? idBeneficiary.form.saveChangesButton
            : idBeneficiary.form.submitButton}
        </Button>
      </footer>
    </form>
  );
}
