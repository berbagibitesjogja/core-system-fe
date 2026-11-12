import * as React from "react";
import { Eye } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Badge } from "#/components/ui/badge";
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
  IllustrationSantaiKosong,
} from "#/components/shared/empty-state";
import { Pagination } from "#/components/shared/pagination";
import { DETAIL_DONATIONS_PER_PAGE } from "./beneficiary-detail-data";
import type { BeneficiaryDonationRecord } from "./beneficiary-detail-data";

export interface BeneficiaryDetailDonationsTableProps {
  beneficiaryName: string;
  data: BeneficiaryDonationRecord[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
  sortDirection: "asc" | "desc";
  onSortToggle: () => void;
  onPageChange: (page: number) => void;
  onViewDonation: (item: BeneficiaryDonationRecord) => void;
}

/**
 * BeneficiaryDetailDonationsTable: Kartu tabel riwayat donasi yang disalurkan ke kelompok penerima manfaat.
 * Mendukung pengurutan tanggal, paginasi URL, pemilihan jumlah per halaman, state kosong, dan kartu tumpuk untuk layar mobile.
 */
export function BeneficiaryDetailDonationsTable({
  beneficiaryName,
  data,
  totalCount,
  currentPage,
  totalPages,
  perPage,
  onPerPageChange,
  perPageOptions = [DETAIL_DONATIONS_PER_PAGE, 10, 20, 50, 100],
  sortDirection,
  onSortToggle,
  onPageChange,
  onViewDonation,
}: BeneficiaryDetailDonationsTableProps) {
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalCount);

  // Definisi kolom Data-Driven untuk riwayat donasi penerima manfaat
  const columns = React.useMemo<Array<ColumnDef<BeneficiaryDonationRecord>>>(
    () => [
      {
        id: "date",
        accessorKey: "dateLabel",
        header: "Tanggal",
        meta: {
          className: "uppercase tracking-[0.04em]",
          sort: sortDirection,
          onSort: onSortToggle,
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-sans text-sm leading-5 text-neutral-900">
              {row.original.dateLabel}
            </span>
            <span className="font-sans text-xs leading-4 text-neutral-500">
              {row.original.dayLabel}
            </span>
          </div>
        ),
      },
      {
        id: "recipients",
        accessorKey: "recipientCount",
        header: "Penerima",
        meta: {
          className: "uppercase tracking-[0.04em]",
        },
        cell: ({ row }) => (
          <span className="font-sans text-sm text-neutral-900">
            {row.original.recipientCount.toLocaleString("id-ID")} Orang
          </span>
        ),
      },
      {
        id: "donor",
        accessorKey: "donorName",
        header: "Donatur",
        meta: {
          className: "uppercase tracking-[0.04em]",
        },
        cell: ({ row }) => (
          <span className="font-sans font-medium text-sm text-neutral-900">
            {row.original.donorName}
          </span>
        ),
      },
      {
        id: "food",
        accessorKey: "foodKg",
        header: "Makanan",
        meta: {
          className: "uppercase tracking-[0.04em]",
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
          className: "uppercase tracking-[0.04em] w-[72px]",
          align: "right",
        },
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <IconButton
              variant="ghost"
              size="sm"
              tooltip="Lihat detail donasi"
              aria-label={`Lihat detail donasi ${row.original.donorName} tanggal ${row.original.dateLabel}`}
              onClick={() => onViewDonation(row.original)}
              className="text-neutral-700 hover:bg-neutral-100"
            >
              <Eye />
            </IconButton>
          </div>
        ),
      },
    ],
    [sortDirection, onSortToggle, onViewDonation],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section
      aria-label={`Donasi Untuk ${beneficiaryName}`}
      className="flex-1 min-w-0 w-full rounded-2xl border border-neutral-200 bg-white shadow-xs"
    >
      {/* Header Kartu Riwayat Donasi */}
      <div className="px-5 py-4 border-b border-neutral-100 rounded-t-2xl flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-['Gabarito'] text-base font-semibold leading-6 text-neutral-900 min-w-0 truncate">
          Donasi Untuk {beneficiaryName}
        </h2>
        <Badge
          tone="neutral"
          styleVariant="soft"
          className="shrink-0 bg-neutral-100 text-neutral-600 font-medium"
        >
          {totalCount.toLocaleString("id-ID")} donasi
        </Badge>
      </div>

      {/* State Kosong Belum Ada Riwayat Donasi */}
      {totalCount === 0 ? (
        <div className="flex items-center justify-center px-6 py-10">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationSantaiKosong />}
            title="Belum ada riwayat donasi"
            description="Belum ada riwayat donasi yang disalurkan ke penerima manfaat ini."
            className="max-w-[380px] p-4"
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

              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta;

                      return (
                        <TableCell key={cell.id} align={meta?.align}>
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
                <div className="min-w-0 space-y-2">
                  <div>
                    <p className="font-sans font-medium text-sm text-neutral-900 truncate">
                      {item.donorName}
                    </p>
                    <p className="font-sans text-xs text-neutral-500">
                      {item.dayLabel}, {item.dateLabel}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                    <span>
                      Penerima:{" "}
                      <strong className="font-medium text-neutral-900">
                        {item.recipientCount.toLocaleString("id-ID")} Orang
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

                <IconButton
                  variant="ghost"
                  size="sm"
                  tooltip="Lihat detail donasi"
                  aria-label={`Lihat detail donasi ${item.donorName} tanggal ${item.dateLabel}`}
                  onClick={() => onViewDonation(item)}
                  className="shrink-0 text-neutral-700 hover:bg-neutral-100"
                >
                  <Eye />
                </IconButton>
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
