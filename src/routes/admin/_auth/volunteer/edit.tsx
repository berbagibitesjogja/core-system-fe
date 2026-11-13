import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  defaultEditVolunteerData,
  INITIAL_VOLUNTEER_RECORDS,
  VolunteerFormWorkspace,
} from "#/components/pages/volunteer";
import type { VolunteerFormValues } from "#/components/pages/volunteer";

const volunteerEditSearchSchema = z.object({
  id: z.string().optional().catch(""),
  demo: z
    .enum(["division-error", "duplicate", "none"])
    .optional()
    .catch("none"),
});

export const Route = createFileRoute("/admin/_auth/volunteer/edit")({
  validateSearch: (search: Record<string, unknown>) =>
    volunteerEditSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : "",
      demo:
        search.demo === "division-error" || search.demo === "duplicate"
          ? search.demo
          : "none",
    }),
  component: VolunteerEditPage,
});

/**
 * VolunteerEditPage: Halaman Edit Volunteer.
 */
function VolunteerEditPage() {
  const { id, demo } = Route.useSearch();

  const initialData = React.useMemo<VolunteerFormValues>(() => {
    if (id) {
      const found = INITIAL_VOLUNTEER_RECORDS.find((v) => v.id === id);
      if (found) {
        return {
          division: found.division,
          role: found.role,
          name: found.name,
          email: found.email,
          phone: found.phone,
          address: "Jl. Kaliurang Km 5, Sleman",
        };
      }
    }
    return defaultEditVolunteerData;
  }, [id]);

  return (
    <VolunteerFormWorkspace
      mode="edit"
      initialData={initialData}
      demoState={demo}
    />
  );
}
