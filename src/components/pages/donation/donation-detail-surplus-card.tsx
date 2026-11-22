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
import { idDonation } from "#/locales";
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
        header: idDonation.detail.surplusCard.columnFoodName,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans font-semibold text-sm text-neutral-900">
                {item.name}
              </span>
              {item.isSpoiled && (
                <Badge tone="danger" styleVariant="soft" dot>
                  {idDonation.detail.surplusCard.badgeSpoiled}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: idDonation.detail.surplusCard.columnQuantity,
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
        header: idDonation.detail.surplusCard.columnWeight,
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
        header: idDonation.detail.surplusCard.columnNotes,
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
        header: idDonation.detail.surplusCard.columnAction,
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
                tooltip={idDonation.detail.surplusCard.editTooltip}
                onClick={() => onEditFood(item)}
              >
                <Pencil className="size-[18px]" />
              </IconButton>
              <IconButton
                type="button"
                variant="danger"
                size="sm"
                aria-label={`Hapus ${item.name}`}
                tooltip={idDonation.detail.surplusCard.deleteTooltip}
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
            {idDonation.detail.surplusCard.title}
          </h2>
          <Badge tone="neutral" styleVariant="soft">
            {foods.length} {idDonation.detail.surplusCard.typesUnit}
          </Badge>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="size-4" />}
          onClick={onAddFood}
        >
          {idDonation.detail.surplusCard.addFoodButton}
        </Button>
      </div>

      {/* Konten Surplus Food */}
      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 w-full text-center">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationCariKosong />}
            title={idDonation.detail.surplusCard.emptyTitle}
            description={idDonation.detail.surplusCard.emptyDesc}
            className="max-w-[380px] p-4"
          />
        </div>
      ) : (
        <>
          {/* Tabel dengan Scroll Horizontal pada Layar Kecil */}
          <div className="w-full overflow-x-auto">
            <Table
              containerClassName="rounded-none border-0 shadow-none"
              className="min-w-[650px]"
            >
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
        </>
      )}
    </section>
  );
}
