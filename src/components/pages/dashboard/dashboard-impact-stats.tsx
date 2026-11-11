import { Leaf, Package, Users } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import statFastFoodSvg from "#/assets/illustrations/stat-fast-food.svg";
import statOrganicFoodSvg from "#/assets/illustrations/stat-organic-food.svg";
import statCharityHeroesSvg from "#/assets/illustrations/stat-charity-heroes.svg";
import { DEFAULT_IMPACT_STATS } from "./dashboard-data";
import type { ImpactStatItem } from "./dashboard-data";

export interface DashboardImpactStatsProps {
  stats?: ImpactStatItem[];
}

const ILLUSTRATIONS: Record<ImpactStatItem["illustrationKey"], string> = {
  "fast-food": statFastFoodSvg,
  "organic-food": statOrganicFoodSvg,
  "charity-heroes": statCharityHeroesSvg,
};

/**
 * DashboardImpactStats: Bagian kartu metrik dampak kumulatif BBJ dengan ilustrasi latar berbasis data.
 */
export function DashboardImpactStats({
  stats = DEFAULT_IMPACT_STATS,
}: DashboardImpactStatsProps) {
  const getIcon = (
    iconName: ImpactStatItem["iconName"],
    styleVariant: ImpactStatItem["styleVariant"],
  ) => {
    const isBrand = styleVariant === "brand";
    switch (iconName) {
      case "package":
        return (
          <Package
            className={`size-5 ${isBrand ? "text-white" : "text-brand"}`}
          />
        );
      case "leaf":
        return (
          <Leaf className={`size-5 ${isBrand ? "text-white" : "text-brand"}`} />
        );
      case "users":
        return (
          <Users
            className={`size-5 ${isBrand ? "text-white" : "text-brand"}`}
          />
        );
    }
  };

  return (
    <section className="space-y-3">
      {/* Header Bagian */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading-h4 text-lg font-semibold text-neutral-900 leading-tight">
          Dampak Kami
        </h3>
        <span className="font-sans text-xs text-neutral-500">
          Akumulasi sejak BBJ berdiri
        </span>
      </div>

      {/* Grid Kartu Metrik Dinamis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            styleVariant={stat.styleVariant}
            icon={getIcon(stat.iconName, stat.styleVariant)}
            trend={stat.trend}
            className={stat.className}
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 top-2 size-48 lg:size-52 pointer-events-none select-none opacity-85"
            >
              <img
                src={ILLUSTRATIONS[stat.illustrationKey]}
                alt=""
                className="size-full object-contain pointer-events-none select-none"
              />
            </div>
          </StatCard>
        ))}
      </div>
    </section>
  );
}
