import statHeroBlocked from "#/assets/illustrations/stat-hero-blocked.svg";
import statHeroMonth from "#/assets/illustrations/stat-hero-month.svg";
import statHeroTotal from "#/assets/illustrations/stat-hero-total.svg";

export type HeroStatus = "aktif" | "diblokir";

export type HeroUserRole = "super_admin" | "core" | "staff";

export interface HeroRecord {
  id: string;
  name: string;
  phone?: string;
  beneficiaryId: string;
  beneficiaryName: string;
  sectorId: string;
  sectorName: string;
  status: HeroStatus;
  actionCount: number;
  canDelete: boolean;
}

export interface HeroSectorOption {
  id: string;
  name: string;
  heroesCount: number;
}

export interface HeroBeneficiaryOption {
  id: string;
  name: string;
  totalHeroesCount: number;
  sectors: HeroSectorOption[];
}

export interface HeroStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  subtext: string;
  styleVariant: "brand" | "default" | "accent";
  iconName: "users" | "check" | "x-circle";
  illustrationSrc: string;
  illustrationAlt: string;
}

export interface HeroFormValues {
  beneficiaryId: string;
  sectorId: string;
  name: string;
  phone: string;
  isBlocked: boolean;
}

export const HERO_DEFAULT_PER_PAGE = 10;
export const HERO_BASELINE_TOTAL = 14933;
export const HERO_MONTHLY_ACTIVE = 3020;
export const HERO_BASELINE_BLOCKED = 62;

export const defaultHeroBeneficiaryOptions: HeroBeneficiaryOption[] = [
  {
    id: "ben-1",
    name: "Universitas Gadjah Mada",
    totalHeroesCount: 4785,
    sectors: [
      { id: "ugm-biologi", name: "Biologi", heroesCount: 71 },
      { id: "ugm-feb", name: "Ekonomika dan Bisnis", heroesCount: 95 },
      { id: "ugm-farmasi", name: "Farmasi", heroesCount: 68 },
      { id: "ugm-hukum", name: "Hukum", heroesCount: 58 },
      { id: "ugm-kedokteran", name: "Kedokteran", heroesCount: 64 },
      { id: "ugm-kehutanan", name: "Kehutanan", heroesCount: 64 },
      { id: "ugm-mipa", name: "MIPA", heroesCount: 76 },
      { id: "ugm-teknik", name: "Teknik", heroesCount: 88 },
    ],
  },
  {
    id: "ben-2",
    name: "Masyarakat Umum",
    totalHeroesCount: 3120,
    sectors: [
      { id: "mu-sinduadi", name: "Kel. Sinduadi", heroesCount: 840 },
      { id: "mu-code", name: "Kampung Code RW 03", heroesCount: 620 },
      { id: "mu-terban", name: "RW 01 Terban", heroesCount: 540 },
      { id: "mu-gondokusuman", name: "RW 02 Gondokusuman", heroesCount: 490 },
    ],
  },
  {
    id: "ben-3",
    name: "Universitas Negeri Yogyakarta",
    totalHeroesCount: 2046,
    sectors: [
      { id: "uny-mipa", name: "MIPA", heroesCount: 410 },
      { id: "uny-teknik", name: "Teknik", heroesCount: 520 },
      { id: "uny-fip", name: "Ilmu Pendidikan", heroesCount: 480 },
      { id: "uny-feb", name: "Ekonomi dan Bisnis", heroesCount: 390 },
    ],
  },
  {
    id: "ben-4",
    name: "UIN Sunan Kalijaga",
    totalHeroesCount: 1512,
    sectors: [
      { id: "uin-saintek", name: "Saintek", heroesCount: 420 },
      { id: "uin-syariah", name: "Syariah dan Hukum", heroesCount: 385 },
      { id: "uin-ushuluddin", name: "Ushuluddin", heroesCount: 310 },
    ],
  },
  {
    id: "ben-5",
    name: "Yayasan Hamba",
    totalHeroesCount: 1080,
    sectors: [
      { id: "yh-putri", name: "Panti Asuhan Putri", heroesCount: 430 },
      { id: "yh-asrama", name: "Asrama Utama", heroesCount: 360 },
      { id: "yh-pendidikan", name: "Unit Pendidikan", heroesCount: 290 },
    ],
  },
  {
    id: "ben-6",
    name: "Universitas Islam Indonesia",
    totalHeroesCount: 1340,
    sectors: [
      { id: "uii-hukum", name: "Hukum", heroesCount: 450 },
      { id: "uii-fti", name: "Teknologi Industri", heroesCount: 490 },
      { id: "uii-ekonomi", name: "Ekonomi", heroesCount: 400 },
    ],
  },
];

