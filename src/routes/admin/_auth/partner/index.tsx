import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  computePartnerFilterOptions,
  computePartnerStats,
  defaultPartners,
  PartnerCannotDeleteDialog,
  PartnerDeleteDialog,
  PartnerSkeleton,
  PartnerStats,
  PartnerTable,
  PartnerToolbar,
} from "#/components/pages/partner";
import type {
  PartnerCategoryId,
  PartnerRecord,
  PartnerUserRole,
} from "#/components/pages/partner";
import { toast } from "#/components/ui/toast";
import { idPartner } from "#/locales";
import { isApiError } from "#/services/errorService";
import {
  deletePartner,
  getPartners,
  mapSponsorToPartnerRecord,
} from "#/services/partnerService";

// Skema validasi parameter pencarian URL untuk halaman Partner
const partnerSearchSchema = z.object({
  category: z.enum(["all", "perusahaan", "individu"]).optional().catch("all"),
  search: z.string().optional().catch(""),
  sort: z.enum(["desc", "asc"]).optional().catch("desc"),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce.number().int().positive().optional().catch(10),
  role: z.enum(["super_admin", "core", "staff"]).optional().catch(undefined),
});

export const Route = createFileRoute("/admin/_auth/partner/")({
  validateSearch: (search: Record<string, unknown>) =>
    partnerSearchSchema.parse({
      category: search.category,
      search: typeof search.search === "string" ? search.search : "",
      sort: search.sort === "asc" ? "asc" : "desc",
      page: search.page,
      per_page: search.per_page ?? search.perpage,
      role: search.role,
    }),
  component: PartnerPage,
});

function PartnerPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();
  const {
    category = "all",
    search = "",
    sort = "desc",
    page = 1,
    per_page: perPage = 10,
    role,
  } = searchParams;

  const queryClient = useQueryClient();
  const getPartnersFn = useServerFn(getPartners);
  const deletePartnerFn = useServerFn(deletePartner);

  const [deleteTarget, setDeleteTarget] = React.useState<PartnerRecord | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isCannotDeleteOpen, setIsCannotDeleteOpen] = React.useState(false);

  const userRole: PartnerUserRole = role ?? "super_admin";

  const variantFilter =
    category === "all"
      ? undefined
      : category === "perusahaan"
        ? "company"
        : "individual";

  // Pengambilan data daftar donatur dari API backend
  const partnersQuery = useQuery({
    queryKey: ["partners", { page, perPage, search, category }],
    queryFn: async () => {
      return getPartnersFn({
        data: {
          page,
          limit: perPage,
          variant: variantFilter,
          search: search.trim() || undefined,
        },
      });
    },
  });

  // Pemetaan rekaman API backend ke bentuk presentasi PartnerRecord
  const partners = React.useMemo<PartnerRecord[]>(() => {
    const apiRecords = partnersQuery.data?.data;
    if (!Array.isArray(apiRecords)) return defaultPartners;
    return apiRecords.map(mapSponsorToPartnerRecord);
  }, [partnersQuery.data]);

  const stats = React.useMemo(() => computePartnerStats(partners), [partners]);
  const filterOptions = React.useMemo(
    () => computePartnerFilterOptions(partners),
    [partners],
  );
  const maxDonationCount = React.useMemo(
    () =>
      partners.reduce(
        (max, item) => (item.donationCount > max ? item.donationCount : max),
        0,
      ),
    [partners],
  );

  // Filter & urutkan data sesuai URL search params
  const filteredPartners = React.useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return partners
      .filter((partner) => {
        const matchesCategory =
          category === "all" || partner.categoryId === category;
        const matchesSearch =
          !keyword ||
          partner.name.toLowerCase().includes(keyword) ||
          partner.type.toLowerCase().includes(keyword);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) =>
        sort === "asc"
          ? a.donationCount - b.donationCount
          : b.donationCount - a.donationCount,
      );
  }, [partners, category, search, sort]);

  const totalCount = partnersQuery.data?.meta.total ?? filteredPartners.length;
  const totalPages =
    partnersQuery.data?.meta.total_pages ??
    Math.max(1, Math.ceil(totalCount / perPage));
  const safeCurrentPage = Math.min(page, totalPages);
  const paginatedPartners = React.useMemo(() => {
    if (partnersQuery.data?.data) {
      return filteredPartners;
    }
    const startIndex = (safeCurrentPage - 1) * perPage;
    return filteredPartners.slice(startIndex, startIndex + perPage);
  }, [filteredPartners, partnersQuery.data?.data, safeCurrentPage, perPage]);

  const hasActiveFilters = Boolean(search.trim()) || category !== "all";

  const updateSearchParams = React.useCallback(
    (
      updater: (
        prev: z.infer<typeof partnerSearchSchema>,
      ) => z.infer<typeof partnerSearchSchema>,
    ) => {
      navigate({
        to: "/admin/partner",
        search: (prev) => updater(prev),
        replace: true,
      });
    },
    [navigate],
  );

  const handleCategoryChange = (nextCategory: PartnerCategoryId) => {
    updateSearchParams((prev) => ({
      ...prev,
      category: nextCategory,
      page: 1,
    }));
  };

  const handleSearchChange = (nextSearch: string) => {
    updateSearchParams((prev) => ({
      ...prev,
      search: nextSearch,
      page: 1,
    }));
  };

  const handleToggleSort = () => {
    updateSearchParams((prev) => ({
      ...prev,
      sort: prev.sort === "desc" ? "asc" : "desc",
      page: 1,
    }));
  };

  const handlePageChange = (nextPage: number) => {
    updateSearchParams((prev) => ({
      ...prev,
      page: nextPage,
    }));
  };

  const handlePerPageChange = (nextPerPage: number) => {
    updateSearchParams((prev) => ({
      ...prev,
      per_page: nextPerPage,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    updateSearchParams((prev) => ({
      ...prev,
      category: "all",
      search: "",
      page: 1,
    }));
  };

  const handleDeleteTrigger = (partner: PartnerRecord) => {
    setDeleteTarget(partner);
    if (!partner.canDelete) {
      setIsCannotDeleteOpen(true);
    } else {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      await deletePartnerFn({ data: { id: deleteTarget.id } });
      await queryClient.invalidateQueries({ queryKey: ["partners"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success(idPartner.list.toasts.deleteSuccess(deleteTarget.name));
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (err: unknown) {
      if (isApiError(err) && (err.status === 409 || err.code === "CONFLICT")) {
        setIsDeleteDialogOpen(false);
        setIsCannotDeleteOpen(true);
      } else if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idPartner.list.toasts.deleteFailed);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (partnersQuery.isLoading) {
    return <PartnerSkeleton />;
  }

  return (
    <div className="space-y-6 w-full">
      {/* Baris Kartu Ringkasan Metrik Donatur */}
      <PartnerStats stats={stats} />

      {/* Toolbar Filter Kategori, Pencarian, dan Tambah Donatur */}
      <PartnerToolbar
        filterOptions={filterOptions}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        onAddPartner={() => navigate({ to: "/admin/partner/add" })}
      />

      {/* Tabel Data Partner */}
      <PartnerTable
        data={paginatedPartners}
        totalCount={totalCount}
        maxDonationCount={maxDonationCount}
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        sortDirection={sort}
        onToggleSort={handleToggleSort}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
        userRole={userRole}
        onViewDetail={(partner) =>
          navigate({
            to: "/admin/partner/detail",
            search: { id: partner.id },
          })
        }
        onEditPartner={(partner) =>
          navigate({
            to: "/admin/partner/edit",
            search: { id: partner.id },
          })
        }
        onDeletePartner={handleDeleteTrigger}
      />

      {/* Modal Konfirmasi Hapus Donatur */}
      <PartnerDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          if (isDeleting) return;
          setIsDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        partner={deleteTarget}
        isLoading={isDeleting}
      />

      {/* Modal Peringatan Donatur Tidak Dapat Dihapus (409) */}
      <PartnerCannotDeleteDialog
        isOpen={isCannotDeleteOpen}
        onClose={() => {
          setIsCannotDeleteOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
