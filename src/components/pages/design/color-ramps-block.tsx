import { Check, Copy } from "lucide-react";
import {
  BLUE_RAMP,
  BONDI_RAMP,
  GREEN_RAMP,
  NEUTRAL_RAMP,
  ORANGE_RAMP,
  RED_RAMP,
  SUNNY_RAMP,
} from "./design-data";
import { DocBlock } from "./doc-block";

export interface ColorRampsBlockProps {
  onCopy: (hex: string) => void;
  copiedToken: string | null;
}

function PaletteRow({
  title,
  shades,
  onCopy,
  copiedToken,
}: {
  title: string;
  shades: Array<{ step: string; hex: string; bg: string; note?: string }>;
  onCopy: (hex: string) => void;
  copiedToken: string | null;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-[#142023]">
          {title}
        </h4>
        <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500">
          Klik swatch untuk salin HEX
        </span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-1.5 sm:gap-2">
        {shades.map((s) => {
          const stepNum = parseInt(s.step);
          const isDark =
            (!isNaN(stepNum) && stepNum >= 500) ||
            s.hex.toLowerCase() === "#142023" ||
            s.hex.toLowerCase() === "#0b1416";
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => onCopy(s.hex)}
              className={`${s.bg} p-2 sm:p-2.5 rounded-lg sm:rounded-xl flex flex-col justify-between h-16 sm:h-20 shadow-xs border border-black/5 hover:scale-105 transition-all text-left group cursor-pointer relative overflow-hidden`}
              title={`${title} ${s.step} (${s.hex})`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] sm:text-xs font-bold ${isDark ? "text-white" : "text-[#142023]"}`}
                >
                  {s.step}
                </span>
                {copiedToken === s.hex ? (
                  <Check className="size-3 text-green-400 shrink-0" />
                ) : (
                  <Copy
                    className={`size-3 opacity-0 group-hover:opacity-75 transition-opacity shrink-0 ${isDark ? "text-white" : "text-[#142023]"}`}
                  />
                )}
              </div>
              <div>
                {s.note && (
                  <span
                    className={`text-[8px] sm:text-[9px] font-semibold block leading-tight truncate ${isDark ? "text-white/80" : "text-[#142023]/80"}`}
                  >
                    {s.note}
                  </span>
                )}
                <span
                  className={`text-[9px] sm:text-[10px] font-mono leading-none ${isDark ? "text-white/90" : "text-[#142023]/90"}`}
                >
                  {s.hex}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * ColorRampsBlock: Blok dokumentasi palet warna primitif resmi BBJ (Node 12:141).
 */
export function ColorRampsBlock({ onCopy, copiedToken }: ColorRampsBlockProps) {
  return (
    <DocBlock
      id="tokens-color-ramps"
      overline="Color Ramps"
      nodeId="Node 12:141"
      title="Palet Warna Primitif"
      description="7 Skala warna utama BBJ: Bondi (brand), Sunny (aksen fun), Green (sukses), Orange (peringatan), Red (danger), Blue (info), dan Neutral (tinta & kanvas)."
    >
      <div className="space-y-5 sm:space-y-6">
        <PaletteRow
          title="Bondi (Brand)"
          shades={BONDI_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
        <PaletteRow
          title="Sunny (Aksen Fun)"
          shades={SUNNY_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
        <PaletteRow
          title="Green (Sukses)"
          shades={GREEN_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
        <PaletteRow
          title="Orange (Peringatan)"
          shades={ORANGE_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
        <PaletteRow
          title="Red (Bahaya)"
          shades={RED_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
        <PaletteRow
          title="Blue (Info)"
          shades={BLUE_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
        <PaletteRow
          title="Neutral (Tinta & Kanvas)"
          shades={NEUTRAL_RAMP}
          onCopy={onCopy}
          copiedToken={copiedToken}
        />
      </div>
    </DocBlock>
  );
}
