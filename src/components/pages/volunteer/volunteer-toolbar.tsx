import { Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { VOLUNTEER_DIVISION_OPTIONS } from "./volunteer-data";
import { VolunteerSelectField } from "./volunteer-select-field";

export interface VolunteerToolbarProps {
  selectedDivision: string;
  onDivisionChange: (division: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddVolunteer: () => void;
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
}: VolunteerToolbarProps) {
  return (
    <div className="bg-surface border border-neutral-200 rounded-lg p-5 shadow-xs w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        {/* Dropdown Filter Divisi */}
        <div className="w-full sm:w-[240px] shrink-0">
          <VolunteerSelectField
            value={selectedDivision}
            options={VOLUNTEER_DIVISION_OPTIONS}
            placeholder="Semua Divisi"
            onChange={onDivisionChange}
            searchable={VOLUNTEER_DIVISION_OPTIONS.length > 7}
            searchPlaceholder="Cari divisi..."
            emptyText="Divisi tidak ditemukan"
            menuClassName="sm:w-[280px]"
          />
        </div>

        {/* Kolom Pencarian Lebar Penuh */}
        <div className="flex-1 min-w-0">
          <Input
            showLabel={false}
            showHelper={false}
            className="max-w-none"
            placeholder="Cari volunteer (nama, email, atau no. wa)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="size-[18px]" />}
            rightIcon={
              searchQuery ? (
                <Tooltip content="Bersihkan pencarian" placement="top">
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    aria-label="Bersihkan pencarian"
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
            Tambah Volunteer
          </Button>
        </div>
      </div>
    </div>
  );
}
