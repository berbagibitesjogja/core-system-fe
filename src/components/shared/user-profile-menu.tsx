import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Menu, MenuItem } from "#/components/ui/menu";
import { getPresetAvatarSrc } from "#/lib/avatars";
import { cn } from "#/lib/utils";

export interface UserProfileMenuItemConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
  isDanger?: boolean;
  action?: "logout" | "navigation" | "custom";
}

export const defaultProfileMenuItems: UserProfileMenuItemConfig[] = [
  {
    id: "profile",
    label: "Lihat Profil",
    icon: User,
    to: "/admin/profile",
    action: "navigation",
  },
  {
    id: "settings",
    label: "Pengaturan Akun",
    icon: Settings,
    to: "/admin/profile",
    action: "navigation",
  },
  {
    id: "help",
    label: "Pusat Bantuan",
    icon: HelpCircle,
    action: "custom",
  },
  {
    id: "logout",
    label: "Keluar",
    icon: LogOut,
    isDanger: true,
    action: "logout",
  },
];

export interface UserProfileMenuProps {
  name?: string;
  role?: string;
  division?: string;
  avatarSrc?: string;
  initials?: string;
  email?: string;
  isActive?: boolean;
  menuItems?: UserProfileMenuItemConfig[];
  onLogout?: () => void;
  compactOnMobile?: boolean;
  className?: string;
}

/**
 * UserProfileMenu: Komponen chip profil pengguna di Top Bar dengan dropdown aksi akun.
 */
export function UserProfileMenu({
  name = "Dian Pratiwi",
  role = "Super Admin",
  division = "Divisi Operasional",
  avatarSrc,
  email = "dian.pratiwi@bbj.org",
  isActive = false,
  menuItems = defaultProfileMenuItems,
  onLogout,
  compactOnMobile = true,
  className,
}: UserProfileMenuProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Tutup menu saat klik di luar area
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const subtitle = division ? `${role} · ${division}` : role;
  const resolvedAvatarSrc = avatarSrc ?? getPresetAvatarSrc(name);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger Chip (Responsif: Foto Profil saja pada Mobile) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={name ? `Menu profil ${name}` : "Menu profil pengguna"}
        className={cn(
          "flex items-center rounded-full text-left transition-all duration-150 cursor-pointer select-none",
          compactOnMobile
            ? "p-0 border-0 bg-transparent sm:gap-3 sm:py-1.5 sm:pl-1.5 sm:pr-3.5 sm:border sm:border-neutral-200 sm:bg-white sm:shadow-xs"
            : "gap-3 py-1.5 pl-1.5 pr-3.5 border border-neutral-200 bg-white shadow-xs",
          "hover:border-neutral-300 hover:bg-neutral-50/80 focus:outline-none focus:ring-2 focus:ring-brand/30",
          isActive &&
            !isOpen &&
            (compactOnMobile
              ? "ring-2 ring-brand-vivid sm:ring-0 sm:border-2 sm:border-brand-vivid sm:bg-surface sm:hover:border-brand-vivid"
              : "border-2 border-brand-vivid bg-surface hover:border-brand-vivid"),
          isOpen &&
            (compactOnMobile
              ? "ring-2 ring-brand/30 sm:border-brand sm:ring-2 sm:ring-brand/20 sm:bg-neutral-50/90"
              : "border-brand ring-2 ring-brand/20 bg-neutral-50/90"),
        )}
      >
        <Avatar
          src={resolvedAvatarSrc}
          alt={name}
          name={name}
          size="md"
          shape="circle"
          className="shrink-0 border-bondi-200 bg-bondi-50 text-bondi-800"
        />

        <div
          className={cn(
            "flex-col truncate",
            compactOnMobile ? "hidden sm:flex" : "flex",
          )}
        >
          <span className="font-label text-sm font-semibold text-neutral-900 leading-tight truncate">
            {name}
          </span>
          <span className="font-label text-xs font-medium text-neutral-500 leading-tight truncate">
            {subtitle}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
            compactOnMobile ? "hidden sm:block" : "block",
            isOpen && "rotate-180 text-brand",
          )}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <Menu className="w-64 p-2 shadow-lg border border-neutral-200 rounded-md bg-white space-y-1">
            {/* Header info akun */}
            <div className="px-3 py-2 border-b border-neutral-100 mb-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Akun Aktif
                </span>
                <Badge
                  tone="brand"
                  styleVariant="soft"
                  className="text-[10px] h-5 px-2"
                >
                  {role}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2.5 min-w-0">
                <Avatar
                  src={resolvedAvatarSrc}
                  alt={name}
                  name={name}
                  size="sm"
                  shape="circle"
                  className="shrink-0 border-bondi-200 bg-bondi-50 text-bondi-800"
                />
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold leading-5 text-neutral-900 truncate">
                    {name}
                  </p>
                  <p className="font-sans text-xs font-normal leading-4 text-neutral-500 truncate">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Navigasi Profil Dinamis */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.id}>
                  {item.isDanger && (
                    <div className="my-1 border-t border-neutral-100" />
                  )}
                  <MenuItem
                    label={item.label}
                    icon={
                      <Icon
                        className={cn(
                          "size-4",
                          item.isDanger && "text-red-600",
                        )}
                      />
                    }
                    className={
                      item.isDanger
                        ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                        : undefined
                    }
                    onSelect={() => {
                      setIsOpen(false);
                      if (item.action === "logout") {
                        onLogout?.();
                      } else if (item.id === "settings") {
                        navigate({
                          to: "/admin/profile",
                          search: { tab: "settings" },
                        });
                      } else if (item.to) {
                        navigate({ to: item.to });
                      }
                    }}
                  />
                </React.Fragment>
              );
            })}
          </Menu>
        </div>
      )}
    </div>
  );
}
