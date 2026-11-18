import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Pencil, Sparkles } from "lucide-react";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import { cn } from "#/lib/utils";
import { defaultVolunteerActivities } from "./volunteer-data";
import type {
  VolunteerDivisionOption,
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

export type VolunteerDetailTabKey = "activity" | "settings";

export interface VolunteerDetailWorkspaceProps {
  volunteer: VolunteerRecord;
  userRole?: VolunteerUserRole;
  initialTab?: VolunteerDetailTabKey;
  isLoading?: boolean;
  divisionOptions?: VolunteerDivisionOption[];
  onVolunteerUpdate?: (updated: VolunteerRecord) => void;
  onSaveProfile?: (values: VolunteerFormValues) => Promise<void> | void;
  onDeleteVolunteer?: (volunteer: VolunteerRecord) => Promise<void> | void;
  isSaving?: boolean;
  isDeleting?: boolean;
  blockedDeleteTarget?: VolunteerRecord | null;
  onClearBlockedDelete?: () => void;
}

/**
 * VolunteerDetailWorkspace: Komponen presentasional halaman Detail Volunteer (Figma 151:21395 - 151:22876).
 * Seluruh pemanggilan Server Function dipusatkan di berkas rute detail.tsx.
 */
export function VolunteerDetailWorkspace({
  volunteer: initialVolunteer,
  userRole = "super_admin",
  initialTab,
  isLoading = false,
  divisionOptions,
  onVolunteerUpdate,
  onSaveProfile,
  onDeleteVolunteer,
  isSaving = false,
  isDeleting = false,
  blockedDeleteTarget = null,
  onClearBlockedDelete,
}: VolunteerDetailWorkspaceProps) {
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const [volunteer, setVolunteer] =
    React.useState<VolunteerRecord>(initialVolunteer);

  // Sinkronisasi data saat initialVolunteer berubah dari query API
  React.useEffect(() => {
    setVolunteer(initialVolunteer);
  }, [initialVolunteer]);

  const [deleteTarget, setDeleteTarget] =
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

  // Handler simpan data profil
  const handleSaveProfile = async (values: VolunteerFormValues) => {
    if (onSaveProfile) {
      await onSaveProfile(values);
    }
    const updated: VolunteerRecord = {
      ...volunteer,
      name: values.name,
      email: values.email,
      phone: values.phone,
      division: values.division,
      role: values.role,
    };
    setVolunteer(updated);
    onVolunteerUpdate?.(updated);
  };

  // Handler konfirmasi hapus volunteer
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    if (onDeleteVolunteer) {
      await onDeleteVolunteer(deleteTarget);
    }
    setDeleteTarget(null);
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
              divisionOptions={divisionOptions}
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

      {/* Modal Gagal Hapus 409 (Terikat Data Relasi / Last Super) */}
      <VolunteerCannotDeleteDialog
        isOpen={Boolean(blockedDeleteTarget)}
        onClose={() => onClearBlockedDelete?.()}
        volunteer={blockedDeleteTarget}
      />
    </div>
  );
}
