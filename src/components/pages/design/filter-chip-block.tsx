import * as React from "react";
import { Box } from "lucide-react";
import { FilterChip } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface FilterChipBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * FilterChipBlock: Dokumentasi filter kategori toolbar sistem BBJ (Node 18:311).
 * Menampilkan matriks dengan/tanpa counter (default, hover, selected) serta toolbar interaktif.
 */
export function FilterChipBlock({ onCopy, copiedToken }: FilterChipBlockProps) {
  const [selectedFilter, setSelectedFilter] = React.useState("semua");

  return (
    <DocBlock
      id="doc-filter-chip"
      nodeId="Node 18:311"
      title="7. Filter Chip"
      subtitle="src/components/shared/filter-chip.tsx"
      icon={<Box className="size-4" />}
      copyCode="<FilterChip selected count={12}>Universitas</FilterChip>"
      copyTokenKey="filter-chip-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-311&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Filter kategori satu-pilihan di toolbar: CSR / Food Rescue, Semua /
        Universitas / Yayasan / Masyarakat Umum, status reimburse. Selected
        memakai tinta gelap (#142023) + angka kuning (#ffda57) agar terasa fun
        namun tetap jelas.
      </p>

      {/* 6-variant Matrix matching Node 18:310 */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="min-w-[640px] w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[180px]">
                Varian
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Hover
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Selected
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-neutral-900">
                Dengan Counter
              </td>
              <td className="py-4 px-4">
                <FilterChip
                  label="Universitas"
                  count="12"
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <FilterChip
                  label="Universitas"
                  count="12"
                  forcedState="hover"
                />
              </td>
              <td className="py-4 px-4">
                <FilterChip
                  label="Universitas"
                  count="12"
                  forcedState="selected"
                />
              </td>
            </tr>

            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-neutral-900">
                Tanpa Counter
              </td>
              <td className="py-4 px-4">
                <FilterChip
                  label="Universitas"
                  showCount={false}
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <FilterChip
                  label="Universitas"
                  showCount={false}
                  forcedState="hover"
                />
              </td>
              <td className="py-4 px-4">
                <FilterChip
                  label="Universitas"
                  showCount={false}
                  forcedState="selected"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 space-y-2">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
          Live Interactive Filter Toolbar:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "semua", label: "Semua", count: 24 },
            { key: "csr", label: "CSR / Food Rescue", count: 8 },
            { key: "universitas", label: "Universitas", count: 12 },
            { key: "yayasan", label: "Yayasan", count: 4 },
            { key: "masyarakat", label: "Masyarakat Umum", count: 5 },
          ].map((item) => (
            <FilterChip
              key={item.key}
              selected={selectedFilter === item.key}
              onClick={() => setSelectedFilter(item.key)}
              count={item.count}
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
      </div>
    </DocBlock>
  );
}
