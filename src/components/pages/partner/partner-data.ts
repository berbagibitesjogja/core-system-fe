import statNewPartnersSvg from "#/assets/illustrations/charity-family.svg";
import statTotalPartnersSvg from "#/assets/illustrations/food-supplements.svg";
import statMostActiveSvg from "#/assets/illustrations/ice-cream.svg";

export type PartnerCategoryId = "all" | "perusahaan" | "individu";

export type PartnerType = "Perusahaan" | "Individu";

export type PartnerUserRole = "super_admin" | "core" | "staff";

export interface PartnerRecord {
  id: string;
  name: string;
  initials?: string;
  type: PartnerType;
  categoryId: Exclude<PartnerCategoryId, "all">;
  donationCount: number;
  impactKg: number;
  lastDonationDate: string;
  isNewThisMonth?: boolean;
  canDelete: boolean;
}

export interface PartnerStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  subtext: string;
  styleVariant: "brand" | "default" | "accent";
  iconName: "sparkles" | "building" | "plus";
  illustrationSrc: string;
  illustrationAlt: string;
}

export interface PartnerFilterOption {
  id: PartnerCategoryId;
  label: string;
  count: number;
}

export const defaultPartners: PartnerRecord[] = [
  {
    id: "ptr-1",
    name: "Holland Bakery",
    initials: "HB",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 106,
    impactKg: 645,
    lastDonationDate: "10 Nov 2026",
    canDelete: false,
  },
  {
    id: "ptr-2",
    name: "Mirota Bakery",
    initials: "MB",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 74,
    impactKg: 402,
    lastDonationDate: "31 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-3",
    name: "Royal Ambarukmo",
    initials: "RA",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 58,
    impactKg: 512,
    lastDonationDate: "7 Nov 2026",
    canDelete: false,
  },
  {
    id: "ptr-4",
    name: "Hotel Tentrem",
    initials: "HT",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 41,
    impactKg: 388,
    lastDonationDate: "27 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-5",
    name: "Sheraton Mustika Yogyakarta",
    initials: "SM",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 36,
    impactKg: 344,
    lastDonationDate: "9 Nov 2026",
    canDelete: false,
  },
  {
    id: "ptr-6",
    name: "Hyatt Regency Yogyakarta",
    initials: "HR",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 29,
    impactKg: 301,
    lastDonationDate: "3 Nov 2026",
    canDelete: false,
  },
  {
    id: "ptr-7",
    name: "Roti Bakar 88",
    initials: "RB",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 24,
    impactKg: 96,
    lastDonationDate: "24 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-8",
    name: "Ibu Sri Wahyuni",
    initials: "IS",
    type: "Individu",
    categoryId: "individu",
    donationCount: 18,
    impactKg: 54,
    lastDonationDate: "12 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-9",
    name: "Artotel Suites Bianti",
    initials: "AS",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 15,
    impactKg: 120,
    lastDonationDate: "5 Nov 2026",
    canDelete: false,
  },
  {
    id: "ptr-10",
    name: "Komunitas Sedekah Jumat",
    initials: "KS",
    type: "Individu",
    categoryId: "individu",
    donationCount: 12,
    impactKg: 40,
    lastDonationDate: "30 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-11",
    name: "The Phoenix Hotel Yogyakarta",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 11,
    impactKg: 88,
    lastDonationDate: "21 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-12",
    name: "Eastparc Hotel Yogyakarta",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 11,
    impactKg: 82,
    lastDonationDate: "18 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-13",
    name: "Grand Mercure Adi Sucipto",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 10,
    impactKg: 76,
    lastDonationDate: "16 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-14",
    name: "Melia Purosani Yogyakarta",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 10,
    impactKg: 74,
    lastDonationDate: "15 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-15",
    name: "BreadTalk Ambarrukmo Plaza",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 9,
    impactKg: 65,
    lastDonationDate: "14 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-16",
    name: "J.CO Donuts Malioboro",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 9,
    impactKg: 58,
    lastDonationDate: "11 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-17",
    name: "Parsley Bakery Jakal",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 8,
    impactKg: 52,
    lastDonationDate: "10 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-18",
    name: "Novotel Suites Malioboro",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 8,
    impactKg: 60,
    lastDonationDate: "9 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-19",
    name: "Swiss-Belboutique Yogyakarta",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 7,
    impactKg: 49,
    lastDonationDate: "7 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-20",
    name: "Harper Malioboro Yogyakarta",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 7,
    impactKg: 46,
    lastDonationDate: "5 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-21",
    name: "Warung Spesial Sambal",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 6,
    impactKg: 42,
    lastDonationDate: "4 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-22",
    name: "Gudeg Yu Djum Wijilan",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 6,
    impactKg: 38,
    lastDonationDate: "2 Okt 2026",
    canDelete: false,
  },
  {
    id: "ptr-23",
    name: "Gaia Cosmo Hotel",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 5,
    impactKg: 35,
    lastDonationDate: "29 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-24",
    name: "Alana Hotel Palagan",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 5,
    impactKg: 34,
    lastDonationDate: "26 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-25",
    name: "Sari Roti Plant Sleman",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 5,
    impactKg: 44,
    lastDonationDate: "23 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-26",
    name: "Bakpia Kurnia Sari",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 4,
    impactKg: 28,
    lastDonationDate: "20 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-27",
    name: "Bakpia Kukus Tugu Jogja",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 4,
    impactKg: 31,
    lastDonationDate: "18 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-28",
    name: "Indomaret Fresh Yogyakarta",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 3,
    impactKg: 24,
    lastDonationDate: "14 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-29",
    name: "Super Indo Kaliurang",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 3,
    impactKg: 27,
    lastDonationDate: "10 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-30",
    name: "Kopi Nalar Gejayan",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 3,
    impactKg: 19,
    lastDonationDate: "7 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-31",
    name: "Restoran Bale Raos",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 2,
    impactKg: 18,
    lastDonationDate: "3 Sep 2026",
    canDelete: false,
  },
  {
    id: "ptr-32",
    name: "Roemah Djawa Catering",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 2,
    impactKg: 16,
    lastDonationDate: "28 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-33",
    name: "Dapur Cokelat Jogja",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 2,
    impactKg: 14,
    lastDonationDate: "24 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-34",
    name: "Tous Les Jours Pakuwon",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 2,
    impactKg: 15,
    lastDonationDate: "19 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-35",
    name: "Klinik Kopi Seturan",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 1,
    impactKg: 8,
    lastDonationDate: "14 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-36",
    name: "Hotel Porta by The Ambarrukmo",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 1,
    impactKg: 12,
    lastDonationDate: "9 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-37",
    name: "Bistro Pendopo Lawas",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 1,
    impactKg: 9,
    lastDonationDate: "4 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-38",
    name: "Cinnamon Pastry Demangan",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 1,
    impactKg: 7,
    lastDonationDate: "1 Agu 2026",
    canDelete: false,
  },
  {
    id: "ptr-39",
    name: "RM Padang Murah Seturan",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 1,
    impactKg: 6,
    lastDonationDate: "25 Jul 2026",
    canDelete: false,
  },
  {
    id: "ptr-40",
    name: "Nasi Box Berkah Sleman",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 0,
    impactKg: 0,
    lastDonationDate: "-",
    isNewThisMonth: true,
    canDelete: true,
  },
  {
    id: "ptr-41",
    name: "Bolu Kukus Merapi",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 0,
    impactKg: 0,
    lastDonationDate: "-",
    isNewThisMonth: true,
    canDelete: true,
  },
  {
    id: "ptr-42",
    name: "Kedai Roti Kotabaru",
    type: "Perusahaan",
    categoryId: "perusahaan",
    donationCount: 0,
    impactKg: 0,
    lastDonationDate: "-",
    isNewThisMonth: true,
    canDelete: true,
  },
];

