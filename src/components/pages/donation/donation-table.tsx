import { Eye, Pencil, Trash2 } from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { IconButton } from "#/components/ui/icon-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import {
  EmptyState,
  IllustrationCariKosong,
} from "#/components/shared/empty-state";
import { Pagination } from "#/components/shared/pagination";
import type { DonationItem } from "./donation-data";

export interface DonationTableProps {
  data: DonationItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortDirection?: "asc" | "desc";
  onSortToggle?: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  onViewItem?: (item: DonationItem) => void;
  onEditItem?: (item: DonationItem) => void;
  onDeleteItem?: (item: DonationItem) => void;
  userRole?: "super_admin" | "core" | "staff";
}

/**
 * DonationTable: Tabel daftar donasi dengan kolom Tanggal, Nama Donatur, Kuota, Status, dan Aksi.
 * Dilengkapi dengan fallback EmptyState saat pencarian kosong dan Paginasi server/client.
 */
export function DonationTable({
  data,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  sortDirection = "desc",
  onSortToggle,
  searchQuery,
  onClearSearch,
  onViewItem,
  onEditItem,
  onDeleteItem,
  userRole = "super_admin",
}: DonationTableProps) {
  const canDelete = userRole === "super_admin" || userRole === "core";
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * 10 + 1;
  const endRange = Math.min(currentPage * 10, totalCount);

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs overflow-hidden w-full">
      {/* Container Tabel dengan Scroll Horizontal pada Layar Kecil */}
      <div className="overflow-x-auto w-full">
        <Table className="border-none shadow-none rounded-none">
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[220px]"
                sort={sortDirection}
                onSort={onSortToggle}
              >
                Tanggal
              </TableHead>
              <TableHead className="min-w-[240px]">Nama Donatur</TableHead>
              <TableHead className="w-[140px]">Kuota</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[150px]" align="right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          {data.length > 0 && (
            <TableBody>
              {data.map((item) => {
                const isActive = item.status === "Aktif";

                return (
                  <TableRow key={item.id}>
                    {/* Kolom Tanggal (Tanggal + Hari) */}
                    <TableCell className="w-[220px]">
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral-900 text-sm">
                          {item.date}
                        </span>
                        <span className="text-xs text-neutral-500 font-normal">
                          {item.day}
                        </span>
                      </div>
                    </TableCell>

                    {/* Kolom Nama Donatur (Avatar + Stack Nama & Kategori) */}
                    <TableCell className="min-w-[240px]">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={item.donorName}
                          size="sm"
                          shape="circle"
                          className="size-8 bg-bondi-50 text-brand-dark border-bondi-200 font-semibold"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-neutral-900 text-sm truncate">
                            {item.donorName}
                          </span>
                          <span className="text-xs text-neutral-500 font-normal truncate">
                            {item.program}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Kolom Kuota */}
                    <TableCell className="w-[140px] text-neutral-900 font-normal">
                      {item.quotaClaimed} / {item.quotaTotal}
                    </TableCell>

                    {/* Kolom Status (Badge dengan Dot) */}
                    <TableCell className="w-[150px]">
                      <Badge
                        dot
                        tone={isActive ? "brand" : "neutral"}
                        styleVariant="soft"
                        className={
                          isActive
                            ? "bg-bondi-50 text-brand-dark border-transparent"
                            : "bg-neutral-100 text-neutral-600 border-transparent"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>

                    {/* Kolom Aksi */}
                    <TableCell className="w-[150px]" align="right">
                      <div className="flex items-center justify-end gap-1">
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label={`Lihat detail donasi ${item.donorName}`}
                          onClick={() => onViewItem?.(item)}
                        >
                          <Eye className="size-[18px]" />
                        </IconButton>

                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label={`Edit data donasi ${item.donorName}`}
                          onClick={() => onEditItem?.(item)}
                        >
                          <Pencil className="size-[18px]" />
                        </IconButton>

                        {canDelete && (
                          <IconButton
                            size="sm"
                            variant="danger"
                            aria-label={`Hapus donasi ${item.donorName}`}
                            onClick={() => onDeleteItem?.(item)}
                          >
                            <Trash2 className="size-[18px]" />
                          </IconButton>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Tampilan Kondisi Kosong (Empty State) Sesuai Figma Node 119:3333 */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 w-full">
          <EmptyState
            title="Donasi tidak ditemukan"
            description={
              searchQuery
                ? `Tidak ada donatur dengan nama "${searchQuery}". Coba kata kunci lain atau ubah filter.`
                : "Belum ada donasi yang sesuai dengan kriteria penyaringan saat ini."
            }
            illustration={<IllustrationCariKosong className="size-[200px]" />}
            visual="illustration"
            action={
              searchQuery && onClearSearch ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onClearSearch}
                  className="rounded-full shadow-2xs"
                >
                  Hapus pencarian
                </Button>
              ) : undefined
            }
          />
        </div>
      )}

      {/* Bagian Bawah: Paginasi Data */}
      {totalCount > 0 && (
        <div className="border-t border-neutral-100 px-5 py-4 w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            rangeText={`${startRange} - ${endRange} dari ${totalCount}`}
          />
        </div>
      )}
    </div>
  );
}
