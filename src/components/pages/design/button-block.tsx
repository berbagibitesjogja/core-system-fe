import * as React from "react";
import { Box, Plus, Sparkles, Trash2 } from "lucide-react";
import { Button, toast } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface ButtonBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * ButtonBlock: Dokumentasi tombol aksi sistem BBJ (Node 16:273).
 * Menampilkan matriks 6 varian tombol dalam 4 state (default, hover, loading, disabled)
 * untuk ukuran Medium (44px) dan Small (36px), serta tombol live tester interaktif.
 */
export function ButtonBlock({ onCopy, copiedToken }: ButtonBlockProps) {
  const [buttonLoading, setButtonLoading] = React.useState(false);

  return (
    <DocBlock
      id="doc-button"
      nodeId="Node 16:273"
      title="1. Button"
      subtitle="src/components/ui/button.tsx"
      icon={<Box className="size-4" />}
      copyCode='<Button variant="primary" size="md">Simpan Donasi</Button>'
      copyTokenKey="btn-primary"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=16-273&t=SzCwTYJWBfVK4FdY-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
          Tombol aksi. Primary: 1 aksi utama per layar. Accent: CTA fun (mis.
          Bagikan Impact, Download Poster). Secondary: aksi pendamping. Ghost:
          aksi ringan/tersier. Danger: hapus/batal (hanya role super dan core).
          Loading: saat request berjalan, cegah klik ganda. Tinggi Medium 44px
          (target sentuh mobile), Small 36px. Bentuk pill.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="self-start sm:self-auto shrink-0"
          onClick={() => setButtonLoading((v) => !v)}
        >
          {buttonLoading ? "Normal State" : "Simulasi Loading"}
        </Button>
      </div>

      {/* 40-variant Matrix (8 columns x 5 rows) */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="min-w-[1280px] w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[120px]">
                Variant
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Med / Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Med / Hover
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Med / Loading
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Med / Disabled
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Sm / Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Sm / Hover
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Sm / Loading
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                Sm / Disabled
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {(
              ["primary", "accent", "secondary", "ghost", "danger"] as const
            ).map((variant) => (
              <tr key={variant} className="hover:bg-neutral-50/50">
                <td className="py-4 px-4 font-['Inter'] font-semibold text-sm capitalize text-neutral-900">
                  {variant}
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="md" forcedState="default">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="md" forcedState="hover">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="md" forcedState="loading">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="md" forcedState="disabled">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="sm" forcedState="default">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="sm" forcedState="hover">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="sm" forcedState="loading">
                    Simpan Donasi
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <Button variant={variant} size="sm" forcedState="disabled">
                    Simpan Donasi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3 sm:gap-4">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 w-full sm:w-auto">
          Live Test Buttons (Interactive with Pop Shadow):
        </span>
        <Button
          variant="primary"
          size="md"
          isLoading={buttonLoading}
          onClick={() => toast.success("Tombol Primary diklik!")}
        >
          <Plus className="size-4" /> Tambah Donasi
        </Button>
        <Button
          variant="accent"
          size="md"
          onClick={() => toast("Membagikan impact relawan!")}
        >
          <Sparkles className="size-4" /> Bagikan Impact
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => toast.info("Tombol Secondary")}
        >
          Batal
        </Button>
        <Button variant="ghost" size="sm" onClick={() => toast("Tombol Ghost")}>
          Lihat Detail
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => toast.error("Hapus data donasi!")}
        >
          <Trash2 className="size-3.5" /> Hapus
        </Button>
      </div>
    </DocBlock>
  );
}