export const defaultHeroes: HeroRecord[] = [
  {
    id: "hero-1",
    name: "Fariha Ramadhani",
    phone: "0812-3456-7890",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-kehutanan",
    sectorName: "Kehutanan",
    status: "aktif",
    actionCount: 12,
    canDelete: false,
  },
  {
    id: "hero-2",
    name: "Rizky Pratama",
    phone: "0857-2210-4418",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-teknik",
    sectorName: "Teknik",
    status: "aktif",
    actionCount: 9,
    canDelete: false,
  },
  {
    id: "hero-3",
    name: "Ayu Lestari",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-farmasi",
    sectorName: "Farmasi",
    status: "aktif",
    actionCount: 8,
    canDelete: false,
  },
  {
    id: "hero-4",
    name: "Galih Saputra",
    phone: "0813-9902-7765",
    beneficiaryId: "ben-3",
    beneficiaryName: "Universitas Negeri Yogyakarta",
    sectorId: "uny-mipa",
    sectorName: "MIPA",
    status: "diblokir",
    actionCount: 7,
    canDelete: false,
  },
  {
    id: "hero-5",
    name: "Putri Maharani",
    phone: "0821-4433-1020",
    beneficiaryId: "ben-2",
    beneficiaryName: "Masyarakat Umum",
    sectorId: "mu-sinduadi",
    sectorName: "Kel. Sinduadi",
    status: "aktif",
    actionCount: 7,
    canDelete: false,
  },
  {
    id: "hero-6",
    name: "Dimas Ardiansyah",
    phone: "0896-1177-3021",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-feb",
    sectorName: "Ekonomika dan Bisnis",
    status: "aktif",
    actionCount: 6,
    canDelete: false,
  },
  {
    id: "hero-7",
    name: "Siti Aminah",
    beneficiaryId: "ben-5",
    beneficiaryName: "Yayasan Hamba",
    sectorId: "yh-putri",
    sectorName: "Panti Asuhan Putri",
    status: "aktif",
    actionCount: 6,
    canDelete: false,
  },
  {
    id: "hero-8",
    name: "Bagas Wicaksono",
    phone: "0812-7788-1290",
    beneficiaryId: "ben-4",
    beneficiaryName: "UIN Sunan Kalijaga",
    sectorId: "uin-saintek",
    sectorName: "Saintek",
    status: "aktif",
    actionCount: 5,
    canDelete: false,
  },
  {
    id: "hero-9",
    name: "Nur Halimah",
    phone: "0878-6655-1203",
    beneficiaryId: "ben-2",
    beneficiaryName: "Masyarakat Umum",
    sectorId: "mu-code",
    sectorName: "Kampung Code RW 03",
    status: "aktif",
    actionCount: 4,
    canDelete: false,
  },
  {
    id: "hero-10",
    name: "Yoga Prasetyo",
    phone: "0815-3321-9087",
    beneficiaryId: "ben-6",
    beneficiaryName: "Universitas Islam Indonesia",
    sectorId: "uii-hukum",
    sectorName: "Hukum",
    status: "aktif",
    actionCount: 3,
    canDelete: true,
  },
  {
    id: "hero-11",
    name: "Nadia Kusuma",
    phone: "0852-9012-3341",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-biologi",
    sectorName: "Biologi",
    status: "aktif",
    actionCount: 6,
    canDelete: false,
  },
  {
    id: "hero-12",
    name: "Bima Mahendra",
    phone: "0819-4412-8820",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-biologi",
    sectorName: "Biologi",
    status: "aktif",
    actionCount: 4,
    canDelete: true,
  },
  {
    id: "hero-13",
    name: "Clara Setyawati",
    phone: "0877-3120-5591",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-kedokteran",
    sectorName: "Kedokteran",
    status: "aktif",
    actionCount: 5,
    canDelete: false,
  },
  {
    id: "hero-14",
    name: "Farhan Nugroho",
    phone: "0856-7712-9045",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-mipa",
    sectorName: "MIPA",
    status: "aktif",
    actionCount: 3,
    canDelete: true,
  },
  {
    id: "hero-15",
    name: "Intan Permatasari",
    phone: "0813-2209-6674",
    beneficiaryId: "ben-1",
    beneficiaryName: "Universitas Gadjah Mada",
    sectorId: "ugm-hukum",
    sectorName: "Hukum",
    status: "diblokir",
    actionCount: 2,
    canDelete: false,
  },
  {
    id: "hero-16",
    name: "Hendra Wijaya",
    beneficiaryId: "ben-2",
    beneficiaryName: "Masyarakat Umum",
    sectorId: "mu-terban",
    sectorName: "RW 01 Terban",
    status: "aktif",
    actionCount: 4,
    canDelete: false,
  },
  {
    id: "hero-17",
    name: "Dewi Anggraini",
    phone: "0822-8811-4320",
    beneficiaryId: "ben-2",
    beneficiaryName: "Masyarakat Umum",
    sectorId: "mu-gondokusuman",
    sectorName: "RW 02 Gondokusuman",
    status: "aktif",
    actionCount: 2,
    canDelete: true,
  },
  {
    id: "hero-18",
    name: "Taufik Hidayat",
    phone: "0858-1234-9901",
    beneficiaryId: "ben-3",
    beneficiaryName: "Universitas Negeri Yogyakarta",
    sectorId: "uny-teknik",
    sectorName: "Teknik",
    status: "aktif",
    actionCount: 5,
    canDelete: false,
  },
  {
    id: "hero-19",
    name: "Larasati Putri",
    phone: "0818-5501-2234",
    beneficiaryId: "ben-3",
    beneficiaryName: "Universitas Negeri Yogyakarta",
    sectorId: "uny-fip",
    sectorName: "Ilmu Pendidikan",
    status: "aktif",
    actionCount: 1,
    canDelete: true,
  },
  {
    id: "hero-20",
    name: "Raka Ramadhan",
    phone: "0895-3302-7741",
    beneficiaryId: "ben-4",
    beneficiaryName: "UIN Sunan Kalijaga",
    sectorId: "uin-syariah",
    sectorName: "Syariah dan Hukum",
    status: "aktif",
    actionCount: 3,
    canDelete: false,
  },
  {
    id: "hero-21",
    name: "Salsa Rahmawati",
    beneficiaryId: "ben-5",
    beneficiaryName: "Yayasan Hamba",
    sectorId: "yh-asrama",
    sectorName: "Asrama Utama",
    status: "aktif",
    actionCount: 4,
    canDelete: false,
  },
  {
    id: "hero-22",
    name: "Aldi Firmansyah",
    phone: "0811-2654-8890",
    beneficiaryId: "ben-6",
    beneficiaryName: "Universitas Islam Indonesia",
    sectorId: "uii-fti",
    sectorName: "Teknologi Industri",
    status: "aktif",
    actionCount: 2,
    canDelete: true,
  },
];

