import { Leaf, Package, Utensils } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import type { HeroDetailStatItem } from "./hero-detail-data";

export interface HeroDetailStatsProps {
  stats: HeroDetailStatItem[];
}

const HERO_DETAIL_ICON_MAP = {
  package: <Package className="size-5" />,
  leaf: <Leaf className="size-5" />,
  utensils: <Utensils className="size-5" />,
};

/**
 * HeroDetailStats: Baris 3 kartu statistik performa hero (Total Aksi, Makanan Diterima, Porsi Diterima).
 */
export function HeroDetailStats({ stats }: HeroDetailStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          unit={stat.unit}
          subtext={stat.subtext}
          styleVariant={stat.styleVariant}
          icon={HERO_DETAIL_ICON_MAP[stat.iconName]}
          illustrationSrc={stat.illustrationSrc}
          illustrationAlt={stat.illustrationAlt}
          className="shadow-xs"
        />
      ))}
    </div>
  );
}
