import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";
import { handleApiError } from "./errorService";
import type {
  DonationItem,
  DonationProgram,
  DonationStatus,
} from "#/components/pages/donation/donation-data";
import type {
  DonationDetailRecord,
  DonationHeroClaimRecord,
  DonationHeroPickupStatus,
  DonationSurplusFoodItem,
} from "#/components/pages/donation/donation-detail-data";
import { getPresetAvatarByIndex } from "#/lib/avatars";

// ---------------------------------------------------------------------------
// Tipe Data Kontrak API Backend (Donations, Attendances, Food Items)
// ---------------------------------------------------------------------------

export type DonationApiStatus =
  "draft" | "open" | "closed" | "completed" | "cancelled";

export interface DonationSponsorPayload {
  id: string | null;
  name: string;
  logo?: string | null;
  hidden?: boolean;
  hide_donations?: boolean;
  is_deleted?: boolean;
  email?: string;
  phone?: string;
  address?: string;
}

export interface DonationFoodPayload {
  food_item_id: number;
  name?: string;
  quantity: number;
  unit: string;
}

export interface DonationTargetPayload {
  beneficiary_category_id: string | null;
  name: string;
  variant?: string | null;
}

export interface RawDonationRecord {
  id: string;
  event_at: string;
  quota: number;
  hero_quota: number;
  remain: number;
  address?: string;
  maps?: string;
  message?: string;
  status: DonationApiStatus;
  hide_from_public?: boolean;
  hide_sponsor?: boolean;
  sponsor: DonationSponsorPayload;
  created_by?: {
    id: string;
    email: string;
  };
  foods: DonationFoodPayload[];
  targets: DonationTargetPayload[];
  created_at?: string;
  updated_at?: string;
}

// Sanitized record menahan mentahan audit created_at & updated_at dari browser
export type SanitizedDonationRecord = Omit<
  RawDonationRecord,
  "created_at" | "updated_at"
>;

