import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import { toast } from "#/components/ui/toast";
import { VolunteerForm } from "./volunteer-form";
import { VolunteerLeaveDialog } from "./volunteer-leave-dialog";
import { VolunteerTipsCard } from "./volunteer-tips-card";
import { DIVISION_NAME_TO_ID } from "./volunteer-data";
import type { VolunteerFormValues } from "./volunteer-data";
import { createVolunteerInvitation } from "#/services/volunteerService";
import { idVolunteer } from "#/locales";
import { isApiError } from "#/services/errorService";

export interface VolunteerFormWorkspaceProps {
  mode: "add" | "edit";
  initialData?: Partial<VolunteerFormValues>;
  demoState?: "division-error" | "duplicate" | "none";
}

/**
 * VolunteerFormWorkspace: Orkestrator tata letak halaman Tambah Volunteer.
 * Form terhubung langsung ke Server Function pembuatan undangan dan mengedaluwarsakan
 * query cache saat data berhasil disimpan.
 */
export function VolunteerFormWorkspace({
  mode,
  initialData,
  demoState = "none",
}: VolunteerFormWorkspaceProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const createVolunteerInvitationFn = useServerFn(createVolunteerInvitation);

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
      if (mode === "add") {
        // Petakan role form ke role backend ('super' | 'core' | 'staff')
        const backendRole: "super" | "core" | "staff" =
          values.role === "super"
            ? "super"
            : values.role === "core"
              ? "core"
              : "staff";

        const divisionId = DIVISION_NAME_TO_ID[values.division] ?? 3;

        await createVolunteerInvitationFn({
          data: {
            email: values.email.trim(),
            role: backendRole,
            division_id: divisionId,
            name: values.name.trim() || undefined,
            phone_number: values.phone.trim() || undefined,
          },
        });

        // Wajib mengedaluwarsakan seluruh query terkait pasca perubahan data
        await queryClient.invalidateQueries({ queryKey: ["volunteers"] });
        toast.success(idVolunteer.add.toasts.inviteSuccess(values.name));
      } else {
        await queryClient.invalidateQueries({ queryKey: ["volunteers"] });
        toast.success(`Perubahan data "${values.name}" berhasil disimpan.`);
      }

      navigate({ to: "/admin/volunteer" });
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      } else {
        toast.error(
          mode === "add"
            ? idVolunteer.add.toasts.inviteFailed
            : "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
        );
      }
      throw error;
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
