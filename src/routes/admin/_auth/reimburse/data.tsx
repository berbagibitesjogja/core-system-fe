import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  buildReimburseDataStats,
  buildReimburseStatusFilterOptions,
  canCancelReimburseByRole,
  createDefaultTransferProof,
  getReimburseDataInitialItems,
  isReimburseDataAuthorized,
  REIMBURSE_ACCESS_DENIED_MESSAGE,
  REIMBURSE_CANCEL_SUCCESS_TOAST,
  REIMBURSE_PAID_SUCCESS_TOAST,
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
  ReimburseDataDemoState,
  ReimburseDataItem,
  ReimburseDataRole,
  ReimburseDataStatusFilter,
  ReimburseTransferProof,
} from "#/components/pages/reimburse";

const reimburseDataSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(10),
  status: z.enum(["all", "proses", "selesai"]).catch("all"),
  search: z.string().optional().catch(""),
  role: z
    .enum(["super_admin", "core", "bendahara", "staff"])
    .catch("super_admin"),
  demo: z.enum(["default", "paid", "empty"]).optional().catch(undefined),
});

type ReimburseDataSearch = z.infer<typeof reimburseDataSearchSchema>;

export const Route = createFileRoute("/admin/_auth/reimburse/data")({
  validateSearch: (search: Record<string, unknown>): ReimburseDataSearch => {
    const rawRole = search.role;
    const rawDemo = search.demo;
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
          : "super_admin",
      demo:
        rawDemo === "default" || rawDemo === "paid" || rawDemo === "empty"
          ? rawDemo
          : undefined,
    });
  },
  component: ReimburseDataPage,
});

function ReimburseDataPage() {
  const navigate = useNavigate();
  const {
    page,
    per_page: perPage,
    status,
    search,
    role,
    demo,
  } = Route.useSearch();
  const searchQuery = search ?? "";

  // TODO: Integrasikan role pengguna dari sesi autentikasi backend setelah endpoint auth tersedia
  const currentRole: ReimburseDataRole = role;
  const isAuthorized = isReimburseDataAuthorized(currentRole);
  const canCancel = canCancelReimburseByRole(currentRole);
  const hasRedirectedRef = React.useRef(false);

  const [items, setItems] = React.useState<ReimburseDataItem[]>(() =>
    getReimburseDataInitialItems(demo),
  );
  const [confirmPaidTarget, setConfirmPaidTarget] =
    React.useState<ReimburseDataItem | null>(null);
  const [cancelTarget, setCancelTarget] =
    React.useState<ReimburseDataItem | null>(null);
  const [previewInvoiceItem, setPreviewInvoiceItem] =
    React.useState<ReimburseDataItem | null>(null);
  const [previewTransferItem, setPreviewTransferItem] =
    React.useState<ReimburseDataItem | null>(null);

  const itemsRef = React.useRef(items);
  itemsRef.current = items;

  React.useEffect(() => {
    setItems(getReimburseDataInitialItems(demo));
  }, [demo]);

  // Bersihkan object URL bukti transfer lokal saat unmount
  React.useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        const proofUrl = item.transferProof?.filePreviewUrl;
        if (proofUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(proofUrl);
        }
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isAuthorized && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      toast.error(REIMBURSE_ACCESS_DENIED_MESSAGE);
      navigate({ to: "/admin/dashboard", replace: true });
    } else if (isAuthorized) {
      hasRedirectedRef.current = false;
    }
  }, [isAuthorized, navigate]);

  const updateSearch = React.useCallback(
    (
      updater: (
        prev: ReimburseDataSearch,
      ) => Partial<ReimburseDataSearch> & { demo?: ReimburseDataDemoState },
    ) => {
      navigate({
        to: "/admin/reimburse/data",
        search: (prev) => {
          const validDemo =
            prev.demo === "default" ||
            prev.demo === "paid" ||
            prev.demo === "empty"
              ? prev.demo
              : undefined;
          const current: ReimburseDataSearch = {
            page: prev.page ?? 1,
            per_page: prev.per_page ?? 10,
            status:
              prev.status === "proses" || prev.status === "selesai"
                ? prev.status
                : "all",
            search: prev.search ?? "",
            role:
              prev.role === "super_admin" ||
              prev.role === "core" ||
              prev.role === "bendahara" ||
              prev.role === "staff"
                ? prev.role
                : "super_admin",
            demo: validDemo,
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

  const stats = React.useMemo(() => buildReimburseDataStats(items), [items]);
  const filterOptions = React.useMemo(
    () => buildReimburseStatusFilterOptions(items),
    [items],
  );

  const filteredItems = React.useMemo(() => {
    if (demo === "empty") return [];

    const normalizedQuery = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (status === "proses" && item.status !== "Proses") return false;
      if (status === "selesai" && item.status !== "Selesai") return false;
      if (!normalizedQuery) return true;

      return (
        item.applicantName.toLowerCase().includes(normalizedQuery) ||
        item.note.toLowerCase().includes(normalizedQuery) ||
        item.method.toLowerCase().includes(normalizedQuery) ||
        item.destinationNumber.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [demo, items, searchQuery, status]);

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(page, totalPages);

  const paginatedItems = React.useMemo(() => {
    const startIndex = (safePage - 1) * perPage;
    return filteredItems.slice(startIndex, startIndex + perPage);
  }, [filteredItems, perPage, safePage]);

  const hasActiveFilter =
    searchQuery.trim().length > 0 || status !== "all" || demo === "empty";

  const handleStatusChange = (nextStatus: ReimburseDataStatusFilter) => {
    updateSearch(() => ({
      status: nextStatus,
      page: 1,
      demo: demo === "empty" ? undefined : demo,
    }));
  };

  const handleSearchChange = (nextSearch: string) => {
    updateSearch(() => ({
      search: nextSearch,
      page: 1,
      demo: demo === "empty" ? undefined : demo,
    }));
  };

  const handleClearSearch = () => {
    updateSearch(() => ({
      search: "",
      page: 1,
      demo: demo === "empty" ? undefined : demo,
    }));
  };

  const handleResetFilters = () => {
    updateSearch(() => ({
      search: "",
      status: "all",
      page: 1,
      demo: undefined,
    }));
  };

  const handleConfirmPaid = (uploadedProof?: ReimburseTransferProof) => {
    if (!confirmPaidTarget) return;

    const targetId = confirmPaidTarget.id;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== targetId) return item;
        return {
          ...item,
          status: "Selesai",
          isNewlyCompleted: true,
          transferProof:
            uploadedProof ??
            item.transferProof ??
            createDefaultTransferProof(item),
        };
      }),
    );

    setConfirmPaidTarget(null);
    toast.success(REIMBURSE_PAID_SUCCESS_TOAST);
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    const targetId = cancelTarget.id;
    const proofUrl = cancelTarget.transferProof?.filePreviewUrl;
    if (proofUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(proofUrl);
    }

    setItems((prev) => prev.filter((item) => item.id !== targetId));
    setCancelTarget(null);
    toast.success(REIMBURSE_CANCEL_SUCCESS_TOAST);
  };

  if (!isAuthorized) {
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
        items={paginatedItems}
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
