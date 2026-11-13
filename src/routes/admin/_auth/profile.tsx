import * as React from "react";
import {
  createFileRoute,
  useBlocker,
  useNavigate,
} from "@tanstack/react-router";
import { Pencil, Sparkles } from "lucide-react";
import { z } from "zod";
import {
  PROFILE_ROLE_META,
  PROFILE_SUCCESS_TOAST,
  PROFILE_TABS,
  ProfileActivityTab,
  ProfileLeaveDialog,
  ProfileSettingsTab,
  ProfileSummaryCard,
  areProfileFormValuesEqual,
  defaultProfileActivities,
  formatTopBarDivision,
  getInitialProfilePreset,
  toProfileFormValues,
  validateProfileSettings,
} from "#/components/pages/profile";
import type {
  ProfileFormErrors,
  ProfileFormValues,
  ProfileTabKey,
  UserProfileRecord,
} from "#/components/pages/profile";
import { toast } from "#/components/ui/toast";
import { cn } from "#/lib/utils";
import { useAdminLayout } from "#/components/shared/admin-layout-context";

// Skema validasi parameter query URL untuk tab, peran pratinjau, dan state Figma
const profileSearchSchema = z.object({
  tab: z.enum(["activity", "settings"]).optional().catch(undefined),
  role: z.enum(["super", "core", "staff"]).optional().catch(undefined),
  demo: z
    .enum(["default", "duplicate-phone", "leave", "saved"])
    .optional()
    .catch(undefined),
});

export type ProfileSearchParams = z.infer<typeof profileSearchSchema>;

export const Route = createFileRoute("/admin/_auth/profile")({
  validateSearch: (search: Record<string, unknown>) => {
    return profileSearchSchema.parse({
      tab: typeof search.tab === "string" ? search.tab : undefined,
      role: typeof search.role === "string" ? search.role : undefined,
      demo:
        typeof search.demo === "string"
          ? search.demo
          : typeof search.state === "string"
            ? search.state
            : undefined,
    });
  },
  component: ProfilePage,
});

const TAB_ICONS: Record<
  ProfileTabKey,
  React.ComponentType<{ className?: string }>
> = {
  activity: Sparkles,
  settings: Pencil,
};

/**
 * ProfilePage: Halaman Profil Saya yang menampilkan ringkasan akun di kiri
 * serta tab Aktivitas Saya (khusus Super Admin) & Pengaturan Profil di kanan
 * (Figma Node 157:25060 - 157:26784).
 */
