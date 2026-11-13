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
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import bbjLogoSvg from "#/assets/illustrations/bbj-logo.svg";
import { NavItem } from "./nav-item";

export interface SidebarSubItem {
  id: string;
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarItemConfig {
  id: string;
  label: string;
  to?: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  badge?: string;
  hasChildren?: boolean;
  children?: SidebarSubItem[];
  exactMatch?: boolean;
}

export interface SidebarGroupConfig {
  id: string;
  title: string;
  requiredRole?: "super_admin" | "staff" | "core";
  items: SidebarItemConfig[];
}

export const defaultSidebarGroups: SidebarGroupConfig[] = [
  {
    id: "utama",
    title: "UTAMA",
    items: [
      {
        id: "home",
        label: "Home",
        to: "/admin/dashboard",
        icon: Home,
        exactMatch: true,
      },
      {
        id: "gallery",
        label: "Gallery",
        icon: ImageIcon,
        disabled: true,
        badge: "Segera",
      },
    ],
  },
  {
    id: "data",
    title: "DATA",
    items: [
      {
        id: "donation",
        label: "Donasi",
        to: "/admin/donation",
        icon: Package,
      },
      {
        id: "beneficiary",
        label: "Beneficiaries",
        to: "/admin/beneficiary",
        icon: Building,
      },
      {
        id: "hero",
        label: "Heroes",
        to: "/admin/hero",
        icon: Heart,
      },
      {
        id: "partner",
        label: "Partner",
        to: "/admin/partner",
        icon: Utensils,
      },
    ],
  },
  {
    id: "tim",
    title: "TIM",
    items: [
      {
        id: "reimburse-request",
        label: "Ajukan Reimburse",
        to: "/admin/reimburse/request",
        icon: Upload,
      },
      {
        id: "reimburse-data",
        label: "Data Reimburse",
        to: "/admin/reimburse/data",
        icon: ClipboardCheck,
      },
      {
        id: "presensi",
        label: "Presensi",
        icon: MapPin,
        disabled: true,
        badge: "Segera",
      },
      {
        id: "volunteer",
        label: "Volunteer",
        to: "/admin/volunteer",
        icon: Users,
      },
    ],
  },
  {
    id: "sistem",
    title: "SISTEM",
    requiredRole: "super_admin",
    items: [
      {
        id: "logs",
        label: "Logs",
        to: "/admin/logs",
        icon: FileText,
        hasChildren: true,
      },
    ],
  },
];

export interface SidebarProps {
  activePath?: string;
  userRole?: "super_admin" | "staff" | "core";
  groups?: SidebarGroupConfig[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  className?: string;
}

/**
 * Sidebar: Navigasi utama admin BBJ (Figma 112:319) dengan sudut rounded-md (12px)
 * dan data modular terpisah yang dirender otomatis.
 */
export function Sidebar({
  activePath = "/admin/dashboard",
  userRole = "super_admin",
  groups = defaultSidebarGroups,
  isMobileOpen = false,
  onCloseMobile,
  onLogout,
  className,
}: SidebarProps) {
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    {},
  );

  // Sinkronkan status dropdown jika custom sidebar groups masih memakai submenu
  React.useEffect(() => {
    const activeParentIds: Record<string, boolean> = {};
    for (const group of groups) {
      for (const item of group.items) {
        if (
          item.children?.some(
            (child) =>
              activePath === child.to || activePath.startsWith(child.to),
          )
        ) {
          activeParentIds[item.id] = true;
        }
      }
    }
    if (Object.keys(activeParentIds).length > 0) {
      setOpenGroups((prev) => ({ ...prev, ...activeParentIds }));
    }
  }, [activePath, groups]);

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
          {groups
            .filter(
              (group) =>
                !group.requiredRole ||
                (group.requiredRole === "super_admin" && isSuperAdmin),
            )
            .map((group) => (
              <div key={group.id} className="space-y-1">
                <div className="px-3 pb-1">
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.66px] text-neutral-500">
                    {group.title}
                  </span>
                </div>

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isItemActive = item.to
                    ? item.exactMatch
                      ? activePath === item.to ||
                        activePath === "/admin" ||
                        activePath === "/admin/"
                      : activePath === item.to || activePath.startsWith(item.to)
                    : false;

                  if (item.children) {
                    const isParentActive = Boolean(
                      item.children.some(
                        (child) =>
                          activePath === child.to ||
                          activePath.startsWith(child.to),
                      ),
                    );
                    const isGroupOpen = Boolean(openGroups[item.id]);

                    return (
                      <div key={item.id}>
                        <NavItem
                          label={item.label}
                          icon={<Icon className="size-5" />}
                          hasChildren
                          isOpen={isGroupOpen}
                          isActive={isParentActive}
                          onClick={() =>
                            setOpenGroups((prev) => ({
                              ...prev,
                              [item.id]: !isGroupOpen,
                            }))
                          }
                        />

                        {isGroupOpen && (
                          <div className="mt-1 space-y-1 pl-7">
                            {item.children.map((child) => {
                              const ChildIcon = child.icon;
                              const isChildActive = activePath === child.to;

                              return (
                                <NavItem
                                  key={child.id}
                                  to={child.to}
                                  onClick={onCloseMobile}
                                  label={child.label}
                                  icon={<ChildIcon className="size-5" />}
                                  isActive={isChildActive}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavItem
                      key={item.id}
                      to={item.to}
                      onClick={onCloseMobile}
                      label={item.label}
                      icon={<Icon className="size-5" />}
                      isActive={isItemActive}
                      disabled={item.disabled}
                      hasChildren={item.hasChildren}
                      badge={
                        item.badge ? (
                          <Badge
                            tone="neutral"
                            styleVariant="soft"
                            className="text-[10px] h-5 px-2"
                          >
                            {item.badge}
                          </Badge>
                        ) : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
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
