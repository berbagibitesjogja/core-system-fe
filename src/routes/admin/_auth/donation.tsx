import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/admin/_auth/donation")({
  component: DonationPage,
});

/**
 * DonationPage: Halaman manajemen donasi (Food Rescue & CSR) untuk Admin.
 * Mengintegrasikan kartu ringkasan statistik, toolbar pencarian & filter tanggal,
 * tabel donasi interaktif, dialog konfirmasi hapus, dan notifikasi toast resmi.
 */
function DonationPage() {
  // DEV ONLY: Simulasi loading skeleton selama 5 detik setiap kali berpindah atau membuka halaman ini.
  // PENTING: Saat integrasi API/backend nanti, HAPUS timer simulasi ini dan ganti dengan status isLoading/isFetching bawaan TanStack Query (misal: donationsQuery.isLoading).
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // State Data Donasi & Filter
  const [donations, setDonations] =
    React.useState<DonationItem[]>(defaultDonations);
  const [activeFilterId, setActiveFilterId] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dateFrom, setDateFrom] = React.useState<string>("");
  const [dateTo, setDateTo] = React.useState<string>("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc",
  );
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // State Dialog Modal
  const [deleteTarget, setDeleteTarget] = React.useState<DonationItem | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isCannotDeleteDialogOpen, setIsCannotDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  // Filter Program yang sedang aktif
  const activeProgramOption = defaultProgramFilterOptions.find(
    (opt) => opt.id === activeFilterId,
  );

  // Pemrosesan Filter & Pencarian Data
  const filteredDonations = React.useMemo(() => {
    let result = [...donations];

    // Filter berdasarkan Program (Food Rescue / CSR)
    if (activeProgramOption && activeProgramOption.programValue !== "ALL") {
      result = result.filter(
        (item) => item.program === activeProgramOption.programValue,
      );
    }

    // Filter berdasarkan Kata Kunci Pencarian (Nama Donatur)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((item) =>
        item.donorName.toLowerCase().includes(query),
      );
    }

    // Filter berdasarkan Rentang Tanggal
    if (dateFrom) {
      result = result.filter((item) => item.isoDate >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((item) => item.isoDate <= dateTo);
    }

    // Pengurutan Tanggal (Ascending / Descending)
    result.sort((a, b) => {
      const cmp = a.isoDate.localeCompare(b.isoDate);
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return result;
  }, [
    donations,
    activeProgramOption,
    searchQuery,
    dateFrom,
    dateTo,
    sortDirection,
  ]);

  // Handler Paginasi
  const totalItems = filteredDonations.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / 10));

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * 10;
    return filteredDonations.slice(start, start + 10);
  }, [filteredDonations, currentPage]);

  // Handler Aksi Baris Tabel
  const handleSortToggle = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleView = (item: DonationItem) => {
    toast.info(`Melihat detail donasi: ${item.donorName}`);
  };

  const handleEdit = (item: DonationItem) => {
    toast.info(`Mengubah data donasi: ${item.donorName}`);
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
    toast.info("Formulir penambahan donasi baru akan segera hadir.");
  };

  // Tampilkan skeleton saat loading aktif
  if (isLoading) {
    return <DonationSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Baris Kartu Statistik Donasi */}
      <DonationStats stats={defaultDonationStats} />

      {/* 2. Toolbar Penyaringan & Pencarian */}
      <DonationToolbar
        filterOptions={defaultProgramFilterOptions}
        activeFilterId={activeFilterId}
        onFilterChange={(id) => {
          setActiveFilterId(id);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        dateFrom={dateFrom}
        onDateFromChange={(date) => {
          setDateFrom(date);
          setCurrentPage(1);
        }}
        dateTo={dateTo}
        onDateToChange={(date) => {
          setDateTo(date);
          setCurrentPage(1);
        }}
        onAddDonation={handleAddDonation}
      />

      {/* 3. Tabel Data Donasi & Paginasi */}
      <DonationTable
        data={paginatedData}
        totalCount={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        sortDirection={sortDirection}
        onSortToggle={handleSortToggle}
        searchQuery={searchQuery}
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
