import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  defaultPartners,
  PartnerFormSkeleton,
  PartnerFormWorkspace,
} from "#/components/pages/partner";
import { useAdminLayout } from "#/routes/admin/_auth";

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
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  // Simulasi loading skeleton selama 3 detik saat awal render
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

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

  const initialData = React.useMemo(() => {
    if (id) {
      const existing = defaultPartners.find((item) => item.id === id);
      if (existing) return existing;
    }
    return defaultPartners[0];
  }, [id]);

  if (isLoading) {
    return <PartnerFormSkeleton />;
  }

  return <PartnerFormWorkspace mode="edit" initialData={initialData} />;
}
