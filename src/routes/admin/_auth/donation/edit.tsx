import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  DonationForm,
  DonationFormSkeleton,
  DonationLeaveDialog,
  DonationTipsCard,
} from "#/components/pages/donation";
import type {
  BeneficiaryOption,
  DonationFormData,
  SponsorOption,
} from "#/components/pages/donation";
import { idDonation, idPartner } from "#/locales";
import { useAdminLayout } from "#/routes/admin/_auth";
import { getBeneficiaries } from "#/services/beneficiaryService";
import {
  getDonationDetail,
  getInitials,
  parseDonationDate,
  updateDonation,
} from "#/services/donationService";
import { isApiError } from "#/services/errorService";
import { getPartners } from "#/services/partnerService";

// Validasi query param id donasi yang hendak diedit
const editSearchSchema = z.object({
  id: z.string().optional().catch(""),
});

export const Route = createFileRoute("/admin/_auth/donation/edit")({
  validateSearch: (search: Record<string, unknown>) => {
    return editSearchSchema.parse(search);
  },
  component: DonationEditPage,
});

/**
 * DonationEditPage: Halaman Edit Donasi (Figma Node 122:4524, 122:4908, 122:5232).
 * Memuat data donasi terpilih dari API backend, menyediakan form interaktif terisi,
 * opsi dinamis sponsor dan beneficiaries, serta dialog konfirmasi tinggalkan halaman.
 */
function DonationEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = Route.useSearch();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const getDonationDetailFn = useServerFn(getDonationDetail);
  const getPartnersFn = useServerFn(getPartners);
  const getBeneficiariesFn = useServerFn(getBeneficiaries);
  const updateDonationFn = useServerFn(updateDonation);

  const trimmedId = (id ?? "").trim();

  // Evaluasi ID donasi
  React.useEffect(() => {
    if (!trimmedId) {
      toast.error(idDonation.edit.toasts.missingId);
      navigate({ to: "/admin/donation" });
    }
  }, [trimmedId, navigate]);

  // Query detail donasi dari backend
  const donationQuery = useQuery({
    queryKey: ["donation-detail", trimmedId],
    queryFn: async () => {
      if (!trimmedId) return null;
      return getDonationDetailFn({ data: { id: trimmedId } });
    },
    enabled: Boolean(trimmedId),
  });

  // Query opsi mitra donatur
  const sponsorsQuery = useQuery({
    queryKey: ["partners", "options"],
    queryFn: () => getPartnersFn({ data: { limit: 100 } }),
  });

  // Query opsi kategori penerima manfaat
  const beneficiariesQuery = useQuery({
    queryKey: ["beneficiaries", "options"],
    queryFn: () => getBeneficiariesFn({ data: { page: 1, limit: 100 } }),
  });

  React.useEffect(() => {
    if (donationQuery.isError) {
      toast.error(idDonation.edit.toasts.notFound);
      navigate({ to: "/admin/donation" });
    }
  }, [donationQuery.isError, navigate]);

  const sponsorOptions = React.useMemo<SponsorOption[]>(() => {
    const raw = sponsorsQuery.data?.data;
    if (!Array.isArray(raw)) return [];
    return raw.map((s) => ({
      id: s.id,
      name: s.name,
      initials: getInitials(s.name),
      category:
        s.variant === "company"
          ? idPartner.list.filterOptions.company
          : idPartner.list.filterOptions.individual,
    }));
  }, [sponsorsQuery.data]);

  const beneficiaryOptions = React.useMemo<BeneficiaryOption[]>(() => {
    const raw = beneficiariesQuery.data?.data;
    if (!Array.isArray(raw)) return [];
    return raw.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.variant,
    }));
  }, [beneficiariesQuery.data]);

  // Ambil data awal donasi berdasarkan record API riil
  const initialFormData = React.useMemo<DonationFormData | null>(() => {
    const record = donationQuery.data?.data;
    if (!record) return null;

    const parsed = parseDonationDate(record.event_at);
    const dateObj = new Date(record.event_at);
    const hours = isNaN(dateObj.getTime())
      ? "14"
      : String(dateObj.getHours()).padStart(2, "0");
    const minutes = isNaN(dateObj.getTime())
      ? "00"
      : String(dateObj.getMinutes()).padStart(2, "0");

    const beneficiaryCategoryIds = record.targets
      .map((t) => t.beneficiary_category_id)
      .filter((targetId): targetId is string => Boolean(targetId));

    return {
      id: record.id,
      donorName: record.sponsor.name || idDonation.list.defaultDonorName,
      quota: String(record.quota),
      pickupDate: parsed.isoDateOnly,
      pickupHour: hours,
      pickupMinute: minutes,
      duration: "60",
      location: record.address || "",
      mapsUrl: record.maps || "",
      beneficiaryIds: beneficiaryCategoryIds,
      notes: record.message || "",
      isCsr: Boolean(record.hide_sponsor || record.sponsor.hidden),
      shouldAnnounce: !record.hide_from_public,
    };
  }, [donationQuery.data]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = React.useState(false);

  // Navigasi kembali ke daftar donasi
  const handleConfirmLeave = () => {
    setIsLeaveDialogOpen(false);
    navigate({ to: "/admin/donation" });
  };

  const handleBackTrigger = React.useCallback(() => {
    setIsLeaveDialogOpen(true);
  }, []);

  // Hubungkan tombol Kembali di Header Top Bar dengan dialog konfirmasi
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: idDonation.edit.title,
      subtitle: idDonation.edit.subtitle,
      onBack: handleBackTrigger,
      backLabel: idDonation.edit.backLabel,
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, handleBackTrigger]);

  const handleSubmit = async (data: DonationFormData) => {
    if (!trimmedId) return;
    setIsSubmitting(true);

    try {
      const matchedSponsor = sponsorOptions.find(
        (s) => s.name.toLowerCase() === data.donorName.toLowerCase(),
      );

      const hour = data.pickupHour.padStart(2, "0");
      const minute = data.pickupMinute.padStart(2, "0");
      const eventAt = `${data.pickupDate}T${hour}:${minute}:00+07:00`;
      const quotaNum = Number(data.quota) || 1;

      await updateDonationFn({
        data: {
          id: trimmedId,
          sponsor_id: matchedSponsor?.id,
          event_at: eventAt,
          quota: quotaNum,
          hero_quota: quotaNum,
          address: data.location.trim() || undefined,
          maps: data.mapsUrl.trim() || undefined,
          message: data.notes.trim() || undefined,
          hide_from_public: !data.shouldAnnounce,
          beneficiary_category_ids: data.beneficiaryIds,
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["donations"] });
      await queryClient.invalidateQueries({
        queryKey: ["donation-detail", trimmedId],
      });

      toast.success(idDonation.edit.toasts.updateSuccess(data.donorName));
      navigate({ to: "/admin/donation" });
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idDonation.edit.toasts.updateFailed);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = donationQuery.isLoading || !initialFormData;

  if (isLoading) {
    return <DonationFormSkeleton />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200">
      {/* Kolom Kiri: Kartu Formulir Edit Donasi Terisi (Figma Node 122:4524) */}
      <div className="flex-1 min-w-0 w-full">
        <DonationForm
          mode="edit"
          initialData={initialFormData}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={handleBackTrigger}
          sponsors={sponsorOptions}
          beneficiaries={beneficiaryOptions}
        />
      </div>

      {/* Kolom Kanan: Kartu Tips Mengisi Donasi */}
      <DonationTipsCard />

      {/* Modal Dialog Konfirmasi: Tinggalkan Halaman Ini? (Figma Node 122:5232) */}
      <DonationLeaveDialog
        isOpen={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}
