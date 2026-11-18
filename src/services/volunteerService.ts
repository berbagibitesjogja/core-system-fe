import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";
import { handleApiError } from "./errorService";
import type { VolunteerRecord } from "#/components/pages/volunteer/volunteer-data";

/**
 * Tipe data representasi staf dari Backend API (core-system /api/v1/staff)
 */
export interface StaffMemberRecord {
  user_id: string;
  email: string;
  name: string;
  phone_number: string | null;
  profile_pic: string | null;
  pfp_external_url: string | null;
  is_active: boolean;
  division_id: number;
  division_name: string;
  role: "super" | "core" | "staff";
  created_at: string;
  updated_at: string;
}

/**
 * Tipe data representasi staf yang aman dikirim ke browser client
 * (Atribut audit database created_at & updated_at ditahan di tingkat Server Function,
 * serta created_at ditransformasi menjadi field domain joinedDate di level server)
 */
export type SanitizedStaffMemberRecord = Omit<
  StaffMemberRecord,
  "created_at" | "updated_at"
> & {
  joinedDate: string;
};

export interface StaffListMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface StaffListResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedStaffMemberRecord[];
  meta: StaffListMeta;
}

export interface StaffDetailResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedStaffMemberRecord;
}

export interface CreateStaffInvitationPayload {
  email: string;
  role: "super" | "core" | "staff";
  division_id: number;
  name?: string;
  phone_number?: string;
}

export interface CreateStaffInvitationResponse {
  status: "success" | "error";
  message: string;
  data: {
    id: string;
    email: string;
    role: "super" | "core" | "staff";
    division_id: number;
    division_name: string;
    name?: string;
    phone_number?: string;
    expires_at: string;
    token: string;
    invite_link: string;
  };
}

export interface UpdateStaffPayload {
  id: string;
  role?: "super" | "core" | "staff";
  division_id?: number;
}

export interface UpdateStaffResponse {
  status: "success" | "error";
  message: string;
  data: SanitizedStaffMemberRecord;
}

export interface DeleteStaffResponse {
  status: "success" | "error";
  message: string;
}

/**
 * Memformat tanggal ISO menjadi string tanggal Indonesia (contoh: "11 November 2026")
 */
export function formatStaffJoinedDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return "-";
  }
}

/**
 * Normalisasi nomor telepon ke format tampilan lokal (contoh: "0812-3456-7890")
 */
export function formatStaffPhoneNumber(phone: string | null): string {
  if (!phone) return "-";
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return phone;

  // Jika berawalan 628, ganti ke 08 untuk tampilan lokal
  let normalized = cleaned;
  if (normalized.startsWith("628")) {
    normalized = "0" + normalized.slice(2);
  } else if (!normalized.startsWith("0")) {
    normalized = "0" + normalized;
  }

  // Format grup: 08xx-xxxx-xxxx
  if (normalized.length >= 10) {
    const part1 = normalized.slice(0, 4);
    const part2 = normalized.slice(4, 8);
    const part3 = normalized.slice(8, 12);
    return part3 ? `${part1}-${part2}-${part3}` : `${part1}-${part2}`;
  }
  return normalized;
}

/**
 * Menyaring data staf agar atribut audit teknis database (created_at & updated_at)
 * ditahan di server dan tidak diteruskan ke browser pengguna, serta mentransformasi
 * created_at menjadi field domain joinedDate di level server.
 */
export function sanitizeStaffMemberRecord(
  staff: StaffMemberRecord,
): SanitizedStaffMemberRecord {
  const { created_at, updated_at: _updated, ...sanitized } = staff;
  return {
    ...sanitized,
    joinedDate: formatStaffJoinedDate(created_at),
  };
}

/**
 * Mengubah DTO Staff dari Backend menjadi VolunteerRecord untuk tampilan antarmuka
 */
export function mapStaffToVolunteerRecord(
  staff: SanitizedStaffMemberRecord,
): VolunteerRecord {
  return {
    id: staff.user_id,
    name: staff.name,
    email: staff.email,
    phone: formatStaffPhoneNumber(staff.phone_number),
    division: staff.division_name || "Volunteer",
    role: staff.role,
    hasActiveRelations: false,
    joinedDate: staff.joinedDate,
  };
}

/**
 * Server Function: Mengambil daftar staf dengan paginasi, filter divisi/peran, dan pencarian
 * Endpoint: GET /api/v1/staff
 */
export const getVolunteers = createServerFn({ method: "GET" })
  .validator(
    (params: {
      page?: number;
      limit?: number;
      division_id?: number;
      role?: "super" | "core" | "staff";
      search?: string;
    }) => params,
  )
  .handler(async ({ data }) => {
    try {
      const response = await api.get<{
        status: "success" | "error";
        message: string;
        data: StaffMemberRecord[];
        meta: StaffListMeta;
      }>("/v1/staff", {
        params: {
          page: data.page ?? 1,
          limit: data.limit ?? 10,
          division_id: data.division_id,
          role: data.role,
          search: data.search?.trim() || undefined,
        },
      });

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: response.data.data.map(sanitizeStaffMemberRecord),
      };
    } catch (error) {
      throw handleApiError(error);
    }
  });

/**
 * Server Function: Mengambil detail lengkap staf berdasarkan user_id atau "me"
 * Endpoint: GET /api/v1/staff/:id
 */
export const getVolunteerDetail = createServerFn({ method: "GET" })
  .validator((params: { id: string }) => params)
  .handler(async ({ data }) => {
    try {
      const response = await api.get<{
        status: "success" | "error";
        message: string;
        data: StaffMemberRecord;
      }>(`/v1/staff/${encodeURIComponent(data.id)}`);

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: sanitizeStaffMemberRecord(response.data.data),
      };
    } catch (error) {
      throw handleApiError(error);
    }
  });

/**
 * Server Function: Membuat dan mengirimkan undangan staf baru
 * Endpoint: POST /api/v1/invitations
 */
export const createVolunteerInvitation = createServerFn({ method: "POST" })
  .validator((payload: CreateStaffInvitationPayload) => payload)
  .handler(async ({ data }) => {
    try {
      const response = await api.post<CreateStaffInvitationResponse>(
        "/v1/invitations",
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  });

/**
 * Server Function: Memperbarui peran dan/atau divisi staf
 * Endpoint: PATCH /api/v1/staff/:id
 */
export const updateVolunteerStaff = createServerFn({ method: "POST" })
  .validator((payload: UpdateStaffPayload) => payload)
  .handler(async ({ data }) => {
    try {
      const { id, ...updateFields } = data;
      const response = await api.patch<{
        status: "success" | "error";
        message: string;
        data: StaffMemberRecord;
      }>(`/v1/staff/${encodeURIComponent(id)}`, updateFields);

      // Tahan created_at dan updated_at di server function, jangan diteruskan ke browser
      return {
        ...response.data,
        data: sanitizeStaffMemberRecord(response.data.data),
      };
    } catch (error) {
      throw handleApiError(error);
    }
  });

/**
 * Server Function: Menghapus hak akses staf dan mengalihkan pengguna menjadi Hero
 * Endpoint: DELETE /api/v1/staff/:id
 */
export const deleteVolunteerStaff = createServerFn({ method: "POST" })
  .validator((params: { id: string }) => params)
  .handler(async ({ data }) => {
    try {
      const response = await api.delete<DeleteStaffResponse>(
        `/v1/staff/${encodeURIComponent(data.id)}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  });
