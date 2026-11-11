import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Building,
  ClipboardCheck,
  FileText,
  Heart,
  Home,
  Image as ImageIcon,
  LogOut,
  MapPin,
  Package,
  Upload,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import bbjLogoSvg from "#/assets/illustrations/bbj-logo.svg";
import { NavItem } from "./nav-item";

export interface SidebarProps {
  activePath?: string;
  userRole?: "super_admin" | "staff" | "core";
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  className?: string;
}

/**
 * Sidebar: Navigasi utama admin BBJ (Figma 112:319) dengan sudut rounded-md (12px)
 * dan icon Lucide resmi sesuai spesifikasi desain.
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
        <div className="flex items-center px-2">
          <Link
            to="/admin/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group outline-none"
          >
            <div className="flex size-11 items-center justify-center rounded-md bg-bondi-50/70 p-1.5 transition-transform group-hover:scale-105 shrink-0">
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

            {/* Nav: Home (Lucide: Home) */}
            <NavItem
              to="/admin/dashboard"
              onClick={onCloseMobile}
              label="Home"
              icon={<Home className="size-5" />}
              isActive={
                activePath === "/admin/dashboard" || activePath === "/admin"
              }
            />

            {/* Nav: Gallery (Lucide: Image) */}
            <NavItem
              label="Gallery"
              icon={<ImageIcon className="size-5" />}
              disabled
              badge={
                <Badge
                  tone="neutral"
                  styleVariant="soft"
                  className="text-[10px] h-5 px-2"
                >
                  Segera
                </Badge>
              }
            />
          </div>

          {/* Kelompok: DATA */}
          <div className="space-y-1">
            <div className="px-3 pb-1">
              <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                DATA
              </span>
            </div>

            {/* Nav: Donasi (Lucide: Package) */}
            <NavItem
              to="/admin/dashboard"
              onClick={onCloseMobile}
              label="Donasi"
              icon={<Package className="size-5" />}
              isActive={activePath === "/admin/donasi"}
            />

            {/* Nav: Beneficiaries (Lucide: Building) */}
            <NavItem
              to="/admin/dashboard"
              onClick={onCloseMobile}
              label="Beneficiaries"
              icon={<Building className="size-5" />}
              isActive={activePath === "/admin/beneficiaries"}
            />

            {/* Nav: Heroes (Lucide: Heart) */}
            <NavItem
              to="/admin/dashboard"
              onClick={onCloseMobile}
              label="Heroes"
              icon={<Heart className="size-5" />}
              isActive={activePath === "/admin/heroes"}
            />

            {/* Nav: Partner (Lucide: Utensils) */}
            <NavItem
              to="/admin/dashboard"
              onClick={onCloseMobile}
              label="Partner"
              icon={<Utensils className="size-5" />}
              isActive={activePath === "/admin/partner"}
            />
          </div>

          {/* Kelompok: TIM */}
          <div className="space-y-1">
            <div className="px-3 pb-1">
              <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                TIM
              </span>
            </div>

            {/* Nav: Reimburse (Lucide: Wallet) */}
            <div>
              <NavItem
                label="Reimburse"
                icon={<Wallet className="size-5" />}
                hasChildren
                isOpen={reimburseOpen}
                onClick={() => setReimburseOpen(!reimburseOpen)}
              />

              {/* Submenu Reimburse (pl-7) */}
              {reimburseOpen && (
                <div className="mt-1 space-y-1 pl-7">
                  {/* Ajukan Reimburse (Lucide: Upload) */}
                  <NavItem
                    to="/admin/dashboard"
                    onClick={onCloseMobile}
                    label="Ajukan Reimburse"
                    icon={<Upload className="size-5" />}
                  />

                  {/* Data Reimburse (Lucide: ClipboardCheck) */}
                  <NavItem
                    to="/admin/dashboard"
                    onClick={onCloseMobile}
                    label="Data Reimburse"
                    icon={<ClipboardCheck className="size-5" />}
                  />
                </div>
              )}
            </div>

            {/* Nav: Presensi (Lucide: MapPin) */}
            <NavItem
              label="Presensi"
              icon={<MapPin className="size-5" />}
              disabled
              badge={
                <Badge
                  tone="neutral"
                  styleVariant="soft"
                  className="text-[10px] h-5 px-2"
                >
                  Segera
                </Badge>
              }
            />

            {/* Nav: Volunteer (Lucide: Users) */}
            <NavItem
              to="/admin/dashboard"
              onClick={onCloseMobile}
              label="Volunteer"
              icon={<Users className="size-5" />}
              isActive={activePath === "/admin/volunteer"}
            />
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

              {/* Nav: Logs (Lucide: FileText) */}
              <NavItem
                to="/admin/dashboard"
                onClick={onCloseMobile}
                label="Logs"
                icon={<FileText className="size-5" />}
                hasChildren
                isActive={activePath === "/admin/logs"}
              />
            </div>
          )}
        </nav>
      </div>

      {/* Footer Nav / Keluar (Lucide: LogOut) */}
      <div className="pt-4 border-t border-neutral-100">
        <NavItem
          label="Keluar"
          icon={<LogOut className="size-5" />}
          variant="danger"
          onClick={onLogout}
        />
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
