import { Search, X } from "lucide-react";
import { FilterChip } from "#/components/shared/filter-chip";
import { IconButton } from "#/components/ui/icon-button";
import { Input } from "#/components/ui/input";
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
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Kelompok filter status */}
      <div
        role="group"
        aria-label="Filter status pengajuan reimburse"
        className="flex flex-wrap items-center gap-2"
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
      <div className="w-full lg:w-[340px]">
        <Input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari berdasarkan nama pemohon atau catatan..."
          aria-label="Cari pengajuan reimburse"
          showLabel={false}
          showHelper={false}
          leadingIcon={<Search className="size-4 text-neutral-400" />}
          trailingIcon={
            searchQuery.trim().length > 0 ? (
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                tooltip="Hapus pencarian"
                aria-label="Hapus pencarian"
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
  );
}
