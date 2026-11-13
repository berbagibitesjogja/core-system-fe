import statActionsSvg from "#/assets/illustrations/ice-cream.svg";
import statFoodSvg from "#/assets/illustrations/organic-food.svg";
import statRecipientsSvg from "#/assets/illustrations/charity-sharing.svg";
import { defaultPartners, formatPartnerNumber } from "./partner-data";
import type {
  PartnerRecord,
  PartnerStatItem,
  PartnerType,
} from "./partner-data";

export const PARTNER_DETAIL_DONATIONS_PER_PAGE = 6;

export interface PartnerDonationRecord {
  id: string;
  donationId?: string;
  dateIso: string;
  dateLabel: string;
  dayLabel: string;
  quotaCount: number;
  foodKg: number;
}

export interface PartnerProfileContactItem {
  id: "email" | "phone" | "address";
  label: string;
  value?: string;
  fallbackText: string;
  href?: string;
}

export interface PartnerDetailData {
  id: string;
  name: string;
  type: PartnerType;
  rank: number | null;
  subtitle: string;
  totalRecipients: number;
  totalFoodKg: number;
  avgFoodKgPerAction: number;
  totalActions: number;
  lastActionLabel: string;
  email?: string;
  phone?: string;
  address?: string;
  donations: PartnerDonationRecord[];
}

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
] as const;

const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
] as const;

const MONTH_SHORT_TO_INDEX: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  mei: 4,
  jun: 5,
  jul: 6,
  agu: 7,
  sep: 8,
  okt: 9,
  nov: 10,
  des: 11,
};

// Format tanggal ISO (YYYY-MM-DD) secara deterministik untuk SSR dan client
function formatDetailDateParts(dateIso: string): {
  dateLabel: string;
  dayLabel: string;
} {
  const [yearRaw, monthRaw, dayRaw] = dateIso.split("-");
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;
  const day = Number(dayRaw);
  const utcDate = new Date(Date.UTC(year, monthIndex, day));

  return {
    dateLabel: `${day} ${INDONESIAN_MONTHS[monthIndex] ?? "Januari"} ${year}`,
    dayLabel: INDONESIAN_DAYS[utcDate.getUTCDay()] ?? "Selasa",
  };
}

// Konversi tanggal singkat mitra (mis. "10 Nov 2026") menjadi timestamp UTC
function parsePartnerDateUtc(label: string): number {
  const parts = label.trim().split(/\s+/);
  if (parts.length !== 3) {
    return Date.UTC(2026, 10, 10);
  }
  const day = Number(parts[0]) || 1;
  const monthIdx = MONTH_SHORT_TO_INDEX[parts[1].toLowerCase()] ?? 10;
  const year = Number(parts[2]) || 2026;
  return Date.UTC(year, monthIdx, day);
}

// 6 entri teratas Holland Bakery sesuai desain Figma 144:14249
const hollandBakerySeedRows: Array<{
  dateIso: string;
  quotaCount: number;
  foodKg: number;
  donationId?: string;
}> = [
  { dateIso: "2026-11-10", quotaCount: 30, foodKg: 6, donationId: "donasi-1" },
  { dateIso: "2026-11-03", quotaCount: 28, foodKg: 7 },
  { dateIso: "2026-10-27", quotaCount: 25, foodKg: 5 },
  { dateIso: "2026-10-20", quotaCount: 30, foodKg: 8 },
  { dateIso: "2026-10-13", quotaCount: 22, foodKg: 6 },
  { dateIso: "2026-10-06", quotaCount: 26, foodKg: 6 },
];

function buildHollandBakeryDonations(): PartnerDonationRecord[] {
  const totalCount = 106;
  const startUtc = Date.UTC(2026, 10, 10);

  return Array.from({ length: totalCount }, (_, index) => {
    const seed = hollandBakerySeedRows.at(index);
    const utcMs = seed
      ? parseIsoToUtc(seed.dateIso)
      : startUtc - index * 7 * 86_400_000;
    const dateIso = formatUtcToIso(utcMs);
    const { dateLabel, dayLabel } = formatDetailDateParts(dateIso);

    return {
      id: `ptr-1-don-${index + 1}`,
      donationId: seed?.donationId,
      dateIso,
      dateLabel,
      dayLabel,
      quotaCount: seed?.quotaCount ?? 20 + ((index * 5) % 12),
      foodKg: seed?.foodKg ?? 5 + (index % 4),
    };
  });
}

function parseIsoToUtc(dateIso: string): number {
  const [y, m, d] = dateIso.split("-").map(Number);
  return Date.UTC(y || 2026, (m || 1) - 1, d || 1);
}

