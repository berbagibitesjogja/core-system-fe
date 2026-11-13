import * as React from "react";
import { ArrowDown, ArrowUpDown } from "lucide-react";
import { TableHead } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface TableHeaderBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * TableHeaderBlock: Dokumentasi sel header kolom tabel sistem BBJ (Node 19:252).
 * Menampilkan 4 varian resmi (Left/Right × None/Sorted) serta bar interaktif pengujian sort.
 */
export function TableHeaderBlock({
  onCopy,
  copiedToken,
}: TableHeaderBlockProps) {
  const [sortColumn, setSortColumn] = React.useState<string>("tanggal");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc",
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <DocBlock
      id="doc-table-header"
      nodeId="Node 19:252"
      title="4. Table Header Cell"
      subtitle="src/components/ui/table.tsx"
      copyCode='<TableHead sort="asc" onSort={() => {}} align="left">NAMA DONATUR</TableHead>'
      copyTokenKey="table-header-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-252"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Header kolom tabel. Tinggi 44px, latar belakang subtle neutral-100
        (#EEF1F2), border-b 1px, teks Inter Bold 11px uppercase dengan tracking
        0.66px. Rata kanan untuk angka (Kuota, Berat, Jumlah, Nominal). Sorted
        menandai kolom urutan default (mis. Tanggal terbaru).
      </p>

      {/* 4-Variant Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-neutral-800">
              1. Align: Left, Sort: None
            </span>
            <span className="text-[11px] text-neutral-500">Teks Biasa</span>
          </div>
          <div className="h-11 rounded-xl border border-neutral-200 bg-neutral-100 px-4 flex items-center justify-between">
            <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              NAMA DONATUR
            </span>
            <ArrowUpDown className="size-3.5 text-neutral-400 opacity-60" />
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-brand">
              2. Align: Left, Sort: Sorted (Active)
            </span>
            <span className="text-[11px] text-neutral-500">Urutan Default</span>
          </div>
          <div className="h-11 rounded-xl border border-bondi-200 bg-neutral-100 px-4 flex items-center justify-between shadow-xs">
            <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-900">
              TANGGAL DONASI
            </span>
            <ArrowDown className="size-3.5 text-brand" />
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-neutral-800">
              3. Align: Right, Sort: None
            </span>
            <span className="text-[11px] text-neutral-500">
              Kolom Angka/Berat
            </span>
          </div>
          <div className="h-11 rounded-xl border border-neutral-200 bg-neutral-100 px-4 flex items-center justify-end gap-1.5">
            <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              BERAT TOTAL (KG)
            </span>
            <ArrowUpDown className="size-3.5 text-neutral-400 opacity-60" />
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-brand">
              4. Align: Right, Sort: Sorted
            </span>
            <span className="text-[11px] text-neutral-500">Angka Terbesar</span>
          </div>
          <div className="h-11 rounded-xl border border-bondi-200 bg-neutral-100 px-4 flex items-center justify-end gap-1.5 shadow-xs">
            <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-900">
              ESTIMASI PORSI
            </span>
            <ArrowDown className="size-3.5 text-brand" />
          </div>
        </div>
      </div>

      {/* Interactive Header Sort Tester Bar */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Uji Coba Sort Header Tabel (Klik Kolom)
          </span>
          <span className="text-xs text-neutral-500">
            Aktif: Kolom{" "}
            <strong className="text-neutral-900 uppercase">{sortColumn}</strong>{" "}
            ({sortDirection})
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs -mx-1 px-1">
          <table className="w-full min-w-[500px] text-left">
            <thead>
              <tr className="bg-neutral-100 border-b border-neutral-200">
                <TableHead
                  sort={sortColumn === "donatur" ? sortDirection : "none"}
                  onSort={() => handleSort("donatur")}
                >
                  DONATUR
                </TableHead>
                <TableHead
                  sort={sortColumn === "makanan" ? sortDirection : "none"}
                  onSort={() => handleSort("makanan")}
                >
                  JENIS MAKANAN
                </TableHead>
                <TableHead
                  sort={sortColumn === "tanggal" ? sortDirection : "none"}
                  onSort={() => handleSort("tanggal")}
                >
                  TANGGAL
                </TableHead>
                <TableHead
                  align="right"
                  sort={sortColumn === "jumlah" ? sortDirection : "none"}
                  onSort={() => handleSort("jumlah")}
                >
                  JUMLAH PORSI
                </TableHead>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs text-neutral-500">
                <td className="px-4 py-3">Hotel Tentrem</td>
                <td className="px-4 py-3">Pastry &amp; Roti Aneka</td>
                <td className="px-4 py-3">08 Nov 2026</td>
                <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                  45 Porsi
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DocBlock>
  );
}
