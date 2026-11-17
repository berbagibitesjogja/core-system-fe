import { Leaf, Package, Users } from "lucide-react";
import { StatCard, StatCardGrid } from "#/components/shared/stat-card";
import statFastFoodSvg from "#/assets/illustrations/fast-food.svg";
import statOrganicFoodSvg from "#/assets/illustrations/organic-food.svg";
import statCharityHeroesSvg from "#/assets/illustrations/charity-family.svg";
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
      <StatCardGrid className="gap-4 @[900px]:gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            styleVariant={stat.styleVariant}
            icon={getIcon(stat.iconName, stat.styleVariant)}
            trend={stat.trend}
            illustrationSrc={ILLUSTRATIONS[stat.illustrationKey]}
            illustrationAlt=""
            illustrationClassName="opacity-85"
            className={stat.className}
          />
        ))}
      </StatCardGrid>
    </section>
  );
}
