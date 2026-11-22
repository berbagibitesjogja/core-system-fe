import { Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { idVolunteer } from "#/locales";
import { VOLUNTEER_DIVISION_OPTIONS } from "./volunteer-data";
import type { VolunteerDivisionOption } from "./volunteer-data";
import { VolunteerSelectField } from "./volunteer-select-field";

export interface VolunteerToolbarProps {
  selectedDivision: string;
  onDivisionChange: (division: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddVolunteer: () => void;
  divisionOptions?: VolunteerDivisionOption[];
}

/**
 * VolunteerToolbar: Baris kontrol filter divisi, kolom pencarian penuh, dan tombol Tambah Volunteer (Figma 149:19230 & 149:20821).
 */
export function VolunteerToolbar({
  selectedDivision,
  onDivisionChange,
  searchQuery,
  onSearchChange,
  onAddVolunteer,
  divisionOptions = VOLUNTEER_DIVISION_OPTIONS,
}: VolunteerToolbarProps) {
  return (
    <div className="bg-surface border border-neutral-200 rounded-lg p-5 shadow-xs w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        {/* Dropdown Filter Divisi */}
        <div className="w-full sm:w-[240px] shrink-0">
          <VolunteerSelectField
            value={selectedDivision}
            options={divisionOptions}
            placeholder={idVolunteer.list.toolbar.divisionPlaceholder}
            onChange={onDivisionChange}
            searchable={divisionOptions.length > 7}
            searchPlaceholder={
              idVolunteer.list.toolbar.searchDivisionPlaceholder
            }
            emptyText={idVolunteer.list.toolbar.emptyDivision}
            menuClassName="sm:w-[280px]"
          />
        </div>

        {/* Kolom Pencarian Lebar Penuh */}
        <div className="flex-1 min-w-0">
          <Input
            showLabel={false}
            showHelper={false}
            className="max-w-none"
            placeholder={idVolunteer.list.toolbar.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="size-[18px]" />}
            rightIcon={
              searchQuery ? (
                <Tooltip
                  content={idVolunteer.list.toolbar.clearSearchTooltip}
                  placement="top"
                >
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    aria-label={idVolunteer.list.toolbar.clearSearchTooltip}
                    className="pointer-events-auto text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </Tooltip>
              ) : undefined
            }
          />
        </div>

        {/* Tombol Tambah Volunteer */}
        <div className="shrink-0">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="size-5" />}
            onClick={onAddVolunteer}
            className="w-full sm:w-auto"
          >
            {idVolunteer.list.toolbar.addVolunteerButton}
          </Button>
        </div>
      </div>
    </div>
  );
}
