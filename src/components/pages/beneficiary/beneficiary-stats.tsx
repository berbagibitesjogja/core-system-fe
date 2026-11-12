import { Building, Leaf, Users } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import type { BeneficiaryStatItem } from "./beneficiary-data";

export interface BeneficiaryStatsProps {
  stats: BeneficiaryStatItem[];
}

const iconMap = {
  users: <Users className="size-5" />,
  leaf: <Leaf className="size-5" />,
  building: <Building className="size-5" />,
};

/**
 * BeneficiaryStats: Baris ringkasan metrik penerima manfaat (Total Heroes, Makanan Tersalurkan, Kelompok Penerima).
 */
export function BeneficiaryStats({ stats }: BeneficiaryStatsProps) {
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
          icon={iconMap[stat.iconName]}
          illustrationSrc={stat.illustrationSrc}
          illustrationAlt={stat.illustrationAlt}
          className="shadow-xs"
        />
      ))}
    </div>
  );
}
