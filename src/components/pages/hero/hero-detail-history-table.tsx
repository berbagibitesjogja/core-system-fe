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
import { formatHeroCount } from "./hero-data";
import { HERO_DETAIL_PER_PAGE_OPTIONS } from "./hero-detail-data";
import type { HeroDonationHistoryRecord } from "./hero-detail-data";

export interface HeroDetailHistoryTableProps {
  data: HeroDonationHistoryRecord[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  sortDirection: "asc" | "desc";
  onSortToggle: () => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onViewDonation?: (record: HeroDonationHistoryRecord) => void;
}

const HISTORY_STATUS_BADGE = {
  berjalan: {
    label: "Berjalan",
    tone: "warning" as const,
  },
  selesai: {
    label: "Selesai",
    tone: "success" as const,
  },
};

/**
 * HeroDetailHistoryTable: Tabel riwayat donasi yang diterima oleh hero beserta state kosong (Figma 148:18379, 148:19021, 148:19359).
 */
export function HeroDetailHistoryTable({
  data,
  totalCount,
  currentPage,
  totalPages,
  perPage,
  sortDirection,
  onSortToggle,
  onPageChange,
  onPerPageChange,
  onViewDonation,
}: HeroDetailHistoryTableProps) {
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalCount);

  const columns = React.useMemo<Array<ColumnDef<HeroDonationHistoryRecord>>>(
    () => [
      {
        id: "date",
        accessorKey: "dateIso",
        header: "Tanggal",
        meta: {
          className: "w-[200px]",
          sort: sortDirection,
          onSort: onSortToggle,
        },
        cell: ({ row }) => (
          <div className="flex flex-col min-w-0">
            <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#142023] truncate">
              {row.original.dateLabel}
            </span>
            <span className="font-['Inter'] font-normal text-[12px] leading-[16px] text-[#4d585b] truncate">
              {row.original.dayLabel}
            </span>
          </div>
        ),
      },
      {
        id: "donorName",
        accessorKey: "donorName",
        header: "Sponsor",
        meta: {
          className: "min-w-[180px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#142023] truncate">
            {row.original.donorName}
          </span>
        ),
      },
      {
        id: "locationName",
        accessorKey: "locationName",
        header: "Lokasi",
        meta: {
          className: "w-[230px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-[#142023] truncate">
            {row.original.locationName}
          </span>
        ),
      },
      {
        id: "portionsAndWeight",
        header: "Porsi & Bobot",
        meta: {
          className: "w-[150px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-[#142023] whitespace-nowrap">
            {row.original.portions} Porsi (
            {formatHeroCount(row.original.weightGrams)} gr)
          </span>
        ),
      },
      {
        id: "claimCode",
        accessorKey: "claimCode",
        header: "Kode Klaim",
        meta: {
          className: "w-[120px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-[#142023] whitespace-nowrap">
            {row.original.claimCode}
          </span>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        meta: {
          className: "w-[130px]",
        },
        cell: ({ row }) => {
          const statusMeta = HISTORY_STATUS_BADGE[row.original.status];
          return (
            <Badge tone={statusMeta.tone} styleVariant="soft" dot>
              {statusMeta.label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          align: "right",
          className: "w-[72px] text-right",
        },
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <IconButton
              variant="ghost"
              size="sm"
              tooltip="Lihat detail donasi"
              aria-label={`Lihat detail donasi ${row.original.donorName}`}
              onClick={() => onViewDonation?.(row.original)}
            >
              <Eye className="size-[18px]" />
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
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs w-full overflow-hidden">
      {/* Header Kartu Tabel */}
      <div className="p-5 flex items-center justify-between gap-3 w-full">
        <h2 className="font-['Gabarito'] font-semibold text-[18px] leading-[24px] text-[#142023]">
          Riwayat Donasi Yang Diterima
        </h2>
        <Badge tone="neutral" styleVariant="soft">
          {formatHeroCount(totalCount)} aksi
        </Badge>
      </div>

      {totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-10 w-full">
          <EmptyState
            title="Belum ada riwayat"
            description="Hero ini belum memiliki riwayat pengambilan donasi."
            visual="illustration"
            illustration={
              <IllustrationSantaiKosong
                className="size-[200px]"
                alt="Ilustrasi belum ada riwayat"
              />
            }
          />
        </div>
      ) : (
        <>
          {/* Tampilan Tabel Desktop */}
          <div className="hidden md:block overflow-x-auto w-full">
            <Table
              containerClassName="border-none shadow-none rounded-none"
              className="border-none shadow-none rounded-none w-full min-w-[960px]"
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
          <div className="md:hidden divide-y divide-neutral-200 border-t border-neutral-200">
            {data.map((record) => {
              const statusMeta = HISTORY_STATUS_BADGE[record.status];
              return (
                <div key={record.id} className="p-4 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-['Inter'] font-semibold text-[14px] text-[#142023]">
                        {record.donorName}
                      </p>
                      <p className="font-['Inter'] text-[12px] text-[#4d585b]">
                        {record.dateLabel} · {record.dayLabel}
                      </p>
                    </div>
                    <Badge tone={statusMeta.tone} styleVariant="soft" dot>
                      {statusMeta.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-[12px] text-[#4d585b]">
                    <span className="truncate">{record.locationName}</span>
                    <span className="font-medium text-[#142023] shrink-0">
                      {record.portions} Porsi (
                      {formatHeroCount(record.weightGrams)} gr)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="font-['Inter'] text-[12px] font-medium text-[#4d585b]">
                      Kode: {record.claimCode}
                    </span>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      tooltip="Lihat detail donasi"
                      aria-label={`Lihat detail donasi ${record.donorName}`}
                      onClick={() => onViewDonation?.(record)}
                    >
                      <Eye className="size-[18px]" />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Paginasi */}
          <TableFooter>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              perPage={perPage}
              onPerPageChange={onPerPageChange}
              perPageOptions={HERO_DETAIL_PER_PAGE_OPTIONS}
              rangeText={`${formatHeroCount(startRange)} - ${formatHeroCount(endRange)} dari ${formatHeroCount(totalCount)}`}
            />
          </TableFooter>
        </>
      )}
    </div>
  );
}
