export interface DashboardMetric {
  title: string;
  value: string;
  unit: string;
  trend: string;
  illustration: string;
  isPrimary?: boolean;
}

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
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
    action: "memperbarui data",
    target: "Donasi",
    timeAgo: "2 menit yang lalu",
  },
  {
    id: "act-2",
    actor: "Bima Aditya",
    initials: "BA",
    action: "menambahkan",
    target: "Hero",
    timeAgo: "15 menit yang lalu",
  },
  {
    id: "act-3",
    actor: "Sari Wulandari",
    initials: "SW",
    action: "masuk ke",
    target: "Sistem",
    timeAgo: "32 menit yang lalu",
  },
  {
    id: "act-4",
    actor: "Dian Pratiwi",
    initials: "DP",
    action: "menambahkan",
    target: "Partner",
    timeAgo: "1 jam yang lalu",
  },
  {
    id: "act-5",
    actor: "Fajar Nugroho",
    initials: "FN",
    action: "mengajukan",
    target: "Reimburse",
    timeAgo: "3 jam yang lalu",
  },
  {
    id: "act-6",
    actor: "Rani Kusuma",
    initials: "RK",
    action: "menghapus data",
    target: "Beneficiary",
    timeAgo: "5 jam yang lalu",
  },
];
