import * as React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { IconButton } from "#/components/ui/icon-button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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

declare module "@tanstack/react-table" {
  interface ColumnMeta<TFeatures, TData, TValue> {
    className?: string;
    align?: "left" | "right" | "center";
    sort?: "asc" | "desc" | "none";
    onSort?: () => void;
  }
}

export interface DonationColumnMeta {
  className?: string;
  align?: "left" | "right" | "center";
  sort?: "asc" | "desc" | "none";
  onSort?: () => void;
}

export interface DonationTableProps {
  data: DonationItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage?: number;
  onPerPageChange?: (perPage: number) => void;
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
 * DonationTable: Tabel daftar donasi dengan arsitektur Data-Driven menggunakan TanStack Table.
 * Konfigurasi kolom terdefinisi terpisah melalui ColumnDef dan di-render secara dinamis.
 */
export function DonationTable({
  data,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
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
  const effectivePerPage = perPage ?? 10;
  const startRange =
    totalCount === 0 ? 0 : (currentPage - 1) * effectivePerPage + 1;
  const endRange = Math.min(currentPage * effectivePerPage, totalCount);

  // Konfigurasi Kolom Data-Driven (TanStack Table ColumnDef)
  const columns = React.useMemo<Array<ColumnDef<DonationItem>>>(
    () => [
      {
        id: "date",
        accessorKey: "date",
        header: "Tanggal",
        meta: {
          className: "w-[220px]",
          sort: sortDirection,
          onSort: onSortToggle,
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-semibold text-neutral-900 text-sm">
              {row.original.date}
            </span>
            <span className="text-xs text-neutral-500 font-normal">
              {row.original.day}
            </span>
          </div>
        ),
      },
      {
        id: "donorName",
        accessorKey: "donorName",
        header: "Nama Donatur",
        meta: {
          className: "min-w-[240px]",
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar
              name={row.original.donorName}
              size="sm"
              shape="circle"
              className="size-8 bg-bondi-50 text-brand-dark border-bondi-200 font-semibold"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-neutral-900 text-sm truncate">
                {row.original.donorName}
              </span>
              <span className="text-xs text-neutral-500 font-normal truncate">
                {row.original.program}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "quota",
        header: "Kuota",
        meta: {
          className: "w-[140px]",
        },
        cell: ({ row }) => (
          <span className="text-neutral-900 font-normal">
            {row.original.quotaClaimed} / {row.original.quotaTotal}
          </span>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        meta: {
          className: "w-[150px]",
        },
        cell: ({ row }) => {
          const isActive = row.original.status === "Aktif";
          return (
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
              {row.original.status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          className: "w-[150px]",
          align: "right",
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
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
          );
        },
      },
    ],
    [
      sortDirection,
      onSortToggle,
      canDelete,
      onViewItem,
      onEditItem,
      onDeleteItem,
    ],
  );

  // Inisialisasi TanStack Table Instance
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs w-full">
      {/* Container Tabel dengan Scroll Horizontal pada Layar Kecil */}
      <div className="overflow-x-auto w-full rounded-t-2xl">
        <Table
          containerClassName="border-none shadow-none rounded-none"
          className="border-none shadow-none rounded-none w-full"
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;

                  return (
                    <TableHead
                      key={header.id}
                      className={meta?.className}
                      align={meta?.align}
                      sort={meta?.sort}
                      onSort={meta?.onSort}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {table.getRowModel().rows.length > 0 && (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;

                    return (
                      <TableCell
                        key={cell.id}
                        className={meta?.className}
                        align={meta?.align}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
        <TableFooter>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            perPage={perPage}
            onPerPageChange={onPerPageChange}
            rangeText={`${startRange} - ${endRange} dari ${totalCount}`}
          />
        </TableFooter>
      )}
    </div>
  );
}
