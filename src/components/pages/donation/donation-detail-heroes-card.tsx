import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
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
import { cn } from "#/lib/utils";
import { calculateHeroesQuotaSummary } from "./donation-detail-data";
import type {
  DonationHeroClaimRecord,
  DonationHeroPickupStatus,
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

const HERO_STATUS_BADGE_MAP: Record<
  DonationHeroPickupStatus,
  { tone: "success" | "warning" | "danger"; label: string }
> = {
  "sudah-diambil": { tone: "success", label: "Sudah Diambil" },
  "belum-diambil": { tone: "warning", label: "Belum Diambil" },
  "tidak-jadi-ambil": { tone: "danger", label: "Tidak Jadi Ambil" },
};

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

  const renderHeroActionButtons = (hero: DonationHeroClaimRecord) => {
    if (hero.status === "tidak-jadi-ambil") {
      return (
        <span className="font-sans text-xs font-semibold text-red-700">
          Kuota hangus
        </span>
      );
    }

    const isPickedUp = hero.status === "sudah-diambil";
    return (
      <div className="flex items-center justify-end gap-2">
        {isPickedUp ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled
            leftIcon={<Check className="size-3.5" />}
          >
            Sudah Diambil
          </Button>
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
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-visible">
      {/* Header Kartu Daftar Heroes */}
      <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100">
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
              className="absolute right-0 top-[calc(100%+8px)] w-[300px] sm:w-[340px] z-40 rounded-xl border border-neutral-200 bg-white p-1.5 flex flex-col gap-0.5 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150 motion-reduce:animate-none"
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
                className="max-w-none [&>div]:bg-neutral-100 [&>div]:border-transparent [&>div]:rounded-lg [&>div]:h-9 [&>div]:px-3 [&>div]:shadow-none [&>div]:hover:border-transparent [&>div]:focus-within:bg-neutral-100 [&>div]:focus-within:border-brand-vivid [&>div]:focus-within:shadow-none"
              />

              {isQuotaFull && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 font-sans text-xs text-amber-800 font-medium">
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
                        className="w-full h-auto justify-start items-center gap-3 rounded-lg px-3 py-2 text-left font-normal hover:bg-neutral-100 active:translate-y-0 disabled:opacity-100"
                      >
                        <User
                          className={cn(
                            "size-[18px] shrink-0",
                            isDisabled
                              ? "text-neutral-400"
                              : "text-neutral-600",
                          )}
                        />

                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-sans font-normal text-sm leading-5 truncate",
                              isDisabled
                                ? "text-neutral-400"
                                : "text-neutral-900",
                            )}
                          >
                            {candidate.name}
                          </p>
                          <p
                            className={cn(
                              "font-sans font-normal text-xs leading-4 truncate",
                              isDisabled
                                ? "text-neutral-400"
                                : "text-neutral-600",
                            )}
                          >
                            {subtitleText}
                          </p>
                        </div>

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
                <TableRow className="hover:bg-transparent">
                  <TableHead className="uppercase tracking-[0.04em]">
                    Nama
                  </TableHead>
                  <TableHead className="uppercase tracking-[0.04em]">
                    Sector
                  </TableHead>
                  <TableHead className="uppercase tracking-[0.04em]">
                    Beneficiary
                  </TableHead>
                  <TableHead className="uppercase tracking-[0.04em]">
                    Status
                  </TableHead>
                  <TableHead
                    align="right"
                    className="uppercase tracking-[0.04em]"
                  >
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleHeroes.map((hero) => {
                  const statusConfig = HERO_STATUS_BADGE_MAP[hero.status];
                  const isForfeited = hero.status === "tidak-jadi-ambil";

                  return (
                    <TableRow
                      key={hero.id}
                      className={isForfeited ? "bg-red-50/30" : undefined}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar
                            name={hero.name}
                            size="sm"
                            shape="circle"
                            className="size-8 bg-bondi-50 text-brand-dark border-bondi-200 font-semibold shrink-0"
                          />
                          <span
                            className={cn(
                              "font-sans font-semibold text-sm truncate",
                              isForfeited
                                ? "text-neutral-500 line-through"
                                : "text-neutral-900",
                            )}
                          >
                            {hero.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-sans text-sm text-neutral-600">
                        {hero.sectorName}
                      </TableCell>
                      <TableCell className="font-sans text-sm text-neutral-600">
                        {hero.beneficiaryName}
                      </TableCell>
                      <TableCell>
                        <Badge tone={statusConfig.tone} styleVariant="soft" dot>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell align="right">
                        {renderHeroActionButtons(hero)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Kartu Mobile */}
          <div className="md:hidden divide-y divide-neutral-100">
            {visibleHeroes.map((hero) => {
              const statusConfig = HERO_STATUS_BADGE_MAP[hero.status];
              const isForfeited = hero.status === "tidak-jadi-ambil";

              return (
                <div
                  key={hero.id}
                  className={cn("p-4 space-y-3", isForfeited && "bg-red-50/30")}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      name={hero.name}
                      size="sm"
                      shape="circle"
                      className="size-8 bg-bondi-50 text-brand-dark border-bondi-200 font-semibold shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "font-sans font-semibold text-sm truncate",
                          isForfeited
                            ? "text-neutral-500 line-through"
                            : "text-neutral-900",
                        )}
                      >
                        {hero.name}
                      </p>
                      <p className="font-sans text-xs text-neutral-500 truncate">
                        {hero.sectorName} · {hero.beneficiaryName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <Badge tone={statusConfig.tone} styleVariant="soft" dot>
                      {statusConfig.label}
                    </Badge>
                    {renderHeroActionButtons(hero)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Tampilkan Lainnya */}
          {hiddenCount > 0 && (
            <div className="border-t border-neutral-100 px-5 py-3 flex justify-center bg-neutral-50/50 rounded-b-2xl">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded((prev) => !prev)}
                rightIcon={
                  isExpanded ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )
                }
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
