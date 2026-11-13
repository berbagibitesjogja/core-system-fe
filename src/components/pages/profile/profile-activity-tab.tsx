import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import type { ProfileActivityItem } from "./profile-data";

export interface ProfileActivityTabProps {
  activities: readonly ProfileActivityItem[];
  className?: string;
}

/**
 * ProfileActivityTab: Konten tab Aktivitas Saya khusus Super Admin (Figma Node 157:25146)
 * menampilkan linimasa aksi terbaru beserta tautan menuju halaman Logs sistem.
 */
export function ProfileActivityTab({
  activities,
  className,
}: ProfileActivityTabProps) {
  return (
    <div
      className={cn(
        "p-6 flex flex-col items-start w-full animate-in fade-in duration-150 motion-reduce:animate-none",
        className,
      )}
    >
      {/* Header Bagian Aktivitas */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 w-full">
        <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
          Aktivitas saya
        </h2>
        <Badge tone="brand" styleVariant="soft">
          Khusus Super Admin
        </Badge>
      </div>

      {/* Daftar Timeline Aktivitas */}
      <div className="flex flex-col w-full">
        {activities.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === activities.length - 1;

          return (
            <div key={item.id} className="flex items-stretch gap-3 w-full">
              {/* Rail Indikator Vertikal */}
              <div
                aria-hidden="true"
                className="flex flex-col items-center w-2.5 shrink-0 pt-[5px]"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full shrink-0",
                    isFirst ? "bg-brand" : "bg-neutral-300",
                  )}
                />
                {!isLast && (
                  <span className="w-px flex-1 bg-neutral-200 my-1 min-h-8" />
                )}
              </div>

              {/* Detail Log Aktivitas */}
              <div
                className={cn(
                  "flex-1 min-w-0 flex flex-col gap-1 items-start",
                  isLast ? "pb-3" : "pb-4",
                )}
              >
                <p className="font-sans text-sm font-semibold leading-5 text-neutral-900">
                  {item.title}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral" styleVariant="soft">
                    {item.category}
                  </Badge>
                  <span className="font-sans text-xs font-medium leading-4 text-neutral-500">
                    {item.timestampLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tautan Lihat Semua Log */}
      <div className="pt-2">
        <Link
          to="/admin/logs"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 -ml-4 rounded-full font-sans text-sm font-semibold leading-5 text-brand hover:bg-brand-subtle transition-colors"
        >
          <span>Lihat semua log</span>
          <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
