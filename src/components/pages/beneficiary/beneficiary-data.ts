import statCharityHeroes from "#/assets/illustrations/charity-family.svg";
import statDonationNearest from "#/assets/illustrations/charity-sharing.svg";
import statOrganicFood from "#/assets/illustrations/organic-food.svg";
import { idBeneficiary } from "#/locales";
import type { BeneficiaryCategoryVariant } from "#/services/beneficiaryService";

export type BeneficiaryCategoryId =
  "all" | BeneficiaryCategoryVariant | (string & {});

export type BeneficiaryType = string;

export interface BeneficiaryItem {
  id: string;
  rank: number;
  name: string;
  initial: string;
  type: BeneficiaryType;
  categoryId: string;
  heroesCount: number;
  impactKg: number;
  canDelete: boolean;
  address?: string | null;
  maps?: string | null;
  emailDomain?: string | null;
  isPriority?: boolean;
  hidden?: boolean;
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
    type: "university",
    categoryId: "university",
    heroesCount: 4785,
    impactKg: 1164,
    canDelete: false,
  },
  {
    id: "ben-2",
    rank: 2,
    name: "Masyarakat Umum",
    initial: "M",
    type: "society",
    categoryId: "society",
    heroesCount: 3120,
    impactKg: 560,
    canDelete: false,
  },
  {
    id: "ben-3",
    rank: 3,
    name: "Universitas Negeri Yogyakarta",
    initial: "U",
    type: "university",
    categoryId: "university",
    heroesCount: 2046,
    impactKg: 380,
    canDelete: false,
  },
  {
    id: "ben-4",
    rank: 4,
    name: "UIN Sunan Kalijaga",
    initial: "U",
    type: "university",
    categoryId: "university",
    heroesCount: 1512,
    impactKg: 260,
    canDelete: false,
  },
  {
    id: "ben-5",
    rank: 5,
    name: "Yayasan Hamba",
    initial: "Y",
    type: "foundation",
    categoryId: "foundation",
    heroesCount: 1080,
    impactKg: 190,
    canDelete: false,
  },
  {
    id: "ben-6",
    rank: 6,
    name: "Panti Sosial Tresna Werdha",
    initial: "P",
    type: "nursing_home",
    categoryId: "nursing_home",
    heroesCount: 764,
    impactKg: 150,
    canDelete: false,
  },
  {
    id: "ben-7",
    rank: 7,
    name: "BRSPA",
    initial: "B",
    type: "foundation",
    categoryId: "foundation",
    heroesCount: 528,
    impactKg: 98,
    canDelete: false,
  },
  {
    id: "ben-8",
    rank: 8,
    name: "Kampung Code",
    initial: "K",
    type: "society",
    categoryId: "society",
    heroesCount: 412,
    impactKg: 92,
    canDelete: true,
  },
  {
    id: "ben-9",
    rank: 9,
    name: "Universitas Islam Indonesia",
    initial: "U",
    type: "university",
    categoryId: "university",
    heroesCount: 356,
    impactKg: 78,
    canDelete: false,
  },
  {
    id: "ben-10",
    rank: 10,
    name: "Panti Asuhan Al-Hikmah",
    initial: "P",
    type: "orphanage",
    categoryId: "orphanage",
    heroesCount: 190,
    impactKg: 60,
    canDelete: true,
  },
  {
    id: "ben-11",
    rank: 11,
    name: "Komunitas Kampung Jogoyudan",
    initial: "K",
    type: "society",
    categoryId: "society",
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
      title: idBeneficiary.stats.totalHeroes,
      value: totalHeroes.toLocaleString("id-ID"),
      unit: idBeneficiary.stats.unitHeroes,
      subtext: idBeneficiary.stats.subtextHeroes(totalGroups),
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: statCharityHeroes,
      illustrationAlt: idBeneficiary.stats.altHeroes,
    },
    {
      id: "makanan-tersalurkan",
      title: idBeneficiary.stats.foodDistributed,
      value: totalImpactKg.toLocaleString("id-ID"),
      unit: idBeneficiary.stats.unitKg,
      subtext: idBeneficiary.stats.subtextFood(
        MONTHLY_IMPACT_DELTA_KG.toLocaleString("id-ID"),
      ),
      styleVariant: "default",
      iconName: "leaf",
      illustrationSrc: statOrganicFood,
      illustrationAlt: idBeneficiary.stats.altFood,
    },
    {
      id: "kelompok-penerima",
      title: idBeneficiary.stats.recipientGroups,
      value: totalGroups.toLocaleString("id-ID"),
      unit: idBeneficiary.stats.unitGroups,
      subtext: idBeneficiary.stats.subtextGroups(distinctTypes),
      styleVariant: "default",
      iconName: "building",
      illustrationSrc: statDonationNearest,
      illustrationAlt: idBeneficiary.stats.altGroups,
    },
  ];
}

