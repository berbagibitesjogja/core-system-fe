import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VolunteerFormWorkspace } from "#/components/pages/volunteer";

const volunteerAddSearchSchema = z.object({
  demo: z
    .enum(["division-error", "duplicate", "none"])
    .optional()
    .catch("none"),
});

export const Route = createFileRoute("/admin/_auth/volunteer/add")({
  validateSearch: (search: Record<string, unknown>) =>
    volunteerAddSearchSchema.parse({
      demo:
        search.demo === "division-error" || search.demo === "duplicate"
          ? search.demo
          : "none",
    }),
  component: VolunteerAddPage,
});

/**
 * VolunteerAddPage: Halaman Tambah Volunteer (Figma 150:20833, 150:21212, 150:21549).
 */
function VolunteerAddPage() {
  const { demo } = Route.useSearch();
  return <VolunteerFormWorkspace mode="add" demoState={demo} />;
}
