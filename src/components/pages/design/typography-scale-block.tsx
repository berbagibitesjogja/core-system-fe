import { TYPOGRAPHY_SCALE } from "./design-data";
import { DocBlock } from "./doc-block";

/**
 * TypographyScaleBlock: Blok visual hierarki dan skala tipografi BBJ (Gabarito, Josefin Sans, Inter).
 */
export function TypographyScaleBlock() {
  return (
    <DocBlock
      id="tokens-typography"
      overline="Typography Scale"
      nodeId="Node 12:141"
      title="Skala Tipografi Visual"
      description="Daftar tingkatan teks Gabarito (Display & Heading), Josefin Sans (Body), dan Inter (Label)."
    >
      <div className="divide-y divide-neutral-100 overflow-hidden">
        {TYPOGRAPHY_SCALE.map((item) => (
          <div
            key={item.name}
            className="py-3.5 sm:py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2 sm:gap-4 overflow-hidden"
          >
            <div className="w-full md:w-56 shrink-0">
              <span className="font-mono text-xs font-bold text-brand block">
                {item.name}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500">
                {item.meta}
              </span>
            </div>
            <div
              className={`flex-1 break-words overflow-hidden text-ellipsis ${item.className}`}
            >
              {item.sample}
            </div>
          </div>
        ))}
      </div>
    </DocBlock>
  );
}
