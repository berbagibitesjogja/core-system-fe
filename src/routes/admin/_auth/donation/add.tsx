import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "#/components/ui/toast";
import {
  DonationForm,
  DonationLeaveDialog,
  DonationTipsCard,
} from "#/components/pages/donation";
import type {
  BeneficiaryOption,
  DonationFormData,
  SponsorOption,
} from "#/components/pages/donation";
import { idDonation } from "#/locales";
import { useAdminLayout } from "#/routes/admin/_auth";
import { getBeneficiaries } from "#/services/beneficiaryService";
import {
  createDonation,
  getInitials,
  publishDonation,
} from "#/services/donationService";
import { isApiError } from "#/services/errorService";
import { getPartners } from "#/services/partnerService";

export const Route = createFileRoute("/admin/_auth/donation/add")({
  component: DonationAddPage,
});

/**
 * DonationAddPage: Halaman Tambah Donasi Baru (Figma Node 121:3581, 122:3844, 122:4170).
 * Menyediakan form interaktif pembuatan aksi donasi yang terhubung ke API backend,
 * opsi dinamis mitra donatur dan kategori beneficiaries, kartu tips, dan dialog konfirmasi.
 */
function DonationAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const getPartnersFn = useServerFn(getPartners);
  const getBeneficiariesFn = useServerFn(getBeneficiaries);
  const createDonationFn = useServerFn(createDonation);
  const publishDonationFn = useServerFn(publishDonation);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = React.useState(false);

  // Mengambil daftar mitra donatur aktif untuk opsi dropdown
  const sponsorsQuery = useQuery({
    queryKey: ["partners", "options"],
    queryFn: () => getPartnersFn({ data: { limit: 100 } }),
  });

  // Mengambil daftar kategori penerima manfaat untuk opsi multi-select
  const beneficiariesQuery = useQuery({
    queryKey: ["beneficiaries", "options"],
    queryFn: () => getBeneficiariesFn({ data: { page: 1, limit: 100 } }),
  });

  const sponsorOptions = React.useMemo<SponsorOption[]>(() => {
    const raw = sponsorsQuery.data?.data;
    if (!Array.isArray(raw)) return [];
    return raw.map((s) => ({
      id: s.id,
      name: s.name,
      initials: getInitials(s.name),
      category: s.variant === "company" ? "Perusahaan" : "Individu",
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
      title: idDonation.add.title,
      subtitle: idDonation.add.subtitle,
      onBack: handleBackTrigger,
      backLabel: idDonation.add.backLabel,
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, handleBackTrigger]);

  const handleSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);

    try {
      // Temukan ID sponsor terpilih dari nama donatur
      const matchedSponsor = sponsorOptions.find(
        (s) => s.name.toLowerCase() === data.donorName.toLowerCase(),
      );

      const sponsorId = matchedSponsor?.id || (sponsorOptions[0]?.id ?? "");

      if (!sponsorId) {
        toast.error(idDonation.add.toasts.invalidDonor);
        setIsSubmitting(false);
        return;
      }

      const hour = data.pickupHour.padStart(2, "0");
      const minute = data.pickupMinute.padStart(2, "0");
      const eventAt = `${data.pickupDate}T${hour}:${minute}:00+07:00`;
      const quotaNum = Number(data.quota) || 1;

      const createdRes = await createDonationFn({
        data: {
          sponsor_id: sponsorId,
          event_at: eventAt,
          quota: quotaNum,
          hero_quota: quotaNum,
          address: data.location.trim() || undefined,
          maps: data.mapsUrl.trim() || undefined,
          message: data.notes.trim() || undefined,
          hide_from_public: !data.shouldAnnounce,
          hide_sponsor: false,
          foods: [
            {
              food_item_id: 1,
              quantity: quotaNum,
              unit: "portion",
            },
          ],
          beneficiary_category_ids:
            data.beneficiaryIds.length > 0 ? data.beneficiaryIds : undefined,
        },
      });

      // Jika admin mengaktifkan "Umumkan", publikasikan langsung dari draf ke status open
      if (data.shouldAnnounce && createdRes.data.id) {
        try {
          await publishDonationFn({ data: { id: createdRes.data.id } });
        } catch {
          // Tetap lanjutkan jika auto-publish perlu waktu verifikasi
        }
      }

      await queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast.success(idDonation.add.toasts.createSuccess(data.donorName));
      navigate({ to: "/admin/donation" });
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idDonation.add.toasts.createFailed);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200">
      {/* Kolom Kiri: Kartu Formulir Tambah Donasi */}
      <div className="flex-1 min-w-0 w-full">
        <DonationForm
          mode="add"
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
