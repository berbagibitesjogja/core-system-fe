import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  getDivisionIdByName,
  mapDivisionsToFormOptions,
  VolunteerDetailSkeleton,
  VolunteerDetailWorkspace,
} from "#/components/pages/volunteer";
import type {
  VolunteerDetailTabKey,
  VolunteerFormValues,
  VolunteerRecord,
  VolunteerUserRole,
} from "#/components/pages/volunteer";
import { getDivisions } from "#/services/divisionService";
import {
  deleteVolunteerStaff,
  getVolunteerDetail,
  mapStaffToVolunteerRecord,
  updateVolunteerStaff,
} from "#/services/volunteerService";
import { useUserProfile } from "#/hooks";
import { toast } from "#/components/ui/toast";
import { idVolunteer } from "#/locales";
import { isApiError } from "#/services/errorService";

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
 * Seluruh Server Function dipusatkan di berkas rute.
 */
function VolunteerDetailPage() {
  const { id, tab, role } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profile = useUserProfile();

  const getVolunteerDetailFn = useServerFn(getVolunteerDetail);
  const getDivisionsFn = useServerFn(getDivisions);
  const updateVolunteerStaffFn = useServerFn(updateVolunteerStaff);
  const deleteVolunteerStaffFn = useServerFn(deleteVolunteerStaff);

  const targetId = id || profile.user?.id || "";

  const volunteerDetailQuery = useQuery({
    queryKey: ["volunteer-detail", targetId],
    queryFn: () => getVolunteerDetailFn({ data: { id: targetId } }),
    enabled: Boolean(targetId),
  });

  const divisionsQuery = useQuery({
    queryKey: ["divisions"],
    queryFn: () => getDivisionsFn(),
  });

  const divisionList = divisionsQuery.data?.data ?? [];
  const divisionOptions = React.useMemo(
    () => mapDivisionsToFormOptions(divisionList),
    [divisionList],
  );

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [blockedDeleteTarget, setBlockedDeleteTarget] =
    React.useState<VolunteerRecord | null>(null);

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

  const handleSaveProfile = async (values: VolunteerFormValues) => {
    setIsSaving(true);
    try {
      const backendRole: "super" | "core" | "staff" =
        values.role === "super"
          ? "super"
          : values.role === "core"
            ? "core"
            : "staff";

      const divisionId =
        getDivisionIdByName(values.division, divisionList) ?? 3;

      await updateVolunteerStaffFn({
        data: {
          id: targetId,
          role: backendRole,
          division_id: divisionId,
        },
      });

      // Mengedaluwarsakan seluruh query terkait pasca perubahan data
      await queryClient.invalidateQueries({
        queryKey: ["volunteer-detail", targetId],
      });
      await queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      await queryClient.invalidateQueries({ queryKey: ["divisions"] });

      toast.success(idVolunteer.detail.toasts.updateSuccess(values.name));
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      } else {
        toast.error(idVolunteer.detail.toasts.updateFailed);
      }
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVolunteer = async (target: VolunteerRecord) => {
    setIsDeleting(true);
    try {
      await deleteVolunteerStaffFn({ data: { id: target.id } });
      await queryClient.invalidateQueries({ queryKey: ["volunteers"] });

      toast.success(idVolunteer.detail.toasts.deleteSuccess(target.name));
      navigate({ to: "/admin/volunteer" });
    } catch (error) {
      if (
        isApiError(error) &&
        (error.code === "ROLE_LAST_SUPER" ||
          error.status === 400 ||
          error.status === 409)
      ) {
        setBlockedDeleteTarget(target);
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : idVolunteer.detail.toasts.deleteFailed,
        );
      }
    } finally {
      setIsDeleting(false);
    }
  };

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
      divisionOptions={divisionOptions}
      onSaveProfile={handleSaveProfile}
      onDeleteVolunteer={handleDeleteVolunteer}
      isSaving={isSaving}
      isDeleting={isDeleting}
      blockedDeleteTarget={blockedDeleteTarget}
      onClearBlockedDelete={() => setBlockedDeleteTarget(null)}
    />
  );
}
