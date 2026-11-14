import * as React from "react";
import { ArrowLeft, Menu as MenuIcon } from "lucide-react";
import { UserProfileMenu } from "./user-profile-menu";
import type { UserProfileMenuProps } from "./user-profile-menu";
import { Avatar } from "#/components/ui/avatar";
import type { AvatarShape } from "#/components/ui/avatar";
import { cn } from "#/lib/utils";

export interface HeaderAvatarProps {
  src?: string;
  name: string;
  shape?: AvatarShape;
}

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  avatar?: HeaderAvatarProps;
  onMenuToggle?: () => void;
  user?: UserProfileMenuProps;
  actions?: React.ReactNode;
  onBack?: () => void;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

/**
 * Format tanggal dalam bahasa Indonesia (contoh: "Rabu, 11 November 2026").
 */
export function formatIndonesianDate(date: Date = new Date()): string {
  const formatted = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Header: Top Bar navigasi admin di dalam Main (tanpa background & tanpa border) sesuai Figma Node 112:522.
 * Tanggal terintegrasi secara interaktif menampilkan hari & tanggal saat ini.
 */
export function Header({
  title = "Dashboard",
  subtitle,
  avatar,
  onMenuToggle,
  user,
  actions,
  onBack,
  backHref,
  backLabel = "Kembali",
  className,
}: HeaderProps) {
  // Tanggal interaktif saat ini dengan fallback statis untuk keamanan SSR
  const [currentDate, setCurrentDate] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return formatIndonesianDate();
    }
    return "Minggu, 8 November 2026";
  });

  React.useEffect(() => {
    setCurrentDate(formatIndonesianDate());
  }, []);

  const displaySubtitle = subtitle ?? currentDate;

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (backHref && typeof window !== "undefined") {
      window.location.href = backHref;
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 bg-transparent shrink-0",
        className,
      )}
    >
      {/* Sisi Kiri: Tombol Menu Mobile, Tombol Kembali, & Judul Halaman */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Buka menu navigasi"
            className="flex size-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand/30 lg:hidden cursor-pointer shrink-0 shadow-2xs"
          >
            <MenuIcon className="size-5" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          {(onBack || backHref) && (
            <button
              type="button"
              onClick={handleBackClick}
              className="inline-flex items-center gap-1.5 px-3 py-1 -ml-3 mb-0.5 rounded-full text-xs font-semibold text-brand hover:bg-bondi-50 transition-colors cursor-pointer w-fit select-none"
            >
              <ArrowLeft className="size-3.5 stroke-[2.5]" />
              <span>{backLabel}</span>
            </button>
          )}

          <div className="flex items-center gap-3 min-w-0">
            {avatar && (
              <Avatar
                src={avatar.src}
                alt={avatar.name}
                name={avatar.name}
                size="md"
                shape={avatar.shape ?? "circle"}
                className="shrink-0 border-bondi-200 bg-bondi-50 text-bondi-800"
              />
            )}
            <div className="flex flex-col min-w-0">
              <h1 className="font-heading-h3 text-xl font-semibold text-neutral-900 leading-7 truncate">
                {title}
              </h1>
              {displaySubtitle && (
                <p className="font-sans text-xs text-neutral-500 leading-4 mt-0.5 truncate">
                  {displaySubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Aksi Tambahan & Profile Chip (Responsif: Foto Profil saja pada Mobile) */}
      <div className="flex items-center gap-3 shrink-0">
        {actions && (
          <div className="hidden sm:flex items-center gap-2">{actions}</div>
        )}
        <UserProfileMenu {...user} />
      </div>
    </div>
  );
}
