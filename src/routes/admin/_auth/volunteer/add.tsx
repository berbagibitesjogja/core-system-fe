import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "#/components/ui/toast";
import {
  getDivisionIdByName,
  mapDivisionsToFormOptions,
  VolunteerFormWorkspace,
} from "#/components/pages/volunteer";
import type { VolunteerFormValues } from "#/components/pages/volunteer";
import { getDivisions } from "#/services/divisionService";
import { createVolunteerInvitation } from "#/services/volunteerService";
import { idVolunteer } from "#/locales";
import { isApiError } from "#/services/errorService";

export const Route = createFileRoute("/admin/_auth/volunteer/add")({
  component: VolunteerAddPage,
});

/**
 * VolunteerAddPage: Halaman Tambah Volunteer (Figma 150:20833, 150:21212, 150:21549).
 * Seluruh pemanggilan Server Function dipusatkan di berkas rute.
 */
function VolunteerAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getDivisionsFn = useServerFn(getDivisions);
  const createVolunteerInvitationFn = useServerFn(createVolunteerInvitation);

  const divisionsQuery = useQuery({
    queryKey: ["divisions"],
    queryFn: () => getDivisionsFn(),
  });

  const divisionList = divisionsQuery.data?.data ?? [];
  const divisionOptions = React.useMemo(
    () => mapDivisionsToFormOptions(divisionList),
    [divisionList],
  );

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (values: VolunteerFormValues) => {
    setIsSubmitting(true);
    try {
      const backendRole: "super" | "core" | "staff" =
        values.role === "super"
          ? "super"
          : values.role === "core"
            ? "core"
            : "staff";

      const divisionId =
        getDivisionIdByName(values.division, divisionList) ?? 3;

      await createVolunteerInvitationFn({
        data: {
          email: values.email.trim(),
          role: backendRole,
          division_id: divisionId,
          name: values.name.trim() || undefined,
          phone_number: values.phone.trim() || undefined,
        },
      });

      // Wajib mengedaluwarsakan query terkait pasca perubahan data
      await queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      await queryClient.invalidateQueries({ queryKey: ["divisions"] });
      toast.success(idVolunteer.add.toasts.inviteSuccess(values.name));
      navigate({ to: "/admin/volunteer" });
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      } else {
        toast.error(idVolunteer.add.toasts.inviteFailed);
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VolunteerFormWorkspace
      mode="add"
      divisionOptions={divisionOptions}
      isDivisionError={divisionsQuery.isError}
      isDivisionFetching={divisionsQuery.isFetching}
      onRetryDivision={() => divisionsQuery.refetch()}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
