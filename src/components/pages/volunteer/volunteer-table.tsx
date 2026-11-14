import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Search, Trash2 } from "lucide-react";
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
import { getPresetAvatarSrc } from "#/lib/avatars";
import {
  formatVolunteerCount,
  VOLUNTEER_DIVISION_BADGE_TONE,
} from "./volunteer-data";
import type { VolunteerRecord, VolunteerUserRole } from "./volunteer-data";

export interface VolunteerTableProps {
  data: VolunteerRecord[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onViewDetail?: (volunteer: VolunteerRecord) => void;
  onDeleteVolunteer?: (volunteer: VolunteerRecord) => void;
  userRole?: VolunteerUserRole;
}

// Identitas volunteer dengan foto profil, nama, dan tautan WhatsApp
function VolunteerIdentity({ volunteer }: { volunteer: VolunteerRecord }) {
  return (
    <EntityIdentity
      entityType="volunteer"
      name={volunteer.name}
      avatarSrc={getPresetAvatarSrc(volunteer.name)}
      subtitle={<WhatsappLink phone={volunteer.phone} />}
    />
  );
}

/**
 * VolunteerTable: Tabel daftar anggota tim dan relawan BBJ dengan dukungan filter role (Super/Core vs Staff) sesuai Figma 149:19230 & 149:20257.
 */
export function VolunteerTable({
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
  onDeleteVolunteer,
  userRole = "super_admin",
}: VolunteerTableProps) {
  const canDeleteRole = userRole === "super_admin" || userRole === "core";
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRange = Math.min(currentPage * perPage, totalCount);

  // Definisi kolom tabel Data-Driven
  const columns = React.useMemo<Array<ColumnDef<VolunteerRecord>>>(
    () => [
      {
        id: "nameAndContact",
        accessorKey: "name",
        header: "Nama & Kontak",
        meta: {
          className: "min-w-[240px]",
        },
        cell: ({ row }) => <VolunteerIdentity volunteer={row.original} />,
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
        meta: {
          className: "w-[280px]",
        },
        cell: ({ row }) => (
          <span className="font-sans text-sm font-normal leading-5 text-neutral-900">
            {row.original.email}
          </span>
        ),
      },
      {
        id: "divisionAndRole",
        accessorKey: "division",
        header: "Divisi & Role",
        meta: {
          className: "w-[230px]",
        },
        cell: ({ row }) => {
          const volunteer = row.original;
          const badgeTone = VOLUNTEER_DIVISION_BADGE_TONE[volunteer.division];
          return (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Badge tone={badgeTone} styleVariant="soft" dot={false}>
                {volunteer.division}
              </Badge>
              <span className="font-body text-xs font-normal leading-4 text-neutral-500">
                ({volunteer.role})
              </span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          align: "right",
          className: "w-[150px] text-right",
        },
        cell: ({ row }) => {
          const volunteer = row.original;
          return (
            <div className="flex items-center justify-end gap-2">
              <Link
                to="/admin/volunteer/detail"
                search={{ id: volunteer.id }}
                className={getButtonClasses({
                  variant: "secondary",
                  size: "sm",
                })}
              >
                <Search className="size-4" />
                Detail
              </Link>
              {canDeleteRole && (
                <IconButton
                  variant="danger"
                  size="sm"
                  tooltip="Hapus volunteer"
                  aria-label={`Hapus ${volunteer.name}`}
                  className="bg-surface border-neutral-300 hover:border-red-300"
                  onClick={() => onDeleteVolunteer?.(volunteer)}
                >
                  <Trash2 className="size-[18px]" />
                </IconButton>
              )}
            </div>
          );
        },
      },
    ],
    [canDeleteRole, onViewDetail, onDeleteVolunteer],
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-surface border border-neutral-200 rounded-lg flex flex-col shadow-xs w-full overflow-hidden">
      {/* Tampilan Tabel dengan Scroll Horizontal pada Layar Kecil */}
      <div className="overflow-x-auto w-full">
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

      {/* Tampilan Kondisi Kosong Pencarian / Filter */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 w-full">
          <EmptyState
            title="Volunteer tidak ditemukan"
            description="Tidak ada volunteer yang sesuai dengan kata kunci pencarian atau filter divisi."
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
                  Hapus filter
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
            rangeText={`Menampilkan ${formatVolunteerCount(startRange)} - ${formatVolunteerCount(endRange)} dari ${formatVolunteerCount(totalCount)} volunteer`}
          />
        </TableFooter>
      )}
    </div>
  );
}
