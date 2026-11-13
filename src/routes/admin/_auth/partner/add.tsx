import { createFileRoute } from "@tanstack/react-router";
import { PartnerFormWorkspace } from "#/components/pages/partner";

export const Route = createFileRoute("/admin/_auth/partner/add")({
  component: PartnerAddPage,
});

/**
 * PartnerAddPage: Halaman Tambah Donatur / Partner (Figma 143:13561, 143:13873, 143:14149).
 */
function PartnerAddPage() {
  return <PartnerFormWorkspace mode="add" />;
}
