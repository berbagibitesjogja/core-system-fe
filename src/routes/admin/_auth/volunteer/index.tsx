import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "#/components/ui/toast";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import {
  getDivisionIdByName,
  getVolunteerStats,
  mapDivisionsToOptions,
  VolunteerCannotDeleteDialog,
  VolunteerDeleteDialog,
  VolunteerPageSkeleton,
  VolunteerStats,
  VolunteerTable,
  VolunteerToolbar,
} from "#/components/pages/volunteer";
import type {
  VolunteerRecord,
  VolunteerUserRole,
} from "#/components/pages/volunteer";
import { getDivisions } from "#/services/divisionService";
import {
  deleteVolunteerStaff,
  getVolunteers,
  mapStaffToVolunteerRecord,
} from "#/services/volunteerService";
import { idVolunteer } from "#/locales";
import { isApiError } from "#/services/errorService";

// Skema validasi parameter URL tipe-aman untuk halaman Volunteer
const volunteerSearchSchema = z.object({
  division: z.string().optional().catch("all"),
  search: z.string().optional().catch(""),
  page: z.coerce.number().int().positive().optional().catch(1),
  per_page: z.coerce.number().int().positive().optional().catch(10),
  role: z.enum(["super_admin", "core", "staff"]).optional().catch(undefined),
});

export const Route = createFileRoute("/admin/_auth/volunteer/")({
  validateSearch: (search: Record<string, unknown>) => {
    const rawDivision =
      typeof search.division === "string" ? search.division.trim() : "all";

    const rawRole = typeof search.role === "string" ? search.role : undefined;
    const normalizedRole: VolunteerUserRole | undefined =
      rawRole === "staff" || rawRole === "core" || rawRole === "super_admin"
        ? rawRole
        : undefined;

    return volunteerSearchSchema.parse({
      ...search,
      division: rawDivision || "all",
      search: typeof search.search === "string" ? search.search : "",
      page: search.page ?? 1,
      per_page: search.per_page ?? search.perpage ?? 10,
      role: normalizedRole,
    });
  },
  component: VolunteerPage,
});

function VolunteerPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const layoutContext = useAdminLayout();
  const {
    division = "all",
    search = "",
    page = 1,
    per_page = 10,
    role,
  } = Route.useSearch();

  const getDivisionsFn = useServerFn(getDivisions);
  const getVolunteersFn = useServerFn(getVolunteers);
  const deleteVolunteerStaffFn = useServerFn(deleteVolunteerStaff);

  // Mengambil daftar divisi secara dinamis via TanStack Query
  const divisionsQuery = useQuery({
    queryKey: ["divisions"],
    queryFn: () => getDivisionsFn(),
  });

  const divisionList = divisionsQuery.data?.data ?? [];
  const divisionOptions = React.useMemo(
    () => mapDivisionsToOptions(divisionList),
    [divisionList],
  );

  const divisionId =
    division !== "all"
      ? getDivisionIdByName(division, divisionList)
      : undefined;

  // Mengambil daftar staf secara langsung via TanStack Query
  const volunteersQuery = useQuery({
    queryKey: ["volunteers", { page, per_page, search, division, divisionId }],
    queryFn: () =>
      getVolunteersFn({
        data: {
          page,
          limit: per_page,
          division_id: divisionId,
          search: search.trim() || undefined,
        },
      }),
  });

  const rawStaffList = volunteersQuery.data?.data ?? [];
  const volunteers = React.useMemo(
    () => rawStaffList.map(mapStaffToVolunteerRecord),
    [rawStaffList],
  );

  const totalCount = volunteersQuery.data?.meta.total ?? volunteers.length;
  const totalPages =
    volunteersQuery.data?.meta.total_pages ??
    Math.max(1, Math.ceil(totalCount / per_page));
  const currentPage = Math.min(page, totalPages);

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

  // Hitung metrik kartu statistik dari seluruh daftar anggota
  const stats = React.useMemo(
    () => getVolunteerStats(volunteers, totalCount),
    [volunteers, totalCount],
  );

  const hasActiveFilters = division !== "all" || search.trim().length > 0;

  // Handler pembaruan URL Search Params
  const updateSearchParams = React.useCallback(
    (
      updates: Partial<{
        division: string;
        search: string;
        page: number;
        per_page: number;
        role?: VolunteerUserRole;
      }>,
    ) => {
      navigate({
        to: "/admin/volunteer",
        search: {
          division: updates.division ?? division,
          search: updates.search ?? search,
          page: updates.page ?? page,
          per_page: updates.per_page ?? per_page,
          ...(updates.role !== undefined || role !== undefined
            ? { role: updates.role ?? role }
            : {}),
        },
        replace: true,
      });
    },
    [navigate, division, search, page, per_page, role],
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
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await deleteVolunteerStaffFn({ data: { id: deleteTarget.id } });
      await queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      toast.success(idVolunteer.list.toasts.deleteSuccess(deleteTarget.name));
      handleCloseModals();
    } catch (error) {
      if (
        isApiError(error) &&
        (error.code === "ROLE_LAST_SUPER" ||
          error.status === 400 ||
          error.status === 409)
      ) {
        const blockedVolunteer = deleteTarget;
        setDeleteTarget(null);
        setCannotDeleteTarget(blockedVolunteer);
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : idVolunteer.list.toasts.deleteFailed,
        );
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (volunteersQuery.isLoading) {
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
        divisionOptions={divisionOptions}
      />

      {/* Tabel Daftar Volunteer & Paginasi */}
      <VolunteerTable
        data={volunteers}
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
            to: "/admin/volunteer/detail",
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
