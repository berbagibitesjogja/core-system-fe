import { Clock, Package, Users } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import type { DonationStatItem } from "./donation-data";

export interface DonationStatsProps {
  stats: DonationStatItem[];
}

const iconMap = {
  clock: <Clock className="size-5" />,
  users: <Users className="size-5" />,
  package: <Package className="size-5" />,
};

/**
 * DonationStats: Baris ringkasan metrik donasi (Pengambilan Terdekat, Kuota Terbanyak, Donasi Aktif).
 * Didesain 100% data-driven dengan perulangan `.map()` sesuai arsitektur Figma 136:6371.
 */
export function DonationStats({ stats }: DonationStatsProps) {
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
