import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { idBeneficiary } from "#/locales";
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
  onSubmit?: (data: BeneficiaryFormData) => Promise<void> | void;
  getSuccessMessage?: (data: BeneficiaryFormData) => string;
  errorMessage?: string;
}

/**
 * BeneficiaryFormWorkspace: Orkestrator tata letak bersama untuk halaman Tambah dan Edit Beneficiary.
 * Mengelola header bar kembali, dialog konfirmasi keluar, alur submit, dan sidebar tips.
 */
export function BeneficiaryFormWorkspace({
  mode,
  headerTitle,
  headerSubtitle,
  initialData,
  isLoading = false,
  onSubmit,
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
      backLabel: idBeneficiary.form.backLabel,
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, headerTitle, headerSubtitle, handleBackTrigger]);

  const handleSubmit = async (data: BeneficiaryFormData) => {
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(data);
      }
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
