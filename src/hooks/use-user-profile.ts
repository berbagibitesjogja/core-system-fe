import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getUserProfile } from "#/services/authService";
import type { AuthUser } from "#/services/authService";

export type User = AuthUser;
export type SidebarRole = "super_admin" | "core" | "staff";
export type { AuthUser };

/**
 * useUserProfile: Custom React Hook untuk mengambil dan mengelola profil pengguna aktif.
 * Menyediakan initialData dari localStorage/cookie untuk performa instan tanpa loading flicker,
 * serta helper peran (role), nama, dan divisi yang siap pakai di seluruh komponen/halaman.
 */
export function useUserProfile() {
  const getUserProfileFn = useServerFn(getUserProfile);

  const query = useQuery<AuthUser | null>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const data = await getUserProfileFn();
      if (typeof window !== "undefined") {
        if (data) {
          localStorage.setItem("bbj_user", JSON.stringify(data));
        } else {
          localStorage.removeItem("bbj_user");
          localStorage.removeItem("user");
        }
      }
      return data;
    },
    initialData: () => {
      try {
        if (typeof window === "undefined") return undefined;
        const stored =
          localStorage.getItem("bbj_user") || localStorage.getItem("user");
        if (stored) return JSON.parse(stored) as AuthUser;

        // Fallback membaca cookie jika localStorage belum terisi
        const match = document.cookie.match(/(?:^|; )user=([^;]*)/);
        if (match?.[1]) {
          return JSON.parse(decodeURIComponent(match[1])) as AuthUser;
        }
        return undefined;
      } catch {
        return undefined;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache valid selama 5 menit
  });

  const user = query.data ?? null;

  const sidebarRole: SidebarRole =
    user?.role === "super"
      ? "super_admin"
      : user?.role === "core"
        ? "core"
        : "staff";

  return {
    ...query,
    user,
    isAuthenticated: Boolean(user),
    name: user?.name ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phone_number ?? "",
    role: user?.role,
    roleLabel:
      user?.role === "super"
        ? "Super Admin"
        : user?.role === "core"
          ? "Core Staff"
          : "Staff",
    sidebarRole,
    isStaff: Boolean(user?.is_staff),
    isSuperAdmin: user?.role === "super",
    isCore: user?.role === "core",
    isRegularStaff: user?.role === "staff",
    isOperational:
      user?.role === "super" || user?.division_name === "Operasional",
    isHero: Boolean(user?.is_hero),
    divisionId: user?.division_id,
    divisionName: user?.division_name ?? "",
  };
}
