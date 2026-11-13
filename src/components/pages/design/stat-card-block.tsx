import * as React from "react";
import { HeartHandshake, RotateCcw, Users, Utensils } from "lucide-react";
import { Button, Skeleton } from "#/components/ui";
import { StatCard } from "#/components/shared";
import type { StatCardStyleVariant } from "#/components/shared";
import { cn } from "#/lib/utils";
import { DocBlock } from "./doc-block";

export interface StatCardBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * StatCardBlock: Dokumentasi kartu metrik sistem BBJ (Node 19:189).
 * Menampilkan 3 style resmi (Default, Brand, Accent) serta live tester interaktif dan simulasi skeleton loading.
 */
export function StatCardBlock({ onCopy, copiedToken }: StatCardBlockProps) {
  const [statStyle, setStatStyle] =
    React.useState<StatCardStyleVariant>("default");
  const [statValue, setStatValue] = React.useState("3.077");
  const [statUnit, setStatUnit] = React.useState("Kg");
  const [statLoading, setStatLoading] = React.useState(false);

  return (
    <DocBlock
      id="doc-stat-card"
      nodeId="Node 19:189"
      title="3. Stat Card"
      subtitle="src/components/shared/stat-card.tsx"
      copyCode={`<StatCard\n  title="Makanan Diselamatkan"\n  value="3.077"\n  unit="Kg"\n  trend={{ value: "+128 Kg", isPositive: true, label: "bulan ini" }}\n  styleVariant="default"\n/>`}
      copyTokenKey="statcard-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-189"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Kartu metrik untuk Dampak Kami, detail sponsor, beneficiary, dan hero.
        Default untuk sebagian besar metrik, Brand dan Accent hanya untuk 1
        metrik sorotan per baris. Angka memakai Gabarito (Number/XL 40px) dengan
        pemisah ribuan titik, satuan terpisah (Aksi, Kg, Orang, Porsi, Rp).
      </p>

      {/* 3 Styles Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Style 1: Default */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-neutral-700">
              Style: Default
            </span>
            <span className="text-xs text-neutral-400">
              Putih + border neutral-200
            </span>
          </div>
          {statLoading ? (
            <div className="h-[174px] rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
              <Skeleton shape="text" className="w-1/2" />
              <Skeleton shape="block" className="h-12 w-3/4" />
              <Skeleton shape="text" className="w-1/3" />
            </div>
          ) : (
            <StatCard
              title="Makanan Diselamatkan"
              value="3.077"
              unit="Kg"
              icon={<Utensils className="size-5" />}
              trend={{
                value: "+128 Kg",
                isPositive: true,
                label: "bulan ini",
              }}
              styleVariant="default"
            />
          )}
        </div>

        {/* Style 2: Brand */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-brand">
              Style: Brand (Sorotan)
            </span>
            <span className="text-xs text-neutral-400">
              Bg Bondi tosca + teks putih
            </span>
          </div>
          {statLoading ? (
            <div className="h-[172px] rounded-2xl border border-transparent bg-bondi-700/80 p-5 space-y-3">
              <Skeleton shape="text" className="w-1/2 bg-white/30" />
              <Skeleton shape="block" className="h-12 w-3/4 bg-white/30" />
              <Skeleton shape="text" className="w-1/3 bg-white/30" />
            </div>
          ) : (
            <StatCard
              title="Porsi Makanan Terbagi"
              value="9.240"
              unit="Porsi"
              icon={<HeartHandshake className="size-5" />}
              trend={{
                value: "+14%",
                isPositive: true,
                label: "dari target",
              }}
              styleVariant="brand"
            />
          )}
        </div>

        {/* Style 3: Accent */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-neutral-900">
              Style: Accent (Pop-Art)
            </span>
            <span className="text-xs text-neutral-400">
              Kuning + border 1.5px + shadow-pop
            </span>
          </div>
          {statLoading ? (
            <div className="h-[175px] rounded-2xl border-[1.5px] border-neutral-900 bg-accent p-5 space-y-3">
              <Skeleton shape="text" className="w-1/2 bg-neutral-900/20" />
              <Skeleton
                shape="block"
                className="h-12 w-3/4 bg-neutral-900/20"
              />
              <Skeleton shape="text" className="w-1/3 bg-neutral-900/20" />
            </div>
          ) : (
            <StatCard
              title="Penerima Manfaat Aktif"
              value="48"
              unit="Lembaga"
              icon={<Users className="size-5" />}
              trend={{
                value: "+6 Baru",
                isPositive: true,
                label: "bulan ini",
              }}
              styleVariant="accent"
            />
          )}
        </div>
      </div>

      {/* Live Interactive Stat Card Tester */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Stat Card Tester
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatStyle("default");
              setStatValue("3.077");
              setStatUnit("Kg");
              setStatLoading(false);
            }}
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Pilih Varian
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              {(["default", "brand", "accent"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatStyle(st)}
                  className={cn(
                    "flex-1 rounded-lg py-1 text-xs font-semibold capitalize transition-colors",
                    statStyle === st
                      ? "bg-brand text-white"
                      : "text-neutral-600 hover:text-neutral-900",
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Nilai Angka
            </label>
            <input
              type="text"
              value={statValue}
              onChange={(e) => setStatValue(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Satuan (Unit)
            </label>
            <select
              value={statUnit}
              onChange={(e) => setStatUnit(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-hidden"
            >
              <option value="Kg">Kg (Kilogram)</option>
              <option value="Porsi">Porsi</option>
              <option value="Orang">Orang</option>
              <option value="Lembaga">Lembaga</option>
              <option value="Aksi">Aksi</option>
              <option value="Rp">Rp (Rupiah)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Simulasi Loading
            </label>
            <Button
              variant={statLoading ? "primary" : "secondary"}
              size="sm"
              className="w-full justify-center"
              onClick={() => setStatLoading(!statLoading)}
            >
              {statLoading ? "Matikan Skeleton" : "Nyalakan Skeleton"}
            </Button>
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
