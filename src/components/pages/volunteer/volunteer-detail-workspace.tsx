import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Pencil, Sparkles } from "lucide-react";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import { toast } from "#/components/ui/toast";
import { cn } from "#/lib/utils";
import {
  defaultVolunteerActivities,
  DIVISION_NAME_TO_ID,
} from "./volunteer-data";
import type {
  VolunteerFormValues,
  VolunteerRecord,
  VolunteerUserRole,
} from "./volunteer-data";
import { VolunteerCannotDeleteDialog } from "./volunteer-cannot-delete-dialog";
import { VolunteerDeleteDialog } from "./volunteer-delete-dialog";
import { VolunteerDetailActivityTab } from "./volunteer-detail-activity-tab";
import { VolunteerDetailDangerZone } from "./volunteer-detail-danger-zone";
import { VolunteerDetailProfileCard } from "./volunteer-detail-profile-card";
import { VolunteerDetailSettingsTab } from "./volunteer-detail-settings-tab";
import { VolunteerDetailSkeleton } from "./volunteer-detail-skeleton";
import {
  deleteVolunteerStaff,
  updateVolunteerStaff,
} from "#/services/volunteerService";
import { idVolunteer } from "#/locales";
import { isApiError } from "#/services/errorService";

export type VolunteerDetailTabKey = "activity" | "settings";

export interface VolunteerDetailWorkspaceProps {
  volunteer: VolunteerRecord;
  userRole?: VolunteerUserRole;
  initialTab?: VolunteerDetailTabKey;
  isLoading?: boolean;
  onVolunteerUpdate?: (updated: VolunteerRecord) => void;
  onVolunteerDelete?: (deletedId: string) => void;
}

/**
 * VolunteerDetailWorkspace: Orkestrator halaman Detail Volunteer (Figma 151:21395 - 151:22876).
 */
