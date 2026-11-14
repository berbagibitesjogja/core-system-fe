import { getPresetAvatarByIndex } from "#/lib/avatars";

export interface DashboardMetric {
  title: string;
  value: string;
  unit: string;
  trend: string;
  illustration: string;
  isPrimary?: boolean;
}

export interface ImpactStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  styleVariant: "brand" | "default";
  iconName: "package" | "leaf" | "users";
  trend: {
    value: string;
    label: string;
    isPositive: boolean;
  };
  illustrationKey: "fast-food" | "organic-food" | "charity-heroes";
  className?: string;
}

export const DEFAULT_IMPACT_STATS: ImpactStatItem[] = [
  {
    id: "stat-food-rescue",
    title: "Food Rescue",
    value: "372",
    unit: "Aksi",
    styleVariant: "brand",
    iconName: "package",
    trend: {
      value: "+18 aksi",
      label: "bulan ini",
      isPositive: true,
    },
    illustrationKey: "fast-food",
    className: "min-h-[148px]",
  },
  {
    id: "stat-food-saved",
    title: "Makanan Diselamatkan",
    value: "3.077",
    unit: "Kg",
    styleVariant: "default",
    iconName: "leaf",
    trend: {
      value: "+624 Kg",
      label: "bulan ini",
      isPositive: true,
    },
    illustrationKey: "organic-food",
    className: "min-h-[148px]",
  },
  {
    id: "stat-total-heroes",
    title: "Total Heroes",
    value: "14.933",
    unit: "Orang",
    styleVariant: "default",
    iconName: "users",
    trend: {
      value: "+3.020 orang",
      label: "bulan ini",
      isPositive: true,
    },
    illustrationKey: "charity-heroes",
    className: "min-h-[148px]",
  },
];

export interface QuickActionItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  iconName: "plus" | "wallet" | "users";
}

export const DEFAULT_QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "add-donation",
    title: "Tambah Donasi",
    subtitle: "Catat aksi food rescue baru",
    iconName: "plus",
    href: "/admin/donation/add",
  },
  {
    id: "request-reimburse",
    title: "Ajukan Reimburse",
    subtitle: "Klaim biaya operasional",
    iconName: "wallet",
    href: "/admin/reimburse/request",
  },
  {
    id: "add-volunteer",
    title: "Tambah Volunteer",
    subtitle: "Daftarkan relawan baru",
    iconName: "users",
    href: "/admin/volunteer",
  },
];

export interface HeroesChartPoint {
  month: string;
  value: number;
  display: string;
  yPct: number;
}

export interface FoodChartPoint {
  month: string;
  value: number;
  display: string;
  heightPct: number;
}

export const DEFAULT_HEROES_CHART_DATA: HeroesChartPoint[] = [
  { month: "Jun", value: 1650, display: "1.650 heroes", yPct: 58.75 },
  { month: "Jul", value: 1980, display: "1.980 heroes", yPct: 50.5 },
  { month: "Agu", value: 2150, display: "2.150 heroes", yPct: 46.25 },
  { month: "Sep", value: 2500, display: "2.500 heroes", yPct: 37.5 },
  { month: "Okt", value: 2760, display: "2.760 heroes", yPct: 31 },
  { month: "Nov", value: 3020, display: "3.020 heroes", yPct: 24.5 },
];

export const DEFAULT_FOOD_CHART_DATA: FoodChartPoint[] = [
  { month: "Jun", value: 350, display: "350 Kg", heightPct: 43.75 },
  { month: "Jul", value: 410, display: "410 Kg", heightPct: 51.25 },
  { month: "Agu", value: 390, display: "390 Kg", heightPct: 48.75 },
  { month: "Sep", value: 480, display: "480 Kg", heightPct: 60 },
  { month: "Okt", value: 540, display: "540 Kg", heightPct: 67.5 },
  { month: "Nov", value: 624, display: "624 Kg", heightPct: 78 },
];

export const CHART_Y_GRID_LABELS = [
  { label: "4rb", y: "0%" },
  { label: "3rb", y: "25%" },
  { label: "2rb", y: "50%" },
  { label: "1rb", y: "75%" },
  { label: "0", y: "100%" },
];

export const FOOD_CHART_Y_GRID_LABELS = [
  { label: "800", y: "0%" },
  { label: "600", y: "25%" },
  { label: "400", y: "50%" },
  { label: "200", y: "75%" },
  { label: "0", y: "100%" },
];

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
  avatarSrc?: string;
  action: string;
  target: string;
  timeAgo: string;
}

export interface ChartPoint {
  month: string;
  value: number;
  label: string;
}

export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    title: "Food Rescue",
    value: "372",
    unit: "Aksi",
    trend: "+18 aksi bulan ini",
    illustration: "fast-food",
    isPrimary: true,
  },
  {
    title: "Makanan Diselamatkan",
    value: "3.077",
    unit: "Kg",
    trend: "+624 Kg bulan ini",
    illustration: "organic-food",
    isPrimary: false,
  },
  {
    title: "Total Heroes",
    value: "14.933",
    unit: "Orang",
    trend: "+3.020 orang bulan ini",
    illustration: "charity-heroes",
    isPrimary: false,
  },
];

export const HEROES_CHART_DATA: ChartPoint[] = [
  { month: "Jun", value: 1650, label: "1.650" },
  { month: "Jul", value: 1980, label: "1.980" },
  { month: "Agu", value: 2150, label: "2.150" },
  { month: "Sep", value: 2500, label: "2.500" },
  { month: "Okt", value: 2760, label: "2.760" },
  { month: "Nov", value: 3020, label: "3.020" },
];

export const FOOD_CHART_DATA: ChartPoint[] = [
  { month: "Jun", value: 350, label: "350 Kg" },
  { month: "Jul", value: 410, label: "410 Kg" },
  { month: "Agu", value: 390, label: "390 Kg" },
  { month: "Sep", value: 480, label: "480 Kg" },
  { month: "Okt", value: 540, label: "540 Kg" },
  { month: "Nov", value: 624, label: "624 Kg" },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    actor: "Rani Kusuma",
    initials: "RK",
    avatarSrc: getPresetAvatarByIndex(0),
    action: "memperbarui data",
    target: "Donasi",
    timeAgo: "2 menit yang lalu",
  },
  {
    id: "act-2",
    actor: "Bima Aditya",
    initials: "BA",
    avatarSrc: getPresetAvatarByIndex(1),
    action: "menambahkan",
    target: "Hero",
    timeAgo: "15 menit yang lalu",
  },
  {
    id: "act-3",
    actor: "Sari Wulandari",
    initials: "SW",
    avatarSrc: getPresetAvatarByIndex(2),
    action: "masuk ke",
    target: "Sistem",
    timeAgo: "32 menit yang lalu",
  },
  {
    id: "act-4",
    actor: "Dian Pratiwi",
    initials: "DP",
    avatarSrc: getPresetAvatarByIndex(3),
    action: "menambahkan",
    target: "Partner",
    timeAgo: "1 jam yang lalu",
  },
  {
    id: "act-5",
    actor: "Fajar Nugroho",
    initials: "FN",
    avatarSrc: getPresetAvatarByIndex(4),
    action: "mengajukan",
    target: "Reimburse",
    timeAgo: "3 jam yang lalu",
  },
  {
    id: "act-6",
    actor: "Rani Kusuma",
    initials: "RK",
    avatarSrc: getPresetAvatarByIndex(0),
    action: "menghapus data",
    target: "Beneficiary",
    timeAgo: "5 jam yang lalu",
  },
];
