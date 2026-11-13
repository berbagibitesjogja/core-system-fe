import * as React from "react";
import { Check, ChevronDown, Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";
import { VOLUNTEER_DIVISION_OPTIONS } from "./volunteer-data";

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
  const [isDivisionOpen, setIsDivisionOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const activeDivisionOption =
    VOLUNTEER_DIVISION_OPTIONS.find((opt) => opt.id === selectedDivision) ??
    VOLUNTEER_DIVISION_OPTIONS[0];

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDivisionOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDivisionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-surface border border-neutral-200 rounded-lg p-5 shadow-xs w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        {/* Dropdown Filter Divisi */}
        <div
          ref={dropdownRef}
          className="relative w-full sm:w-[220px] shrink-0"
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isDivisionOpen}
            aria-label="Filter divisi volunteer"
            onClick={() => setIsDivisionOpen((prev) => !prev)}
            className={cn(
              "flex min-h-[42px] w-full items-center justify-between gap-2 rounded-sm border bg-surface px-4 py-2.5 text-left font-body text-sm text-neutral-900 shadow-2xs transition-all duration-150 cursor-pointer",
              isDivisionOpen
                ? "border-brand shadow-focus-ring"
                : "border-border-input hover:border-neutral-400",
            )}
          >
            <span className="truncate font-normal">
              {activeDivisionOption.label}
            </span>
            <ChevronDown
              className={cn(
                "size-[18px] shrink-0 text-neutral-400 transition-transform duration-150",
                isDivisionOpen && "rotate-180 text-brand",
              )}
              aria-hidden="true"
            />
          </button>

          {isDivisionOpen && (
            <div
              role="listbox"
              aria-label="Daftar divisi volunteer"
              className="absolute left-0 top-full z-40 mt-1.5 max-h-68 w-full overflow-y-auto rounded-md border border-neutral-200 bg-surface p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-150 motion-reduce:animate-none"
            >
              {VOLUNTEER_DIVISION_OPTIONS.map((option) => {
                const isSelected = option.id === selectedDivision;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onDivisionChange(option.id);
                      setIsDivisionOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2 text-left font-body text-sm transition-colors cursor-pointer",
                      isSelected
                        ? "bg-bondi-50 font-semibold text-brand-strong"
                        : "text-neutral-700 hover:bg-neutral-100",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <Check
                        className="size-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
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
