import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  BeneficiaryFormWorkspace,
  defaultBeneficiaries,
  defaultEditBeneficiaryData,
} from "#/components/pages/beneficiary";
import type { BeneficiaryFormData } from "#/components/pages/beneficiary";

// Validasi query param id beneficiary yang akan diedit
const editSearchSchema = z.object({
  id: z.string().optional().catch(""),
});

export const Route = createFileRoute("/admin/_auth/beneficiary/edit")({
  validateSearch: (search: Record<string, unknown>) => {
    return editSearchSchema.parse(search);
  },
  component: BeneficiaryEditPage,
});

/**
 * BeneficiaryEditPage: Halaman Edit Beneficiary (Figma 138:12032, 138:12294).
 */
function BeneficiaryEditPage() {
  const { id } = Route.useSearch();

  // Simulasi loading skeleton selama 3 detik saat awal render
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const initialFormData = React.useMemo<BeneficiaryFormData>(() => {
    if (id) {
      const existing = defaultBeneficiaries.find((item) => item.id === id);
      if (existing) {
        return {
          id: existing.id,
          categoryId: existing.categoryId,
          name: existing.name,
        };
      }
    }
    return defaultEditBeneficiaryData;
  }, [id]);

  return (
    <BeneficiaryFormWorkspace
      mode="edit"
      headerTitle="Edit Beneficiary"
      headerSubtitle="Perbarui data penerima manfaat"
      initialData={initialFormData}
      isLoading={isLoading}
      getSuccessMessage={(data) =>
        `Perubahan beneficiary "${data.name}" berhasil disimpan!`
      }
      errorMessage="Gagal menyimpan perubahan. Silakan coba beberapa saat lagi."
    />
  );
}
