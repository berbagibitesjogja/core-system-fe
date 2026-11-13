import * as React from "react";
import {
  Check,
  ChevronDown,
  LayoutGrid,
  RotateCw,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { OptionCard } from "#/components/shared/option-card";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";
import {
  VOLUNTEER_DIVISION_OPTIONS,
  VOLUNTEER_ROLE_OPTIONS,
  defaultVolunteerFormValues,
} from "./volunteer-data";
import type {
  VolunteerFormValues,
  VolunteerRoleOption,
  VolunteerSystemRole,
} from "./volunteer-data";

export interface VolunteerFormProps {
  mode: "add" | "edit";
  initialData?: Partial<VolunteerFormValues>;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: VolunteerFormValues) => Promise<void> | void;
  className?: string;
  demoState?: "division-error" | "duplicate" | "none";
}

interface VolunteerFormErrors {
  division?: string;
  role?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const ROLE_ICON_MAP: Record<
  VolunteerSystemRole,
  React.ComponentType<{ className?: string }>
> = {
  member: User,
  staff: Users,
  core: LayoutGrid,
  super: Sparkles,
};

const FORM_DIVISIONS = VOLUNTEER_DIVISION_OPTIONS.filter((d) => d.id !== "all");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()-\s]{8,20}$/;

// Daftar email & nomor yang disimulasikan sudah terdaftar (Figma 150:21212)
const DUPLICATE_EMAILS: Record<string, string> = {
  "rani.kusuma@gmail.com": "Rani Kusuma",
  "dian.pratiwi@gmail.com": "Dian Pratiwi",
  "fauzan.aditya@gmail.com": "Fauzan Aditya",
};

/**
 * VolunteerForm: Formulir Tambah dan Edit Volunteer (Figma 150:20833, 150:21212, 150:21549).
 */
