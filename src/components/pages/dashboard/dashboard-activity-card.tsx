import { ChevronRight } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { RECENT_ACTIVITIES } from "./dashboard-data";
import type { ActivityItem } from "./dashboard-data";
import cariKosongSvg from "#/assets/illustrations/magnifying-empty-box.svg";

export interface DashboardActivityCardProps {
  activities?: ActivityItem[];
  onSeeAll?: () => void;
  className?: string;
}

/**
 * DashboardActivityCard: Kartu daftar aktivitas terbaru admin BBJ (khusus Super Admin), lengkap dengan fallback Empty State.
 */
export function DashboardActivityCard({
  activities = RECENT_ACTIVITIES,
  onSeeAll,
  className,
}: DashboardActivityCardProps) {
  const isEmpty = activities.length === 0;

  return (
    <div
      className={`flex flex-1 flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs ${className || ""}`}
    >
      <div className="space-y-4">
        {/* Header Kartu */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h4 className="font-heading-h4 text-base sm:text-lg font-semibold text-neutral-900 leading-tight">
              Aktivitas Terbaru
            </h4>
            <Badge
              tone="brand"
              styleVariant="soft"
              className="h-5 px-2 text-[10px]"
            >
              Khusus Super Admin
            </Badge>
          </div>

          {!isEmpty && (
            <button
              type="button"
              onClick={onSeeAll}
              className="inline-flex items-center gap-1 font-label text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover transition-colors cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="size-4" />
            </button>
          )}
        </div>

        {/* Daftar Aktivitas */}
        {!isEmpty ? (
          <div className="divide-y divide-neutral-100">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-3 first:pt-1 last:pb-1"
              >
                <Avatar
                  name={item.actor}
                  size="sm"
                  shape="circle"
                  className="bg-bondi-50 border-bondi-200 text-brand-strong font-semibold shrink-0"
                />

                <div className="flex-1 min-w-0 text-xs sm:text-sm text-neutral-600 leading-snug">
                  <span className="font-semibold text-neutral-900">
                    {item.actor}
                  </span>
                  <span> {item.action} </span>
                  <span className="font-semibold text-brand-strong">
                    {item.target}
                  </span>
                </div>

                <span className="font-sans text-xs text-neutral-400 whitespace-nowrap shrink-0">
                  {item.timeAgo}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
            <div className="size-32 select-none pointer-events-none">
              <img
                src={cariKosongSvg}
                alt="Belum ada aktivitas"
                className="size-full object-contain pointer-events-none select-none"
              />
            </div>
            <div className="space-y-1">
              <h5 className="font-heading-h4 text-base font-semibold text-neutral-900">
                Belum ada aktivitas
              </h5>
              <p className="font-sans text-xs text-neutral-500 max-w-xs">
                Belum ada aktivitas tercatat hari ini.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
