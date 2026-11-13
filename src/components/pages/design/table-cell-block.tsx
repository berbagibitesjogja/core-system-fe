import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Avatar,
  Badge,
  IconButton,
  TableCell,
  TableHead,
} from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface TableCellBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * TableCellBlock: Dokumentasi sel isi tabel sistem BBJ (Node 19:298).
 * Menampilkan live showcase 6 tipe sel tabel BBJ (Text, Text+Subtext, Avatar+Text, Number, Badge, Actions).
 */
export function TableCellBlock({ onCopy, copiedToken }: TableCellBlockProps) {
  return (
    <DocBlock
      id="doc-table-cell"
      nodeId="Node 19:298"
      title="5. Table Cell"
      subtitle="src/components/ui/table.tsx"
      copyCode={`<TableCell>\n  <div className="flex flex-col">\n    <span className="font-label text-sm font-semibold text-neutral-900">Royal Ambarrukmo</span>\n    <span className="text-xs text-neutral-500">Sleman, DI Yogyakarta</span>\n  </div>\n</TableCell>`}
      copyTokenKey="table-cell-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-298"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Sel isi tabel, tinggi standar 64px, garis bawah 1px
        (border-neutral-100). 6 tipe: Text, Text + Subtext, Avatar + Text,
        Number (rata kanan), Badge (status), dan Actions (Lihat, Edit, Hapus -
        hapus disembunyikan untuk role staff). Di mobile (&lt;768px) baris tabel
        dapat bertransformasi menjadi kartu tumpuk.
      </p>

      {/* 6 Types Demonstration Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
            Live Showcase 6 Tipe Sel Tabel BBJ (Tinggi 64px)
          </h4>
          <span className="text-xs text-neutral-400">
            Desktop Table View &amp; Actions
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs -mx-1 px-1">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="bg-neutral-100 border-b border-neutral-200">
                <TableHead className="w-56">1. TYPE: TEXT + SUBTEXT</TableHead>
                <TableHead className="w-64">2. TYPE: AVATAR + TEXT</TableHead>
                <TableHead className="w-40" align="right">
                  3. TYPE: NUMBER
                </TableHead>
                <TableHead className="w-36">4. TYPE: BADGE</TableHead>
                <TableHead className="w-40" align="right">
                  5. TYPE: ACTIONS
                </TableHead>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {/* Row 1 */}
              <tr className="hover:bg-neutral-50/70 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-label text-sm font-semibold text-neutral-900">
                      Nasi Kotak Ayam Bakar
                    </span>
                    <span className="font-sans text-xs text-neutral-500">
                      Menu lengkap + lalapan sayur
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name="RA" size="sm" shape="rounded" />
                    <div className="flex flex-col">
                      <span className="font-label text-sm font-semibold text-neutral-900">
                        Royal Ambarrukmo
                      </span>
                      <span className="font-sans text-xs text-neutral-500">
                        Depok, Sleman
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <span className="font-label text-sm font-bold text-neutral-900">
                    75 Porsi
                  </span>
                  <span className="block text-xs text-neutral-500">
                    ~22.5 Kg
                  </span>
                </TableCell>
                <TableCell>
                  <Badge tone="success" styleVariant="soft" dot>
                    Selesai
                  </Badge>
                </TableCell>
                <TableCell align="right">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <IconButton
                      aria-label="Lihat Detail"
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="size-4" />
                    </IconButton>
                    <IconButton
                      aria-label="Edit Data"
                      variant="ghost"
                      size="sm"
                    >
                      <Pencil className="size-4" />
                    </IconButton>
                    <IconButton
                      aria-label="Hapus (Admin)"
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </IconButton>
                  </div>
                </TableCell>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-neutral-50/70 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-label text-sm font-semibold text-neutral-900">
                      Roti Manis &amp; Pastry
                    </span>
                    <span className="font-sans text-xs text-neutral-500">
                      Kemasan higienis tertutup
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                      size="sm"
                      shape="circle"
                    />
                    <div className="flex flex-col">
                      <span className="font-label text-sm font-semibold text-neutral-900">
                        Budi Santoso
                      </span>
                      <span className="font-sans text-xs text-neutral-500">
                        Hero Volunteer
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <span className="font-label text-sm font-bold text-neutral-900">
                    120 Pcs
                  </span>
                  <span className="block text-xs text-neutral-500">
                    ~14.0 Kg
                  </span>
                </TableCell>
                <TableCell>
                  <Badge tone="warning" styleVariant="soft" dot>
                    Menunggu
                  </Badge>
                </TableCell>
                <TableCell align="right">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <IconButton
                      aria-label="Lihat Detail"
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="size-4" />
                    </IconButton>
                    <IconButton
                      aria-label="Edit Data"
                      variant="ghost"
                      size="sm"
                    >
                      <Pencil className="size-4" />
                    </IconButton>
                    <IconButton
                      aria-label="Hapus (Admin)"
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </IconButton>
                  </div>
                </TableCell>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-neutral-50/70 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-label text-sm font-semibold text-neutral-900">
                      Bahan Pangan Segar
                    </span>
                    <span className="font-sans text-xs text-neutral-500">
                      Sayuran &amp; buah surplus panen
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name="PS" size="sm" shape="rounded" />
                    <div className="flex flex-col">
                      <span className="font-label text-sm font-semibold text-neutral-900">
                        Pasar Stan Maguwo
                      </span>
                      <span className="font-sans text-xs text-neutral-500">
                        Mitra Komunitas
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <span className="font-label text-sm font-bold text-neutral-900">
                    50 Kg
                  </span>
                  <span className="block text-xs text-neutral-500">
                    Pangan Segar
                  </span>
                </TableCell>
                <TableCell>
                  <Badge tone="info" styleVariant="soft" dot>
                    Berjalan
                  </Badge>
                </TableCell>
                <TableCell align="right">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <IconButton
                      aria-label="Lihat Detail"
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="size-4" />
                    </IconButton>
                    <IconButton
                      aria-label="Edit Data"
                      variant="ghost"
                      size="sm"
                    >
                      <Pencil className="size-4" />
                    </IconButton>
                    <IconButton
                      aria-label="Hapus (Admin)"
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </IconButton>
                  </div>
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DocBlock>
  );
}
