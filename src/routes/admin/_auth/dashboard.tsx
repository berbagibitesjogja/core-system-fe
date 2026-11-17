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
  const { authUser } = Route.useRouteContext();

  // Loading aktif selama 3 detik setiap kali berpindah atau membuka halaman ini
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isSuperAdmin = authUser.role === "super";

  return (
    <div className="space-y-6 w-full">
      {isLoading ? (
        /* State 2: Dashboard Loading Skeleton (Figma 114:835) */
        <DashboardSkeleton isSuperAdmin={isSuperAdmin} />
      ) : (
        /* State 1: Dashboard Super Admin Normal (Figma 112:318) */
        <div className="space-y-6">
          {/* 1. Welcome Greeting Banner */}
          <DashboardWelcomeBanner userName={authUser.name} />

          {/* 2. Baris Metrik Dampak Kami */}
          <DashboardImpactStats />

          {/* 3. Baris Grafik Interaktif (Heroes & Food Stats) */}
          <DashboardChartsRow />

          {/* 4. Baris Aktivitas Terbaru & Aksi Cepat */}
          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            {isSuperAdmin && (
              <DashboardActivityCard className="w-full lg:flex-1" />
            )}

            {/* Aksi Cepat (Pintasan Tambah Donasi, Ajukan Reimburse, dsb.) */}
            <DashboardQuickActions
              layout={isSuperAdmin ? "vertical" : "horizontal"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
