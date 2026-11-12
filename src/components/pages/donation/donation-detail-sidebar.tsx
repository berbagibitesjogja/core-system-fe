import * as React from "react";
import { Calendar, MapPin, PackageCheck, Users } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { ProgressBar } from "#/components/shared/progress-bar";
import { calculateSurplusSummary } from "./donation-detail-data";
import type { DonationDetailRecord } from "./donation-detail-data";

export interface DonationDetailSidebarProps {
  detail: DonationDetailRecord;
  onSaveNotes: (notes: string) => void;
}

/**
 * DonationDetailSidebar: Panel samping kanan berisi Ringkasan Donasi dan Catatan pelaksanaan (Figma 123:4842, 124:6103).
 */
export function DonationDetailSidebar({
  detail,
  onSaveNotes,
}: DonationDetailSidebarProps) {
  const [noteDraft, setNoteDraft] = React.useState(detail.notes);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    setNoteDraft(detail.notes);
  }, [detail.id, detail.notes]);

  const heroesCount = detail.heroes.length;
  const quotaPercentage =
    detail.quotaTotal > 0
      ? Math.min(100, Math.round((heroesCount / detail.quotaTotal) * 100))
      : 0;
  const remainingQuota = Math.max(0, detail.quotaTotal - heroesCount);
  const surplusSummary = React.useMemo(
    () => calculateSurplusSummary(detail.surplusFoods),
    [detail.surplusFoods],
  );
  const pickedUpCount = React.useMemo(
    () => detail.heroes.filter((h) => h.status === "sudah-diambil").length,
    [detail.heroes],
  );

  const infoItems = React.useMemo(
    () => [
      {
        id: "schedule",
        icon: Calendar,
        label: "Jadwal Aksi",
        value: `${detail.day}, ${detail.date}`,
      },
      {
        id: "location",
        icon: MapPin,
        label: "Lokasi Penjemputan",
        value: detail.location,
      },
    ],
    [detail.day, detail.date, detail.location],
  );

  const handleSave = () => {
    setIsSaving(true);
    window.setTimeout(() => {
      onSaveNotes(noteDraft.trim());
      setIsSaving(false);
    }, 200);
  };

  return (
    <aside className="space-y-6">
      {/* Kartu Ringkasan Donasi */}
      <section className="rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <h2 className="font-['Gabarito'] font-semibold text-[18px] leading-[26px] text-[#142023]">
          Ringkasan Donasi
        </h2>

        {/* Progres Kuota Heroes */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-[14px]">
            <span className="inline-flex items-center gap-2 text-[#4d585b] font-medium">
              <Users className="size-4 text-[#007d85]" />
              Kuota Heroes
            </span>
            <span className="font-semibold text-[#142023] tabular-nums">
              {heroesCount} / {detail.quotaTotal}
            </span>
          </div>

          <ProgressBar
            value={quotaPercentage}
            color={quotaPercentage >= 100 ? "success" : "brand"}
          />

          <div className="flex items-center justify-between text-[12px] text-[#6b777a]">
            <span>
              {remainingQuota > 0
                ? `${remainingQuota} kuota tersisa`
                : "Kuota penuh"}
            </span>
            <span>{pickedUpCount} sudah diambil</span>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-[14px] text-[#4d585b] font-medium">
              <PackageCheck className="size-4 text-[#007d85]" />
              Total Surplus Food
            </span>
            <span className="font-['Gabarito'] font-bold text-[20px] text-[#142023] tabular-nums">
              {surplusSummary.totalWeightFormatted}
            </span>
          </div>
          <p className="text-[12px] text-[#6b777a]">
            {surplusSummary.totalItems === 0
              ? "Belum ada catatan makanan surplus."
              : `${surplusSummary.eligibleCount} jenis layak · ${surplusSummary.spoiledCount} basi/tidak layak`}
          </p>
        </div>

        {/* Informasi Jadwal & Lokasi */}
        <div className="border-t border-neutral-100 pt-4 space-y-3">
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-start gap-2.5">
                <Icon className="size-4 text-[#6b777a] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[#6b777a]">
                    {item.label}
                  </p>
                  <p className="text-[13px] font-medium text-[#142023] leading-snug">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Kartu Catatan */}
      <section className="rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="space-y-0.5">
          <h2 className="font-['Gabarito'] font-semibold text-[18px] leading-[26px] text-[#142023]">
            Catatan
          </h2>
          <p className="text-[12px] text-[#6b777a]">
            Catatan internal koordinasi lapangan dan hasil distribusi.
          </p>
        </div>

        <Textarea
          showLabel={false}
          showHelper={false}
          rows={4}
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          placeholder="Tulis catatan aksi donasi di sini..."
        />

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          isLoading={isSaving}
          onClick={handleSave}
        >
          Simpan Catatan
        </Button>
      </section>
    </aside>
  );
}
