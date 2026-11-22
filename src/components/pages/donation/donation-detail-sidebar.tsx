import * as React from "react";
import { Building, Check, Clock, MapPin } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { ProgressBar } from "#/components/shared/progress-bar";
import { idDonation } from "#/locales";
import { calculateHeroesQuotaSummary } from "./donation-detail-data";
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

  const beneficiariesText = React.useMemo(() => {
    const uniqueNames = Array.from(
      new Set(
        detail.heroes
          .filter((hero) => hero.status !== "tidak-jadi-ambil")
          .map((hero) => hero.beneficiaryName)
          .filter(Boolean),
      ),
    );
    return uniqueNames.length > 0
      ? uniqueNames.join(", ")
      : idDonation.detail.sidebar.noBeneficiaries;
  }, [detail.heroes]);

  const infoItems = React.useMemo(
    () => [
      {
        id: "schedule",
        icon: Clock,
        label: idDonation.detail.sidebar.scheduleLabel,
        value: detail.pickupSchedule,
      },
      {
        id: "location",
        icon: MapPin,
        label: idDonation.detail.sidebar.locationLabel,
        value: detail.location,
        linkLabel: idDonation.detail.sidebar.mapsLinkLabel,
        href: detail.mapsUrl,
      },
      {
        id: "beneficiaries",
        icon: Building,
        label: idDonation.detail.sidebar.beneficiariesLabel,
        value: beneficiariesText,
      },
    ],
    [detail.pickupSchedule, detail.location, detail.mapsUrl, beneficiariesText],
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
      {/* Card / Ringkasan */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
          {idDonation.detail.sidebar.summaryTitle}
        </h2>

        {/* Kuota terisi */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 font-sans text-sm font-semibold leading-5">
            <span className="text-neutral-600">
              {idDonation.detail.sidebar.filledQuotaLabel}
            </span>
            <span className="text-neutral-900 tabular-nums">
              {heroesSummary.usedQuotaCount} / {detail.quotaTotal}{" "}
              {idDonation.detail.sidebar.heroesUnit}
            </span>
          </div>

          <ProgressBar
            value={heroesSummary.quotaPercentage}
            color={heroesSummary.quotaPercentage >= 100 ? "success" : "brand"}
            className="[&>div]:h-2 [&>div>div]:h-2"
          />

          {heroesSummary.forfeitedCount > 0 && (
            <p className="font-sans text-xs font-medium text-red-700">
              {idDonation.detail.heroesCard.quotaBurnedBadge(
                heroesSummary.forfeitedCount,
              )}
            </p>
          )}
        </div>

        {/* Informasi Jadwal, Lokasi, dan Beneficiaries */}
        <div className="flex flex-col gap-4">
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <div className="size-9 rounded-xl bg-bondi-50 text-brand flex items-center justify-center shrink-0">
                  <Icon className="size-[18px]" />
                </div>
                <div className="min-w-0 flex-1 flex flex-col items-start">
                  <p className="font-sans font-medium text-xs leading-4 text-neutral-500">
                    {item.label}
                  </p>
                  <p className="font-sans font-semibold text-sm leading-5 text-neutral-900">
                    {item.value}
                  </p>
                  {item.href && item.linkLabel && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans font-semibold text-xs leading-4 text-brand hover:text-brand-hover hover:underline mt-0.5"
                    >
                      {item.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Card / Catatan */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col gap-4">
        <Textarea
          label={idDonation.detail.sidebar.notesTitle}
          helperText={idDonation.detail.sidebar.notesHelper}
          placeholder={idDonation.detail.sidebar.notesPlaceholder}
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
          {idDonation.detail.sidebar.saveNotesButton}
        </Button>
      </section>
    </aside>
  );
}
