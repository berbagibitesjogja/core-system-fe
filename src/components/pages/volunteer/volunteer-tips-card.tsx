import { Check } from "lucide-react";
import volunteerChecklistIllustration from "#/assets/illustrations/volunteer-checklist-idea.png";

const VOLUNTEER_TIPS = [
  "Pilih role sekecil yang dibutuhkan. Role bisa dinaikkan kapan saja.",
  "Pastikan email sama dengan akun Google anggota, kalau tidak dia tidak bisa masuk.",
  "Anggota dengan role Volunteer tidak bisa membuka panel admin.",
] as const;

/**
 * VolunteerTipsCard: Panel samping kanan berisi panduan menambah anggota volunteer (Figma 150:20910).
 */
export function VolunteerTipsCard() {
  return (
    <aside
      aria-label="Tips menambah anggota"
      className="bg-bondi-50/70 border border-bondi-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[320px] shrink-0"
    >
      <div className="h-[204px] relative rounded-xl shrink-0 w-full overflow-hidden bg-bondi-100/40">
        <img
          src={volunteerChecklistIllustration}
          alt="Ilustrasi tips menambah anggota"
          className="size-full object-cover pointer-events-none"
        />
      </div>

      <h3 className="font-heading font-semibold text-lg leading-6 text-neutral-900">
        Tips menambah anggota
      </h3>

      <div className="flex flex-col gap-3">
        {VOLUNTEER_TIPS.map((tip, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <div className="size-[18px] shrink-0 rounded-full bg-brand/10 flex items-center justify-center text-brand mt-0.5">
              <Check className="size-3.5" aria-hidden="true" />
            </div>
            <p className="font-body text-xs font-normal leading-4 text-neutral-600 flex-1">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
