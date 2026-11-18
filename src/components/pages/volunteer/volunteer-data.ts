import charitySharingSvg from "#/assets/illustrations/charity-sharing.svg";
import lunchBoxSvg from "#/assets/illustrations/lunch-box.svg";
import volunteerRelaxingSvg from "#/assets/illustrations/volunteer-relaxing.svg";

export type VolunteerDivision =
  | "Operational Manager"
  | "IT"
  | "Food"
  | "Medinfo"
  | "Bendahara"
  | "Fund"
  | "Volunteer"
  | "Friend"
  | "Logistik"
  | "Managerial"
  | "Operational"
  | string;

export type VolunteerSystemRole = "super" | "core" | "staff" | "member";

export type VolunteerUserRole = "super_admin" | "core" | "staff";

export type VolunteerBadgeTone =
  "neutral" | "brand" | "accent" | "success" | "warning" | "danger" | "info";

export interface VolunteerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  division: VolunteerDivision;
  role: VolunteerSystemRole;
  hasActiveRelations?: boolean;
  joinedDate?: string;
}

export interface VolunteerActivityItem {
  id: string;
  title: string;
  category: string;
  timestampLabel: string;
}

export const defaultVolunteerActivities: readonly VolunteerActivityItem[] = [
  {
    id: "act-1",
    title: "Masuk ke panel admin",
    category: "Sistem",
    timestampLabel: "3 jam yang lalu",
  },
  {
    id: "act-2",
    title: "Memperbarui donasi Holland Bakery",
    category: "Donasi",
    timestampLabel: "Kemarin, 16.42",
  },
  {
    id: "act-3",
    title: "Menambahkan hero Nadia Putri",
    category: "Heroes",
    timestampLabel: "6 Nov 2026, 10.15",
  },
  {
    id: "act-4",
    title: "Mengajukan reimburse Rp85.000",
    category: "Reimburse",
    timestampLabel: "4 Nov 2026, 19.03",
  },
  {
    id: "act-5",
    title: "Menambahkan sektor Kedokteran Gigi",
    category: "Beneficiary",
    timestampLabel: "2 Nov 2026, 14.20",
  },
  {
    id: "act-6",
    title: "Masuk ke panel admin",
    category: "Sistem",
    timestampLabel: "2 Nov 2026, 08.11",
  },
];

export const VOLUNTEER_ROLE_META: Record<
  VolunteerSystemRole,
  {
    label: string;
    styleVariant: "solid" | "soft";
    tone: "neutral" | "brand";
    helperText: string;
  }
> = {
  super: {
    label: "Super Admin",
    styleVariant: "solid",
    tone: "neutral",
    helperText: "Akses penuh ke seluruh sistem dan audit log.",
  },
  core: {
    label: "Pengurus Inti",
    styleVariant: "solid",
    tone: "neutral",
    helperText: "Bisa kelola dan hapus data.",
  },
  staff: {
    label: "Staff",
    styleVariant: "soft",
    tone: "neutral",
    helperText: "Bisa melihat data internal dan menginput laporan.",
  },
  member: {
    label: "Volunteer / Anggota",
    styleVariant: "soft",
    tone: "neutral",
    helperText: "Hanya akses data publik dan tugas lapangan.",
  },
};

export interface VolunteerStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  subtext: string;
  styleVariant: "default" | "brand";
  iconName: "users" | "grid" | "heart";
  illustrationSrc: string;
  illustrationAlt: string;
}

export interface VolunteerDivisionOption {
  id: string;
  label: string;
}

export interface VolunteerRoleOption {
  id: VolunteerSystemRole;
  title: string;
  description: string;
}

export interface VolunteerFormValues {
  division: string;
  role: VolunteerSystemRole;
  name: string;
  email: string;
  phone: string;
}

export const defaultVolunteerFormValues: VolunteerFormValues = {
  division: "",
  role: "member",
  name: "",
  email: "",
  phone: "",
};

export const defaultEditVolunteerData: VolunteerFormValues = {
  division: "Food",
  role: "staff",
  name: "Bima Aditya",
  email: "bima.aditya@gmail.com",
  phone: "0896-5521-0087",
};

// 4 Opsi role yang dapat dipilih dalam formulir volunteer (Figma 150:20894 - 150:21114)
export const VOLUNTEER_ROLE_OPTIONS: VolunteerRoleOption[] = [
  {
    id: "member",
    title: "Volunteer / Anggota",
    description: "Ikut kegiatan, tidak bisa masuk panel admin.",
  },
  {
    id: "staff",
    title: "Staff",
    description: "Kelola data harian, tanpa hapus data.",
  },
  {
    id: "core",
    title: "Pengurus Inti",
    description: "Kelola dan hapus data seluruh modul.",
  },
  {
    id: "super",
    title: "Super Admin",
    description: "Akses penuh, termasuk log aktivitas.",
  },
];

// Daftar opsi filter divisi pada toolbar halaman Volunteer
export const VOLUNTEER_DIVISION_OPTIONS: VolunteerDivisionOption[] = [
  { id: "all", label: "Semua Divisi" },
  { id: "Operational Manager", label: "Operational Manager" },
  { id: "IT", label: "IT" },
  { id: "Food", label: "Food" },
  { id: "Medinfo", label: "Medinfo" },
  { id: "Bendahara", label: "Bendahara" },
  { id: "Fund", label: "Fund" },
  { id: "Volunteer", label: "Volunteer" },
  { id: "Friend", label: "Friend" },
  { id: "Logistik", label: "Logistik" },
];