export function VolunteerForm({
  mode,
  initialData,
  isSubmitting = false,
  onCancel,
  onSubmit,
  className,
  demoState = "none",
}: VolunteerFormProps) {
  const [values, setValues] = React.useState<VolunteerFormValues>(() => {
    if (demoState === "duplicate") {
      return {
        division: "Operational Manager",
        role: "core",
        name: "Rani Kusuma",
        email: "rani.kusuma@gmail.com",
        phone: "0813-2270-6614",
        address: "Jl. Gejayan No. 12, Sleman",
      };
    }
    return {
      ...defaultVolunteerFormValues,
      ...initialData,
    };
  });

  const [errors, setErrors] = React.useState<VolunteerFormErrors>({});
  const [duplicateConflict, setDuplicateConflict] = React.useState<{
    field: "email" | "phone";
    ownerName: string;
  } | null>(() => {
    if (demoState === "duplicate") {
      return { field: "email", ownerName: "Rani Kusuma" };
    }
    return null;
  });

  const [isDivisionFailed, setIsDivisionFailed] = React.useState(
    demoState === "division-error",
  );
  const [isRetryingDivision, setIsRetryingDivision] = React.useState(false);
  const [divisionDropdownOpen, setDivisionDropdownOpen] = React.useState(false);
  const divisionContainerRef = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        divisionContainerRef.current &&
        !divisionContainerRef.current.contains(e.target as Node)
      ) {
        setDivisionDropdownOpen(false);
      }
    };
    if (divisionDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [divisionDropdownOpen]);

  const handleRetryDivision = async () => {
    setIsRetryingDivision(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsDivisionFailed(false);
    setIsRetryingDivision(false);
  };

  const validate = (formValues: VolunteerFormValues): VolunteerFormErrors => {
    const nextErrors: VolunteerFormErrors = {};
    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedPhone = formValues.phone.trim();

    if (!formValues.division) {
      nextErrors.division = "Pilih salah satu divisi.";
    }

    if (!trimmedName) {
      nextErrors.name = "Nama lengkap wajib diisi.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email wajib diisi untuk akses Google.";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = "Format email belum sesuai (contoh: nama@gmail.com).";
    }

    if (!trimmedPhone) {
      nextErrors.phone = "Nomor WhatsApp wajib diisi.";
    } else if (!PHONE_PATTERN.test(trimmedPhone)) {
      nextErrors.phone =
        "Nomor WhatsApp belum valid (contoh: 08xx atau 628xx).";
    }

    return nextErrors;
  };

  const handleFieldChange = <TField extends keyof VolunteerFormValues>(
    field: TField,
    val: VolunteerFormValues[TField],
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field as keyof VolunteerFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (duplicateConflict && (field === "email" || field === "phone")) {
      setDuplicateConflict(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isDivisionFailed) {
      setErrors((prev) => ({
        ...prev,
        division:
          "Daftar divisi gagal dimuat. Muat ulang divisi terlebih dahulu.",
      }));
      return;
    }

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulasi deteksi duplikasi akun (Figma 150:21212)
    const normalizedEmail = values.email.trim().toLowerCase();
    if (mode === "add" && DUPLICATE_EMAILS[normalizedEmail]) {
      const owner = DUPLICATE_EMAILS[normalizedEmail];
      setDuplicateConflict({ field: "email", ownerName: owner });
      setErrors((prev) => ({
        ...prev,
        email: `Email ini sudah terdaftar atas nama ${owner}.`,
      }));
      return;
    }

    onSubmit({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "bg-surface border border-neutral-200 rounded-2xl overflow-hidden flex flex-col w-full shadow-xs",
        className,
      )}
    >
      {/* Seksi 1: Penempatan */}
      <div className="p-6 border-b border-neutral-200 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-900 leading-6">
            Penempatan
          </h2>
          <p className="font-sans text-sm text-neutral-500 leading-5">
            Divisi dan role menentukan apa saja yang bisa dibuka anggota ini.
          </p>
        </div>

        {/* Dropdown Pilihan Divisi */}
        <div
          ref={divisionContainerRef}
          className="flex flex-col gap-2 relative"
        >
          <label
            id="volunteer-division-label"
            className="font-sans text-sm font-semibold text-neutral-900 leading-5"
          >
            Pilih Divisi
          </label>

          {isDivisionFailed ? (
            /* State Divisi Gagal Dimuat (Figma 150:21549) */
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between w-full h-[44px] px-3.5 rounded-lg border border-red-500 bg-surface shadow-focus-ring-danger">
                <span className="font-sans text-sm font-medium text-red-600">
                  Daftar divisi gagal dimuat
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleRetryDivision}
                  disabled={isRetryingDivision}
                  className="h-8 px-2.5 text-xs font-semibold gap-1.5 text-neutral-800"
                >
                  <RotateCw
                    className={cn(
                      "size-3.5 text-neutral-600",
                      isRetryingDivision && "animate-spin",
                    )}
                  />
                  <span>Coba lagi</span>
                </Button>
              </div>
              <p className="font-sans text-xs font-medium text-red-600">
                Periksa koneksi, lalu coba lagi.
              </p>
            </div>
          ) : (
            /* State Normal Dropdown Divisi */
            <div className="relative w-full">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={divisionDropdownOpen}
                aria-labelledby="volunteer-division-label"
                onClick={() => setDivisionDropdownOpen((prev) => !prev)}
                className={cn(
                  "h-[44px] w-full px-3.5 rounded-md flex items-center justify-between gap-2 text-left font-sans text-sm transition-all outline-none bg-surface cursor-pointer select-none",
                  divisionDropdownOpen
                    ? "border-2 border-brand shadow-focus-ring text-neutral-900"
                    : errors.division
                      ? "border border-red-500 shadow-focus-ring-danger text-neutral-900"
                      : "border border-neutral-300 hover:border-neutral-900 text-neutral-900",
                )}
              >
                <span
                  className={cn(
                    "truncate",
                    !values.division && "text-neutral-400 font-normal",
                  )}
                >
                  {values.division || "Pilih divisi untuk volunteer ini"}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 text-neutral-500 transition-transform duration-150 shrink-0",
                    divisionDropdownOpen && "rotate-180 text-brand",
                  )}
                />
              </button>

              <FieldHelper error={errors.division} />

              {divisionDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Daftar Divisi"
                  className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-surface border border-neutral-200 rounded-md shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto"
                >
                  {FORM_DIVISIONS.map((opt) => {
                    const isSelected = opt.label === values.division;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          handleFieldChange("division", opt.label);
                          setDivisionDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-2 rounded-md text-left text-sm font-sans flex items-center justify-between transition-colors cursor-pointer",
                          isSelected
                            ? "bg-bondi-50 text-brand-strong font-semibold"
                            : "text-neutral-800 hover:bg-neutral-100",
                        )}
                      >
                        <span>{opt.label}</span>
                        {isSelected && (
                          <Check className="size-4 shrink-0 text-brand" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pilihan Role (2x2 OptionCard) */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-semibold text-neutral-900 leading-5">
            Pilih Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {VOLUNTEER_ROLE_OPTIONS.map((opt: VolunteerRoleOption) => {
              const Icon = ROLE_ICON_MAP[opt.id];
              const isSelected = values.role === opt.id;
              return (
                <OptionCard
                  key={opt.id}
                  title={opt.title}
                  description={opt.description}
                  selected={isSelected}
                  onClick={() => handleFieldChange("role", opt.id)}
                  icon={<Icon className="size-5" />}
                />
              );
            })}
          </div>
          <p className="font-sans text-xs font-medium text-neutral-500 pt-1">
            Bisa diubah nanti di halaman detail volunteer.
          </p>
        </div>
      </div>

      {/* Seksi 2: Identitas & Kontak */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-900 leading-6">
            Identitas & Kontak
          </h2>
          <p className="font-sans text-sm text-neutral-500 leading-5">
            Email dipakai untuk masuk dengan akun Google.
          </p>
        </div>

        {/* Peringatan Duplikasi Akun (Figma 150:21212) */}
        {duplicateConflict && (
          <Alert
            tone="danger"
            title="Email atau nomor WhatsApp ini sudah terdaftar."
            description="Cek daftar Volunteer. Kalau orangnya sama, ubah datanya di halaman detail."
          />
        )}

        {/* Field: Nama Lengkap */}
        <div className="flex flex-col gap-1.5 w-full">
          <Input
            label="Nama Lengkap"
            placeholder="Contoh: Fauzan Trisuladana"
            value={values.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            error={errors.name}
            disabled={isSubmitting}
            required
            className="w-full max-w-none"
          />
        </div>

        {/* Baris Email & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Email */}
          <div className="flex flex-col gap-1.5 w-full">
            <Input
              type="email"
              label="Email"
              placeholder="nama@gmail.com"
              value={values.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              error={errors.email}
              helperText="Harus sama dengan akun Google untuk masuk."
              disabled={isSubmitting}
              required
              className="w-full max-w-none"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div className="flex flex-col gap-1.5 w-full">
            <Input
              type="tel"
              label="Nomor WhatsApp"
              placeholder="08xx atau 628xx"
              value={values.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              error={errors.phone}
              helperText="Nomor aktif untuk koordinasi kegiatan."
              disabled={isSubmitting}
              required
              className="w-full max-w-none"
            />
          </div>
        </div>

        {/* Field: Alamat Domisili */}
        <div className="flex flex-col gap-1.5 w-full">
          <Textarea
            label="Alamat Domisili"
            placeholder="Contoh: Jl. Kaliurang Km 5, Sleman"
            value={values.address}
            onChange={(e) => handleFieldChange("address", e.target.value)}
            helperText="Opsional"
            disabled={isSubmitting}
            className="w-full max-w-none min-h-[108px] resize-y"
          />
        </div>
      </div>

      {/* Footer Form: Tombol Aksi */}
      <div className="p-6 border-t border-neutral-200 bg-surface flex items-center justify-end gap-3">
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
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Menyimpan..."
            : mode === "add"
              ? "Simpan Volunteer"
              : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
