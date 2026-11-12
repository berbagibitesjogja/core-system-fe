import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  HERO_DEFAULT_PER_PAGE,
  HeroCannotDeleteDialog,
  HeroDeleteDialog,
  HeroFormDialog,
  HeroSkeleton,
  HeroStats,
  HeroTable,
  HeroToolbar,
  buildHeroStats,
  defaultHeroBeneficiaryOptions,
  defaultHeroes,
} from "#/components/pages/hero";
import type {
  HeroFormValues,
  HeroRecord,
  HeroUserRole,
} from "#/components/pages/hero";

const heroSearchSchema = z.object({
  beneficiary: z.string().optional().catch("all"),
  sector: z.string().optional().catch("all"),
  search: z.string().optional().catch(""),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .catch(HERO_DEFAULT_PER_PAGE),
});

export type HeroSearchParams = z.infer<typeof heroSearchSchema>;

export const Route = createFileRoute("/admin/_auth/hero/")({
  validateSearch: (search: Record<string, unknown>) => {
    return heroSearchSchema.parse({
      beneficiary:
        typeof search.beneficiary === "string" ? search.beneficiary : "all",
      sector: typeof search.sector === "string" ? search.sector : "all",
      search: typeof search.search === "string" ? search.search : "",
      page: search.page,
      per_page: search.per_page ?? search.perpage,
    });
  },
  component: HeroPage,
});

/**
 * HeroPage: Halaman manajemen daftar Heroes beserta filter berjenjang Beneficiary -> Sektor dan aksi CRUD (Figma 145:14749).
 */
