import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Trash2,
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
import type {
  DonationHeroClaimRecord,
  DonationHeroSearchOption,
} from "./donation-detail-data";

export interface DonationDetailHeroesCardProps {
  heroes: DonationHeroClaimRecord[];
  quotaTotal: number;
  searchableHeroes: DonationHeroSearchOption[];
  onAddHero: (candidate: DonationHeroSearchOption) => void;
  onConfirmPickup: (heroId: string) => void;
  onRemoveHero: (hero: DonationHeroClaimRecord) => void;
}

const INITIAL_VISIBLE_HEROES = 6;

/**
 * DonationDetailHeroesCard: Menampilkan daftar heroes klaim, popover tambah heroes, serta konfirmasi pengambilan (Figma 123:4842, 124:5133, 124:6103).
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

  const isQuotaFull = heroes.length >= quotaTotal;
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

  return (
    <section className="rounded-[24px] border border-neutral-200 bg-white shadow-xs overflow-visible">
      {/* Header Kartu Daftar Heroes */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="font-['Gabarito'] font-semibold text-[18px] leading-[26px] text-[#142023]">
            Daftar Heroes
          </h2>
          <Badge tone="neutral">{heroes.length} orang</Badge>
        </div>

        {/* Tombol & Popover Tambah Heroes */}
        <div ref={popoverWrapperRef} className="relative">
          <Button
            type="button"
            variant="primary"
            size="sm"
            leftIcon={<Plus className="size-4" />}
            onClick={() => setIsAddOpen((prev) => !prev)}
            aria-expanded={isAddOpen}
            aria-haspopup="listbox"
          >
            Tambah Heroes
          </Button>

          {isAddOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] w-[300px] sm:w-[340px] z-40 rounded-2xl border border-neutral-200 bg-white shadow-[0px_16px_32px_rgba(20,32,35,0.14)] p-3 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-150 motion-reduce:animate-none"
              role="dialog"
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
                leadingIcon={<Search className="size-4" />}
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
              />

              {isQuotaFull && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-[12px] text-amber-800 font-medium">
                  Kuota heroes sudah penuh ({heroes.length} / {quotaTotal}).
                </div>
              )}

              <div
                className="max-h-[250px] overflow-y-auto divide-y divide-neutral-100 pr-0.5"
                role="listbox"
              >
                {filteredCandidates.length === 0 ? (
                  <p className="py-6 text-center text-[13px] text-[#6b777a]">
                    Tidak ada hero yang cocok dengan "{searchTerm}".
                  </p>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const isAlreadyRegistered = registeredNamesSet.has(
                      candidate.name.toLowerCase(),
                    );
                    const isDisabled =
                      candidate.isBlocked || isAlreadyRegistered || isQuotaFull;

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
                        className="w-full h-auto justify-between items-center rounded-xl px-2.5 py-2.5 text-left font-normal hover:bg-neutral-50 disabled:opacity-60"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-semibold text-[14px] text-[#142023] truncate">
                            {candidate.name}
                          </p>
                          <p className="text-[12px] text-[#6b777a] truncate">
                            {candidate.sectorName} · {candidate.beneficiaryName}
                          </p>
                        </div>

                        {candidate.isBlocked ? (
                          <Badge
                            tone="danger"
                            dot
                            className="shrink-0 whitespace-nowrap"
                          >
                            Diblokir
                          </Badge>
                        ) : isAlreadyRegistered ? (
                          <Badge
                            tone="neutral"
                            className="shrink-0 whitespace-nowrap"
                          >
                            Terdaftar
                          </Badge>
                        ) : (
                          <span className="shrink-0 text-[12px] font-semibold text-[#007d85]">
                            Pilih
                          </span>
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
        <div className="p-6">
          <EmptyState
            illustration={<IllustrationSantaiKosong />}
            title="Belum ada heroes"
            description="Tambahkan heroes secara manual atau tunggu heroes melakukan klaim pada aksi donasi ini."
          />
        </div>
      ) : (
        <>
          {/* Tabel Desktop */}
          <div className="hidden md:block">
            <Table containerClassName="rounded-none border-0 shadow-none">
              <TableHeader className="bg-[#eef1f2]">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Nama</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Beneficiary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleHeroes.map((hero) => {
                  const isPickedUp = hero.status === "sudah-diambil";
                  return (
                    <TableRow key={hero.id}>
                      <TableCell>
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar name={hero.name} size="sm" />
                          <span className="font-medium text-[#142023] truncate">
                            {hero.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#4d585b]">
                        {hero.sectorName}
                      </TableCell>
                      <TableCell className="text-[#4d585b]">
                        {hero.beneficiaryName}
                      </TableCell>
                      <TableCell>
                        {isPickedUp ? (
                          <Badge tone="success" dot>
                            Sudah Diambil
                          </Badge>
                        ) : (
                          <Badge tone="warning" dot>
                            Belum Diambil
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
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
                              onClick={() => onConfirmPickup(hero.id)}
                            >
                              Konfirmasi Ambil
                            </Button>
                          )}
                          <IconButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label={`Keluarkan ${hero.name} dari donasi`}
                            tooltip="Keluarkan hero dari donasi"
                            onClick={() => onRemoveHero(hero)}
                            className="text-neutral-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" />
                          </IconButton>
                        </div>
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
              const isPickedUp = hero.status === "sudah-diambil";
              return (
                <div key={hero.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={hero.name} size="sm" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[14px] text-[#142023] truncate">
                          {hero.name}
                        </p>
                        <p className="text-[12px] text-[#6b777a] truncate">
                          {hero.sectorName} · {hero.beneficiaryName}
                        </p>
                      </div>
                    </div>
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Keluarkan ${hero.name} dari donasi`}
                      tooltip="Keluarkan hero dari donasi"
                      onClick={() => onRemoveHero(hero)}
                      className="text-neutral-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </IconButton>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    {isPickedUp ? (
                      <Badge tone="success" dot>
                        Sudah Diambil
                      </Badge>
                    ) : (
                      <Badge tone="warning" dot>
                        Belum Diambil
                      </Badge>
                    )}

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
                        onClick={() => onConfirmPickup(hero.id)}
                      >
                        Konfirmasi Ambil
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Tampilkan Lainnya */}
          {hiddenCount > 0 && (
            <div className="border-t border-neutral-100 px-5 py-3 flex justify-center bg-neutral-50/50 rounded-b-[24px]">
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
                className="text-[#007d85] hover:text-[#00646b] hover:bg-bondi-50"
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
