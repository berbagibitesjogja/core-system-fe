import * as React from "react";
import { Building, Heart, Users } from "lucide-react";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { OptionCard } from "#/components/shared/option-card";
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
  heart: Heart,
  users: Users,
} as const;

// Membangun pesan ringkasan alert berdasarkan field yang belum lengkap
function buildValidationAlertCopy(errors: BeneficiaryFormErrors) {
  const count = Object.values(errors).filter(Boolean).length;
  const title = `Ada ${count} data yang perlu dilengkapi`;

  if (errors.categoryId && errors.name) {
    return {
      title,
      description: "Pilih jenis penerima dan isi namanya, lalu simpan lagi.",
    };
  }

  if (errors.categoryId) {
    return {
      title,
      description: "Pilih jenis penerima terlebih dahulu, lalu simpan lagi.",
    };
  }

  return {
    title,
    description: "Isi nama beneficiary terlebih dahulu, lalu simpan lagi.",
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

  const validateForm = (data: BeneficiaryFormData): BeneficiaryFormErrors => {
    const nextErrors: BeneficiaryFormErrors = {};
    if (!data.categoryId) {
      nextErrors.categoryId = "Pilih salah satu jenis beneficiary.";
    }
    if (!data.name.trim()) {
      nextErrors.name = "Nama beneficiary wajib diisi.";
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
          next.name = "Nama beneficiary wajib diisi.";
        }
        return next;
      });
    }
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
    });
  };

  const hasErrors = hasSubmitted && Object.keys(errors).length > 0;
  const alertCopy = buildValidationAlertCopy(errors);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "bg-white border border-[#e2e7e8] rounded-2xl overflow-hidden flex flex-col w-full",
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
          <h2 className="font-heading text-[18px] leading-[24px] font-semibold text-[#142023]">
            Data Penerima
          </h2>
          <p className="font-body text-[12px] leading-[16px] text-[#6b777a]">
            Pilih jenis kelompok, lalu tulis nama resminya.
          </p>
        </div>

        {/* Field 1: Pilih Jenis */}
        <div className="flex flex-col gap-2 w-full">
          <label
            id="beneficiary-category-label"
            className="font-sans text-[14px] leading-[20px] font-semibold text-[#142023]"
          >
            Pilih Jenis
          </label>

          <div
            role="radiogroup"
            aria-labelledby="beneficiary-category-label"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
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
            helperText="Jenis menentukan kategori di laporan dampak."
          />
        </div>

        {/* Field 2: Nama Beneficiary */}
        <Input
          id="beneficiary-name"
          label="Nama Beneficiary"
          placeholder="Contoh: Universitas Gadjah Mada"
          helperText="Gunakan nama resmi lembaga agar mudah dicari."
          value={formData.name}
          onChange={handleNameChange}
          error={errors.name}
          disabled={isSubmitting}
          className="max-w-none"
        />
      </div>

      {/* Footer Aksi Formulir */}
      <footer className="bg-[#eef1f2] border-t border-[#e2e7e8] p-6 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          disabled={isSubmitting}
          onClick={onCancel}
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
          {mode === "edit" ? "Simpan Perubahan" : "Simpan Beneficiary"}
        </Button>
      </footer>
    </form>
  );
}
