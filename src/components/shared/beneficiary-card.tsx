import { Edit2, ExternalLink, Trash2 } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { ProgressBar } from "./progress-bar";
import { cn } from "#/lib/utils";

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

export function BeneficiaryCard({
  name,
  type,
  rank = "#1",
  avatarSrc,
  avatarName,
  heroesCount,
  impactCount,
  sharePercent,
  shareText,
  showDelete = true,
  onDetail,
  onEdit,
  onDelete,
  className,
}: BeneficiaryCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[352px] rounded-[16px] border border-[#e2e7e8] bg-white p-5 flex flex-col gap-5 shadow-2xs hover:shadow-xs transition-shadow",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 min-h-[64px] w-full">
        <Avatar
          src={avatarSrc}
          name={avatarName || name}
          size="lg"
          shape="rounded"
          className="size-[64px] rounded-[16px] bg-[#e6f5f6] border border-[#b0e0e3] text-[#00464b] font-['Gabarito'] font-semibold text-[20px] shrink-0"
        />

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="font-['Inter'] font-semibold text-[16px] leading-[24px] text-[#142023] truncate">
            {name}
          </p>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#e6f5f6] text-[#00464b] font-['Inter'] font-semibold text-[12px] leading-[16px] w-fit">
            {type}
          </div>
        </div>

        {rank && (
          <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#6b777a] shrink-0">
            {rank}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-4 items-start w-full">
        {/* Stat / Heroes */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-[#6b777a]">
            Heroes
          </p>
          <div className="flex gap-1 items-baseline">
            <span className="font-['Gabarito'] font-bold text-[20px] leading-[24px] text-[#142023]">
              {heroesCount}
            </span>
            <span className="font-['Inter'] font-semibold text-[14px] text-[#4d585b]">
              Orang
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch bg-[#e2e7e8] shrink-0" />

        {/* Stat / Impact */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-[#6b777a]">
            Impact
          </p>
          <div className="flex gap-1 items-baseline">
            <span className="font-['Gabarito'] font-bold text-[20px] leading-[24px] text-[#142023]">
              {impactCount}
            </span>
            <span className="font-['Inter'] font-semibold text-[14px] text-[#4d585b]">
              Kg
            </span>
          </div>
        </div>
      </div>

      {/* Share Progress */}
      <div className="flex flex-col gap-2 w-full">
        <ProgressBar value={sharePercent} color="brand" />
        <p className="font-['Inter'] font-medium text-[12px] leading-[16px] text-[#6b777a]">
          {shareText || `${sharePercent}% dari kuota bulanan tersalurkan`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onDetail}
          className="flex-1 h-[38px] px-4 rounded-full bg-white border border-[#cdd4d6] hover:bg-[#eef1f2] font-['Inter'] font-semibold text-[14px] text-[#142023] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ExternalLink className="size-4" />
          <span>Detail</span>
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="size-[36px] rounded-full bg-white border border-[#cdd4d6] hover:bg-[#eef1f2] flex items-center justify-center text-[#142023] transition-colors cursor-pointer shrink-0"
          aria-label="Edit penerima"
        >
          <Edit2 className="size-[16px]" />
        </button>

        {showDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="size-[36px] rounded-full bg-white border border-[#cdd4d6] hover:bg-red-50 hover:border-red-200 hover:text-red-600 flex items-center justify-center text-[#142023] transition-colors cursor-pointer shrink-0"
            aria-label="Hapus penerima"
          >
            <Trash2 className="size-[16px]" />
          </button>
        )}
      </div>
    </div>
  );
}
