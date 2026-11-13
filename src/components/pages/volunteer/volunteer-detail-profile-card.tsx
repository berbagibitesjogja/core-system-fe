import { Calendar, FileText, MessageCircle } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import {
  VOLUNTEER_DIVISION_BADGE_TONE,
  VOLUNTEER_ROLE_META,
} from "./volunteer-data";
import type { VolunteerRecord } from "./volunteer-data";

export interface VolunteerDetailProfileCardProps {
  volunteer: VolunteerRecord;
  className?: string;
}

// Menghitung inisial dari nama lengkap (mis. "Fauzan Trisuladana" -> "FT")
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "V";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * VolunteerDetailProfileCard: Panel ringkasan identitas dan kontak volunteer (Figma 151:21646).
 */
export function VolunteerDetailProfileCard({
  volunteer,
  className,
}: VolunteerDetailProfileCardProps) {
  const initials = getInitials(volunteer.name);
  const divisionTone = VOLUNTEER_DIVISION_BADGE_TONE[volunteer.division];
  const roleMeta = VOLUNTEER_ROLE_META[volunteer.role];

  // Format nomor WhatsApp untuk tautan https://wa.me/...
  const cleanPhoneDigits = volunteer.phone.replace(/\D/g, "");
  const waUrl = cleanPhoneDigits.startsWith("0")
    ? `https://wa.me/62${cleanPhoneDigits.slice(1)}`
    : `https://wa.me/${cleanPhoneDigits}`;

  return (
    <aside
      aria-label="Profil Volunteer"
      className={cn(
        "bg-surface border border-neutral-200 rounded-2xl p-6 flex flex-col gap-5 items-center w-full lg:w-[340px] shrink-0 shadow-xs",
        className,
      )}
    >
      {/* Avatar Inisial */}
      <div
        className="size-[90px] rounded-full bg-bondi-50 border-[1.4px] border-bondi-200 flex items-center justify-center select-none shadow-2xs"
        aria-hidden="true"
      >
        <span className="font-heading text-[28px] font-semibold text-brand-strong leading-none">
          {initials}
        </span>
      </div>

      {/* Nama & Badges */}
      <div className="flex flex-col items-center gap-2 text-center w-full">
        <h2 className="font-heading text-xl font-semibold text-neutral-900 leading-tight">
          {volunteer.name}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge tone={divisionTone} styleVariant="soft">
            {volunteer.division}
          </Badge>
          <Badge tone={roleMeta.tone} styleVariant={roleMeta.styleVariant}>
            {roleMeta.label}
          </Badge>
        </div>
      </div>

      {/* Pembatas Garis */}
      <div className="w-full h-px bg-neutral-200" aria-hidden="true" />

      {/* Detail Informasi Kontak */}
      <div className="flex flex-col gap-4 w-full text-left">
        {/* Email */}
        <div className="flex items-start gap-3 w-full">
          <FileText
            className="size-[18px] text-neutral-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs font-medium text-neutral-500 leading-4">
              Email
            </span>
            <span className="font-sans text-sm font-normal text-neutral-900 leading-5 break-all">
              {volunteer.email}
            </span>
          </div>
        </div>

        {/* Nomor WhatsApp */}
        <div className="flex items-start gap-3 w-full">
          <MessageCircle
            className="size-[18px] text-neutral-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs font-medium text-neutral-500 leading-4">
              WhatsApp
            </span>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm font-semibold text-brand hover:underline leading-5"
            >
              {volunteer.phone}
            </a>
          </div>
        </div>

        {/* Tanggal Bergabung */}
        <div className="flex items-start gap-3 w-full">
          <Calendar
            className="size-[18px] text-neutral-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs font-medium text-neutral-500 leading-4">
              Bergabung
            </span>
            <span className="font-sans text-sm font-normal text-neutral-900 leading-5">
              {volunteer.joinedDate || "3 Maret 2024"}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol Chat WhatsApp */}
      <Button
        type="button"
        variant="secondary"
        size="md"
        className="w-full gap-2 border-neutral-300 hover:border-neutral-900 text-neutral-900 font-semibold"
        onClick={() => window.open(waUrl, "_blank", "noopener,noreferrer")}
      >
        <MessageCircle
          className="size-5 shrink-0 text-brand"
          aria-hidden="true"
        />
        <span>Chat di WhatsApp</span>
      </Button>
    </aside>
  );
}
