import * as React from "react";
import { Building, User } from "lucide-react";
import { FileUpload } from "#/components/shared/file-upload";
import { OptionCard } from "#/components/shared/option-card";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";
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
  }));

  const [errors, setErrors] = React.useState<PartnerFormErrors>({});
  const [logoUploadError, setLogoUploadError] = React.useState<string>();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const validate = React.useCallback(
    (currentValues: PartnerFormValues): PartnerFormErrors => {
      const nextErrors: PartnerFormErrors = {};
      const trimmedName = currentValues.name.trim();
      const trimmedEmail = currentValues.email.trim();

      if (!currentValues.category) {
        nextErrors.category = "Pilih salah satu jenis donatur.";
      }

      if (!trimmedName) {
        nextErrors.name = "Nama donatur wajib diisi.";
      } else {
        const isDuplicate = existingPartners.some(
          (partner) =>
            partner.id !== initialData?.id &&
            partner.name.trim().toLowerCase() === trimmedName.toLowerCase(),
        );
        if (isDuplicate) {
          nextErrors.name = `Nama donatur sudah terdaftar. Cari di daftar Partner atau pakai nama cabang, mis. "${trimmedName} Kaliurang".`;
        }
      }

      if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
        nextErrors.email =
          "Format email belum sesuai (contoh: nama@perusahaan.com).";
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
      setLogoUploadError("Ukuran berkas melebihi batas maksimal 2 MB.");
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
        "bg-white border border-[#e2e7e8] rounded-2xl overflow-hidden flex flex-col w-full",
        className,
      )}
    >
      {/* Seksi 1: Identitas Donatur */}
      <div className="p-6 border-b border-[#e2e7e8] flex flex-col gap-6">
        {hasErrors && (
          <Alert
            tone="danger"
            title="Donatur belum bisa disimpan"
            description="Periksa kolom yang ditandai merah, lalu simpan lagi."
            onClose={() => setHasSubmitted(false)}
          />
        )}

        {/* Header Seksi Identitas */}
        <div className="flex flex-col gap-1">
          <h2 className="font-heading font-semibold text-[18px] leading-[24px] text-[#142023]">
            Identitas Donatur
          </h2>
          <p className="font-body font-normal text-[12px] leading-[16px] text-[#6b777a]">
            Jenis, nama, dan logo yang tampil di laporan dampak.
          </p>
        </div>

        {/* Field 1: Pilih Jenis */}
        <div className="flex flex-col gap-2 w-full">
          <label
            id="partner-category-label"
            className="font-heading font-semibold text-sm leading-5 text-[#142023]"
          >
            Pilih Jenis
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
            helperText="Jenis menentukan cara donatur dikelompokkan."
          />
        </div>

        {/* Field 2: Nama Donatur */}
        <Input
          id="partner-name"
          label="Nama Donatur"
          placeholder="Contoh: Holland Bakery"
          value={values.name}
          onChange={handleNameChange}
          error={errors.name}
          helperText="Tulis nama yang dikenal publik, sama seperti di papan nama."
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Field 3: Logo Donatur (opsional) */}
        <FileUpload
          label="Logo Donatur (opsional)"
          accept="image/png,image/jpeg"
          description="PNG atau JPG, persegi, maks. 2 MB. Tanpa logo, inisial nama yang dipakai."
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
          <h2 className="font-heading font-semibold text-[18px] leading-[24px] text-[#142023]">
            Kontak
          </h2>
          <p className="font-body font-normal text-[12px] leading-[16px] text-[#6b777a]">
            Opsional. Dipakai tim untuk koordinasi penjemputan makanan.
          </p>
        </div>

        {/* Field 4: Alamat */}
        <Textarea
          id="partner-address"
          label="Alamat"
          placeholder="Contoh: Jl. Malioboro No. 52, Yogyakarta"
          value={values.address}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, address: e.target.value }))
          }
          helperText="Opsional"
          disabled={isSubmitting}
          className="max-w-none"
        />

        {/* Baris Field: Email & Nomor Telepon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Input
            id="partner-email"
            label="Email"
            type="email"
            placeholder="contoh@perusahaan.com"
            value={values.email}
            onChange={handleEmailChange}
            error={errors.email}
            helperText="Opsional"
            disabled={isSubmitting}
            className="max-w-none"
          />

          <Input
            id="partner-phone"
            label="Nomor Telepon"
            type="tel"
            placeholder="0812-xxxx-xxxx"
            value={values.phone}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, phone: e.target.value }))
            }
            helperText="Opsional. Boleh nomor WhatsApp."
            disabled={isSubmitting}
            className="max-w-none"
          />
        </div>
      </div>

      {/* Footer Form */}
      <footer className="bg-[#eef1f2] border-t border-[#e2e7e8] p-6 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onCancel}
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
          {mode === "add" ? "Simpan Donatur" : "Simpan Perubahan"}
        </Button>
      </footer>
    </form>
  );
}
