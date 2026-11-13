import { Check } from "lucide-react";
import volunteerChecklistIllustration from "#/assets/illustrations/volunteer-checklist-idea.png";
import { cn } from "#/lib/utils";
import { defaultPartnerTips } from "./partner-data";
import type { PartnerTipItem } from "./partner-data";

export interface PartnerTipsCardProps {
  tips?: PartnerTipItem[];
  className?: string;
}

/**
 * PartnerTipsCard: Panel panduan pendaftaran donatur di sisi kanan formulir Tambah/Edit Partner.
 */
export function PartnerTipsCard({
  tips = defaultPartnerTips,
  className,
}: PartnerTipsCardProps) {
  return (
    <aside
      className={cn(
        "bg-brand-subtle rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0",
        className,
      )}
    >
      {/* Ilustrasi Tips Donatur */}
      <div className="h-[204px] w-full rounded-2xl overflow-hidden shrink-0">
        <img
          src={volunteerChecklistIllustration}
          alt="Ilustrasi tips mendaftarkan donatur"
          className="size-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Judul Panel Tips */}
      <h3 className="font-heading text-[18px] leading-[24px] font-semibold text-neutral-900">
        Tips mendaftarkan donatur
      </h3>

      {/* Daftar Butir Panduan */}
      <ul className="flex flex-col gap-4 m-0 p-0 list-none">
        {tips.map((tip) => (
          <li key={tip.id} className="flex items-start gap-2 w-full">
            <Check
              className="size-[18px] text-bondi-600 shrink-0"
              strokeWidth={2}
              aria-hidden="true"
            />
            <p className="flex-1 min-w-0 font-body font-normal text-[12px] leading-[16px] text-neutral-600">
              {tip.text}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
