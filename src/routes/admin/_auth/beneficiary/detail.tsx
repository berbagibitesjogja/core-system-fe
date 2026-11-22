import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, Mail, MapPin, Pencil } from "lucide-react";
import { z } from "zod";
import {
  BeneficiaryAddSectorDialog,
  BeneficiaryDetailDonationsTable,
  BeneficiaryDetailSectorsCard,
  BeneficiaryDetailSkeleton,
  BeneficiaryStats,
  DETAIL_DONATIONS_PER_PAGE,
  buildBeneficiaryDetailStats,
} from "#/components/pages/beneficiary";
import type {
  BeneficiaryDonationRecord,
  BeneficiarySectorRecord,
} from "#/components/pages/beneficiary";
import { getCategoryBadgeConfig } from "#/components/shared/beneficiary-card";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { idBeneficiary } from "#/locales";
import { cn } from "#/lib/utils";
import { useAdminLayout } from "#/routes/admin/_auth";
import {
  getBeneficiaryDetail,
  mapCategoryToBeneficiaryDetailProfile,
} from "#/services/beneficiaryService";

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

  const navigate = useNavigate();
  const getBeneficiaryDetailFn = useServerFn(getBeneficiaryDetail);
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const trimmedId = id.trim();

  // Mengambil detail kategori penerima manfaat dari API backend
  const beneficiaryQuery = useQuery({
    queryKey: ["beneficiary-detail", trimmedId],
    queryFn: async () => {
      if (!trimmedId) return null;
      return getBeneficiaryDetailFn({ data: { id: trimmedId } });
    },
    enabled: Boolean(trimmedId),
  });

  React.useEffect(() => {
    if (!trimmedId) {
      toast.error(idBeneficiary.detail.notFoundId);
      navigate({ to: "/admin/beneficiary" });
    }
  }, [trimmedId, navigate]);

  React.useEffect(() => {
    if (beneficiaryQuery.isError) {
      toast.error(idBeneficiary.detail.notFoundData);
      navigate({ to: "/admin/beneficiary" });
    }
  }, [beneficiaryQuery.isError, navigate]);

  const detail = React.useMemo(() => {
    const apiRecord = beneficiaryQuery.data?.data;
    if (apiRecord) {
      return mapCategoryToBeneficiaryDetailProfile(apiRecord);
    }
    return null;
  }, [beneficiaryQuery.data]);

  const badgeConfig = detail ? getCategoryBadgeConfig(detail.type) : null;
  const isLoading = beneficiaryQuery.isLoading || !detail;

  // Daftar sektor dikelola agar penambahan sektor baru langsung memperbarui kartu statistik & tabel
  const [sectors, setSectors] = React.useState<BeneficiarySectorRecord[]>([]);
  React.useEffect(() => {
    if (detail) {
      setSectors(detail.sectors);
    }
  }, [detail]);

  const [isAddSectorOpen, setIsAddSectorOpen] = React.useState(false);
  const [isAddingSector, setIsAddingSector] = React.useState(false);

  // Sinkronkan judul & tombol kembali pada Header Admin Layout
  React.useEffect(() => {
    if (!setHeaderOverride || !detail) return;

    setHeaderOverride({
      title: detail.name,
      subtitle: detail.subtitle,
      onBack: () => navigate({ to: "/admin/beneficiary" }),
      backLabel: idBeneficiary.detail.backLabel,
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, detail, navigate]);

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
        }),
        replace: true,
      });
    },
    [navigate],
  );

  // Kartu statistik dihitung ulang ketika daftar sektor berubah
  const detailStats = React.useMemo(
    () => (detail ? buildBeneficiaryDetailStats(detail, sectors) : []),
    [detail, sectors],
  );

  // Pengurutan dan paginasi riwayat donasi berbasis URL search params (sort, page, per_page)
  const { paginatedDonations, totalDonations, totalPages, currentPage } =
    React.useMemo(() => {
      if (!detail) {
        return {
          paginatedDonations: [],
          totalDonations: 0,
          totalPages: 1,
          currentPage: 1,
        };
      }
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
    }, [detail, sort, page, per_page]);

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
      navigate({
        to: "/admin/donation",
        search: { search: item.donorName },
      });
    },
    [navigate],
  );

  const handleViewSector = React.useCallback(
    (sector: BeneficiarySectorRecord) => {
      toast.info(idBeneficiary.detail.sectorDetailToast(sector.name));
    },
    [],
  );

  const handleAddSectorSubmit = async (sectorName: string) => {
    setIsAddingSector(true);

    try {
      const newSector: BeneficiarySectorRecord = {
        id: `sec-${Date.now()}`,
        name: sectorName,
        heroesCount: 0,
        isNew: true,
      };

      setSectors((prev) => [newSector, ...prev]);
      setIsAddSectorOpen(false);
      toast.success(idBeneficiary.detail.addSectorSuccessToast);
    } catch {
      toast.error(idBeneficiary.detail.addSectorErrorToast);
    } finally {
      setIsAddingSector(false);
    }
  };

  if (isLoading || !badgeConfig) {
    return <BeneficiaryDetailSkeleton />;
  }

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Bar Aksi: Badge Jenis, Status Operasional, & Tombol Edit Data */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex flex-wrap items-center gap-2">
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

          {detail.isPriority && (
            <Badge
              tone="accent"
              styleVariant="soft"
              className="h-6 px-2.5 text-xs font-medium bg-amber-50 text-amber-800 border-amber-200"
            >
              {idBeneficiary.detail.badgePriority}
            </Badge>
          )}

          {detail.hidden && (
            <Badge
              tone="neutral"
              styleVariant="soft"
              className="h-6 px-2.5 text-xs font-medium bg-neutral-100 text-neutral-600 border-neutral-200"
            >
              {idBeneficiary.detail.badgeHidden}
            </Badge>
          )}
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Pencil className="size-4" />}
          onClick={() =>
            navigate({
              to: "/admin/beneficiary/edit",
              search: { id: detail.id },
            })
          }
        >
          {idBeneficiary.detail.editButton}
        </Button>
      </div>

      {/* Kartu Profil Informasi Entitas (Alamat, Maps, Domain Hero) */}
      {(detail.address || detail.maps || detail.emailDomain) && (
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700 shadow-2xs">
          {detail.emailDomain && (
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium">
                {idBeneficiary.detail.heroDomainLabel}
              </span>
              <span className="font-semibold text-bondi-700 inline-flex items-center gap-1.5">
                <Mail className="size-3.5 text-bondi-600" />@
                {detail.emailDomain.replace(/^@+/, "")}
              </span>
            </div>
          )}

          {detail.address && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-neutral-400 shrink-0" />
              <span>{detail.address}</span>
            </div>
          )}

          {detail.maps && (
            <a
              href={detail.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-bondi-700 hover:underline"
            >
              <span>{idBeneficiary.detail.openMapsLabel}</span>
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      )}

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
