import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { BeneficiaryFormWorkspace } from "#/components/pages/beneficiary";
import type { BeneficiaryFormData } from "#/components/pages/beneficiary";
import { toast } from "#/components/ui/toast";
import { idBeneficiary } from "#/locales";
import {
  createBeneficiary,
  mapCategoryIdToVariant,
} from "#/services/beneficiaryService";
import { isApiError } from "#/services/errorService";

export const Route = createFileRoute("/admin/_auth/beneficiary/add")({
  component: BeneficiaryAddPage,
});

/**
 * BeneficiaryAddPage: Halaman Tambah Beneficiary (Figma 138:11321, 138:11734).
 */
function BeneficiaryAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createBeneficiaryFn = useServerFn(createBeneficiary);

  const handleSubmit = async (values: BeneficiaryFormData) => {
    try {
      await createBeneficiaryFn({
        data: {
          name: values.name.trim(),
          variant: mapCategoryIdToVariant(
            values.categoryId || "masyarakat-umum",
          ),
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success(idBeneficiary.add.toasts.createSuccess(values.name.trim()));
      navigate({ to: "/admin/beneficiary" });
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idBeneficiary.add.toasts.createFailed);
      }
    }
  };

  return (
    <BeneficiaryFormWorkspace
      mode="add"
      headerTitle={idBeneficiary.add.title}
      headerSubtitle={idBeneficiary.add.subtitle}
      onSubmit={handleSubmit}
    />
  );
}
