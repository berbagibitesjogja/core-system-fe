import { ExternalLink } from "lucide-react";
import { BadgeBlock } from "./badge-block";
import { AvatarBlock } from "./avatar-block";
import { StatCardBlock } from "./stat-card-block";
import { TableHeaderBlock } from "./table-header-block";
import { TableCellBlock } from "./table-cell-block";
import { PaginationBlock } from "./pagination-block";
import { EmptyStateBlock } from "./empty-state-block";
import { SkeletonBlock } from "./skeleton-block";
import { BeneficiaryDisplayBlock } from "./beneficiary-display-block";

export interface DataDisplaySectionProps {
  onCopy: (text: string, id?: string) => void;
  copiedToken: string | null;
}

const DATA_DISPLAY_BLOCKS: Array<{
  id: string;
  Component: React.ComponentType<DataDisplaySectionProps>;
}> = [
  { id: "badge", Component: BadgeBlock },
  { id: "avatar", Component: AvatarBlock },
  { id: "stat-card", Component: StatCardBlock },
  { id: "table-header", Component: TableHeaderBlock },
  { id: "table-cell", Component: TableCellBlock },
  { id: "pagination", Component: PaginationBlock },
  { id: "empty-state", Component: EmptyStateBlock },
  { id: "skeleton", Component: SkeletonBlock },
  { id: "beneficiary-display", Component: BeneficiaryDisplayBlock },
];

/**
 * DataDisplaySection: Orchestrator untuk seluruh komponen penyajian data BBJ (9 blok).
 * Dimodularisasi dan dirender dinamis berbasis data-driven blok.
 */
export function DataDisplaySection({
  onCopy,
  copiedToken,
}: DataDisplaySectionProps) {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                Figma Category · Data Display (Node 17:197 - 137:563)
              </span>
              <span className="text-neutral-300">•</span>
              <span className="font-label text-xs font-semibold text-neutral-500">
                9 Komponen
              </span>
            </div>
            <h2 className="font-heading-h1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Data Display Components
            </h2>
            <p className="font-body-m max-w-3xl text-sm text-neutral-600">
              Koleksi komponen visual penyajian informasi aplikasi Bagi-Bagi
              Jogja: Badge status (14 varian), Avatar foto &amp; inisial (12
              varian), Stat Card metrik dampak (3 style), Tabel Data lengkap
              (Header Cell, Table Cell 6 tipe, Paginasi server-side), Empty
              State (4 varian), Skeleton loading (3 bentuk), dan Beneficiary
              Card profil lembaga.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <a
              href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=12-143"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
            >
              <span>Buka di Figma</span>
              <ExternalLink className="size-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {DATA_DISPLAY_BLOCKS.map(({ id, Component }) => (
          <Component key={id} onCopy={onCopy} copiedToken={copiedToken} />
        ))}
      </div>
    </div>
  );
}
