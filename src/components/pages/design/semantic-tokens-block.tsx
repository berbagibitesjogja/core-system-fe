import {
  SEMANTIC_BG_TOKENS,
  SEMANTIC_BORDER_TOKENS,
  SEMANTIC_ICON_TOKENS,
  SEMANTIC_TEXT_TOKENS,
} from "./design-data";
import { DocBlock } from "./doc-block";

/**
 * SemanticTokensBlock: Blok matriks token semantik (Backgrounds, Texts, Borders, Icons).
 */
export function SemanticTokensBlock() {
  return (
    <DocBlock
      id="tokens-semantic"
      overline="Semantic Tokens"
      nodeId="Node 12:141"
      title="Semantic Tokens Matrix"
      description="Token semantik yang dipetakan ke Tailwind CSS v4 variables di src/styles.css."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Backgrounds */}
        <div className="space-y-3">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Backgrounds
          </h4>
          <div className="space-y-2 max-h-[320px] sm:max-h-[480px] overflow-y-auto pr-1">
            {SEMANTIC_BG_TOKENS.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs bg-white"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="size-4 rounded-md border border-black/10 shrink-0"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span className="font-mono font-bold text-neutral-800 truncate text-[11px] sm:text-xs">
                    {t.name}
                  </span>
                </div>
                <span className="font-mono text-neutral-500 text-[10px] shrink-0 ml-1">
                  {t.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Texts */}
        <div className="space-y-3">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Texts
          </h4>
          <div className="space-y-2 max-h-[320px] sm:max-h-[480px] overflow-y-auto pr-1">
            {SEMANTIC_TEXT_TOKENS.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs bg-white"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="size-4 rounded-md border border-black/10 shrink-0"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span className="font-mono font-bold text-neutral-800 truncate text-[11px] sm:text-xs">
                    {t.name}
                  </span>
                </div>
                <span className="font-mono text-neutral-500 text-[10px] shrink-0 ml-1">
                  {t.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Borders */}
        <div className="space-y-3">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Borders
          </h4>
          <div className="space-y-2 max-h-[320px] sm:max-h-[480px] overflow-y-auto pr-1">
            {SEMANTIC_BORDER_TOKENS.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs bg-white"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="size-4 rounded-md border border-black/10 shrink-0"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span className="font-mono font-bold text-neutral-800 truncate text-[11px] sm:text-xs">
                    {t.name}
                  </span>
                </div>
                <span className="font-mono text-neutral-500 text-[10px] shrink-0 ml-1">
                  {t.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className="space-y-3">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Icons
          </h4>
          <div className="space-y-2 max-h-[320px] sm:max-h-[480px] overflow-y-auto pr-1">
            {SEMANTIC_ICON_TOKENS.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs bg-white"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="size-4 rounded-md border border-black/10 shrink-0"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span className="font-mono font-bold text-neutral-800 truncate text-[11px] sm:text-xs">
                    {t.name}
                  </span>
                </div>
                <span className="font-mono text-neutral-500 text-[10px] shrink-0 ml-1">
                  {t.hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
