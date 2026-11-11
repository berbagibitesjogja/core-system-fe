import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  defaultDonations,
  defaultEditDonationData,
  DonationForm,
  DonationLeaveDialog,
  DonationTipsCard,
} from "#/components/pages/donation";
import type { DonationFormData } from "#/components/pages/donation";
import { useAdminLayout } from "#/routes/admin/_auth";

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
 * Memuat data donasi terpilih, menyediakan form interaktif dengan status simpan (Menyimpan...),
 * serta dialog konfirmasi jika admin meninggalkan halaman tanpa menyimpan perubahan.
 */
function DonationEditPage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = React.useState(false);

  // Ambil data awal donasi berdasarkan parameter ID (atau fallback ke defaultEditDonationData)
  const initialFormData = React.useMemo<DonationFormData>(() => {
    if (id) {
      const existing = defaultDonations.find((d) => d.id === id);
      if (existing) {
        return {
          id: existing.id,
          donorName: existing.donorName,
          quota: String(existing.quotaTotal),
          pickupDate: existing.isoDate,
          pickupHour: "14",
          pickupMinute: "30",
          duration: "60",
          location: "Pusat Studi Pancasila UGM",
          mapsUrl: "https://maps.app.goo.gl/eesnA6CN5fAQrGfP9",
          beneficiaryIds: ["ben-1"],
          notes: "Bawa wadah sendiri dan tunjukkan voucher di aplikasi.",
          isCsr: existing.program === "CSR",
          shouldAnnounce: true,
        };
      }
    }
    return defaultEditDonationData;
  }, [id]);

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
      title: "Edit Donasi",
      subtitle: "Perbarui informasi aksi donasi",
      onBack: handleBackTrigger,
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, handleBackTrigger]);

  const handleSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);

    try {
      // Simulasi request API penyimpanan perubahan (Figma Node 122:4908)
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success(
        `Perubahan donasi untuk ${data.donorName} berhasil disimpan!`,
      );
      navigate({ to: "/admin/donation" });
    } catch {
      toast.error(
        "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
