import * as React from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { cn } from "#/lib/utils";

export interface DocBlockProps {
  id?: string;
  overline?: string;
  nodeId?: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  copyCode?: string;
  copyTokenKey?: string;
  copiedToken?: string | null;
  onCopy?: (code: string, key?: string) => void;
  figmaUrl?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * DocBlock: Komponen kartu standar (1 kotak blok) untuk dokumentasi Design System BBJ.
 * Dilengkapi header responsif, badge Node Figma, tombol salin kode, tautan Figma,
 * serta padding adaptif untuk tampilan desktop dan layar HP/mobile.
 */
export function DocBlock({
  id,
  overline,
  nodeId,
  title,
  subtitle,
  description,
  icon,
  copyCode,
  copyTokenKey,
  copiedToken,
  onCopy,
  figmaUrl,
  children,
  className,
  contentClassName,
}: DocBlockProps) {
  const isCopied = copiedToken && copyTokenKey && copiedToken === copyTokenKey;

  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 p-4 sm:p-6 md:p-8 shadow-xs flex flex-col gap-5 sm:gap-6 overflow-hidden w-full",
        className,
      )}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-3">
          {icon && (
            <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold shrink-0 mt-0.5 sm:mt-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            {overline && (
              <span className="font-overline text-brand tracking-wider uppercase text-xs font-bold block">
                {overline}
              </span>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <h3 className="font-['Gabarito'] font-bold text-xl sm:text-2xl text-[#142023] tracking-tight">
                {title}
              </h3>
              {nodeId && (
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 shrink-0">
                  {nodeId}
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-xs text-neutral-500 font-mono block mt-0.5 truncate">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {(copyCode || figmaUrl) && (
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
            {copyCode && onCopy && (
              <button
                type="button"
                onClick={() => onCopy(copyCode, copyTokenKey)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {isCopied ? (
                  <>
                    <Check className="size-3.5 text-green-600 shrink-0" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 shrink-0" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
            )}

            {figmaUrl && (
              <a
                href={figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
                title="Buka di Figma"
              >
                <ExternalLink className="size-3 shrink-0" />
                <span>Figma</span>
              </a>
            )}
          </div>
        )}
      </div>

      {description && (
        <p className="font-['Josefin_Sans'] font-normal text-xs sm:text-sm leading-relaxed text-[#4d585b] max-w-[900px]">
          {description}
        </p>
      )}

      {/* Content Body */}
      <div className={cn("w-full min-w-0", contentClassName)}>{children}</div>
    </div>
  );
}
