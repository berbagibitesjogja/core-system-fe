import { Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { FilterChip } from "#/components/shared/filter-chip";
import type {
  BeneficiaryCategoryId,
  BeneficiaryFilterOption,
} from "./beneficiary-data";

export interface BeneficiaryToolbarProps {
  filterOptions: BeneficiaryFilterOption[];
  activeCategory: BeneficiaryCategoryId;
  onCategoryChange: (category: BeneficiaryCategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddBeneficiary?: () => void;
}

/**
 * BeneficiaryToolbar: Toolbar penyaringan kategori, pencarian realtime, dan tombol tambah penerima.
 */
export function BeneficiaryToolbar({
  filterOptions,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onAddBeneficiary,
}: BeneficiaryToolbarProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs w-full">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
        {/* Filter kategori penerima */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {filterOptions.map((option) => (
            <FilterChip
              key={option.id}
              label={option.label}
              count={option.count}
              showCount
              selected={activeCategory === option.id}
              onClick={() => onCategoryChange(option.id)}
            />
          ))}
        </div>

        {/* Kolom pencarian */}
        <div className="flex-1 min-w-0">
          <Input
            showLabel={false}
            showHelper={false}
            className="max-w-none"
            placeholder="Cari penerima..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leadingIcon={<Search className="size-5 text-neutral-400" />}
            trailingIcon={
              searchQuery ? (
                <Tooltip content="Hapus pencarian" placement="top">
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="p-0.5 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                    aria-label="Hapus pencarian"
                  >
                    <X className="size-4" />
                  </button>
                </Tooltip>
              ) : undefined
            }
          />
        </div>

        {/* Tombol aksi tambah penerima */}
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="size-5" />}
          className="shrink-0 w-full sm:w-auto"
          onClick={onAddBeneficiary}
        >
          Tambah Penerima
        </Button>
      </div>
    </div>
  );
}