// Pemetaan warna badge tiap divisi sesuai desain Figma 149:19230
export const VOLUNTEER_DIVISION_BADGE_TONE: Record<string, VolunteerBadgeTone> =
  {
    "Operational Manager": "neutral",
    IT: "info",
    Food: "brand",
    Medinfo: "accent",
    Bendahara: "warning",
    Fund: "success",
    Volunteer: "neutral",
    Friend: "neutral",
    Logistik: "info",
    Managerial: "warning",
    Operational: "brand",
  };

// Mengambil tone badge divisi dengan fallback aman neutral
export function getVolunteerDivisionBadgeTone(
  division: string,
): VolunteerBadgeTone {
  const normalized = division.trim();
  return VOLUNTEER_DIVISION_BADGE_TONE[normalized] ?? "neutral";
}

// Pemetaan nama divisi ke ID divisi di database (core-system divisions table)
export const DIVISION_NAME_TO_ID: Record<string, number> = {
  IT: 1,
  Managerial: 2,
  Operational: 3,
  "Operational Manager": 3,
  Food: 3,
  Logistik: 3,
  Medinfo: 4,
  Bendahara: 2,
  Fund: 2,
  Volunteer: 3,
  Friend: 3,
};

// Pemetaan ID divisi database ke label nama divisi
export const DIVISION_ID_TO_NAME: Record<number, string> = {
  1: "IT",
  2: "Managerial",
  3: "Operational",
  4: "Medinfo",
};

// Mengubah daftar divisi API menjadi opsi dropdown toolbar (termasuk opsi "Semua Divisi")
export function mapDivisionsToOptions(
  divisions?: { id: number; name: string }[],
): VolunteerDivisionOption[] {
  if (!divisions || divisions.length === 0) {
    return VOLUNTEER_DIVISION_OPTIONS;
  }
  return [
    { id: "all", label: "Semua Divisi" },
    ...divisions.map((item) => ({ id: item.name, label: item.name })),
  ];
}

// Mengubah daftar divisi API menjadi opsi dropdown form (tanpa "Semua Divisi")
export function mapDivisionsToFormOptions(
  divisions?: { id: number; name: string }[],
): VolunteerDivisionOption[] {
  if (!divisions || divisions.length === 0) {
    return VOLUNTEER_DIVISION_OPTIONS.filter((item) => item.id !== "all");
  }
  return divisions.map((item) => ({ id: item.name, label: item.name }));
}

// Mencari ID divisi berdasarkan nama divisi secara dinamis dari API atau kamus statis
export function getDivisionIdByName(
  name: string,
  divisions?: { id: number; name: string }[],
): number | undefined {
  if (divisions && divisions.length > 0) {
    const found = divisions.find(
      (item) => item.name.toLowerCase() === name.trim().toLowerCase(),
    );
    if (found) return found.id;
  }
  return DIVISION_NAME_TO_ID[name.trim()];
}

// Mencari nama divisi berdasarkan ID divisi secara dinamis dari API atau kamus statis
export function getDivisionNameById(
  id: number,
  divisions?: { id: number; name: string }[],
): string | undefined {
  if (divisions && divisions.length > 0) {
    const found = divisions.find((item) => item.id === id);
    if (found) return found.name;
  }
  return DIVISION_ID_TO_NAME[id];
}

// Memformat angka menggunakan pemisah ribuan Indonesia
export function formatVolunteerCount(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

// Menghitung data kartu ringkasan statistik volunteer dari data aktif API (Figma 149:19230)
export function getVolunteerStats(
  records: VolunteerRecord[],
  totalFromMeta?: number,
): VolunteerStatItem[] {
  const totalCount = totalFromMeta ?? records.length;
  const pengurusCount = records.filter(
    (item) =>
      item.role === "super" || item.role === "core" || item.role === "staff",
  ).length;
  const relawanCount = records.filter((item) => item.role === "member").length;
  const divisionCount = new Set(records.map((item) => item.division)).size;

  return [
    {
      id: "total-anggota",
      title: "Total Anggota",
      value: formatVolunteerCount(totalCount),
      unit: "Orang",
      subtext:
        divisionCount > 0
          ? `Di ${divisionCount} divisi`
          : "Terdaftar di sistem",
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: charitySharingSvg,
      illustrationAlt: "Ilustrasi Total Anggota",
    },
    {
      id: "pengurus",
      title: "Pengurus",
      value: formatVolunteerCount(pengurusCount),
      unit: "Orang",
      subtext: "Super, core, dan staff",
      styleVariant: "default",
      iconName: "grid",
      illustrationSrc: volunteerRelaxingSvg,
      illustrationAlt: "Ilustrasi Pengurus",
    },
    {
      id: "relawan",
      title: "Relawan",
      value: formatVolunteerCount(relawanCount),
      unit: "Orang",
      subtext: "Tidak bisa masuk panel admin",
      styleVariant: "default",
      iconName: "heart",
      illustrationSrc: lunchBoxSvg,
      illustrationAlt: "Ilustrasi Relawan",
    },
  ];
}
