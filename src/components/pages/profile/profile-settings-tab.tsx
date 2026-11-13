import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";
import {
  PROFILE_DIVISION_OPTIONS,
  PROFILE_EMAIL_LOCKED_HELPER,
  PROFILE_ROLE_EDITABLE_HELPER,
  PROFILE_ROLE_LOCKED_HELPER,
  PROFILE_ROLE_META,
  PROFILE_ROLE_OPTIONS,
} from "./profile-data";
import type {
  ProfileFormErrors,
  ProfileFormValues,
  ProfileSystemRole,
} from "./profile-data";

export interface ProfileSettingsTabProps {
  values: ProfileFormValues;
  email: string;
  canEditRole: boolean;
  errors: ProfileFormErrors;
  isSaving: boolean;
  onFieldChange: <TField extends keyof ProfileFormValues>(
    field: TField,
    value: ProfileFormValues[TField],
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

/**
 * ProfileSettingsTab: Konten tab Pengaturan Profil (Figma Node 157:25582, 157:25867, 157:26083)
 * dengan penyesuaian visibilitas edit role antara Super Admin dan non-Super Admin,
 * mengikuti pola dropdown interaktif pada formulir halaman lain (mis. donation-form & hero-form).
 */
export function ProfileSettingsTab({
  values,
  email,
  canEditRole,
  errors,
  isSaving,
  onFieldChange,
  onSubmit,
  className,
}: ProfileSettingsTabProps) {
  const currentRoleLabel = PROFILE_ROLE_META[values.role].selectLabel;

  const [divisionDropdownOpen, setDivisionDropdownOpen] = React.useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const divisionContainerRef = React.useRef<HTMLDivElement>(null);
  const roleContainerRef = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar area atau menekan tombol Escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        divisionContainerRef.current &&
        !divisionContainerRef.current.contains(target)
      ) {
        setDivisionDropdownOpen(false);
      }
      if (
        roleContainerRef.current &&
        !roleContainerRef.current.contains(target)
      ) {
        setRoleDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDivisionDropdownOpen(false);
        setRoleDropdownOpen(false);
      }
    };

