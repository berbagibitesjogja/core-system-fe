import * as React from "react";
import { Building, User } from "lucide-react";
import { FileUpload } from "#/components/shared/file-upload";
import { OptionCard } from "#/components/shared/option-card";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { Switch } from "#/components/ui/switch";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";
import { idPartner } from "#/locales";
import { defaultPartnerCategoryOptions, defaultPartners } from "./partner-data";
import type {
  PartnerCategory,
  PartnerCategoryOption,
  PartnerFormValues,
  PartnerRecord,
} from "./partner-data";

export interface PartnerFormProps {
  mode: "add" | "edit";
  initialData?: PartnerRecord;
  categoryOptions?: PartnerCategoryOption[];
  existingPartners?: PartnerRecord[];
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmitSuccess: (values: PartnerFormValues) => Promise<void> | void;
  className?: string;
}

interface PartnerFormErrors {
  category?: string;
  name?: string;
  email?: string;
}

const MAX_LOGO_SIZE_BYTES = 2 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CATEGORY_ICON_MAP = {
  perusahaan: Building,
  individu: User,
} as const;

// Format ukuran berkas menjadi teks KB/MB yang ringkas
function formatLogoFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`;
  }
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/**
 * PartnerForm: Formulir Tambah dan Edit Donatur (Figma 143:13561, 143:13873, 143:14149, 143:14420).
 */
export function PartnerForm({
  mode,
  initialData,
  categoryOptions = defaultPartnerCategoryOptions,
  existingPartners = defaultPartners,
  isSubmitting = false,
  onCancel,
  onSubmitSuccess,
  className,
}: PartnerFormProps) {
  const [values, setValues] = React.useState<PartnerFormValues>(() => ({
    category: initialData?.categoryId ?? "",
    name: initialData?.name ?? "",
    logoFileName: initialData?.logoFileName,
    logoFileSize: initialData?.logoFileSize,
    address: initialData?.address ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    hidden: initialData?.hidden ?? false,
    hide_donations: initialData?.hide_donations ?? false,
  }));

  React.useEffect(() => {
    if (initialData) {
      setValues({
        category: initialData.categoryId,
        name: initialData.name,
        logoFileName: initialData.logoFileName,
        logoFileSize: initialData.logoFileSize,
        address: initialData.address ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        hidden: Boolean(initialData.hidden),
        hide_donations: Boolean(initialData.hide_donations),
      });
    }
  }, [initialData]);

  const [errors, setErrors] = React.useState<PartnerFormErrors>({});
  const [logoUploadError, setLogoUploadError] = React.useState<string>();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const validate = React.useCallback(
    (currentValues: PartnerFormValues): PartnerFormErrors => {
      const nextErrors: PartnerFormErrors = {};
      const trimmedName = currentValues.name.trim();
      const trimmedEmail = currentValues.email.trim();

      if (!currentValues.category) {
        nextErrors.category = idPartner.form.categoryRequired;
      }

      if (!trimmedName) {
        nextErrors.name = idPartner.form.nameRequired;
      } else {
        const isDuplicate = existingPartners.some(
          (partner) =>
            partner.id !== initialData?.id &&
            partner.name.trim().toLowerCase() === trimmedName.toLowerCase(),
        );
        if (isDuplicate) {
          nextErrors.name = idPartner.form.nameDuplicate(trimmedName);
        }
      }

      if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
        nextErrors.email = idPartner.form.emailFormatError;
      }

      return nextErrors;
    },
    [existingPartners, initialData?.id],
  );

  const handleCategorySelect = (category: PartnerCategory) => {
    const nextValues = { ...values, category };
    setValues(nextValues);
    if (hasSubmitted) {
      setErrors(validate(nextValues));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValues = { ...values, name: e.target.value };
    setValues(nextValues);
    if (hasSubmitted) {
      setErrors(validate(nextValues));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValues = { ...values, email: e.target.value };
    setValues(nextValues);
    if (hasSubmitted) {
      setErrors(validate(nextValues));
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.size > MAX_LOGO_SIZE_BYTES) {
      setLogoUploadError(idPartner.form.logoSizeError);
      return;
    }

    setLogoUploadError(undefined);
    setValues((prev) => ({
      ...prev,
      logoFileName: file.name,
      logoFileSize: formatLogoFileSize(file.size),
    }));
  };

  const handleFileRemove = () => {
    setLogoUploadError(undefined);
    setValues((prev) => ({
      ...prev,
      logoFileName: undefined,
      logoFileSize: undefined,
    }));
  };

  const handleHiddenChange = (checked: boolean) => {
    setValues((prev) => ({ ...prev, hidden: checked }));
  };

  const handleHideDonationsChange = (checked: boolean) => {
    setValues((prev) => ({ ...prev, hide_donations: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0 || logoUploadError) {
      return;
    }

    onSubmitSuccess({
      ...values,
      name: values.name.trim(),
      address: values.address.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      hidden: Boolean(values.hidden),
      hide_donations: Boolean(values.hide_donations),
    });
  };

  const hasErrors =
    hasSubmitted &&
    (Object.keys(errors).length > 0 || Boolean(logoUploadError));

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col w-full",
        className,
      )}
    >
      {/* Seksi 1: Identitas Donatur */}
      <div className="p-6 border-b border-neutral-200 flex flex-col gap-6">
        {hasErrors && (
          <Alert
            tone="danger"
            title={idPartner.form.errorAlertTitle}
            description={idPartner.form.errorAlertDescription}
            onClose={() => setHasSubmitted(false)}
          />
        )}

        {/* Header Seksi Identitas */}
        <div className="flex flex-col gap-1">
          <h2 className="font-heading font-semibold text-[18px] leading-[24px] text-neutral-900">
            {idPartner.form.identityTitle}
          </h2>
          <p className="font-body font-normal text-[12px] leading-[16px] text-neutral-500">
            {idPartner.form.identitySubtitle}
          </p>
        </div>

        {/* Field 1: Pilih Jenis */}
        <div className="flex flex-col gap-2 w-full">
          <label
            id="partner-category-label"
            className="font-heading font-semibold text-sm leading-5 text-neutral-900"
          >
            {idPartner.form.categoryLabel}
          </label>

          <div
            role="radiogroup"
            aria-labelledby="partner-category-label"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          >
            {categoryOptions.map((option) => {
              const IconComponent = CATEGORY_ICON_MAP[option.id];
              const isSelected = values.category === option.id;

              return (
                <OptionCard
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={<IconComponent className="size-6" />}
                  selected={isSelected}
                  forcedState={
                    errors.category && !isSelected ? "error" : undefined
                  }
                  disabled={isSubmitting}
                  onClick={() => handleCategorySelect(option.id)}
                  className="max-w-none"
                />
              );
            })}
          </div>

          <FieldHelper
            error={errors.category}
            helperText={idPartner.form.categoryHelper}
          />
        </div>

        {/* Field 2: Nama Donatur */}
        <Input
          id="partner-name"
          label={idPartner.form.nameLabel}
          placeholder={idPartner.form.namePlaceholder}
          value={values.name}
          onChange={handleNameChange}
          error={errors.name}
          helperText={idPartner.form.nameHelper}
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Field 3: Logo Donatur (opsional) */}
        <FileUpload
          label={idPartner.form.logoLabel}
          accept="image/png,image/jpeg"
          description={idPartner.form.logoDescription}
          state={
            logoUploadError
              ? "error"
              : values.logoFileName
                ? "uploaded"
                : "default"
          }
          fileName={values.logoFileName}
          fileSize={values.logoFileSize}
          errorMessage={logoUploadError}
          onFileSelect={handleFileSelect}
          onRemove={handleFileRemove}
          className="max-w-none"
        />
      </div>

      {/* Seksi 2: Kontak */}
      <div className="p-6 flex flex-col gap-6">
        {/* Header Seksi Kontak */}
        <div className="flex flex-col gap-1">
          <h2 className="font-heading font-semibold text-[18px] leading-[24px] text-neutral-900">
            {idPartner.form.contactTitle}
          </h2>
          <p className="font-body font-normal text-[12px] leading-[16px] text-neutral-500">
            {idPartner.form.contactSubtitle}
          </p>
        </div>

        {/* Field 4: Alamat */}
        <Textarea
          id="partner-address"
          label={idPartner.form.addressLabel}
          placeholder={idPartner.form.addressPlaceholder}
          value={values.address}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, address: e.target.value }))
          }
          helperText={idPartner.form.addressHelper}
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Baris Field: Email & Nomor Telepon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Input
            id="partner-email"
            label={idPartner.form.emailLabel}
            type="email"
            placeholder={idPartner.form.emailPlaceholder}
            value={values.email}
            onChange={handleEmailChange}
            error={errors.email}
            helperText={idPartner.form.emailHelper}
            disabled={isSubmitting}
            className="max-w-none"
          />

          <Input
            id="partner-phone"
            label={idPartner.form.phoneLabel}
            type="tel"
            placeholder={idPartner.form.phonePlaceholder}
            value={values.phone}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, phone: e.target.value }))
            }
            helperText={idPartner.form.phoneHelper}
            disabled={isSubmitting}
            className="max-w-none"
          />
        </div>
      </div>

      {/* Seksi 3: Pengaturan Privasi Publik */}
      <div className="p-6 border-t border-neutral-200 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading font-semibold text-[18px] leading-[24px] text-neutral-900">
            {idPartner.form.privacyTitle}
          </h2>
          <p className="font-body font-normal text-[12px] leading-[16px] text-neutral-500">
            {idPartner.form.privacySubtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="partner-hidden"
                className="font-heading font-medium text-sm text-neutral-900 cursor-pointer"
              >
                {idPartner.form.hiddenLabel}
              </label>
              <p className="font-body text-xs text-neutral-500">
                {idPartner.form.hiddenDescription}
              </p>
            </div>
            <Switch
              id="partner-hidden"
              checked={Boolean(values.hidden)}
              onChange={handleHiddenChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="partner-hide-donations"
                className="font-heading font-medium text-sm text-neutral-900 cursor-pointer"
              >
                {idPartner.form.hideDonationsLabel}
              </label>
              <p className="font-body text-xs text-neutral-500">
                {idPartner.form.hideDonationsDescription}
              </p>
            </div>
            <Switch
              id="partner-hide-donations"
              checked={Boolean(values.hide_donations)}
              onChange={handleHideDonationsChange}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Footer Form */}
      <footer className="bg-neutral-100 border-t border-neutral-200 p-6 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {idPartner.form.cancelButton}
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          loadingText={idPartner.form.submittingButton}
        >
          {mode === "add"
            ? idPartner.form.submitAddButton
            : idPartner.form.submitEditButton}
        </Button>
      </footer>
    </form>
  );
}
