import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import { toast } from "#/components/ui/toast";
import { VolunteerForm } from "./volunteer-form";
import { VolunteerLeaveDialog } from "./volunteer-leave-dialog";
import { VolunteerTipsCard } from "./volunteer-tips-card";
import type { VolunteerFormValues } from "./volunteer-data";

export interface VolunteerFormWorkspaceProps {
  mode: "add" | "edit";
  initialData?: Partial<VolunteerFormValues>;
  demoState?: "division-error" | "duplicate" | "none";
}

/**
 * VolunteerFormWorkspace: Orkestrator tata letak halaman Tambah Volunteer.
 * Form tampil langsung tanpa skeleton (sama seperti halaman Tambah Donasi);
 * skeleton hanya dipakai di halaman detail.
 */
export function VolunteerFormWorkspace({
  mode,
  initialData,
  demoState = "none",
}: VolunteerFormWorkspaceProps) {
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
    navigate({ to: "/admin/volunteer" });
  };

  const headerTitle = mode === "add" ? "Tambah Volunteer" : "Edit Volunteer";
  const headerSubtitle =
    mode === "add"
      ? "Daftarkan anggota baru ke dalam sistem BBJ"
      : "Perbarui informasi akun volunteer";

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

  const handleSubmitSuccess = async (values: VolunteerFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulasi request API penyimpanan volunteer
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success(
        mode === "add"
          ? `Volunteer "${values.name}" berhasil ditambahkan ke daftar Volunteer.`
          : `Perubahan data "${values.name}" berhasil disimpan.`,
      );
      navigate({ to: "/admin/volunteer" });
    } catch {
      toast.error(
        mode === "add"
          ? "Gagal menambahkan volunteer. Silakan coba beberapa saat lagi."
          : "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Kolom Kiri: Formulir Penempatan & Kontak Volunteer */}
      <div className="flex-1 min-w-0 w-full">
        <VolunteerForm
          mode={mode}
          initialData={initialData}
          demoState={demoState}
          isSubmitting={isSubmitting}
          onCancel={handleRequestLeave}
          onSubmit={handleSubmitSuccess}
        />
      </div>

      {/* Kolom Kanan: Panel Tips Menambah Anggota */}
      <VolunteerTipsCard />

      {/* Modal Konfirmasi Tinggalkan Halaman */}
      <VolunteerLeaveDialog
        isOpen={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}
