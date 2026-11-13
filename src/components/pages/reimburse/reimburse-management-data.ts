import avatar1Svg from "#/assets/illustrations/avatars/avatar-1.svg";
import avatar2Svg from "#/assets/illustrations/avatars/avatar-2.svg";
import avatar3Svg from "#/assets/illustrations/avatars/avatar-3.svg";
import avatar4Svg from "#/assets/illustrations/avatars/avatar-4.svg";
import avatar5Svg from "#/assets/illustrations/avatars/avatar-5.svg";
import avatar6Svg from "#/assets/illustrations/avatars/avatar-6.svg";
import charityFamilyIllustration from "#/assets/illustrations/charity-family.svg";
import foodSupplementsIllustration from "#/assets/illustrations/food-supplements.svg";
import lunchBoxIllustration from "#/assets/illustrations/lunch-box.svg";
import { formatRupiah } from "./reimburse-data";
import type {
  ReimburseHistoryItem,
  ReimburseTransferProof,
} from "./reimburse-data";

export type ReimburseDataRole = "super_admin" | "core" | "bendahara" | "staff";

export type ReimburseDataStatusFilter = "all" | "proses" | "selesai";

export type ReimburseDataDemoState = "default" | "paid" | "empty";

export interface ReimburseDataItem extends ReimburseHistoryItem {
  applicantName: string;
  applicantAvatarSrc?: string;
  isNewlyCompleted?: boolean;
}

export interface ReimburseDataStatItem {
  id: string;
  title: string;
  value: string;
  unit?: string;
  subtext: string;
  illustrationSrc: string;
  illustrationAlt: string;
  iconKey: "clock" | "check" | "wallet";
  styleVariant: "default" | "brand" | "accent";
}

export interface ReimburseStatusFilterOption {
  value: ReimburseDataStatusFilter;
  label: string;
  count: number;
}

export const REIMBURSE_DATA_ALLOWED_ROLES: readonly ReimburseDataRole[] = [
  "super_admin",
  "core",
  "bendahara",
];

// Offset data historis 2026 agar metrik ringkasan selaras dengan data agregat desain
export const REIMBURSE_HISTORICAL_COMPLETED_OFFSET = 179;
export const REIMBURSE_BASE_DISBURSED_MONTH_OFFSET = 1242500;
export const REIMBURSE_BASE_DISBURSED_COUNT_OFFSET = 21;
export const REIMBURSE_AVERAGE_CLAIM_TEXT = "Rata-rata Rp41.000 per klaim";

export const REIMBURSE_ACCESS_DENIED_MESSAGE =
  "Halaman Data Reimburse hanya untuk Super Admin, Core Team, dan Divisi Bendahara.";
export const REIMBURSE_PAID_SUCCESS_TOAST =
  "Status reimburse berhasil diperbarui menjadi selesai";
export const REIMBURSE_CANCEL_SUCCESS_TOAST =
  "Pengajuan reimburse berhasil dibatalkan";
export const REIMBURSE_TRANSFER_FILE_REJECTED_MESSAGE =
  "Format berkas harus JPG, PNG, atau PDF dengan ukuran maksimal 5MB.";

