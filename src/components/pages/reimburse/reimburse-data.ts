export type ReimburseHistoryStatus = "Proses" | "Selesai" | "Ditolak";

// Pemetaan warna Badge untuk setiap status riwayat pengajuan
export const REIMBURSE_STATUS_BADGE_TONE: Record<
  ReimburseHistoryStatus,
  "warning" | "success" | "danger"
> = {
  Proses: "warning",
  Selesai: "success",
  Ditolak: "danger",
};

export type ReimburseDemoState =
  "default" | "analyzing" | "error" | "busy" | "success" | "empty";

export type ReimburseSubmitErrorCode = 422 | 504;

export interface ReimburseUploadedFileMeta {
  name: string;
  sizeLabel: string;
  fileType: "image" | "pdf";
  previewUrl?: string;
}

export interface ReimburseHistoryItem {
  id: string;
  method: string;
  destinationNumber: string;
  dateLabel: string;
  amount: number;
  note: string;
  status: ReimburseHistoryStatus;
  fileName: string;
  fileSize: string;
  fileType: "image" | "pdf";
  filePreviewUrl?: string;
  isHighlighted?: boolean;
}

export interface ReimburseRequestFormValues {
  paymentMethod: string;
  destinationNumber: string;
  note: string;
  file: ReimburseUploadedFileMeta | null;
}

export interface ReimburseRequestFieldErrors {
  paymentMethod?: string;
  destinationNumber?: string;
  note?: string;
  file?: string;
}

export interface ReimburseAlertState {
  code: ReimburseSubmitErrorCode;
  title: string;
  description: string;
}

export interface ReimburseTextFieldConfig {
  id: "paymentMethod" | "destinationNumber" | "note";
  label: string;
  placeholder: string;
  helperText?: string;
}

export const REIMBURSE_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const REIMBURSE_DEMO_DETECTED_AMOUNT = 46500;
export const REIMBURSE_UPLOAD_DEFAULT_DESC = "JPG, PNG, atau PDF. Maks 5MB";
export const REIMBURSE_ANALYZE_MIN_DURATION_MS = 5000;
export const REIMBURSE_ANALYZE_HOLD_PROGRESS = 95;
export const REIMBURSE_ANALYZE_COMPLETE_HOLD_MS = 250;

// Konfigurasi field teks pada row tujuan 2 kolom
export const reimburseDestinationFields: readonly ReimburseTextFieldConfig[] = [
  {
    id: "paymentMethod",
    label: "Metode Pembayaran",
    placeholder: "Contoh: BCA/BNI/ShopeePay/GoPay",
  },
  {
    id: "destinationNumber",
    label: "Nomor Tujuan",
    placeholder: "Contoh: 08912134452/1110003333",
    helperText: "No. rekening atau no. e-wallet.",
  },
];

// Konfigurasi field catatan wajib
export const reimburseNoteField: ReimburseTextFieldConfig = {
  id: "note",
  label: "Catatan (Wajib)",
  placeholder: "Contoh: Pemesanan GoCar untuk aksi 10 Sept 2026 Hotel IT",
  helperText: "Tulis keperluan, tanggal, dan kegiatan terkait.",
};

// Pesan error terpusat sesuai status backend (422 & 504)
export const REIMBURSE_ALERTS: Record<
  ReimburseSubmitErrorCode,
  ReimburseAlertState
> = {
  422: {
    code: 422,
    title: "Berkas ditolak",
    description:
      "Sistem tidak menemukan invoice sah atau nominal pembayaran di berkas ini. Unggah struk transaksi yang jelas, lalu ajukan lagi.",
  },
  504: {
    code: 504,
    title: "Layanan analisis invoice sedang sibuk",
    description:
      "Data kamu belum terkirim dan tetap tersimpan di form. Coba ajukan lagi dalam beberapa saat.",
  },
};

export const REIMBURSE_FILE_REJECTED_MESSAGE =
  "Bukan invoice sah atau tidak memuat nominal. Unggah struk yang jelas.";

export const REIMBURSE_SAMPLE_FORM_VALUES: Omit<
  ReimburseRequestFormValues,
  "file"
> = {
  paymentMethod: "GoPay",
  destinationNumber: "085712216860",
  note: "GoCar angkut surplus Holland Bakery ke Pusat Studi Pancasila, 10 Nov 2026",
};

