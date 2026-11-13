import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";
import {
  VOLUNTEER_DIVISION_OPTIONS,
  VOLUNTEER_ROLE_META,
  VOLUNTEER_ROLE_OPTIONS,
} from "./volunteer-data";
import type {
  VolunteerDivision,
  VolunteerFormValues,
} from "./volunteer-data";

export interface VolunteerDetailSettingsTabProps {
  initialValues: VolunteerFormValues;
  isSaving?: boolean;
  canEditRole?: boolean;
  onSubmit: (values: VolunteerFormValues) => Promise<void> | void;
  className?: string;
}

const FORM_DIVISIONS = VOLUNTEER_DIVISION_OPTIONS.filter((d) => d.id !== "all");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()-\s]{8,20}$/;

/**
 * VolunteerDetailSettingsTab: Formulir pengaturan profil volunteer (Figma 151:22021).
 */
export function VolunteerDetailSettingsTab({
  initialValues,
  isSaving = false,
  canEditRole = true,
  onSubmit,
  className,
}: VolunteerDetailSettingsTabProps) {
  const [values, setValues] =
    React.useState<VolunteerFormValues>(initialValues);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof VolunteerFormValues, string>>
  >({});

  // Sinkronisasi saat initialValues berubah
  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const [divisionOpen, setDivisionOpen] = React.useState(false);
  const [roleOpen, setRoleOpen] = React.useState(false);

  const divisionRef = React.useRef<HTMLDivElement>(null);
  const roleRef = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        divisionRef.current &&
        !divisionRef.current.contains(e.target as Node)
      ) {
        setDivisionOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleFieldChange = <TField extends keyof VolunteerFormValues>(
    field: TField,
    val: VolunteerFormValues[TField],
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof VolunteerFormValues, string>> = {};

    if (!values.division) {
      nextErrors.division = "Divisi wajib dipilih.";
    }
    if (!values.name.trim()) {
      nextErrors.name = "Nama lengkap wajib diisi.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Format email tidak valid.";
    }
    if (!values.phone.trim()) {
      nextErrors.phone = "Nomor WhatsApp wajib diisi.";
    } else if (!PHONE_PATTERN.test(values.phone.trim())) {
      nextErrors.phone = "Nomor WhatsApp tidak valid.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    });
  };

  const currentRoleMeta = VOLUNTEER_ROLE_META[values.role];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "p-6 flex flex-col gap-5 w-full animate-in fade-in duration-150 motion-reduce:animate-none",
        className,
      )}
    >
      {/* Baris 1: Penempatan (Divisi & Role Sistem) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Dropdown Divisi */}
        <div
          ref={divisionRef}
          className="flex flex-col gap-1.5 relative w-full"
        >
          <label className="font-sans text-sm font-semibold text-neutral-900 leading-5">
            Divisi
          </label>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={divisionOpen}
            onClick={() => {
              setDivisionOpen((prev) => !prev);
              setRoleOpen(false);
            }}
            className={cn(
              "h-[44px] w-full px-3.5 rounded-lg flex items-center justify-between gap-2 text-left font-sans text-sm transition-all outline-none bg-surface cursor-pointer select-none",
              divisionOpen
                ? "border-2 border-brand shadow-focus-ring text-neutral-900"
                : errors.division
                  ? "border border-red-500 shadow-focus-ring-danger text-neutral-900"
                  : "border border-neutral-300 hover:border-neutral-900 text-neutral-900",
            )}
          >
            <span className="truncate">
              {values.division || "Pilih divisi"}
            </span>
            <ChevronDown
              className={cn(
                "size-4 text-neutral-500 transition-transform duration-150 shrink-0",
                divisionOpen && "rotate-180 text-brand",
              )}
            />
          </button>
          <FieldHelper error={errors.division} />

          {divisionOpen && (
            <div
              role="listbox"
              className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-surface border border-neutral-200 rounded-lg shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100 max-h-56 overflow-y-auto"
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
                      handleFieldChange(
                        "division",
                        opt.label as VolunteerDivision,
                      );
                      setDivisionOpen(false);
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

        {/* Dropdown Role Sistem */}
        <div ref={roleRef} className="flex flex-col gap-1.5 relative w-full">
          <label className="font-sans text-sm font-semibold text-neutral-900 leading-5">
            Role Sistem
          </label>
          <button
            type="button"
            disabled={!canEditRole}
            aria-haspopup="listbox"
            aria-expanded={roleOpen}
            onClick={() => {
              if (!canEditRole) return;
              setRoleOpen((prev) => !prev);
              setDivisionOpen(false);
            }}
            className={cn(
              "h-[44px] w-full px-3.5 rounded-lg flex items-center justify-between gap-2 text-left font-sans text-sm transition-all outline-none bg-surface select-none",
              !canEditRole
                ? "bg-neutral-100 border border-neutral-200 text-neutral-500 cursor-not-allowed"
                : roleOpen
                  ? "border-2 border-brand shadow-focus-ring text-neutral-900 cursor-pointer"
                  : errors.role
                    ? "border border-red-500 shadow-focus-ring-danger text-neutral-900 cursor-pointer"
                    : "border border-neutral-300 hover:border-neutral-900 text-neutral-900 cursor-pointer",
            )}
          >
            <span className="truncate">
              {currentRoleMeta.label} ({values.role})
            </span>
            {canEditRole && (
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-500 transition-transform duration-150 shrink-0",
                  roleOpen && "rotate-180 text-brand",
                )}
              />
            )}
          </button>
          <span className="font-sans text-xs font-normal text-neutral-500 leading-4">
            {currentRoleMeta.helperText}
          </span>

          {roleOpen && canEditRole && (
            <div
              role="listbox"
              className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-surface border border-neutral-200 rounded-lg shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100"
            >
              {VOLUNTEER_ROLE_OPTIONS.map((opt) => {
                const isSelected = opt.id === values.role;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      handleFieldChange("role", opt.id);
                      setRoleOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-md text-left text-sm font-sans flex items-center justify-between transition-colors cursor-pointer",
                      isSelected
                        ? "bg-bondi-50 text-brand-strong font-semibold"
                        : "text-neutral-800 hover:bg-neutral-100",
                    )}
                  >
                    <div>
                      <p className="font-semibold">{opt.title}</p>
                      <p className="text-xs text-neutral-500">
                        {opt.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="size-4 shrink-0 text-brand" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Field: Nama Lengkap */}
      <div className="flex flex-col gap-1.5 w-full">
        <Input
          label="Nama Lengkap"
          placeholder="Contoh: Fauzan Trisuladana"
          value={values.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          error={errors.name}
          disabled={isSaving}
          required
          className="w-full max-w-none"
        />
      </div>

      {/* Baris 2: Kontak (Email & Nomor WhatsApp) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full">
          <Input
            type="email"
            label="Email"
            placeholder="nama@gmail.com"
            value={values.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            error={errors.email}
            helperText="Harus sama dengan akun Google untuk masuk."
            disabled={isSaving}
            required
            className="w-full max-w-none"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <Input
            type="tel"
            label="Nomor WhatsApp"
            placeholder="08xx atau 628xx"
            value={values.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            error={errors.phone}
            disabled={isSaving}
            required
            className="w-full max-w-none"
          />
        </div>
      </div>

      {/* Footer Aksi Form */}
      <div className="pt-2 flex items-center justify-end w-full">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSaving}
          className="gap-2"
        >
          <Check className="size-4 shrink-0" aria-hidden="true" />
          <span>{isSaving ? "Menyimpan..." : "Simpan Data Profil"}</span>
        </Button>
      </div>
    </form>
  );
}
