import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PartnerFormWorkspace } from "#/components/pages/partner";
import type { PartnerFormValues } from "#/components/pages/partner";
import { toast } from "#/components/ui/toast";
import { idPartner } from "#/locales";
import { isApiError } from "#/services/errorService";
import { createPartner } from "#/services/partnerService";

export const Route = createFileRoute("/admin/_auth/partner/add")({
  component: PartnerAddPage,
});

/**
 * PartnerAddPage: Halaman Tambah Donatur / Partner (Figma 143:13561, 143:13873, 143:14149).
 */
function PartnerAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createPartnerFn = useServerFn(createPartner);

  const handleSubmit = async (values: PartnerFormValues) => {
    try {
      await createPartnerFn({
        data: {
          name: values.name.trim(),
          variant: values.category === "perusahaan" ? "company" : "individual",
          address: values.address.trim() || null,
          email: values.email.trim() || null,
          phone: values.phone.trim() || null,
          logo: null,
          hidden: Boolean(values.hidden),
          hide_donations: Boolean(values.hide_donations),
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success(idPartner.add.toasts.createSuccess(values.name.trim()));
      navigate({ to: "/admin/partner" });
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idPartner.add.toasts.createFailed);
      }
    }
  };

  return <PartnerFormWorkspace mode="add" onSubmit={handleSubmit} />;
}
