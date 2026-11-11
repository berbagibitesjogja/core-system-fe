import * as React from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  ExternalLink,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { Switch } from "#/components/ui/switch";
import { Tag } from "#/components/shared/tag";
import {
  defaultBeneficiaryOptions,
  defaultEmptyDonationForm,
  defaultSponsorOptions,
} from "./donation-data";
import type {
  BeneficiaryOption,
  DonationFormData,
  SponsorOption,
} from "./donation-data";
import { cn } from "#/lib/utils";

export interface DonationFormProps {
  initialData?: Partial<DonationFormData>;
  mode?: "add" | "edit";
  onSubmit: (data: DonationFormData) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
  className?: string;
}

interface FormErrors {
  donorName?: string;
  quota?: string;
  pickupDate?: string;
  pickupHour?: string;
  pickupMinute?: string;
  location?: string;
  mapsUrl?: string;
  beneficiaries?: string;
}

/**
 * DonationForm: Formulir data-driven pembuatan dan pembaruan donasi BBJ.
 * Mengimplementasikan desain Figma Node 121:3581 (Tambah Kosong), 122:3844 (Pilih Beneficiaries),
 * 122:4170 (Validasi Gagal), 122:4524 (Edit Terisi), dan 122:4908 (Menyimpan).
 */
