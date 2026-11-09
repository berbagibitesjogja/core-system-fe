import { Check, Copy } from "lucide-react";
import {
  BLUE_RAMP,
  BONDI_RAMP,
  ELEVATION_SCALE,
  GREEN_RAMP,
  NEUTRAL_RAMP,
  ORANGE_RAMP,
  RADIUS_SCALE,
  RED_RAMP,
  SEMANTIC_BG_TOKENS,
  SEMANTIC_BORDER_TOKENS,
  SEMANTIC_ICON_TOKENS,
  SEMANTIC_TEXT_TOKENS,
  SPACING_SCALE,
  SUNNY_RAMP,
  TYPOGRAPHY_SCALE,
} from "./design-data";

export interface FoundationsSectionProps {
  onCopy: (text: string, id?: string) => void;
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
        <h4 className="font-['Inter'] font-semibold text-sm text-[#142023]">
          {title}
        </h4>
        <span className="font-mono text-[11px] text-neutral-500">
          Klik swatch untuk salin HEX
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
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
              className={`${s.bg} p-2.5 rounded-xl flex flex-col justify-between h-20 shadow-xs border border-black/5 hover:scale-105 transition-all text-left group cursor-pointer relative overflow-hidden`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs font-bold ${isDark ? "text-white" : "text-[#142023]"}`}
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
                    className={`text-[9px] font-semibold block leading-tight ${isDark ? "text-white/80" : "text-[#142023]/80"}`}
                  >
                    {s.note}
                  </span>
                )}
                <span
                  className={`text-[10px] font-mono leading-none ${isDark ? "text-white/90" : "text-[#142023]/90"}`}
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

export function FoundationsSection({
  onCopy,
  copiedToken,
}: FoundationsSectionProps) {
  return (
    <section className="space-y-12 animate-in fade-in duration-200">
      {/* 1. Foundation / Cover & Principles */}
      <div className="rounded-3xl bg-white border border-neutral-200 p-8 shadow-xs">
        <div className="max-w-2xl">
          <span className="font-overline text-brand">
            Design System v1 · Admin
          </span>
          <h2 className="font-display-l text-neutral-900 mt-2">
            Berbagi Bites Jogja
          </h2>
          <p className="font-body-l text-neutral-600 mt-2">
            Fondasi visual & komponen untuk sistem manajemen BBJ. Fun & simple:
            hangat seperti komunitasnya, tetap rapi untuk kerja data harian
            relawan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-neutral-100">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <h4 className="font-heading-h4 text-neutral-900">
              Fun, tapi jelas
            </h4>
            <p className="font-body-s text-neutral-600 mt-1">
              Kuning aksen, sudut membulat, dan pop shadow dipakai hemat untuk
              momen penting. Tabel dan form tetap tenang supaya data mudah
              dipindai.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <h4 className="font-heading-h4 text-neutral-900">
              Satu aksi utama
            </h4>
            <p className="font-body-s text-neutral-600 mt-1">
              Satu tombol tosca solid per layar untuk alur utama. Aksi lain
              memakai secondary, ghost, atau outline.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <h4 className="font-heading-h4 text-neutral-900">Hormati role</h4>
            <p className="font-body-s text-neutral-600 mt-1">
              Aksi sensitif (hapus mitra, approve reimburse) diberi batas visual
              jelas (merah/danger, konfirmasi modal).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <h4 className="font-heading-h4 text-neutral-900">
              Mobile itu lapangan
            </h4>
            <p className="font-body-s text-neutral-600 mt-1">
              Relawan hero memakai hp saat penjemputan. Target sentuh minimal
              44px, teks terbaca di bawah matahari.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Color Ramp Section */}
      <div className="rounded-3xl bg-white border border-neutral-200 p-8 shadow-xs space-y-6">
        <div>
          <span className="font-overline text-brand">Color Ramps</span>
          <h3 className="font-heading-h2 text-neutral-900 mt-1">
            Palet Warna Primitif
          </h3>
          <p className="font-body-m text-neutral-600">
            Daftar skala saturasi warna dari 50 hingga 950 untuk tema tosca
            Bondi dan kuning Sunny.
          </p>
        </div>

        <div className="space-y-6">
          <PaletteRow
            title="Bondi (Brand & Primary)"
            shades={BONDI_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
          <PaletteRow
            title="Sunny (Aksen & CTA Fun)"
            shades={SUNNY_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
          <PaletteRow
            title="Green (Status: Selesai / Terverifikasi)"
            shades={GREEN_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
          <PaletteRow
            title="Orange (Status: Menunggu / Pending)"
            shades={ORANGE_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
          <PaletteRow
            title="Red (Status: Batal / Ditolak / Bahaya)"
            shades={RED_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
          <PaletteRow
            title="Blue (Status: Dalam Perjalanan / Info)"
            shades={BLUE_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
          <PaletteRow
            title="Neutral (Teks, Latar, Border)"
            shades={NEUTRAL_RAMP}
            onCopy={onCopy}
            copiedToken={copiedToken}
          />
        </div>
      </div>

      {/* 3. Semantic Tokens */}
      <div className="rounded-3xl bg-white border border-neutral-200 p-8 shadow-xs space-y-6">
        <div>
          <span className="font-overline text-brand">Design Tokens</span>
          <h3 className="font-heading-h2 text-neutral-900 mt-1">
            Semantic Tokens Matrix
          </h3>
          <p className="font-body-m text-neutral-600">
            Token semantik yang dipetakan ke Tailwind CSS v4 variables di{" "}
            <code className="text-brand font-mono font-bold">
              src/styles.css
            </code>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Backgrounds */}
          <div className="space-y-3">
            <h4 className="font-heading-h4 text-neutral-900 border-b border-neutral-100 pb-2">
              Backgrounds
            </h4>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
              {SEMANTIC_BG_TOKENS.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded-md border border-black/10 shrink-0"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="font-mono font-bold text-neutral-800">
                      {t.name}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-500 text-[10px]">
                    {t.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Texts */}
          <div className="space-y-3">
            <h4 className="font-heading-h4 text-neutral-900 border-b border-neutral-100 pb-2">
              Texts
            </h4>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
              {SEMANTIC_TEXT_TOKENS.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded-md border border-black/10 shrink-0"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="font-mono font-bold text-neutral-800">
                      {t.name}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-500 text-[10px]">
                    {t.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Borders */}
          <div className="space-y-3">
            <h4 className="font-heading-h4 text-neutral-900 border-b border-neutral-100 pb-2">
              Borders
            </h4>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
              {SEMANTIC_BORDER_TOKENS.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded-md border border-black/10 shrink-0"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="font-mono font-bold text-neutral-800">
                      {t.name}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-500 text-[10px]">
                    {t.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="space-y-3">
            <h4 className="font-heading-h4 text-neutral-900 border-b border-neutral-100 pb-2">
              Icons
            </h4>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
              {SEMANTIC_ICON_TOKENS.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-2 rounded-xl border border-neutral-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded-md border border-black/10 shrink-0"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="font-mono font-bold text-neutral-800">
                      {t.name}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-500 text-[10px]">
                    {t.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Typography Scale Section */}
      <div className="rounded-3xl bg-white border border-neutral-200 p-8 shadow-xs space-y-6">
        <div>
          <span className="font-overline text-brand">Typography Scale</span>
          <h3 className="font-heading-h2 text-neutral-900 mt-1">
            Skala Tipografi Visual
          </h3>
          <p className="font-body-m text-neutral-600">
            Daftar tingkatan teks Gabarito (Display & Heading), Josefin Sans
            (Body), dan Inter (Label).
          </p>
        </div>

        <div className="divide-y divide-neutral-100">
          {TYPOGRAPHY_SCALE.map((item) => (
            <div
              key={item.name}
              className="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4"
            >
              <div className="w-56 shrink-0">
                <span className="font-mono text-xs font-bold text-brand block">
                  {item.name}
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  {item.meta}
                </span>
              </div>
              <div className={`flex-1 ${item.className}`}>{item.sample}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Spacing, Radius, & Elevation */}
      <div className="rounded-3xl bg-white border border-neutral-200 p-8 shadow-xs space-y-8">
        <div>
          <span className="font-overline text-brand">Geometry & Elevation</span>
          <h3 className="font-heading-h2 text-neutral-900 mt-1">
            Spacing, Radius, &amp; Shadow Tokens
          </h3>
          <p className="font-body-m text-neutral-600">
            Ukuran jarak kelipatan 4px, kurva sudut membulat, serta efek pop
            shadow khas BBJ.
          </p>
        </div>

        {/* Spacing Section */}
        <div className="space-y-4">
          <h4 className="font-heading-h4 text-neutral-900">
            Spacing Scale (Base 4px)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {SPACING_SCALE.map((s) => (
              <div
                key={s.name}
                className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1.5"
              >
                <div className="font-mono text-xs font-bold text-neutral-800">
                  {s.name}
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  {s.value}
                </div>
                <div className="h-4 flex items-center justify-center">
                  <div
                    className="h-2 bg-brand/40 rounded-full"
                    style={{ width: s.widthStyle }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radii Section */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h4 className="font-heading-h4 text-neutral-900">Radius Scale</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {RADIUS_SCALE.map((r) => (
              <div
                key={r.name}
                className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1"
              >
                <div
                  className={`size-10 mx-auto bg-brand/20 border-2 border-brand ${r.radiusClass}`}
                />
                <div className="font-mono text-xs font-bold text-neutral-900">
                  {r.name}
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  {r.value}
                </div>
                <div className="text-[10px] text-neutral-600 mt-1">
                  {r.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elevation & Pop Shadows Section */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h4 className="font-heading-h4 text-neutral-900">Elevation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ELEVATION_SCALE.map((e) => (
              <div
                key={e.name}
                className={`p-5 rounded-2xl flex flex-col justify-between h-36 ${e.cardClass}`}
              >
                <div>
                  <div className="font-bold text-sm">{e.name}</div>
                  <div className="text-[11px] font-mono opacity-80 mt-0.5">
                    {e.desc}
                  </div>
                </div>
                <div className="text-xs font-semibold opacity-90">{e.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
