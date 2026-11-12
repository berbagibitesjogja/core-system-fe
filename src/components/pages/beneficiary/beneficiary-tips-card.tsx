import { Check } from "lucide-react";
import beneficiaryTipsImg from "#/assets/illustrations/donation-tips.png";
import { defaultBeneficiaryTips } from "./beneficiary-data";
import type { BeneficiaryTipItem } from "./beneficiary-data";
import { cn } from "#/lib/utils";

export interface BeneficiaryTipsCardProps {
  tips?: BeneficiaryTipItem[];
  className?: string;
}

/**
 * BeneficiaryTipsCard: Panel panduan pendaftaran kelompok penerima manfaat (Figma 138:11422).
 */
export function BeneficiaryTipsCard({
  tips = defaultBeneficiaryTips,
  className,
}: BeneficiaryTipsCardProps) {
  return (
    <aside
      className={cn(
        "bg-bondi-50 border border-bondi-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0",
        className,
      )}
    >
      {/* Ilustrasi Tips Penerima */}
      <div className="h-[204px] w-full rounded-2xl overflow-hidden bg-bondi-100/50 shrink-0">
        <img
          src={beneficiaryTipsImg}
          alt="Tips mendaftarkan penerima manfaat Berbagi Bites Jogja"
          className="size-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Judul Panel Tips */}
      <h3 className="font-heading text-[18px] leading-[24px] font-semibold text-neutral-900">
        Tips mendaftarkan penerima
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
            <p className="font-body text-[12px] leading-[16px] text-[#4d585b]">
              {tip.text}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
