import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  PartnerFormSkeleton,
  PartnerFormWorkspace,
} from "#/components/pages/partner";
import type { PartnerFormValues } from "#/components/pages/partner";
import { toast } from "#/components/ui/toast";
import { idPartner } from "#/locales";
import { useAdminLayout } from "#/routes/admin/_auth";
import { isApiError } from "#/services/errorService";
import {
  getPartnerDetail,
  mapSponsorToPartnerRecord,
  updatePartner,
} from "#/services/partnerService";

// Skema validasi query param id donatur yang akan diedit
const partnerEditSearchSchema = z.object({
  id: z.string().optional().catch(""),
});

export const Route = createFileRoute("/admin/_auth/partner/edit")({
  validateSearch: (search: Record<string, unknown>) =>
    partnerEditSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : "",
    }),
  component: PartnerEditPage,
});

/**
 * PartnerEditPage: Halaman Edit Donatur / Partner (Figma 143:14420).
 */
function PartnerEditPage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const queryClient = useQueryClient();
  const getPartnerDetailFn = useServerFn(getPartnerDetail);
  const updatePartnerFn = useServerFn(updatePartner);

  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const trimmedId = (id ?? "").trim();

  // Mengambil detail sponsor dari API backend
  const partnerQuery = useQuery({
    queryKey: ["partner-detail", trimmedId],
    queryFn: async () => {
      if (!trimmedId) return null;
      return getPartnerDetailFn({ data: { id: trimmedId } });
    },
    enabled: Boolean(trimmedId),
  });

  React.useEffect(() => {
    if (!trimmedId) {
      toast.error("ID mitra donatur tidak ditemukan.");
      navigate({ to: "/admin/partner" });
    }
  }, [trimmedId, navigate]);

  React.useEffect(() => {
    if (partnerQuery.isError) {
      toast.error("Data mitra donatur tidak ditemukan.");
      navigate({ to: "/admin/partner" });
    }
  }, [partnerQuery.isError, navigate]);

  const apiRecord = partnerQuery.data?.data;
  const initialData = React.useMemo(() => {
    if (apiRecord) {
      return mapSponsorToPartnerRecord(apiRecord);
    }
    return null;
  }, [apiRecord]);

  const isLoading = partnerQuery.isLoading || !initialData;

  // Pasang header "Edit Donatur" selama skeleton loading tampil
  React.useEffect(() => {
    if (!isLoading || !setHeaderOverride) return;

    setHeaderOverride({
      title: "Edit Donatur",
      subtitle: "Perbarui profil mitra penyumbang makanan",
      backLabel: "Kembali",
      onBack: () => navigate({ to: "/admin/partner" }),
    });

    return () => setHeaderOverride(null);
  }, [isLoading, setHeaderOverride, navigate]);

  const handleSubmit = async (values: PartnerFormValues) => {
    try {
      const targetId = trimmedId || initialData?.id || "";
      await updatePartnerFn({
        data: {
          id: targetId,
          name: values.name.trim(),
          variant: values.category === "perusahaan" ? "company" : "individual",
          address: values.address.trim() || null,
          email: values.email.trim() || null,
          phone: values.phone.trim() || null,
          hidden: Boolean(values.hidden),
          hide_donations: Boolean(values.hide_donations),
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["partners"] });
      await queryClient.invalidateQueries({
        queryKey: ["partner-detail", targetId],
      });
      toast.success(idPartner.edit.toasts.updateSuccess(values.name.trim()));
      navigate({ to: "/admin/partner" });
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idPartner.edit.toasts.updateFailed);
      }
    }
  };

  if (isLoading) {
    return <PartnerFormSkeleton />;
  }

  return (
    <PartnerFormWorkspace
      mode="edit"
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
