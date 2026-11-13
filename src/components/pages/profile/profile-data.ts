import type { SidebarProps } from "#/components/shared/sidebar";

export type ProfileSystemRole = "super" | "core" | "staff";

export type ProfileTabKey = "activity" | "settings";

export type ProfileDemoState =
  "default" | "duplicate-phone" | "leave" | "saved";

export type ProfileActivityCategory =
  "Sistem" | "Reimburse" | "Volunteer" | "Donasi";

export interface ProfileOption {
  value: string;
  label: string;
}

export interface ProfileRoleMeta {
  value: ProfileSystemRole;
  badgeLabel: string;
  selectLabel: string;
  sidebarRole: NonNullable<SidebarProps["userRole"]>;
  canViewActivity: boolean;
  canEditRole: boolean;
  divisionBadgeTone: "neutral" | "brand";
}

export interface ProfileTabConfig {
  id: ProfileTabKey;
  label: string;
  requiresSuperAdmin?: boolean;
}

export interface ProfileActivityItem {
  id: string;
  title: string;
  category: ProfileActivityCategory;
  timestampLabel: string;
}

export interface UserProfileRecord {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  division: string;
  role: ProfileSystemRole;
  joinedAtLabel: string;
  avatarSrc?: string;
}

export interface ProfileFormValues {
  name: string;
  division: string;
  role: ProfileSystemRole;
  whatsapp: string;
}

export interface ProfileFormErrors {
  name?: string;
  division?: string;
  role?: string;
  whatsapp?: string;
}

export const PROFILE_SUCCESS_TOAST = "Data profil berhasil diperbarui";
export const PROFILE_DUPLICATE_PHONE_ERROR =
  "Nomor WhatsApp ini sudah terdaftar pada akun lain.";
export const PROFILE_ROLE_EDITABLE_HELPER =
  "Hati-hati: menurunkan role akan membatasi aksesmu.";
export const PROFILE_ROLE_LOCKED_HELPER =
  "Hanya Super Admin yang bisa mengubah role.";
export const PROFILE_EMAIL_LOCKED_HELPER =
  "Terhubung dengan akun Google, tidak bisa diubah.";
export const PROFILE_DUPLICATE_DEMO_PHONE = "0857-4412-9031";
export const PROFILE_LEAVE_DEMO_NAME = "Dian Pratiwi Putri";

// Daftar nomor terdaftar akun lain untuk simulasi validasi konflik 409
export const REGISTERED_CONFLICT_PHONES: readonly string[] = [
  "085744129031",
  "081322706614",
  "085712216860",
  "085750744207",
  "082133459902",
];

export const PROFILE_ROLE_META: Record<ProfileSystemRole, ProfileRoleMeta> = {
  super: {
    value: "super",
    badgeLabel: "Super Admin",
    selectLabel: "Super Admin (super)",
    sidebarRole: "super_admin",
    canViewActivity: true,
    canEditRole: true,
    divisionBadgeTone: "neutral",
  },
  core: {
    value: "core",
    badgeLabel: "Pengurus Inti",
    selectLabel: "Pengurus Inti (core)",
    sidebarRole: "core",
    canViewActivity: false,
    canEditRole: false,
    divisionBadgeTone: "brand",
  },
  staff: {
    value: "staff",
    badgeLabel: "Staff",
    selectLabel: "Staff (staff)",
    sidebarRole: "staff",
    canViewActivity: false,
    canEditRole: false,
    divisionBadgeTone: "neutral",
  },
};

export const PROFILE_DIVISION_OPTIONS: readonly ProfileOption[] = [
  { value: "Operational Manager", label: "Operational Manager" },
  { value: "Food", label: "Food" },
  { value: "Distribusi", label: "Distribusi" },
  { value: "Media & Kemitraan", label: "Media & Kemitraan" },
  { value: "Bendahara", label: "Bendahara" },
];

export const PROFILE_ROLE_OPTIONS: readonly ProfileOption[] = [
  { value: "super", label: PROFILE_ROLE_META.super.selectLabel },
  { value: "core", label: PROFILE_ROLE_META.core.selectLabel },
  { value: "staff", label: PROFILE_ROLE_META.staff.selectLabel },
];

export const PROFILE_TABS: readonly ProfileTabConfig[] = [
  {
    id: "activity",
    label: "Aktivitas",
    requiresSuperAdmin: true,
  },
  {
    id: "settings",
    label: "Pengaturan Profil",
  },
];

export const PROFILE_PRESETS: Record<ProfileSystemRole, UserProfileRecord> = {
  super: {
    id: "user-super-1",
    name: "Dian Pratiwi",
    email: "dian.pratiwi@gmail.com",
    whatsapp: "0812-6620-1145",
    division: "Operational Manager",
    role: "super",
    joinedAtLabel: "12 Januari 2024",
  },
  core: {
    id: "user-core-1",
    name: "Rani Kusuma",
    email: "rani.kusuma@gmail.com",
    whatsapp: "0813-2270-6614",
    division: "Food",
    role: "core",
    joinedAtLabel: "20 Agustus 2024",
  },
  staff: {
    id: "user-staff-1",
    name: "Bima Aditya",
    email: "bima.aditya@gmail.com",
    whatsapp: "0819-4402-7781",
    division: "Distribusi",
    role: "staff",
    joinedAtLabel: "3 November 2025",
  },
};

