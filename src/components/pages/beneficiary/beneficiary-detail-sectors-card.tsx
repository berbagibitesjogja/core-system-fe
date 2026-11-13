import * as React from "react";
import { Eye, Plus } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
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
import { cn } from "#/lib/utils";
import type { BeneficiarySectorRecord } from "./beneficiary-detail-data";

export interface BeneficiaryDetailSectorsCardProps {
  beneficiaryName: string;
  sectors: BeneficiarySectorRecord[];
  onOpenAddSector: () => void;
  onViewSector: (sector: BeneficiarySectorRecord) => void;
}

/**
 * BeneficiaryDetailSectorsCard: Panel kanan daftar persebaran sektor/unit penerima manfaat.
 * Menyediakan aksi tambah sektor dan menyorot baris sektor yang baru ditambahkan.
 */
export function BeneficiaryDetailSectorsCard({
  beneficiaryName,
  sectors,
  onOpenAddSector,
  onViewSector,
}: BeneficiaryDetailSectorsCardProps) {
  // Definisi kolom Data-Driven untuk tabel persebaran sektor
  const columns = React.useMemo<Array<ColumnDef<BeneficiarySectorRecord>>>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Nama",
        cell: ({ row }) => (
          <span
            className="block max-w-[175px] truncate font-sans font-medium text-sm text-neutral-900"
            title={row.original.name}
          >
            {row.original.name}
          </span>
        ),
      },
      {
        id: "count",
        accessorKey: "heroesCount",
        header: "Jumlah",
        cell: ({ row }) => (
          <span className="font-sans text-sm text-neutral-900">
            {row.original.heroesCount.toLocaleString("id-ID")} Orang
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          className: "w-[68px]",
          align: "right",
        },
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <IconButton
              variant="ghost"
              size="sm"
              tooltip={`Lihat detail sektor ${row.original.name}`}
              aria-label={`Lihat detail sektor ${row.original.name}`}
              onClick={() => onViewSector(row.original)}
              className="text-neutral-700 hover:bg-neutral-100"
            >
              <Eye />
            </IconButton>
          </div>
        ),
      },
    ],
    [onViewSector],
  );

  const table = useReactTable({
    data: sectors,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <aside
      aria-label={`Persebaran Di ${beneficiaryName}`}
      className="w-full xl:w-[400px] shrink-0 rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden"
    >
      {/* Header Kartu Persebaran Sektor */}
      <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between gap-3">
        <h2 className="font-['Gabarito'] text-base font-semibold leading-6 text-neutral-900 min-w-0 truncate">
          Persebaran Di {beneficiaryName}
        </h2>
        <Button
          variant="accent"
          size="sm"
          leftIcon={<Plus className="size-4" />}
          onClick={onOpenAddSector}
          className="shrink-0"
        >
          Tambah Sektor
        </Button>
      </div>

      {/* State Kosong Belum Ada Sektor */}
      {sectors.length === 0 ? (
        <div className="flex items-center justify-center px-6 py-10">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationCariKosong />}
            title="Belum ada sektor"
            description="Belum ada sektor/persebaran yang terdaftar untuk penerima manfaat ini."
            className="max-w-[340px] p-4"
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
                {table.getRowModel().rows.map((row) => {
                  const isNew = Boolean(row.original.isNew);
                  return (
                    <TableRow
                      key={row.id}
                      className={cn(
                        isNew &&
                          "bg-bondi-50 hover:bg-bondi-50/90 transition-colors duration-200 motion-reduce:transition-none",
                      )}
                    >
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
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Tampilan Kartu Tumpuk Mobile (<768px) */}
          <div className="md:hidden divide-y divide-neutral-100">
            {sectors.map((sector) => (
              <div
                key={sector.id}
                className={cn(
                  "p-4 flex items-center justify-between gap-3",
                  sector.isNew && "bg-bondi-50",
                )}
              >
                <div className="min-w-0 space-y-0.5">
                  <p className="font-sans font-medium text-sm text-neutral-900 truncate">
                    {sector.name}
                  </p>
                  <p className="font-sans text-xs text-neutral-600">
                    {sector.heroesCount.toLocaleString("id-ID")} Orang
                  </p>
                </div>

                <IconButton
                  variant="ghost"
                  size="sm"
                  tooltip={`Lihat detail sektor ${sector.name}`}
                  aria-label={`Lihat detail sektor ${sector.name}`}
                  onClick={() => onViewSector(sector)}
                  className="shrink-0 text-neutral-700 hover:bg-neutral-100"
                >
                  <Eye />
                </IconButton>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
