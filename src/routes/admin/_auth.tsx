import * as React from "react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "#/components/shared/header";
import type { HeaderProps } from "#/components/shared/header";
import { Sidebar } from "#/components/shared/sidebar";

export interface AdminLayoutContextType {
  setHeaderOverride: (props: Partial<HeaderProps> | null) => void;
}

export const AdminLayoutContext =
  React.createContext<AdminLayoutContextType | null>(null);

export function useAdminLayout(): AdminLayoutContextType | null {
  return React.useContext(AdminLayoutContext);
}

export const Route = createFileRoute("/admin/_auth")({
  component: AdminLayout,
});

const routeTitles: Partial<Record<string, string>> = {
  "/admin/dashboard": "Dashboard",
  "/admin": "Dashboard",
  "/admin/": "Dashboard",
  "/admin/donation": "Donasi",
  "/admin/donation/add": "Tambah Donasi",
  "/admin/donation/edit": "Edit Donasi",
  "/admin/donation/detail": "Detail Donasi",
  "/admin/beneficiary": "Beneficiaries",
  "/admin/beneficiary/add": "Tambah Beneficiary",
  "/admin/beneficiary/edit": "Edit Beneficiary",
  "/admin/beneficiary/detail": "Detail Beneficiary",
  "/admin/hero": "Heroes",
  "/admin/hero/detail": "Detail Hero",
  "/admin/partner": "Partner",
  "/admin/reimburse/request": "Ajukan Reimburse",
  "/admin/reimburse/data": "Data Reimburse",
  "/admin/volunteer": "Volunteer",
  "/admin/profile": "Profil Pengguna",
  "/admin/logs": "Logs Sistem",
};

const routeSubtitles: Partial<Record<string, string>> = {
  "/admin/donation": "Kelola aksi food rescue dan CSR beserta kuota heroes-nya",
  "/admin/donation/add": "Buat aksi food rescue baru",
  "/admin/donation/edit": "Perbarui informasi aksi donasi",
  "/admin/donation/detail":
    "Pantau daftar heroes, surplus food, dan ringkasan aksi",
  "/admin/beneficiary":
    "Kelompok penerima manfaat dan dampak yang mereka terima",
  "/admin/beneficiary/add": "Daftarkan penerima manfaat baru",
  "/admin/beneficiary/edit": "Perbarui data penerima manfaat",
  "/admin/beneficiary/detail": "Riwayat donasi dan persebaran penerima manfaat",
  "/admin/hero":
    "Penerima makanan yang terdaftar beserta riwayat pengambilannya",
  "/admin/hero/detail": "Riwayat pengambilan donasi dan informasi hero",
  "/admin/partner": "Mitra penyumbang makanan dan kontribusinya untuk BBJ",
};

/**
 * AdminLayout: Layout route terlindungi untuk dashboard admin BBJ.
 * Mengikuti arsitektur Figma 112:318 di mana Sidebar berada di kiri dan
 * Header (Top Bar) berada di dalam elemen <main> tanpa background bar terpisah.
 */
function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [headerOverride, setHeaderOverride] =
    React.useState<Partial<HeaderProps> | null>(null);
  const location = useLocation();

  const currentTitle =
    headerOverride?.title ?? routeTitles[location.pathname] ?? "Dashboard";
  const currentSubtitle =
    headerOverride?.subtitle ?? routeSubtitles[location.pathname];

  // Memoize context value agar tidak memicu infinite render loop pada child routes
  const contextValue = React.useMemo<AdminLayoutContextType>(
    () => ({ setHeaderOverride }),
    [],
  );

  return (
    <div className="flex min-h-screen bg-canvas font-sans antialiased text-neutral-900">
      {/* Sidebar Navigasi Admin (Desktop Sticky + Mobile Drawer) */}
      <Sidebar
        activePath={location.pathname}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onLogout={() => {
          // TODO: integrasi aksi logout dengan session / auth service
          window.location.href = "/admin/login";
        }}
      />

      {/* Area Konten Utama: Main Container dengan Top Bar Header di dalamnya */}
      <main className="flex-1 flex flex-col min-w-0 px-4 py-6 sm:px-6 md:px-8 gap-6 overflow-x-hidden">
        {/* Header di dalam main tanpa background sesuai Figma 112:522 */}
        <Header
          title={currentTitle}
          subtitle={currentSubtitle}
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