export const defaultReimburseDataItems: ReimburseDataItem[] = [
  {
    id: "rmb-1",
    applicantName: "Fauzan Trisuladana",
    applicantAvatarSrc: avatar1Svg,
    method: "GoPay",
    destinationNumber: "085712216860",
    dateLabel: "10 Nov 2026",
    amount: 46500,
    note: "GoCar angkut surplus Holland Bakery ke Pusat Studi Pancasila",
    status: "Proses",
    fileName: "struk-gocar-10nov.jpg",
    fileSize: "1,2 MB",
    fileType: "image",
  },
  {
    id: "rmb-2",
    applicantName: "Rani Kusuma",
    applicantAvatarSrc: avatar2Svg,
    method: "BCA",
    destinationNumber: "1110003333",
    dateLabel: "9 Nov 2026",
    amount: 85000,
    note: "Kantong plastik dan karet untuk pembagian di Selasar Barat",
    status: "Proses",
    fileName: "nota-plastik-4nov.pdf",
    fileSize: "420 KB",
    fileType: "pdf",
  },
  {
    id: "rmb-3",
    applicantName: "Maximillian Chandra",
    applicantAvatarSrc: avatar3Svg,
    method: "ShopeePay",
    destinationNumber: "085750744207",
    dateLabel: "8 Nov 2026",
    amount: 15100,
    note: "Kurir surplus Royal Ambarukmo ke Yayasan Madania",
    status: "Proses",
    fileName: "resi-kurir-8nov.jpg",
    fileSize: "860 KB",
    fileType: "image",
  },
  {
    id: "rmb-4",
    applicantName: "Sari Wulandari",
    applicantAvatarSrc: avatar4Svg,
    method: "GoPay",
    destinationNumber: "082133459902",
    dateLabel: "7 Nov 2026",
    amount: 120000,
    note: "Cetak banner kegiatan food rescue November",
    status: "Proses",
    fileName: "nota-banner-nov.pdf",
    fileSize: "1,5 MB",
    fileType: "pdf",
  },
  {
    id: "rmb-5",
    applicantName: "Bima Aditya",
    applicantAvatarSrc: avatar5Svg,
    method: "BNI",
    destinationNumber: "0298776512",
    dateLabel: "6 Nov 2026",
    amount: 32000,
    note: "Bensin dan parkir aksi Hyatt Regency",
    status: "Proses",
    fileName: "struk-bbm-hyatt.jpg",
    fileSize: "940 KB",
    fileType: "image",
  },
  {
    id: "rmb-6",
    applicantName: "Laras Ayuningtyas",
    applicantAvatarSrc: avatar6Svg,
    method: "DANA",
    destinationNumber: "081290873321",
    dateLabel: "5 Nov 2026",
    amount: 28500,
    note: "Es batu dan cooler box untuk susu UHT",
    status: "Selesai",
    fileName: "struk-esbatu.jpg",
    fileSize: "780 KB",
    fileType: "image",
    transferProof: {
      fileName: "bukti-transfer-laras.jpg",
      fileSize: "510 KB",
      fileType: "image",
      transferredAtLabel: "5 Nov 2026, 16:45 WIB",
      transferredBy: "Bendahara BBJ",
      referenceNumber: "TRF-BBJ-20261105-06",
    },
  },
  {
    id: "rmb-7",
    applicantName: "Fajar Nugroho",
    applicantAvatarSrc: avatar1Svg,
    method: "BCA",
    destinationNumber: "5130229871",
    dateLabel: "4 Nov 2026",
    amount: 13000,
    note: "Sewa troli angkut aksi Mirota Bakery",
    status: "Selesai",
    fileName: "kwitansi-troli.jpg",
    fileSize: "650 KB",
    fileType: "image",
    transferProof: {
      fileName: "bukti-transfer-fajar.pdf",
      fileSize: "340 KB",
      fileType: "pdf",
      transferredAtLabel: "4 Nov 2026, 14:20 WIB",
      transferredBy: "Bendahara BBJ",
      referenceNumber: "TRF-BBJ-20261104-07",
    },
  },
];

// Memeriksa apakah role diizinkan mengakses halaman Data Reimburse
export function isReimburseDataAuthorized(role: ReimburseDataRole): boolean {
  return REIMBURSE_DATA_ALLOWED_ROLES.includes(role);
}

// Memeriksa apakah role dapat membatalkan pengajuan reimburse
export function canCancelReimburseByRole(role: ReimburseDataRole): boolean {
  return role === "super_admin" || role === "core";
}

