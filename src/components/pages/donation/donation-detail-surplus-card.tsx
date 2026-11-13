import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { cn } from "#/lib/utils";
import type { DonationSurplusFoodItem } from "./donation-detail-data";

export interface DonationDetailSurplusCardProps {
  foods: DonationSurplusFoodItem[];
  onAddFood: () => void;
  onEditFood: (food: DonationSurplusFoodItem) => void;
  onDeleteFood: (food: DonationSurplusFoodItem) => void;
}

/**
 * DonationDetailSurplusCard: Menampilkan daftar makanan surplus beserta status basi/tidak layak dan aksi kelola.
 */
export function DonationDetailSurplusCard({
  foods,
  onAddFood,
  onEditFood,
  onDeleteFood,
}: DonationDetailSurplusCardProps) {
  // Definisi kolom tabel Data-Driven (TanStack Table ColumnDef)
  const columns = React.useMemo<Array<ColumnDef<DonationSurplusFoodItem>>>(
    () => [
      {
        id: "rank",
        header: "#",
        meta: {
          className: "w-[56px]",
        },
        cell: ({ row }) => (
          <span className="font-sans font-normal text-sm leading-5 text-neutral-900 tabular-nums">
            {row.index + 1}
          </span>
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Nama Makanan",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans font-semibold text-sm text-neutral-900">
                {item.name}
              </span>
              {item.isSpoiled && (
                <Badge tone="danger" styleVariant="soft" dot>
                  Basi / Tidak Layak
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Jumlah",
        cell: ({ row }) => (
          <span className="font-sans text-sm text-neutral-600 tabular-nums">
            {row.original.quantity !== undefined
              ? `${row.original.quantity} pcs`
              : "-"}
          </span>
        ),
      },
      {
        id: "weight",
        accessorKey: "weight",
        header: "Berat",
        meta: {
          className: "whitespace-nowrap",
        },
        cell: ({ row }) => (
          <span className="font-sans font-medium text-sm text-neutral-900 tabular-nums">
            {row.original.weight.toLocaleString("id-ID")} {row.original.unit}
          </span>
        ),
      },
      {
        id: "notes",
        accessorKey: "notes",
        header: "Keterangan",
        meta: {
          className: "max-w-[260px]",
        },
        cell: ({ row }) => (
          <span className="font-sans text-sm text-neutral-600 line-clamp-2">
            {row.original.notes?.trim() ? row.original.notes : "-"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          align: "right",
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Edit ${item.name}`}
                tooltip="Edit makanan"
                onClick={() => onEditFood(item)}
              >
                <Pencil className="size-[18px]" />
              </IconButton>
              <IconButton
                type="button"
                variant="danger"
                size="sm"
                aria-label={`Hapus ${item.name}`}
                tooltip="Hapus makanan"
                onClick={() => onDeleteFood(item)}
              >
                <Trash2 className="size-[18px]" />
              </IconButton>
            </div>
          );
        },
      },
    ],
    [onEditFood, onDeleteFood],
  );

  const table = useReactTable({
    data: foods,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
      {/* Header Kartu Daftar Surplus Food */}
      <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
            Daftar Surplus Food
          </h2>
          <Badge tone="neutral" styleVariant="soft">
            {foods.length} jenis
          </Badge>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="size-4" />}
          onClick={onAddFood}
        >
          Tambah Makanan
        </Button>
      </div>

      {/* Konten Surplus Food */}
      {foods.length === 0 ? (
        <div className="flex items-center justify-center px-6 py-10">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationCariKosong />}
            title="Belum ada surplus food"
            description="Catat jenis makanan, jumlah, serta berat surplus yang diselamatkan pada aksi donasi ini."
            className="max-w-[380px] p-4"
          />
        </div>
      ) : (
        <>
          {/* Tabel Desktop */}
          <div className="hidden md:block">
            <Table containerClassName="rounded-none border-0 shadow-none">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
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

          {/* Kartu Mobile */}
          <div className="md:hidden divide-y divide-neutral-100">
            {foods.map((item) => (
              <div key={item.id} className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-sans font-semibold text-sm text-neutral-900">
                        {item.name}
                      </p>
                      {item.isSpoiled && (
                        <Badge tone="danger" styleVariant="soft" dot>
                          Basi / Tidak Layak
                        </Badge>
                      )}
                    </div>
                    <p className="font-sans text-xs text-neutral-500 tabular-nums">
                      {item.quantity !== undefined
                        ? `${item.quantity} pcs · `
                        : ""}
                      {item.weight.toLocaleString("id-ID")} {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Edit ${item.name}`}
                      tooltip="Edit makanan"
                      onClick={() => onEditFood(item)}
                    >
                      <Pencil className="size-[18px]" />
                    </IconButton>
                    <IconButton
                      type="button"
                      variant="danger"
                      size="sm"
                      aria-label={`Hapus ${item.name}`}
                      tooltip="Hapus makanan"
                      onClick={() => onDeleteFood(item)}
                    >
                      <Trash2 className="size-[18px]" />
                    </IconButton>
                  </div>
                </div>

                {item.notes?.trim() && (
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
