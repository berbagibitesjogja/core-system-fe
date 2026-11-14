import * as React from "react";
import { Link } from "@tanstack/react-router";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { ArrowDown, Pencil, Search, Trash2 } from "lucide-react";
import {
  EmptyState,
  IllustrationCariKosong,
} from "#/components/shared/empty-state";
import { EntityIdentity } from "#/components/shared/entity-identity";
import { Pagination } from "#/components/shared/pagination";
import { ProgressBar } from "#/components/shared/progress-bar";
import { Button, getButtonClasses } from "#/components/ui/button";
import { IconButton, getIconButtonClasses } from "#/components/ui/icon-button";
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
import { getPartnerAvatarSrc } from "#/lib/avatars";
import { cn } from "#/lib/utils";
import { calculatePartnerProgress, formatPartnerNumber } from "./partner-data";
import type { PartnerRecord, PartnerUserRole } from "./partner-data";

export interface PartnerTableProps {
  data: PartnerRecord[];
  totalCount: number;
  maxDonationCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  sortDirection: "desc" | "asc";
  onToggleSort: () => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onViewDetail?: (partner: PartnerRecord) => void;
  onEditPartner?: (partner: PartnerRecord) => void;
  onDeletePartner?: (partner: PartnerRecord) => void;
  userRole?: PartnerUserRole;
}

/**
 * PartnerTable: Tabel daftar mitra donatur dengan kolom progres kontribusi dan tampilan kartu mobile.
 */
