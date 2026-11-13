import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import {
  getVolunteerStats,
  INITIAL_VOLUNTEER_RECORDS,
  VOLUNTEER_DIVISION_OPTIONS,
  VolunteerCannotDeleteDialog,
  VolunteerDeleteDialog,
  VolunteerPageSkeleton,
  VolunteerStats,
  VolunteerTable,
  VolunteerToolbar,
} from "#/components/pages/volunteer";
import type {
  VolunteerDemoModal,
  VolunteerRecord,
  VolunteerUserRole,
} from "#/components/pages/volunteer";

const validDivisionIds = new Set(
  VOLUNTEER_DIVISION_OPTIONS.map((option) => option.id),
);

// Skema validasi parameter URL tipe-aman untuk halaman Volunteer
const volunteerSearchSchema = z.object({
  division: z.string().optional().catch("all"),
  search: z.string().optional().catch(""),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce.number().int().positive().optional().catch(10),
  role: z
    .enum(["super_admin", "core", "staff"])
    .optional()
    .catch("super_admin"),
  modal: z.enum(["none", "delete", "cannot-delete"]).optional().catch("none"),
  loading: z.coerce.boolean().optional().catch(false),
});

export const Route = createFileRoute("/admin/_auth/volunteer/")({
  validateSearch: (search: Record<string, unknown>) => {
    const rawDivision =
      typeof search.division === "string" ? search.division.trim() : "all";
    const matchedDivision =
      VOLUNTEER_DIVISION_OPTIONS.find(
        (opt) => opt.id.toLowerCase() === rawDivision.toLowerCase(),
      )?.id ?? "all";

    const rawRole = typeof search.role === "string" ? search.role : "";
    const normalizedRole: VolunteerUserRole =
      rawRole === "staff"
        ? "staff"
        : rawRole === "core"
          ? "core"
          : "super_admin";

    const rawModal = typeof search.modal === "string" ? search.modal : "none";
    const normalizedModal: VolunteerDemoModal =
      rawModal === "delete" || rawModal === "cannot-delete" ? rawModal : "none";

    return volunteerSearchSchema.parse({
      ...search,
      division: validDivisionIds.has(matchedDivision) ? matchedDivision : "all",
      search: typeof search.search === "string" ? search.search : "",
      page: search.page ?? 1,
      per_page: search.per_page ?? search.perpage ?? 10,
      role: normalizedRole,
      modal: normalizedModal,
      loading:
        search.loading === true ||
        search.loading === "true" ||
        search.loading === "1",
    });
  },
  component: VolunteerPage,
});