export const BENEFICIARY_VARIANT_ORDER: BeneficiaryCategoryVariant[] = [
  "university",
  "kipk",
  "orphanage",
  "nursing_home",
  "shelter",
  "religious_community",
  "foundation",
  "society",
  "other",
];

// Menghitung opsi filter dropdown kategori beserta jumlah item masing-masing
export function buildBeneficiaryFilterOptions(
  items: BeneficiaryItem[],
): BeneficiaryFilterOption[] {
  const counts: Record<string, number> = {};
  for (const item of items) {
    if (item.categoryId) {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    }
  }

  const variantMap: Record<string, string> = idBeneficiary.variants;
  const knownVariants = new Set<string>(BENEFICIARY_VARIANT_ORDER);

  // Varian terdaftar sesuai urutan taksonomi
  const orderedEntries: BeneficiaryFilterOption[] =
    BENEFICIARY_VARIANT_ORDER.map((variant) => ({
      id: variant,
      label: variantMap[variant] || variant,
      count: counts[variant] || 0,
    }));

  // Menambahkan kategori khusus jika ada di luar varian standar
  const extraEntries: BeneficiaryFilterOption[] = Object.entries(counts)
    .filter(([id]) => !knownVariants.has(id))
    .map(([id, count]) => ({
      id,
      label:
        variantMap[id] ??
        id
          .split(/[_\s-]+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      count,
    }));

  return [
    {
      id: "all",
      label: idBeneficiary.toolbar.categoryPlaceholder,
      count: items.length,
    },
    ...orderedEntries,
    ...extraEntries,
  ];
}

export type BeneficiaryFormCategoryId = BeneficiaryCategoryVariant | string;

export type BeneficiaryFormCategoryIcon =
  | "building"
  | "graduation-cap"
  | "heart"
  | "heart-handshake"
  | "home"
  | "landmark"
  | "building-2"
  | "users"
  | "help-circle";

export interface BeneficiaryFormData {
  id?: string;
  categoryId: BeneficiaryFormCategoryId | "";
  name: string;
  address?: string;
  maps?: string;
  emailDomain?: string;
  isPriority?: boolean;
  hidden?: boolean;
}

export interface BeneficiaryCategoryOption {
  id: BeneficiaryCategoryVariant;
  title: string;
  description: string;
  iconName: BeneficiaryFormCategoryIcon;
}

export interface BeneficiaryTipItem {
  id: string;
  text: string;
}

export const defaultEmptyBeneficiaryForm: BeneficiaryFormData = {
  categoryId: "",
  name: "",
  address: "",
  maps: "",
  emailDomain: "",
  isPriority: false,
  hidden: false,
};

export const defaultEditBeneficiaryData: BeneficiaryFormData = {
  id: "ben-1",
  categoryId: "university",
  name: "Universitas Gadjah Mada",
  address: "Bulaksumur, Caturtunggal, Sleman, DI Yogyakarta",
  maps: "https://maps.app.goo.gl/ugm",
  emailDomain: "ugm.ac.id",
  isPriority: true,
  hidden: false,
};

export const defaultBeneficiaryCategoryOptions: BeneficiaryCategoryOption[] = [
  {
    id: "university",
    title: idBeneficiary.variants.university,
    description: idBeneficiary.variantDescriptions.university,
    iconName: "building",
  },
  {
    id: "kipk",
    title: idBeneficiary.variants.kipk,
    description: idBeneficiary.variantDescriptions.kipk,
    iconName: "graduation-cap",
  },
  {
    id: "orphanage",
    title: idBeneficiary.variants.orphanage,
    description: idBeneficiary.variantDescriptions.orphanage,
    iconName: "heart",
  },
  {
    id: "nursing_home",
    title: idBeneficiary.variants.nursing_home,
    description: idBeneficiary.variantDescriptions.nursing_home,
    iconName: "heart-handshake",
  },
  {
    id: "shelter",
    title: idBeneficiary.variants.shelter,
    description: idBeneficiary.variantDescriptions.shelter,
    iconName: "home",
  },
  {
    id: "religious_community",
    title: idBeneficiary.variants.religious_community,
    description: idBeneficiary.variantDescriptions.religious_community,
    iconName: "landmark",
  },
  {
    id: "foundation",
    title: idBeneficiary.variants.foundation,
    description: idBeneficiary.variantDescriptions.foundation,
    iconName: "building-2",
  },
  {
    id: "society",
    title: idBeneficiary.variants.society,
    description: idBeneficiary.variantDescriptions.society,
    iconName: "users",
  },
  {
    id: "other",
    title: idBeneficiary.variants.other,
    description: idBeneficiary.variantDescriptions.other,
    iconName: "help-circle",
  },
];

export const defaultBeneficiaryTips: BeneficiaryTipItem[] =
  idBeneficiary.form.tips;
