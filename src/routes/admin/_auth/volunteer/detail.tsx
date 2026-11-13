import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  INITIAL_VOLUNTEER_RECORDS,
  VolunteerDetailWorkspace,
} from "#/components/pages/volunteer";
import type {
  VolunteerDetailTabKey,
  VolunteerUserRole,
} from "#/components/pages/volunteer";

// Skema validasi query param URL untuk halaman detail volunteer
const volunteerDetailSearchSchema = z.object({
  id: z.string().optional().catch(""),
  tab: z.enum(["activity", "settings"]).optional().catch(undefined),
  role: z.enum(["super_admin", "core", "staff"]).optional().catch(undefined),
});

export const Route = createFileRoute("/admin/_auth/volunteer/detail")({
  validateSearch: (search: Record<string, unknown>) =>
    volunteerDetailSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : "",
      tab: typeof search.tab === "string" ? search.tab : undefined,
      role: typeof search.role === "string" ? search.role : undefined,
    }),
  component: VolunteerDetailPage,
});

/**
 * VolunteerDetailPage: Halaman Detail Volunteer (Figma 151:21395 - 151:22876).
 */
function VolunteerDetailPage() {
  const { id, tab, role } = Route.useSearch();

  // Cari data volunteer berdasarkan query id, atau fallback ke Fauzan Trisuladana (Figma 151:21395)
  const volunteer = React.useMemo(() => {
    if (id) {
      const match = INITIAL_VOLUNTEER_RECORDS.find((v) => v.id === id);
      if (match) return match;
    }
    // Fallback ke Fauzan Trisuladana (vol-2)
    return (
      INITIAL_VOLUNTEER_RECORDS.find((v) => v.id === "vol-2") ??
      INITIAL_VOLUNTEER_RECORDS[0]
    );
  }, [id]);

  const userRole: VolunteerUserRole = role ?? "super_admin";
  const initialTab: VolunteerDetailTabKey =
    tab === "settings" ? "settings" : "activity";

  return (
    <VolunteerDetailWorkspace
      volunteer={volunteer}
      userRole={userRole}
      initialTab={initialTab}
    />
  );
}
