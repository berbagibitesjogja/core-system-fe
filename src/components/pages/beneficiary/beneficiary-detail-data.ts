import statCharityHeroes from "#/assets/illustrations/charity-family.svg";
import statDonationNearest from "#/assets/illustrations/charity-sharing.svg";
import statOrganicFood from "#/assets/illustrations/organic-food.svg";
import { defaultBeneficiaries } from "./beneficiary-data";
import type { BeneficiaryStatItem, BeneficiaryType } from "./beneficiary-data";

export interface BeneficiaryDonationRecord {
  id: string;
  dateIso: string;
  dateLabel: string;
  dayLabel: string;
  recipientCount: number;
  donorName: string;
  foodKg: number;
}

export interface BeneficiarySectorRecord {
  id: string;
  name: string;
  heroesCount: number;
  isNew?: boolean;
}

export interface BeneficiaryDetailProfile {
  id: string;
  name: string;
  type: BeneficiaryType;
  rank: number | null;
  subtitle: string;
  heroesCount: number;
  heroesSharePercent: number;
  impactKg: number;
  impactSharePercent: number;
  sectorUnitLabel: string;
  donations: BeneficiaryDonationRecord[];
  sectors: BeneficiarySectorRecord[];
}

export const DETAIL_DONATIONS_PER_PAGE = 5;

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

const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const historicalPartnerPool = [
  { donorName: "Royal Ambarukmo", recipients: 35, foodKg: 12 },
  { donorName: "Artotel Suites Bianti", recipients: 50, foodKg: 18 },
  { donorName: "Eastparc Hotel", recipients: 20, foodKg: 8 },
  { donorName: "Marriott Hotel", recipients: 40, foodKg: 15 },
  { donorName: "J.CO Malioboro", recipients: 15, foodKg: 5 },
  { donorName: "Starbucks", recipients: 25, foodKg: 7 },
  { donorName: "Hotel Tentrem", recipients: 30, foodKg: 11 },
  { donorName: "Sheraton Mustika", recipients: 28, foodKg: 10 },
];

// Memformat tanggal ISO menjadi label tanggal & nama hari Indonesia deterministik untuk SSR/client
function formatRecordDateParts(dateIso: string): {
  dateLabel: string;
  dayLabel: string;
} {
  const [yearStr, monthStr, dayStr] = dateIso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  return {
    dateLabel: `${day} ${INDONESIAN_MONTHS[month - 1]} ${year}`,
    dayLabel: INDONESIAN_DAYS[utcDate.getUTCDay()],
  };
}

