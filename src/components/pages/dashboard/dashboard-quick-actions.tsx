import { Link } from "@tanstack/react-router";
import { ChevronRight, Plus, Users, Wallet } from "lucide-react";
import { cn } from "#/lib/utils";

export interface DashboardQuickActionsProps {
  layout?: "vertical" | "horizontal";
  className?: string;
}

/**
 * DashboardQuickActions: Kartu daftar pintasan aksi cepat operasional BBJ.
 * Mendukung layout "vertical" (berdampingan dengan Aktivitas Terbaru - Figma 112:318)
 * dan "horizontal" (saat Aktivitas Terbaru disembunyikan/peran Staff & Core - Figma 114:643).
 */
export function DashboardQuickActions({
  layout = "vertical",
  className,
}: DashboardQuickActionsProps) {
  const isHorizontal = layout === "horizontal";

  const actions = [
    {
      title: "Tambah Donasi",
      subtitle: "Catat aksi food rescue baru",
      icon: <Plus className="size-5 text-brand" />,
      href: "/admin/dashboard",
    },
    {
      title: "Ajukan Reimburse",
      subtitle: "Klaim biaya operasional",
      icon: <Wallet className="size-5 text-brand" />,
      href: "/admin/dashboard",
    },
    {
      title: "Tambah Volunteer",
      subtitle: "Daftarkan relawan baru",
      icon: <Users className="size-5 text-brand" />,
      href: "/admin/dashboard",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs w-full",
        isHorizontal ? "w-full" : "lg:w-[352px] shrink-0",
        className,
      )}
    >
      <h4 className="font-heading-h4 text-base sm:text-lg font-semibold text-neutral-900 leading-tight mb-3">
        Aksi Cepat
      </h4>

      <div
        className={cn(
          isHorizontal
            ? "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full"
            : "space-y-3 w-full",
        )}
      >
        {actions.map((act, idx) => (
          <Link
            key={idx}
            to={act.href}
            className="group flex flex-1 items-center gap-3 rounded-md border border-neutral-200 p-3 transition-all duration-150 hover:border-brand/40 hover:bg-neutral-50/80 hover:shadow-2xs cursor-pointer select-none"
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-bondi-50 shrink-0 group-hover:scale-105 transition-transform">
              {act.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-label text-sm font-semibold text-neutral-900 truncate group-hover:text-brand transition-colors">
                {act.title}
              </p>
              <p className="font-sans text-xs text-neutral-500 truncate mt-0.5">
                {act.subtitle}
              </p>
            </div>

            <ChevronRight className="size-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
