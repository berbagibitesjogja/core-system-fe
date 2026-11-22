import statHeroFood from "#/assets/illustrations/lunch-box.svg";
import statHeroPortions from "#/assets/illustrations/ice-cream.svg";
import statHeroTotal from "#/assets/illustrations/charity-family.svg";
import { idHero } from "#/locales/id/hero";
import { defaultHeroes } from "./hero-data";
import type { HeroStatus } from "./hero-data";

export type HeroDonationHistoryStatus = "berjalan" | "selesai";

export interface HeroDonationHistoryRecord {
  id: string;
  dateIso: string;
  dateLabel: string;
  dayLabel: string;
  donorName: string;
  locationName: string;
  portions: number;
  weightGrams: number;
  claimCode: string;
  status: HeroDonationHistoryStatus;
}

export interface HeroDetailProfile {
  id: string;
  name: string;
  phone?: string;
  avatarSrc?: string;
  beneficiaryId: string;
  beneficiaryName: string;
  sectorId: string;
  sectorName: string;
  status: HeroStatus;
  joinedLongLabel: string;
  joinedShortLabel: string;
  actionCount: number;
  totalWeightKg: number;
  avgWeightPerActionKg: number;
  totalPortions: number;
  distinctDonorsCount: number;
  lastActionLabel?: string;
  history: HeroDonationHistoryRecord[];
}

export interface HeroDetailStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  subtext: string;
  styleVariant: "brand" | "default" | "accent";
  iconName: "package" | "leaf" | "utensils";
  illustrationSrc: string;
  illustrationAlt: string;
}

export const HERO_DETAIL_DEFAULT_PER_PAGE = 5;
export const HERO_DETAIL_PER_PAGE_OPTIONS = [6, 12, 24];

const INDONESIAN_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const INDONESIAN_SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

// Memformat tanggal ISO menjadi label tanggal lengkap & hari Indonesia
function formatHistoryDateParts(dateIso: string): {
  dateLabel: string;
  dayLabel: string;
  shortLabel: string;
} {
  const [yearStr, monthStr, dayStr] = dateIso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  return {
    dateLabel: `${day} ${INDONESIAN_MONTHS[month - 1]} ${year}`,
    dayLabel: INDONESIAN_DAYS[utcDate.getUTCDay()],
    shortLabel: `${day} ${INDONESIAN_SHORT_MONTHS[month - 1]} ${year}`,
  };
}

// Memformat nomor telepon hero ke format tampilan +62 atau keterangan belum ada nomor
export function formatDisplayHeroPhone(phone?: string): string {
  const trimmed = phone?.trim();
  if (!trimmed) return idHero.detail.stats.noPhoneNumber;
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("0")) return `+62 ${trimmed.slice(1)}`;
  return `+62 ${trimmed}`;
}

