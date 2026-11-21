import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";
import { handleApiError } from "./errorService";
import { idBeneficiary } from "#/locales";
import type {
  BeneficiaryFormData,
  BeneficiaryItem,
} from "#/components/pages/beneficiary/beneficiary-data";
import type { BeneficiaryDetailProfile } from "#/components/pages/beneficiary/beneficiary-detail-data";

export type BeneficiaryCategoryVariant =
  | "university"
  | "kipk"
  | "orphanage"
  | "nursing_home"
  | "shelter"
  | "religious_community"
  | "foundation"
  | "society"
  | "other";

/**
 * Tipe data representasi kategori penerima manfaat dari Backend API
 * (/api/v1/beneficiary-categories)
 */
export interface BeneficiaryCategoryRecord {
  id: string;
  name: string;
  address: string | null;
  maps: string | null;
  variant: BeneficiaryCategoryVariant;
  email_domain: string | null;
  is_priority: boolean;
  hidden: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Tipe data kategori penerima manfaat yang aman dikirim ke browser client
 * (Atribut audit database created_at & updated_at ditahan di tingkat Server Function)
 */
export type SanitizedBeneficiaryCategoryRecord = Omit<
  BeneficiaryCategoryRecord,
  "created_at" | "updated_at"
>;

export interface BeneficiaryCategoryListMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface BeneficiaryCategoryListResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedBeneficiaryCategoryRecord[];
  meta: BeneficiaryCategoryListMeta;
}

export interface BeneficiaryCategoryDetailResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedBeneficiaryCategoryRecord;
}

export interface CreateBeneficiaryCategoryPayload {
  name: string;
  variant: BeneficiaryCategoryVariant;
  address?: string | null;
  maps?: string | null;
  email_domain?: string | null;
  is_priority?: boolean;
  hidden?: boolean;
}

export interface CreateBeneficiaryCategoryResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedBeneficiaryCategoryRecord;
}

export interface UpdateBeneficiaryCategoryPayload {
  id: string;
  name?: string;
  variant?: BeneficiaryCategoryVariant;
  address?: string | null;
  maps?: string | null;
  email_domain?: string | null;
  is_priority?: boolean;
  hidden?: boolean;
}

export interface UpdateBeneficiaryCategoryResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedBeneficiaryCategoryRecord;
}

export interface DeleteBeneficiaryCategoryResponse {
  status: "success" | "error";
  message: string;
  data: {
    id: string;
  };
}

/**
 * Menyaring data kategori penerima manfaat agar atribut audit teknis database
 * (created_at & updated_at) ditahan di server dan tidak diteruskan ke browser pengguna.
 */
export function sanitizeBeneficiaryCategoryRecord(
  record: BeneficiaryCategoryRecord,
): SanitizedBeneficiaryCategoryRecord {
  const { created_at: _created, updated_at: _updated, ...sanitized } = record;
  return sanitized;
}

/**
 * Memetakan taxonomy variant backend ke kategori tampilan UI Frontend beserta label terjemahan bahasa.
 */
export function mapVariantToBeneficiaryCategory(
  variant: BeneficiaryCategoryVariant | string,
): { categoryId: string; type: string } {
  const targetVariant = mapCategoryIdToVariant(variant || "other");
  return {
    categoryId: targetVariant,
    type: idBeneficiary.variants[targetVariant],
  };
}

/**
 * Memetakan kategori tampilan UI Frontend ke taxonomy variant backend yang valid (9 varian API contract).
 */
export function mapCategoryIdToVariant(
  categoryId: string,
): BeneficiaryCategoryVariant {
  const normalized = categoryId.trim().toLowerCase();
  if (normalized === "universitas" || normalized === "perguruan tinggi") {
    return "university";
  }
  if (normalized === "yayasan") {
    return "foundation";
  }
  if (
    normalized === "masyarakat-umum" ||
    normalized === "masyarakat umum" ||
    normalized === "komunitas warga" ||
    normalized === "masyarakat / komunitas warga"
  ) {
    return "society";
  }
  if (normalized === "kip-kuliah" || normalized === "kipk") {
    return "kipk";
  }
  if (normalized === "panti asuhan" || normalized === "orphanage") {
    return "orphanage";
  }
  if (normalized === "panti jompo" || normalized === "nursing_home") {
    return "nursing_home";
  }
  if (normalized === "shelter" || normalized.includes("tempat penampungan")) {
    return "shelter";
  }
  if (
    normalized === "komunitas keagamaan" ||
    normalized === "religious_community"
  ) {
    return "religious_community";
  }
  if (normalized === "lainnya" || normalized === "other") {
    return "other";
  }

  const validVariants: BeneficiaryCategoryVariant[] = [
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
  if (validVariants.includes(normalized as BeneficiaryCategoryVariant)) {
    return normalized as BeneficiaryCategoryVariant;
  }
  return "other";
}

/**
 * Menghasilkan huruf inisial untuk avatar kelompok penerima manfaat
 */
export function computeBeneficiaryInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "B";
  return trimmed[0].toUpperCase();
}

/**
 * Mengubah DTO kategori penerima manfaat menjadi item grid/kartu halaman daftar
 */
