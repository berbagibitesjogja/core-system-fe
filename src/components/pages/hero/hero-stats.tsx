import { Check, Users, XCircle } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import type { HeroStatItem } from "./hero-data";

export interface HeroStatsProps {
  stats: HeroStatItem[];
}

const HERO_STAT_ICON_MAP = {
  users: <Users className="size-5" />,
  check: <Check className="size-5" />,
  "x-circle": <XCircle className="size-5" />,
};

/**
 * HeroStats: Baris ringkasan metrik Heroes (Total Heroes, Ambil Bulan Ini, Diblokir).
 */
export function HeroStats({ stats }: HeroStatsProps) {
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
          icon={HERO_STAT_ICON_MAP[stat.iconName]}
          illustrationSrc={stat.illustrationSrc}
          illustrationAlt={stat.illustrationAlt}
          className="shadow-xs"
        />
      ))}
    </div>
  );
}