export interface RawHeroAttendanceRecord {
  id: string;
  donation_id: string;
  hero_id: string;
  hero_name: string;
  hero_email?: string;
  hero_phone?: string;
  status: "registered" | "attended" | "absent" | "cancelled";
  cancelled_late?: boolean;
  cancelled_at?: string | null;
  attended_at?: string | null;
  marked_by?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type SanitizedHeroAttendanceRecord = Omit<
  RawHeroAttendanceRecord,
  "created_at" | "updated_at"
>;

export interface RawFoodItemRecord {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export type SanitizedFoodItemRecord = Omit<
  RawFoodItemRecord,
  "created_at" | "updated_at"
>;

// Respon envelopes
export interface DonationListResponse {
  status: string;
  message: string;
  data: SanitizedDonationRecord[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface DonationDetailResponse {
  status: string;
  message: string;
  data: SanitizedDonationRecord;
}

export interface HeroAttendanceListResponse {
  status: string;
  message: string;
  data: SanitizedHeroAttendanceRecord[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface FoodItemListResponse {
  status: string;
  message: string;
  data: SanitizedFoodItemRecord[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Payload permintaan create & update
export interface CreateDonationPayload {
  sponsor_id: string;
  event_at: string;
  quota: number;
  hero_quota?: number;
  address?: string;
  maps?: string;
  message?: string;
  hide_from_public?: boolean;
  hide_sponsor?: boolean;
  foods: {
    food_item_id: number;
    quantity: number;
    unit: string;
  }[];
  beneficiary_category_ids?: string[];
}

export interface UpdateDonationPayload {
  id: string;
  sponsor_id?: string;
  event_at?: string;
  quota?: number;
  hero_quota?: number;
  address?: string;
  maps?: string;
  message?: string;
  hide_from_public?: boolean;
  hide_sponsor?: boolean;
  foods?: {
    food_item_id: number;
    quantity: number;
    unit: string;
  }[];
  beneficiary_category_ids?: string[];
}

// ---------------------------------------------------------------------------
// Helper Sanitasi & Pemetaan (Withholding Audit Fields)
// ---------------------------------------------------------------------------

function sanitizeDonation(record: RawDonationRecord): SanitizedDonationRecord {
  const { created_at: _created, updated_at: _updated, ...sanitized } = record;
  return sanitized;
}

function sanitizeHeroAttendance(
  record: RawHeroAttendanceRecord,
): SanitizedHeroAttendanceRecord {
  const { created_at: _created, updated_at: _updated, ...sanitized } = record;
  return sanitized;
}

function sanitizeFoodItem(record: RawFoodItemRecord): SanitizedFoodItemRecord {
  const { created_at: _created, updated_at: _updated, ...sanitized } = record;
  return sanitized;
}

// ---------------------------------------------------------------------------
// Server Functions: Donasi
// ---------------------------------------------------------------------------

// Mengambil daftar donasi dengan filter paginasi, status, dan pencarian
export const getDonations = createServerFn({ method: "GET" })
  .validator(
    (data: {
      page?: number;
      limit?: number;
      status?: string;
      search?: string;
    }) => data,
  )
  .handler(async ({ data }): Promise<DonationListResponse> => {
    try {
      const response = await api.get<{
        status: string;
        message: string;
        data: RawDonationRecord[];
        meta: {
          page: number;
          limit: number;
          total: number;
          total_pages: number;
        };
      }>("/v1/donations", {
        params: {
          page: data.page ?? 1,
          limit: data.limit ?? 20,
          status:
            data.status && data.status !== "all" ? data.status : undefined,
          search: data.search?.trim() || undefined,
        },
      });

      return {
        ...response.data,
        data: Array.isArray(response.data.data)
          ? response.data.data.map(sanitizeDonation)
          : [],
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

// Mengambil rincian data donasi berdasarkan ID
export const getDonationDetail = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<DonationDetailResponse> => {
    try {
      const response = await api.get<{
        status: string;
        message: string;
        data: RawDonationRecord;
      }>(`/v1/donations/${data.id}`);

      return {
        ...response.data,
        data: sanitizeDonation(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

// Membuat aksi donasi baru (Draft)
export const createDonation = createServerFn({ method: "POST" })
  .validator((payload: CreateDonationPayload) => payload)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>("/v1/donations", data);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// Memperbarui donasi (Safe PATCH)
export const updateDonation = createServerFn({ method: "POST" })
  .validator((payload: UpdateDonationPayload) => payload)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const { id, ...body } = data;
        const response = await api.patch<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>(`/v1/donations/${id}`, body);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// Menghapus donasi (hanya status draft)
export const deleteDonation = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.delete<{
        status: string;
        message: string;
      }>(`/v1/donations/${data.id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

// Publikasikan donasi (Draft -> Open)
export const publishDonation = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>(`/v1/donations/${data.id}/publish`);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// Menutup donasi (Open -> Closed)
export const closeDonation = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>(`/v1/donations/${data.id}/close`);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// Membuka kembali donasi (Closed -> Open)
export const reopenDonation = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>(`/v1/donations/${data.id}/reopen`);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// Menyelesaikan aksi donasi (Open/Closed -> Completed)
export const completeDonation = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>(`/v1/donations/${data.id}/complete`);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// Membatalkan aksi donasi (Draft/Open/Closed -> Cancelled)
export const cancelDonation = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedDonationRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawDonationRecord;
        }>(`/v1/donations/${data.id}/cancel`);

        return {
          ...response.data,
          data: sanitizeDonation(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// ---------------------------------------------------------------------------
// Server Functions: Presensi & Klaim Heroes
// ---------------------------------------------------------------------------

// Mengambil daftar reservasi & absensi heroes pada suatu donasi
export const getDonationAttendances = createServerFn({ method: "GET" })
  .validator(
    (data: { id: string; page?: number; limit?: number; status?: string }) =>
      data,
  )
  .handler(async ({ data }): Promise<HeroAttendanceListResponse> => {
    try {
      const response = await api.get<{
        status: string;
        message: string;
        data: RawHeroAttendanceRecord[];
        meta: {
          page: number;
          limit: number;
          total: number;
          total_pages: number;
        };
      }>(`/v1/donations/${data.id}/attendances`, {
        params: {
          page: data.page ?? 1,
          limit: data.limit ?? 50,
          status: data.status?.trim() || undefined,
        },
      });

      return {
        ...response.data,
        data: Array.isArray(response.data.data)
          ? response.data.data.map(sanitizeHeroAttendance)
          : [],
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

// Menandai kehadiran atau ketidakhadiran hero (attended / absent)
export const markHeroAttendance = createServerFn({ method: "POST" })
  .validator(
    (data: {
      donationId: string;
      attendanceId: string;
      status: "attended" | "absent";
      notes?: string;
    }) => data,
  )
  .handler(async ({ data }): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.post<{
        status: string;
        message: string;
      }>(`/v1/donations/${data.donationId}/attendances/${data.attendanceId}`, {
        status: data.status,
        notes: data.notes?.trim() || undefined,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

// Mengambil daftar food items untuk referensi autocomplete form
export const getFoodItems = createServerFn({ method: "GET" })
  .validator((data: { search?: string; limit?: number }) => data)
  .handler(async ({ data }): Promise<FoodItemListResponse> => {
    try {
      const response = await api.get<{
        status: string;
        message: string;
        data: RawFoodItemRecord[];
        meta?: {
          page: number;
          limit: number;
          total: number;
          total_pages: number;
        };
      }>("/v1/food-items", {
        params: {
          search: data.search?.trim() || undefined,
          limit: data.limit ?? 100,
        },
      });

      return {
        ...response.data,
        data: Array.isArray(response.data.data)
          ? response.data.data.map(sanitizeFoodItem)
          : [],
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

// Membuat food item baru di katalog master
export const createFoodItem = createServerFn({ method: "POST" })
  .validator((data: { name: string }) => data)
  .handler(
    async ({
      data,
    }): Promise<{
      status: string;
      message: string;
      data: SanitizedFoodItemRecord;
    }> => {
      try {
        const response = await api.post<{
          status: string;
          message: string;
          data: RawFoodItemRecord;
        }>("/v1/food-items", { name: data.name.trim() });

        return {
          ...response.data,
          data: sanitizeFoodItem(response.data.data),
        };
      } catch (error) {
        return handleApiError(error);
      }
    },
  );

// ---------------------------------------------------------------------------
// Domain Mappers & Formatters
// ---------------------------------------------------------------------------

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const INDO_MONTHS = [
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

const INDO_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function parseDonationDate(isoString: string): {
  day: string;
  dateStr: string;
  timeStr: string;
  isoDateOnly: string;
} {
  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) {
    return {
      day: "-",
      dateStr: "-",
      timeStr: "-",
      isoDateOnly: "",
    };
  }

  const dayName = INDO_DAYS[dateObj.getDay()] ?? "";
  const dateNum = dateObj.getDate();
  const monthName = INDO_MONTHS[dateObj.getMonth()] ?? "";
  const yearNum = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  const isoDateOnly = `${yearNum}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateNum).padStart(2, "0")}`;

  return {
    day: dayName,
    dateStr: `${dateNum} ${monthName} ${yearNum}`,
    timeStr: `${hours}.${minutes} WIB`,
    isoDateOnly,
  };
}

export function mapDonationToDonationItem(
  record: SanitizedDonationRecord,
): DonationItem {
  const parsed = parseDonationDate(record.event_at);
  const donorName = record.sponsor.name || "Generous Sponsor";

  // Evaluasi program: Jika sponsor tergolong corporate / CSR
  const isCsr =
    record.sponsor.hidden ||
    record.hide_sponsor ||
    donorName.toLowerCase().includes("pt ") ||
    donorName.toLowerCase().includes("hotel") ||
    donorName.toLowerCase().includes("csr");
  const program: DonationProgram = isCsr ? "CSR" : "Food Rescue";

  // Status mapping
  const status: DonationStatus =
    record.status === "completed" || record.status === "cancelled"
      ? "Selesai"
      : "Aktif";

  const quotaTotal = record.quota || record.hero_quota || 0;
  const quotaClaimed = Math.max(0, record.hero_quota - record.remain);

  return {
    id: record.id,
    date: parsed.dateStr,
    day: parsed.day,
    isoDate: parsed.isoDateOnly,
    donorName,
    program,
    initials: getInitials(donorName),
    quotaClaimed,
    quotaTotal,
    status,
    canDelete: record.status === "draft",
  };
}

export function mapAttendanceStatus(
  status: SanitizedHeroAttendanceRecord["status"],
): DonationHeroPickupStatus {
  if (status === "attended") return "sudah-diambil";
  if (status === "absent" || status === "cancelled") return "tidak-jadi-ambil";
  return "belum-diambil";
}

export function mapDonationToDetailRecord(
  record: SanitizedDonationRecord,
  attendances: SanitizedHeroAttendanceRecord[] = [],
): DonationDetailRecord {
  const parsed = parseDonationDate(record.event_at);
  const donorName = record.sponsor.name || "Generous Sponsor";

  const isCsr =
    record.sponsor.hidden ||
    record.hide_sponsor ||
    donorName.toLowerCase().includes("pt ") ||
    donorName.toLowerCase().includes("hotel") ||
    donorName.toLowerCase().includes("csr");
  const program: DonationProgram = isCsr ? "CSR" : "Food Rescue";

  const status: DonationItem["status"] =
    record.status === "completed" || record.status === "cancelled"
      ? "Selesai"
      : "Aktif";

  const heroes: DonationHeroClaimRecord[] = attendances.map((att, idx) => ({
    id: att.id,
    heroId: att.hero_id,
    name: att.hero_name || `Hero ${att.hero_id.slice(0, 8)}`,
    avatarSrc: getPresetAvatarByIndex(idx),
    sectorName: att.hero_phone ? `+${att.hero_phone}` : "Penerima",
    beneficiaryName: att.hero_email || "Terdaftar",
    claimCode: `CLM-${att.id.slice(0, 6).toUpperCase()}`,
    status: mapAttendanceStatus(att.status),
    claimedAt: att.attended_at
      ? parseDonationDate(att.attended_at).timeStr
      : undefined,
  }));

  const surplusFoods: DonationSurplusFoodItem[] = record.foods.map(
    (food, idx) => {
      const isWeightGram = food.unit === "g" || food.unit === "kg";
      const weightInGram =
        food.unit === "kg"
          ? Math.round(food.quantity * 1000)
          : Math.round(food.quantity);

      return {
        id: `${record.id}-food-${food.food_item_id || idx + 1}`,
        foodItemId: food.food_item_id,
        name: food.name || `Porsi Makanan ${idx + 1}`,
        quantity:
          food.unit === "portion" ||
          food.unit === "pack" ||
          food.unit === "piece"
            ? Math.round(food.quantity)
            : undefined,
        weight: isWeightGram ? weightInGram : Math.round(food.quantity * 250),
        unit: food.unit === "ml" || food.unit === "l" ? "ml" : "gr",
        isSpoiled: false,
        notes: `${food.quantity} ${food.unit}`,
      };
    },
  );

  return {
    id: record.id,
    donorName,
    donorInitials: getInitials(donorName),
    date: parsed.dateStr,
    day: parsed.day,
    dateIso: parsed.isoDateOnly,
    pickupSchedule: `${parsed.day}, ${parsed.dateStr} · ${parsed.timeStr}`,
    program,
    status,
    quotaTotal: record.quota,
    location: record.address || "Pusat Distribusi BBJ",
    mapsUrl: record.maps || "https://maps.google.com",
    documentationUrl: "https://drive.google.com",
    notes: record.message || "Tidak ada catatan khusus.",
    heroes,
    surplusFoods,
  };
}
