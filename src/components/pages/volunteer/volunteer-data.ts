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
  | "Logistik";

export type VolunteerSystemRole = "super" | "core" | "staff" | "member";

export type VolunteerUserRole = "super_admin" | "core" | "staff";

export type VolunteerDemoModal = "none" | "delete" | "cannot-delete";

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
}

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
export const VOLUNTEER_DIVISION_BADGE_TONE: Record<
  VolunteerDivision,
  VolunteerBadgeTone
> = {
  "Operational Manager": "neutral",
  IT: "info",
  Food: "brand",
  Medinfo: "accent",
  Bendahara: "warning",
  Fund: "success",
  Volunteer: "neutral",
  Friend: "neutral",
  Logistik: "info",
};

// 10 baris utama sesuai tabel Figma 149:19230
const PRIMARY_VOLUNTEER_RECORDS: VolunteerRecord[] = [
  {
    id: "vol-1",
    name: "Dian Pratiwi",
    phone: "0812-6620-1145",
    email: "dian.pratiwi@gmail.com",
    division: "Operational Manager",
    role: "super",
  },
  {
    id: "vol-2",
    name: "Fauzan Trisuladana",
    phone: "0857-4412-9031",
    email: "fauzan.tris@ugm.ac.id",
    division: "IT",
    role: "core",
  },
  {
    id: "vol-3",
    name: "Rani Kusuma",
    phone: "0813-2270-6614",
    email: "rani.kusuma@gmail.com",
    division: "Food",
    role: "core",
  },
  {
    id: "vol-4",
    name: "Bima Aditya",
    phone: "0896-5521-0087",
    email: "bima.aditya@gmail.com",
    division: "Food",
    role: "staff",
  },
  {
    id: "vol-5",
    name: "Sari Wulandari",
    phone: "0821-3345-9902",
    email: "sari.wulan@gmail.com",
    division: "Medinfo",
    role: "staff",
  },
  {
    id: "vol-6",
    name: "Fajar Nugroho",
    phone: "0878-1123-4456",
    email: "fajar.nugroho@gmail.com",
    division: "Bendahara",
    role: "staff",
  },
  {
    id: "vol-7",
    name: "Laras Ayuningtyas",
    phone: "0812-9087-3321",
    email: "laras.ayu@mail.ugm.ac.id",
    division: "Fund",
    role: "staff",
  },
  {
    id: "vol-8",
    name: "Hafidz Ramadhan",
    phone: "0815-6678-2210",
    email: "hafidz.r@gmail.com",
    division: "Volunteer",
    role: "member",
  },
  {
    id: "vol-9",
    name: "Tiara Maheswari",
    phone: "0838-2210-7765",
    email: "tiara.mhs@gmail.com",
    division: "Volunteer",
    role: "member",
  },
  {
    id: "vol-10",
    name: "Kevin Halim",
    phone: "0819-4456-3378",
    email: "kevin.halim@gmail.com",
    division: "Friend",
    role: "member",
    hasActiveRelations: true,
  },
];

const EXTRA_FIRST_NAMES = [
  "Nadia",
  "Rizky",
  "Alya",
  "Bagas",
  "Citra",
  "Dimas",
  "Eka",
  "Farhan",
  "Gita",
  "Hendra",
  "Indah",
  "Joko",
  "Kartika",
  "Luthfi",
  "Maya",
  "Naufal",
  "Putri",
  "Reza",
  "Shinta",
  "Taufik",
];

const EXTRA_LAST_NAMES = [
  "Pratama",
  "Saputra",
  "Lestari",
  "Wibowo",
  "Rahmawati",
  "Kurniawan",
  "Hidayat",
  "Santoso",
  "Permata",
  "Suryani",
  "Setiawan",
  "Handayani",
];

const NON_FOOD_DIVISIONS: VolunteerDivision[] = [
  "Operational Manager",
  "IT",
  "Medinfo",
  "Bendahara",
  "Fund",
  "Volunteer",
  "Friend",
  "Logistik",
];

// Menghasilkan 76 data tambahan agar total 86 anggota (24 pengurus + 62 relawan di 9 divisi, dan divisi Food tetap 2 orang sesuai Figma 149:20821)
function buildInitialVolunteerRecords(): VolunteerRecord[] {
  const extraRecords: VolunteerRecord[] = Array.from(
    { length: 76 },
    (_, idx) => {
      const seq = idx + 11;
      const firstName = EXTRA_FIRST_NAMES[idx % EXTRA_FIRST_NAMES.length];
      const lastName =
        EXTRA_LAST_NAMES[
          Math.floor(idx / EXTRA_FIRST_NAMES.length) % EXTRA_LAST_NAMES.length
        ];
      const name = `${firstName} ${lastName}`;
      // 7 pengurus sudah ada di PRIMARY_VOLUNTEER_RECORDS, tambahkan 17 pengurus lagi agar total = 24 pengurus
      const isPengurus = idx < 17;
      const role: VolunteerSystemRole = isPengurus
        ? idx < 4
          ? "core"
          : "staff"
        : "member";
      const division = NON_FOOD_DIVISIONS[idx % NON_FOOD_DIVISIONS.length];
      const mid = String(1100 + ((idx * 73) % 8800)).padStart(4, "0");
      const tail = String(1000 + ((idx * 137) % 8900)).padStart(4, "0");
      const slug = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idx + 1}`;

      return {
        id: `vol-${seq}`,
        name,
        phone: `0813-${mid}-${tail}`,
        email: `${slug}@gmail.com`,
        division,
        role,
        hasActiveRelations: idx % 5 === 0,
      };
    },
  );

  return [...PRIMARY_VOLUNTEER_RECORDS, ...extraRecords];
}

export const INITIAL_VOLUNTEER_RECORDS: VolunteerRecord[] =
  buildInitialVolunteerRecords();

// Memformat angka menggunakan pemisah ribuan Indonesia
export function formatVolunteerCount(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

// Menghitung data kartu ringkasan statistik volunteer (Figma 149:19230)
export function getVolunteerStats(
  records: VolunteerRecord[],
): VolunteerStatItem[] {
  const totalCount = records.length;
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
      subtext: `Di ${divisionCount} divisi`,
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
