import * as React from "react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "#/components/shared/header";
import { Sidebar } from "#/components/shared/sidebar";

export const Route = createFileRoute("/admin/_auth")({
  component: AdminLayout,
});

/**
 * AdminLayout: Layout route terlindungi untuk dashboard admin BBJ dengan Sidebar & Header terintegrasi.
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

      {/* Area Konten Utama */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header onMenuToggle={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
