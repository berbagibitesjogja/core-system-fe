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
import { Alert } from "#/components/ui/alert";

// Skema validasi parameter pencarian URL untuk halaman Partner
const partnerSearchSchema = z.object({
  category: z.enum(["all", "perusahaan", "individu"]).catch("all"),
  search: z.string().optional().catch(""),
  sort: z.enum(["desc", "asc"]).catch("desc"),
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(10),
  role: z.enum(["super_admin", "core", "staff"]).optional().catch(undefined),
});

export const Route = createFileRoute("/admin/_auth/partner")({
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
    category,
    search,
    sort,
    page,
    per_page: perPage,
    role,
  } = searchParams;

  const [isLoading, setIsLoading] = React.useState(true);
  const [partners, setPartners] =
    React.useState<PartnerRecord[]>(defaultPartners);
  const [deleteTarget, setDeleteTarget] = React.useState<PartnerRecord | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isCannotDeleteOpen, setIsCannotDeleteOpen] = React.useState(false);
  const [feedbackToast, setFeedbackToast] = React.useState<{
    tone: "success" | "info";
    title: string;
    description: string;
  } | null>(null);

  const userRole: PartnerUserRole = role ?? "super_admin";

  // Simulasi loading awal 3 detik untuk state skeleton halaman Partner
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  // Auto-dismiss alert toast setelah 4 detik
  React.useEffect(() => {
    if (!feedbackToast) return;
    const timer = window.setTimeout(() => {
      setFeedbackToast(null);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [feedbackToast]);

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
    const keyword = (search ?? "").trim().toLowerCase();
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

  const hasActiveFilters = Boolean((search ?? "").trim()) || category !== "all";

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

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    window.setTimeout(() => {
      setIsDeleting(false);
      if (!deleteTarget.canDelete) {
        setDeleteTarget(null);
        setIsCannotDeleteOpen(true);
        return;
      }

      const removedName = deleteTarget.name;
      setPartners((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
      setFeedbackToast({
        tone: "success",
        title: "Donatur berhasil dihapus",
        description: `Data ${removedName} telah dihapus dari daftar partner.`,
      });
    }, 250);
  };

  if (isLoading) {
    return <PartnerSkeleton />;
  }

  return (
    <div className="space-y-6 w-full">
      {/* Notifikasi Aksi */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-40 w-full max-w-sm shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none">
          <Alert
            tone={feedbackToast.tone}
            title={feedbackToast.title}
            description={feedbackToast.description}
            onClose={() => setFeedbackToast(null)}
            className="bg-white shadow-md"
          />
        </div>
      )}

      {/* Baris Kartu Ringkasan Metrik Donatur */}
      <PartnerStats stats={stats} />

      {/* Toolbar Filter Kategori, Pencarian, dan Tambah Donatur */}
      <PartnerToolbar
        filterOptions={filterOptions}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
        searchQuery={search ?? ""}
        onSearchChange={handleSearchChange}
        onAddPartner={() => {
          setFeedbackToast({
            tone: "info",
            title: "Tambah Donatur",
            description:
              "Formulir tambah mitra donatur akan tersedia pada tahap integrasi berikutnya.",
          });
        }}
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
        onViewDetail={(partner) => {
          setFeedbackToast({
            tone: "info",
            title: `Detail ${partner.name}`,
            description: `${partner.type} · ${partner.donationCount} Aksi (${partner.impactKg} Kg).`,
          });
        }}
        onEditPartner={(partner) => {
          setFeedbackToast({
            tone: "info",
            title: `Edit ${partner.name}`,
            description:
              "Formulir ubah data mitra donatur akan tersedia pada tahap integrasi berikutnya.",
          });
        }}
        onDeletePartner={(partner) => setDeleteTarget(partner)}
      />

      {/* Modal Konfirmasi Hapus Donatur */}
      <PartnerDeleteDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        partner={deleteTarget}
        isLoading={isDeleting}
      />

      {/* Modal Peringatan Donatur Tidak Dapat Dihapus (409) */}
      <PartnerCannotDeleteDialog
        isOpen={isCannotDeleteOpen}
        onClose={() => setIsCannotDeleteOpen(false)}
      />
    </div>
  );
}
