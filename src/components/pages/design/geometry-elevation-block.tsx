import { SPACING_SCALE, RADIUS_SCALE, ELEVATION_SCALE } from "./design-data";
import { DocBlock } from "./doc-block";

/**
 * GeometryElevationBlock: Blok dokumentasi token Spacing, Radius, & Shadow (Figma Node 12:141).
 * Didesain 100% responsif agar seluruh kartu skala tetap proporsional dan tidak terpotong di layar HP.
 */
export function GeometryElevationBlock() {
  return (
    <DocBlock
      id="tokens-geometry"
      overline="Geometry & Elevation"
      nodeId="Node 12:141"
      title="Spacing, Radius, & Shadow Tokens"
      description="Ukuran jarak kelipatan 4px, kurva sudut membulat, serta efek pop shadow khas BBJ."
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Spacing Section */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="font-heading-h4 text-sm sm:text-base font-bold text-neutral-900">
            Spacing Scale (Base 4px)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
            {SPACING_SCALE.map((s) => (
              <div
                key={s.name}
                className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1 sm:space-y-1.5"
              >
                <div className="font-mono text-xs font-bold text-neutral-800">
                  {s.name}
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  {s.value}
                </div>
                <div className="h-4 flex items-center justify-center overflow-hidden">
                  <div
                    className="h-2 bg-brand/40 rounded-full max-w-full"
                    style={{ width: s.widthStyle }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radii Section */}
        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-neutral-100">
          <h4 className="font-heading-h4 text-sm sm:text-base font-bold text-neutral-900">
            Radius Scale
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
            {RADIUS_SCALE.map((r) => (
              <div
                key={r.name}
                className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`size-9 sm:size-10 mx-auto bg-brand/20 border-2 border-brand ${r.radiusClass}`}
                  />
                  <div className="font-mono text-xs font-bold text-neutral-900 mt-1.5">
                    {r.name}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500">
                    {r.value}
                  </div>
                </div>
                <div className="text-[10px] text-neutral-600 mt-1 break-words leading-tight">
                  {r.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elevation & Pop Shadows Section */}
        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-neutral-100">
          <h4 className="font-heading-h4 text-sm sm:text-base font-bold text-neutral-900">
            Elevation
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {ELEVATION_SCALE.map((e) => (
              <div
                key={e.name}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between min-h-28 sm:min-h-36 ${e.cardClass}`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm">{e.name}</div>
                  <div className="text-[11px] font-mono opacity-80 mt-0.5 break-words">
                    {e.desc}
                  </div>
                </div>
                <div className="text-xs font-semibold opacity-90 mt-2">
                  {e.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
