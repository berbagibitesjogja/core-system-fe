import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronDown,
  ClipboardCheck,
  FilePlus,
  FileText,
  Heart,
  Home,
  Image as ImageIcon,
  LogOut,
  Package,
  Receipt,
  Users,
  Utensils,
  Wallet,
  X,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import bbjLogoSvg from "#/assets/illustrations/bbj-logo.svg";

export interface SidebarProps {
  activePath?: string;
  userRole?: "super_admin" | "staff" | "core";
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  className?: string;
}

/**
 * Sidebar: Navigasi utama desktop & mobile drawer admin BBJ dengan pengelompokan menu (Utama, Data, Tim, Sistem).
 */
export function Sidebar({
  activePath = "/admin/dashboard",
  userRole = "super_admin",
  isMobileOpen = false,
  onCloseMobile,
  onLogout,
  className,
}: SidebarProps) {
  const [reimburseOpen, setReimburseOpen] = React.useState(false);

  // TODO: ketika integrasi api: sembunyikan grup SISTEM / Logs ketika user role bukan super admin
  const isSuperAdmin = userRole === "super_admin";

  const content = (
    <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-6">
      <div className="space-y-6">
        {/* Brand Row */}
        <div className="flex items-center justify-between px-2">
          <Link
            to="/admin/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group outline-none"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-bondi-50/70 p-1.5 transition-transform group-hover:scale-105 shrink-0">
              <img
                src={bbjLogoSvg}
                alt="Logo Berbagi Bites Jogja"
                className="size-full object-contain pointer-events-none select-none"
              />
            </div>
            <span className="font-heading-h4 text-lg font-semibold text-brand-strong tracking-tight truncate">
              Berbagi Bites Jogja
            </span>
          </Link>

          {/* Close button untuk mode mobile drawer */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Tutup menu navigasi"
              className="flex size-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 lg:hidden cursor-pointer"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5">
          {/* Kelompok: UTAMA */}
          <div className="space-y-1">
            <div className="px-3 pb-1">
              <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                UTAMA
              </span>
            </div>

            {/* Nav: Home */}
            <Link
              to="/admin/dashboard"
              onClick={onCloseMobile}
              className={cn(
                "group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                activePath === "/admin/dashboard" || activePath === "/admin"
                  ? "bg-bondi-50 text-brand-strong"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
              )}
            >
              <Home
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  activePath === "/admin/dashboard" || activePath === "/admin"
                    ? "text-brand-strong"
                    : "text-neutral-500 group-hover:text-neutral-700",
                )}
              />
              <span className="flex-1 truncate">Home</span>
            </Link>

            {/* Nav: Gallery (Segera) */}
            <div className="flex min-h-[40px] w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-neutral-400 select-none cursor-not-allowed">
              <div className="flex items-center gap-3 truncate">
                <ImageIcon className="size-5 shrink-0 text-neutral-400" />
                <span className="truncate">Gallery</span>
              </div>
              <Badge
                tone="neutral"
                styleVariant="soft"
                className="text-[10px] h-5 px-2"
              >
                Segera
              </Badge>
            </div>
          </div>

          {/* Kelompok: DATA */}
          <div className="space-y-1">
            <div className="px-3 pb-1">
              <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                DATA
              </span>
            </div>

            {/* Nav: Donasi */}
            <Link
              to="/admin/dashboard"
              onClick={onCloseMobile}
              className={cn(
                "group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                activePath === "/admin/donasi"
                  ? "bg-bondi-50 text-brand-strong"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
              )}
            >
              <Package className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
              <span className="flex-1 truncate">Donasi</span>
            </Link>

            {/* Nav: Beneficiaries */}
            <Link
              to="/admin/dashboard"
              onClick={onCloseMobile}
              className={cn(
                "group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                activePath === "/admin/beneficiaries"
                  ? "bg-bondi-50 text-brand-strong"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
              )}
            >
              <Building2 className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
              <span className="flex-1 truncate">Beneficiaries</span>
            </Link>

            {/* Nav: Heroes */}
            <Link
              to="/admin/dashboard"
              onClick={onCloseMobile}
              className={cn(
                "group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                activePath === "/admin/heroes"
                  ? "bg-bondi-50 text-brand-strong"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
              )}
            >
              <Heart className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
              <span className="flex-1 truncate">Heroes</span>
            </Link>

            {/* Nav: Partner */}
            <Link
              to="/admin/dashboard"
              onClick={onCloseMobile}
              className={cn(
                "group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                activePath === "/admin/partner"
                  ? "bg-bondi-50 text-brand-strong"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
              )}
            >
              <Utensils className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
              <span className="flex-1 truncate">Partner</span>
            </Link>
          </div>

          {/* Kelompok: TIM */}
          <div className="space-y-1">
            <div className="px-3 pb-1">
              <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                TIM
              </span>
            </div>

            {/* Nav: Reimburse (Dropdown submenu) */}
            <div>
              <button
                type="button"
                onClick={() => setReimburseOpen(!reimburseOpen)}
                className="group flex min-h-[40px] w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 transition-colors cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 truncate">
                  <Wallet className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
                  <span className="truncate">Reimburse</span>
                </div>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
                    reimburseOpen && "rotate-180",
                  )}
                />
              </button>

              {reimburseOpen && (
                <div className="mt-1 space-y-1 pl-7">
                  <Link
                    to="/admin/dashboard"
                    onClick={onCloseMobile}
                    className="flex min-h-[36px] w-full items-center gap-3 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                  >
                    <FilePlus className="size-4 shrink-0 text-neutral-400" />
                    <span>Ajukan Reimburse</span>
                  </Link>
                  <Link
                    to="/admin/dashboard"
                    onClick={onCloseMobile}
                    className="flex min-h-[36px] w-full items-center gap-3 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                  >
                    <Receipt className="size-4 shrink-0 text-neutral-400" />
                    <span>Data Reimburse</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Nav: Presensi (Segera) */}
            <div className="flex min-h-[40px] w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-neutral-400 select-none cursor-not-allowed">
              <div className="flex items-center gap-3 truncate">
                <ClipboardCheck className="size-5 shrink-0 text-neutral-400" />
                <span className="truncate">Presensi</span>
              </div>
              <Badge
                tone="neutral"
                styleVariant="soft"
                className="text-[10px] h-5 px-2"
              >
                Segera
              </Badge>
            </div>

            {/* Nav: Volunteer */}
            <Link
              to="/admin/dashboard"
              onClick={onCloseMobile}
              className={cn(
                "group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                activePath === "/admin/volunteer"
                  ? "bg-bondi-50 text-brand-strong"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
              )}
            >
              <Users className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
              <span className="flex-1 truncate">Volunteer</span>
            </Link>
          </div>

          {/* Kelompok: SISTEM (Khusus Super Admin) */}
          {/* TODO: ketika integrasi api: sembunyikan grup SISTEM / Logs ketika user role bukan super admin */}
          {isSuperAdmin && (
            <div className="space-y-1">
              <div className="px-3 pb-1">
                <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                  SISTEM
                </span>
              </div>

              <Link
                to="/admin/dashboard"
                onClick={onCloseMobile}
                className={cn(
                  "group flex min-h-[40px] w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 outline-none select-none",
                  activePath === "/admin/logs"
                    ? "bg-bondi-50 text-brand-strong"
                    : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  <FileText className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-700" />
                  <span className="truncate">Logs</span>
                </div>
                <ChevronDown className="size-4 shrink-0 text-neutral-400" />
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Footer Nav / Keluar */}
      <div className="pt-4 border-t border-neutral-100">
        <button
          type="button"
          onClick={onLogout}
          className="group flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer select-none"
        >
          <LogOut className="size-5 shrink-0 text-neutral-500 group-hover:text-red-600 transition-colors" />
          <span className="flex-1 text-left truncate">Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed 264px) */}
      <aside
        className={cn(
          "hidden lg:flex w-[264px] flex-col border-r border-neutral-200 bg-white shrink-0 h-screen sticky top-0",
          className,
        )}
      >
        {content}
      </aside>

      {/* Mobile Drawer (Overlay backdrop) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content panel */}
          <div className="relative flex w-[280px] max-w-[85vw] flex-col bg-white shadow-xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
