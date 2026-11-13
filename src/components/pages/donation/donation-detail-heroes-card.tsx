import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef as ColumnDef } from "@tanstack/react-table/legacy";
import { Plus, Search, Trash2, X } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { IconButton } from "#/components/ui/icon-button";
import { Input } from "#/components/ui/input";
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
  IllustrationSantaiKosong,
} from "#/components/shared/empty-state";
import { EntityIdentity } from "#/components/shared/entity-identity";
import { getHeroAvatarSrc } from "#/lib/avatars";
import { cn } from "#/lib/utils";
import { calculateHeroesQuotaSummary } from "./donation-detail-data";
import type {
  DonationHeroClaimRecord,
  DonationHeroSearchOption,
} from "./donation-detail-data";

export interface DonationDetailHeroesCardProps {
  heroes: DonationHeroClaimRecord[];
  quotaTotal: number;
  searchableHeroes: DonationHeroSearchOption[];
  onAddHero: (candidate: DonationHeroSearchOption) => void;
  onConfirmPickup: (hero: DonationHeroClaimRecord) => void;
  onRemoveHero: (hero: DonationHeroClaimRecord) => void;
}

const INITIAL_VISIBLE_HEROES = 6;

/**
 * DonationDetailHeroesCard: Menampilkan daftar heroes klaim, dropdown tambah heroes, konfirmasi pengambilan, dan keluarkan hero.
 */
