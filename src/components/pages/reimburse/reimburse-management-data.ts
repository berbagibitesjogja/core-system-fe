import charityFamilyIllustration from "#/assets/illustrations/charity-family.svg";
import foodSupplementsIllustration from "#/assets/illustrations/food-supplements.svg";
import lunchBoxIllustration from "#/assets/illustrations/lunch-box.svg";
import { idReimburse } from "#/locales";
import { formatRupiah } from "./reimburse-data";
import type {
  ReimburseHistoryItem,
  ReimburseHistoryStatus,
  ReimburseTransferProof,
} from "./reimburse-data";
import type { SanitizedReimbursementRecord } from "#/services/reimburseService";
import { formatReimburseDate } from "#/services/reimburseService";

export type ReimburseDataRole = "super_admin" | "core" | "bendahara" | "staff";

export type ReimburseDataStatusFilter =
  "all" | "proses" | "selesai" | "ditolak";

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

export const REIMBURSE_ACCESS_DENIED_MESSAGE =
  "Halaman Data Reimburse hanya untuk Super Admin, Core Team, dan Divisi Bendahara.";
export const REIMBURSE_PAID_SUCCESS_TOAST =
  "Status reimburse berhasil diperbarui menjadi selesai";
export const REIMBURSE_CANCEL_SUCCESS_TOAST =
  "Pengajuan reimburse berhasil dibatalkan";
export const REIMBURSE_TRANSFER_FILE_REJECTED_MESSAGE =
  "Format berkas harus JPG, PNG, atau PDF dengan ukuran maksimal 5MB.";

// Memeriksa apakah role diizinkan mengakses halaman Data Reimburse
export function isReimburseDataAuthorized(role: ReimburseDataRole): boolean {
  return REIMBURSE_DATA_ALLOWED_ROLES.includes(role);
}

// Memeriksa apakah role dapat membatalkan pengajuan reimburse
export function canCancelReimburseByRole(role: ReimburseDataRole): boolean {
  return role === "super_admin" || role === "core";
}

// Menghitung 3 kartu ringkasan statistik halaman Data Reimburse berdasarkan data produksi riil
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

  const totalDisbursedMonth = completedAmount;
  const totalDisbursedCount = completedItems.length;
  const totalClaimsCount = pendingItems.length + completedItems.length;

  const averageClaimSubtext =
    totalClaimsCount > 0
      ? idReimburse.data.stats.averageClaimSubtext(
          formatRupiah((pendingAmount + completedAmount) / totalClaimsCount),
        )
      : idReimburse.data.stats.noClaims;

  const currentYear = new Date().getFullYear();

  return [
    {
      id: "pending",
      title: idReimburse.data.stats.pendingTitle,
      value: formatRupiah(pendingAmount),
      subtext: idReimburse.data.stats.pendingSubtext(pendingItems.length),
      illustrationSrc: charityFamilyIllustration,
      illustrationAlt: idReimburse.data.stats.pendingAlt,
      iconKey: "clock",
      styleVariant: "brand",
    },
    {
      id: "disbursed",
      title: idReimburse.data.stats.disbursedTitle,
      value: formatRupiah(totalDisbursedMonth),
      subtext: idReimburse.data.stats.disbursedSubtext(totalDisbursedCount),
      illustrationSrc: lunchBoxIllustration,
      illustrationAlt: idReimburse.data.stats.disbursedAlt,
      iconKey: "check",
      styleVariant: "default",
    },
    {
      id: "total-claims",
      title: idReimburse.data.stats.totalClaimsYearTitle(currentYear),
      value: String(totalClaimsCount),
      unit: idReimburse.data.stats.totalClaimsUnit,
      subtext: averageClaimSubtext,
      illustrationSrc: foodSupplementsIllustration,
      illustrationAlt: idReimburse.data.stats.totalClaimsAlt(currentYear),
      iconKey: "wallet",
      styleVariant: "default",
    },
  ];
}

// Menyusun opsi FilterChip beserta jumlah per status berdasarkan data produksi riil
export function buildReimburseStatusFilterOptions(
  items: readonly ReimburseDataItem[],
): ReimburseStatusFilterOption[] {
  const pendingCount = items.filter((item) => item.status === "Proses").length;
  const completedCount = items.filter(
    (item) => item.status === "Selesai",
  ).length;
  const rejectedCount = items.filter(
    (item) => item.status === "Ditolak",
  ).length;
  const totalCount = items.length;

  return [
    {
      value: "all",
      label: idReimburse.data.filters.all,
      count: totalCount,
    },
    {
      value: "proses",
      label: idReimburse.data.filters.pending,
      count: pendingCount,
    },
    {
      value: "selesai",
      label: idReimburse.data.filters.completed,
      count: completedCount,
    },
    {
      value: "ditolak",
      label: idReimburse.data.filters.rejected,
      count: rejectedCount,
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

/**
 * Memetakan record reimbursement dari Server Function ke ReimburseDataItem untuk tabel admin
 */
export function mapReimbursementToDataItem(
  record: SanitizedReimbursementRecord,
  applicantName?: string,
  applicantAvatarSrc?: string,
): ReimburseDataItem {
  const statusMap: Record<string, ReimburseHistoryStatus> = {
    pending: "Proses",
    completed: "Selesai",
    rejected: "Ditolak",
  };
  const status: ReimburseHistoryStatus = statusMap[record.status] ?? "Proses";

  const transferProof: ReimburseTransferProof | undefined =
    record.status === "completed"
      ? {
          fileName: `bukti-transfer-${record.id.slice(0, 8)}.jpg`,
          fileSize: "420 KB",
          fileType: "image",
          transferredAtLabel: formatReimburseDate(record.paid_at),
          transferredBy: record.paid_by
            ? `Bendahara (${record.paid_by.slice(0, 8)})`
            : "Bendahara BBJ",
          referenceNumber: `TRF-BBJ-${record.id.slice(0, 8).toUpperCase()}`,
        }
      : undefined;

  return {
    id: record.id,
    applicantName: applicantName ?? `Staf (${record.user_id.slice(0, 8)})`,
    applicantAvatarSrc,
    method: record.method,
    destinationNumber: record.target,
    dateLabel: record.submittedDate,
    amount: record.amount,
    note: record.notes ?? "-",
    status,
    fileName: `invoice-${record.id.slice(0, 8)}.pdf`,
    fileSize: "1,2 MB",
    fileType: "pdf",
    transferProof,
    rejectionReason: record.rejection_reason ?? undefined,
  };
}
