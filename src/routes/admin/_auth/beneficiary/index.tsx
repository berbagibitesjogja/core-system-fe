import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  BeneficiaryCannotDeleteDialog,
  BeneficiaryDeleteDialog,
  BeneficiaryGrid,
  BeneficiarySkeleton,
  BeneficiaryStats,
  BeneficiaryToolbar,
  INITIAL_VISIBLE_BENEFICIARIES,
  buildBeneficiaryFilterOptions,
  buildBeneficiaryStats,
  defaultBeneficiaries,
} from "#/components/pages/beneficiary";
import type {
  BeneficiaryCategoryId,
  BeneficiaryItem,
} from "#/components/pages/beneficiary";
import { useUserProfile } from "#/hooks";
import { idBeneficiary } from "#/locales";
import {
  deleteBeneficiary,
  getBeneficiaries,
  mapCategoryToBeneficiaryItem,
} from "#/services/beneficiaryService";
import { isApiError } from "#/services/errorService";

const beneficiarySearchSchema = z.object({
  category: z
    .enum(["all", "universitas", "yayasan", "masyarakat-umum"])
    .optional()
    .catch("all"),
  search: z.string().optional().catch(""),
  all: z
    .preprocess((val) => val === true || val === "true", z.boolean())
    .optional()
    .catch(false),
});

export type BeneficiarySearchParams = z.infer<typeof beneficiarySearchSchema>;

export const Route = createFileRoute("/admin/_auth/beneficiary/")({
  validateSearch: (search: Record<string, unknown>) => {
    return beneficiarySearchSchema.parse({
      category: typeof search.category === "string" ? search.category : "all",
      search: typeof search.search === "string" ? search.search : "",
      all: search.all,
    });
  },
  component: BeneficiaryPage,
});

/**
 * BeneficiaryPage: Halaman manajemen kelompok penerima manfaat (Universitas, Yayasan, Masyarakat Umum).
 */
function BeneficiaryPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const queryClient = useQueryClient();
  const profile = useUserProfile();
  const getBeneficiariesFn = useServerFn(getBeneficiaries);
  const deleteBeneficiaryFn = useServerFn(deleteBeneficiary);

  // Mengambil daftar kategori penerima manfaat via TanStack Query
  const beneficiariesQuery = useQuery({
    queryKey: ["beneficiaries"],
    queryFn: () => getBeneficiariesFn({ data: { page: 1, limit: 100 } }),
  });

  // Memetakan rekaman API backend ke bentuk presentasi BeneficiaryItem
  const beneficiaries = React.useMemo<BeneficiaryItem[]>(() => {
    const apiRecords = beneficiariesQuery.data?.data;
    if (!Array.isArray(apiRecords)) return defaultBeneficiaries;
    return apiRecords.map((record, index) =>
      mapCategoryToBeneficiaryItem(record, index),
    );
  }, [beneficiariesQuery.data]);

  const userRole = profile.sidebarRole;

  // State modal hapus dan konfirmasi 409
  const [deleteTarget, setDeleteTarget] =
    React.useState<BeneficiaryItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isCannotDeleteDialogOpen, setIsCannotDeleteDialogOpen] =
    React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Parameter filter & pencarian langsung dari URL
  const searchParams = Route.useSearch();
  const activeCategory: BeneficiaryCategoryId = searchParams.category ?? "all";
  const search = searchParams.search ?? "";
  const showAll = searchParams.all ?? false;

  const updateSearch = React.useCallback(
    (newParams: Partial<BeneficiarySearchParams>) => {
      navigate({
        to: "/admin/beneficiary",
        search: (prev) => ({
          category: newParams.category ?? prev.category ?? "all",
          search: newParams.search ?? prev.search ?? "",
          all:
            newParams.all !== undefined ? newParams.all : (prev.all ?? false),
        }),
        replace: true,
      });
    },
    [navigate],
  );

  // Pemrosesan statistik, jumlah filter, penyaringan kategori + pencarian, serta pembatasan tampil awal
  const {
    stats,
    filterOptions,
    totalHeroesPool,
    visibleItems,
    totalFilteredCount,
  } = React.useMemo(() => {
    const totalHeroes = beneficiaries.reduce(
      (acc, item) => acc + item.heroesCount,
      0,
    );

    let filtered = [...beneficiaries];

    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.categoryId === activeCategory);
    }

    const query = search.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query),
      );
    }

    const totalCount = filtered.length;
    const sliced = showAll
      ? filtered
      : filtered.slice(0, INITIAL_VISIBLE_BENEFICIARIES);

    return {
      stats: buildBeneficiaryStats(beneficiaries),
      filterOptions: buildBeneficiaryFilterOptions(beneficiaries),
      totalHeroesPool: totalHeroes,
      visibleItems: sliced,
      totalFilteredCount: totalCount,
    };
  }, [beneficiaries, activeCategory, search, showAll]);

  const handleCategoryChange = (category: BeneficiaryCategoryId) => {
    updateSearch({ category, all: false });
  };

  const handleSearchChange = (query: string) => {
    updateSearch({ search: query, all: false });
  };

  const handleClearSearch = () => {
    updateSearch({ search: "", all: false });
  };

  const handleResetFilter = () => {
    updateSearch({ category: "all", search: "", all: false });
  };

  const handleShowAll = () => {
    updateSearch({ all: true });
  };

  const handleAddBeneficiary = () => {
    navigate({ to: "/admin/beneficiary/add" });
  };

  const handleDetailItem = (item: BeneficiaryItem) => {
    navigate({
      to: "/admin/beneficiary/detail",
      search: { id: item.id },
    });
  };

  const handleEditItem = (item: BeneficiaryItem) => {
    navigate({
      to: "/admin/beneficiary/edit",
      search: { id: item.id },
    });
  };

  const handleDeleteTrigger = (item: BeneficiaryItem) => {
    setDeleteTarget(item);
    if (!item.canDelete) {
      setIsCannotDeleteDialogOpen(true);
    } else {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      await deleteBeneficiaryFn({ data: { id: deleteTarget.id } });
      await queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success(idBeneficiary.list.toasts.deleteSuccess(deleteTarget.name));
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (err: unknown) {
      if (isApiError(err) && (err.status === 409 || err.code === "CONFLICT")) {
        setIsDeleteDialogOpen(false);
        setIsCannotDeleteDialogOpen(true);
      } else if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idBeneficiary.list.toasts.deleteFailed);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (beneficiariesQuery.isLoading) {
    return <BeneficiarySkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Baris Kartu Statistik */}
      <BeneficiaryStats stats={stats} />

      {/* Toolbar Kategori, Pencarian & Tambah Penerima */}
      <BeneficiaryToolbar
        filterOptions={filterOptions}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        onAddBeneficiary={handleAddBeneficiary}
      />

      {/* Grid Penerima Manfaat / Empty State */}
      <BeneficiaryGrid
        visibleItems={visibleItems}
        totalFilteredCount={totalFilteredCount}
        totalHeroesPool={totalHeroesPool}
        searchQuery={search}
        userRole={userRole}
        onClearSearch={handleClearSearch}
        onResetFilter={handleResetFilter}
        onShowAll={handleShowAll}
        onDetailItem={handleDetailItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteTrigger}
      />

      {/* Modal Konfirmasi Hapus (Figma 138:9855) */}
      <BeneficiaryDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        beneficiary={deleteTarget}
        isLoading={isDeleting}
      />

      {/* Modal Gagal Hapus Konflik Riwayat 409 (Figma 138:9986) */}
      <BeneficiaryCannotDeleteDialog
        isOpen={isCannotDeleteDialogOpen}
        onClose={() => {
          setIsCannotDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
