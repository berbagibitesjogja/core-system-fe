import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";
import { handleApiError } from "./errorService";
import type { PartnerRecord } from "#/components/pages/partner/partner-data";
import type { PartnerDetailData } from "#/components/pages/partner/partner-detail-data";

/**
 * Tipe data representasi sponsor/partner dari Backend API (core-system /api/v1/sponsors)
 */
export interface SponsorRecord {
  id: string;
  name: string;
  variant: "company" | "individual";
  address: string | null;
  email: string | null;
  phone: string | null;
  logo: string | null;
  hidden: boolean;
  hide_donations: boolean;
  created_at: string;
  updated_at: string;
}

export interface SponsorListMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface SponsorListResponse {
  status: "success" | "error";
  message: string;
  data: SponsorRecord[];
  meta: SponsorListMeta;
}

export interface SponsorDetailResponse {
  status: "success" | "error";
  message: string;
  data: SponsorRecord;
}

export interface CreateSponsorPayload {
  name: string;
  variant: "company" | "individual";
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  logo?: string | null;
  hidden?: boolean;
  hide_donations?: boolean;
}

export interface CreateSponsorResponse {
  status: "success" | "error";
  message: string;
  data: SponsorRecord;
}

export interface UpdateSponsorPayload {
  id: string;
  name?: string;
  variant?: "company" | "individual";
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  logo?: string | null;
  hidden?: boolean;
  hide_donations?: boolean;
}

export interface UpdateSponsorResponse {
  status: "success" | "error";
  message: string;
  data: SponsorRecord;
}

export interface DeleteSponsorResponse {
  status: "success" | "error";
  message: string;
}

/**
 * Memformat tanggal ISO menjadi string tanggal ringkas (contoh: "18 Nov 2026")
 */
export function formatPartnerDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return "-";
  }
}

/**
 * Normalisasi format telepon untuk tampilan ramah pengguna
 */
export function formatPartnerPhone(phone: string | null): string {
  if (!phone) return "-";
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return phone;

  let normalized = cleaned;
  if (normalized.startsWith("628")) {
    normalized = "0" + normalized.slice(2);
  } else if (!normalized.startsWith("0") && !normalized.startsWith("62")) {
    normalized = "0" + normalized;
  }

  if (normalized.length >= 10) {
    const p1 = normalized.slice(0, 4);
    const p2 = normalized.slice(4, 8);
    const p3 = normalized.slice(8, 12);
    return p3 ? `${p1}-${p2}-${p3}` : `${p1}-${p2}`;
  }
  return normalized;
}

/**
 * Menghasilkan inisial nama mitra (contoh: "Holland Bakery" -> "HB")
 */
export function computePartnerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "PT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Mengubah DTO Sponsor Backend menjadi PartnerRecord untuk tampilan tabel dan statistik
 */
export function mapSponsorToPartnerRecord(
  sponsor: SponsorRecord,
): PartnerRecord {
  const isCompany = sponsor.variant === "company";
  return {
    id: sponsor.id,
    name: sponsor.name,
    initials: computePartnerInitials(sponsor.name),
    type: isCompany ? "Perusahaan" : "Individu",
    categoryId: isCompany ? "perusahaan" : "individu",
    address: sponsor.address ?? "-",
    email: sponsor.email ?? "-",
    phone: formatPartnerPhone(sponsor.phone),
    donationCount: 0,
    impactKg: 0,
    lastDonationDate: formatPartnerDate(sponsor.created_at),
    canDelete: true,
  };
}

/**
 * Mengubah DTO Sponsor Backend menjadi PartnerDetailData untuk halaman detail mitra
 */
export function mapSponsorToPartnerDetailData(
  sponsor: SponsorRecord,
): PartnerDetailData {
  const isCompany = sponsor.variant === "company";
  return {
    id: sponsor.id,
    name: sponsor.name,
    type: isCompany ? "Perusahaan" : "Individu",
    rank: null,
    subtitle: isCompany ? "Mitra Perusahaan BBJ" : "Mitra Individu BBJ",
    totalRecipients: 0,
    totalFoodKg: 0,
    avgFoodKgPerAction: 0,
    totalActions: 0,
    lastActionLabel: formatPartnerDate(sponsor.created_at),
    address: sponsor.address ?? "-",
    email: sponsor.email ?? "-",
    phone: formatPartnerPhone(sponsor.phone),
    donations: [],
  };
}

/**
 * Server Function: Mengambil daftar mitra sponsor dengan paginasi, filter varian, dan pencarian
 * Endpoint: GET /api/v1/sponsors
 */
export const getPartners = createServerFn({ method: "GET" })
  .validator(
    (data?: {
      page?: number;
      limit?: number;
      variant?: "company" | "individual";
      search?: string;
      hidden?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const response = await api.get<SponsorListResponse>("/v1/sponsors", {
        params: data,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Mengambil detail lengkap sponsor berdasarkan UUID
 * Endpoint: GET /api/v1/sponsors/:id
 */
export const getPartnerDetail = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => {
    if (!data.id) throw new Error("ID donatur wajib disertakan");
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.get<SponsorDetailResponse>(
        `/v1/sponsors/${data.id}`,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Menambahkan mitra sponsor baru
 * Endpoint: POST /api/v1/sponsors
 */
export const createPartner = createServerFn({ method: "POST" })
  .validator((data: CreateSponsorPayload) => {
    if (!data.name.trim()) throw new Error("Nama donatur wajib diisi");
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.post<CreateSponsorResponse>(
        "/v1/sponsors",
        data,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Memperbarui profil mitra sponsor yang sudah ada
 * Endpoint: PATCH /api/v1/sponsors/:id
 */
export const updatePartner = createServerFn({ method: "POST" })
  .validator((data: UpdateSponsorPayload) => {
    if (!data.id) throw new Error("ID donatur wajib disertakan");
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const { id, ...payload } = data;
      const response = await api.patch<UpdateSponsorResponse>(
        `/v1/sponsors/${id}`,
        payload,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Server Function: Menghapus mitra sponsor secara aman (soft-delete)
 * Endpoint: DELETE /api/v1/sponsors/:id
 */
export const deletePartner = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => {
    if (!data.id) throw new Error("ID donatur wajib disertakan");
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.delete<DeleteSponsorResponse>(
        `/v1/sponsors/${data.id}`,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });
