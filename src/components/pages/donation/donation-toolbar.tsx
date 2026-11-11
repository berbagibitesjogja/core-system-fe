import { Calendar, Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { FilterChip } from "#/components/shared/filter-chip";
import type { ProgramFilterOption } from "./donation-data";

export interface DonationToolbarProps {
  filterOptions: ProgramFilterOption[];
  activeFilterId: string;
  onFilterChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateFrom: string;
  onDateFromChange: (date: string) => void;
  dateTo: string;
  onDateToChange: (date: string) => void;
  onAddDonation?: () => void;
}

/**
 * DonationToolbar: Toolbar penyaringan donasi dan aksi tambah donasi baru.
 * Dilengkapi dengan filter chip program, pencarian realtime, dan filter rentang tanggal.
 */
export function DonationToolbar({
  filterOptions,
  activeFilterId,
  onFilterChange,
  searchQuery,
  onSearchChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onAddDonation,
}: DonationToolbarProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4 shadow-xs w-full">
      {/* Baris Atas: Filter Program & Tombol Tambah */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((option) => (
            <FilterChip
              key={option.id}
              label={option.label}
              count={option.count}
              showCount
              selected={activeFilterId === option.id}
              onClick={() => onFilterChange(option.id)}
            />
          ))}
        </div>

        <Button
          variant="primary"
          size="md"
          className="rounded-full shadow-pop-xs shrink-0"
          onClick={onAddDonation}
        >
          <Plus className="size-5 mr-2" />
          <span>Tambah Donasi</span>
        </Button>
      </div>

      {/* Baris Bawah: Input Pencarian & Rentang Tanggal */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
        {/* Kolom Pencarian */}
        <div className="flex-1 min-w-0">
          <Input
            showLabel={false}
            placeholder="Cari nama donatur..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leadingIcon={<Search className="size-5 text-neutral-400" />}
            trailingIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="size-4" />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Kolom Tanggal Mulai */}
        <div className="w-full md:w-[200px] shrink-0">
          <Input
            showLabel={false}
            placeholder="Dari Tanggal"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            leadingIcon={<Calendar className="size-5 text-neutral-400" />}
          />
        </div>

        <span className="hidden md:inline-block text-neutral-400 font-sans text-sm select-none">
          –
        </span>

        {/* Kolom Tanggal Akhir */}
        <div className="w-full md:w-[200px] shrink-0">
          <Input
            showLabel={false}
            placeholder="Sampai Tanggal"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            leadingIcon={<Calendar className="size-5 text-neutral-400" />}
          />
        </div>
      </div>
    </div>
  );
}
