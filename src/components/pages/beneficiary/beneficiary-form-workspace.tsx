import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "#/components/ui/toast";
import { useAdminLayout } from "#/routes/admin/_auth";
import { BeneficiaryForm } from "./beneficiary-form";
import { BeneficiaryFormSkeleton } from "./beneficiary-form-skeleton";
import { BeneficiaryLeaveDialog } from "./beneficiary-leave-dialog";
import { BeneficiaryTipsCard } from "./beneficiary-tips-card";
import type { BeneficiaryFormData } from "./beneficiary-data";

export interface BeneficiaryFormWorkspaceProps {
  mode: "add" | "edit";
  headerTitle: string;
  headerSubtitle: string;
  initialData?: Partial<BeneficiaryFormData>;
  isLoading?: boolean;
  getSuccessMessage: (data: BeneficiaryFormData) => string;
  errorMessage: string;
}

/**
 * BeneficiaryFormWorkspace: Orkestrator tata letak bersama untuk halaman Tambah dan Edit Beneficiary.
 * Mengelola header bar kembali, dialog konfirmasi keluar, simulasi simpan, dan sidebar tips.
 */
export function BeneficiaryFormWorkspace({
  mode,
  headerTitle,
  headerSubtitle,
  initialData,
  isLoading = false,
  getSuccessMessage,
  errorMessage,
}: BeneficiaryFormWorkspaceProps) {
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = React.useState(false);

  const handleConfirmLeave = () => {
    setIsLeaveDialogOpen(false);
    navigate({ to: "/admin/beneficiary" });
  };

  const handleBackTrigger = React.useCallback(() => {
    if (isSubmitting) return;
    setIsLeaveDialogOpen(true);
  }, [isSubmitting]);

  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: headerTitle,
      subtitle: headerSubtitle,
      onBack: handleBackTrigger,
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, headerTitle, headerSubtitle, handleBackTrigger]);

  const handleSubmit = async (data: BeneficiaryFormData) => {
    setIsSubmitting(true);

    try {
      // Simulasi request API penyimpanan data beneficiary
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success(getSuccessMessage(data));
      navigate({ to: "/admin/beneficiary" });
    } catch {
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <BeneficiaryFormSkeleton />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Kolom Kiri: Formulir Data Penerima */}
      <div className="flex-1 min-w-0 w-full">
        <BeneficiaryForm
          mode={mode}
          initialData={initialData}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={handleBackTrigger}
        />
      </div>

      {/* Kolom Kanan: Panel Tips Mendaftarkan Penerima */}
      <BeneficiaryTipsCard />

      {/* Modal Konfirmasi Tinggalkan Halaman */}
      <BeneficiaryLeaveDialog
        isOpen={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}
