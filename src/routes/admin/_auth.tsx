import * as React from "react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "#/components/shared/header";
import { Sidebar } from "#/components/shared/sidebar";

export const Route = createFileRoute("/admin/_auth")({
  component: AdminLayout,
});

/**
 * AdminLayout: Layout route terlindungi untuk dashboard admin BBJ.
 * Mengikuti arsitektur Figma 112:318 di mana Sidebar berada di kiri dan
 * Header (Top Bar) berada di dalam elemen <main> tanpa background bar terpisah.
 */
function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const location = useLocation();

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
        <Header onMenuToggle={() => setMobileSidebarOpen(true)} />
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