export function VolunteerDetailWorkspace({
  volunteer: initialVolunteer,
  userRole = "super_admin",
  initialTab,
  isLoading = false,
  onVolunteerUpdate,
  onVolunteerDelete,
}: VolunteerDetailWorkspaceProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const updateVolunteerStaffFn = useServerFn(updateVolunteerStaff);
  const deleteVolunteerStaffFn = useServerFn(deleteVolunteerStaff);

  const [volunteer, setVolunteer] =
    React.useState<VolunteerRecord>(initialVolunteer);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Sinkronisasi data saat initialVolunteer berubah dari query API
  React.useEffect(() => {
    setVolunteer(initialVolunteer);
  }, [initialVolunteer]);

  const [deleteTarget, setDeleteTarget] =
    React.useState<VolunteerRecord | null>(null);
  const [cannotDeleteTarget, setCannotDeleteTarget] =
    React.useState<VolunteerRecord | null>(null);

  // Super Admin dapat melihat tab Aktivitas (Figma 151:21395). Core & Staff hanya Pengaturan Profil (Figma 151:22180).
  const canViewActivity = userRole === "super_admin";
  // Super Admin & Core dapat menghapus (Figma 151:21858). Staff tidak memiliki tombol hapus (Figma 151:22528).
  const canDeleteAccount = userRole === "super_admin" || userRole === "core";

  const [activeTab, setActiveTab] = React.useState<VolunteerDetailTabKey>(
    () => {
      if (initialTab === "activity" && canViewActivity) return "activity";
      if (initialTab === "settings") return "settings";
      return canViewActivity ? "activity" : "settings";
    },
  );

  // Set Top Bar Header
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: volunteer.name,
      subtitle: "Profil dan pengaturan anggota",
      backLabel: "Kembali ke Daftar",
      onBack: () => navigate({ to: "/admin/volunteer" }),
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, volunteer.name, navigate]);

  // Handler simpan data profil (Figma 151:22876)
  const handleSaveProfile = async (values: VolunteerFormValues) => {
    setIsSaving(true);
    try {
      const backendRole: "super" | "core" | "staff" =
        values.role === "super"
          ? "super"
          : values.role === "core"
            ? "core"
            : "staff";

      const divisionId = DIVISION_NAME_TO_ID[values.division] ?? 3;

      await updateVolunteerStaffFn({
        data: {
          id: volunteer.id,
          role: backendRole,
          division_id: divisionId,
        },
      });

      const updated: VolunteerRecord = {
        ...volunteer,
        name: values.name,
        email: values.email,
        phone: values.phone,
        division: values.division as VolunteerRecord["division"],
        role: values.role,
      };
      setVolunteer(updated);
      onVolunteerUpdate?.(updated);

      // Mengedaluwarsakan seluruh query terkait pasca-perubahan data
      await queryClient.invalidateQueries({
        queryKey: ["volunteer-detail", volunteer.id],
      });
      await queryClient.invalidateQueries({ queryKey: ["volunteers"] });

      toast.success(idVolunteer.detail.toasts.updateSuccess(updated.name));
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      } else {
        toast.error(idVolunteer.detail.toasts.updateFailed);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handler konfirmasi hapus volunteer
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await deleteVolunteerStaffFn({ data: { id: deleteTarget.id } });
      await queryClient.invalidateQueries({ queryKey: ["volunteers"] });

      setDeleteTarget(null);
      toast.success(idVolunteer.detail.toasts.deleteSuccess(deleteTarget.name));
      onVolunteerDelete?.(deleteTarget.id);
      navigate({ to: "/admin/volunteer" });
    } catch (error) {
      if (
        isApiError(error) &&
        (error.code === "ROLE_LAST_SUPER" ||
          error.status === 400 ||
          error.status === 409)
      ) {
        const blocked = deleteTarget;
        setDeleteTarget(null);
        setCannotDeleteTarget(blocked);
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : idVolunteer.detail.toasts.deleteFailed,
        );
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <VolunteerDetailSkeleton
        showActivityTab={canViewActivity}
        showDangerZone={canDeleteAccount}
      />
    );
  }

  const formValues: VolunteerFormValues = {
    name: volunteer.name,
    email: volunteer.email,
    phone: volunteer.phone,
    division: volunteer.division,
    role: volunteer.role,
    address: "Jl. Kaliurang Km 5, Sleman",
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Kolom Kiri: Panel Profil & Tombol Chat WhatsApp */}
      <VolunteerDetailProfileCard volunteer={volunteer} />

      {/* Kolom Kanan: Tab Panel & Zona Bahaya */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-6">
        {/* Panel Tab */}
        <section
          aria-label="Detail Akun Volunteer"
          className="w-full rounded-2xl border border-neutral-200 bg-surface shadow-xs overflow-hidden"
        >
          {/* Header Tab (hanya tampil jika viewer memiliki akses lebih dari 1 tab) */}
          {canViewActivity && (
            <div
              role="tablist"
              aria-label="Navigasi Detail Volunteer"
              className="flex items-center gap-2 px-5 border-b border-neutral-200"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "activity"}
                onClick={() => setActiveTab("activity")}
                className={cn(
                  "flex items-center gap-2 px-2 py-4 border-b-2 -mb-px font-sans text-sm font-semibold leading-5 whitespace-nowrap transition-colors duration-150 cursor-pointer select-none",
                  activeTab === "activity"
                    ? "border-brand text-brand-strong"
                    : "border-transparent text-neutral-600 hover:text-neutral-900",
                )}
              >
                <Sparkles
                  className={cn(
                    "size-[18px] shrink-0",
                    activeTab === "activity"
                      ? "text-brand"
                      : "text-neutral-600",
                  )}
                  aria-hidden="true"
                />
                <span>Aktivitas</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
                className={cn(
                  "flex items-center gap-2 px-2 py-4 border-b-2 -mb-px font-sans text-sm font-semibold leading-5 whitespace-nowrap transition-colors duration-150 cursor-pointer select-none",
                  activeTab === "settings"
                    ? "border-brand text-brand-strong"
                    : "border-transparent text-neutral-600 hover:text-neutral-900",
                )}
              >
                <Pencil
                  className={cn(
                    "size-[18px] shrink-0",
                    activeTab === "settings"
                      ? "text-brand"
                      : "text-neutral-600",
                  )}
                  aria-hidden="true"
                />
                <span>Pengaturan Profil</span>
              </button>
            </div>
          )}

          {/* Isi Tab */}
          {activeTab === "activity" && canViewActivity ? (
            <VolunteerDetailActivityTab
              activities={defaultVolunteerActivities}
            />
          ) : (
            <VolunteerDetailSettingsTab
              initialValues={formValues}
              isSaving={isSaving}
              canEditRole={canDeleteAccount}
              onSubmit={handleSaveProfile}
            />
          )}
        </section>

        {/* Zona Bahaya Hapus Akun Volunteer (Super Admin & Core saja) */}
        {canDeleteAccount && (
          <VolunteerDetailDangerZone
            volunteerName={volunteer.name}
            onDelete={() => setDeleteTarget(volunteer)}
          />
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <VolunteerDeleteDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        volunteer={deleteTarget}
        isLoading={isDeleting}
      />

      {/* Modal Gagal Hapus 409 (Terikat Data Relasi) */}
      <VolunteerCannotDeleteDialog
        isOpen={Boolean(cannotDeleteTarget)}
        onClose={() => setCannotDeleteTarget(null)}
        volunteer={cannotDeleteTarget}
      />
    </div>
  );
}
