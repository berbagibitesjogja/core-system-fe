import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  VolunteerDetailSkeleton,
  VolunteerDetailWorkspace,
} from "#/components/pages/volunteer";
import type {
  VolunteerDetailTabKey,
  VolunteerRecord,
  VolunteerUserRole,
} from "#/components/pages/volunteer";
import {
  getVolunteerDetail,
  mapStaffToVolunteerRecord,
} from "#/services/volunteerService";
import { useUserProfile } from "#/hooks";
import { toast } from "#/components/ui/toast";

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
 * Menggunakan TanStack Query untuk pemanggilan data riil berdasarkan ID anggota.
 */
function VolunteerDetailPage() {
  const { id, tab, role } = Route.useSearch();
  const navigate = useNavigate();
  const profile = useUserProfile();
  const getVolunteerDetailFn = useServerFn(getVolunteerDetail);

  const targetId = id || profile.user?.id || "";

  const volunteerDetailQuery = useQuery({
    queryKey: ["volunteer-detail", targetId],
    queryFn: () => getVolunteerDetailFn({ data: { id: targetId } }),
    enabled: Boolean(targetId),
  });

  const userRole: VolunteerUserRole = role ?? profile.sidebarRole;
  const initialTab: VolunteerDetailTabKey =
    tab === "settings" ? "settings" : "activity";

  React.useEffect(() => {
    if (!targetId && !profile.isLoading) {
      toast.error("ID anggota tidak ditemukan.");
      navigate({ to: "/admin/volunteer" });
    }
  }, [targetId, profile.isLoading, navigate]);

  React.useEffect(() => {
    if (volunteerDetailQuery.isError) {
      toast.error("Data anggota staf tidak ditemukan.");
      navigate({ to: "/admin/volunteer" });
    }
  }, [volunteerDetailQuery.isError, navigate]);

  if (volunteerDetailQuery.isLoading || !volunteerDetailQuery.data?.data) {
    return (
      <VolunteerDetailSkeleton
        showActivityTab={userRole === "super_admin"}
        showDangerZone={userRole === "super_admin" || userRole === "core"}
      />
    );
  }

  const volunteer: VolunteerRecord = mapStaffToVolunteerRecord(
    volunteerDetailQuery.data.data,
  );

  return (
    <VolunteerDetailWorkspace
      volunteer={volunteer}
      userRole={userRole}
      initialTab={initialTab}
      isLoading={false}
    />
  );
}