// Memformat angka desimal menggunakan koma lokal Indonesia
export function formatIndonesianDecimal(value: number): string {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

const farihaHistoryPool: Array<{
  dateIso: string;
  donorName: string;
  locationName: string;
  portions: number;
  weightGrams: number;
  claimCode: string;
  status: HeroDonationHistoryStatus;
}> = [
  {
    dateIso: "2026-11-10",
    donorName: "Holland Bakery",
    locationName: "Pusat Studi Pancasila",
    portions: 1,
    weightGrams: 600,
    claimCode: "K-482-01",
    status: "berjalan",
  },
  {
    dateIso: "2026-11-07",
    donorName: "Royal Ambarukmo",
    locationName: "Drop Point Selasar Barat",
    portions: 2,
    weightGrams: 900,
    claimCode: "K-471-07",
    status: "selesai",
  },
  {
    dateIso: "2026-11-03",
    donorName: "Hyatt Regency Yogyakarta",
    locationName: "Pusat Studi Pancasila",
    portions: 1,
    weightGrams: 700,
    claimCode: "K-466-12",
    status: "selesai",
  },
  {
    dateIso: "2026-10-31",
    donorName: "Mirota Bakery",
    locationName: "Drop Point Selasar Barat",
    portions: 1,
    weightGrams: 500,
    claimCode: "K-459-03",
    status: "selesai",
  },
  {
    dateIso: "2026-10-27",
    donorName: "Hotel Tentrem",
    locationName: "Pusat Studi Pancasila",
    portions: 2,
    weightGrams: 1100,
    claimCode: "K-452-09",
    status: "selesai",
  },
  {
    dateIso: "2026-10-22",
    donorName: "Swiss-Belboutique",
    locationName: "Drop Point Selasar Barat",
    portions: 1,
    weightGrams: 650,
    claimCode: "K-447-15",
    status: "selesai",
  },
  {
    dateIso: "2026-10-18",
    donorName: "Artotel Suites Bianti",
    locationName: "Pusat Studi Pancasila",
    portions: 1,
    weightGrams: 650,
    claimCode: "K-438-04",
    status: "selesai",
  },
  {
    dateIso: "2026-10-14",
    donorName: "Holland Bakery",
    locationName: "Drop Point Selasar Barat",
    portions: 1,
    weightGrams: 700,
    claimCode: "K-430-11",
    status: "selesai",
  },
  {
    dateIso: "2026-10-09",
    donorName: "Royal Ambarukmo",
    locationName: "Pusat Studi Pancasila",
    portions: 1,
    weightGrams: 650,
    claimCode: "K-421-08",
    status: "selesai",
  },
  {
    dateIso: "2026-10-04",
    donorName: "Hotel Tentrem",
    locationName: "Drop Point Selasar Barat",
    portions: 1,
    weightGrams: 750,
    claimCode: "K-412-02",
    status: "selesai",
  },
  {
    dateIso: "2026-09-29",
    donorName: "Mirota Bakery",
    locationName: "Pusat Studi Pancasila",
    portions: 1,
    weightGrams: 650,
    claimCode: "K-405-06",
    status: "selesai",
  },
  {
    dateIso: "2026-09-24",
    donorName: "Hyatt Regency Yogyakarta",
    locationName: "Drop Point Selasar Barat",
    portions: 1,
    weightGrams: 650,
    claimCode: "K-398-14",
    status: "selesai",
  },
];

// Membangun riwayat donasi berdasarkan jumlah aksi hero
function buildHistoryRecords(
  count: number,
  allCompleted = false,
): HeroDonationHistoryRecord[] {
  const records: HeroDonationHistoryRecord[] = [];
  for (let i = 0; i < count; i++) {
    const template = farihaHistoryPool[i % farihaHistoryPool.length];
    const { dateLabel, dayLabel } = formatHistoryDateParts(template.dateIso);
    records.push({
      id: `hero-hist-${i + 1}`,
      dateIso: template.dateIso,
      dateLabel,
      dayLabel,
      donorName: template.donorName,
      locationName: template.locationName,
      portions: template.portions,
      weightGrams: template.weightGrams,
      claimCode: template.claimCode,
      status: allCompleted ? "selesai" : template.status,
    });
  }
  return records;
}

// Membangun daftar 3 kartu statistik halaman Detail Hero
export function buildHeroDetailStats(
  detail: HeroDetailProfile,
): HeroDetailStatItem[] {
  const hasActions = detail.actionCount > 0;

  return [
    {
      id: "total-aksi",
      title: idHero.detail.stats.totalActionsTitle,
      value: detail.actionCount.toLocaleString("id-ID"),
      unit: idHero.detail.stats.unitActions,
      subtext: hasActions
        ? idHero.detail.stats.subtextLastAction(detail.lastActionLabel ?? "-")
        : idHero.detail.stats.subtextNever,
      styleVariant: "brand",
      iconName: "package",
      illustrationSrc: statHeroTotal,
      illustrationAlt: idHero.detail.stats.altTotalActions,
    },
    {
      id: "makanan-diterima",
      title: idHero.detail.stats.foodReceivedTitle,
      value: hasActions ? formatIndonesianDecimal(detail.totalWeightKg) : "0",
      unit: idHero.detail.stats.unitKg,
      subtext: hasActions
        ? idHero.detail.stats.subtextAvgPerAction(
            formatIndonesianDecimal(detail.avgWeightPerActionKg),
          )
        : idHero.detail.stats.subtextNoFood,
      styleVariant: "default",
      iconName: "leaf",
      illustrationSrc: statHeroFood,
      illustrationAlt: idHero.detail.stats.altFoodReceived,
    },
    {
      id: "porsi-diterima",
      title: idHero.detail.stats.portionsReceivedTitle,
      value: detail.totalPortions.toLocaleString("id-ID"),
      unit: idHero.detail.stats.unitPortion,
      subtext: hasActions
        ? idHero.detail.stats.subtextDistinctDonors(detail.distinctDonorsCount)
        : idHero.detail.stats.subtextNoPortion,
      styleVariant: "default",
      iconName: "utensils",
      illustrationSrc: statHeroPortions,
      illustrationAlt: idHero.detail.stats.altPortionsReceived,
    },
  ];
}

// Mengambil profil detail hero berdasarkan ID URL dan mode state opsional (default/empty)
export function getHeroDetailById(
  id: string,
  stateMode?: "default" | "empty",
): HeroDetailProfile {
  if (stateMode === "empty" || id === "hero-new") {
    return {
      id: id || "hero-new",
      name: "Nadia Putri",
      phone: undefined,
      beneficiaryId: "ben-1",
      beneficiaryName: "Universitas Gadjah Mada",
      sectorId: "ugm-hukum",
      sectorName: "Hukum",
      status: "aktif",
      joinedLongLabel: "6 November 2026",
      joinedShortLabel: "6 Nov 2026",
      actionCount: 0,
      totalWeightKg: 0,
      avgWeightPerActionKg: 0,
      totalPortions: 0,
      distinctDonorsCount: 0,
      history: [],
    };
  }

  const baseHero =
    defaultHeroes.find((item) => item.id === id) ?? defaultHeroes[0];

  if (baseHero.id === "hero-4") {
    const history = buildHistoryRecords(7, true);
    return {
      ...baseHero,
      joinedLongLabel: "14 Februari 2025",
      joinedShortLabel: "14 Feb 2025",
      totalWeightKg: 4.2,
      avgWeightPerActionKg: 0.6,
      totalPortions: 8,
      distinctDonorsCount: 5,
      lastActionLabel: "10 Nov 2026",
      history,
    };
  }

  const actionCount = baseHero.actionCount;
  const history = buildHistoryRecords(
    actionCount,
    baseHero.status === "diblokir",
  );
  const totalGrams = history.reduce((sum, item) => sum + item.weightGrams, 0);
  const totalWeightKg = Number((totalGrams / 1000).toFixed(1));
  const avgWeightPerActionKg =
    actionCount > 0 ? Number((totalWeightKg / actionCount).toFixed(1)) : 0;
  const totalPortions = history.reduce((sum, item) => sum + item.portions, 0);
  const distinctDonorsCount = new Set(history.map((item) => item.donorName))
    .size;
  const lastActionLabel = history[0]
    ? formatHistoryDateParts(history[0].dateIso).shortLabel
    : undefined;

  return {
    ...baseHero,
    joinedLongLabel: "14 Februari 2025",
    joinedShortLabel: "14 Feb 2025",
    totalWeightKg,
    avgWeightPerActionKg,
    totalPortions,
    distinctDonorsCount,
    lastActionLabel,
    history,
  };
}