export const defaultProfileActivities: readonly ProfileActivityItem[] = [
  {
    id: "act-1",
    title: "Masuk ke panel admin",
    category: "Sistem",
    timestampLabel: "5 jam yang lalu",
  },
  {
    id: "act-2",
    title: "Menandai reimburse Fauzan selesai",
    category: "Reimburse",
    timestampLabel: "Kemarin, 20.14",
  },
  {
    id: "act-3",
    title: "Mengubah role Bima Aditya menjadi Staff",
    category: "Volunteer",
    timestampLabel: "7 Nov 2026, 09.30",
  },
  {
    id: "act-4",
    title: "Membuat donasi Holland Bakery",
    category: "Donasi",
    timestampLabel: "6 Nov 2026, 15.02",
  },
  {
    id: "act-5",
    title: "Keluar dari panel admin",
    category: "Sistem",
    timestampLabel: "5 Nov 2026, 22.47",
  },
  {
    id: "act-6",
    title: "Masuk ke panel admin",
    category: "Sistem",
    timestampLabel: "5 Nov 2026, 18.10",
  },
];

// Mengambil inisial maksimal 2 huruf dari nama lengkap
export function computeInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return trimmed.slice(0, 2).toUpperCase();
  }
  return parts
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Menormalkan nomor telepon menjadi deretan digit untuk perbandingan duplikasi & tautan
export function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) {
    return `0${digits.slice(2)}`;
  }
  return digits;
}

// Membentuk tautan WhatsApp aman dari nomor telepon lokal
export function formatWhatsAppHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  const international = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits;
  return `https://wa.me/${international}`;
}

// Memformat label divisi untuk chip profil Top Bar agar selaras desain BBJ
export function formatTopBarDivision(division: string): string {
  if (division === "Operational Manager") {
    return "Divisi Operasional";
  }
  return division.startsWith("Divisi ") ? division : `Divisi ${division}`;
}

// Memeriksa apakah nomor WhatsApp bentrok dengan akun lain
export function isDuplicatePhoneNumber(
  candidatePhone: string,
  currentSavedPhone: string,
): boolean {
  const normalizedCandidate = normalizePhoneDigits(candidatePhone);
  const normalizedCurrent = normalizePhoneDigits(currentSavedPhone);
  if (!normalizedCandidate || normalizedCandidate === normalizedCurrent) {
    return false;
  }
  return REGISTERED_CONFLICT_PHONES.includes(normalizedCandidate);
}

// Mengekstrak nilai awal form dari data profil tersimpan
export function toProfileFormValues(
  profile: UserProfileRecord,
): ProfileFormValues {
  return {
    name: profile.name,
    division: profile.division,
    role: profile.role,
    whatsapp: profile.whatsapp,
  };
}

// Membandingkan nilai form aktif dengan data tersimpan
export function areProfileFormValuesEqual(
  saved: UserProfileRecord,
  draft: ProfileFormValues,
): boolean {
  return (
    saved.name.trim() === draft.name.trim() &&
    saved.division === draft.division &&
    saved.role === draft.role &&
    normalizePhoneDigits(saved.whatsapp) ===
      normalizePhoneDigits(draft.whatsapp) &&
    saved.whatsapp.trim() === draft.whatsapp.trim()
  );
}

// Memvalidasi field form pengaturan profil sebelum menyimpan
export function validateProfileSettings(
  values: ProfileFormValues,
  savedPhone: string,
): ProfileFormErrors {
  const errors: ProfileFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Nama lengkap wajib diisi.";
  }

  if (!values.division.trim()) {
    errors.division = "Divisi wajib dipilih.";
  }

  const digits = normalizePhoneDigits(values.whatsapp);
  if (!digits) {
    errors.whatsapp = "Nomor WhatsApp wajib diisi.";
  } else if (digits.length < 10 || digits.length > 14) {
    errors.whatsapp = "Masukkan nomor WhatsApp yang valid (10-14 digit).";
  } else if (isDuplicatePhoneNumber(values.whatsapp, savedPhone)) {
    errors.whatsapp = PROFILE_DUPLICATE_PHONE_ERROR;
  }

  return errors;
}

// Menyiapkan state awal halaman profil termasuk dukungan preset pratinjau Figma
export function getInitialProfilePreset(
  roleParam?: ProfileSystemRole,
  demoParam?: ProfileDemoState,
): {
  profile: UserProfileRecord;
  formValues: ProfileFormValues;
  fieldErrors: ProfileFormErrors;
  defaultTab: ProfileTabKey;
  openLeaveDialog: boolean;
} {
  const resolvedRole: ProfileSystemRole = roleParam ?? "super";
  const profile = PROFILE_PRESETS[resolvedRole];
  const baseValues = toProfileFormValues(profile);
  const roleMeta = PROFILE_ROLE_META[resolvedRole];

  if (demoParam === "duplicate-phone") {
    return {
      profile,
      formValues: {
        ...baseValues,
        whatsapp: PROFILE_DUPLICATE_DEMO_PHONE,
      },
      fieldErrors: {
        whatsapp: PROFILE_DUPLICATE_PHONE_ERROR,
      },
      defaultTab: "settings",
      openLeaveDialog: false,
    };
  }

  if (demoParam === "leave") {
    return {
      profile,
      formValues: {
        ...baseValues,
        name: PROFILE_LEAVE_DEMO_NAME,
      },
      fieldErrors: {},
      defaultTab: "settings",
      openLeaveDialog: true,
    };
  }

  if (demoParam === "saved") {
    return {
      profile,
      formValues: baseValues,
      fieldErrors: {},
      defaultTab: "settings",
      openLeaveDialog: false,
    };
  }

  return {
    profile,
    formValues: baseValues,
    fieldErrors: {},
    defaultTab: roleMeta.canViewActivity ? "activity" : "settings",
    openLeaveDialog: false,
  };
}
