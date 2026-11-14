import * as React from "react";
import { Link } from "@tanstack/react-router";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Eye, Plus } from "lucide-react";
import {
  EmptyState,
  IllustrationSantaiKosong,
} from "#/components/shared/empty-state";
import { Pagination } from "#/components/shared/pagination";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { getIconButtonClasses } from "#/components/ui/icon-button";
import { Tooltip } from "#/components/ui/tooltip";
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
import { PARTNER_DETAIL_DONATIONS_PER_PAGE } from "./partner-detail-data";
import type { PartnerDonationRecord } from "./partner-detail-data";

export interface PartnerDetailDonationsTableProps {
  partnerName: string;
  data: PartnerDonationRecord[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
  sortDirection: "asc" | "desc";
  onSortToggle: () => void;
  onPageChange: (page: number) => void;
  onViewDonation: (item: PartnerDonationRecord) => void;
  onAddDonation: () => void;
}

/**
 * PartnerDetailDonationsTable: Kartu tabel riwayat donasi yang disumbangkan oleh mitra donatur.
 * Mendukung pengurutan tanggal, paginasi URL, state kosong dengan CTA Tambah Donasi, serta kartu mobile.
 */
export function PartnerDetailDonationsTable({
  partnerName,
  data,
  totalCount,
  currentPage,
  totalPages,
  perPage,
  onPerPageChange,
  perPageOptions = [PARTNER_DETAIL_DONATIONS_PER_PAGE, 12, 24, 48],
  sortDirection,
  onSortToggle,
  onPageChange,
  onViewDonation,
  onAddDonation,
}: PartnerDetailDonationsTableProps) {
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalCount);

  // Definisi kolom tabel Data-Driven
  const columns = React.useMemo<Array<ColumnDef<PartnerDonationRecord>>>(
    () => [
      {
        id: "date",
        accessorKey: "dateLabel",
        header: "Tanggal",
        meta: {
          className: "w-[190px]",
          sort: sortDirection,
          onSort: onSortToggle,
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-sm leading-5 text-neutral-900">
              {row.original.dateLabel}
            </span>
            <span className="font-sans text-xs leading-4 text-neutral-500">
              {row.original.dayLabel}
            </span>
          </div>
        ),
      },
      {
        id: "quota",
        accessorKey: "quotaCount",
        header: "Kuota",
        cell: ({ row }) => (
          <span className="font-sans text-sm text-neutral-900">
            {row.original.quotaCount.toLocaleString("id-ID")} Orang
          </span>
        ),
      },
      {
        id: "food",
        accessorKey: "foodKg",
        header: "Makanan",
        meta: {
          className: "w-[100px]",
        },
        cell: ({ row }) => (
          <span className="font-sans text-sm text-neutral-900">
            {row.original.foodKg.toLocaleString("id-ID")} Kg
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          className: "w-[80px]",
          align: "right",
        },
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <Tooltip content="Lihat detail donasi" placement="top">
              <Link
                to="/admin/donation/detail"
                search={{ id: row.original.id }}
                aria-label={`Lihat detail donasi ${partnerName} tanggal ${row.original.dateLabel}`}
                className={getIconButtonClasses({
                  variant: "ghost",
                  size: "sm",
                  className: "text-neutral-700 hover:bg-neutral-100",
                })}
              >
                <Eye />
              </Link>
            </Tooltip>
          </div>
        ),
      },
    ],
    [sortDirection, onSortToggle, onViewDonation, partnerName],
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section
      aria-label={`Donasi Oleh ${partnerName}`}
      className="flex-1 min-w-0 w-full rounded-2xl border border-neutral-200 bg-white shadow-xs"
    >
      {/* Header Kartu Riwayat Donasi */}
      <div className="px-5 py-4 border-b border-neutral-100 rounded-t-2xl flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900 min-w-0 truncate">
          Donasi Oleh {partnerName}
        </h2>
        <Badge
          tone="neutral"
          styleVariant="soft"
          className="shrink-0 bg-neutral-100 text-neutral-600 border-transparent font-medium"
        >
          {totalCount.toLocaleString("id-ID")} aksi
        </Badge>
      </div>

      {/* State Kosong Belum Ada Riwayat Donasi */}
      {totalCount === 0 ? (
        <div className="flex items-center justify-center px-6 py-10">
          <EmptyState
            size="default"
            visual="illustration"
            illustration={<IllustrationSantaiKosong />}
            title="Belum ada riwayat donasi"
            description="Belum ada riwayat donasi yang disumbangkan oleh donatur ini."
            action={
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus className="size-5 text-white" />}
                onClick={onAddDonation}
              >
                Tambah Donasi
              </Button>
            }
          />
        </div>
      ) : (
        <>
          {/* Tabel Desktop & Tablet */}
          <div className="hidden md:block w-full overflow-x-auto">
            <Table containerClassName="rounded-none border-0 shadow-none">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta;

                      return (
                        <TableHead
                          key={header.id}
                          className={cn(
                            "uppercase tracking-[0.04em]",
                            meta?.className,
                          )}
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
            </Table>
          </div>

          {/* Tampilan Kartu Tumpuk Mobile (<768px) */}
          <div className="md:hidden divide-y divide-neutral-100">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0 space-y-1.5">
                  <div>
                    <p className="font-sans font-semibold text-sm text-neutral-900">
                      {item.dateLabel}
                    </p>
                    <p className="font-sans text-xs text-neutral-500">
                      {item.dayLabel}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                    <span>
                      Kuota:{" "}
                      <strong className="font-medium text-neutral-900">
                        {item.quotaCount.toLocaleString("id-ID")} Orang
                      </strong>
                    </span>
                    <span>
                      Makanan:{" "}
                      <strong className="font-medium text-neutral-900">
                        {item.foodKg.toLocaleString("id-ID")} Kg
                      </strong>
                    </span>
                  </div>
                </div>

                <Tooltip content="Lihat detail donasi" placement="top">
                  <Link
                    to="/admin/donation/detail"
                    search={{ id: item.id }}
                    aria-label={`Lihat detail donasi ${partnerName} tanggal ${item.dateLabel}`}
                    className={getIconButtonClasses({
                      variant: "ghost",
                      size: "sm",
                      className:
                        "shrink-0 text-neutral-700 hover:bg-neutral-100",
                    })}
                  >
                    <Eye />
                  </Link>
                </Tooltip>
              </div>
            ))}
          </div>

          {/* Footer Paginasi Riwayat Donasi */}
          <TableFooter className="border-t border-neutral-100 px-5 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              perPage={perPage}
              onPerPageChange={onPerPageChange}
              perPageOptions={perPageOptions}
              rangeText={`${startRange} - ${endRange} dari ${totalCount}`}
              className="py-0"
            />
          </TableFooter>
        </>
      )}
    </section>
  );
}