// Menormalkan nomor telepon ke digit murni untuk pemeriksaan duplikasi
export function normalizePhoneNumber(phone?: string): string {
  return (phone ?? "").replace(/\D/g, "");
}

// Memformat angka ribuan menggunakan pemisah titik lokal Indonesia
export function formatHeroCount(value: number): string {
  return value.toLocaleString("id-ID");
}

// Membangun daftar kartu statistik halaman Heroes secara dinamis
export function buildHeroStats(heroes: HeroRecord[]): HeroStatItem[] {
  const baselineBlockedInSample = defaultHeroes.filter(
    (h) => h.status === "diblokir",
  ).length;
  const currentBlockedInSample = heroes.filter(
    (h) => h.status === "diblokir",
  ).length;

  const totalDelta = heroes.length - defaultHeroes.length;
  const blockedDelta = currentBlockedInSample - baselineBlockedInSample;

  const totalHeroesCount = Math.max(0, HERO_BASELINE_TOTAL + totalDelta);
  const blockedHeroesCount = Math.max(0, HERO_BASELINE_BLOCKED + blockedDelta);

  return [
    {
      id: "total-heroes",
      title: "Total Heroes",
      value: formatHeroCount(totalHeroesCount),
      unit: "Orang",
      subtext: "Terdaftar di 11 beneficiary",
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: statHeroTotal,
      illustrationAlt: "Ilustrasi total heroes",
    },
    {
      id: "ambil-bulan-ini",
      title: "Ambil Bulan Ini",
      value: formatHeroCount(HERO_MONTHLY_ACTIVE),
      unit: "Orang",
      subtext: "+9,5% dibanding Oktober",
      styleVariant: "default",
      iconName: "check",
      illustrationSrc: statHeroMonth,
      illustrationAlt: "Ilustrasi heroes ambil bulan ini",
    },
    {
      id: "diblokir",
      title: "Diblokir",
      value: formatHeroCount(blockedHeroesCount),
      unit: "Orang",
      subtext: "Tidak bisa menerima donasi baru",
      styleVariant: "default",
      iconName: "x-circle",
      illustrationSrc: statHeroBlocked,
      illustrationAlt: "Ilustrasi heroes diblokir",
    },
  ];
}
