import { Heart, LayoutGrid, Users } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import type { VolunteerStatItem } from "./volunteer-data";

export interface VolunteerStatsProps {
  stats: VolunteerStatItem[];
}

const VOLUNTEER_STAT_ICON_MAP = {
  users: <Users className="size-5" />,
  grid: <LayoutGrid className="size-5" />,
  heart: <Heart className="size-5" />,
};

/**
 * VolunteerStats: Baris ringkasan metrik Volunteer (Total Anggota, Pengurus, Relawan) sesuai Figma 149:19230.
 */
export function VolunteerStats({ stats }: VolunteerStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          unit={stat.unit}
          subtext={stat.subtext}
          styleVariant={stat.styleVariant}
          icon={VOLUNTEER_STAT_ICON_MAP[stat.iconName]}
          illustrationSrc={stat.illustrationSrc}
          illustrationAlt={stat.illustrationAlt}
          className="shadow-xs"
        />
      ))}
    </div>
  );
}
