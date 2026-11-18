import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  computeDonationStats,
  computeProgramFilterOptions,
  DonationCannotDeleteDialog,
  DonationDeleteDialog,
  DonationSkeleton,
  DonationStats,
  DonationTable,
  DonationToolbar,
} from "#/components/pages/donation";
import type { DonationItem } from "#/components/pages/donation";
import { useUserProfile } from "#/hooks";
import { idDonation } from "#/locales";
import {
  cancelDonation,
  deleteDonation,
  getDonations,
  mapDonationToDonationItem,
} from "#/services/donationService";
import { isApiError } from "#/services/errorService";

// Skema validasi Search Params URL tipe-aman Zod sesuai standar WP4 & GEMINI.md
const donationSearchSchema = z.object({
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce.number().int().positive().optional().catch(10),
  search: z.string().optional().catch(""),
  program: z.enum(["all", "food-rescue", "csr"]).optional().catch("all"),
  from: z.string().optional().catch(""),
  to: z.string().optional().catch(""),
  sort: z.enum(["asc", "desc"]).optional().catch("desc"),
});

export type DonationSearchParams = z.infer<typeof donationSearchSchema>;

export const Route = createFileRoute("/admin/_auth/donation/")({
  validateSearch: (search: Record<string, unknown>) => {
    return donationSearchSchema.parse({
      ...search,
      page: search.page,
      per_page: search.per_page ?? search.perpage,
      search: typeof search.search === "string" ? search.search : "",
      program: typeof search.program === "string" ? search.program : "all",
      from: typeof search.from === "string" ? search.from : "",
      to: typeof search.to === "string" ? search.to : "",
      sort: search.sort === "asc" ? "asc" : "desc",
    });
  },
  component: DonationPage,
});

/**
 * DonationPage: Halaman manajemen donasi (Food Rescue & CSR) untuk Admin.
 * Mengintegrasikan URL Search Params (search, program, from, to, sort, page) via Zod,
 * kartu ringkasan statistik, toolbar penyaringan, tabel donasi interaktif, dan notifikasi.
 */
function DonationPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profile = useUserProfile();

  const getDonationsFn = useServerFn(getDonations);
  const deleteDonationFn = useServerFn(deleteDonation);
  const cancelDonationFn = useServerFn(cancelDonation);

  // 1. Mengambil parameter kontrol langsung dari URL via Route.useSearch()
  const searchParams = Route.useSearch();
  const page = searchParams.page ?? 1;
  const per_page = searchParams.per_page ?? 10;
  const search = searchParams.search ?? "";
  const program = searchParams.program ?? "all";
  const from = searchParams.from ?? "";
  const to = searchParams.to ?? "";
  const sort = searchParams.sort ?? "desc";

  // Helper untuk memperbarui URL query params secara tipe-aman
  const updateSearch = React.useCallback(
    (newParams: Partial<DonationSearchParams>) => {
      navigate({
        to: "/admin/donation",
        search: (prev) => ({
          page: newParams.page ?? prev.page ?? 1,
          per_page: newParams.per_page ?? prev.per_page ?? 10,
          search: newParams.search ?? prev.search ?? "",
          program: newParams.program ?? prev.program ?? "all",
          from: newParams.from ?? prev.from ?? "",
          to: newParams.to ?? prev.to ?? "",
          sort: newParams.sort ?? prev.sort ?? "desc",
        }),
        replace: true,
      });
    },
    [navigate],
  );

  // Query daftar donasi langsung dari API backend core-system
  const donationsQuery = useQuery({
    queryKey: ["donations", { page, per_page, search }],
    queryFn: () =>
      getDonationsFn({
        data: {
          page,
          limit: per_page,
          search: search.trim() || undefined,
        },
      }),
  });

  // Query ikhtisar seluruh donasi untuk metrik ringkasan riil
  const allDonationsQuery = useQuery({
    queryKey: ["donations", "overview"],
    queryFn: () => getDonationsFn({ data: { limit: 100 } }),
    staleTime: 1000 * 60 * 5,
  });

  const rawDonations = donationsQuery.data?.data;
  const donations = React.useMemo<DonationItem[]>(() => {
    if (!Array.isArray(rawDonations)) return [];
    return rawDonations.map(mapDonationToDonationItem);
  }, [rawDonations]);

  const rawAllDonations = allDonationsQuery.data?.data;
  const allDonations = React.useMemo<DonationItem[]>(() => {
    if (!Array.isArray(rawAllDonations)) return donations;
    return rawAllDonations.map(mapDonationToDonationItem);
  }, [rawAllDonations, donations]);

  const stats = React.useMemo(
    () => computeDonationStats(allDonations),
    [allDonations],
  );

  const filterOptions = React.useMemo(
    () =>
      computeProgramFilterOptions(
        allDonations,
        allDonationsQuery.data?.meta.total,
      ),
    [allDonations, allDonationsQuery.data?.meta.total],
  );

  // 2. Pemrosesan Filter, Rentang Tanggal, & Pengurutan Berdasarkan URL Search Params
  const filteredDonations = React.useMemo(() => {
    let result = [...donations];

    // Filter berdasarkan Program (Food Rescue / CSR)
    if (program === "food-rescue") {
      result = result.filter((item) => item.program === "Food Rescue");
    } else if (program === "csr") {
      result = result.filter((item) => item.program === "CSR");
    }

    // Filter berdasarkan Rentang Tanggal
    if (from) {
      result = result.filter((item) => item.isoDate >= from);
    }
    if (to) {
      result = result.filter((item) => item.isoDate <= to);
    }

    // Pengurutan Tanggal (Ascending / Descending)
    result.sort((a, b) => {
      const cmp = a.isoDate.localeCompare(b.isoDate);
      return sort === "asc" ? cmp : -cmp;
    });

    return result;
  }, [donations, program, from, to, sort]);

  const totalCount =
    donationsQuery.data?.meta.total ?? filteredDonations.length;
  const totalPages =
    donationsQuery.data?.meta.total_pages ??
    Math.max(1, Math.ceil(totalCount / per_page));

  // State Dialog Modal
  const [deleteTarget, setDeleteTarget] = React.useState<DonationItem | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isCannotDeleteDialogOpen, setIsCannotDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  // Handler Aksi Baris Tabel
  const handleSortToggle = () => {
    updateSearch({ sort: sort === "asc" ? "desc" : "asc" });
  };

  const handleClearSearch = () => {
    updateSearch({ search: "", page: 1 });
  };

  const handleView = (item: DonationItem) => {
    navigate({
      to: "/admin/donation/detail",
      search: { id: item.id },
    });
  };

  const handleEdit = (item: DonationItem) => {
    navigate({
      to: "/admin/donation/edit",
      search: { id: item.id },
    });
  };

  const handleDeleteTrigger = (item: DonationItem) => {
    if (!item.canDelete) {
      // Donasi bukan draft (sudah open/completed/dll), tampilkan modal keterangan tidak bisa hapus
      setDeleteTarget(item);
      setIsCannotDeleteDialogOpen(true);
    } else {
      // Donasi draft dapat dihapus, tampilkan modal konfirmasi
      setDeleteTarget(item);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);

    try {
      if (deleteTarget.canDelete) {
        await deleteDonationFn({ data: { id: deleteTarget.id } });
      } else {
        await cancelDonationFn({ data: { id: deleteTarget.id } });
      }

      await queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast.success(
        idDonation.list.toasts.deleteSuccess(deleteTarget.donorName),
      );
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idDonation.list.toasts.deleteFailed);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddDonation = () => {
    navigate({ to: "/admin/donation/add" });
  };

  // Tampilkan skeleton saat loading aktif
  if (donationsQuery.isLoading) {
    return <DonationSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Baris Kartu Statistik Donasi */}
      <DonationStats stats={stats} />

      {/* 2. Toolbar Penyaringan & Pencarian (Tersinkronisasi dengan URL) */}
      <DonationToolbar
        filterOptions={filterOptions}
        activeFilterId={program}
        onFilterChange={(id) =>
          updateSearch({
            program: id === "food-rescue" || id === "csr" ? id : "all",
            page: 1,
          })
        }
        searchQuery={search}
        onSearchChange={(query) => updateSearch({ search: query, page: 1 })}
        dateFrom={from}
        onDateFromChange={(date) => updateSearch({ from: date, page: 1 })}
        dateTo={to}
        onDateToChange={(date) => updateSearch({ to: date, page: 1 })}
        onAddDonation={handleAddDonation}
      />

      {/* 3. Tabel Data Donasi & Paginasi (Tersinkronisasi dengan URL) */}
      <DonationTable
        data={filteredDonations}
        totalCount={totalCount}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => updateSearch({ page: newPage })}
        perPage={per_page}
        onPerPageChange={(newPerPage) =>
          updateSearch({ per_page: newPerPage, page: 1 })
        }
        sortDirection={sort}
        onSortToggle={handleSortToggle}
        searchQuery={search}
        onClearSearch={handleClearSearch}
        onViewItem={handleView}
        onEditItem={handleEdit}
        onDeleteItem={handleDeleteTrigger}
        userRole={profile.sidebarRole}
      />

      {/* 4. Modal Dialog Konfirmasi Tindakan Hapus (Figma 119:3350) */}
      <DonationDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        donation={deleteTarget}
        isLoading={isDeleting}
      />

      {/* 5. Modal Dialog Donasi Tidak Dapat Dihapus (Figma 119:3525) */}
      <DonationCannotDeleteDialog
        isOpen={isCannotDeleteDialogOpen}
        onClose={() => {
          setIsCannotDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
