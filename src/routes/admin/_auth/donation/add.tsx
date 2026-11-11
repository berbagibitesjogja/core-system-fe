import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "#/components/ui/toast";
import {
  DonationForm,
  DonationLeaveDialog,
  DonationTipsCard,
} from "#/components/pages/donation";
import type { DonationFormData } from "#/components/pages/donation";
import { useAdminLayout } from "#/routes/admin/_auth";

export const Route = createFileRoute("/admin/_auth/donation/add")({
  component: DonationAddPage,
});

/**
 * DonationAddPage: Halaman Tambah Donasi Baru (Figma Node 121:3581, 122:3844, 122:4170).
 * Menyediakan form interaktif pembuatan aksi donasi, kartu tips pendamping, dan dialog konfirmasi keluar.
 */
function DonationAddPage() {
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = React.useState(false);

  // Navigasi kembali ke daftar donasi
  const handleConfirmLeave = () => {
    setIsLeaveDialogOpen(false);
    navigate({ to: "/admin/donation" });
  };

  const handleBackTrigger = React.useCallback(() => {
    // Tampilkan modal konfirmasi sebelum meninggalkan halaman jika ada form
    setIsLeaveDialogOpen(true);
  }, []);

  // Hubungkan tombol Kembali di Header Top Bar dengan dialog konfirmasi
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: "Tambah Donasi",
      subtitle: "Buat aksi food rescue baru",
      onBack: handleBackTrigger,
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, handleBackTrigger]);

  const handleSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);

    try {
      // Simulasi request API penyimpanan donasi baru
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success(`Donasi untuk ${data.donorName} berhasil ditambahkan!`);
      navigate({ to: "/admin/donation" });
    } catch {
      toast.error("Gagal menambahkan donasi. Silakan coba beberapa saat lagi.");
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
