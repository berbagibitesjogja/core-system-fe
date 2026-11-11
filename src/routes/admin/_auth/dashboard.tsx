import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  DashboardWelcomeBanner,
  DashboardImpactStats,
  DashboardChartsRow,
  DashboardActivityCard,
  DashboardQuickActions,
  DashboardSkeleton,
} from "#/components/pages/dashboard";

export const Route = createFileRoute("/admin/_auth/dashboard")({
  component: DashboardPage,
});

/**
 * DashboardPage: Halaman dashboard utama administrator Berbagi Bites Jogja (BBJ).
 * Mengimplementasikan State Super Admin (Figma 112:318) dan State Loading (Figma 114:835).
 */
function DashboardPage() {
  // State switcher untuk simulasi/verifikasi tampilan antara Loading State & Data Normal
  const [isLoading, setIsLoading] = React.useState(false);

  // TODO: ketika integrasi api: ambil data sesi user, jika userRole !== "super_admin",
  // sembunyikan komponen DashboardActivityCard (khusus Super Admin) sesuai spesifikasi Figma 114:501.
  const [userRole] = React.useState<"super_admin" | "staff">("super_admin");
  const isSuperAdmin = userRole === "super_admin";

  return (
    <div className="space-y-6 mx-auto p-4 sm:p-6 lg:p-8">
      {/* Pengalih Cepat State (Hanya untuk preview & verifikasi pengembang) */}
      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
        <span className="font-label text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Tampilan Dashboard Admin
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLoading(false)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
              !isLoading
                ? "bg-brand text-white shadow-2xs"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            Super Admin
          </button>
          <button
            type="button"
            onClick={() => setIsLoading(true)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
              isLoading
                ? "bg-brand text-white shadow-2xs"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            Loading Skeleton
          </button>
        </div>
      </div>

      {isLoading ? (
        /* State 2: Dashboard Loading Skeleton (Figma 114:835) */
        <DashboardSkeleton />
      ) : (
        /* State 1: Dashboard Super Admin Normal (Figma 112:318) */
        <div className="space-y-6">
          {/* 1. Welcome Greeting Banner */}
          <DashboardWelcomeBanner userName="Dian" />

          {/* 2. Baris Metrik Dampak Kami */}
          <DashboardImpactStats />

          {/* 3. Baris Grafik Interaktif (Heroes & Food Stats) */}
          <DashboardChartsRow />

          {/* 4. Baris Aktivitas Terbaru & Aksi Cepat */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* TODO: ketika integrasi api: sembunyikan kartu Aktivitas Terbaru jika role bukan super admin (Staff & Core) */}
            {isSuperAdmin && (
              <DashboardActivityCard className="w-full lg:flex-1" />
            )}

            {/* Aksi Cepat (Pintasan Tambah Donasi, Ajukan Reimburse, dsb.) */}
            <DashboardQuickActions />
          </div>
        </div>
      )}
    </div>
  );
}
