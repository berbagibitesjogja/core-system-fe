import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";
import { handleApiError } from "./errorService";

/**
 * Tipe data divisi organisasi dari Backend API (core-system /api/v1/divisions)
 */
export interface DivisionItem {
  id: number;
  name: string;
}

export interface DivisionListResponse {
  status: "success" | "error" | string;
  message: string;
  data: DivisionItem[];
}

/**
 * Server Function: Mengambil seluruh daftar divisi aktif yang terurut secara ascending (id ASC)
 * Endpoint: GET /api/v1/divisions
 * Hak Akses: Staf BBJ (super, core, staff)
 */
export const getDivisions = createServerFn({ method: "GET" }).handler(
  async (): Promise<DivisionListResponse> => {
    try {
      const response = await api.get<DivisionListResponse>("/v1/divisions");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
);
