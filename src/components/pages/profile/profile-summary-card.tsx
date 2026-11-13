import { Calendar, FileText, MessageCircle } from "lucide-react";
import reimburseHeaderTrailSvg from "#/assets/illustrations/reimburse-header-trail.svg";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import { PROFILE_ROLE_META, formatWhatsAppHref } from "./profile-data";
import type { UserProfileRecord } from "./profile-data";

export interface ProfileSummaryCardProps {
  profile: UserProfileRecord;
  className?: string;
}

interface ContactInfoRowConfig {
  id: string;
  label?: string;
  value: string;
  icon: typeof FileText;
  href?: string;
  isHighlight?: boolean;
}

/**
 * ProfileSummaryCard: Panel kartu identitas pengguna di sisi kiri halaman Profil
 * (Figma Node 157:25113 & 157:25775) berisi banner brand, avatar, badge divisi/role,
 * dan informasi kontak.
 */
export function ProfileSummaryCard({
  profile,
  className,
}: ProfileSummaryCardProps) {
  const roleMeta = PROFILE_ROLE_META[profile.role];

  const identityBadges: ReadonlyArray<{
    id: string;
    label: string;
    tone: "neutral" | "brand";
    styleVariant: "soft" | "solid";
  }> = [
    {
      id: "division",
      label: profile.division,
      tone: roleMeta.divisionBadgeTone,
      styleVariant: "soft",
    },
    {
      id: "role",
      label: roleMeta.badgeLabel,
      tone: "neutral",
      styleVariant: "solid",
    },
  ];

  const contactRows: readonly ContactInfoRowConfig[] = [
    {
      id: "email",
      label: "Email",
      value: profile.email,
      icon: FileText,
    },
    {
      id: "whatsapp",
      value: profile.whatsapp,
      icon: MessageCircle,
      href: formatWhatsAppHref(profile.whatsapp),
      isHighlight: true,
    },
    {
      id: "joined",
      label: "Bergabung",
      value: profile.joinedAtLabel,
      icon: Calendar,
    },
  ];

  return (
    <aside
      aria-label="Ringkasan Profil"
      className={cn(
        "w-full lg:w-[340px] shrink-0 rounded-lg border border-neutral-200 bg-surface overflow-hidden shadow-xs",
        className,
      )}
    >
      {/* Banner Brand Teal dengan Dekorasi Pita */}
      <div className="bg-brand h-[96px] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute h-[90px] -left-2.5 top-0 w-[370px]"
        >
          <div className="absolute -inset-x-[2.43%] -inset-y-[10%]">
            <img
              src={reimburseHeaderTrailSvg}
              alt=""
              className="block max-w-none size-full"
            />
          </div>
        </div>
      </div>

      {/* Konten Identitas & Kontak */}
      <div className="relative px-6 pb-6 flex flex-col items-center gap-4">
        <Avatar
          src={profile.avatarSrc}
          alt={profile.name}
          name={profile.name}
          size="lg"
          shape="circle"
          className="relative z-10 -mt-[45px] size-[90px] border-4 border-surface bg-bondi-50 text-brand-strong font-heading font-semibold text-[28px] leading-10"
        />

        <h2 className="font-heading text-xl font-semibold leading-7 text-neutral-900 text-center">
          {profile.name}
        </h2>

        {/* Badges Divisi & Role */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {identityBadges.map((badge) => (
            <Badge
              key={badge.id}
              tone={badge.tone}
              styleVariant={badge.styleVariant}
            >
              {badge.label}
            </Badge>
          ))}
        </div>

        <div className="h-px w-full bg-neutral-200" aria-hidden="true" />

        {/* Bagian Informasi Kontak */}
        <div className="w-full flex flex-col gap-4 items-start">
          <h3 className="font-sans text-base font-semibold leading-6 text-neutral-900">
            Informasi Kontak
          </h3>

          {contactRows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.id} className="flex items-start gap-3 w-full">
                <Icon
                  className={cn(
                    "size-[18px] shrink-0 mt-0.5",
                    row.isHighlight ? "text-brand" : "text-neutral-500",
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  {row.label && (
                    <span className="font-sans text-xs font-medium leading-4 text-neutral-500">
                      {row.label}
                    </span>
                  )}
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-sm font-semibold leading-5 text-brand hover:underline break-words"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="font-body text-sm font-normal leading-5 text-neutral-900 break-all">
                      {row.value}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