function VolunteerPage() {
  const navigate = useNavigate();
  const layoutContext = useAdminLayout();
  const {
    division = "all",
    search = "",
    page = 1,
    per_page = 10,
    role = "super_admin",
    modal = "none",
    loading = false,
  } = Route.useSearch();

  // DEV ONLY: Simulasi loading skeleton selama 3 detik saat awal render
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [volunteers, setVolunteers] = React.useState<VolunteerRecord[]>(
    INITIAL_VOLUNTEER_RECORDS,
  );
  const [deleteTarget, setDeleteTarget] =
    React.useState<VolunteerRecord | null>(null);
  const [cannotDeleteTarget, setCannotDeleteTarget] =
    React.useState<VolunteerRecord | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Sinkronisasi profil Header & menu Sidebar saat mode preview role=staff (Figma 149:20257)
  React.useEffect(() => {
    if (!layoutContext) return;

    if (role === "staff") {
      layoutContext.setSidebarUserRole("staff");
      layoutContext.setHeaderOverride({
        user: {
          name: "Bima Aditya",
          role: "Staff",
          division: "Divisi Logistik",
          initials: "BA",
        },
      });
    } else if (role === "core") {
      layoutContext.setSidebarUserRole("core");
      layoutContext.setHeaderOverride({
        user: {
          name: "Fauzan Trisuladana",
          role: "Core",
          division: "Divisi IT",
          initials: "FT",
        },
      });
    } else {
      layoutContext.setSidebarUserRole("super_admin");
      layoutContext.setHeaderOverride(null);
    }

    return () => {
      layoutContext.setSidebarUserRole(null);
      layoutContext.setHeaderOverride(null);
    };
  }, [role, layoutContext]);

  // Sinkronisasi state modal dari query param URL (?modal=delete atau ?modal=cannot-delete)
  React.useEffect(() => {
    const defaultTarget =
      volunteers.find((item) => item.id === "vol-10") ??
      volunteers.at(0) ??
      null;

    if (modal === "delete") {
      setDeleteTarget(defaultTarget);
      setCannotDeleteTarget(null);
    } else if (modal === "cannot-delete") {
      setCannotDeleteTarget(defaultTarget);
      setDeleteTarget(null);
    }
  }, [modal, volunteers]);

  // Hitung metrik kartu statistik dari seluruh daftar anggota
  const stats = React.useMemo(
    () => getVolunteerStats(volunteers),
    [volunteers],
  );

  // Penyaringan berdasarkan Divisi & Kata Kunci Pencarian (nama, email, no. wa)
  const filteredVolunteers = React.useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();
    const queryDigits = normalizedQuery.replace(/\D/g, "");

    return volunteers.filter((item) => {
      if (division !== "all" && item.division !== division) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const matchName = item.name.toLowerCase().includes(normalizedQuery);
      const matchEmail = item.email.toLowerCase().includes(normalizedQuery);
      const matchPhoneRaw = item.phone.toLowerCase().includes(normalizedQuery);
      const matchPhoneDigits =
        queryDigits.length > 0 &&
        item.phone.replace(/\D/g, "").includes(queryDigits);

      return matchName || matchEmail || matchPhoneRaw || matchPhoneDigits;
    });
  }, [volunteers, division, search]);

  const totalCount = filteredVolunteers.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / per_page));
  const currentPage = Math.min(page, totalPages);

  const paginatedVolunteers = React.useMemo(() => {
    const startIndex = (currentPage - 1) * per_page;
    return filteredVolunteers.slice(startIndex, startIndex + per_page);
  }, [filteredVolunteers, currentPage, per_page]);

  const hasActiveFilters = division !== "all" || search.trim().length > 0;

  // Handler pembaruan URL Search Params
  const updateSearchParams = React.useCallback(
    (
      updates: Partial<{
        division: string;
        search: string;
        page: number;
        per_page: number;
        role: VolunteerUserRole;
        modal: VolunteerDemoModal;
      }>,
    ) => {
      navigate({
        to: "/admin/volunteer",
        search: {
          division: updates.division ?? division,
          search: updates.search ?? search,
          page: updates.page ?? page,
          per_page: updates.per_page ?? per_page,
          role: updates.role ?? role,
          modal: updates.modal ?? modal,
          loading,
        },
        replace: true,
      });
    },
    [navigate, division, search, page, per_page, role, modal, loading],
  );

  const handleDivisionChange = (newDivision: string) => {
    updateSearchParams({ division: newDivision, page: 1 });
  };

  const handleSearchChange = (newQuery: string) => {
    updateSearchParams({ search: newQuery, page: 1 });
  };

  const handleResetFilters = () => {
    updateSearchParams({ division: "all", search: "", page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage });
  };

  const handlePerPageChange = (newPerPage: number) => {
    updateSearchParams({ per_page: newPerPage, page: 1 });
  };

  const handleCloseModals = () => {
    setDeleteTarget(null);
    setCannotDeleteTarget(null);
    if (modal !== "none") {
      updateSearchParams({ modal: "none" });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    window.setTimeout(() => {
      setIsDeleting(false);

      // Jika volunteer masih terikat penugasan war aktif atau reimburse (409), tampilkan modal gagal hapus (Figma 149:21949)
      if (deleteTarget.hasActiveRelations) {
        const blockedVolunteer = deleteTarget;
        setDeleteTarget(null);
        setCannotDeleteTarget(blockedVolunteer);
        return;
      }

      setVolunteers((prev) =>
        prev.filter((item) => item.id !== deleteTarget.id),
      );
      toast.success(`Volunteer ${deleteTarget.name} berhasil dihapus.`);
      handleCloseModals();
    }, 250);
  };

  if (loading || isLoading) {
    return <VolunteerPageSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      {/* Baris Kartu Statistik (Total Anggota, Pengurus, Relawan) */}
      <VolunteerStats stats={stats} />

      {/* Toolbar Filter Divisi, Pencarian, dan Tombol Tambah Volunteer */}
      <VolunteerToolbar
        selectedDivision={division}
        onDivisionChange={handleDivisionChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        onAddVolunteer={() => navigate({ to: "/admin/volunteer/add" })}
      />

      {/* Tabel Daftar Volunteer & Paginasi */}
      <VolunteerTable
        data={paginatedVolunteers}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        perPage={per_page}
        onPerPageChange={handlePerPageChange}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
        userRole={role}
        onViewDetail={(volunteer) =>
          navigate({
            to: "/admin/volunteer/edit",
            search: { id: volunteer.id },
          })
        }
        onDeleteVolunteer={(volunteer) => {
          setCannotDeleteTarget(null);
          setDeleteTarget(volunteer);
        }}
      />

      {/* Modal Konfirmasi Hapus Volunteer (Figma 149:21677) */}
      <VolunteerDeleteDialog
        isOpen={Boolean(deleteTarget)}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        volunteer={deleteTarget}
        isLoading={isDeleting}
      />

      {/* Modal Gagal Hapus 409 — Terikat Data (Figma 149:21949) */}
      <VolunteerCannotDeleteDialog
        isOpen={Boolean(cannotDeleteTarget)}
        onClose={handleCloseModals}
        volunteer={cannotDeleteTarget}
      />
    </div>
  );
}
