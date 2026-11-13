import * as React from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { formatPartnerNumber } from "./partner-data";
import { buildPartnerProfileContactItems } from "./partner-detail-data";
import type {
  PartnerDetailData,
  PartnerProfileContactItem,
} from "./partner-detail-data";

export interface PartnerDetailProfileCardProps {
  detail: PartnerDetailData;
}

const CONTACT_ICON_MAP: Record<
  PartnerProfileContactItem["id"],
  React.ComponentType<{ className?: string }>
> = {
  email: MessageCircle,
  phone: MessageCircle,
  address: MapPin,
};

/**
 * PartnerDetailProfileCard: Kartu profil donatur di sisi kanan halaman Detail Partner.
 * Gaya kartu & kotak ikon selaras dengan Ringkasan Donasi (Figma 123:5401) tanpa progress bar.
 */
export function PartnerDetailProfileCard({
  detail,
}: PartnerDetailProfileCardProps) {
  const contactItems = React.useMemo(
    () => buildPartnerProfileContactItems(detail),
    [detail],
  );

  const identitySubtitle =
    detail.totalActions === 0
      ? "Baru didaftarkan"
      : `${detail.type} · ${formatPartnerNumber(detail.totalActions)} aksi`;

  return (
    <aside
      aria-label="Profil Donatur"
      className="w-full xl:w-[380px] shrink-0 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col gap-4"
    >
      {/* Judul Kartu */}
      <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
        Profil Donatur
      </h2>

      {/* Identitas Utama Donatur */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          name={detail.name}
          size="lg"
          shape="rounded"
          className="rounded-2xl bg-bondi-50 border-bondi-200 text-bondi-900 font-heading font-semibold"
        />
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <p className="font-sans text-base font-semibold leading-6 text-neutral-900 truncate">
            {detail.name}
          </p>
          <p className="font-sans text-xs font-medium leading-4 text-neutral-500 truncate">
            {identitySubtitle}
          </p>
        </div>
      </div>

      {/* Daftar Informasi Kontak & Alamat (Data-Driven) */}
      <div className="flex flex-col gap-4">
        {contactItems.map((item) => {
          const Icon = CONTACT_ICON_MAP[item.id];
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="size-9 rounded-xl bg-bondi-50 text-brand flex items-center justify-center shrink-0">
                <Icon className="size-[18px]" />
              </div>

              <div className="min-w-0 flex-1 flex flex-col items-start">
                <p className="font-sans font-medium text-xs leading-4 text-neutral-500">
                  {item.label}
                </p>
                {!item.value ? (
                  <p className="font-sans font-medium text-sm leading-5 text-neutral-500">
                    {item.fallbackText}
                  </p>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="font-sans font-semibold text-sm leading-5 text-brand hover:text-brand-hover hover:underline break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-sans font-semibold text-sm leading-5 text-neutral-900 break-words">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