export function DonationForm({
  initialData,
  mode = "add",
  onSubmit,
  onCancel,
  isSubmitting = false,
  className,
}: DonationFormProps) {
  // State data formulir
  const [formData, setFormData] = React.useState<DonationFormData>(() => ({
    ...defaultEmptyDonationForm,
    ...initialData,
    quota: initialData?.quota ? String(initialData.quota) : "",
    duration: initialData?.duration ? String(initialData.duration) : "60",
    beneficiaryIds: initialData?.beneficiaryIds ?? [],
  }));

  // State error validasi
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  // State dropdown interaktif
  const [sponsorDropdownOpen, setSponsorDropdownOpen] = React.useState(false);
  const [sponsorSearch, setSponsorSearch] = React.useState("");
  const [beneficiaryDropdownOpen, setBeneficiaryDropdownOpen] =
    React.useState(false);
  const [beneficiarySearchQuery, setBeneficiarySearchQuery] =
    React.useState("");

  const sponsorDropdownRef = React.useRef<HTMLDivElement>(null);
  const beneficiaryDropdownRef = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        sponsorDropdownRef.current &&
        !sponsorDropdownRef.current.contains(target)
      ) {
        setSponsorDropdownOpen(false);
      }
      if (
        beneficiaryDropdownRef.current &&
        !beneficiaryDropdownRef.current.contains(target)
      ) {
        setBeneficiaryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset pencarian beneficiary saat dropdown ditutup
  React.useEffect(() => {
    if (!beneficiaryDropdownOpen) {
      setBeneficiarySearchQuery((prev) => (prev ? "" : prev));
    }
  }, [beneficiaryDropdownOpen]);

  // Filter daftar sponsor berdasarkan pencarian
  const filteredSponsors = React.useMemo(() => {
    if (!sponsorSearch.trim()) return defaultSponsorOptions;
    const q = sponsorSearch.toLowerCase();
    return defaultSponsorOptions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.category && s.category.toLowerCase().includes(q)),
    );
  }, [sponsorSearch]);

  // Filter daftar beneficiaries berdasarkan pencarian di dropdown sesuai Figma Node 122:4132
  const filteredBeneficiaries = React.useMemo(() => {
    if (!beneficiarySearchQuery.trim()) return defaultBeneficiaryOptions;
    const q = beneficiarySearchQuery.toLowerCase();
    return defaultBeneficiaryOptions.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.category && b.category.toLowerCase().includes(q)),
    );
  }, [beneficiarySearchQuery]);

  // Validasi formulir
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.donorName.trim()) {
      newErrors.donorName = "Pilih donatur / sponsor wajib diisi.";
    }

    const quotaNum = Number(formData.quota);
    if (!formData.quota || isNaN(quotaNum) || quotaNum <= 0) {
      newErrors.quota = "Kuota harus berupa angka positif minimal 1.";
    }

    if (!formData.pickupDate.trim()) {
      newErrors.pickupDate = "Tanggal pengambilan wajib diisi.";
    }

    const hourNum = Number(formData.pickupHour);
    if (
      formData.pickupHour === "" ||
      isNaN(hourNum) ||
      hourNum < 0 ||
      hourNum > 23
    ) {
      newErrors.pickupHour = "Jam tidak valid (00-23).";
    }

    const minNum = Number(formData.pickupMinute);
    if (
      formData.pickupMinute === "" ||
      isNaN(minNum) ||
      minNum < 0 ||
      minNum > 59
    ) {
      newErrors.pickupMinute = "Menit tidak valid (00-59).";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Lokasi pengambilan wajib diisi.";
    }

    if (!formData.mapsUrl.trim()) {
      newErrors.mapsUrl = "Link Google Maps wajib diisi.";
    }

    if (formData.beneficiaryIds.length === 0) {
      newErrors.beneficiaries = "Pilih minimal satu kelompok beneficiaries.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      // Scroll ke atas formulir jika terdapat error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    await onSubmit(formData);
  };

  const handleSelectSponsor = (sponsor: SponsorOption) => {
    setFormData((prev) => ({ ...prev, donorName: sponsor.name }));
    setSponsorDropdownOpen(false);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, donorName: undefined }));
    }
  };

  const handleToggleBeneficiary = (beneficiary: BeneficiaryOption) => {
    setFormData((prev) => {
      const exists = prev.beneficiaryIds.includes(beneficiary.id);
      const updated = exists
        ? prev.beneficiaryIds.filter((id) => id !== beneficiary.id)
        : [...prev.beneficiaryIds, beneficiary.id];

      if (hasSubmitted) {
        setErrors((prevErr) => ({
          ...prevErr,
          beneficiaries:
            updated.length === 0
              ? "Pilih minimal satu kelompok beneficiaries."
              : undefined,
        }));
      }

      return { ...prev, beneficiaryIds: updated };
    });
  };

  const handleRemoveBeneficiary = (id: string) => {
    setFormData((prev) => {
      const updated = prev.beneficiaryIds.filter((bId) => bId !== id);
      if (hasSubmitted && updated.length === 0) {
        setErrors((prevErr) => ({
          ...prevErr,
          beneficiaries: "Pilih minimal satu kelompok beneficiaries.",
        }));
      }
      return { ...prev, beneficiaryIds: updated };
    });
  };

  const hasErrors = hasSubmitted && Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "bg-white border border-neutral-200 rounded-2xl flex flex-col w-full shadow-xs divide-y divide-neutral-200",
        className,
      )}
    >
      {/* Banner Error Validasi Sesuai Figma Node 122:4170 */}
      {hasErrors && (
        <div className="p-6 pb-0">
          <Alert
            tone="danger"
            title="Ada kesalahan pada formulir"
            description="Mohon periksa kembali kolom yang bertanda merah di bawah ini sebelum menyimpan."
            onClose={() => setHasSubmitted(false)}
          />
        </div>
      )}

      {/* =========================================================================
          SEKSI 1: INFORMASI DONASI
          ========================================================================= */}
      <section className="p-6 sm:p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-900">
            Informasi Donasi
          </h2>
          <p className="font-caption text-xs text-neutral-500">
            Siapa donaturnya dan berapa heroes yang bisa mengambil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
          {/* Field: Pilih Sponsor (Combobox Dropdown) */}
          <div
            ref={sponsorDropdownRef}
            className="sm:col-span-8 flex flex-col gap-1.5 relative"
          >
            <label
              htmlFor="sponsor-select-trigger"
              className="font-label text-sm font-semibold text-neutral-900"
            >
              Pilih Sponsor
            </label>

            <button
              id="sponsor-select-trigger"
              type="button"
              onClick={() => setSponsorDropdownOpen((prev) => !prev)}
              aria-expanded={sponsorDropdownOpen}
              aria-haspopup="listbox"
              disabled={isSubmitting}
              className={cn(
                "h-11 px-3.5 rounded-md bg-white flex items-center justify-between text-left text-sm transition-all cursor-pointer outline-none",
                errors.donorName
                  ? "border-[1.5px] border-[var(--color-border-danger,#ef4444)] shadow-[0px_0px_0px_3px_#fecaca]"
                  : sponsorDropdownOpen
                    ? "border-[1.5px] border-[var(--color-border-focus,#009ca6)] shadow-[0px_0px_0px_3px_#b0e0e3]"
                    : "border border-[var(--color-border-input,#8a9499)] hover:border-[var(--color-border-ink,#142023)] focus:border-[1.5px] focus:border-[var(--color-border-focus,#009ca6)] focus:shadow-[0px_0px_0px_3px_#b0e0e3]",
                !formData.donorName && "text-neutral-500",
              )}
            >
              <span className="truncate">
                {formData.donorName || "Donatur / Sponsor"}
              </span>
              <ChevronDown
                className={cn(
                  "size-4.5 text-neutral-500 transition-transform duration-150 shrink-0",
                  sponsorDropdownOpen && "rotate-180 text-brand",
                )}
              />
            </button>

            <FieldHelper error={errors.donorName} />

            {/* Menu Popover Dropdown Pilihan Sponsor */}
            {sponsorDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto flex flex-col p-1.5 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-neutral-100 mb-1">
                  <Search className="size-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari sponsor..."
                    value={sponsorSearch}
                    onChange={(e) => setSponsorSearch(e.target.value)}
                    className="w-full text-xs font-sans focus:outline-none placeholder:text-neutral-400"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  {filteredSponsors.map((s) => {
                    const isSelected = formData.donorName === s.name;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSelectSponsor(s)}
                        className={cn(
                          "w-full px-3 py-2 rounded-sm text-left text-xs font-sans flex items-center justify-between transition-colors cursor-pointer",
                          isSelected
                            ? "bg-bondi-50 text-brand-dark font-semibold"
                            : "text-neutral-800 hover:bg-neutral-50",
                        )}
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{s.name}</span>
                          {s.category && (
                            <span className="text-[11px] text-neutral-500">
                              {s.category}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <Check className="size-4 text-brand shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                  {filteredSponsors.length === 0 && (
                    <p className="p-3 text-xs text-neutral-500 text-center">
                      Sponsor tidak ditemukan
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Field: Kuota */}
          <div className="sm:col-span-4 flex flex-col gap-1.5 w-full">
            <Input
              className="w-full max-w-none"
              label="Kuota"
              type="number"
              min={1}
              placeholder="Contoh: 30"
              value={formData.quota}
              error={errors.quota}
              helperText="Jumlah heroes maksimal."
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, quota: e.target.value }));
                if (hasSubmitted) {
                  setErrors((prev) => ({ ...prev, quota: undefined }));
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEKSI 2: JADWAL & LOKASI
          ========================================================================= */}
      <section className="p-6 sm:p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-900">
            Jadwal & Lokasi
          </h2>
          <p className="font-caption text-xs text-neutral-500">
            Kapan dan di mana heroes mengambil makanan.
          </p>
        </div>

        {/* Row 2: Tanggal, Waktu (Jam:Menit), Durasi */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start w-full">
          {/* Tanggal Pengambilan */}
          <div className="sm:col-span-5 flex flex-col gap-1.5 w-full">
            <Input
              className="w-full max-w-none"
              label="Tanggal Pengambilan"
              type="date"
              leadingIcon={<Calendar className="size-4.5 text-neutral-500" />}
              value={formData.pickupDate}
              error={errors.pickupDate}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  pickupDate: e.target.value,
                }));
                if (hasSubmitted) {
                  setErrors((prev) => ({ ...prev, pickupDate: undefined }));
                }
              }}
            />
          </div>

          {/* Waktu Pengambilan: Jam & Menit */}
          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <span className="font-label text-sm font-semibold text-neutral-900">
              Waktu Pengambilan
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="HH"
                  value={formData.pickupHour}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, pickupHour: val }));
                    if (hasSubmitted) {
                      setErrors((prev) => ({ ...prev, pickupHour: undefined }));
                    }
                  }}
                  className={cn(
                    "w-full h-11 px-3 text-center text-sm font-sans rounded-md bg-white transition-all outline-none",
                    errors.pickupHour
                      ? "border-[1.5px] border-[var(--color-border-danger,#ef4444)] shadow-[0px_0px_0px_3px_#fecaca] text-red-900"
                      : "border border-[var(--color-border-input,#8a9499)] hover:border-[var(--color-border-ink,#142023)] focus:border-[1.5px] focus:border-[var(--color-border-focus,#009ca6)] focus:shadow-[0px_0px_0px_3px_#b0e0e3]",
                  )}
                  aria-label="Jam pengambilan"
                />
              </div>

              <span className="font-heading text-lg font-bold text-neutral-500 select-none">
                :
              </span>

              <div className="flex-1">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="00"
                  value={formData.pickupMinute}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, pickupMinute: val }));
                    if (hasSubmitted) {
                      setErrors((prev) => ({
                        ...prev,
                        pickupMinute: undefined,
                      }));
                    }
                  }}
                  className={cn(
                    "w-full h-11 px-3 text-center text-sm font-sans rounded-md bg-white transition-all outline-none",
                    errors.pickupMinute
                      ? "border-[1.5px] border-[var(--color-border-danger,#ef4444)] shadow-[0px_0px_0px_3px_#fecaca] text-red-900"
                      : "border border-[var(--color-border-input,#8a9499)] hover:border-[var(--color-border-ink,#142023)] focus:border-[1.5px] focus:border-[var(--color-border-focus,#009ca6)] focus:shadow-[0px_0px_0px_3px_#b0e0e3]",
                  )}
                  aria-label="Menit pengambilan"
                />
              </div>
            </div>
            <FieldHelper error={errors.pickupHour || errors.pickupMinute} />
          </div>

          {/* Durasi Pengambilan */}
          <div className="sm:col-span-3 flex flex-col gap-1.5 w-full">
            <Input
              className="w-full max-w-none"
              label="Durasi (menit)"
              type="number"
              placeholder="Contoh: 60"
              value={formData.duration}
              helperText="Opsional"
              disabled={isSubmitting}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, duration: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Row 3: Lokasi & Link Maps (Penuh sesuai Figma 122:3917) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start w-full">
          <Input
            className="w-full max-w-none"
            label="Lokasi"
            placeholder="Pusat Studi Pancasila UGM"
            leadingIcon={<MapPin className="size-4.5 text-neutral-500" />}
            value={formData.location}
            error={errors.location}
            disabled={isSubmitting}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, location: e.target.value }));
              if (hasSubmitted) {
                setErrors((prev) => ({ ...prev, location: undefined }));
              }
            }}
          />

          <Input
            className="w-full max-w-none"
            label="Link Maps"
            placeholder="maps.app.goo.gl/..."
            leadingIcon={<ExternalLink className="size-4.5 text-neutral-500" />}
            value={formData.mapsUrl}
            error={errors.mapsUrl}
            disabled={isSubmitting}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, mapsUrl: e.target.value }));
              if (hasSubmitted) {
                setErrors((prev) => ({ ...prev, mapsUrl: undefined }));
              }
            }}
          />
        </div>
      </section>

      {/* =========================================================================
          SEKSI 3: PENERIMA & PENGUMUMAN
          ========================================================================= */}
      <section className="p-6 sm:p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-900">
            Penerima & Pengumuman
          </h2>
          <p className="font-caption text-xs text-neutral-500">
            Tentukan kelompok penerima dan cara donasi diumumkan.
          </p>
        </div>

        {/* Field: Beneficiaries (Multi-select Tags dengan Fitur Pencarian di Dropdown sesuai Figma Node 122:4132) */}
        <div
          ref={beneficiaryDropdownRef}
          className="flex flex-col gap-1.5 relative w-full"
        >
          <label
            htmlFor="beneficiary-select-trigger"
            className="font-label text-sm font-semibold text-neutral-900"
          >
            Beneficiaries
          </label>

          <div
            id="beneficiary-select-trigger"
            tabIndex={0}
            role="button"
            aria-expanded={beneficiaryDropdownOpen}
            aria-haspopup="listbox"
            onClick={() => setBeneficiaryDropdownOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setBeneficiaryDropdownOpen((prev) => !prev);
              }
            }}
            className={cn(
              "min-h-[46px] p-2 pl-3 pr-10 rounded-md bg-white flex flex-wrap gap-2 items-center relative transition-all cursor-pointer outline-none w-full",
              errors.beneficiaries
                ? "border-[1.5px] border-[var(--color-border-danger,#ef4444)] shadow-[0px_0px_0px_3px_#fecaca]"
                : beneficiaryDropdownOpen
                  ? "border-[1.5px] border-[var(--color-border-focus,#009ca6)] shadow-[0px_0px_0px_3px_#b0e0e3]"
                  : "border border-[var(--color-border-input,#8a9499)] hover:border-[var(--color-border-ink,#142023)] focus:border-[1.5px] focus:border-[var(--color-border-focus,#009ca6)] focus:shadow-[0px_0px_0px_3px_#b0e0e3]",
            )}
          >
            {formData.beneficiaryIds.length === 0 ? (
              <span className="text-sm font-sans text-neutral-500 select-none">
                Pilih / Tambah Beneficiary...
              </span>
            ) : (
              <>
                {formData.beneficiaryIds.map((bId) => {
                  const ben = defaultBeneficiaryOptions.find(
                    (b) => b.id === bId,
                  );
                  return (
                    <Tag
                      key={bId}
                      label={ben?.name ?? bId}
                      removable
                      onRemove={() => handleRemoveBeneficiary(bId)}
                    />
                  );
                })}
                <span className="text-sm font-sans text-neutral-500 select-none">
                  Tambah lagi...
                </span>
              </>
            )}

            <ChevronDown
              className={cn(
                "absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-neutral-500 transition-transform duration-150 pointer-events-none",
                beneficiaryDropdownOpen && "rotate-180 text-brand",
              )}
            />
          </div>

          <FieldHelper
            error={errors.beneficiaries}
            helperText="Pilih satu atau lebih kelompok penerima manfaat."
          />

          {/* Menu Dropdown Checklist Beneficiaries dengan Fitur Pencarian sesuai Figma Node 122:4132 */}
          {beneficiaryDropdownOpen && (
            <div
              className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-neutral-200 rounded-md drop-shadow-[0px_8px_12px_rgba(20,32,35,0.1)] shadow-lg flex flex-col p-1.5 gap-0.5 animate-in fade-in zoom-in-95 duration-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Kolom Pencarian Beneficiary di dalam Dropdown */}
              <div className="bg-[#eef1f2] rounded-lg px-3 py-2 flex items-center gap-2 mb-1">
                <Search className="size-4 text-neutral-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Cari beneficiary..."
                  value={beneficiarySearchQuery}
                  onChange={(e) => setBeneficiarySearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-sans text-neutral-900 placeholder:text-neutral-500 outline-none"
                  autoFocus
                />
                {beneficiarySearchQuery && (
                  <button
                    type="button"
                    onClick={() => setBeneficiarySearchQuery("")}
                    className="text-neutral-400 hover:text-neutral-600 cursor-pointer p-0.5"
                    aria-label="Bersihkan pencarian"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Daftar Pilihan Beneficiary */}
              <div className="max-h-60 overflow-y-auto flex flex-col gap-0.5">
                {filteredBeneficiaries.map((ben) => {
                  const isSelected = formData.beneficiaryIds.includes(ben.id);
                  return (
                    <button
                      key={ben.id}
                      type="button"
                      onClick={() => handleToggleBeneficiary(ben)}
                      className={cn(
                        "w-full px-3 py-2 rounded-lg text-left flex items-center gap-3 transition-colors cursor-pointer",
                        isSelected ? "bg-bondi-50/70" : "hover:bg-neutral-100",
                      )}
                    >
                      {/* Kotak Checkbox Figma (18x18px rounded-xs) */}
                      <div
                        className={cn(
                          "size-[18px] rounded-[4px] flex items-center justify-center shrink-0 transition-all",
                          isSelected
                            ? "bg-brand text-white"
                            : "bg-white border-[1.5px] border-neutral-400",
                        )}
                      >
                        {isSelected && (
                          <Check className="size-3 text-white stroke-[2.5]" />
                        )}
                      </div>

                      {/* Teks Nama & Kategori Beneficiary */}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[14px] leading-[20px] font-normal text-neutral-900">
                          {ben.name}
                        </span>
                        {ben.category && (
                          <span className="text-[12px] leading-[16px] text-neutral-500">
                            {ben.category}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}

                {filteredBeneficiaries.length === 0 && (
                  <div className="p-3 text-center text-xs text-neutral-500 font-sans">
                    Tidak ada beneficiary yang cocok
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Field: Pesan Khusus (Penuh sesuai Figma Node 122:3930) */}
        <div className="flex flex-col gap-1.5 w-full">
          <Input
            className="w-full max-w-none"
            label="Pesan Khusus"
            placeholder="Contoh: Bawa wadah sendiri ya!"
            value={formData.notes}
            helperText="Opsional. Ditampilkan ke heroes saat klaim voucher."
            disabled={isSubmitting}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </div>

        {/* Options: Toggle Donasi (CSR) & Umumkan */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Opsi Donasi / CSR */}
          <div className="p-4 rounded-md border border-neutral-200 flex items-center justify-between gap-4 bg-white hover:border-neutral-300 transition-colors">
            <div className="flex flex-col min-w-0">
              <span className="font-label text-sm font-semibold text-neutral-900">
                Donasi
              </span>
              <span className="font-caption text-xs text-neutral-500">
                Tandai sebagai program CSR / charity.
              </span>
            </div>
            <Switch
              checked={formData.isCsr}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, isCsr: checked }))
              }
              disabled={isSubmitting}
              showLabel={false}
              aria-label="Tandai sebagai program CSR"
            />
          </div>

          {/* Opsi Umumkan ke Relawan */}
          <div className="p-4 rounded-md border border-neutral-200 flex items-center justify-between gap-4 bg-white hover:border-neutral-300 transition-colors">
            <div className="flex flex-col min-w-0">
              <span className="font-label text-sm font-semibold text-neutral-900">
                Umumkan
              </span>
              <span className="font-caption text-xs text-neutral-500">
                Kirim notifikasi donasi ini ke semua relawan.
              </span>
            </div>
            <Switch
              checked={formData.shouldAnnounce}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, shouldAnnounce: checked }))
              }
              disabled={isSubmitting}
              showLabel={false}
              aria-label="Kirim notifikasi ke relawan"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          FORM FOOTER (Aksi Batal & Simpan)
          ========================================================================= */}
      <footer className="p-6 bg-neutral-100/40 flex items-center justify-end gap-3 rounded-b-2xl">
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
          disabled={isSubmitting}
          className="drop-shadow-[0px_2px_0px_#142023]"
        >
          {isSubmitting
            ? "Menyimpan..."
            : mode === "add"
              ? "Simpan Donasi"
              : "Simpan Perubahan"}
        </Button>
      </footer>
    </form>
  );
}