    if (divisionDropdownOpen || roleDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [divisionDropdownOpen, roleDropdownOpen]);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "p-6 flex flex-col gap-5 w-full animate-in fade-in duration-150 motion-reduce:animate-none",
        className,
      )}
    >
      {/* Baris Penempatan: Divisi & Role Sistem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Dropdown Divisi */}
        <div
          ref={divisionContainerRef}
          className="relative flex flex-col gap-1.5 w-full"
        >
          <label
            htmlFor="profile-division-trigger"
            className="font-sans text-sm font-semibold text-neutral-900"
          >
            Divisi
          </label>

          <button
            id="profile-division-trigger"
            type="button"
            disabled={isSaving}
            aria-haspopup="listbox"
            aria-expanded={divisionDropdownOpen}
            onClick={() => {
              if (!isSaving) {
                setDivisionDropdownOpen((prev) => !prev);
                setRoleDropdownOpen(false);
              }
            }}
            className={cn(
              "h-[44px] w-full px-3 rounded-md flex items-center justify-between gap-2 text-left text-sm font-sans transition-all outline-none bg-surface",
              isSaving
                ? "bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed"
                : divisionDropdownOpen
                  ? "border-[1.5px] border-bondi-500 shadow-focus-ring text-neutral-900 cursor-pointer"
                  : errors.division
                    ? "border-[1.5px] border-red-500 shadow-focus-ring-danger text-neutral-900 cursor-pointer"
                    : "border border-border-input hover:border-neutral-900 text-neutral-900 cursor-pointer",
            )}
          >
            <span className="truncate">{values.division}</span>
            <ChevronDown
              className={cn(
                "size-4.5 text-neutral-500 transition-transform duration-150 shrink-0",
                divisionDropdownOpen && "rotate-180 text-brand",
              )}
            />
          </button>

          <FieldHelper error={errors.division} />

          {divisionDropdownOpen && !isSaving && (
            <div
              role="listbox"
              aria-label="Pilihan Divisi"
              className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-surface border border-neutral-200 rounded-md shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100"
            >
              {PROFILE_DIVISION_OPTIONS.map((opt) => {
                const isSelected = opt.value === values.division;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onFieldChange("division", opt.value);
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

        {/* Dropdown Role Sistem (atau Input Disabled saat role dikunci) */}
        {canEditRole ? (
          <div
            ref={roleContainerRef}
            className="relative flex flex-col gap-1.5 w-full"
          >
            <label
              htmlFor="profile-role-trigger"
              className="font-sans text-sm font-semibold text-neutral-900"
            >
              Role Sistem
            </label>

            <button
              id="profile-role-trigger"
              type="button"
              disabled={isSaving}
              aria-haspopup="listbox"
              aria-expanded={roleDropdownOpen}
              onClick={() => {
                if (!isSaving) {
                  setRoleDropdownOpen((prev) => !prev);
                  setDivisionDropdownOpen(false);
                }
              }}
              className={cn(
                "h-[44px] w-full px-3 rounded-md flex items-center justify-between gap-2 text-left text-sm font-sans transition-all outline-none bg-surface",
                isSaving
                  ? "bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed"
                  : roleDropdownOpen
                    ? "border-[1.5px] border-bondi-500 shadow-focus-ring text-neutral-900 cursor-pointer"
                    : errors.role
                      ? "border-[1.5px] border-red-500 shadow-focus-ring-danger text-neutral-900 cursor-pointer"
                      : "border border-border-input hover:border-neutral-900 text-neutral-900 cursor-pointer",
              )}
            >
              <span className="truncate">{currentRoleLabel}</span>
              <ChevronDown
                className={cn(
                  "size-4.5 text-neutral-500 transition-transform duration-150 shrink-0",
                  roleDropdownOpen && "rotate-180 text-brand",
                )}
              />
            </button>

            <FieldHelper
              error={errors.role}
              helperText={PROFILE_ROLE_EDITABLE_HELPER}
            />

            {roleDropdownOpen && !isSaving && (
              <div
                role="listbox"
                aria-label="Pilihan Role Sistem"
                className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-surface border border-neutral-200 rounded-md shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100"
              >
                {PROFILE_ROLE_OPTIONS.map((opt) => {
                  const isSelected = opt.value === values.role;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onFieldChange("role", opt.value as ProfileSystemRole);
                        setRoleDropdownOpen(false);
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
        ) : (
          <Input
            id="profile-role-locked"
            label="Role Sistem"
            value={currentRoleLabel}
            disabled
            helperText={PROFILE_ROLE_LOCKED_HELPER}
            className="w-full max-w-none"
          />
        )}
      </div>

      {/* Baris Nama Lengkap */}
      <Input
        id="profile-name"
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap"
        value={values.name}
        disabled={isSaving}
        error={errors.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
        className="w-full max-w-none"
      />

      {/* Baris Kontak: Email (Terkunci SSO Google) & Nomor WhatsApp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Input
          id="profile-email"
          label="Email"
          type="email"
          value={email}
          disabled
          helperText={PROFILE_EMAIL_LOCKED_HELPER}
          className="w-full max-w-none"
        />

        <Input
          id="profile-whatsapp"
          label="Nomor WhatsApp"
          type="tel"
          placeholder="Contoh: 0812-6620-1145"
          value={values.whatsapp}
          disabled={isSaving}
          error={errors.whatsapp}
          onChange={(e) => onFieldChange("whatsapp", e.target.value)}
          className="w-full max-w-none"
        />
      </div>

      {/* Baris Aksi Simpan */}
      <div className="flex items-center justify-end w-full">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          loadingText="Menyimpan..."
          leftIcon={<Check className="size-5" aria-hidden="true" />}
        >
          Simpan Data Profil
        </Button>
      </div>
    </form>
  );
}
