import { Check, Clock, Wallet } from "lucide-react";
import { StatCard, StatCardGrid } from "#/components/shared/stat-card";
import type { ReimburseDataStatItem } from "./reimburse-management-data";

export interface ReimburseDataStatsProps {
  stats: readonly ReimburseDataStatItem[];
}

const STAT_ICONS = {
  clock: <Clock className="size-5" />,
  check: <Check className="size-5" />,
  wallet: <Wallet className="size-5" />,
} as const;

// Grid 3 kartu metrik ringkasan Data Reimburse
export function ReimburseDataStats({ stats }: ReimburseDataStatsProps) {
  return (
    <StatCardGrid as="section" aria-label="Ringkasan statistik reimburse">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          unit={stat.unit}
          subtext={stat.subtext}
          illustrationSrc={stat.illustrationSrc}
          illustrationAlt={stat.illustrationAlt}
          icon={STAT_ICONS[stat.iconKey]}
          styleVariant={stat.styleVariant}
        />
      ))}
    </StatCardGrid>
  );
}