function ProfilePage() {
  const {
    tab: searchTab,
    role: roleParam,
    demo: demoParam,
  } = Route.useSearch();
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;
  const setSidebarUserRole = adminLayout?.setSidebarUserRole;

  const initialPreset = React.useMemo(
    () => getInitialProfilePreset(roleParam, demoParam),
    [roleParam, demoParam],
  );

  const [savedProfile, setSavedProfile] = React.useState<UserProfileRecord>(
    initialPreset.profile,
  );
  const [draftValues, setDraftValues] = React.useState<ProfileFormValues>(
    initialPreset.formValues,
  );
  const [fieldErrors, setFieldErrors] = React.useState<ProfileFormErrors>(
    initialPreset.fieldErrors,
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [isManualLeaveOpen, setIsManualLeaveOpen] = React.useState(
    initialPreset.openLeaveDialog,
  );

  const allowLeaveRef = React.useRef(false);
  const hasShownSavedDemoRef = React.useRef(false);

  // Sinkronkan ulang state jika parameter preview URL berubah
  React.useEffect(() => {
    allowLeaveRef.current = false;
    setSavedProfile(initialPreset.profile);
    setDraftValues(initialPreset.formValues);
    setFieldErrors(initialPreset.fieldErrors);
    setIsManualLeaveOpen(initialPreset.openLeaveDialog);
    setIsSaving(false);
  }, [initialPreset]);

  // Tampilkan toast sukses otomatis ketika meninjau URL ?demo=saved
  React.useEffect(() => {
    if (demoParam === "saved" && !hasShownSavedDemoRef.current) {
      hasShownSavedDemoRef.current = true;
      toast.success(PROFILE_SUCCESS_TOAST);
    } else if (demoParam !== "saved") {
      hasShownSavedDemoRef.current = false;
    }
  }, [demoParam]);

  const savedRoleMeta = PROFILE_ROLE_META[savedProfile.role];
  const visibleTabs = React.useMemo(
    () =>
      PROFILE_TABS.filter(
        (tab) => !tab.requiresSuperAdmin || savedRoleMeta.canViewActivity,
      ),
    [savedRoleMeta.canViewActivity],
  );

  // Pastikan tab non-Super selalu diarahkan ke Pengaturan Profil
  const activeTab: ProfileTabKey = React.useMemo(() => {
    if (!savedRoleMeta.canViewActivity) {
      return "settings";
    }
    if (searchTab === "activity" || searchTab === "settings") {
      return searchTab;
    }
    return initialPreset.defaultTab;
  }, [savedRoleMeta.canViewActivity, searchTab, initialPreset.defaultTab]);

  const isDirty = React.useMemo(
    () => !areProfileFormValuesEqual(savedProfile, draftValues),
    [savedProfile, draftValues],
  );

  // Blokir navigasi keluar rute saat ada perubahan profil belum tersimpan
  const blocker = useBlocker({
    shouldBlockFn: ({ current, next }) =>
      isDirty && !allowLeaveRef.current && next.pathname !== current.pathname,
    enableBeforeUnload: isDirty,
    withResolver: true,
  });

  const handleBackToDashboard = React.useCallback(() => {
    navigate({ to: "/admin/dashboard" });
  }, [navigate]);

  // Sinkronkan Header Top Bar & visibilitas menu Sidebar sesuai akun aktif
  React.useEffect(() => {
    if (setHeaderOverride) {
      setHeaderOverride({
        title: "Profil Saya",
        subtitle: "Kelola data akun yang sedang kamu pakai",
        backLabel: "Kembali ke Dashboard",
        onBack: handleBackToDashboard,
        user: {
          name: savedProfile.name,
          role: savedRoleMeta.badgeLabel,
          division: formatTopBarDivision(savedProfile.division),
          email: savedProfile.email,
          avatarSrc: savedProfile.avatarSrc,
          isActive: true,
        },
      });
    }

    if (setSidebarUserRole) {
      setSidebarUserRole(savedRoleMeta.sidebarRole);
    }

    return () => {
      setHeaderOverride?.(null);
      setSidebarUserRole?.(null);
    };
  }, [
    setHeaderOverride,
    setSidebarUserRole,
    handleBackToDashboard,
    savedProfile.name,
    savedProfile.division,
    savedProfile.email,
    savedProfile.avatarSrc,
    savedRoleMeta.badgeLabel,
    savedRoleMeta.sidebarRole,
  ]);

  const handleTabChange = (nextTab: ProfileTabKey) => {
    if (nextTab === activeTab) return;
    if (nextTab === "activity" && !savedRoleMeta.canViewActivity) return;

    navigate({
      to: "/admin/profile",
      search: {
        tab: nextTab,
        role: roleParam,
        demo: undefined,
      },
      replace: true,
    });
  };

  const handleFieldChange = <TField extends keyof ProfileFormValues>(
    field: TField,
    value: ProfileFormValues[TField],
  ) => {
    setDraftValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;

    const validationErrors = validateProfileSettings(
      draftValues,
      savedProfile.whatsapp,
    );
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      // Simulasi request PATCH /v1/profile
      await new Promise((resolve) => setTimeout(resolve, 450));

      const nextProfile: UserProfileRecord = {
        ...savedProfile,
        name: draftValues.name.trim(),
        division: draftValues.division,
        role: savedRoleMeta.canEditRole ? draftValues.role : savedProfile.role,
        whatsapp: draftValues.whatsapp.trim(),
      };

      setSavedProfile(nextProfile);
      setDraftValues(toProfileFormValues(nextProfile));
      setFieldErrors({});
      toast.success(PROFILE_SUCCESS_TOAST);

      // Pastikan tab tetap valid apabila Super Admin menurunkan rolenya sendiri
      if (!PROFILE_ROLE_META[nextProfile.role].canViewActivity) {
        navigate({
          to: "/admin/profile",
          search: {
            tab: "settings",
            role: roleParam,
            demo: undefined,
          },
          replace: true,
        });
      }
    } catch {
      toast.error("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const isLeaveDialogOpen = isManualLeaveOpen || blocker.status === "blocked";

  const handleCancelLeave = React.useCallback(() => {
    setIsManualLeaveOpen(false);
    if (blocker.status === "blocked") {
      blocker.reset();
    }
  }, [blocker]);

  const handleConfirmLeave = React.useCallback(() => {
    setIsManualLeaveOpen(false);
    if (blocker.status === "blocked") {
      blocker.proceed();
      return;
    }
    allowLeaveRef.current = true;
    navigate({ to: "/admin/dashboard" });
  }, [blocker, navigate]);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Kolom Kiri: Panel Ringkasan Identitas & Informasi Kontak */}
      <ProfileSummaryCard profile={savedProfile} />

      {/* Kolom Kanan: Panel Tab Aktivitas & Pengaturan Profil */}
      <section
        aria-label="Detail & Pengaturan Akun"
        className="flex-1 min-w-0 w-full rounded-lg border border-neutral-200 bg-surface shadow-xs"
      >
        {/* Navigasi Tab */}
        <div
          role="tablist"
          aria-label="Navigasi Profil"
          className="flex items-center gap-2 px-5 border-b border-neutral-200"
        >
          {visibleTabs.map((tab) => {
            const Icon = TAB_ICONS[tab.id];
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isTabActive}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-2 py-4 border-b-2 -mb-px font-sans text-sm font-semibold leading-5 whitespace-nowrap transition-colors duration-150 cursor-pointer select-none",
                  isTabActive
                    ? "border-brand-vivid text-brand-strong"
                    : "border-transparent text-neutral-600 hover:text-neutral-900",
                )}
              >
                <Icon
                  className={cn(
                    "size-[18px] shrink-0",
                    isTabActive ? "text-brand-strong" : "text-neutral-600",
                  )}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Isi Tab Aktif */}
        {activeTab === "activity" && savedRoleMeta.canViewActivity ? (
          <ProfileActivityTab activities={defaultProfileActivities} />
        ) : (
          <ProfileSettingsTab
            values={draftValues}
            email={savedProfile.email}
            canEditRole={savedRoleMeta.canEditRole}
            errors={fieldErrors}
            isSaving={isSaving}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
        )}
      </section>

      {/* Modal Konfirmasi Keluar Tanpa Simpan */}
      <ProfileLeaveDialog
        isOpen={isLeaveDialogOpen}
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}