function formatUtcToIso(utcMs: number): string {
  const date = new Date(utcMs);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Bangun riwayat donasi sintetis yang selaras dengan jumlah aksi mitra lainnya
function buildPartnerDonations(
  partner: PartnerRecord,
): PartnerDonationRecord[] {
  if (partner.id === "ptr-1") {
    return buildHollandBakeryDonations();
  }

  if (partner.donationCount <= 0) {
    return [];
  }

  const anchorUtc = parsePartnerDateUtc(partner.lastDonationDate);
  const baseKg = Math.max(
    1,
    Math.round(partner.impactKg / partner.donationCount),
  );

  return Array.from({ length: partner.donationCount }, (_, index) => {
    const currentUtc = anchorUtc - index * 7 * 86_400_000;
    const dateIso = formatUtcToIso(currentUtc);
    const { dateLabel, dayLabel } = formatDetailDateParts(dateIso);
    const variance = (index % 3) - 1;

    return {
      id: `${partner.id}-don-${index + 1}`,
      dateIso,
      dateLabel,
      dayLabel,
      quotaCount: 18 + ((index * 4 + partner.donationCount) % 15),
      foodKg: Math.max(1, baseKg + variance),
    };
  });
}

// Ambil peringkat mitra berdasarkan total aksi terbanyak
function computePartnerRank(partnerId: string): number {
  const sorted = [...defaultPartners].sort(
    (a, b) => b.donationCount - a.donationCount,
  );
  const idx = sorted.findIndex((item) => item.id === partnerId);
  return idx >= 0 ? idx + 1 : 1;
}

/**
 * getPartnerDetailById: Mengambil profil detail donatur beserta riwayat donasinya.
 */
export function getPartnerDetailById(
  id: string,
  stateMode?: "default" | "empty",
): PartnerDetailData {
  const trimmedId = id.trim();
  const existing = defaultPartners.find((item) => item.id === trimmedId);

  const shouldUseDemoEmptyProfile =
    trimmedId === "warung-bu-tini" ||
    trimmedId === "ptr-empty" ||
    (stateMode === "empty" && (!trimmedId || !existing));

  if (shouldUseDemoEmptyProfile) {
    return {
      id: trimmedId || "warung-bu-tini",
      name: "Warung Makan Bu Tini",
      type: "Perusahaan",
      rank: null,
      subtitle: "Donatur baru · belum ada aksi",
      totalRecipients: 0,
      totalFoodKg: 0,
      avgFoodKgPerAction: 0,
      totalActions: 0,
      lastActionLabel: "-",
      email: undefined,
      phone: "0813-2847-1190",
      address: "Jl. Kaliurang Km 5, Sleman",
      donations: [],
    };
  }

  const target = existing ?? defaultPartners[0];

  if (stateMode === "empty" || target.donationCount <= 0) {
    return {
      id: target.id,
      name: target.name,
      type: target.type,
      rank: null,
      subtitle: "Donatur baru · belum ada aksi",
      totalRecipients: 0,
      totalFoodKg: 0,
      avgFoodKgPerAction: 0,
      totalActions: 0,
      lastActionLabel: "-",
      email: target.email,
      phone: target.phone,
      address: target.address,
      donations: [],
    };
  }

  const rank = computePartnerRank(target.id);
  const donations = buildPartnerDonations(target);
  const totalRecipients =
    target.id === "ptr-1"
      ? 5136
      : donations.reduce((sum, item) => sum + item.quotaCount, 0);
  const avgFoodKgPerAction = Math.max(
    1,
    Math.round(target.impactKg / target.donationCount),
  );

  return {
    id: target.id,
    name: target.name,
    type: target.type,
    rank,
    subtitle:
      rank === 1
        ? `Donatur teraktif · peringkat #1 dari ${defaultPartners.length} mitra`
        : `Mitra donatur · peringkat #${rank} dari ${defaultPartners.length} mitra`,
    totalRecipients,
    totalFoodKg: target.impactKg,
    avgFoodKgPerAction,
    totalActions: target.donationCount,
    lastActionLabel: target.lastDonationDate,
    email: target.email,
    phone: target.phone,
    address: target.address,
    donations,
  };
}

/**
 * buildPartnerDetailStats: Membangun 3 kartu statistik halaman Partner Detail secara data-driven.
 */
export function buildPartnerDetailStats(
  detail: PartnerDetailData,
): PartnerStatItem[] {
  const isEmpty = detail.totalActions === 0;

  return [
    {
      id: "partner-stat-recipients",
      title: "Penerima",
      value: formatPartnerNumber(detail.totalRecipients),
      unit: "Orang",
      subtext: isEmpty ? "Belum ada heroes" : "Heroes dari seluruh aksi",
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: statRecipientsSvg,
      illustrationAlt: "Ilustrasi penerima manfaat",
    },
    {
      id: "partner-stat-food",
      title: "Makanan",
      value: formatPartnerNumber(detail.totalFoodKg),
      unit: "Kg",
      subtext: isEmpty
        ? "Belum ada makanan tersalurkan"
        : `Rata-rata ${formatPartnerNumber(detail.avgFoodKgPerAction)} Kg per aksi`,
      styleVariant: "default",
      iconName: "leaf",
      illustrationSrc: statFoodSvg,
      illustrationAlt: "Ilustrasi makanan diselamatkan",
    },
    {
      id: "partner-stat-actions",
      title: "Total Aksi",
      value: formatPartnerNumber(detail.totalActions),
      unit: "Aksi",
      subtext: isEmpty
        ? "Belum pernah berdonasi"
        : `Terakhir: ${detail.lastActionLabel}`,
      styleVariant: "default",
      iconName: "package",
      illustrationSrc: statActionsSvg,
      illustrationAlt: "Ilustrasi total aksi donasi",
    },
  ];
}

/**
 * buildPartnerProfileContactItems: Menyusun daftar informasi kontak donatur secara data-driven.
 */
export function buildPartnerProfileContactItems(
  detail: PartnerDetailData,
): PartnerProfileContactItem[] {
  const trimmedEmail = detail.email?.trim() || undefined;
  const trimmedPhone = detail.phone?.trim() || undefined;
  const trimmedAddress = detail.address?.trim() || undefined;
  const telDigits = trimmedPhone?.replace(/[^+\d]/g, "");

  return [
    {
      id: "email",
      label: "Email",
      value: trimmedEmail,
      fallbackText: "Belum diisi",
      href: trimmedEmail ? `mailto:${trimmedEmail}` : undefined,
    },
    {
      id: "phone",
      label: "Nomor Telepon",
      value: trimmedPhone,
      fallbackText: "Belum diisi",
      href: telDigits ? `tel:${telDigits}` : undefined,
    },
    {
      id: "address",
      label: "Alamat",
      value: trimmedAddress,
      fallbackText: "Belum diisi",
    },
  ];
}
