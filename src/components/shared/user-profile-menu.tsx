import * as React from "react";
import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Menu, MenuItem } from "#/components/ui/menu";
import { cn } from "#/lib/utils";

export interface UserProfileMenuProps {
  name?: string;
  role?: string;
  division?: string;
  avatarSrc?: string;
  initials?: string;
  email?: string;
  onLogout?: () => void;
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
  onLogout,
  className,
}: UserProfileMenuProps) {
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

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger Chip */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          "flex items-center gap-3 rounded-full border border-neutral-200 bg-white py-1.5 pl-1.5 pr-3.5 text-left transition-all duration-150 shadow-xs hover:border-neutral-300 hover:bg-neutral-50/80 focus:outline-none focus:ring-2 focus:ring-brand/30 cursor-pointer select-none",
          isOpen && "border-brand ring-2 ring-brand/20 bg-neutral-50/90",
        )}
      >
        <Avatar
          src={avatarSrc}
          name={name}
          size="md"
          shape="circle"
          className="bg-bondi-50 border-bondi-200 text-bondi-900"
        />

        <div className="flex flex-col truncate">
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
            isOpen && "rotate-180 text-brand",
          )}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <Menu className="w-64 p-2 shadow-lg border border-neutral-200 rounded-2xl bg-white space-y-1">
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
              <p className="font-label text-sm font-semibold text-neutral-900 truncate mt-1">
                {name}
              </p>
              <p className="font-sans text-xs text-neutral-500 truncate">
                {email}
              </p>
            </div>

            {/* Menu Navigasi Profil */}
            <MenuItem
              label="Lihat Profil"
              icon={<User className="size-4" />}
              onSelect={() => setIsOpen(false)}
            />
            <MenuItem
              label="Pengaturan Akun"
              icon={<Settings className="size-4" />}
              onSelect={() => setIsOpen(false)}
            />
            <MenuItem
              label="Pusat Bantuan"
              icon={<HelpCircle className="size-4" />}
              onSelect={() => setIsOpen(false)}
            />

            <div className="my-1 border-t border-neutral-100" />

            {/* Aksi Keluar */}
            <MenuItem
              label="Keluar"
              icon={<LogOut className="size-4 text-red-600" />}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onSelect={() => {
                setIsOpen(false);
                onLogout?.();
              }}
            />
          </Menu>
        </div>
      )}
    </div>
  );
}
