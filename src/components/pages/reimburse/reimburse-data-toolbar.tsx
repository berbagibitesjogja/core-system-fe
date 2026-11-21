import { Search, X } from "lucide-react";
import { FilterChip } from "#/components/shared/filter-chip";
import { IconButton } from "#/components/ui/icon-button";
import { Input } from "#/components/ui/input";
import { idReimburse } from "#/locales";
import type {
  ReimburseDataStatusFilter,
  ReimburseStatusFilterOption,
} from "./reimburse-management-data";

export interface ReimburseDataToolbarProps {
  statusFilter: ReimburseDataStatusFilter;
  filterOptions: readonly ReimburseStatusFilterOption[];
  searchQuery: string;
  onStatusChange: (status: ReimburseDataStatusFilter) => void;
  onSearchChange: (search: string) => void;
  onClearSearch: () => void;
}

// Bar filter status dan pencarian tabel Data Reimburse
export function ReimburseDataToolbar({
  statusFilter,
  filterOptions,
  searchQuery,
  onStatusChange,
  onSearchChange,
  onClearSearch,
}: ReimburseDataToolbarProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs w-full">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
        {/* Kelompok filter status */}
        <div
          role="group"
          aria-label={idReimburse.data.toolbar.filterGroupAria}
          className="flex shrink-0 flex-wrap items-center gap-2"
        >
          {filterOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              count={option.count}
              showCount
              selected={statusFilter === option.value}
              onClick={() => onStatusChange(option.value)}
            />
          ))}
        </div>

        {/* Kolom pencarian */}
        <div className="min-w-0 w-full flex-1">
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={idReimburse.data.toolbar.searchPlaceholder}
            aria-label={idReimburse.data.toolbar.searchAria}
            showLabel={false}
            showHelper={false}
            className="w-full max-w-none"
            leadingIcon={<Search className="size-4 text-neutral-400" />}
            trailingIcon={
              searchQuery.trim().length > 0 ? (
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  tooltip={idReimburse.data.toolbar.clearSearchTooltip}
                  aria-label={idReimburse.data.toolbar.clearSearchTooltip}
                  onClick={onClearSearch}
                  className="size-7 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="size-3.5" />
                </IconButton>
              ) : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