function HeroPage() {
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

  const searchParams = Route.useSearch();
  const beneficiaryParam = searchParams.beneficiary || "all";
  const sectorParam = searchParams.sector || "all";
  const searchQuery = searchParams.search || "";
  const page = searchParams.page || 1;
  const per_page = searchParams.per_page || HERO_DEFAULT_PER_PAGE;

  // TODO: ketika integrasi api: ambil role dari sesi auth
  const userRole = "super_admin" as HeroUserRole;

  const [heroes, setHeroes] = React.useState<HeroRecord[]>(defaultHeroes);

  // State modal tambah / edit hero
  const [formDialogState, setFormDialogState] = React.useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    hero: HeroRecord | null;
  }>({
    isOpen: false,
    mode: "add",
    hero: null,
  });
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);

  // State modal hapus & gagal hapus
  const [deleteTarget, setDeleteTarget] = React.useState<HeroRecord | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isCannotDeleteDialogOpen, setIsCannotDeleteDialogOpen] =
    React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const selectedBeneficiaryOption = defaultHeroBeneficiaryOptions.find(
    (item) => item.id === beneficiaryParam,
  );

  const effectiveBeneficiary = selectedBeneficiaryOption
    ? selectedBeneficiaryOption.id
    : "all";

  const effectiveSector =
    selectedBeneficiaryOption &&
    selectedBeneficiaryOption.sectors.some((sec) => sec.id === sectorParam)
      ? sectorParam
      : "all";

  // Helper pembaruan URL Search Params secara persisten
  const updateSearch = (
    updater: (prev: HeroSearchParams) => HeroSearchParams,
  ) => {
    navigate({
      to: "/admin/hero",
      search: (prev) => updater(prev),
      replace: true,
    });
  };

  // Handler Toolbar Filter & Search
  const handleBeneficiaryChange = (nextBeneficiary: string) => {
    updateSearch((prev) => ({
      ...prev,
      beneficiary: nextBeneficiary,
      sector: "all",
      page: 1,
    }));
  };

  const handleSectorChange = (nextSector: string) => {
    updateSearch((prev) => ({
      ...prev,
      sector: nextSector,
      page: 1,
    }));
  };

  const handleSearchChange = (nextQuery: string) => {
    updateSearch((prev) => ({
      ...prev,
      search: nextQuery,
      page: 1,
    }));
  };

  const handlePageChange = (nextPage: number) => {
    updateSearch((prev) => ({
      ...prev,
      page: nextPage,
    }));
  };

  const handlePerPageChange = (nextPerPage: number) => {
    updateSearch((prev) => ({
      ...prev,
      per_page: nextPerPage,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    updateSearch((prev) => ({
      ...prev,
      beneficiary: "all",
      sector: "all",
      search: "",
      page: 1,
    }));
  };

  // Penyaringan data berdasarkan Beneficiary, Sektor, dan Kata Kunci Pencarian
  const filteredHeroes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return heroes.filter((hero) => {
      if (
        effectiveBeneficiary !== "all" &&
        hero.beneficiaryId !== effectiveBeneficiary
      ) {
        return false;
      }

      if (
        effectiveBeneficiary !== "all" &&
        effectiveSector !== "all" &&
        hero.sectorId !== effectiveSector
      ) {
        return false;
      }

      if (query) {
        const matchesName = hero.name.toLowerCase().includes(query);
        const matchesPhone = (hero.phone ?? "").toLowerCase().includes(query);
        const normalizedQuery = query.replace(/\D/g, "");
        const normalizedHeroPhone = (hero.phone ?? "").replace(/\D/g, "");
        const matchesDigits =
          Boolean(normalizedQuery) &&
          normalizedHeroPhone.includes(normalizedQuery);

        return matchesName || matchesPhone || matchesDigits;
      }

      return true;
    });
  }, [heroes, effectiveBeneficiary, effectiveSector, searchQuery]);

  // Paginasi data tabel
  const totalCount = filteredHeroes.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / per_page));
  const safePage = Math.min(page, totalPages);

  const paginatedHeroes = React.useMemo(() => {
    const startIndex = (safePage - 1) * per_page;
    return filteredHeroes.slice(startIndex, startIndex + per_page);
  }, [filteredHeroes, safePage, per_page]);

  // Hitung statistik dinamis halaman Heroes
  const statsData = React.useMemo(() => buildHeroStats(heroes), [heroes]);

  // Handler Aksi CRUD
  const handleOpenAdd = () => {
    setFormDialogState({
      isOpen: true,
      mode: "add",
      hero: null,
    });
  };

  const handleOpenEdit = (hero: HeroRecord) => {
    setFormDialogState({
      isOpen: true,
      mode: "edit",
      hero,
    });
  };

  const handleFormSubmit = async (values: HeroFormValues) => {
    setIsSubmittingForm(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const targetBeneficiary = defaultHeroBeneficiaryOptions.find(
      (b) => b.id === values.beneficiaryId,
    );
    const targetSector = targetBeneficiary?.sectors.find(
      (s) => s.id === values.sectorId,
    );

    if (formDialogState.mode === "edit" && formDialogState.hero) {
      const targetId = formDialogState.hero.id;
      setHeroes((prev) =>
        prev.map((item) =>
          item.id === targetId
            ? {
                ...item,
                name: values.name,
                phone: values.phone || undefined,
                beneficiaryId: values.beneficiaryId,
                beneficiaryName:
                  targetBeneficiary?.name ?? item.beneficiaryName,
                sectorId: values.sectorId,
                sectorName: targetSector?.name ?? item.sectorName,
                status: values.isBlocked ? "diblokir" : "aktif",
              }
            : item,
        ),
      );
      toast.success(`Profil ${values.name} berhasil diperbarui.`);
    } else {
      const newHero: HeroRecord = {
        id: `hero-${Date.now()}`,
        name: values.name,
        phone: values.phone || undefined,
        beneficiaryId: values.beneficiaryId,
        beneficiaryName: targetBeneficiary?.name ?? "Beneficiary",
        sectorId: values.sectorId,
        sectorName: targetSector?.name ?? "Umum",
        status: "aktif",
        actionCount: 0,
        canDelete: true,
      };
      setHeroes((prev) => [newHero, ...prev]);
      toast.success(`Hero ${values.name} berhasil ditambahkan.`);
    }

    setIsSubmittingForm(false);
    setFormDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleViewDetail = (hero: HeroRecord) => {
    navigate({
      to: "/admin/hero/detail",
      search: {
        id: hero.id,
        state: hero.actionCount === 0 ? "empty" : undefined,
      },
    });
  };

  const handleRequestDelete = (hero: HeroRecord) => {
    if (userRole === "staff") return;
    setDeleteTarget(hero);
    if (hero.canDelete) {
      setIsDeleteDialogOpen(true);
    } else {
      setIsCannotDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setHeroes((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    toast.success(`Data hero ${deleteTarget.name} berhasil dihapus.`);

    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const hasActiveFilters =
    effectiveBeneficiary !== "all" ||
    effectiveSector !== "all" ||
    Boolean(searchQuery.trim());

  return (
    <div className="space-y-6 w-full pb-8">
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <>
          {/* Ringkasan Statistik Heroes */}
          <HeroStats stats={statsData} />

          {/* Toolbar Filter & Pencarian */}
          <HeroToolbar
            beneficiaries={defaultHeroBeneficiaryOptions}
            selectedBeneficiaryId={effectiveBeneficiary}
            onBeneficiaryChange={handleBeneficiaryChange}
            selectedSectorId={effectiveSector}
            onSectorChange={handleSectorChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onAddHero={handleOpenAdd}
          />

          {/* Tabel Daftar Heroes */}
          <HeroTable
            data={paginatedHeroes}
            totalCount={totalCount}
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            perPage={per_page}
            onPerPageChange={handlePerPageChange}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            onViewDetail={handleViewDetail}
            onEditHero={handleOpenEdit}
            onDeleteHero={handleRequestDelete}
            userRole={userRole}
          />
        </>
      )}

      {/* Modal Tambah & Edit Hero */}
      <HeroFormDialog
        isOpen={formDialogState.isOpen}
        mode={formDialogState.mode}
        hero={formDialogState.hero}
        beneficiaries={defaultHeroBeneficiaryOptions}
        existingHeroes={heroes}
        defaultBeneficiaryId={effectiveBeneficiary}
        defaultSectorId={effectiveSector}
        onClose={() => {
          if (!isSubmittingForm) {
            setFormDialogState((prev) => ({ ...prev, isOpen: false }));
          }
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmittingForm}
      />

      {/* Modal Konfirmasi Hapus Hero */}
      <HeroDeleteDialog
        isOpen={isDeleteDialogOpen}
        hero={deleteTarget}
        isLoading={isDeleting}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteDialogOpen(false);
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Modal Gagal Hapus Hero (Sudah Memiliki Riwayat) */}
      <HeroCannotDeleteDialog
        isOpen={isCannotDeleteDialogOpen}
        onClose={() => {
          setIsCannotDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
