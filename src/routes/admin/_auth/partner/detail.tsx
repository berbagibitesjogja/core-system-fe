import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { defaultDonations } from "#/components/pages/donation";
import {
  PARTNER_DETAIL_DONATIONS_PER_PAGE,
  PartnerDetailDonationsTable,
  PartnerDetailProfileCard,
  PartnerDetailSkeleton,
  PartnerStats,
  buildPartnerDetailStats,
  getPartnerDetailById,
} from "#/components/pages/partner";
import type { PartnerDonationRecord } from "#/components/pages/partner";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { useAdminLayout } from "#/routes/admin/_auth";

// Skema validasi parameter query URL untuk halaman detail partner
const partnerDetailSearchSchema = z.object({
  id: z.string().optional().catch(""),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .catch(PARTNER_DETAIL_DONATIONS_PER_PAGE),
  sort: z.enum(["asc", "desc"]).optional().catch("desc"),
  state: z.enum(["default", "empty"]).optional().catch(undefined),
});

export type PartnerDetailSearchParams = z.infer<
  typeof partnerDetailSearchSchema
>;

export const Route = createFileRoute("/admin/_auth/partner/detail")({
  validateSearch: (search: Record<string, unknown>) => {
    return partnerDetailSearchSchema.parse({
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
  component: PartnerDetailPage,
});

/**
 * PartnerDetailPage: Halaman Detail Mitra Donatur menampilkan ringkasan statistik,
 * riwayat donasi (atau empty state belum ada donasi), serta kartu profil donatur (Figma 144:14249 & 144:14719).
 */
function PartnerDetailPage() {
  const searchParams = Route.useSearch();
  const id = searchParams.id ?? "";
  const page = searchParams.page ?? 1;
  const per_page = searchParams.per_page ?? PARTNER_DETAIL_DONATIONS_PER_PAGE;
  const sort = searchParams.sort ?? "desc";
  const state = searchParams.state;

  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const trimmedId = id.trim();
  const effectiveId = trimmedId ? trimmedId : state === "empty" ? "" : "ptr-1";

  const detail = React.useMemo(
    () => getPartnerDetailById(effectiveId, state),
    [effectiveId, state],
  );

  // Simulasi loading skeleton selama 3 detik setiap membuka/berganti mitra
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [effectiveId, state]);

  // Sinkronkan judul, subjudul, dan tombol kembali pada Header Admin Layout
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: detail.name,
      subtitle: detail.subtitle,
      onBack: () => navigate({ to: "/admin/partner" }),
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, detail.name, detail.subtitle, navigate]);

  // Helper pembaruan URL search params secara tipe-aman
  const updateSearch = React.useCallback(
    (newParams: Partial<PartnerDetailSearchParams>) => {
      navigate({
        to: "/admin/partner/detail",
        search: (prev) => ({
          id: newParams.id !== undefined ? newParams.id : prev.id,
          page: newParams.page ?? prev.page ?? 1,
          per_page:
            newParams.per_page ??
            prev.per_page ??
            PARTNER_DETAIL_DONATIONS_PER_PAGE,
          sort: newParams.sort ?? prev.sort ?? "desc",
          state: newParams.state !== undefined ? newParams.state : prev.state,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  // Hitung 3 kartu statistik halaman detail partner
  const detailStats = React.useMemo(
    () => buildPartnerDetailStats(detail),
    [detail],
  );

  // Urutkan dan paginasi riwayat donasi berdasarkan URL search params
  const { paginatedDonations, totalDonations, totalPages, currentPage } =
    React.useMemo(() => {
      const items = [...detail.donations];
      items.sort((a, b) =>
        sort === "asc"
          ? a.dateIso.localeCompare(b.dateIso)
          : b.dateIso.localeCompare(a.dateIso),
      );

      const total = items.length;
      const computedPages = Math.max(1, Math.ceil(total / per_page));
      const safePage = Math.min(Math.max(1, page), computedPages);
      const startIndex = (safePage - 1) * per_page;

      return {
        paginatedDonations: items.slice(startIndex, startIndex + per_page),
        totalDonations: total,
        totalPages: computedPages,
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
    (item: PartnerDonationRecord) => {
      if (item.donationId) {
        navigate({
          to: "/admin/donation/detail",
          search: { id: item.donationId },
        });
        return;
      }

      const matchedDonation = defaultDonations.find(
        (donation) =>
          donation.donorName.toLowerCase() === detail.name.toLowerCase(),
      );
      navigate({
        to: "/admin/donation/detail",
        search: { id: matchedDonation?.id ?? "donasi-1" },
      });
    },
    [navigate, detail.name],
  );

  const handleAddDonation = React.useCallback(() => {
    navigate({ to: "/admin/donation/add" });
  }, [navigate]);

  if (isLoading) {
    return <PartnerDetailSkeleton />;
  }

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Bar Aksi: Badge Kategori & Tombol Primer Edit Donatur */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Badge
          tone="neutral"
          styleVariant="soft"
          className="bg-neutral-100 text-neutral-600 border-transparent h-6 px-2.5 text-xs font-medium"
        >
          {detail.type}
        </Badge>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Pencil className="size-4 text-white" />}
          onClick={() =>
            navigate({
              to: "/admin/partner/edit",
              search: { id: detail.id },
            })
          }
        >
          Edit Donatur
        </Button>
      </div>

      {/* Baris Ringkasan Statistik Mitra Donatur */}
      <PartnerStats stats={detailStats} />

      {/* Konten Utama Dua Kolom: Riwayat Donasi (Kiri) & Profil Donatur (Kanan) */}
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        <PartnerDetailDonationsTable
          partnerName={detail.name}
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
          onAddDonation={handleAddDonation}
        />

        <PartnerDetailProfileCard detail={detail} />
      </div>
    </div>
  );
}
