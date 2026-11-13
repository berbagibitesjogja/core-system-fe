import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Badge, Button } from "#/components/ui";
import type { BadgeStyleVariant, BadgeTone } from "#/components/ui";
import { cn } from "#/lib/utils";
import { DocBlock } from "./doc-block";

export interface BadgeBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * BadgeBlock: Dokumentasi badge status & kategori sistem BBJ (Node 17:197).
 * Menampilkan matriks 14 varian (7 tone × 2 style: soft & solid) serta live tester interaktif.
 */
export function BadgeBlock({ onCopy, copiedToken }: BadgeBlockProps) {
  const [badgeTone, setBadgeTone] = React.useState<BadgeTone>("success");
  const [badgeStyle, setBadgeStyle] = React.useState<BadgeStyleVariant>("soft");
  const [badgeDot, setBadgeDot] = React.useState(true);
  const [badgeLabel, setBadgeLabel] = React.useState("Selesai");

  return (
    <DocBlock
      id="doc-badge"
      nodeId="Node 17:197"
      title="1. Badge"
      subtitle="src/components/ui/badge.tsx"
      copyCode='<Badge tone="success" styleVariant="soft" dot>Selesai</Badge>'
      copyTokenKey="badge-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-197"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Label status &amp; kategori. Success = Selesai / Sudah Diambil. Warning
        = Proses / Menunggu. Info = Berjalan (ongoing). Danger = Diblokir /
        Basi. Brand = Aktif. Neutral = role &amp; varian (student, company).
        Accent = program CSR. Soft untuk tabel, Solid untuk penekanan (mis.
        badge role SUPER).
      </p>

      {/* 14-Variant Matrix Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
            Matriks Varian Figma (7 Tones × Soft &amp; Solid)
          </h4>
          <span className="text-xs text-neutral-400">
            Inter SemiBold 12px · Dot 6px
          </span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-neutral-50/50 p-2 sm:p-4 -mx-1 px-1">
          <table className="w-full min-w-[540px] text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-xs font-semibold text-neutral-500">
                <th className="pb-3 pl-2">Tone</th>
                <th className="pb-3">Deskripsi Peruntukan</th>
                <th className="pb-3">Style: Soft (Tabel/Card)</th>
                <th className="pb-3">Style: Solid (Penekanan)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 font-sans text-xs">
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Neutral
                </td>
                <td className="py-3 text-neutral-500">
                  Role &amp; varian mitra (Student, Company)
                </td>
                <td className="py-3">
                  <Badge tone="neutral" styleVariant="soft" dot>
                    Neutral
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="neutral" styleVariant="solid" dot>
                    Neutral
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Brand
                </td>
                <td className="py-3 text-neutral-500">
                  Status Aktif, program utama BBJ
                </td>
                <td className="py-3">
                  <Badge tone="brand" styleVariant="soft" dot>
                    Aktif
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="brand" styleVariant="solid" dot>
                    Aktif
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Accent
                </td>
                <td className="py-3 text-neutral-500">
                  Program CSR sponsor, kolaborasi spesial
                </td>
                <td className="py-3">
                  <Badge tone="accent" styleVariant="soft" dot>
                    CSR Khusus
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="accent" styleVariant="solid" dot>
                    CSR Khusus
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Success
                </td>
                <td className="py-3 text-neutral-500">
                  Selesai, Sudah Diambil, Tuntas
                </td>
                <td className="py-3">
                  <Badge tone="success" styleVariant="soft" dot>
                    Selesai
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="success" styleVariant="solid" dot>
                    Selesai
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Warning
                </td>
                <td className="py-3 text-neutral-500">
                  Proses, Menunggu Konfirmasi / Kurir
                </td>
                <td className="py-3">
                  <Badge tone="warning" styleVariant="soft" dot>
                    Menunggu
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="warning" styleVariant="solid" dot>
                    Menunggu
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Danger
                </td>
                <td className="py-3 text-neutral-500">
                  Dibatalkan, Basi, Diblokir
                </td>
                <td className="py-3">
                  <Badge tone="danger" styleVariant="soft" dot>
                    Dibatalkan
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="danger" styleVariant="solid" dot>
                    Dibatalkan
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-neutral-900">
                  Info
                </td>
                <td className="py-3 text-neutral-500">
                  Berjalan (ongoing), Dalam Pengantaran
                </td>
                <td className="py-3">
                  <Badge tone="info" styleVariant="soft" dot>
                    Berjalan
                  </Badge>
                </td>
                <td className="py-3">
                  <Badge tone="info" styleVariant="solid" dot>
                    Berjalan
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Interactive Tester */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Badge Tester
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBadgeTone("success");
              setBadgeStyle("soft");
              setBadgeDot(true);
              setBadgeLabel("Selesai");
            }}
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Pilih Tone
            </label>
            <select
              value={badgeTone}
              onChange={(e) => setBadgeTone(e.target.value as any)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-hidden"
            >
              <option value="neutral">Neutral</option>
              <option value="brand">Brand</option>
              <option value="accent">Accent</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Pilih Style
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setBadgeStyle("soft")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  badgeStyle === "soft"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Soft
              </button>
              <button
                type="button"
                onClick={() => setBadgeStyle("solid")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  badgeStyle === "solid"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Solid
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Indikator Dot
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setBadgeDot(true)}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  badgeDot
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Dot On
              </button>
              <button
                type="button"
                onClick={() => setBadgeDot(false)}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  !badgeDot
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Tanpa Dot
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Teks Label
            </label>
            <input
              type="text"
              value={badgeLabel}
              onChange={(e) => setBadgeLabel(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
          <span className="text-xs text-neutral-500">Hasil Render:</span>
          <Badge tone={badgeTone} styleVariant={badgeStyle} dot={badgeDot}>
            {badgeLabel || "Label"}
          </Badge>
        </div>
      </div>
    </DocBlock>
  );
}