// Format angka dengan pemisah ribuan titik khas Indonesia
export function formatPartnerNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

// Bulatkan persentase progres kontribusi ke kelipatan 5 sesuai spesifikasi desain
export function calculatePartnerProgress(
  donationCount: number,
  maxDonationCount: number,
): number {
  if (donationCount <= 0 || maxDonationCount <= 0) {
    return 0;
  }
  const rawPercent = (donationCount / maxDonationCount) * 100;
  const rounded = Math.round(rawPercent / 5) * 5;
  return Math.max(5, Math.min(100, rounded));
}

// Hitung ringkasan stat cards dari daftar donatur aktif
export function computePartnerStats(
  partners: PartnerRecord[],
): PartnerStatItem[] {
  const mostActive = partners.reduce<PartnerRecord | null>((best, current) => {
    if (!best || current.donationCount > best.donationCount) {
      return current;
    }
    return best;
  }, null);

  const companyCount = partners.filter(
    (item) => item.categoryId === "perusahaan",
  ).length;
  const individualCount = partners.filter(
    (item) => item.categoryId === "individu",
  ).length;
  const newThisMonthCount = partners.filter(
    (item) => item.isNewThisMonth,
  ).length;

  return [
    {
      id: "stat-most-active",
      title: "Donatur Teraktif",
      value: formatPartnerNumber(mostActive?.donationCount ?? 0),
      unit: "Aksi",
      subtext: mostActive
        ? `${mostActive.name} · ${formatPartnerNumber(mostActive.impactKg)} Kg`
        : "Belum ada donatur",
      styleVariant: "brand",
      iconName: "sparkles",
      illustrationSrc: statMostActiveSvg,
      illustrationAlt: "Ilustrasi donatur teraktif",
    },
    {
      id: "stat-total-partners",
      title: "Total Donatur",
      value: formatPartnerNumber(partners.length),
      unit: "Mitra",
      subtext: `${formatPartnerNumber(companyCount)} perusahaan · ${formatPartnerNumber(individualCount)} individu`,
      styleVariant: "default",
      iconName: "building",
      illustrationSrc: statTotalPartnersSvg,
      illustrationAlt: "Ilustrasi total donatur",
    },
    {
      id: "stat-new-partners",
      title: "Donatur Baru",
      value: formatPartnerNumber(newThisMonthCount),
      unit: "Mitra",
      subtext: "Bergabung bulan ini",
      styleVariant: "default",
      iconName: "plus",
      illustrationSrc: statNewPartnersSvg,
      illustrationAlt: "Ilustrasi donatur baru bulan ini",
    },
  ];
}

// Hitung daftar chip filter kategori beserta jumlah masing-masing
export function computePartnerFilterOptions(
  partners: PartnerRecord[],
): PartnerFilterOption[] {
  const companyCount = partners.filter(
    (item) => item.categoryId === "perusahaan",
  ).length;
  const individualCount = partners.filter(
    (item) => item.categoryId === "individu",
  ).length;

  return [
    { id: "all", label: "Semua", count: partners.length },
    { id: "perusahaan", label: "Perusahaan", count: companyCount },
    { id: "individu", label: "Individu", count: individualCount },
  ];
}
