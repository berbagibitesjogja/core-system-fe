import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  BeneficiaryFormWorkspace,
  defaultBeneficiaries,
  defaultEditBeneficiaryData,
} from "#/components/pages/beneficiary";
import type { BeneficiaryFormData } from "#/components/pages/beneficiary";
import { toast } from "#/components/ui/toast";
import { idBeneficiary } from "#/locales";
import {
  getBeneficiaryDetail,
  mapCategoryIdToVariant,
  mapCategoryToBeneficiaryFormData,
  updateBeneficiary,
} from "#/services/beneficiaryService";
import { isApiError } from "#/services/errorService";

// Validasi query param id beneficiary yang akan diedit
const editSearchSchema = z.object({
  id: z.string().optional().catch(""),
});

export const Route = createFileRoute("/admin/_auth/beneficiary/edit")({
  validateSearch: (search: Record<string, unknown>) => {
    return editSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : "",
    });
  },
  component: BeneficiaryEditPage,
});

/**
 * BeneficiaryEditPage: Halaman Edit Beneficiary (Figma 138:12032, 138:12294).
 */
function BeneficiaryEditPage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const queryClient = useQueryClient();
  const getBeneficiaryDetailFn = useServerFn(getBeneficiaryDetail);
  const updateBeneficiaryFn = useServerFn(updateBeneficiary);

  // Mengambil detail kategori penerima manfaat dari API backend
  const beneficiaryQuery = useQuery({
    queryKey: ["beneficiary-detail", id],
    queryFn: async () => {
      if (!id) return null;
      return getBeneficiaryDetailFn({ data: { id } });
    },
    enabled: Boolean(id),
  });

  const isLoading = beneficiaryQuery.isLoading;

  const initialFormData = React.useMemo<BeneficiaryFormData>(() => {
    const apiRecord = beneficiaryQuery.data?.data;
    if (apiRecord) {
      return mapCategoryToBeneficiaryFormData(apiRecord);
    }
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
  }, [beneficiaryQuery.data, id]);

  const handleSubmit = async (values: BeneficiaryFormData) => {
    try {
      const targetId = id || initialFormData.id || "";
      await updateBeneficiaryFn({
        data: {
          id: targetId,
          name: values.name.trim(),
          variant: values.categoryId
            ? mapCategoryIdToVariant(values.categoryId)
            : undefined,
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
      await queryClient.invalidateQueries({
        queryKey: ["beneficiary-detail", targetId],
      });
      toast.success(
        idBeneficiary.edit.toasts.updateSuccess(values.name.trim()),
      );
      navigate({ to: "/admin/beneficiary" });
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idBeneficiary.edit.toasts.updateFailed);
      }
    }
  };

  return (
    <BeneficiaryFormWorkspace
      mode="edit"
      headerTitle={idBeneficiary.edit.title}
      headerSubtitle={idBeneficiary.edit.subtitle}
      initialData={initialFormData}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
}
