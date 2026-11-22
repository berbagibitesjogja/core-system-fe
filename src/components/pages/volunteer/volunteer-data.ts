import charitySharingSvg from "#/assets/illustrations/charity-sharing.svg";
import lunchBoxSvg from "#/assets/illustrations/lunch-box.svg";
import volunteerRelaxingSvg from "#/assets/illustrations/volunteer-relaxing.svg";
import { idVolunteer, idShared } from "#/locales";

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

export const defaultVolunteerActivities: readonly VolunteerActivityItem[] =
  idVolunteer.detail.activityTab.mockActivities;

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
    label: idVolunteer.roles.super.label,
    styleVariant: "solid",
    tone: "neutral",
    helperText: idVolunteer.roles.super.helperText,
  },
  core: {
    label: idVolunteer.roles.core.label,
    styleVariant: "solid",
    tone: "neutral",
    helperText: idVolunteer.roles.core.helperText,
  },
  staff: {
    label: idVolunteer.roles.staff.label,
    styleVariant: "soft",
    tone: "neutral",
    helperText: idVolunteer.roles.staff.helperText,
  },
  member: {
    label: idVolunteer.roles.member.label,
    styleVariant: "soft",
    tone: "neutral",
    helperText: idVolunteer.roles.member.helperText,
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
    title: idVolunteer.roles.member.label,
    description: idVolunteer.roles.member.description,
  },
  {
    id: "staff",
    title: idVolunteer.roles.staff.label,
    description: idVolunteer.roles.staff.description,
  },
  {
    id: "core",
    title: idVolunteer.roles.core.label,
    description: idVolunteer.roles.core.description,
  },
  {
    id: "super",
    title: idVolunteer.roles.super.label,
    description: idVolunteer.roles.super.description,
  },
];

// Daftar opsi filter divisi pada toolbar halaman Volunteer
export const VOLUNTEER_DIVISION_OPTIONS: VolunteerDivisionOption[] = [
  { id: "all", label: idVolunteer.list.toolbar.divisionPlaceholder },
  { id: "Operational Manager", label: idShared.divisions.operationalManager },
  { id: "IT", label: idShared.divisions.it },
  { id: "Food", label: idShared.divisions.food },
  { id: "Medinfo", label: idShared.divisions.medinfo },
  { id: "Bendahara", label: idShared.divisions.bendahara },
  { id: "Fund", label: idShared.divisions.fund },
  { id: "Volunteer", label: idShared.divisions.volunteer },
  { id: "Friend", label: idShared.divisions.friend },
  { id: "Logistik", label: idShared.divisions.logistik },
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
    { id: "all", label: idVolunteer.list.toolbar.divisionPlaceholder },
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
      title: idVolunteer.list.stats.totalMembersTitle,
      value: formatVolunteerCount(totalCount),
      unit: idVolunteer.list.stats.unitMembers,
      subtext:
        divisionCount > 0
          ? idVolunteer.list.stats.subtextDivision(divisionCount)
          : idVolunteer.list.stats.subtextDefault,
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: charitySharingSvg,
      illustrationAlt: idVolunteer.list.stats.altTotalMembers,
    },
    {
      id: "pengurus",
      title: idVolunteer.list.stats.executivesTitle,
      value: formatVolunteerCount(pengurusCount),
      unit: idVolunteer.list.stats.unitExecutives,
      subtext: idVolunteer.list.stats.subtextExecutives,
      styleVariant: "default",
      iconName: "grid",
      illustrationSrc: volunteerRelaxingSvg,
      illustrationAlt: idVolunteer.list.stats.altExecutives,
    },
    {
      id: "relawan",
      title: idVolunteer.list.stats.volunteersTitle,
      value: formatVolunteerCount(relawanCount),
      unit: idVolunteer.list.stats.unitVolunteers,
      subtext: idVolunteer.list.stats.subtextVolunteers,
      styleVariant: "default",
      iconName: "heart",
      illustrationSrc: lunchBoxSvg,
      illustrationAlt: idVolunteer.list.stats.altVolunteers,
    },
  ];
}