export function DonationDetailHeroesCard({
  heroes,
  quotaTotal,
  searchableHeroes,
  onAddHero,
  onConfirmPickup,
  onRemoveHero,
}: DonationDetailHeroesCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const popoverWrapperRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const heroesSummary = React.useMemo(
    () => calculateHeroesQuotaSummary(heroes, quotaTotal),
    [heroes, quotaTotal],
  );
  const isQuotaFull = heroesSummary.isQuotaFull;

  const visibleHeroes =
    isExpanded || heroes.length <= INITIAL_VISIBLE_HEROES
      ? heroes
      : heroes.slice(0, INITIAL_VISIBLE_HEROES);
  const hiddenCount = Math.max(0, heroes.length - INITIAL_VISIBLE_HEROES);

  // Tutup popover saat klik di luar atau tekan Escape
  React.useEffect(() => {
    if (!isAddOpen) return;

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 30);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverWrapperRef.current &&
        !popoverWrapperRef.current.contains(event.target as Node)
      ) {
        setIsAddOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAddOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isAddOpen]);

  const registeredNamesSet = React.useMemo(
    () => new Set(heroes.map((h) => h.name.toLowerCase())),
    [heroes],
  );

  const filteredCandidates = React.useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return searchableHeroes;
    return searchableHeroes.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.sectorName.toLowerCase().includes(query) ||
        item.beneficiaryName.toLowerCase().includes(query),
    );
  }, [searchableHeroes, searchTerm]);

  const renderHeroActionButtons = React.useCallback(
    (hero: DonationHeroClaimRecord) => {
      if (hero.status === "tidak-jadi-ambil") {
        return (
          <div className="flex items-center justify-end gap-2">
            <Badge tone="danger" styleVariant="soft">
              Tidak Jadi Ambil
            </Badge>
          </div>
        );
      }

      const isPickedUp = hero.status === "sudah-diambil";
      return (
        <div className="flex items-center justify-end gap-2">
          {isPickedUp ? (
            <Badge tone="success" styleVariant="soft">
              Sudah Diambil
            </Badge>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => onConfirmPickup(hero)}
            >
              Konfirmasi Ambil
            </Button>
          )}
          <IconButton
            type="button"
            variant="danger"
            size="sm"
            aria-label={
              isPickedUp
                ? `Keluarkan ${hero.name} (kuota hangus)`
                : `Keluarkan ${hero.name} dari donasi`
            }
            tooltip={
              isPickedUp
                ? "Keluarkan hero (kuota hangus)"
                : "Keluarkan hero dari donasi"
            }
            onClick={() => onRemoveHero(hero)}
          >
            <Trash2 className="size-[18px]" />
          </IconButton>
        </div>
      );
    },
    [onConfirmPickup, onRemoveHero],
  );

  // Definisi kolom tabel Data-Driven (TanStack Table ColumnDef)
  const columns = React.useMemo<Array<ColumnDef<DonationHeroClaimRecord>>>(
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
        header: "Nama",
        cell: ({ row }) => {
          const hero = row.original;
          const isForfeited = hero.status === "tidak-jadi-ambil";
          return (
            <EntityIdentity
              entityType="hero"
              name={hero.name}
              avatarSrc={
                hero.avatarSrc ??
                getHeroAvatarSrc({ id: hero.heroId, name: hero.name })
              }
              strikethrough={isForfeited}
            />
          );
        },
      },
      {
        id: "origin",
        accessorKey: "sectorName",
        header: "Asal",
        cell: ({ row }) => {
          const hero = row.original;
          return (
            <div className="flex flex-col items-start min-w-0">
              <p className="font-sans font-semibold text-sm leading-5 text-neutral-900 truncate">
                {hero.sectorName}
              </p>
              <p className="font-sans font-normal text-xs leading-4 text-neutral-600 truncate">
                {hero.beneficiaryName}
              </p>
            </div>
          );
        },
      },
      {
        id: "claimCode",
        accessorKey: "claimCode",
        header: "Kode",
        meta: {
          className: "w-[110px]",
        },
        cell: ({ row }) => (
          <span className="font-sans font-normal text-sm text-neutral-900 tabular-nums">
            {row.original.claimCode}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          align: "right",
        },
        cell: ({ row }) => renderHeroActionButtons(row.original),
      },
    ],
    [renderHeroActionButtons],
  );

  const table = useReactTable({
    data: visibleHeroes,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-visible">
      {/* Header Kartu Daftar Heroes */}
      <div className="p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
            Daftar Heroes
          </h2>
          <Badge tone="neutral" styleVariant="soft">
            {heroesSummary.activeHeroesCount} orang
          </Badge>
          {heroesSummary.forfeitedCount > 0 && (
            <Badge tone="danger" styleVariant="soft" dot>
              {heroesSummary.forfeitedCount} kuota hangus
            </Badge>
          )}
        </div>

        {/* Tombol & Dropdown Menu Tambah Heroes */}
        <div ref={popoverWrapperRef} className="relative">
          <Button
            type="button"
            variant="primary"
            size="sm"
            leftIcon={<Plus className="size-4" />}
            onClick={() => setIsAddOpen((prev) => !prev)}
            aria-expanded={isAddOpen}
            aria-haspopup="menu"
          >
            Tambah Heroes
          </Button>

          {isAddOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] w-[300px] sm:w-[320px] z-40 rounded-md border border-neutral-200 bg-white p-1.5 flex flex-col gap-0.5 shadow-[0px_8px_24px_-4px_rgba(20,32,35,0.1)] animate-in fade-in slide-in-from-top-1 duration-150 motion-reduce:animate-none"
              role="menu"
              aria-label="Pilih hero untuk ditambahkan"
            >
              <Input
                ref={searchInputRef}
                size="sm"
                showLabel={false}
                showHelper={false}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama hero..."
                leadingIcon={<Search className="size-4 text-neutral-500" />}
                trailingIcon={
                  searchTerm ? (
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label="Hapus pencarian hero"
                      tooltip="Bersihkan pencarian"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="size-3.5" />
                    </IconButton>
                  ) : undefined
                }
                className="max-w-none [&>div]:bg-neutral-100 [&>div]:border-transparent [&>div]:rounded-sm [&>div]:h-9 [&>div]:px-3 [&>div]:shadow-none [&>div]:hover:border-transparent [&>div]:focus-within:bg-neutral-100 [&>div]:focus-within:border-brand-vivid [&>div]:focus-within:shadow-none"
              />

              {isQuotaFull && (
                <div className="rounded-sm bg-amber-50 border border-amber-200 px-3 py-1.5 font-sans text-xs text-amber-800 font-medium">
                  Kuota heroes sudah penuh ({heroesSummary.usedQuotaCount} /{" "}
                  {quotaTotal}).
                </div>
              )}

              <div className="max-h-[260px] overflow-y-auto flex flex-col gap-0.5">
                {filteredCandidates.length === 0 ? (
                  <p className="py-5 text-center font-sans text-xs text-neutral-500">
                    Tidak ada hero yang cocok dengan "{searchTerm}".
                  </p>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const isAlreadyRegistered = registeredNamesSet.has(
                      candidate.name.toLowerCase(),
                    );
                    const isDisabled =
                      candidate.isBlocked || isAlreadyRegistered || isQuotaFull;

                    const subtitleText = isAlreadyRegistered
                      ? "Sudah terdaftar di donasi ini"
                      : `${candidate.sectorName} · ${candidate.beneficiaryName}`;

                    return (
                      <Button
                        key={candidate.id}
                        type="button"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() => {
                          onAddHero(candidate);
                          setSearchTerm("");
                          setIsAddOpen(false);
                        }}
                        className="w-full h-auto justify-start items-center gap-3 rounded-sm px-3 py-2 text-left font-normal hover:bg-neutral-100 active:translate-y-0 disabled:opacity-100"
                      >
                        <EntityIdentity
                          entityType="hero"
                          name={candidate.name}
                          subtitle={subtitleText}
                          avatarSrc={getHeroAvatarSrc({
                            id: candidate.id,
                            name: candidate.name,
                          })}
                          avatarClassName={
                            isDisabled ? "opacity-50" : undefined
                          }
                          nameClassName={
                            isDisabled ? "text-neutral-400" : undefined
                          }
                          subtitleClassName={
                            isDisabled ? "text-neutral-400" : undefined
                          }
                          className="flex-1"
                        />

                        {candidate.isBlocked && (
                          <Badge
                            tone="danger"
                            styleVariant="soft"
                            dot
                            className="shrink-0 whitespace-nowrap"
                          >
                            Diblokir
                          </Badge>
                        )}
                      </Button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Konten Daftar Heroes */}
      {heroes.length === 0 ? (
        <div className="flex items-center justify-center px-6 py-10">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationSantaiKosong />}
            title="Belum ada heroes"
            description="Tambahkan heroes secara manual atau tunggu heroes melakukan klaim pada aksi donasi ini."
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
                {table.getRowModel().rows.map((row) => {
                  const isForfeited =
                    row.original.status === "tidak-jadi-ambil";

                  return (
                    <TableRow
                      key={row.id}
                      className={isForfeited ? "bg-red-50/30" : undefined}
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

          {/* Kartu Mobile */}
          <div className="md:hidden divide-y divide-neutral-100 border-t border-neutral-100">
            {visibleHeroes.map((hero, index) => {
              const isForfeited = hero.status === "tidak-jadi-ambil";

              return (
                <div
                  key={hero.id}
                  className={cn("p-4 space-y-3", isForfeited && "bg-red-50/30")}
                >
                  <div className="flex items-center justify-between gap-3 min-w-0">
                    <EntityIdentity
                      entityType="hero"
                      name={hero.name}
                      subtitle={`${hero.sectorName} · ${hero.beneficiaryName}`}
                      avatarSrc={
                        hero.avatarSrc ??
                        getHeroAvatarSrc({ id: hero.heroId, name: hero.name })
                      }
                      strikethrough={isForfeited}
                      className="flex-1"
                    />
                    <span className="font-sans text-xs text-neutral-500 tabular-nums shrink-0">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="font-sans text-xs text-neutral-600 tabular-nums">
                      Kode:{" "}
                      <span className="font-medium text-neutral-900">
                        {hero.claimCode}
                      </span>
                    </span>
                    {renderHeroActionButtons(hero)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Tampilkan Lainnya */}
          {hiddenCount > 0 && (
            <div className="p-4 flex justify-center bg-white rounded-b-2xl">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="text-brand hover:text-brand-hover hover:bg-bondi-50"
              >
                {isExpanded
                  ? "Sembunyikan sebagian heroes"
                  : `Tampilkan ${hiddenCount} heroes lainnya`}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
