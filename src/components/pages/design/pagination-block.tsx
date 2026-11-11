import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "#/components/ui";
import { Pagination } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface PaginationBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * PaginationBlock: Dokumentasi komponen paginasi server-side sistem BBJ (Node 19:308).
 * Menampilkan status tombol nomor (Page Item 36×36px) serta demo paginasi interaktif.
 */
export function PaginationBlock({ onCopy, copiedToken }: PaginationBlockProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const totalItems = 392;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  return (
    <DocBlock
      id="doc-pagination"
      nodeId="Node 19:308"
      title="6. Pagination"
      subtitle="src/components/ui/pagination.tsx"
      copyCode={`<Pagination\n  currentPage={1}\n  totalPages={40}\n  rangeText="1 - 10 dari 392 data"\n  onPageChange={(page) => {}}\n/>`}
      copyTokenKey="pagination-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-308"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Paginasi server-side. Kiri: rentang data (&quot;1 - 10 dari 392&quot;).
        Kanan: tombol prev bulat, nomor halaman (Page Item 36×36px), tombol next
        bulat. Halaman aktif berwarna tinta (bg-neutral-900). Di mobile
        sembunyikan nomor tengah dan tampilkan &quot;Hal 1 / 40&quot;.
      </p>

      {/* Page Item States */}
      <div className="space-y-3">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          States Tombol Nomor (Page Item · 36×36px)
        </h4>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
          <div className="flex items-center gap-2">
            <span className="size-9 rounded-md border border-neutral-200 bg-white flex items-center justify-center font-label text-sm font-semibold text-neutral-700 shadow-2xs">
              1
            </span>
            <span className="text-xs text-neutral-600">State: Default</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-9 rounded-md bg-neutral-100 flex items-center justify-center font-label text-sm font-semibold text-neutral-900">
              1
            </span>
            <span className="text-xs text-neutral-600">State: Hover</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-9 rounded-md bg-neutral-900 flex items-center justify-center font-label text-sm font-semibold text-white shadow-xs">
              1
            </span>
            <span className="text-xs text-neutral-600 font-semibold">
              State: Active (Tinta)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-9 rounded-md border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 shadow-2xs">
              <ChevronLeft className="size-4" />
            </span>
            <span className="text-xs text-neutral-600">
              Prev/Next (rounded-md)
            </span>
          </div>
        </div>
      </div>

      {/* Live Interactive Pagination Component */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Pagination Demo
          </span>
          <span className="text-xs text-neutral-500">
            Halaman Aktif:{" "}
            <strong className="text-neutral-900">{currentPage}</strong> dari{" "}
            {totalPages}
          </span>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 shadow-xs overflow-x-auto -mx-1 px-1">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            onPerPageChange={(val) => {
              setPerPage(val);
              setCurrentPage(1);
            }}
            rangeText={`${(currentPage - 1) * perPage + 1} - ${Math.min(currentPage * perPage, totalItems)} dari ${totalItems} donasi`}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500 pt-1">
          <span>
            ℹ️ Coba klik nomor halaman, prev, atau next untuk menguji logika
            ellipsis dinamis.
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(1)}
            className="self-start sm:self-auto"
          >
            Reset ke Hal 1
          </Button>
        </div>
      </div>
    </DocBlock>
  );
}
