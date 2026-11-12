import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();

  // Simulasi loading skeleton selama 3 detik saat awal render
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // State daftar penerima manfaat lokal & peran pengguna aktif
  const [beneficiaries, setBeneficiaries] =
    React.useState<BeneficiaryItem[]>(defaultBeneficiaries);
  // TODO: ketika integrasi api: ambil role dari sesi auth
  const userRole = "super_admin" as "super_admin" | "core" | "staff";

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

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    setTimeout(() => {
      setBeneficiaries((prev) =>
        prev.filter((item) => item.id !== deleteTarget.id),
      );
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
      toast.success("Penerima manfaat berhasil dihapus");
    }, 400);
  };

  if (isLoading) {
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
