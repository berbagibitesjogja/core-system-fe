import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { z } from "zod";
import {
  BeneficiaryAddSectorDialog,
  BeneficiaryDetailDonationsTable,
  BeneficiaryDetailSectorsCard,
  BeneficiaryDetailSkeleton,
  BeneficiaryStats,
  DETAIL_DONATIONS_PER_PAGE,
  buildBeneficiaryDetailStats,
  getBeneficiaryDetailById,
} from "#/components/pages/beneficiary";
import type {
  BeneficiaryDonationRecord,
  BeneficiarySectorRecord,
} from "#/components/pages/beneficiary";
import { getCategoryBadgeConfig } from "#/components/shared/beneficiary-card";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { cn } from "#/lib/utils";
import { useAdminLayout } from "#/routes/admin/_auth";

// Skema validasi parameter query URL untuk detail beneficiary
const beneficiaryDetailSearchSchema = z.object({
  id: z.string().optional().catch(""),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .catch(DETAIL_DONATIONS_PER_PAGE),
  sort: z.enum(["asc", "desc"]).optional().catch("desc"),
  state: z.enum(["default", "empty"]).optional().catch(undefined),
});

export type BeneficiaryDetailSearchParams = z.infer<
  typeof beneficiaryDetailSearchSchema
>;

export const Route = createFileRoute("/admin/_auth/beneficiary/detail")({
  validateSearch: (search: Record<string, unknown>) => {
    return beneficiaryDetailSearchSchema.parse({
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
  component: BeneficiaryDetailPage,
});

/**
 * BeneficiaryDetailPage: Halaman Detail Penerima Manfaat (Figma 139:9961, 140:10318, 140:10513, 140:10707, 140:11150).
 */
function BeneficiaryDetailPage() {
  const searchParams = Route.useSearch();
  const id = searchParams.id ?? "";
  const page = searchParams.page ?? 1;
  const per_page = searchParams.per_page ?? DETAIL_DONATIONS_PER_PAGE;
  const sort = searchParams.sort ?? "desc";
  const state = searchParams.state;

  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const effectiveId = id.trim() ? id.trim() : "ben-1";

  const detail = React.useMemo(
    () => getBeneficiaryDetailById(effectiveId, state),
    [effectiveId, state],
  );
  const badgeConfig = getCategoryBadgeConfig(detail.type);

  // Simulasi loading skeleton selama 3 detik setiap membuka/berganti beneficiary
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [effectiveId, state]);

  // Daftar sektor dikelola agar penambahan sektor baru langsung memperbarui kartu statistik & tabel
  const [sectors, setSectors] = React.useState<BeneficiarySectorRecord[]>(
    () => detail.sectors,
  );
  React.useEffect(() => {
    setSectors(detail.sectors);
  }, [detail]);

  const [isAddSectorOpen, setIsAddSectorOpen] = React.useState(false);
  const [isAddingSector, setIsAddingSector] = React.useState(false);

  // Sinkronkan judul & tombol kembali pada Header Admin Layout
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: detail.name,
      subtitle: detail.subtitle,
      onBack: () => navigate({ to: "/admin/beneficiary" }),
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, detail.name, detail.subtitle, navigate]);

  // Helper pembaruan URL query params secara tipe-aman
  const updateSearch = React.useCallback(
    (newParams: Partial<BeneficiaryDetailSearchParams>) => {
      navigate({
        to: "/admin/beneficiary/detail",
        search: (prev) => ({
          id: newParams.id !== undefined ? newParams.id : prev.id,
          page: newParams.page ?? prev.page ?? 1,
          per_page:
            newParams.per_page ?? prev.per_page ?? DETAIL_DONATIONS_PER_PAGE,
          sort: newParams.sort ?? prev.sort ?? "desc",
          state: newParams.state !== undefined ? newParams.state : prev.state,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  // Kartu statistik dihitung ulang ketika daftar sektor berubah
  const detailStats = React.useMemo(
    () => buildBeneficiaryDetailStats(detail, sectors),
    [detail, sectors],
  );

  // Pengurutan dan paginasi riwayat donasi berbasis URL search params (sort, page, per_page)
  const { paginatedDonations, totalDonations, totalPages, currentPage } =
    React.useMemo(() => {
      const items = [...detail.donations];
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
        paginatedDonations: sliced,
        totalDonations: totalCount,
        totalPages: pages,
        currentPage: safePage,
      };
    }, [detail.donations, sort, page, per_page]);

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
    (item: BeneficiaryDonationRecord) => {
      toast.info(
        `Menampilkan detail donasi ${item.donorName} (${item.dateLabel})`,
      );
    },
    [],
  );

  const handleViewSector = React.useCallback(
    (sector: BeneficiarySectorRecord) => {
      toast.info(`Menampilkan detail sektor ${sector.name}`);
    },
    [],
  );

  const handleAddSectorSubmit = async (sectorName: string) => {
    setIsAddingSector(true);

    try {
      // Simulasi request API penambahan sektor baru
      await new Promise((resolve) => setTimeout(resolve, 400));

      const newSector: BeneficiarySectorRecord = {
        id: `sec-${Date.now()}`,
        name: sectorName,
        heroesCount: 0,
        isNew: true,
      };

      setSectors((prev) => [newSector, ...prev]);
      setIsAddSectorOpen(false);
      toast.success("Sektor baru berhasil ditambahkan");
    } catch {
      toast.error("Gagal menambahkan sektor baru. Silakan coba lagi.");
    } finally {
      setIsAddingSector(false);
    }
  };

  if (isLoading) {
    return <BeneficiaryDetailSkeleton />;
  }

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Bar Aksi: Badge Jenis & Tombol Edit Data */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Badge
          tone={badgeConfig.tone}
          styleVariant="soft"
          className={cn(
            "h-6 px-2.5 text-xs font-medium",
            badgeConfig.className,
          )}
        >
          {detail.type}
        </Badge>

        <Button
          variant="secondary"
          size="md"
          leftIcon={<Pencil className="size-4" />}
          onClick={() =>
            navigate({
              to: "/admin/beneficiary/edit",
              search: { id: detail.id },
            })
          }
        >
          Edit Data
        </Button>
      </div>

      {/* Baris Ringkasan Statistik Penerima Manfaat */}
      <BeneficiaryStats stats={detailStats} />

      {/* Konten Utama Dua Kolom: Riwayat Donasi (Kiri) & Persebaran Sektor (Kanan) */}
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        <BeneficiaryDetailDonationsTable
          beneficiaryName={detail.name}
          data={paginatedDonations}
          totalCount={totalDonations}
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={per_page}
          onPerPageChange={handlePerPageChange}
          sortDirection={sort}
          onSortToggle={handleSortToggle}
          onPageChange={handlePageChange}
          onViewDonation={handleViewDonation}
        />

        <BeneficiaryDetailSectorsCard
          beneficiaryName={detail.name}
          sectors={sectors}
          onOpenAddSector={() => setIsAddSectorOpen(true)}
          onViewSector={handleViewSector}
        />
      </div>

      {/* Modal Tambah Sektor Baru */}
      <BeneficiaryAddSectorDialog
        isOpen={isAddSectorOpen}
        beneficiaryName={detail.name}
        existingSectorNames={sectors.map((s) => s.name)}
        onClose={() => setIsAddSectorOpen(false)}
        onSubmit={handleAddSectorSubmit}
        isSubmitting={isAddingSector}
      />
    </div>
  );
}