// Menyusun dataset awal berdasarkan preset demo opsional pada query parameter
export function getReimburseDataInitialItems(
  demoState?: ReimburseDataDemoState,
): ReimburseDataItem[] {
  if (demoState === "paid") {
    return defaultReimburseDataItems.map((item) =>
      item.id === "rmb-1"
        ? {
            ...item,
            status: "Selesai",
            isNewlyCompleted: true,
            transferProof: {
              fileName: "bukti-transfer-fauzan.jpg",
              fileSize: "480 KB",
              fileType: "image",
              transferredAtLabel: "10 Nov 2026, 15:10 WIB",
              transferredBy: "Bendahara BBJ",
              referenceNumber: "TRF-BBJ-20261110-01",
            },
          }
        : item,
    );
  }

  return defaultReimburseDataItems;
}

// Menghitung 3 kartu ringkasan statistik halaman Data Reimburse
export function buildReimburseDataStats(
  items: readonly ReimburseDataItem[],
): ReimburseDataStatItem[] {
  const pendingItems = items.filter((item) => item.status === "Proses");
  const completedItems = items.filter((item) => item.status === "Selesai");

  const pendingAmount = pendingItems.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const completedAmount = completedItems.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const totalDisbursedMonth =
    REIMBURSE_BASE_DISBURSED_MONTH_OFFSET + completedAmount;
  const totalDisbursedCount =
    REIMBURSE_BASE_DISBURSED_COUNT_OFFSET + completedItems.length;
  const totalClaimsCount =
    REIMBURSE_HISTORICAL_COMPLETED_OFFSET +
    pendingItems.length +
    completedItems.length;

  return [
    {
      id: "pending",
      title: "Menunggu Diproses",
      value: formatRupiah(pendingAmount),
      subtext: `${pendingItems.length} pengajuan perlu dicek`,
      illustrationSrc: charityFamilyIllustration,
      illustrationAlt: "Ilustrasi pengajuan reimburse menunggu diproses",
      iconKey: "clock",
      styleVariant: "brand",
    },
    {
      id: "disbursed",
      title: "Dicairkan Bulan Ini",
      value: formatRupiah(totalDisbursedMonth),
      subtext: `${totalDisbursedCount} pengajuan selesai`,
      illustrationSrc: lunchBoxIllustration,
      illustrationAlt: "Ilustrasi reimburse yang sudah dicairkan",
      iconKey: "check",
      styleVariant: "default",
    },
    {
      id: "total-claims",
      title: "Total Pengajuan 2026",
      value: String(totalClaimsCount),
      unit: "Klaim",
      subtext: REIMBURSE_AVERAGE_CLAIM_TEXT,
      illustrationSrc: foodSupplementsIllustration,
      illustrationAlt: "Ilustrasi total pengajuan reimburse 2026",
      iconKey: "wallet",
      styleVariant: "default",
    },
  ];
}

// Menyusun opsi FilterChip beserta jumlah per status
export function buildReimburseStatusFilterOptions(
  items: readonly ReimburseDataItem[],
): ReimburseStatusFilterOption[] {
  const pendingCount = items.filter((item) => item.status === "Proses").length;
  const completedCount =
    REIMBURSE_HISTORICAL_COMPLETED_OFFSET +
    items.filter((item) => item.status === "Selesai").length;
  const totalCount = pendingCount + completedCount;

  return [
    {
      value: "all",
      label: "Semua",
      count: totalCount,
    },
    {
      value: "proses",
      label: "Menunggu Diproses",
      count: pendingCount,
    },
    {
      value: "selesai",
      label: "Selesai",
      count: completedCount,
    },
  ];
}

// Membuat metadata bukti transfer default ketika admin menandai selesai tanpa unggah file
export function createDefaultTransferProof(
  item: ReimburseDataItem,
): ReimburseTransferProof {
  return {
    fileName: `bukti-transfer-${item.id}.jpg`,
    fileSize: "420 KB",
    fileType: "image",
    transferredAtLabel: "Baru saja dicatat",
    transferredBy: "Admin BBJ",
    referenceNumber: `TRF-BBJ-${item.id.toUpperCase()}`,
  };
}
