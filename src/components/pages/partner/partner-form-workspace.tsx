import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "#/components/ui/toast";
import { useAdminLayout } from "#/routes/admin/_auth";
import { PartnerForm } from "./partner-form";
import { PartnerLeaveDialog } from "./partner-leave-dialog";
import { PartnerTipsCard } from "./partner-tips-card";
import type { PartnerFormValues, PartnerRecord } from "./partner-data";

export interface PartnerFormWorkspaceProps {
  mode: "add" | "edit";
  initialData?: PartnerRecord;
}

/**
 * PartnerFormWorkspace: Orkestrator tata letak bersama untuk halaman Tambah dan Edit Donatur.
 * Mengelola override header kembali, dialog konfirmasi keluar, notifikasi toast, dan panel tips.
 */
export function PartnerFormWorkspace({
  mode,
  initialData,
}: PartnerFormWorkspaceProps) {
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = React.useState(false);

  const handleRequestLeave = React.useCallback(() => {
    if (isSubmitting) return;
    setIsLeaveDialogOpen(true);
  }, [isSubmitting]);

  const handleConfirmLeave = () => {
    setIsLeaveDialogOpen(false);
    navigate({ to: "/admin/partner" });
  };

  const headerTitle = mode === "add" ? "Tambah Donatur" : "Edit Donatur";
  const headerSubtitle =
    mode === "add"
      ? "Daftarkan mitra penyumbang makanan baru"
      : "Perbarui profil mitra penyumbang makanan";

  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: headerTitle,
      subtitle: headerSubtitle,
      backLabel: "Kembali",
      onBack: handleRequestLeave,
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, headerTitle, headerSubtitle, handleRequestLeave]);

  const handleSubmitSuccess = async (values: PartnerFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulasi request API penyimpanan data donatur
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success(
        mode === "add"
          ? `Donatur "${values.name}" berhasil ditambahkan ke daftar Partner.`
          : `Perubahan data "${values.name}" berhasil disimpan.`,
      );
      navigate({ to: "/admin/partner" });
    } catch {
      toast.error(
        mode === "add"
          ? "Gagal menambahkan donatur. Silakan coba beberapa saat lagi."
          : "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Kolom Kiri: Formulir Identitas & Kontak Donatur */}
      <div className="flex-1 min-w-0 w-full">
        <PartnerForm
          mode={mode}
          initialData={initialData}
          isSubmitting={isSubmitting}
          onCancel={handleRequestLeave}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </div>

      {/* Kolom Kanan: Panel Tips Mendaftarkan Donatur */}
      <PartnerTipsCard />

      {/* Modal Konfirmasi Tinggalkan Halaman */}
      <PartnerLeaveDialog
        isOpen={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}
