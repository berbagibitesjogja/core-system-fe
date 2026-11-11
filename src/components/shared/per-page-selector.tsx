import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Tooltip } from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

export interface PerPageSelectorProps {
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  options?: number[];
  min?: number;
  max?: number;
  label?: string;
  direction?: "up" | "down";
  className?: string;
}

/**
 * PerPageSelector: Komponen pemilih jumlah baris data per halaman dengan gaya khas BBJ.
 * Mendukung pengetikan angka manual (tekan Enter/blur) dan pemilihan cepat melalui dropdown menu.
 */
export function PerPageSelector({
  perPage,
  onPerPageChange,
  options = [10, 20, 50, 100],
  min = 1,
  max = 500,
  label = "Per halaman:",
  direction = "up",
  className,
}: PerPageSelectorProps) {
  const [inputVal, setInputVal] = React.useState<string>(String(perPage));
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Sinkronisasi nilai input saat perPage dari props berubah
  React.useEffect(() => {
    setInputVal(String(perPage));
  }, [perPage]);

  // Listener klik di luar untuk menutup dropdown menu
  React.useEffect(() => {
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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Validasi dan komit nilai input manual
  const handleCommit = () => {
    const parsed = parseInt(inputVal, 10);
    if (isNaN(parsed) || parsed < min) {
      setInputVal(String(perPage));
      return;
    }

    const clamped = Math.min(parsed, max);
    setInputVal(String(clamped));
    if (clamped !== perPage) {
      onPerPageChange(clamped);
    }
  };

  const handleSelectOption = (opt: number) => {
    setInputVal(String(opt));
    setIsOpen(false);
    if (opt !== perPage) {
      onPerPageChange(opt);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center gap-2 text-xs font-sans select-none",
        isOpen && "z-30",
        className,
      )}
    >
      {/* Label Deskriptif */}
      <span className="font-medium text-neutral-600 whitespace-nowrap">
        {label}
      </span>

      {/* Kontrol Input Manual + Trigger Dropdown */}
      <div
        className={cn(
          "relative inline-flex items-center gap-1 bg-white border border-neutral-300 rounded-sm px-2 py-0.5 shadow-2xs hover:border-neutral-900 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all",
          isOpen && "z-30",
        )}
      >
        {/* Input Angka Manual */}
        <input
          type="number"
          min={min}
          max={max}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommit();
              e.currentTarget.blur();
            }
          }}
          style={{ width: `${Math.max(2, inputVal.length)}ch` }}
          className="text-center font-bold text-xs text-neutral-900 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 cursor-text leading-tight"
          title="Ketik angka per halaman lalu tekan Enter"
          aria-label="Jumlah baris per halaman"
        />

        {/* Tombol Pembuka Dropdown Menu */}
        <Tooltip content="Pilih opsi per halaman">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer focus:outline-none flex items-center justify-center transition-colors"
            aria-label="Buka opsi jumlah baris per halaman"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <ChevronDown
              className={cn(
                "size-3.5 stroke-[2.2] transition-transform duration-150",
                isOpen && "rotate-180 text-brand",
              )}
            />
          </button>
        </Tooltip>

        {/* Popover Dropdown Menu Opsi Pilihan */}
        {isOpen && (
          <div
            role="listbox"
            className={cn(
              "absolute right-0 min-w-[6.5rem] p-1 bg-white border border-neutral-200 rounded-sm shadow-[0px_8px_20px_rgba(20,32,35,0.18)] z-50 animate-in fade-in zoom-in-95 duration-100",
              direction === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5",
            )}
          >
            {options.map((option) => {
              const isSelected = perPage === option;

              return (
                <div
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectOption(option)}
                  className={cn(
                    "flex items-center justify-between px-2.5 py-1.5 rounded-xs text-xs cursor-pointer transition-colors",
                    isSelected
                      ? "bg-bondi-50 text-brand-dark font-bold"
                      : "text-neutral-700 hover:bg-neutral-100 font-medium",
                  )}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <Check className="size-3.5 text-brand stroke-[2.5] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
