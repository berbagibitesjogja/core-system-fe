import { Pencil, Search, Trash2 } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import type { BadgeProps } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { IconButton } from "#/components/ui/icon-button";
import { cn } from "#/lib/utils";
import { ProgressBar } from "./progress-bar";

export interface BeneficiaryCardProps {
  id?: string;
  name: string;
  type: string;
  rank?: string;
  avatarSrc?: string;
  avatarName?: string;
  heroesCount: number | string;
  impactCount: number | string;
  impactUnit?: string;
  sharePercent: number;
  shareText?: string;
  showDelete?: boolean;
  onDetail?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const categoryBadgeConfig: Record<
  string,
  { tone: BadgeProps["tone"]; className: string }
> = {
  universitas: {
    tone: "brand",
    className: "bg-bondi-50 text-bondi-900 border-transparent px-2",
  },
  kampus: {
    tone: "brand",
    className: "bg-bondi-50 text-bondi-900 border-transparent px-2",
  },
  yayasan: {
    tone: "accent",
    className: "bg-sunny-100 text-neutral-900 border-transparent px-2",
  },
  "panti asuhan": {
    tone: "accent",
    className: "bg-sunny-100 text-neutral-900 border-transparent px-2",
  },
  "masyarakat umum": {
    tone: "info",
    className: "bg-blue-50 text-blue-700 border-transparent px-2",
  },
  "komunitas warga": {
    tone: "info",
    className: "bg-blue-50 text-blue-700 border-transparent px-2",
  },
};

// Memetakan jenis kelompok penerima manfaat ke gaya Badge konsisten
export function getCategoryBadgeConfig(type: string) {
  return (
    categoryBadgeConfig[type.trim().toLowerCase()] ?? {
      tone: "brand" as const,
      className: "bg-bondi-50 text-bondi-900 border-transparent px-2",
    }
  );
}

/**
 * BeneficiaryCard: Kartu ringkasan kelompok penerima manfaat dan metrik kontribusi.
 */
export function BeneficiaryCard({
  name,
  type,
  rank = "#1",
  avatarSrc,
  avatarName,
  heroesCount,
  impactCount,
  impactUnit = "Kg",
  sharePercent,
  shareText,
  showDelete = true,
  onDetail,
  onEdit,
  onDelete,
  className,
}: BeneficiaryCardProps) {
  const badgeConfig = getCategoryBadgeConfig(type);
  const progressValue =
    sharePercent <= 0
      ? 0
      : Math.max(5, Math.min(100, Math.round(sharePercent / 5) * 5));

  return (
    <div
      className={cn(
        "w-full max-w-[352px] rounded-[16px] border border-neutral-200 bg-white p-5 flex flex-col gap-5 shadow-2xs hover:shadow-xs transition-shadow",
        className,
      )}
    >
      {/* Header kartu: Avatar, Nama, Kategori, dan Peringkat */}
      <div className="flex items-center gap-3 min-h-[76px] w-full">
        <Avatar
          src={avatarSrc}
          name={avatarName || name}
          size="lg"
          shape="rounded"
          className="size-[64px] rounded-[16px] bg-bondi-50 border border-bondi-200 text-bondi-900 font-['Gabarito'] font-semibold text-[20px] shrink-0"
        />

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="font-['Inter'] font-semibold text-[16px] leading-[24px] text-neutral-900 line-clamp-2">
            {name}
          </p>
          <Badge
            tone={badgeConfig.tone}
            styleVariant="soft"
            className={cn("w-fit", badgeConfig.className)}
          >
            {type}
          </Badge>
        </div>

        {rank && (
          <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-neutral-500 shrink-0">
            {rank}
          </span>
        )}
      </div>

      {/* Statistik Heroes & Impact */}
      <div className="flex gap-4 items-start w-full">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-neutral-500">
            Heroes
          </p>
          <div className="flex gap-1 items-baseline">
            <span className="font-['Gabarito'] font-bold text-[20px] leading-[24px] text-neutral-900">
              {heroesCount}
            </span>
            <span className="font-['Inter'] font-semibold text-[14px] text-neutral-600">
              Orang
            </span>
          </div>
        </div>

        <div className="w-px self-stretch bg-neutral-200 shrink-0" />

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-neutral-500">
            Impact
          </p>
          <div className="flex gap-1 items-baseline">
            <span className="font-['Gabarito'] font-bold text-[20px] leading-[24px] text-neutral-900">
              {impactCount}
            </span>
            <span className="font-['Inter'] font-semibold text-[14px] text-neutral-600">
              {impactUnit}
            </span>
          </div>
        </div>
      </div>

      {/* Indikator porsi kontribusi */}
      <div className="flex flex-col gap-2 w-full">
        <ProgressBar value={progressValue} color="brand" />
        <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-neutral-500">
          {shareText || `${sharePercent}% dari total heroes BBJ`}
        </p>
      </div>

      {/* Baris tombol aksi kartu */}
      <div className="flex items-center gap-2 w-full">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Search className="size-4" />}
          onClick={onDetail}
          className="flex-1"
        >
          Detail
        </Button>

        <IconButton
          variant="secondary"
          size="sm"
          tooltip="Edit penerima"
          aria-label="Edit penerima"
          onClick={onEdit}
        >
          <Pencil />
        </IconButton>

        {showDelete && (
          <IconButton
            variant="secondary"
            size="sm"
            tooltip="Hapus penerima"
            aria-label="Hapus penerima"
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
          >
            <Trash2 />
          </IconButton>
        )}
      </div>
    </div>
  );
}
