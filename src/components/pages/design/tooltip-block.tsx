import { Eye, Navigation, Pencil, Plus, Trash2 } from "lucide-react";
import { IconButton, Tooltip } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface TooltipBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * TooltipBlock: Dokumentasi tooltip sistem BBJ (Node 20:371).
 * Menampilkan preview statis 2 placement resmi (top & bottom) dengan segitiga panah 12x6px,
 * serta area live interactive hover demo pada berbagai tombol aksi.
 */
export function TooltipBlock({ onCopy, copiedToken }: TooltipBlockProps) {
  return (
    <DocBlock
      id="doc-tooltip"
      nodeId="Node 20:371"
      title="7. Tooltip"
      subtitle="src/components/ui/tooltip.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`<Tooltip content="Lihat Detail Donasi" placement="top">\n  <IconButton aria-label="Lihat">\n    <Eye className="size-4" />\n  </IconButton>\n</Tooltip>`}
      copyTokenKey="tooltip-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-371"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Label singkat untuk tombol ikon (lihat, edit, hapus, FAB) yang muncul
        saat hover atau long-press. Box berlatar belakang warna tinta gelap
        (#142023) dengan panah segitiga 12×6px mengarah ke elemen target.
        Placement Top dan Placement Bottom.
      </p>

      {/* 2 Placements Comparison */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Top Placement */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 sm:p-8 space-y-4">
          <span className="font-label text-xs font-bold text-neutral-900">
            1. Placement: Top (Panah di Bawah)
          </span>
          <div className="pt-6">
            <Tooltip content="Edit Data Lembaga" placement="top" isOpen={true}>
              <IconButton aria-label="Edit" variant="secondary" size="md">
                <Pencil className="size-4" />
              </IconButton>
            </Tooltip>
          </div>
          <p className="text-xs text-neutral-500 text-center pt-2">
            (Preview statis terbuka: kotak #142023 + panah 12×6px ke bawah)
          </p>
        </div>

        {/* Bottom Placement */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 sm:p-8 space-y-4">
          <span className="font-label text-xs font-bold text-neutral-900">
            2. Placement: Bottom (Panah di Atas)
          </span>
          <div className="pb-6">
            <Tooltip content="Hapus Permanen" placement="bottom" isOpen={true}>
              <IconButton aria-label="Hapus" variant="danger" size="md">
                <Trash2 className="size-4 text-red-600" />
              </IconButton>
            </Tooltip>
          </div>
          <p className="text-xs text-neutral-500 text-center pt-2">
            (Preview statis terbuka: panah 12×6px ke atas + kotak #142023)
          </p>
        </div>
      </div>

      {/* Live Interactive Hover Demo */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Uji Coba Hover Tooltip pada Tombol Aksi
          </span>
          <span className="text-xs text-neutral-500">
            Arahkan kursor mouse ke tombol ikon berikut
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
          <Tooltip content="Lihat Detail Donasi (Top)" placement="top">
            <IconButton aria-label="Lihat" variant="ghost" size="md">
              <Eye className="size-4" />
            </IconButton>
          </Tooltip>

          <Tooltip content="Ubah Informasi (Top)" placement="top">
            <IconButton aria-label="Edit" variant="secondary" size="md">
              <Pencil className="size-4" />
            </IconButton>
          </Tooltip>

          <Tooltip content="Tambah Donatur Baru (Bottom)" placement="bottom">
            <IconButton aria-label="Tambah" variant="primary" size="md">
              <Plus className="size-4" />
            </IconButton>
          </Tooltip>

          <Tooltip content="Hapus dari Daftar (Bottom)" placement="bottom">
            <IconButton aria-label="Hapus" variant="danger" size="md">
              <Trash2 className="size-4 text-red-600" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </DocBlock>
  );
}
