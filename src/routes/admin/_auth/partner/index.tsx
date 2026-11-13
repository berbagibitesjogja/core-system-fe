import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

  const [isLoading, setIsLoading] = React.useState(true);
  const [partners, setPartners] =
    React.useState<PartnerRecord[]>(defaultPartners);
  const [deleteTarget, setDeleteTarget] = React.useState<PartnerRecord | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isCannotDeleteOpen, setIsCannotDeleteOpen] = React.useState(false);

  const userRole: PartnerUserRole = role ?? "super_admin";

  // Simulasi loading awal 3 detik untuk state skeleton halaman Partner
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

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

  const totalCount = filteredPartners.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const safeCurrentPage = Math.min(page, totalPages);
  const paginatedPartners = React.useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * perPage;
    return filteredPartners.slice(startIndex, startIndex + perPage);
  }, [filteredPartners, safeCurrentPage, perPage]);

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

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    window.setTimeout(() => {
      setPartners((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
      toast.success("Donatur berhasil dihapus");
    }, 250);
  };

  if (isLoading) {
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
