import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import { VolunteerForm } from "./volunteer-form";
import { VolunteerLeaveDialog } from "./volunteer-leave-dialog";
import { VolunteerTipsCard } from "./volunteer-tips-card";
import type {
  VolunteerDivisionOption,
  VolunteerFormValues,
} from "./volunteer-data";

export interface VolunteerFormWorkspaceProps {
  mode: "add" | "edit";
  initialData?: Partial<VolunteerFormValues>;
  divisionOptions?: VolunteerDivisionOption[];
  isDivisionError?: boolean;
  isDivisionFetching?: boolean;
  onRetryDivision?: () => void;
  onSubmit: (values: VolunteerFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

/**
 * VolunteerFormWorkspace: Orkestrator tata letak halaman Tambah/Edit Volunteer.
 * Murni presentasional dan menerima handler submit serta opsi data dari rute.
 */
export function VolunteerFormWorkspace({
  mode,
  initialData,
  divisionOptions,
  isDivisionError,
  isDivisionFetching,
  onRetryDivision,
  onSubmit,
  isSubmitting = false,
}: VolunteerFormWorkspaceProps) {
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

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

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Kolom Kiri: Formulir Penempatan & Kontak Volunteer */}
      <div className="flex-1 min-w-0 w-full">
        <VolunteerForm
          mode={mode}
          initialData={initialData}
          divisionOptions={divisionOptions}
          isDivisionError={isDivisionError}
          isDivisionFetching={isDivisionFetching}
          onRetryDivision={onRetryDivision}
          isSubmitting={isSubmitting}
          onCancel={handleRequestLeave}
          onSubmit={onSubmit}
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
