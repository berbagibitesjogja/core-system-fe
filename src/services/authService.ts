import { createServerFn } from "@tanstack/react-start";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { api, getOrRotateToken } from "./api";
import { parseJwt } from "#/lib/jwt";
import { handleApiError } from "./errorService";
import { env } from "#/env";
import { idAuth } from "#/locales";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  role?: "super" | "core" | "staff" | string;
  division_id?: number;
  division_name?: string;
  is_hero: boolean;
  email_verified_at?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: AuthUser;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: AuthTokenData;
}

export interface RefreshPayload {
  refresh_token?: string;
}

export interface RefreshTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RefreshResponse {
  status: string;
  message: string;
  data: RefreshTokenData;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isStaff: boolean;
}

// Autentikasi pengguna menggunakan email dan kata sandi
export const loginWithPassword = createServerFn({ method: "POST" })
  .validator((data: LoginPayload) => {
    if (!data.email || !data.password) {
      throw new Error(idAuth.validation.credentialsRequired);
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const response = await api.post<LoginResponse>("/v1/auth/login", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      const responseData = response.data.data;

      // Simpan cookie sesi autentikasi
      setCookie("token", responseData.access_token, {
        httpOnly: true,
        secure: env.VITE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("refresh_token", responseData.refresh_token, {
        httpOnly: true,
        secure: env.VITE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("user", JSON.stringify(responseData.user), {
        httpOnly: false,
        secure: env.VITE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  });

// Memperbarui token akses dengan rotasi refresh token
export const refreshSession = createServerFn({ method: "POST" })
  .validator((data?: RefreshPayload) => data)
  .handler(async ({ data }) => {
    try {
      const tokenToRefresh = data?.refresh_token || getCookie("refresh_token");

      if (!tokenToRefresh) {
        throw new Error(idAuth.validation.refreshTokenMissing);
      }

      const response = await api.post<RefreshResponse>("/v1/auth/refresh", {
        refresh_token: tokenToRefresh,
      });

      const responseData = response.data.data;

      // Simpan token baru hasil rotasi ke cookie sesi
      setCookie("token", responseData.access_token, {
        httpOnly: true,
        secure: env.VITE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("refresh_token", responseData.refresh_token, {
        httpOnly: true,
        secure: env.VITE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response.data;
    } catch (error) {
      deleteCookie("token", { path: "/" });
      deleteCookie("refresh_token", { path: "/" });
      deleteCookie("user", { path: "/" });

      return handleApiError(error);
    }
  });

/**
 * Memeriksa apakah token JWT sudah kedaluwarsa atau hampir kedaluwarsa (< 60 detik) berdasarkan klaim "exp".
 */
export function isJwtExpired(token: string): boolean {
  try {
    const payload = parseJwt(token);
    if (!payload?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    // Beri batas toleransi 60 detik sebelum kedaluwarsa sebenarnya (standar proaktif Bruno)
    return payload.exp - now < 60;
  } catch {
    return true;
  }
}

// Mengambil sesi pengguna saat ini dari cookie dengan auto-refresh
export const getAuthSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<AuthSession> => {
    try {
      let token = getCookie("token");
      const refreshToken = getCookie("refresh_token");
      const userJson = getCookie("user");

      if (!userJson) {
        return {
          isAuthenticated: false,
          user: null,
          isStaff: false,
        };
      }

      // Jika token akses tidak ada ATAU sudah kedaluwarsa, lakukan rotasi proaktif jika ada refresh_token
      const shouldRefresh =
        (!token || isJwtExpired(token)) && Boolean(refreshToken);

      if (shouldRefresh && refreshToken) {
        try {
          const newAccessToken = await getOrRotateToken(refreshToken);

          if (newAccessToken) {
            token = newAccessToken;
          } else {
            // Refresh token tidak valid lagi di backend
            deleteCookie("token", { path: "/" });
            deleteCookie("refresh_token", { path: "/" });
            deleteCookie("user", { path: "/" });

            return {
              isAuthenticated: false,
              user: null,
              isStaff: false,
            };
          }
        } catch {
          deleteCookie("token", { path: "/" });
          deleteCookie("refresh_token", { path: "/" });
          deleteCookie("user", { path: "/" });

          return {
            isAuthenticated: false,
            user: null,
            isStaff: false,
          };
        }
      }

      if (!token) {
        return {
          isAuthenticated: false,
          user: null,
          isStaff: false,
        };
      }

      const user = JSON.parse(userJson) as AuthUser;
      return {
        isAuthenticated: true,
        user,
        isStaff: Boolean(user.is_staff),
      };
    } catch {
      return {
        isAuthenticated: false,
        user: null,
        isStaff: false,
      };
    }
  },
);

// Mengambil profil pengguna terautentikasi saat ini
export const getUserProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<AuthUser | null> => {
    const session = await getAuthSession();
    return session.user;
  },
);

// Keluar dari sesi dan membersihkan cookie
export const logout = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const refreshToken = getCookie("refresh_token");
    if (refreshToken) {
      try {
        await api.post("/v1/auth/logout", { refresh_token: refreshToken });
      } catch {
        // Abaikan jika token sudah tidak valid di backend
      }
    }
  } finally {
    deleteCookie("token", { path: "/" });
    deleteCookie("refresh_token", { path: "/" });
    deleteCookie("user", { path: "/" });
  }

  return { success: true };
});