// Membuat daftar riwayat donasi historis untuk melengkapi total donasi UGM menjadi 86 entri
function buildUgmDonations(): BeneficiaryDonationRecord[] {
  const featuredRows = [
    {
      dateIso: "2026-11-07",
      recipientCount: 35,
      donorName: "Royal Ambarukmo",
      foodKg: 12,
    },
    {
      dateIso: "2026-11-06",
      recipientCount: 50,
      donorName: "Artotel Suites Bianti",
      foodKg: 18,
    },
    {
      dateIso: "2026-11-05",
      recipientCount: 20,
      donorName: "Eastparc Hotel",
      foodKg: 8,
    },
    {
      dateIso: "2026-11-04",
      recipientCount: 40,
      donorName: "Marriott Hotel",
      foodKg: 15,
    },
    {
      dateIso: "2026-11-03",
      recipientCount: 15,
      donorName: "J.CO Malioboro",
      foodKg: 5,
    },
    {
      dateIso: "2026-11-02",
      recipientCount: 25,
      donorName: "Starbucks",
      foodKg: 7,
    },
  ];

  const records: BeneficiaryDonationRecord[] = featuredRows.map(
    (row, index) => {
      const { dateLabel, dayLabel } = formatRecordDateParts(row.dateIso);
      return {
        id: `ugm-don-${index + 1}`,
        dateIso: row.dateIso,
        dateLabel,
        dayLabel,
        recipientCount: row.recipientCount,
        donorName: row.donorName,
        foodKg: row.foodKg,
      };
    },
  );

  const anchorTime = Date.UTC(2026, 10, 1);
  for (let i = 0; i < 80; i++) {
    const current = new Date(anchorTime - i * 86_400_000);
    const yyyy = current.getUTCFullYear();
    const mm = String(current.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(current.getUTCDate()).padStart(2, "0");
    const dateIso = `${yyyy}-${mm}-${dd}`;
    const partner = historicalPartnerPool[i % historicalPartnerPool.length];
    const { dateLabel, dayLabel } = formatRecordDateParts(dateIso);

    records.push({
      id: `ugm-don-${i + 7}`,
      dateIso,
      dateLabel,
      dayLabel,
      recipientCount: partner.recipients,
      donorName: partner.donorName,
      foodKg: partner.foodKg,
    });
  }

  return records;
}

const ugmDonations = buildUgmDonations();

const ugmSectors: BeneficiarySectorRecord[] = [
  { id: "sec-1", name: "Ekonomika dan Bisnis", heroesCount: 95 },
  { id: "sec-2", name: "Teknik", heroesCount: 88 },
  { id: "sec-3", name: "MIPA", heroesCount: 76 },
  { id: "sec-4", name: "Kedokteran", heroesCount: 64 },
  { id: "sec-5", name: "Hukum", heroesCount: 58 },
  { id: "sec-6", name: "Ilmu Budaya", heroesCount: 52 },
  { id: "sec-7", name: "Peternakan", heroesCount: 46 },
  { id: "sec-8", name: "Psikologi", heroesCount: 41 },
];

const sectorTemplateByType: Record<BeneficiaryType, string[]> = {
  Universitas: ["Teknik", "Ekonomi dan Bisnis", "MIPA", "Hukum"],
  Yayasan: ["Asrama Utama", "Unit Pendidikan", "Klinik & Gizi"],
  "Masyarakat Umum": ["RW 01 Terban", "RW 02 Gondokusuman", "Balai Warga"],
};

// Membangun daftar kartu statistik detail penerima manfaat (mendukung state terisi & state kosong)
export function buildBeneficiaryDetailStats(
  detail: BeneficiaryDetailProfile,
  sectors: BeneficiarySectorRecord[],
): BeneficiaryStatItem[] {
  const topSector = sectors.reduce<BeneficiarySectorRecord | null>(
    (best, current) =>
      !best || current.heroesCount > best.heroesCount ? current : best,
    null,
  );

  const sectorSubtext =
    sectors.length === 0
      ? "Tambahkan sektor pertama"
      : topSector && topSector.heroesCount > 0
        ? `Terbanyak: ${topSector.name}`
        : `Terdaftar ${sectors.length} sektor`;

  return [
    {
      id: "jumlah-penerima",
      title: "Jumlah Penerima",
      value: detail.heroesCount.toLocaleString("id-ID"),
      unit: "Orang",
      subtext:
        detail.heroesCount > 0
          ? `${detail.heroesSharePercent}% dari seluruh heroes BBJ`
          : "Belum ada heroes",
      styleVariant: "brand",
      iconName: "users",
      illustrationSrc: statCharityHeroes,
      illustrationAlt: "Ilustrasi jumlah penerima manfaat",
    },
    {
      id: "makanan-diterima",
      title: "Makanan Diterima",
      value: detail.impactKg.toLocaleString("id-ID"),
      unit: "Kg",
      subtext:
        detail.impactKg > 0
          ? `${detail.impactSharePercent}% dari makanan tersalurkan`
          : "Belum ada makanan tersalurkan",
      styleVariant: "default",
      iconName: "leaf",
      illustrationSrc: statOrganicFood,
      illustrationAlt: "Ilustrasi makanan diterima",
    },
    {
      id: "sektor-terdaftar",
      title: "Sektor Terdaftar",
      value: sectors.length.toLocaleString("id-ID"),
      unit: sectors.length > 0 ? detail.sectorUnitLabel : "Sektor",
      subtext: sectorSubtext,
      styleVariant: "default",
      iconName: "building",
      illustrationSrc: statDonationNearest,
      illustrationAlt: "Ilustrasi sektor terdaftar",
    },
  ];
}

// Mengambil profil detail penerima manfaat berdasarkan ID rute dan mode state opsional
export function getBeneficiaryDetailById(
  id: string,
  stateMode?: "default" | "empty",
): BeneficiaryDetailProfile {
  const existing = defaultBeneficiaries.find((item) => item.id === id);

  if (stateMode === "empty" || !existing) {
    const emptyName = existing?.name ?? "Kampung Code";
    const emptyType: BeneficiaryType = existing?.type ?? "Masyarakat Umum";

    return {
      id,
      name: emptyName,
      type: emptyType,
      rank: null,
      subtitle: "Penerima manfaat · baru didaftarkan",
      heroesCount: 0,
      heroesSharePercent: 0,
      impactKg: 0,
      impactSharePercent: 0,
      sectorUnitLabel: emptyType === "Universitas" ? "Fakultas" : "Sektor",
      donations: [],
      sectors: [],
    };
  }

  if (existing.id === "ben-1") {
    return {
      id: existing.id,
      name: existing.name,
      type: existing.type,
      rank: existing.rank,
      subtitle: `Penerima manfaat · peringkat #${existing.rank} dari ${defaultBeneficiaries.length} kelompok`,
      heroesCount: existing.heroesCount,
      heroesSharePercent: 32,
      impactKg: existing.impactKg,
      impactSharePercent: 38,
      sectorUnitLabel: "Fakultas",
      donations: ugmDonations,
      sectors: ugmSectors,
    };
  }

  const totalHeroes = defaultBeneficiaries.reduce(
    (sum, item) => sum + item.heroesCount,
    0,
  );
  const totalImpactKg = defaultBeneficiaries.reduce(
    (sum, item) => sum + item.impactKg,
    0,
  );
  const templates = sectorTemplateByType[existing.type];

  const generatedSectors: BeneficiarySectorRecord[] = templates.map(
    (sectorName, index) => ({
      id: `${existing.id}-sec-${index + 1}`,
      name: sectorName,
      heroesCount: Math.max(
        12,
        Math.round(
          (existing.heroesCount / templates.length) * (1 - index * 0.15),
        ),
      ),
    }),
  );

  const anchorTime = Date.UTC(2026, 10, 7);
  const donationCount = Math.max(4, 14 - existing.rank);
  const generatedDonations: BeneficiaryDonationRecord[] = Array.from(
    { length: donationCount },
    (_, index) => {
      const current = new Date(anchorTime - index * 2 * 86_400_000);
      const yyyy = current.getUTCFullYear();
      const mm = String(current.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(current.getUTCDate()).padStart(2, "0");
      const dateIso = `${yyyy}-${mm}-${dd}`;
      const partner =
        historicalPartnerPool[
          (existing.rank + index) % historicalPartnerPool.length
        ];
      const { dateLabel, dayLabel } = formatRecordDateParts(dateIso);

      return {
        id: `${existing.id}-don-${index + 1}`,
        dateIso,
        dateLabel,
        dayLabel,
        recipientCount: partner.recipients,
        donorName: partner.donorName,
        foodKg: partner.foodKg,
      };
    },
  );

  return {
    id: existing.id,
    name: existing.name,
    type: existing.type,
    rank: existing.rank,
    subtitle: `Penerima manfaat · peringkat #${existing.rank} dari ${defaultBeneficiaries.length} kelompok`,
    heroesCount: existing.heroesCount,
    heroesSharePercent: Math.max(
      1,
      Math.round((existing.heroesCount / totalHeroes) * 100),
    ),
    impactKg: existing.impactKg,
    impactSharePercent: Math.max(
      1,
      Math.round((existing.impactKg / totalImpactKg) * 100),
    ),
    sectorUnitLabel: existing.type === "Universitas" ? "Fakultas" : "Sektor",
    donations: generatedDonations,
    sectors: generatedSectors,
  };
}