export const REIMBURSE_SAMPLE_FILE: ReimburseUploadedFileMeta = {
  name: "struk-gocar-10nov.jpg",
  sizeLabel: "1,2 MB",
  fileType: "image",
};

export const emptyReimburseFormValues: ReimburseRequestFormValues = {
  paymentMethod: "",
  destinationNumber: "",
  note: "",
  file: null,
};

// Daftar riwayat pengajuan default sesuai Figma 152:22156
export const defaultReimburseHistory: ReimburseHistoryItem[] = [
  {
    id: "rmb-1",
    method: "GoPay",
    destinationNumber: "085712216860",
    dateLabel: "7 Nov 2026",
    amount: 44000,
    note: "Pemesanan GoCar untuk aksi 7 Nov 2026 Royal Ambarukmo",
    status: "Proses",
    fileName: "struk-gocar-7nov.jpg",
    fileSize: "980 KB",
    fileType: "image",
  },
  {
    id: "rmb-2",
    method: "BCA",
    destinationNumber: "1110003333",
    dateLabel: "4 Nov 2026",
    amount: 85000,
    note: "Beli kantong plastik dan karet untuk pembagian di Selasar Barat",
    status: "Proses",
    fileName: "nota-plastik-4nov.pdf",
    fileSize: "1,4 MB",
    fileType: "pdf",
  },
  {
    id: "rmb-3",
    method: "ShopeePay",
    destinationNumber: "085750744207",
    dateLabel: "31 Okt 2026",
    amount: 32500,
    note: "Kurir surplus Mirota Bakery ke Yayasan Hamba",
    status: "Selesai",
    fileName: "resi-kurir-31okt.jpg",
    fileSize: "740 KB",
    fileType: "image",
  },
  {
    id: "rmb-4",
    method: "GoPay",
    destinationNumber: "085712216860",
    dateLabel: "27 Okt 2026",
    amount: 27000,
    note: "Parkir dan bensin aksi Hotel Tentrem",
    status: "Selesai",
    fileName: "struk-bbm-parkir-27okt.jpg",
    fileSize: "620 KB",
    fileType: "image",
  },
  {
    id: "rmb-5",
    method: "OVO",
    destinationNumber: "085712216860",
    dateLabel: "24 Okt 2026",
    amount: 55000,
    note: "Pembelian es batu tambahan di luar kebutuhan aksi (nota buram)",
    status: "Ditolak",
    fileName: "struk-tambahan-24okt.jpg",
    fileSize: "510 KB",
    fileType: "image",
  },
];

// Entri terbaru untuk state success Figma 152:23563
export const demoSuccessReimburseEntry: ReimburseHistoryItem = {
  id: "rmb-new-demo",
  method: "GoPay",
  destinationNumber: "085712216860",
  dateLabel: "Hari ini",
  amount: REIMBURSE_DEMO_DETECTED_AMOUNT,
  note: "GoCar angkut surplus Holland Bakery ke Pusat Studi Pancasila, 10 Nov 2026",
  status: "Proses",
  fileName: "struk-gocar-10nov.jpg",
  fileSize: "1,2 MB",
  fileType: "image",
  isHighlighted: true,
};

/**
 * Memformat angka ke format Rupiah tanpa spasi sesuai Figma (contoh: "Rp44.000").
 */
export function formatRupiah(amount: number): string {
  return `Rp${new Intl.NumberFormat("id-ID").format(Math.max(0, Math.round(amount)))}`;
}

/**
 * Memformat ukuran file dalam KB/MB dengan koma desimal Indonesia (contoh: "1,2 MB").
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    const kb = Math.max(1, Math.round(bytes / 1024));
    return `${kb} KB`;
  }
  const mb = (bytes / (1024 * 1024)).toFixed(1).replace(".", ",");
  return `${mb} MB`;
}

/**
 * Menentukan jenis file invoice berdasarkan nama berkas.
 */
export function detectUploadedFileType(fileName: string): "image" | "pdf" {
  return fileName.toLowerCase().endsWith(".pdf") ? "pdf" : "image";
}

/**
 * Simulasi hasil error 422/504 berdasarkan kata kunci nama berkas di mode UI mock.
 */
