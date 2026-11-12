import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import {
  defaultDonations,
  defaultDonationStats,
  defaultProgramFilterOptions,
  DonationCannotDeleteDialog,
  DonationDeleteDialog,
  DonationSkeleton,
  DonationStats,
  DonationTable,
  DonationToolbar,
} from "#/components/pages/donation";
import type { DonationItem } from "#/components/pages/donation";

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

  // DEV ONLY: Simulasi loading skeleton selama 3 detik saat awal render
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  // State Data Donasi Lokal (untuk operasi hapus di client)
  const [donations, setDonations] =
    React.useState<DonationItem[]>(defaultDonations);

  // State Dialog Modal
  const [deleteTarget, setDeleteTarget] = React.useState<DonationItem | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isCannotDeleteDialogOpen, setIsCannotDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  // 2. Pemrosesan Filter, Pencarian, Pengurutan, & Paginasi Berdasarkan URL Search Params
  const { paginatedData, totalItems, totalPages } = React.useMemo(() => {
    let result = [...donations];

    // Filter berdasarkan Program (Food Rescue / CSR)
    if (program === "food-rescue") {
      result = result.filter((item) => item.program === "Food Rescue");
    } else if (program === "csr") {
      result = result.filter((item) => item.program === "CSR");
    }

    // Filter berdasarkan Kata Kunci Pencarian (Nama Donatur)
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((item) =>
        item.donorName.toLowerCase().includes(query),
      );
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

    // Perhitungan Total dan Slice Paginasi
    const totalCount = result.length;
    const pages = Math.max(1, Math.ceil(totalCount / per_page));
    const start = (page - 1) * per_page;
    const sliced = result.slice(start, start + per_page);

    return {
      paginatedData: sliced,
      totalItems: totalCount,
      totalPages: pages,
    };
  }, [donations, program, search, from, to, sort, page, per_page]);

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
      search: {
        id: item.id,
        state: item.quotaClaimed === 0 ? "empty" : undefined,
      },
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
      // Donasi sudah memiliki klaim/surplus, tampilkan modal pencegahan (Figma 119:3525)
      setDeleteTarget(item);
      setIsCannotDeleteDialogOpen(true);
    } else {
      // Donasi dapat dihapus, tampilkan modal konfirmasi (Figma 119:3350)
      setDeleteTarget(item);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    setIsDeleting(true);

    setTimeout(() => {
      setDonations((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);

      // Tampilkan toast notifikasi berhasil dihapus sesuai Figma 119:3691
      toast.success("Donasi berhasil dihapus");
    }, 400);
  };

  const handleAddDonation = () => {
    navigate({ to: "/admin/donation/add" });
  };

  // Tampilkan skeleton saat loading aktif
  if (isLoading) {
    return <DonationSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Baris Kartu Statistik Donasi */}
      <DonationStats stats={defaultDonationStats} />

      {/* 2. Toolbar Penyaringan & Pencarian (Tersinkronisasi dengan URL) */}
      <DonationToolbar
        filterOptions={defaultProgramFilterOptions}
        activeFilterId={program}
        onFilterChange={(id) => updateSearch({ program: id as any, page: 1 })}
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
        data={paginatedData}
        totalCount={totalItems}
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
        userRole="super_admin"
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
