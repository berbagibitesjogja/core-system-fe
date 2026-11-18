import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import {
  deleteCookie,
  getRequest,
  setCookie,
} from "@tanstack/react-start/server";
import { parseCookie } from "cookie";
import { env } from "#/env";

export function getApiBaseUrl(): string {
  // Jika di lingkungan server, utamakan SERVER_URL dari runtime env
  const serverRuntimeUrl =
    typeof process !== "undefined" ? process.env.SERVER_URL : undefined;

  const baseUrl = serverRuntimeUrl ?? env.SERVER_URL;
  const rawBaseUrl = baseUrl.replace(/\/+$/, "");
  return rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined && v !== null && v !== "") {
              searchParams.append(`${key}[]`, String(v));
            }
          });
        } else if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  },
});

// Peta antrean promise rotasi token untuk mencegah race condition (rotasi ganda di waktu bersamaan)
const pendingRefreshMap = new Map<string, Promise<string | null>>();

/**
 * Melakukan rotasi refresh token secara aman dengan deduplikasi promise konkurensi.
 */
export async function getOrRotateToken(
  refreshToken: string,
): Promise<string | null> {
  const existingPromise = pendingRefreshMap.get(refreshToken);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = (async () => {
    try {
      const refreshResponse = await axios.post<{
        status: string;
        message: string;
        data: {
          access_token: string;
          refresh_token: string;
          expires_in: number;
        };
      }>(
        `${getApiBaseUrl()}/v1/auth/refresh`,
        { refresh_token: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        },
      );

      const newTokens = refreshResponse.data.data;

      // Simpan token baru hasil rotasi ke cookie sesi
      try {
        setCookie("token", newTokens.access_token, {
          httpOnly: true,
          secure: env.VITE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        setCookie("refresh_token", newTokens.refresh_token, {
          httpOnly: true,
          secure: env.VITE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      } catch {
        // Abaikan jika konteks respons tidak tersedia
      }

      return newTokens.access_token;
    } catch {
      return null;
    } finally {
      pendingRefreshMap.delete(refreshToken);
    }
  })();

  pendingRefreshMap.set(refreshToken, promise);
  return promise;
}

api.interceptors.request.use((config) => {
  // Selaraskan baseURL dengan runtime terkini
  config.baseURL = getApiBaseUrl();

  // Jika Authorization sudah ditentukan secara eksplisit (misal dari retry rotasi token baru),
  // jangan timpa dengan token lama dari cookie!
  if (!config.headers.Authorization) {
    try {
      const request = getRequest();
      const cookieHeader = request.headers.get("cookie") ?? "";
      const cookies = parseCookie(cookieHeader);
      const token = cookies.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Konteks permintaan tidak tersedia
    }
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as
        (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
      const status = error.response?.status;
      const url = originalRequest?.url ?? "";

      const isAuthUrl =
        url.includes("/v1/auth/login") || url.includes("/v1/auth/refresh");

      // Otomatis rotasi token jika mendapatkan respons 401 pada percobaan pertama
      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isAuthUrl
      ) {
        originalRequest._retry = true;

        try {
          const request = getRequest();
          const cookieHeader = request.headers.get("cookie") ?? "";
          const cookies = parseCookie(cookieHeader);
          const refreshToken = cookies.refresh_token;

          if (refreshToken) {
            const newAccessToken = await getOrRotateToken(refreshToken);

            if (newAccessToken) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
          }
        } catch {
          // Gagal memproses rotasi token
        }

        // Jika rotasi token gagal (refresh token sudah kedaluwarsa atau tidak valid), bersihkan sesi
        try {
          deleteCookie("token", { path: "/" });
          deleteCookie("refresh_token", { path: "/" });
          deleteCookie("user", { path: "/" });
        } catch {
          // Abaikan jika konteks respons tidak tersedia
        }
      } else if (status === 401 && !url.includes("/v1/auth/login")) {
        // Jika request retry pun tetap 401, bersihkan sesi
        try {
          deleteCookie("token", { path: "/" });
          deleteCookie("refresh_token", { path: "/" });
          deleteCookie("user", { path: "/" });
        } catch {
          // Abaikan jika konteks respons tidak tersedia
        }
      }

      if (error.code === "ECONNABORTED") {
        console.warn("Request timed out (30s limit exceeded)");
      }
    }

    return Promise.reject(error);
  },
);
