import { Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { idBeneficiary } from "#/locales";
import { BeneficiarySelectField } from "./beneficiary-select-field";
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
 * BeneficiaryToolbar: Toolbar penyaringan kategori dropdown, pencarian realtime, dan tombol tambah penerima.
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
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        {/* Dropdown Filter Kategori Penerima */}
        <div className="w-full sm:w-[260px] shrink-0">
          <BeneficiarySelectField
            value={activeCategory}
            options={filterOptions.map((opt) => ({
              id: opt.id,
              label: opt.label,
              count: opt.count,
            }))}
            placeholder={idBeneficiary.toolbar.categoryPlaceholder}
            onChange={(val) => onCategoryChange(val)}
            searchable={filterOptions.length > 5}
            searchPlaceholder={idBeneficiary.toolbar.searchCategoryPlaceholder}
            emptyText={idBeneficiary.toolbar.emptyCategory}
          />
        </div>

        {/* Kolom pencarian */}
        <div className="flex-1 min-w-0">
          <Input
            showLabel={false}
            showHelper={false}
            className="max-w-none"
            placeholder={idBeneficiary.toolbar.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leadingIcon={<Search className="size-5 text-neutral-400" />}
            trailingIcon={
              searchQuery ? (
                <Tooltip
                  content={idBeneficiary.toolbar.clearSearchTooltip}
                  placement="top"
                >
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="p-0.5 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                    aria-label={idBeneficiary.toolbar.clearSearchTooltip}
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
          {idBeneficiary.toolbar.addBeneficiary}
        </Button>
      </div>
    </div>
  );
}
