import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  buildReimburseDataStats,
  buildReimburseStatusFilterOptions,
  mapReimbursementToDataItem,
  ReimburseCancelDialog,
  ReimburseConfirmPaidDialog,
  ReimburseDataSkeleton,
  ReimburseDataStats,
  ReimburseDataTable,
  ReimburseDataToolbar,
  ReimburseFilePreviewDialog,
  ReimburseTransferProofDialog,
} from "#/components/pages/reimburse";
import type {
  ReimburseDataItem,
  ReimburseDataStatusFilter,
  ReimburseTransferProof,
} from "#/components/pages/reimburse";
import { toast } from "#/components/ui/toast";
import { useUserProfile } from "#/hooks";
import { idReimburse } from "#/locales";
import { isApiError } from "#/services/errorService";
import {
  deleteReimbursement,
  getReimbursements,
  updateReimbursement,
} from "#/services/reimburseService";
import { getVolunteers } from "#/services/volunteerService";

const reimburseDataSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(10),
  status: z.enum(["all", "proses", "selesai"]).catch("all"),
  search: z.string().optional().catch(""),
  role: z
    .enum(["super_admin", "core", "bendahara", "staff"])
    .optional()
    .catch(undefined),
});

type ReimburseDataSearch = z.infer<typeof reimburseDataSearchSchema>;

export const Route = createFileRoute("/admin/_auth/reimburse/data")({
  validateSearch: (search: Record<string, unknown>): ReimburseDataSearch => {
    const rawRole = search.role;
    return reimburseDataSearchSchema.parse({
      page: search.page,
      per_page: search.per_page ?? search.perpage,
      status:
        search.status === "proses" || search.status === "selesai"
          ? search.status
          : "all",
      search: typeof search.search === "string" ? search.search : "",
      role:
        rawRole === "super_admin" ||
        rawRole === "core" ||
        rawRole === "bendahara" ||
        rawRole === "staff"
          ? rawRole
          : undefined,
    });
  },
  component: ReimburseDataPage,
});

