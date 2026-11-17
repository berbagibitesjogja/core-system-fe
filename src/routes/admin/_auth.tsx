import * as React from "react";
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AdminLayoutContext } from "#/components/shared/admin-layout-context";
import type { AdminLayoutContextType } from "#/components/shared/admin-layout-context";
import { Header } from "#/components/shared/header";
import type { HeaderProps } from "#/components/shared/header";
import { Sidebar } from "#/components/shared/sidebar";
import type { SidebarProps } from "#/components/shared/sidebar";
import { toast } from "#/components/ui/toast";
import { useUserProfile } from "#/hooks";
import { idAuth, idNavigation } from "#/locales";
import { getAuthSession, logout } from "#/services/authService";

export {
  AdminLayoutContext,
  useAdminLayout,
  type AdminLayoutContextType,
} from "#/components/shared/admin-layout-context";

export const Route = createFileRoute("/admin/_auth")({
  beforeLoad: async ({ location }) => {
    // Validasi sesi staf aktif sebelum merender rute terlindungi
    const session = await getAuthSession();
    if (!session.isAuthenticated || !session.isStaff || !session.user) {
      throw redirect({
        to: "/admin/login",
        search: {
          redirect: location.href,
        },
      });
    }
    return {
      authUser: session.user,
    };
  },
  component: AdminLayout,
});

/**
 * AdminLayout: Layout route terlindungi untuk dashboard admin BBJ.
 * Mengikuti arsitektur Figma 112:318 di mana Sidebar berada di kiri dan
 * Header (Top Bar) berada di dalam elemen <main> tanpa background bar terpisah.
 */
function AdminLayout() {
  const { authUser } = Route.useRouteContext();
  const profile = useUserProfile();
  const navigate = useNavigate();
  const logoutFn = useServerFn(logout);

  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [headerOverride, setHeaderOverride] =
    React.useState<Partial<HeaderProps> | null>(null);
  const [sidebarUserRole, setSidebarUserRole] = React.useState<
    SidebarProps["userRole"] | null
  >(null);
  const location = useLocation();

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("bbj_user");
      localStorage.removeItem("user");
    }
    await logoutFn();
    toast.success(idAuth.login.toasts.logoutSuccess);
    navigate({ to: "/admin/login" });
  };

  const effectiveRole: SidebarProps["userRole"] =
    sidebarUserRole ?? profile.sidebarRole;

  const currentTitle =
    headerOverride?.title ??
    idNavigation.routeTitles[location.pathname] ??
    idNavigation.defaultTitle;
  const currentSubtitle =
    headerOverride?.subtitle ?? idNavigation.routeSubtitles[location.pathname];

  // Memoize context value agar tidak memicu infinite render loop pada child routes
  const contextValue = React.useMemo<AdminLayoutContextType>(
    () => ({ setHeaderOverride, setSidebarUserRole }),
    [],
  );

  const isProfileRoute = location.pathname === "/admin/profile";
  const mergedHeaderUser = React.useMemo(
    () => ({
      name: profile.name || authUser.name,
      role: profile.roleLabel,
      division: profile.divisionName || authUser.division_name,
      email: profile.email || authUser.email,
      isActive: isProfileRoute,
      onLogout: handleLogout,
      ...headerOverride?.user,
    }),
    [
      profile.name,
      profile.roleLabel,
      profile.divisionName,
      profile.email,
      authUser.name,
      authUser.division_name,
      authUser.email,
      isProfileRoute,
      headerOverride?.user,
    ],
  );

  return (
    <div className="flex min-h-screen bg-canvas font-sans antialiased text-neutral-900">
      {/* Sidebar Navigasi Admin (Desktop Sticky + Mobile Drawer) */}
      <Sidebar
        activePath={location.pathname}
        userRole={effectiveRole}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Area Konten Utama: Main Container dengan Top Bar Header di dalamnya */}
      <main className="flex-1 flex flex-col min-w-0 px-4 py-6 sm:px-6 md:px-8 gap-6 overflow-x-hidden">
        {/* Header di dalam main tanpa background sesuai Figma 112:522 */}
        <Header
          title={currentTitle}
          subtitle={currentSubtitle}
          avatar={headerOverride?.avatar}
          user={mergedHeaderUser}
          onMenuToggle={() => setMobileSidebarOpen(true)}
          onBack={headerOverride?.onBack}
          backHref={headerOverride?.backHref}
          backLabel={headerOverride?.backLabel}
          actions={headerOverride?.actions}
        />
        <AdminLayoutContext.Provider value={contextValue}>
          <div className="flex-1 w-full">
            <Outlet />
          </div>
        </AdminLayoutContext.Provider>
      </main>
    </div>
  );
}
