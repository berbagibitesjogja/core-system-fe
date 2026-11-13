import * as React from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { FieldHelper } from "#/components/ui/field-helper";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

export interface VolunteerSelectOption {
  id: string;
  label: string;
  meta?: string;
}

export interface VolunteerSelectFieldProps {
  id?: string;
  label?: string;
  showLabel?: boolean;
  value: string;
  options: VolunteerSelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  error?: string;
  className?: string;
  menuClassName?: string;
}

/**
 * VolunteerSelectField: Kontrol pilihan dropdown dengan pencarian opsional untuk filter toolbar Volunteer.
 */
export function VolunteerSelectField({
  id,
  label,
  showLabel = false,
  value,
  options,
  placeholder,
  onChange,
  disabled = false,
  searchable = false,
  searchPlaceholder = "Cari...",
  emptyText = "Pilihan tidak ditemukan",
  error,
  className,
  menuClassName,
}: VolunteerSelectFieldProps) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedOption = options.find((opt) => opt.id === value);

  // Tutup dropdown saat klik di luar atau menekan tombol Escape
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Reset pencarian & fokuskan input pencarian saat popover dibuka
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      if (searchable) {
        const timer = setTimeout(() => {
          searchInputRef.current?.focus();
        }, 20);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, searchable]);

  // Tutup popover bila status field berubah menjadi disabled
  React.useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  const filteredOptions = React.useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(trimmed));
  }, [options, searchQuery]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col gap-[6px] w-full", className)}
    >
      {showLabel && label && (
        <label
          htmlFor={fieldId}
          className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-neutral-900"
        >
          {label}
        </label>
      )}

      <button
        id={fieldId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={cn(
          "h-[44px] w-full px-3 rounded-md flex items-center justify-between gap-2 text-left text-[14px] font-['Inter'] transition-all outline-none",
          disabled
            ? "bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed"
            : error
              ? "bg-white border-[1.5px] border-red-500 shadow-focus-ring-danger text-neutral-900 cursor-pointer"
              : isOpen
                ? "bg-white border-[1.5px] border-bondi-500 shadow-focus-ring text-neutral-900 cursor-pointer"
                : "bg-white border border-border-input text-neutral-900 hover:border-neutral-900 cursor-pointer",
        )}
      >
        <span
          className={cn(
            "truncate flex-1",
            disabled
              ? "text-neutral-400"
              : selectedOption
                ? "text-neutral-900"
                : "text-neutral-500",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 transition-transform duration-150",
            disabled ? "text-neutral-400" : "text-neutral-600",
            isOpen && "rotate-180 text-brand",
          )}
        />
      </button>

      {error && <FieldHelper error={error} />}

      {isOpen && !disabled && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 top-full mt-1.5 z-50 w-full min-w-[260px] bg-white border border-neutral-200 rounded-xl p-1.5 shadow-lg flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100 motion-reduce:animate-none",
            menuClassName,
          )}
        >
          {searchable && (
            <div className="mb-1">
              <Input
                ref={searchInputRef}
                size="sm"
                showLabel={false}
                showHelper={false}
                className="max-w-none"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leadingIcon={<Search className="size-4 text-neutral-500" />}
                trailingIcon={
                  searchQuery ? (
                    <Tooltip content="Hapus pencarian" placement="top">
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="p-0.5 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                        aria-label="Hapus pencarian"
                      >
                        <X className="size-3.5" />
                      </button>
                    </Tooltip>
                  ) : undefined
                }
              />
            </div>
          )}

          <div className="max-h-64 overflow-y-auto flex flex-col gap-0.5">
            {filteredOptions.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-left flex items-center justify-between gap-3 transition-colors cursor-pointer",
                    isSelected
                      ? "bg-bondi-50 text-bondi-900"
                      : "text-neutral-900 hover:bg-neutral-100",
                  )}
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-['Inter'] text-[14px] leading-[20px] truncate">
                      {option.label}
                    </span>
                    {option.meta && (
                      <span className="font-['Inter'] text-[12px] leading-[16px] text-neutral-600 truncate">
                        {option.meta}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="size-4 shrink-0 text-brand" />
                  )}
                </button>
              );
            })}

            {filteredOptions.length === 0 && (
              <p className="px-3 py-4 text-center font-['Inter'] text-[12px] text-neutral-500">
                {emptyText}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
