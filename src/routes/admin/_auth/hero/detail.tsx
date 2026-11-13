import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building, Calendar, MessageCircle, Pencil } from "lucide-react";
import { z } from "zod";
import {
  HERO_DETAIL_DEFAULT_PER_PAGE,
  HeroDetailHistoryTable,
  HeroDetailSkeleton,
  HeroDetailStats,
  HeroFormDialog,
  buildHeroDetailStats,
  defaultHeroBeneficiaryOptions,
  defaultHeroes,
  formatDisplayHeroPhone,
  getHeroDetailById,
} from "#/components/pages/hero";
import type {
  HeroDetailProfile,
  HeroDonationHistoryRecord,
  HeroFormValues,
  HeroRecord,
} from "#/components/pages/hero";
import { defaultDonations } from "#/components/pages/donation";
import { Alert } from "#/components/ui/alert";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { cn } from "#/lib/utils";
import { useAdminLayout } from "#/routes/admin/_auth";

// Skema validasi parameter query URL untuk halaman detail hero
const heroDetailSearchSchema = z.object({
  id: z.string().optional().catch(""),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .catch(HERO_DETAIL_DEFAULT_PER_PAGE),
  sort: z.enum(["asc", "desc"]).optional().catch("desc"),
  state: z.enum(["default", "empty"]).optional().catch(undefined),
});

export type HeroDetailSearchParams = z.infer<typeof heroDetailSearchSchema>;

export const Route = createFileRoute("/admin/_auth/hero/detail")({
  validateSearch: (search: Record<string, unknown>) => {
    return heroDetailSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : undefined,
      page: search.page,
      per_page: search.per_page ?? search.perpage,
      sort:
        search.sort === "asc" || search.sort === "desc"
          ? search.sort
          : undefined,
      state:
        search.state === "empty" ||
        search.empty === "1" ||
        search.empty === true
          ? "empty"
          : undefined,
    });
  },
  component: HeroDetailPage,
});

/**
 * HeroDetailPage: Halaman Detail Hero menampilkan profil, status blokir, statistik dampak, dan riwayat pengambilan donasi (Figma 148:18379, 148:19021, 148:19359).
 */
