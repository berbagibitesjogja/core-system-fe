import { Check } from "lucide-react";
import donationTipsImg from "#/assets/illustrations/donation-tips.png";
import { defaultDonationTips } from "./donation-data";
import type { DonationTipItem } from "./donation-data";
import { cn } from "#/lib/utils";

export interface DonationTipsCardProps {
  tips?: DonationTipItem[];
  className?: string;
}

/**
 * DonationTipsCard: Kartu tips pengisian formulir donasi (Figma Node 121:3998).
 * Menampilkan ilustrasi resmi tips, judul panduan, dan butir checklist poin penting.
 */
export function DonationTipsCard({
  tips = defaultDonationTips,
  className,
}: DonationTipsCardProps) {
  return (
    <aside
      className={cn(
        "bg-bondi-50 border border-bondi-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0 shadow-2xs",
        className,
      )}
    >
      {/* Ilustrasi Visual Tips Donasi */}
      <div className="h-[204px] w-full rounded-xl overflow-hidden bg-bondi-100/50 shrink-0">
        <img
          src={donationTipsImg}
          alt="Tips mengisi donasi Berbagi Bites Jogja"
          className="size-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Judul Bagian Tips */}
      <h3 className="font-heading text-lg font-semibold text-neutral-900">
        Tips mengisi donasi
      </h3>

      {/* Daftar Butir Poin Tips */}
      <div className="flex flex-col gap-3">
        {tips.map((tip) => (
          <div key={tip.id} className="flex items-start gap-2.5">
            <div className="size-4.5 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
              <Check className="size-3 stroke-[2.5]" />
            </div>
            <p className="font-body text-xs text-neutral-600 leading-relaxed">
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
