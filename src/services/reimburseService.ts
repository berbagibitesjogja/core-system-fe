import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";
import { handleApiError } from "./errorService";
import { idReimburse } from "#/locales";

/**
 * Tipe data representasi klaim reimbursement dari Backend API (core-system /api/v1/reimbursements)
 */
export interface ReimbursementRecord {
  id: string;
  user_id: string;
  amount: number;
  method: string;
  target: string;
  notes: string | null;
  status: "pending" | "completed" | "rejected";
  payment_proof: string | null;
  paid_by: string | null;
  paid_at: string | null;
  rejection_reason: string | null;
  file_ids: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Tipe data representasi reimbursement yang aman dikirim ke browser client
 * (Atribut audit database created_at & updated_at ditahan di tingkat Server Function,
 * serta created_at ditransformasi menjadi field domain submittedDate di level server)
 */
export type SanitizedReimbursementRecord = Omit<
  ReimbursementRecord,
  "created_at" | "updated_at"
> & {
  submittedDate: string;
};

export interface ReimbursementListMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface ReimbursementListResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedReimbursementRecord[];
  meta: ReimbursementListMeta;
}

export interface ReimbursementDetailResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedReimbursementRecord;
}

export interface CreateReimbursementPayload {
  amount: number;
  method: string;
  target: string;
  notes?: string | null;
  file_ids?: string[];
}

export interface CreateReimbursementResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedReimbursementRecord;
}

export interface UpdateReimbursementPayload {
  id: string;
  amount?: number;
  method?: string;
  target?: string;
  notes?: string | null;
  status?: "pending" | "completed" | "rejected";
  payment_proof?: string | null;
  paid_by?: string | null;
  paid_at?: string | null;
  rejection_reason?: string | null;
  file_ids?: string[];
}

export interface UpdateReimbursementResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedReimbursementRecord;
}

export interface DeleteReimbursementResponse {
  status: "success" | "error";
  message: string;
  data: {
    id: string;
  };
}

interface RawReimbursementListResponse {
  status: "success" | "error";
  message: string;
  data: ReimbursementRecord[];
  meta: ReimbursementListMeta;
}

interface RawReimbursementDetailResponse {
  status: "success" | "error";
  message: string;
  data: ReimbursementRecord;
}

/**
 * Memformat tanggal ISO menjadi string tanggal ringkas Indonesia (contoh: "18 Nov 2026")
 */
export function formatReimburseDate(isoString?: string | null): string {
  if (!isoString) return "-";
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
 * Menyaring data reimbursement agar atribut audit teknis database (created_at & updated_at)
 * ditahan di server dan tidak diteruskan ke browser pengguna, serta mentransformasi
 * created_at menjadi field domain submittedDate di level server.
 */
export function sanitizeReimbursementRecord(
  item: ReimbursementRecord,
): SanitizedReimbursementRecord {
  const { created_at, updated_at: _updated, ...sanitized } = item;
  return {
    ...sanitized,
    submittedDate: formatReimburseDate(created_at),
  };
}

/**
 * Mengambil daftar klaim reimbursement dengan paginasi, pencarian, dan filter status/user
 */
export const getReimbursements = createServerFn({ method: "GET" })
  .validator(
    (params?: {
      page?: number;
      limit?: number;
      user_id?: string;
      status?: string;
      search?: string;
    }) => params,
  )
  .handler(async ({ data }) => {
    try {
      const response = await api.get<RawReimbursementListResponse>(
        "/v1/reimbursements",
        { params: data },
      );
      return {
        ...response.data,
        data: response.data.data.map(sanitizeReimbursementRecord),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Mengambil detail klaim reimbursement tunggal berdasarkan UUID
 */
export const getReimbursementDetail = createServerFn({ method: "GET" })
  .validator((params: { id: string }) => {
    if (!params.id.trim()) {
      throw new Error(idReimburse.validation.idRequired);
    }
    return params;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.get<RawReimbursementDetailResponse>(
        `/v1/reimbursements/${data.id}`,
      );
      return {
        ...response.data,
        data: sanitizeReimbursementRecord(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Membuat pengajuan klaim reimbursement baru
 */
export const createReimbursement = createServerFn({ method: "POST" })
  .validator((payload: CreateReimbursementPayload) => {
    if (!payload.amount || payload.amount <= 0) {
      throw new Error(idReimburse.validation.amountRequired);
    }
    if (!payload.method.trim()) {
      throw new Error(idReimburse.validation.methodRequired);
    }
    if (!payload.target.trim()) {
      throw new Error(idReimburse.validation.destinationRequired);
    }
    if (
      payload.notes !== undefined &&
      payload.notes !== null &&
      !payload.notes.trim()
    ) {
      throw new Error(idReimburse.validation.noteRequired);
    }
    return payload;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.post<RawReimbursementDetailResponse>(
        "/v1/reimbursements",
        data,
      );
      return {
        ...response.data,
        data: sanitizeReimbursementRecord(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Memperbarui status, bukti bayar, catatan, atau data klaim reimbursement (PATCH /api/v1/reimbursements/:id)
 */
export const updateReimbursement = createServerFn({ method: "POST" })
  .validator((payload: UpdateReimbursementPayload) => {
    if (!payload.id.trim()) {
      throw new Error(idReimburse.validation.idRequired);
    }
    return payload;
  })
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const response = await api.patch<RawReimbursementDetailResponse>(
        `/v1/reimbursements/${id}`,
        updateData,
      );
      return {
        ...response.data,
        data: sanitizeReimbursementRecord(response.data.data),
      };
    } catch (error) {
      return handleApiError(error);
    }
  });

/**
 * Menghapus / membatalkan klaim reimbursement (Soft Delete)
 */
export const deleteReimbursement = createServerFn({ method: "POST" })
  .validator((params: { id: string }) => {
    if (!params.id.trim()) {
      throw new Error(idReimburse.validation.idRequired);
    }
    return params;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.delete<DeleteReimbursementResponse>(
        `/v1/reimbursements/${data.id}`,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });
