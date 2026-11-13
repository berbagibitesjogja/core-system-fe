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
        "bg-bondi-50 border border-bondi-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0",
        className,
      )}
    >
      {/* Ilustrasi Tips Donatur */}
      <div className="h-[204px] w-full rounded-2xl overflow-hidden bg-bondi-50 flex items-center justify-center shrink-0">
        <img
          src={volunteerChecklistIllustration}
          alt="Ilustrasi tips mendaftarkan donatur"
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Judul Panel Tips */}
      <h3 className="font-heading font-semibold text-base leading-6 text-[#005e64]">
        Tips mendaftarkan donatur
      </h3>

      {/* Daftar Butir Panduan */}
      <ul className="flex flex-col gap-4 m-0 p-0 list-none">
        {tips.map((tip) => (
          <li key={tip.id} className="flex items-start gap-2">
            <Check
              className="size-[18px] text-[#007d85] shrink-0 mt-0.5"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <p className="font-body font-normal text-sm leading-5 text-[#142023]">
              {tip.text}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
