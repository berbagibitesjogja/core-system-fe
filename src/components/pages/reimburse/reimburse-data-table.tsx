import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Check, FileText, X } from "lucide-react";
import {
  EmptyState,
  IllustrationCariKosong,
} from "#/components/shared/empty-state";
import { Pagination } from "#/components/shared/pagination";
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
import { cn } from "#/lib/utils";
import { formatRupiah, REIMBURSE_STATUS_BADGE_TONE } from "./reimburse-data";
import type { ReimburseDataItem } from "./reimburse-management-data";

export interface ReimburseDataTableProps {
  items: ReimburseDataItem[];
  canCancel: boolean;
  hasActiveFilter: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onResetFilters: () => void;
  onPreviewInvoice: (item: ReimburseDataItem) => void;
  onPreviewTransferProof: (item: ReimburseDataItem) => void;
  onRequestConfirmPaid: (item: ReimburseDataItem) => void;
  onRequestCancel: (item: ReimburseDataItem) => void;
}

// Tabel manajemen pengajuan reimburse sesuai desain tabel & kolom Figma 156:23988
export function ReimburseDataTable({
  items,
  canCancel,
  hasActiveFilter,
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
  onResetFilters,
  onPreviewInvoice,
  onPreviewTransferProof,
  onRequestConfirmPaid,
  onRequestCancel,
}: ReimburseDataTableProps) {
  const columns = React.useMemo<ColumnDef<ReimburseDataItem>[]>(
    () => [
      {
        id: "pemohon",
        header: "Pemohon",
        meta: {
          className: "min-w-[230px]",
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex min-w-0 items-center gap-3">
              <Avatar
                src={item.applicantAvatarSrc}
                name={item.applicantName}
                size="sm"
                shape="circle"
                className="shrink-0 border-bondi-200 bg-bondi-50 text-bondi-800"
              />
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {item.applicantName}
                </p>
                <p className="truncate text-xs font-medium text-neutral-500">
                  {item.method} · {item.destinationNumber}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: "catatan",
        header: "Catatan",
        meta: {
          className: "w-full max-w-[340px]",
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
            <p
              className="max-w-[340px] truncate text-xs font-normal leading-4 text-neutral-600"
              title={item.note}
            >
              {item.note}
            </p>
          );
        },
      },
      {
        id: "jumlah",
        header: "Jumlah",
        meta: {
          align: "right",
          className: "w-[120px] min-w-[120px]",
        },
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm font-semibold text-neutral-900 tabular-nums">
            {formatRupiah(row.original.amount)}
          </span>
        ),
      },
      {
        id: "bukti",
        header: "Bukti",
        meta: {
          className: "w-[150px] min-w-[150px]",
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-col items-start justify-center gap-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                leftIcon={<FileText className="size-3.5 shrink-0" />}
                onClick={() => onPreviewInvoice(item)}
                className="h-auto min-h-0 gap-1 rounded-none px-0 py-0 text-xs font-semibold leading-4 text-brand hover:bg-transparent hover:underline"
              >
                Invoice
              </Button>
              {item.status === "Selesai" ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  leftIcon={<FileText className="size-3.5 shrink-0" />}
                  onClick={() => onPreviewTransferProof(item)}
                  className="h-auto min-h-0 gap-1 rounded-none px-0 py-0 text-xs font-semibold leading-4 text-brand hover:bg-transparent hover:underline"
                >
                  Bukti transfer
                </Button>
              ) : (
                <span className="text-xs font-medium leading-4 text-neutral-500">
                  Transfer: —
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        meta: {
          className: "w-[110px] min-w-[110px]",
        },
        cell: ({ row }) => (
          <Badge
            tone={REIMBURSE_STATUS_BADGE_TONE[row.original.status]}
            styleVariant="soft"
            dot
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "aksi",
        header: "Aksi",
        meta: {
          align: "right",
          className: "w-[150px] min-w-[150px]",
        },
        cell: ({ row }) => {
          const item = row.original;
          if (item.status !== "Proses") {
            return (
              <span className="text-sm font-normal text-neutral-500">—</span>
            );
          }

          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="primary"
                size="sm"
                leftIcon={<Check className="size-4" />}
                onClick={() => onRequestConfirmPaid(item)}
              >
                Sudah
              </Button>
              {canCancel && (
                <IconButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  tooltip="Batalkan pengajuan"
                  aria-label={`Batalkan pengajuan ${item.applicantName}`}
                  onClick={() => onRequestCancel(item)}
                  className="border-neutral-300 text-red-600 hover:border-red-300 hover:bg-red-50"
                >
                  <X className="size-[18px]" />
                </IconButton>
              )}
            </div>
          );
        },
      },
    ],
    [
      canCancel,
      onPreviewInvoice,
      onPreviewTransferProof,
      onRequestCancel,
      onRequestConfirmPaid,
    ],
  );

  const table = useReactTable({
    data: items,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-surface px-6 py-12 shadow-xs">
        <EmptyState
          visual="illustration"
          illustration={<IllustrationCariKosong className="size-36" />}
          title="Data reimburse tidak ditemukan"
          description={
            hasActiveFilter
              ? "Tidak ada pengajuan reimburse yang cocok dengan kata kunci atau filter status saat ini."
              : "Belum ada data pengajuan reimburse yang tercatat."
          }
          action={
            hasActiveFilter ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onResetFilters}
              >
                Hapus pencarian
              </Button>
            ) : undefined
          }
        />
      </div>
    );
  }

  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalItems);
  const rangeText = `Menampilkan ${startRange} - ${endRange} dari ${totalItems} pengajuan`;

  return (
    <div className="flex w-full flex-col rounded-2xl border border-neutral-200 bg-surface shadow-xs">
      <div className="w-full overflow-x-auto rounded-t-2xl">
        <Table
          containerClassName="border-none shadow-none rounded-none"
          className="w-full min-w-[920px] rounded-none border-none shadow-none"
        >
          <TableHeader className="bg-neutral-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  return (
                    <TableHead
                      key={header.id}
                      align={meta?.align}
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-[0.06em] text-neutral-600",
                        meta?.className,
                      )}
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

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  row.original.isNewlyCompleted &&
                    "bg-green-50 transition-colors hover:bg-green-50/90",
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta;
                  return (
                    <TableCell
                      key={cell.id}
                      align={meta?.align}
                      className={cn("h-18 border-neutral-200", meta?.className)}
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
        </Table>
      </div>

      {totalItems > 0 && (
        <TableFooter className="border-neutral-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            rangeText={rangeText}
            perPage={perPage}
            onPerPageChange={onPerPageChange}
          />
        </TableFooter>
      )}
    </div>
  );
}
