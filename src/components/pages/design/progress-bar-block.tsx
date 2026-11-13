import * as React from "react";
import { Box } from "lucide-react";
import { ProgressBar } from "#/components/shared";
import { cn } from "#/lib/utils";
import { DocBlock } from "./doc-block";

export interface ProgressBarBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * ProgressBarBlock: Dokumentasi indikator progres kuota penyaluran sistem BBJ (Node 138:7817).
 * Menampilkan matriks skala 21-step (0% - 100%), 3 varian warna (brand, accent, success),
 * serta live interactive slider tester.
 */
export function ProgressBarBlock({
  onCopy,
  copiedToken,
}: ProgressBarBlockProps) {
  const [sliderProgress, setSliderProgress] = React.useState(65);

  return (
    <DocBlock
      id="doc-progress-bar"
      nodeId="Node 138:7817"
      title="13. Progress Bar"
      subtitle="src/components/shared/progress-bar.tsx"
      icon={<Box className="size-4" />}
      copyCode='<ProgressBar value={65} color="brand" showLabel />'
      copyTokenKey="progbar-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=138-7817&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Indikator progres kuota penyaluran makanan surplus dan kuota penerima
        manfaat. Track 6px pill (#e2e7e8) dengan rounded-[999px] dan fill bar
        tosca brand (#007d85), kuning accent (#f5bc00), atau hijau success
        (#15803d) (Figma Node 138:7817).
      </p>

      {/* 21-Step Scale Matrix (Figma Node 138:7817) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Figma Variant Set: 21 Steps (0% - 100% · Interval 5%)
          </span>
          <span className="font-mono text-xs text-neutral-400">
            Width: 300px · Height: 6px
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 p-4 bg-neutral-50/70 rounded-2xl border border-neutral-200 max-h-[340px] overflow-y-auto">
          {Array.from({ length: 21 }, (_, i) => i * 5).map((val) => (
            <div key={val} className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-neutral-500 w-12 shrink-0">
                {val}%
              </span>
              <div className="flex-1">
                <ProgressBar value={val} color="brand" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Variants */}
      <div className="space-y-3 pt-2 border-t border-neutral-100">
        <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Color Variants &amp; Label
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2 shadow-2xs">
            <span className="text-xs font-mono font-medium text-neutral-700 block">
              color="brand" (#007D85)
            </span>
            <ProgressBar value={75} color="brand" showLabel />
          </div>
          <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2 shadow-2xs">
            <span className="text-xs font-mono font-medium text-neutral-700 block">
              color="accent" (#F5BC00)
            </span>
            <ProgressBar value={50} color="accent" showLabel />
          </div>
          <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2 shadow-2xs">
            <span className="text-xs font-mono font-medium text-neutral-700 block">
              color="success" (#15803D)
            </span>
            <ProgressBar value={100} color="success" showLabel />
          </div>
        </div>
      </div>

      {/* Interactive Slider Tester */}
      <div className="pt-4 border-t border-neutral-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
            Live Interactive Slider Tester:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[0, 25, 50, 75, 100].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setSliderProgress(preset)}
                className={cn(
                  "px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer",
                  sliderProgress === preset
                    ? "bg-brand text-white font-bold"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700",
                )}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={sliderProgress}
            onChange={(e) => setSliderProgress(Number(e.target.value))}
            className="flex-1 accent-bondi-700 cursor-pointer"
          />
          <span className="font-mono text-sm font-bold text-neutral-800 w-12 text-right">
            {sliderProgress}%
          </span>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
          <ProgressBar value={sliderProgress} color="brand" showLabel />
        </div>
      </div>
    </DocBlock>
  );
}
