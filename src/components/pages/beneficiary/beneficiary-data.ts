import statCharityHeroes from "#/assets/illustrations/charity-family.svg";
import statDonationNearest from "#/assets/illustrations/charity-sharing.svg";
import statOrganicFood from "#/assets/illustrations/organic-food.svg";

export type BeneficiaryCategoryId =
  "all" | "universitas" | "yayasan" | "masyarakat-umum";

export type BeneficiaryType = "Universitas" | "Yayasan" | "Masyarakat Umum";

export interface BeneficiaryItem {
  id: string;
  rank: number;
  name: string;
  initial: string;
  type: BeneficiaryType;
  categoryId: Exclude<BeneficiaryCategoryId, "all">;
  heroesCount: number;
  impactKg: number;
  canDelete: boolean;
}

export interface BeneficiaryStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  subtext: string;
  styleVariant: "brand" | "default" | "accent";
  iconName: "users" | "leaf" | "building";
  illustrationSrc: string;
  illustrationAlt: string;
}

export interface BeneficiaryFilterOption {
  id: BeneficiaryCategoryId;
  label: string;
  count: number;
}

export const INITIAL_VISIBLE_BENEFICIARIES = 9;
export const MONTHLY_IMPACT_DELTA_KG = 624;

export const defaultBeneficiaries: BeneficiaryItem[] = [
  {
    id: "ben-1",
    rank: 1,
    name: "Universitas Gadjah Mada",
    initial: "U",
    type: "Universitas",
    categoryId: "universitas",
    heroesCount: 4785,
    impactKg: 1164,
    canDelete: false,
  },
  {
    id: "ben-2",
    rank: 2,
    name: "Masyarakat Umum",
    initial: "M",
    type: "Masyarakat Umum",
    categoryId: "masyarakat-umum",
    heroesCount: 3120,
    impactKg: 560,
    canDelete: false,
  },
  {
    id: "ben-3",
    rank: 3,
    name: "Universitas Negeri Yogyakarta",
    initial: "U",
    type: "Universitas",
    categoryId: "universitas",
    heroesCount: 2046,
    impactKg: 380,
    canDelete: false,
  },
  {
    id: "ben-4",
    rank: 4,
    name: "UIN Sunan Kalijaga",
    initial: "U",
    type: "Universitas",
    categoryId: "universitas",
    heroesCount: 1512,
    impactKg: 260,
    canDelete: false,
  },
  {
    id: "ben-5",
    rank: 5,
    name: "Yayasan Hamba",
    initial: "Y",
    type: "Yayasan",
    categoryId: "yayasan",
    heroesCount: 1080,
    impactKg: 190,
    canDelete: false,
  },
  {
    id: "ben-6",
    rank: 6,
    name: "Panti Sosial Tresna Werdha",
    initial: "P",
    type: "Yayasan",
    categoryId: "yayasan",
    heroesCount: 764,
    impactKg: 150,
    canDelete: false,
  },
  {
    id: "ben-7",
    rank: 7,
    name: "BRSPA",
    initial: "B",
    type: "Yayasan",
    categoryId: "yayasan",
    heroesCount: 528,
    impactKg: 98,
    canDelete: false,
  },
  {
    id: "ben-8",
    rank: 8,
    name: "Kampung Code",
    initial: "K",
    type: "Masyarakat Umum",
    categoryId: "masyarakat-umum",
    heroesCount: 412,
    impactKg: 92,
    canDelete: true,
  },
  {
    id: "ben-9",
    rank: 9,
    name: "Universitas Islam Indonesia",
    initial: "U",
    type: "Universitas",
    categoryId: "universitas",
    heroesCount: 356,
    impactKg: 78,
    canDelete: false,
  },
  {
    id: "ben-10",
    rank: 10,
    name: "Panti Asuhan Al-Hikmah",
    initial: "P",
    type: "Yayasan",
    categoryId: "yayasan",
    heroesCount: 190,
    impactKg: 60,
    canDelete: true,
  },
  {
    id: "ben-11",
    rank: 11,
    name: "Komunitas Kampung Jogoyudan",
    initial: "K",
    type: "Masyarakat Umum",
    categoryId: "masyarakat-umum",
    heroesCount: 140,
    impactKg: 45,
    canDelete: true,
  },
];