export function PartnerTable({
  data,
  totalCount,
  maxDonationCount,
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  sortDirection,
  onToggleSort,
  hasActiveFilters,
  onResetFilters,
  onViewDetail,
  onEditPartner,
  onDeletePartner,
  userRole = "super_admin",
}: PartnerTableProps) {
  const canDeleteRole = userRole === "super_admin" || userRole === "core";
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalCount);

  // Definisi kolom tabel Data-Driven
  const columns = React.useMemo<Array<ColumnDef<PartnerRecord>>>(
    () => [
      {
        id: "rank",
        header: "#",
        meta: {
          className: "w-[56px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-neutral-900">
            {(currentPage - 1) * perPage + row.index + 1}
          </span>
        ),
      },
      {
        id: "donor",
        accessorKey: "name",
        header: "Donatur",
        meta: {
          className: "min-w-[220px]",
        },
        cell: ({ row }) => {
          const partner = row.original;
          return (
            <EntityIdentity
              entityType="partner"
              name={partner.name}
              subtitle={partner.type}
              avatarSrc={getPartnerAvatarSrc(partner)}
            />
          );
        },
      },
      {
        id: "donationCount",
        accessorKey: "donationCount",
        header: () => (
          <Tooltip
            content={
              sortDirection === "desc"
                ? "Urutkan donasi paling sedikit"
                : "Urutkan donasi paling banyak"
            }
            placement="top"
          >
            <button
              type="button"
              onClick={onToggleSort}
              className="inline-flex items-center gap-1 font-bold text-[11px] leading-[16px] tracking-[0.66px] uppercase text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label={
                sortDirection === "desc"
                  ? "Urutkan donasi paling sedikit"
                  : "Urutkan donasi paling banyak"
              }
            >
              <span>Donasi</span>
              <ArrowDown
                className={cn(
                  "size-3.5 transition-transform duration-150",
                  sortDirection === "asc" && "rotate-180",
                )}
              />
            </button>
          </Tooltip>
        ),
        meta: {
          className: "w-[190px]",
        },
        cell: ({ row }) => {
          const partner = row.original;
          const progress = calculatePartnerProgress(
            partner.donationCount,
            maxDonationCount,
          );
          return (
            <div className="flex items-center gap-3 w-full">
              <span className="w-[64px] shrink-0 font-['Inter'] font-normal text-[14px] leading-[20px] text-neutral-900 whitespace-nowrap">
                {formatPartnerNumber(partner.donationCount)} Aksi
              </span>
              <ProgressBar value={progress} className="flex-1 min-w-0" />
            </div>
          );
        },
      },
      {
        id: "impactKg",
        accessorKey: "impactKg",
        header: "Impact",
        meta: {
          className: "w-[110px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-neutral-900 whitespace-nowrap">
            {formatPartnerNumber(row.original.impactKg)} Kg
          </span>
        ),
      },
      {
        id: "lastDonationDate",
        accessorKey: "lastDonationDate",
        header: "Terakhir Donasi",
        meta: {
          className: "w-[140px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-neutral-900 whitespace-nowrap">
            {row.original.lastDonationDate}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          align: "right",
          className: "w-[224px] text-right",
        },
        cell: ({ row }) => {
          const partner = row.original;
          return (
            <div className="flex items-center justify-end gap-2">
              <Link
                to="/admin/partner/detail"
                search={{ id: partner.id }}
                className={getButtonClasses({
                  variant: "secondary",
                  size: "sm",
                })}
              >
                <Search className="size-4" />
                Detail
              </Link>
              <Tooltip content="Edit data donatur" placement="top">
                <Link
                  to="/admin/partner/edit"
                  search={{ id: partner.id }}
                  aria-label={`Edit data ${partner.name}`}
                  className={getIconButtonClasses({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  <Pencil className="size-[18px]" />
                </Link>
              </Tooltip>
              {canDeleteRole && (
                <IconButton
                  variant="danger"
                  size="sm"
                  tooltip="Hapus donatur"
                  aria-label={`Hapus ${partner.name}`}
                  className="bg-white border-neutral-300 hover:border-red-300"
                  onClick={() => onDeletePartner?.(partner)}
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
      currentPage,
      perPage,
      sortDirection,
      onToggleSort,
      maxDonationCount,
      canDeleteRole,
      onViewDetail,
      onEditPartner,
      onDeletePartner,
    ],
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-lg flex flex-col shadow-xs w-full overflow-hidden">
      {/* Tampilan Tabel Desktop */}
      <div className="hidden md:block overflow-x-auto w-full">
        <Table
          containerClassName="border-none shadow-none rounded-none"
          className="border-none shadow-none rounded-none w-full min-w-[880px]"
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

      {/* Tampilan Kartu Tumpuk Mobile (<768px) */}
      {data.length > 0 && (
        <div className="md:hidden divide-y divide-neutral-200">
          {data.map((partner, index) => {
            const progress = calculatePartnerProgress(
              partner.donationCount,
              maxDonationCount,
            );
            return (
              <div key={partner.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <EntityIdentity
                    entityType="partner"
                    name={partner.name}
                    subtitle={partner.type}
                    avatarSrc={getPartnerAvatarSrc(partner)}
                    className="flex-1"
                  />
                  <span className="font-['Inter'] text-[12px] text-neutral-500 shrink-0">
                    #{(currentPage - 1) * perPage + index + 1}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-[12px]">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-['Inter'] font-medium text-neutral-900 shrink-0">
                      {formatPartnerNumber(partner.donationCount)} Aksi
                    </span>
                    <ProgressBar value={progress} className="max-w-[120px]" />
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 shrink-0">
                    <span>{formatPartnerNumber(partner.impactKg)} Kg</span>
                    <span>·</span>
                    <span>{partner.lastDonationDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Link
                    to="/admin/partner/detail"
                    search={{ id: partner.id }}
                    className={getButtonClasses({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    <Search className="size-4" />
                    Detail
                  </Link>
                  <Tooltip content="Edit data donatur" placement="top">
                    <Link
                      to="/admin/partner/edit"
                      search={{ id: partner.id }}
                      aria-label={`Edit data ${partner.name}`}
                      className={getIconButtonClasses({
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      <Pencil className="size-[18px]" />
                    </Link>
                  </Tooltip>
                  {canDeleteRole && (
                    <IconButton
                      variant="danger"
                      size="sm"
                      tooltip="Hapus donatur"
                      aria-label={`Hapus ${partner.name}`}
                      className="bg-white border-neutral-300 hover:border-red-300"
                      onClick={() => onDeletePartner?.(partner)}
                    >
                      <Trash2 className="size-[18px]" />
                    </IconButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tampilan Kondisi Kosong Pencarian / Filter */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 sm:p-10 w-full">
          <EmptyState
            title="Donatur tidak ditemukan"
            description="Tidak ada donatur yang cocok dengan kata kunci pencarian."
            illustration={<IllustrationCariKosong className="size-[200px]" />}
            visual="illustration"
            action={
              hasActiveFilters ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onResetFilters}
                  className="shadow-2xs"
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
            rangeText={`${formatPartnerNumber(startRange)} - ${formatPartnerNumber(endRange)} dari ${formatPartnerNumber(totalCount)}`}
          />
        </TableFooter>
      )}
    </div>
  );
}
