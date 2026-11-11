import * as React from "react";
import { Menu as MenuIcon } from "lucide-react";
import { UserProfileMenu } from "./user-profile-menu";
import type { UserProfileMenuProps } from "./user-profile-menu";
import { cn } from "#/lib/utils";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  user?: UserProfileMenuProps;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Header: Top Bar navigasi admin dengan judul halaman, tanggal dinamis, dan profil menu.
 */
export function Header({
  title = "Dashboard",
  subtitle = "Minggu, 8 November 2026",
  onMenuToggle,
  user,
  actions,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-4 border-b border-neutral-200/80 bg-white/95 backdrop-blur-xs px-4 py-3.5 sm:px-6 lg:px-8",
        className,
      )}
    >
      {/* Sisi Kiri: Tombol Menu Mobile & Judul Halaman */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Buka menu navigasi"
            className="flex size-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand/30 lg:hidden cursor-pointer"
          >
            <MenuIcon className="size-5" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="font-heading-h3 text-lg font-semibold text-neutral-900 leading-tight sm:text-xl truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-xs text-neutral-500 leading-tight mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Sisi Kanan: Aksi Tambahan & Profile Chip */}
      <div className="flex items-center gap-3 shrink-0">
        {actions}
        <UserProfileMenu {...user} />
      </div>
    </header>
  );
}