export function mapCategoryToBeneficiaryItem(
  record: SanitizedBeneficiaryCategoryRecord,
  index: number,
): BeneficiaryItem {
  const { categoryId, type } = mapVariantToBeneficiaryCategory(record.variant);
  return {
    id: record.id,
    rank: index + 1,
    name: record.name,
    initial: computeBeneficiaryInitial(record.name),
    type,
    categoryId,
    heroesCount: 0,
    impactKg: 0,
    canDelete: true,
  };
}

/**
 * Mengubah DTO kategori penerima manfaat menjadi profil detail halaman detail
 */
export function mapCategoryToBeneficiaryDetailProfile(
  record: SanitizedBeneficiaryCategoryRecord,
): BeneficiaryDetailProfile {
  const { type } = mapVariantToBeneficiaryCategory(record.variant);
  const isUniversity =
    record.variant === "university" ||
    record.variant === "kipk" ||
    type.toLowerCase().includes("universi") ||
    type.toLowerCase().includes("perguruan tinggi") ||
    type.toLowerCase().includes("kipk");
  return {
    id: record.id,
    name: record.name,
    type,
    rank: null,
    subtitle: `Kelompok penerima manfaat · ${type}`,
    heroesCount: 0,
    heroesSharePercent: 0,
    impactKg: 0,
    impactSharePercent: 0,
    sectorUnitLabel: isUniversity ? "Fakultas" : "Sektor",
    donations: [],
    sectors: [],
  };
}

/**
 * Mengubah DTO kategori penerima manfaat menjadi nilai awal formulir Edit Beneficiary
 */
export function mapCategoryToBeneficiaryFormData(
  record: SanitizedBeneficiaryCategoryRecord,
): BeneficiaryFormData {
  const { categoryId } = mapVariantToBeneficiaryCategory(record.variant);
  return {
    id: record.id,
    categoryId,
    name: record.name,
  };
}

/**
 * Server Function: Mengambil daftar kategori penerima manfaat dengan paginasi, filter variant, dan pencarian
 * Endpoint: GET /api/v1/beneficiary-categories
 */
export const getBeneficiaries = createServerFn({ method: "GET" })
  .validator(
    (data?: {
      page?: number;
      limit?: number;
      variant?: BeneficiaryCategoryVariant;
      search?: string;
      hidden?: boolean;
    }) => data,
  )
  .handler(async ({ data }): Promise<BeneficiaryCategoryListResponse> => {
    try {
      const response = await api.get<{
        status: "success" | "error";
        message: string;
        data: BeneficiaryCategoryRecord[];
        meta: BeneficiaryCategoryListMeta;
      }>("/v1/beneficiary-categories", {
        params: data,
      });

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: response.data.data.map(sanitizeBeneficiaryCategoryRecord),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Mengambil detail kategori penerima manfaat berdasarkan UUID
 * Endpoint: GET /api/v1/beneficiary-categories/:id
 */
export const getBeneficiaryDetail = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => {
    if (!data.id) throw new Error(idBeneficiary.validation.idRequired);
    return data;
  })
  .handler(async ({ data }): Promise<BeneficiaryCategoryDetailResponse> => {
    try {
      const response = await api.get<{
        status: "success" | "error";
        message: string;
        data: BeneficiaryCategoryRecord;
      }>(`/v1/beneficiary-categories/${encodeURIComponent(data.id)}`);

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: sanitizeBeneficiaryCategoryRecord(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Menambahkan kategori penerima manfaat baru
 * Endpoint: POST /api/v1/beneficiary-categories
 */
export const createBeneficiary = createServerFn({ method: "POST" })
  .validator((data: CreateBeneficiaryCategoryPayload) => {
    if (!data.name.trim()) {
      throw new Error(idBeneficiary.validation.nameRequired);
    }
    return data;
  })
  .handler(async ({ data }): Promise<CreateBeneficiaryCategoryResponse> => {
    try {
      const response = await api.post<{
        status: "success" | "error";
        message: string;
        data: BeneficiaryCategoryRecord;
      }>("/v1/beneficiary-categories", data);

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: sanitizeBeneficiaryCategoryRecord(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Memperbarui data kategori penerima manfaat
 * Endpoint: PATCH /api/v1/beneficiary-categories/:id
 */
export const updateBeneficiary = createServerFn({ method: "POST" })
  .validator((data: UpdateBeneficiaryCategoryPayload) => {
    if (!data.id) throw new Error(idBeneficiary.validation.idRequired);
    return data;
  })
  .handler(async ({ data }): Promise<UpdateBeneficiaryCategoryResponse> => {
    try {
      const { id, ...payload } = data;
      const response = await api.patch<{
        status: "success" | "error";
        message: string;
        data: BeneficiaryCategoryRecord;
      }>(`/v1/beneficiary-categories/${encodeURIComponent(id)}`, payload);

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: sanitizeBeneficiaryCategoryRecord(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Menghapus kategori penerima manfaat secara aman (soft-delete)
 * Endpoint: DELETE /api/v1/beneficiary-categories/:id
 */
export const deleteBeneficiary = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => {
    if (!data.id) throw new Error(idBeneficiary.validation.idRequired);
    return data;
  })
  .handler(async ({ data }): Promise<DeleteBeneficiaryCategoryResponse> => {
    try {
      const response = await api.delete<DeleteBeneficiaryCategoryResponse>(
        `/v1/beneficiary-categories/${encodeURIComponent(data.id)}`,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });
