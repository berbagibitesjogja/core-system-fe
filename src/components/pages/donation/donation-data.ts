import statDonationNearest from "#/assets/illustrations/stat-donation-nearest.svg";
import statDonationQuota from "#/assets/illustrations/stat-donation-quota.svg";
import statDonationActive from "#/assets/illustrations/stat-donation-active.svg";

export type DonationProgram = "Food Rescue" | "CSR";
export type DonationStatus = "Aktif" | "Selesai";

export interface DonationItem {
  id: string;
  date: string;
  day: string;
  isoDate: string;
  donorName: string;
  program: DonationProgram;
  initials: string;
  quotaClaimed: number;
  quotaTotal: number;
  status: DonationStatus;
  canDelete: boolean;
}

export interface DonationStatItem {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  styleVariant: "brand" | "default" | "accent";
  iconName: "clock" | "users" | "package";
  illustrationSrc: string;
  illustrationAlt: string;
}

export interface ProgramFilterOption {
  id: string;
  label: string;
  count: number;
  programValue?: DonationProgram | "ALL";
}

export const defaultProgramFilterOptions: ProgramFilterOption[] = [
  { id: "all", label: "Semua", count: 392, programValue: "ALL" },
  {
    id: "food-rescue",
    label: "Food Rescue",
    count: 340,
    programValue: "Food Rescue",
  },
  { id: "csr", label: "CSR", count: 52, programValue: "CSR" },
];

export const defaultDonationStats: DonationStatItem[] = [
  {
    id: "pengambilan-terdekat",
    title: "Pengambilan Terdekat",
    value: "9 Nov",
    unit: "Senin",
    subtext: "Sheraton Mustika · besok, 17.00",
    styleVariant: "brand",
    iconName: "clock",
    illustrationSrc: statDonationNearest,
    illustrationAlt: "Ilustrasi jam dan kalender pengambilan terdekat",
  },
  {
    id: "kuota-terbanyak",
    title: "Kuota Terbanyak",
    value: "50",
    unit: "Heroes",
    subtext: "Melia Purosani · 29 Okt 2026",
    styleVariant: "default",
    iconName: "users",
    illustrationSrc: statDonationQuota,
    illustrationAlt: "Ilustrasi piala kuota terbanyak",
  },
  {
    id: "donasi-aktif",
    title: "Donasi Aktif",
    value: "3",
    unit: "Donasi",
    subtext: "Sisa 38 kuota heroes",
    styleVariant: "default",
    iconName: "package",
    illustrationSrc: statDonationActive,
    illustrationAlt: "Ilustrasi donasi aktif",
  },
];

export const defaultDonations: DonationItem[] = [
  {
    id: "donasi-1",
    date: "10 November 2026",
    day: "Selasa",
    isoDate: "2026-11-10",
    donorName: "Holland Bakery",
    program: "Food Rescue",
    initials: "HB",
    quotaClaimed: 12,
    quotaTotal: 30,
    status: "Aktif",
    canDelete: false, // Memiliki relasi klaim heroes
  },
  {
    id: "donasi-2",
    date: "9 November 2026",
    day: "Senin",
    isoDate: "2026-11-09",
    donorName: "Sheraton Mustika Yogyakarta",
    program: "CSR",
    initials: "SM",
    quotaClaimed: 20,
    quotaTotal: 40,
    status: "Aktif",
    canDelete: false,
  },
  {
    id: "donasi-3",
    date: "7 November 2026",
    day: "Sabtu",
    isoDate: "2026-11-07",
    donorName: "Royal Ambarukmo",
    program: "Food Rescue",
    initials: "RA",
    quotaClaimed: 35,
    quotaTotal: 35,
    status: "Aktif",
    canDelete: true,
  },
  {
    id: "donasi-4",
    date: "5 November 2026",
    day: "Kamis",
    isoDate: "2026-11-05",
    donorName: "The Phoenix Hotel",
    program: "CSR",
    initials: "PH",
    quotaClaimed: 18,
    quotaTotal: 25,
    status: "Aktif",
    canDelete: true,
  },
  {
    id: "donasi-5",
    date: "3 November 2026",
    day: "Selasa",
    isoDate: "2026-11-03",
    donorName: "Grand Mercure",
    program: "Food Rescue",
    initials: "GM",
    quotaClaimed: 25,
    quotaTotal: 30,
    status: "Aktif",
    canDelete: true,
  },
  {
    id: "donasi-6",
    date: "1 November 2026",
    day: "Minggu",
    isoDate: "2026-11-01",
    donorName: "Parsley Bakery",
    program: "Food Rescue",
    initials: "PB",
    quotaClaimed: 10,
    quotaTotal: 15,
    status: "Selesai",
    canDelete: true,
  },
  {
    id: "donasi-7",
    date: "30 Oktober 2026",
    day: "Jumat",
    isoDate: "2026-10-30",
    donorName: "Hotel Tentrem",
    program: "CSR",
    initials: "HT",
    quotaClaimed: 40,
    quotaTotal: 40,
    status: "Selesai",
    canDelete: false,
  },
  {
    id: "donasi-8",
    date: "28 Oktober 2026",
    day: "Rabu",
    isoDate: "2026-10-28",
    donorName: "Mirota Bakery",
    program: "Food Rescue",
    initials: "MB",
    quotaClaimed: 22,
    quotaTotal: 22,
    status: "Selesai",
    canDelete: true,
  },
  {
    id: "donasi-9",
    date: "24 Oktober 2026",
    day: "Sabtu",
    isoDate: "2026-10-24",
    donorName: "Roti Bakar 88",
    program: "Food Rescue",
    initials: "RB",
    quotaClaimed: 15,
    quotaTotal: 15,
    status: "Selesai",
    canDelete: true,
  },
  {
    id: "donasi-10",
    date: "22 Oktober 2026",
    day: "Kamis",
    isoDate: "2026-10-22",
    donorName: "Swiss-Belboutique",
    program: "Food Rescue",
    initials: "S",
    quotaClaimed: 28,
    quotaTotal: 30,
    status: "Selesai",
    canDelete: true,
  },
];
