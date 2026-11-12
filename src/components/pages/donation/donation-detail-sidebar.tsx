import * as React from "react";
import { Calendar, Check, MapPin, PackageCheck, Users } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { ProgressBar } from "#/components/shared/progress-bar";
import {
  calculateHeroesQuotaSummary,
  calculateSurplusSummary,
} from "./donation-detail-data";
import type { DonationDetailRecord } from "./donation-detail-data";

export interface DonationDetailSidebarProps {
  detail: DonationDetailRecord;
  onSaveNotes: (notes: string) => void;
}

/**
 * DonationDetailSidebar: Panel samping kanan berisi Ringkasan Donasi dan Card Catatan.
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

  const heroesSummary = React.useMemo(
    () => calculateHeroesQuotaSummary(detail.heroes, detail.quotaTotal),
    [detail.heroes, detail.quotaTotal],
  );
  const surplusSummary = React.useMemo(
    () => calculateSurplusSummary(detail.surplusFoods),
    [detail.surplusFoods],
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
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs space-y-5">
        <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
          Ringkasan Donasi
        </h2>

        {/* Progres Kuota Heroes */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 font-sans text-sm">
            <span className="inline-flex items-center gap-2 text-neutral-600 font-medium">
              <Users className="size-4 text-brand shrink-0" />
              Kuota Heroes
            </span>
            <span className="font-semibold text-neutral-900 tabular-nums">
              {heroesSummary.usedQuotaCount} / {detail.quotaTotal}
            </span>
          </div>

          <ProgressBar
            value={heroesSummary.quotaPercentage}
            color={heroesSummary.quotaPercentage >= 100 ? "success" : "brand"}
          />

          <div className="flex flex-wrap items-center justify-between gap-1 font-sans text-xs text-neutral-500">
            <span>
              {heroesSummary.remainingQuota > 0
                ? `${heroesSummary.remainingQuota} kuota tersisa`
                : "Kuota penuh"}
            </span>
            <span>
              {heroesSummary.pickedUpCount} diambil
              {heroesSummary.forfeitedCount > 0
                ? ` · ${heroesSummary.forfeitedCount} hangus`
                : ""}
            </span>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-4 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 font-sans text-sm text-neutral-600 font-medium">
              <PackageCheck className="size-4 text-brand shrink-0" />
              Total Surplus Food
            </span>
            <span className="font-number-m text-neutral-900 tabular-nums">
              {surplusSummary.totalWeightFormatted}
            </span>
          </div>
          <p className="font-sans text-xs text-neutral-500">
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
                <Icon className="size-4 text-neutral-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-label text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    {item.label}
                  </p>
                  <p className="font-sans text-[13px] font-medium text-neutral-900 leading-snug">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Card / Catatan */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col gap-4">
        <Textarea
          label="Catatan"
          helperText="Hanya terlihat oleh pengurus."
          placeholder="Catatan...."
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          className="max-w-none"
        />

        <Button
          type="button"
          variant="primary"
          className="w-full"
          leftIcon={<Check className="size-5" />}
          isLoading={isSaving}
          onClick={handleSave}
        >
          Simpan Catatan
        </Button>
      </section>
    </aside>
  );
}
