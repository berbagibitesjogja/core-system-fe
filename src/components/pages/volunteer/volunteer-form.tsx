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
import { cn } from "#/lib/utils";
import { idVolunteer } from "#/locales";
import { isApiError } from "#/services/errorService";
import {
  VOLUNTEER_DIVISION_OPTIONS,
  VOLUNTEER_ROLE_OPTIONS,
  defaultVolunteerFormValues,
} from "./volunteer-data";
import type {
  VolunteerDivisionOption,
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
  divisionOptions?: VolunteerDivisionOption[];
  isDivisionError?: boolean;
  isDivisionFetching?: boolean;
  onRetryDivision?: () => void;
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()-\s]{8,20}$/;

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
  divisionOptions = VOLUNTEER_DIVISION_OPTIONS.filter((d) => d.id !== "all"),
  isDivisionError = false,
  isDivisionFetching = false,
  onRetryDivision,
}: VolunteerFormProps) {
  const [values, setValues] = React.useState<VolunteerFormValues>(() => ({
    ...defaultVolunteerFormValues,
    ...initialData,
  }));

  const [errors, setErrors] = React.useState<VolunteerFormErrors>({});
  const [duplicateConflict, setDuplicateConflict] = React.useState<{
    field: "email" | "phone";
    ownerName: string;
  } | null>(null);

  const isDivisionFailed = Boolean(isDivisionError);
  const isRetryingDivision = Boolean(isDivisionFetching);

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
    onRetryDivision?.();
  };

  const validate = (formValues: VolunteerFormValues): VolunteerFormErrors => {
    const nextErrors: VolunteerFormErrors = {};
    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedPhone = formValues.phone.trim();

    if (!formValues.division) {
      nextErrors.division = idVolunteer.form.validationDivisionRequired;
    }

    if (!trimmedName) {
      nextErrors.name = idVolunteer.form.validationNameRequired;
    }

    if (!trimmedEmail) {
      nextErrors.email = idVolunteer.form.validationEmailRequired;
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = idVolunteer.form.validationEmailInvalid;
    }

    if (!trimmedPhone) {
      nextErrors.phone = idVolunteer.form.validationPhoneRequired;
    } else if (!PHONE_PATTERN.test(trimmedPhone)) {
      nextErrors.phone = idVolunteer.form.validationPhoneInvalid;
    }

    return nextErrors;
  };

  const handleFieldChange = <TField extends keyof VolunteerFormValues>(
    field: TField,
    val: VolunteerFormValues[TField],
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (duplicateConflict && (field === "email" || field === "phone")) {
      setDuplicateConflict(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDivisionFailed) {
      setErrors((prev) => ({
        ...prev,
        division: idVolunteer.form.validationDivisionLoadFailed,
      }));
      return;
    }

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      });
    } catch (err) {
      if (isApiError(err)) {
        if (
          err.code === "VAL_002" ||
          err.code === "VAL_003" ||
          err.status === 400 ||
          err.status === 409
        ) {
          setDuplicateConflict({
            field: "email",
            ownerName: values.name || idVolunteer.form.defaultOwnerName,
          });
          setErrors((prev) => ({
            ...prev,
            email: err.message,
          }));
        }
      }
    }
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
            {idVolunteer.form.placementSectionTitle}
          </h2>
          <p className="font-sans text-sm text-neutral-500 leading-5">
            {idVolunteer.form.placementSectionSubtitle}
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
            {idVolunteer.form.divisionLabel}
          </label>

          {isDivisionFailed ? (
            /* State Divisi Gagal Dimuat (Figma 150:21549) */
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between w-full h-[44px] px-3.5 rounded-lg border border-red-500 bg-surface shadow-focus-ring-danger">
                <span className="font-sans text-sm font-medium text-red-600">
                  {idVolunteer.form.divisionFailed}
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
                  <span>{idVolunteer.form.retryButton}</span>
                </Button>
              </div>
              <p className="font-sans text-xs font-medium text-red-600">
                {idVolunteer.form.divisionFailedHelper}
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
                  {values.division || idVolunteer.form.divisionPlaceholder}
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
                  aria-label={idVolunteer.form.divisionListboxAria}
                  className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-surface border border-neutral-200 rounded-md shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto"
                >
                  {divisionOptions.map((opt) => {
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
            {idVolunteer.form.roleLabel}
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
            {idVolunteer.form.roleHelper}
          </p>
        </div>
      </div>

      {/* Seksi 2: Identitas & Kontak */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-900 leading-6">
            {idVolunteer.form.identitySectionTitle}
          </h2>
          <p className="font-sans text-sm text-neutral-500 leading-5">
            {idVolunteer.form.identitySectionSubtitle}
          </p>
        </div>

        {/* Peringatan Duplikasi Akun (Figma 150:21212) */}
        {duplicateConflict && (
          <Alert
            tone="danger"
            title={idVolunteer.form.duplicateConflictTitle}
            description={idVolunteer.form.duplicateConflictDescription}
          />
        )}

        {/* Field: Nama Lengkap */}
        <div className="flex flex-col gap-1.5 w-full">
          <Input
            label={idVolunteer.form.nameLabel}
            placeholder={idVolunteer.form.namePlaceholder}
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
              label={idVolunteer.form.emailLabel}
              placeholder={idVolunteer.form.emailPlaceholder}
              value={values.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              error={errors.email}
              helperText={idVolunteer.form.emailHelper}
              disabled={isSubmitting}
              required
              className="w-full max-w-none"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div className="flex flex-col gap-1.5 w-full">
            <Input
              type="tel"
              label={idVolunteer.form.phoneLabel}
              placeholder={idVolunteer.form.phonePlaceholder}
              value={values.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              error={errors.phone}
              helperText={idVolunteer.form.phoneHelper}
              disabled={isSubmitting}
              required
              className="w-full max-w-none"
            />
          </div>
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
          {idVolunteer.form.cancelButton}
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? idVolunteer.form.savingButton
            : mode === "add"
              ? idVolunteer.form.addButton
              : idVolunteer.form.saveChangesButton}
        </Button>
      </div>
    </form>
  );
}
