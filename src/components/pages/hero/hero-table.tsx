import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Pencil, Search, Trash2 } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Badge } from "#/components/ui/badge";
import { Button, getButtonClasses } from "#/components/ui/button";
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
import { EntityIdentity } from "#/components/shared/entity-identity";
import { Pagination } from "#/components/shared/pagination";
import { WhatsappLink } from "#/components/shared/whatsapp-link";
import { getHeroAvatarSrc } from "#/lib/avatars";
import { formatHeroCount } from "./hero-data";
import type { HeroRecord, HeroUserRole } from "./hero-data";

export interface HeroTableProps {
  data: HeroRecord[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onViewDetail?: (hero: HeroRecord) => void;
  onEditHero?: (hero: HeroRecord) => void;
  onDeleteHero?: (hero: HeroRecord) => void;
  userRole?: HeroUserRole;
}

const HERO_STATUS_BADGE = {
  aktif: {
    label: "Aktif",
    tone: "success" as const,
  },
  diblokir: {
    label: "Diblokir",
    tone: "danger" as const,
  },
};

// Identitas hero lengkap dengan foto profil, nama, dan nomor telepon
function HeroIdentity({ hero }: { hero: HeroRecord }) {
  return (
    <EntityIdentity
      entityType="hero"
      name={hero.name}
      subtitle={hero.phone ? <WhatsappLink phone={hero.phone} /> : undefined}
      avatarSrc={getHeroAvatarSrc(hero)}
    />
  );
}

/**
 * HeroTable: Tabel daftar hero dengan arsitektur Data-Driven menggunakan TanStack Table serta tampilan kartu responsif di mobile.
 */
export function HeroTable({
  data,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  hasActiveFilters,
  onResetFilters,
  onViewDetail,
  onEditHero,
  onDeleteHero,
  userRole = "super_admin",
}: HeroTableProps) {
  const canDeleteRole = userRole === "super_admin" || userRole === "core";
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalCount);

  // Definisi kolom tabel Data-Driven
  const columns = React.useMemo<Array<ColumnDef<HeroRecord>>>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Nama Hero",
        meta: {
          className: "min-w-[240px]",
        },
        cell: ({ row }) => <HeroIdentity hero={row.original} />,
      },
      {
        id: "sectorBeneficiary",
        accessorKey: "sectorName",
        header: "Sektor / Beneficiary",
        meta: {
          className: "w-[300px] min-w-[240px]",
        },
        cell: ({ row }) => {
          const hero = row.original;
          return (
            <div className="flex flex-col min-w-0">
              <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-neutral-900 truncate">
                {hero.sectorName}
              </span>
              <span className="font-['Inter'] font-normal text-[12px] leading-[16px] text-neutral-600 truncate">
                {hero.beneficiaryName}
              </span>
            </div>
          );
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        meta: {
          className: "w-[130px]",
        },
        cell: ({ row }) => {
          const statusMeta = HERO_STATUS_BADGE[row.original.status];
          return (
            <Badge tone={statusMeta.tone} styleVariant="soft" dot>
              {statusMeta.label}
            </Badge>
          );
        },
      },
      {
        id: "actionCount",
        accessorKey: "actionCount",
        header: "Jumlah Aksi",
        meta: {
          className: "w-[130px]",
        },
        cell: ({ row }) => (
          <span className="font-['Inter'] font-normal text-[14px] leading-[20px] text-neutral-900 whitespace-nowrap">
            {formatHeroCount(row.original.actionCount)} Aksi
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
          const hero = row.original;
          return (
            <div className="flex items-center justify-end gap-2">
              <Link
                to="/admin/hero/detail"
                search={{ id: hero.id }}
                className={getButtonClasses({
                  variant: "secondary",
                  size: "sm",
                })}
              >
                <Search className="size-4" />
                Detail
              </Link>
              <IconButton
                variant="secondary"
                size="sm"
                tooltip="Edit data hero"
                aria-label={`Edit data ${hero.name}`}
                onClick={() => onEditHero?.(hero)}
              >
                <Pencil className="size-[18px]" />
              </IconButton>
              {canDeleteRole && (
                <IconButton
                  variant="danger"
                  size="sm"
                  tooltip="Hapus hero"
                  aria-label={`Hapus ${hero.name}`}
                  className="bg-white border-neutral-300 hover:border-red-300"
                  onClick={() => onDeleteHero?.(hero)}
                >
                  <Trash2 className="size-[18px]" />
                </IconButton>
              )}
            </div>
          );
        },
      },
    ],
    [canDeleteRole, onViewDetail, onEditHero, onDeleteHero],
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl flex flex-col shadow-xs w-full overflow-hidden">
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
          {data.map((hero) => {
            const statusMeta = HERO_STATUS_BADGE[hero.status];
            return (
              <div key={hero.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <HeroIdentity hero={hero} />
                  </div>
                  <Badge tone={statusMeta.tone} styleVariant="soft" dot>
                    {statusMeta.label}
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-3 text-[12px]">
                  <div className="min-w-0">
                    <p className="font-['Inter'] font-semibold text-neutral-900 truncate">
                      {hero.sectorName}
                    </p>
                    <p className="font-['Inter'] text-neutral-600 truncate">
                      {hero.beneficiaryName}
                    </p>
                  </div>
                  <span className="font-['Inter'] font-medium text-neutral-900 shrink-0">
                    {formatHeroCount(hero.actionCount)} Aksi
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Link
                    to="/admin/hero/detail"
                    search={{ id: hero.id }}
                    className={getButtonClasses({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    <Search className="size-4" />
                    Detail
                  </Link>
                  <IconButton
                    variant="secondary"
                    size="sm"
                    tooltip="Edit data hero"
                    aria-label={`Edit data ${hero.name}`}
                    onClick={() => onEditHero?.(hero)}
                  >
                    <Pencil className="size-[18px]" />
                  </IconButton>
                  {canDeleteRole && (
                    <IconButton
                      variant="danger"
                      size="sm"
                      tooltip="Hapus hero"
                      aria-label={`Hapus ${hero.name}`}
                      className="bg-white border-neutral-300 hover:border-red-300"
                      onClick={() => onDeleteHero?.(hero)}
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
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 w-full">
          <EmptyState
            title="Hero tidak ditemukan"
            description="Tidak ada hero yang sesuai dengan kata kunci pencarian atau filter."
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
            rangeText={`Menampilkan ${formatHeroCount(startRange)} - ${formatHeroCount(endRange)} dari ${formatHeroCount(totalCount)} hero`}
          />
        </TableFooter>
      )}
    </div>
  );
}