function HeroDetailPage() {
  const searchParams = Route.useSearch();
  const id = searchParams.id ?? "";
  const page = searchParams.page ?? 1;
  const per_page = searchParams.per_page ?? HERO_DETAIL_DEFAULT_PER_PAGE;
  const sort = searchParams.sort ?? "desc";
  const state = searchParams.state;

  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const effectiveId = id.trim() ? id.trim() : "hero-1";

  // State profil detail hero agar perubahan lewat Edit Data langsung terrefleksi pada tampilan
  const [detail, setDetail] = React.useState<HeroDetailProfile>(() =>
    getHeroDetailById(effectiveId, state),
  );

  React.useEffect(() => {
    setDetail(getHeroDetailById(effectiveId, state));
  }, [effectiveId, state]);

  // Simulasi loading skeleton selama 3 detik setiap membuka/berganti hero
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [effectiveId, state]);

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = React.useState(false);

  // Sinkronkan judul, subjudul tanggal bergabung, dan tombol Kembali pada Header Admin Layout
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: detail.name,
      subtitle: `Hero sejak ${detail.joinedLongLabel}`,
      onBack: () => navigate({ to: "/admin/hero" }),
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, detail.name, detail.joinedLongLabel, navigate]);

  // Helper pembaruan URL query params secara tipe-aman
  const updateSearch = React.useCallback(
    (newParams: Partial<HeroDetailSearchParams>) => {
      navigate({
        to: "/admin/hero/detail",
        search: (prev) => ({
          id: newParams.id !== undefined ? newParams.id : prev.id,
          page: newParams.page ?? prev.page ?? 1,
          per_page:
            newParams.per_page ?? prev.per_page ?? HERO_DETAIL_DEFAULT_PER_PAGE,
          sort: newParams.sort ?? prev.sort ?? "desc",
          state: newParams.state !== undefined ? newParams.state : prev.state,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  // Hitung 3 kartu statistik halaman Detail Hero
  const detailStats = React.useMemo(
    () => buildHeroDetailStats(detail),
    [detail],
  );

  // Urutkan dan paginasi riwayat donasi berbasis URL search params (sort, page, per_page)
  const { paginatedHistory, totalHistory, totalPages, currentPage } =
    React.useMemo(() => {
      const items = [...detail.history];
      items.sort((a, b) =>
        sort === "asc"
          ? a.dateIso.localeCompare(b.dateIso)
          : b.dateIso.localeCompare(a.dateIso),
      );

      const totalCount = items.length;
      const pages = Math.max(1, Math.ceil(totalCount / per_page));
      const safePage = Math.min(page, pages);
      const startIndex = (safePage - 1) * per_page;
      const sliced = items.slice(startIndex, startIndex + per_page);

      return {
        paginatedHistory: sliced,
        totalHistory: totalCount,
        totalPages: pages,
        currentPage: safePage,
      };
    }, [detail.history, sort, page, per_page]);

  const handleSortToggle = React.useCallback(() => {
    updateSearch({ sort: sort === "desc" ? "asc" : "desc", page: 1 });
  }, [updateSearch, sort]);

  const handlePageChange = React.useCallback(
    (nextPage: number) => {
      updateSearch({ page: nextPage });
    },
    [updateSearch],
  );

  const handlePerPageChange = React.useCallback(
    (nextPerPage: number) => {
      updateSearch({ per_page: nextPerPage, page: 1 });
    },
    [updateSearch],
  );

  const handleViewDonation = React.useCallback(
    (record: HeroDonationHistoryRecord) => {
      const matchedDonation = defaultDonations.find(
        (donation) =>
          donation.donorName.toLowerCase() === record.donorName.toLowerCase(),
      );
      navigate({
        to: "/admin/donation/detail",
        search: { id: matchedDonation?.id ?? "donasi-1" },
      });
    },
    [navigate],
  );

  // Representasi HeroRecord untuk kompatibilitas modal Edit Data Hero
  const heroAsRecord = React.useMemo<HeroRecord>(
    () => ({
      id: detail.id,
      name: detail.name,
      phone: detail.phone,
      beneficiaryId: detail.beneficiaryId,
      beneficiaryName: detail.beneficiaryName,
      sectorId: detail.sectorId,
      sectorName: detail.sectorName,
      status: detail.status,
      actionCount: detail.actionCount,
      canDelete: detail.actionCount <= 2,
    }),
    [detail],
  );

  const existingHeroesForValidation = React.useMemo(() => {
    const exists = defaultHeroes.some((item) => item.id === heroAsRecord.id);
    return exists
      ? defaultHeroes.map((item) =>
          item.id === heroAsRecord.id ? heroAsRecord : item,
        )
      : [heroAsRecord, ...defaultHeroes];
  }, [heroAsRecord]);

  const handleEditSubmit = async (values: HeroFormValues) => {
    setIsSubmittingEdit(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const targetBeneficiary = defaultHeroBeneficiaryOptions.find(
      (b) => b.id === values.beneficiaryId,
    );
    const targetSector = targetBeneficiary?.sectors.find(
      (s) => s.id === values.sectorId,
    );

    setDetail((prev) => ({
      ...prev,
      name: values.name,
      phone: values.phone || undefined,
      beneficiaryId: values.beneficiaryId,
      beneficiaryName: targetBeneficiary?.name ?? prev.beneficiaryName,
      sectorId: values.sectorId,
      sectorName: targetSector?.name ?? prev.sectorName,
      status: values.isBlocked ? "diblokir" : "aktif",
    }));

    toast.success(`Profil ${values.name} berhasil diperbarui.`);
    setIsSubmittingEdit(false);
    setIsEditOpen(false);
  };

  if (isLoading) {
    return <HeroDetailSkeleton />;
  }

  const firstName = detail.name.trim().split(/\s+/)[0] || detail.name;
  const isBlocked = detail.status === "diblokir";

  return (
    <div className="space-y-6 w-full pb-8 animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Bar Aksi: Status Badge, Informasi Kontak & Afiliasi, dan Tombol Edit Data */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Badge
            tone={isBlocked ? "danger" : "success"}
            styleVariant="soft"
            dot
          >
            {isBlocked ? "Diblokir" : "Aktif"}
          </Badge>

          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-800">
            <Building className="size-4 text-neutral-500 shrink-0" />
            <span>
              {detail.sectorName} — {detail.beneficiaryName}
            </span>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium",
              detail.phone ? "text-neutral-800" : "text-neutral-400",
            )}
          >
            <MessageCircle className="size-4 text-neutral-500 shrink-0" />
            <span>{formatDisplayHeroPhone(detail.phone)}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
            <Calendar className="size-4 text-neutral-500 shrink-0" />
            <span>Bergabung {detail.joinedShortLabel}</span>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Pencil className="size-4" />}
          onClick={() => setIsEditOpen(true)}
        >
          Edit Hero
        </Button>
      </div>

      {/* Peringatan Status Blokir Hero (Figma 148:19021) */}
      {isBlocked ? (
        <Alert
          tone="warning"
          title="Hero ini sedang diblokir"
          description={`${firstName} tidak bisa ditambahkan ke donasi baru. Riwayat pengambilannya tetap tersimpan. Ubah lewat Edit Data jika blokir sudah tidak diperlukan.`}
        />
      ) : null}

      {/* Ringkasan Statistik Dampak Hero */}
      <HeroDetailStats stats={detailStats} />

      {/* Tabel Riwayat Donasi Yang Diterima */}
      <HeroDetailHistoryTable
        data={paginatedHistory}
        totalCount={totalHistory}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={per_page}
        sortDirection={sort}
        onSortToggle={handleSortToggle}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onViewDonation={handleViewDonation}
      />

      {/* Modal Edit Data Hero */}
      <HeroFormDialog
        isOpen={isEditOpen}
        mode="edit"
        hero={heroAsRecord}
        beneficiaries={defaultHeroBeneficiaryOptions}
        existingHeroes={existingHeroesForValidation}
        onClose={() => {
          if (!isSubmittingEdit) {
            setIsEditOpen(false);
          }
        }}
        onSubmit={handleEditSubmit}
        isSubmitting={isSubmittingEdit}
      />
    </div>
  );
}
