import { Link } from "@tanstack/react-router";
import { ChevronRight, Plus, Users, Wallet } from "lucide-react";

/**
 * DashboardQuickActions: Kartu daftar pintasan aksi cepat operasional BBJ.
 */
export function DashboardQuickActions() {
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
    <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs w-full lg:w-[352px] shrink-0">
      <h4 className="font-heading-h4 text-base sm:text-lg font-semibold text-neutral-900 leading-tight mb-3">
        Aksi Cepat
      </h4>

      <div className="space-y-3">
        {actions.map((act, idx) => (
          <Link
            key={idx}
            to={act.href}
            className="group flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition-all duration-150 hover:border-brand/40 hover:bg-neutral-50/80 hover:shadow-2xs cursor-pointer select-none"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-bondi-50 shrink-0 group-hover:scale-105 transition-transform">
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
