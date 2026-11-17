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

api.interceptors.request.use((config) => {
  // Selaraskan baseURL dengan runtime terkini
  config.baseURL = getApiBaseUrl();

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

      // Otomatis rotasi token jika mendapatkan respons 401
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

            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
            return api(originalRequest);
          }
        } catch {
          // Bersihkan cookie sesi jika rotasi token gagal
          try {
            deleteCookie("token", { path: "/" });
            deleteCookie("refresh_token", { path: "/" });
            deleteCookie("user", { path: "/" });
          } catch {
            // Abaikan jika konteks respons tidak tersedia
          }
        }
      }

      // Bersihkan sesi jika status 401 pada permintaan selain login
      if (status === 401 && !url.includes("/v1/auth/login")) {
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