export function detectSimulatedErrorFromFile(
  fileName: string,
): ReimburseSubmitErrorCode | null {
  const lower = fileName.toLowerCase();
  if (
    lower.includes("invalid") ||
    lower.includes("tolak") ||
    lower.includes("blur")
  ) {
    return 422;
  }
  if (
    lower.includes("busy") ||
    lower.includes("sibuk") ||
    lower.includes("timeout")
  ) {
    return 504;
  }
  return null;
}

/**
 * Menghasilkan nominal simulasi dari catatan/berkas dengan fallback Figma "Rp46.500".
 */
export function estimateReimburseAmount(note: string): number {
  const match = note.match(/rp\s*([0-9.]+)/i);
  if (match && match[1]) {
    const parsed = Number(match[1].replace(/\./g, ""));
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return REIMBURSE_DEMO_DETECTED_AMOUNT;
}

/**
 * Menghitung persentase progress analisis AI (0% -> 95% dalam minimal 5 detik).
 * Jika respons belum selesai setelah 5 detik, persentase bertahan (stuck) di 95%.
 */
export function computeReimburseAnalyzeProgress(elapsedMs: number): number {
  const ratio = Math.min(
    1,
    Math.max(0, elapsedMs / REIMBURSE_ANALYZE_MIN_DURATION_MS),
  );
  const eased = 1 - Math.pow(1 - ratio, 2);
  return Math.min(
    REIMBURSE_ANALYZE_HOLD_PROGRESS,
    Math.round(eased * REIMBURSE_ANALYZE_HOLD_PROGRESS),
  );
}

export interface ReimbursePresetState {
  formValues: ReimburseRequestFormValues;
  uploadState: "default" | "analyzing" | "uploaded" | "error";
  uploadErrorMessage?: string;
  analyzingProgress?: number;
  alert: ReimburseAlertState | null;
  isAnalyzing: boolean;
  historyItems: ReimburseHistoryItem[];
  initialToastMessage?: string;
}

/**
 * Menyusun preset state untuk 6 layar Figma agar dapat diakses langsung via query parameter `?state=...`.
 */
export function getReimbursePresetState(
  demoState?: ReimburseDemoState,
): ReimbursePresetState {
  switch (demoState) {
    case "analyzing":
      return {
        formValues: {
          ...REIMBURSE_SAMPLE_FORM_VALUES,
          file: REIMBURSE_SAMPLE_FILE,
        },
        uploadState: "analyzing",
        analyzingProgress: 0,
        alert: null,
        isAnalyzing: true,
        historyItems: defaultReimburseHistory,
      };
    case "error":
      return {
        formValues: {
          ...REIMBURSE_SAMPLE_FORM_VALUES,
          file: null,
        },
        uploadState: "error",
        uploadErrorMessage: REIMBURSE_FILE_REJECTED_MESSAGE,
        alert: REIMBURSE_ALERTS[422],
        isAnalyzing: false,
        historyItems: defaultReimburseHistory,
      };
    case "busy":
      return {
        formValues: {
          ...REIMBURSE_SAMPLE_FORM_VALUES,
          file: REIMBURSE_SAMPLE_FILE,
        },
        uploadState: "uploaded",
        alert: REIMBURSE_ALERTS[504],
        isAnalyzing: false,
        historyItems: defaultReimburseHistory,
      };
    case "success":
      return {
        formValues: emptyReimburseFormValues,
        uploadState: "default",
        alert: null,
        isAnalyzing: false,
        historyItems: [
          demoSuccessReimburseEntry,
          ...defaultReimburseHistory.slice(0, 3),
        ],
        initialToastMessage: `Pengajuan terkirim. Nominal terdeteksi: ${formatRupiah(REIMBURSE_DEMO_DETECTED_AMOUNT)}`,
      };
    case "empty":
      return {
        formValues: emptyReimburseFormValues,
        uploadState: "default",
        alert: null,
        isAnalyzing: false,
        historyItems: [],
      };
    case "default":
    default:
      return {
        formValues: emptyReimburseFormValues,
        uploadState: "default",
        alert: null,
        isAnalyzing: false,
        historyItems: defaultReimburseHistory,
      };
  }
}
