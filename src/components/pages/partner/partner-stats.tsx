import { Building, Leaf, Package, Plus, Sparkles, Users } from "lucide-react";
import { StatCard, StatCardGrid } from "#/components/shared/stat-card";
import type { PartnerStatItem } from "./partner-data";

export interface PartnerStatsProps {
  stats: PartnerStatItem[];
}

const PARTNER_STAT_ICON_MAP = {
  sparkles: <Sparkles className="size-5" />,
  building: <Building className="size-5" />,
  plus: <Plus className="size-5" />,
  users: <Users className="size-5" />,
  leaf: <Leaf className="size-5" />,
  package: <Package className="size-5" />,
};

/**
 * PartnerStats: Baris ringkasan metrik mitra donatur (Donatur Teraktif, Total Donatur, Donatur Baru).
 */
export function PartnerStats({ stats }: PartnerStatsProps) {
  return (
    <StatCardGrid>
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          unit={stat.unit}
          subtext={stat.subtext}
          styleVariant={stat.styleVariant}
          icon={PARTNER_STAT_ICON_MAP[stat.iconName]}
          illustrationSrc={stat.illustrationSrc}
          illustrationAlt={stat.illustrationAlt}
          className="shadow-xs"
        />
      ))}
    </StatCardGrid>
  );
}