// Menghitung ringkasan kartu statistik dari daftar penerima aktif
export function buildBeneficiaryStats(
  items: BeneficiaryItem[],
): BeneficiaryStatItem[] {
  const totalHeroes = items.reduce((acc, item) => acc + item.heroesCount, 0);
  const totalImpactKg = items.reduce((acc, item) => acc + item.impactKg, 0);
  const totalGroups = items.length;
  const distinctTypes = new Set(items.map((item) => item.categoryId)).size;

  return [
    {
      id: "total-heroes",
      title: "Total Heroes",
      value: totalHeroes.toLocaleString("id-ID"),
      unit: "Orang",
      subtext: `Dari ${totalGroups} kelompok penerima`,
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: statCharityHeroes,
      illustrationAlt: "Ilustrasi komunitas penerima manfaat",
    },
    {
      id: "makanan-tersalurkan",
      title: "Makanan Tersalurkan",
      value: totalImpactKg.toLocaleString("id-ID"),
      unit: "Kg",
      subtext: `+${MONTHLY_IMPACT_DELTA_KG.toLocaleString("id-ID")} Kg bulan ini`,
      styleVariant: "default",
      iconName: "leaf",
      illustrationSrc: statOrganicFood,
      illustrationAlt: "Ilustrasi makanan tersalurkan",
    },
    {
      id: "kelompok-penerima",
      title: "Kelompok Penerima",
      value: totalGroups.toLocaleString("id-ID"),
      unit: "Kelompok",
      subtext: `Dari ${distinctTypes} jenis penerima`,
      styleVariant: "default",
      iconName: "building",
      illustrationSrc: statDonationNearest,
      illustrationAlt: "Ilustrasi kelompok penerima",
    },
  ];
}

// Menghitung opsi filter chip kategori beserta jumlah item masing-masing
export function buildBeneficiaryFilterOptions(
  items: BeneficiaryItem[],
): BeneficiaryFilterOption[] {
  const counts = items.reduce(
    (acc, item) => {
      acc[item.categoryId] += 1;
      return acc;
    },
    {
      universitas: 0,
      yayasan: 0,
      "masyarakat-umum": 0,
    },
  );

  return [
    { id: "all", label: "Semua", count: items.length },
    { id: "universitas", label: "Universitas", count: counts.universitas },
    { id: "yayasan", label: "Yayasan", count: counts.yayasan },
    {
      id: "masyarakat-umum",
      label: "Masyarakat Umum",
      count: counts["masyarakat-umum"],
    },
  ];
}

export type BeneficiaryFormCategoryId = Exclude<BeneficiaryCategoryId, "all">;

export interface BeneficiaryFormData {
  id?: string;
  categoryId: BeneficiaryFormCategoryId | "";
  name: string;
}

export interface BeneficiaryCategoryOption {
  id: BeneficiaryFormCategoryId;
  title: BeneficiaryType;
  description: string;
  iconName: "building" | "heart" | "users";
}

export interface BeneficiaryTipItem {
  id: string;
  text: string;
}

export const defaultEmptyBeneficiaryForm: BeneficiaryFormData = {
  categoryId: "",
  name: "",
};

export const defaultEditBeneficiaryData: BeneficiaryFormData = {
  id: "ben-1",
  categoryId: "universitas",
  name: "Universitas Gadjah Mada",
};

export const defaultBeneficiaryCategoryOptions: BeneficiaryCategoryOption[] = [
  {
    id: "universitas",
    title: "Universitas",
    description: "Kampus, fakultas, dan mahasiswa",
    iconName: "building",
  },
  {
    id: "yayasan",
    title: "Yayasan",
    description: "Yayasan, panti asuhan, dan panti werdha",
    iconName: "heart",
  },
  {
    id: "masyarakat-umum",
    title: "Masyarakat Umum",
    description: "Warga, komunitas, dan kampung",
    iconName: "users",
  },
];

export const defaultBeneficiaryTips: BeneficiaryTipItem[] = [
  {
    id: "tip-1",
    text: "Satu kampus cukup didaftarkan sekali. Fakultas ditambahkan sebagai sektor di halaman detail.",
  },
  {
    id: "tip-2",
    text: "Pakai nama resmi supaya mudah dicari saat membuat donasi.",
  },
  {
    id: "tip-3",
    text: "Jenis penerima menentukan pengelompokan di laporan dampak.",
  },
];
