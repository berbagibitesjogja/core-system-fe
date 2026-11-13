import { Skeleton } from "#/components/ui/skeleton";
import type { ProfileTabKey } from "./profile-data";

export interface ProfileSkeletonProps {
  activeTab: ProfileTabKey;
  showActivityTab: boolean;
}

const CONTACT_SKELETON_ROWS = [
  { id: "email", hasLabel: true, valueWidth: "w-40" },
  { id: "whatsapp", hasLabel: false, valueWidth: "w-32" },
  { id: "joined", hasLabel: true, valueWidth: "w-28" },
] as const;

const ACTIVITY_SKELETON_ROWS = [
  { id: 1, titleWidth: "w-44", categoryWidth: "w-14", timeWidth: "w-20" },
  { id: 2, titleWidth: "w-64", categoryWidth: "w-16", timeWidth: "w-24" },
  { id: 3, titleWidth: "w-72", categoryWidth: "w-16", timeWidth: "w-28" },
  { id: 4, titleWidth: "w-52", categoryWidth: "w-14", timeWidth: "w-24" },
  { id: 5, titleWidth: "w-40", categoryWidth: "w-14", timeWidth: "w-28" },
  { id: 6, titleWidth: "w-44", categoryWidth: "w-14", timeWidth: "w-28" },
] as const;

// Placeholder satu field input (label, kolom isian, teks bantu)
function ProfileFieldSkeleton({
  labelWidth,
  helperWidth,
}: {
  labelWidth: string;
  helperWidth?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Skeleton className={`h-4 ${labelWidth} rounded-md`} />
      <Skeleton className="h-[44px] w-full rounded-md" />
      {helperWidth && <Skeleton className={`h-3 ${helperWidth} rounded-md`} />}
    </div>
  );
}

// Placeholder konten tab Aktivitas Saya (header + linimasa)
function ProfileActivitySkeleton() {
  return (
    <div className="p-6 flex flex-col items-start w-full">
      <div className="flex items-center justify-between gap-2 pb-4 w-full">
        <Skeleton className="h-6 w-36 rounded-md" />
        <Skeleton className="h-[22px] w-32 rounded-full" />
      </div>

      <div className="flex flex-col w-full">
        {ACTIVITY_SKELETON_ROWS.map((row, index) => {
          const isLast = index === ACTIVITY_SKELETON_ROWS.length - 1;
          return (
            <div key={row.id} className="flex items-stretch gap-3 w-full">
              <div className="flex flex-col items-center w-2.5 shrink-0 pt-[5px]">
                <Skeleton className="size-2.5 rounded-full" />
                {!isLast && (
                  <span className="w-px flex-1 bg-neutral-200 my-1 min-h-8" />
                )}
              </div>
              <div
                className={`flex-1 min-w-0 flex flex-col gap-1.5 items-start ${isLast ? "pb-3" : "pb-4"}`}
              >
                <Skeleton
                  className={`h-4 ${row.titleWidth} max-w-full rounded-md`}
                />
                <div className="flex items-center gap-2">
                  <Skeleton
                    className={`h-[22px] ${row.categoryWidth} rounded-full`}
                  />
                  <Skeleton className={`h-3 ${row.timeWidth} rounded-md`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Skeleton className="mt-2 h-5 w-32 rounded-md" />
    </div>
  );
}

// Placeholder konten tab Pengaturan Profil (form data akun)
function ProfileSettingsSkeleton() {
  return (
    <div className="p-6 flex flex-col gap-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <ProfileFieldSkeleton labelWidth="w-14" />
        <ProfileFieldSkeleton labelWidth="w-24" helperWidth="w-48" />
      </div>
      <ProfileFieldSkeleton labelWidth="w-28" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <ProfileFieldSkeleton labelWidth="w-12" helperWidth="w-52" />
        <ProfileFieldSkeleton labelWidth="w-32" />
      </div>
      <div className="flex items-center justify-end w-full">
        <Skeleton className="h-11 w-48 rounded-full" />
      </div>
    </div>
  );
}

/**
 * ProfileSkeleton: State memuat halaman Profil Saya
 * (kartu ringkasan identitas di kiri, panel tab Aktivitas/Pengaturan di kanan).
 */
export function ProfileSkeleton({
  activeTab,
  showActivityTab,
}: ProfileSkeletonProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-pulse motion-reduce:animate-none">
      {/* Kolom Kiri: Kartu Ringkasan Identitas */}
      <div className="w-full lg:w-[340px] shrink-0 rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-xs">
        <div className="bg-brand h-[96px]" />
        <div className="px-6 pb-6 flex flex-col items-center gap-4">
          <Skeleton className="-mt-[45px] size-[90px] rounded-full border-4 border-white" />
          <Skeleton className="h-7 w-44 rounded-md" />
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-[22px] w-28 rounded-full" />
            <Skeleton className="h-[22px] w-20 rounded-full" />
          </div>

          <div className="h-px w-full bg-neutral-200" aria-hidden="true" />

          <div className="w-full flex flex-col gap-4 items-start">
            <Skeleton className="h-6 w-36 rounded-md" />
            {CONTACT_SKELETON_ROWS.map((row) => (
              <div key={row.id} className="flex items-start gap-3 w-full">
                <Skeleton className="size-[18px] shrink-0 rounded-sm mt-0.5" />
                <div className="flex flex-col gap-1.5 flex-1">
                  {row.hasLabel && <Skeleton className="h-3 w-14 rounded-md" />}
                  <Skeleton className={`h-4 ${row.valueWidth} rounded-md`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Panel Tab & Konten */}
      <div className="flex-1 min-w-0 w-full rounded-lg border border-neutral-200 bg-white shadow-xs">
        <div className="flex items-center gap-2 px-5 border-b border-neutral-200">
          {showActivityTab && (
            <div className="flex items-center gap-2 px-2 py-4">
              <Skeleton className="size-[18px] rounded-sm" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          )}
          <div className="flex items-center gap-2 px-2 py-4">
            <Skeleton className="size-[18px] rounded-sm" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
        </div>

        {activeTab === "activity" && showActivityTab ? (
          <ProfileActivitySkeleton />
        ) : (
          <ProfileSettingsSkeleton />
        )}
      </div>
    </div>
  );
}