function ReimburseDataPage() {
  const navigate = useNavigate();
  const { page, per_page: perPage, status, search, role } = Route.useSearch();
  const searchQuery = search ?? "";

  const profile = useUserProfile();
  const queryClient = useQueryClient();

  const getReimbursementsFn = useServerFn(getReimbursements);
  const updateReimbursementFn = useServerFn(updateReimbursement);
  const deleteReimbursementFn = useServerFn(deleteReimbursement);
  const getVolunteersFn = useServerFn(getVolunteers);

  // Evaluasi hak akses: Super Admin, Core Team, atau Divisi Bendahara
  const isAuthorized =
    profile.isSuperAdmin ||
    profile.isCore ||
    profile.divisionName.toLowerCase().includes("bendahara") ||
    role === "super_admin" ||
    role === "core" ||
    role === "bendahara";

  const canCancel =
    profile.isSuperAdmin ||
    profile.isCore ||
    role === "super_admin" ||
    role === "core";

  const hasRedirectedRef = React.useRef(false);

  React.useEffect(() => {
    if (!profile.isLoading && !isAuthorized && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      toast.error(idReimburse.data.toasts.accessDenied);
      navigate({ to: "/admin/dashboard", replace: true });
    } else if (isAuthorized) {
      hasRedirectedRef.current = false;
    }
  }, [isAuthorized, profile.isLoading, navigate]);

  // Query daftar reimbursement dari backend core-system
  const apiStatus =
    status === "proses"
      ? "pending"
      : status === "selesai"
        ? "completed"
        : undefined;

  const reimbursementsQuery = useQuery({
    queryKey: [
      "reimbursements",
      { page, limit: perPage, status, search: searchQuery },
    ],
    queryFn: () =>
      getReimbursementsFn({
        data: {
          page,
          limit: perPage,
          status: apiStatus,
          search: searchQuery || undefined,
        },
      }),
    enabled: isAuthorized,
  });

  // Query overview reimbursement tanpa filter status/search untuk tab counts dan statistik ringkasan riil
  const allReimbursementsQuery = useQuery({
    queryKey: ["reimbursements", "overview"],
    queryFn: () => getReimbursementsFn({ data: { limit: 100 } }),
    enabled: isAuthorized,
  });

  // Query staf/volunteer untuk pemetaan nama pemohon dan foto profil riil
  const volunteersQuery = useQuery({
    queryKey: ["volunteers", "staff-map"],
    queryFn: () => getVolunteersFn({ data: { limit: 100 } }),
    staleTime: 1000 * 60 * 10,
    enabled: isAuthorized,
  });

  const staffMap = React.useMemo(() => {
    const map = new Map<string, { name: string; avatar?: string }>();
    if (
      volunteersQuery.data &&
      "data" in volunteersQuery.data &&
      Array.isArray(volunteersQuery.data.data)
    ) {
      for (const staff of volunteersQuery.data.data) {
        map.set(staff.user_id, {
          name: staff.name,
          avatar: staff.profile_pic ?? staff.pfp_external_url ?? undefined,
        });
      }
    }
    return map;
  }, [volunteersQuery.data]);

  // Dialog targets
  const [confirmPaidTarget, setConfirmPaidTarget] =
    React.useState<ReimburseDataItem | null>(null);
  const [cancelTarget, setCancelTarget] =
    React.useState<ReimburseDataItem | null>(null);
  const [previewInvoiceItem, setPreviewInvoiceItem] =
    React.useState<ReimburseDataItem | null>(null);
  const [previewTransferItem, setPreviewTransferItem] =
    React.useState<ReimburseDataItem | null>(null);

  const updateSearch = React.useCallback(
    (updater: (prev: ReimburseDataSearch) => Partial<ReimburseDataSearch>) => {
      navigate({
        to: "/admin/reimburse/data",
        search: (prev) => {
          const validRole:
            "super_admin" | "core" | "bendahara" | "staff" | undefined =
            prev.role === "super_admin" ||
            prev.role === "core" ||
            prev.role === "bendahara" ||
            prev.role === "staff"
              ? prev.role
              : undefined;
          const current: ReimburseDataSearch = {
            page: prev.page ?? 1,
            per_page: prev.per_page ?? 10,
            status:
              prev.status === "proses" || prev.status === "selesai"
                ? prev.status
                : "all",
            search: prev.search ?? "",
            role: validRole,
          };
          return {
            ...current,
            ...updater(current),
          };
        },
        replace: true,
      });
    },
    [navigate],
  );

  // Menyusun dataset item tabel
  const items = React.useMemo<ReimburseDataItem[]>(() => {
    if (
      !reimbursementsQuery.data ||
      !("data" in reimbursementsQuery.data) ||
      !Array.isArray(reimbursementsQuery.data.data)
    ) {
      return [];
    }

    return reimbursementsQuery.data.data.map((record) => {
      const staffInfo = staffMap.get(record.user_id);
      const applicantName =
        staffInfo?.name ??
        (profile.user?.id === record.user_id
          ? profile.name
          : `Staf (${record.user_id.slice(0, 8)})`);
      const applicantAvatar = staffInfo?.avatar;
      return mapReimbursementToDataItem(record, applicantName, applicantAvatar);
    });
  }, [reimbursementsQuery.data, staffMap, profile.user?.id, profile.name]);

  // Dataset lengkap reimbursement untuk statistik agregat dan tab filter count riil
  const allItems = React.useMemo<ReimburseDataItem[]>(() => {
    if (
      !allReimbursementsQuery.data ||
      !("data" in allReimbursementsQuery.data) ||
      !Array.isArray(allReimbursementsQuery.data.data)
    ) {
      return items;
    }

    return allReimbursementsQuery.data.data.map((record) => {
      const staffInfo = staffMap.get(record.user_id);
      const applicantName =
        staffInfo?.name ??
        (profile.user?.id === record.user_id
          ? profile.name
          : `Staf (${record.user_id.slice(0, 8)})`);
      const applicantAvatar = staffInfo?.avatar;
      return mapReimbursementToDataItem(record, applicantName, applicantAvatar);
    });
  }, [
    allReimbursementsQuery.data,
    staffMap,
    profile.user?.id,
    profile.name,
    items,
  ]);

  const meta =
    reimbursementsQuery.data && "meta" in reimbursementsQuery.data
      ? reimbursementsQuery.data.meta
      : undefined;

  const totalItems = meta?.total ?? items.length;
  const totalPages = meta?.total_pages ?? 1;
  const safePage = Math.min(page, Math.max(1, totalPages));

  const stats = React.useMemo(
    () => buildReimburseDataStats(allItems),
    [allItems],
  );
  const filterOptions = React.useMemo(
    () => buildReimburseStatusFilterOptions(allItems),
    [allItems],
  );

  const hasActiveFilter = searchQuery.trim().length > 0 || status !== "all";

  const handleStatusChange = (nextStatus: ReimburseDataStatusFilter) => {
    updateSearch(() => ({
      status: nextStatus,
      page: 1,
    }));
  };

  const handleSearchChange = (nextSearch: string) => {
    updateSearch(() => ({
      search: nextSearch,
      page: 1,
    }));
  };

  const handleClearSearch = () => {
    updateSearch(() => ({
      search: "",
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    updateSearch(() => ({
      search: "",
      status: "all",
      page: 1,
    }));
  };

  const handleConfirmPaid = async (_uploadedProof?: ReimburseTransferProof) => {
    if (!confirmPaidTarget) return;

    try {
      await updateReimbursementFn({
        data: {
          id: confirmPaidTarget.id,
          status: "completed",
          paid_at: new Date().toISOString(),
          paid_by: profile.user?.id,
        },
      });

      queryClient.invalidateQueries({ queryKey: ["reimbursements"] });
      queryClient.invalidateQueries({ queryKey: ["my-reimbursements"] });
      setConfirmPaidTarget(null);
      toast.success(idReimburse.data.toasts.confirmPaidSuccess);
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idReimburse.data.toasts.confirmPaidFailed);
      }
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;

    try {
      await deleteReimbursementFn({
        data: {
          id: cancelTarget.id,
        },
      });

      queryClient.invalidateQueries({ queryKey: ["reimbursements"] });
      queryClient.invalidateQueries({ queryKey: ["my-reimbursements"] });
      setCancelTarget(null);
      toast.success(idReimburse.data.toasts.cancelSuccess);
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idReimburse.data.toasts.cancelFailed);
      }
    }
  };

  if (!isAuthorized || reimbursementsQuery.isLoading) {
    return <ReimburseDataSkeleton />;
  }

  return (
    <div className="space-y-6">
      <ReimburseDataStats stats={stats} />

      <ReimburseDataToolbar
        statusFilter={status}
        filterOptions={filterOptions}
        searchQuery={searchQuery}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
      />

      <ReimburseDataTable
        items={items}
        canCancel={canCancel}
        hasActiveFilter={hasActiveFilter}
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={(nextPage) => updateSearch(() => ({ page: nextPage }))}
        onPerPageChange={(nextPerPage) =>
          updateSearch(() => ({ per_page: nextPerPage, page: 1 }))
        }
        onResetFilters={handleResetFilters}
        onPreviewInvoice={(item) => setPreviewInvoiceItem(item)}
        onPreviewTransferProof={(item) => setPreviewTransferItem(item)}
        onRequestConfirmPaid={(item) => setConfirmPaidTarget(item)}
        onRequestCancel={(item) => setCancelTarget(item)}
      />

      <ReimburseConfirmPaidDialog
        item={confirmPaidTarget}
        onClose={() => setConfirmPaidTarget(null)}
        onConfirm={handleConfirmPaid}
      />

      <ReimburseCancelDialog
        item={cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
      />

      <ReimburseFilePreviewDialog
        item={previewInvoiceItem}
        onClose={() => setPreviewInvoiceItem(null)}
      />

      <ReimburseTransferProofDialog
        item={previewTransferItem}
        onClose={() => setPreviewTransferItem(null)}
      />
    </div>
  );
}
