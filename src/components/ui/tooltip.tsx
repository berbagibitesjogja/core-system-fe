import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "#/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom";
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean; // For static showcase or controlled state
  portal?: boolean; // Pindahkan ke portal di luar DOM tabel (default: true jika browser/client)
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function Tooltip({
  content,
  placement = "top",
  children,
  className,
  isOpen: controlledOpen,
  portal,
}: TooltipProps) {
  const [hovered, setHovered] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [coords, setCoords] = React.useState<{
    top: number;
    left: number;
    arrowLeft: number;
    actualPlacement: "top" | "bottom";
  } | null>(null);

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const show = controlledOpen !== undefined ? controlledOpen : hovered;
  // Gunakan portal secara default untuk interaksi hover di client agar tidak memperluas luasan tabel
  const usePortal =
    portal !== undefined ? portal : controlledOpen === undefined;

  const updateCoords = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    const w = tooltipRef.current?.offsetWidth ?? 120;
    const h = tooltipRef.current?.offsetHeight ?? 28;
    const gap = 5; // Jarak rapat: ujung panah 6px menempel dekat pada batas tombol

    let actualPlacement = placement;
    // Balik ke bawah jika ruang di atas layar kurang dari tinggi tooltip + margin
    if (placement === "top" && rect.top < h + gap + 16) {
      actualPlacement = "bottom";
    } else if (
      placement === "bottom" &&
      window.innerHeight - rect.bottom < h + gap + 16
    ) {
      actualPlacement = "top";
    }

    const top =
      actualPlacement === "top" ? rect.top - h - gap : rect.bottom + gap;
    const buttonCenter = rect.left + rect.width / 2;

    // Pastikan tooltip tidak terpotong tepi layar (viewport padding 8px)
    const rawLeft = buttonCenter - w / 2;
    const clampedLeft = Math.max(
      8,
      Math.min(rawLeft, window.innerWidth - w - 8),
    );
    // Hitung posisi horizontal panah relatif terhadap sisi kiri kotak tooltip
    const arrowPos = buttonCenter - clampedLeft;
    const arrowLeft = Math.max(10, Math.min(arrowPos, w - 10));

    setCoords({ top, left: clampedLeft, arrowLeft, actualPlacement });
  }, [placement]);

  useIsomorphicLayoutEffect(() => {
    if (!show || !usePortal || !mounted) {
      setCoords(null);
      return;
    }

    updateCoords();

    const handleUpdate = () => {
      updateCoords();
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [show, usePortal, mounted, updateCoords]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}

      {/* Render via Portal di luar DOM tabel / container */}
      {usePortal && mounted && show && coords && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={tooltipRef}
              role="tooltip"
              style={{
                position: "fixed",
                top: `${coords.top}px`,
                left: `${coords.left}px`,
              }}
              className={cn(
                "z-[9999] pointer-events-none px-2.5 py-1.5 text-xs font-semibold font-label text-white bg-neutral-900 rounded-lg shadow-lg whitespace-nowrap select-none transition-opacity duration-150 animate-in fade-in zoom-in-95",
                className,
              )}
            >
              {content}
              {/* 12x6px Arrow */}
              <div
                style={{
                  left: `${coords.arrowLeft}px`,
                }}
                className={cn(
                  "absolute -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent",
                  coords.actualPlacement === "top" &&
                    "top-full border-t-[6px] border-t-neutral-900",
                  coords.actualPlacement === "bottom" &&
                    "bottom-full border-b-[6px] border-b-neutral-900",
                )}
              />
            </div>,
            document.body,
          )
        : null}

      {/* Render Inline (Fallback / untuk preview statis dokumentasi UI) */}
      {!usePortal && show && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs font-semibold font-label text-white bg-neutral-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150 animate-in fade-in zoom-in-95 select-none",
            placement === "top" &&
              "bottom-full mb-1.5 left-1/2 -translate-x-1/2",
            placement === "bottom" &&
              "top-full mt-1.5 left-1/2 -translate-x-1/2",
            className,
          )}
        >
          {content}
          {/* 12x6px Arrow */}
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent",
              placement === "top" &&
                "top-full border-t-[6px] border-t-neutral-900",
              placement === "bottom" &&
                "bottom-full border-b-[6px] border-b-neutral-900",
            )}
          />
        </div>
      )}
    </div>
  );
}
