import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import {
  CHART_Y_GRID_LABELS,
  DEFAULT_FOOD_CHART_DATA,
  DEFAULT_HEROES_CHART_DATA,
  FOOD_CHART_Y_GRID_LABELS,
} from "./dashboard-data";
import type { FoodChartPoint, HeroesChartPoint } from "./dashboard-data";

export interface DashboardChartsRowProps {
  heroesData?: HeroesChartPoint[];
  foodData?: FoodChartPoint[];
}

/**
 * DashboardChartsRow: Dua kartu grafik interaktif berbasis data konfigurasi terpisah: Statistik Heroes (Area/Line) & Statistik Makanan (Bar).
 */
export function DashboardChartsRow({
  heroesData = DEFAULT_HEROES_CHART_DATA,
  foodData = DEFAULT_FOOD_CHART_DATA,
}: DashboardChartsRowProps) {
  const [selectedPoint, setSelectedPoint] = React.useState<number | null>(5); // Default: Nov (index 5)
  const [selectedBar, setSelectedBar] = React.useState<number | null>(5); // Default: Nov (index 5)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Kartu 1: Statistik Heroes */}
      <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="space-y-4">
          {/* Header Grafik */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-heading-h4 text-base sm:text-lg font-semibold text-neutral-900 leading-tight">
                Statistik Heroes
              </h4>
              <p className="font-sans text-xs text-neutral-500 mt-0.5">
                Jumlah heroes penerima makanan per bulan
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-2xs select-none">
              <span>6 bulan terakhir</span>
              <ChevronDown className="size-3.5 text-neutral-500" />
            </div>
          </div>

          {/* Ringkasan Nilai & Tren */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                3.020
              </span>
              <span className="font-label text-sm font-semibold text-neutral-500">
                orang
              </span>
            </div>
            <Badge
              tone="success"
              styleVariant="soft"
              className="h-5 px-2 text-[11px]"
            >
              +9,5%
            </Badge>
            <span className="font-sans text-xs text-neutral-500">
              dibanding Oktober
            </span>
          </div>

          {/* Canvas Plot Heroes (Area / Line SVG) */}
          <div className="relative h-52 sm:h-56 w-full pt-4 select-none">
            {/* Grid Garis Horizontal & Label Y */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pl-10 pr-2 pointer-events-none">
              {CHART_Y_GRID_LABELS.map((grid, idx) => (
                <div key={idx} className="flex items-center w-full">
                  <span className="-ml-10 w-8 text-right font-sans text-xs text-neutral-400">
                    {grid.label}
                  </span>
                  <div className="ml-2 w-full border-b border-dashed border-neutral-200" />
                </div>
              ))}
            </div>

            {/* SVG Wave Line & Area */}
            <svg
              className="absolute inset-0 size-full pl-10 pr-4 pb-6 overflow-visible"
              viewBox="0 0 500 160"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heroesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007d85" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#007d85" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Shading */}
              <path
                d="M 20,94 C 80,82 140,78 180,74 C 240,68 300,52 350,44 C 410,34 460,28 480,24 L 480,160 L 20,160 Z"
                fill="url(#heroesGradient)"
              />

              {/* Garis Kurva */}
              <path
                d="M 20,94 C 80,82 140,78 180,74 C 240,68 300,52 350,44 C 410,34 460,28 480,24"
                fill="none"
                stroke="#007d85"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Titik Point Interaktif */}
              {[
                { cx: 20, cy: 94 },
                { cx: 110, cy: 80 },
                { cx: 200, cy: 72 },
                { cx: 290, cy: 56 },
                { cx: 380, cy: 40 },
                { cx: 480, cy: 24 },
              ].map((pt, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => setSelectedPoint(idx)}
                >
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r={selectedPoint === idx ? 6 : 4}
                    fill="white"
                    stroke="#007d85"
                    strokeWidth={selectedPoint === idx ? 3 : 2}
                    className="transition-all"
                  />
                </g>
              ))}
            </svg>

            {/* Tooltip Mengambang */}
            {selectedPoint !== null && (
              <div
                className="absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white shadow-md pointer-events-none transition-all duration-150"
                style={{
                  left: `${(selectedPoint / 5) * 82 + 14}%`,
                  top: `${heroesData[selectedPoint].yPct - 4}%`,
                }}
              >
                {heroesData[selectedPoint].display}
              </div>
            )}

            {/* Sumbu X Bulan */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between pl-12 pr-4 font-sans text-xs text-neutral-500">
              {heroesData.map((d, i) => (
                <span
                  key={i}
                  className={
                    selectedPoint === i ? "font-semibold text-neutral-900" : ""
                  }
                >
                  {d.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kartu 2: Statistik Makanan */}
      <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="space-y-4">
          {/* Header Grafik */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-heading-h4 text-base sm:text-lg font-semibold text-neutral-900 leading-tight">
                Statistik Makanan
              </h4>
              <p className="font-sans text-xs text-neutral-500 mt-0.5">
                Berat makanan yang diselamatkan per bulan
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-2xs select-none">
              <span>6 bulan terakhir</span>
              <ChevronDown className="size-3.5 text-neutral-500" />
            </div>
          </div>

          {/* Ringkasan Nilai & Tren */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                624
              </span>
              <span className="font-label text-sm font-semibold text-neutral-500">
                Kg
              </span>
            </div>
            <Badge
              tone="success"
              styleVariant="soft"
              className="h-5 px-2 text-[11px]"
            >
              +6,1%
            </Badge>
            <span className="font-sans text-xs text-neutral-500">
              dibanding Oktober
            </span>
          </div>

          {/* Canvas Plot Makanan (Bar Chart) */}
          <div className="relative h-52 sm:h-56 w-full pt-4 select-none">
            {/* Grid Garis Horizontal & Label Y */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pl-10 pr-2 pointer-events-none">
              {FOOD_CHART_Y_GRID_LABELS.map((grid, idx) => (
                <div key={idx} className="flex items-center w-full">
                  <span className="-ml-10 w-8 text-right font-sans text-xs text-neutral-400">
                    {grid.label}
                  </span>
                  <div className="ml-2 w-full border-b border-dashed border-neutral-200" />
                </div>
              ))}
            </div>

            {/* Batang Bar Chart */}
            <div className="absolute inset-0 flex items-end justify-between pl-12 pr-4 pb-6 pt-6">
              {foodData.map((d, i) => {
                const isSelected = selectedBar === i;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedBar(i)}
                    className="relative flex flex-col items-center flex-1 max-w-[48px] h-full justify-end cursor-pointer group"
                  >
                    {/* Tooltip di atas batang aktif */}
                    {isSelected && (
                      <div className="absolute -top-7 z-10 whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white shadow-md animate-in fade-in-50">
                        {d.display}
                      </div>
                    )}

                    <div
                      style={{ height: `${d.heightPct}%` }}
                      className={`w-8 sm:w-9 rounded-t-lg transition-all duration-200 ${
                        isSelected
                          ? "bg-sunny-400 border-[1.5px] border-neutral-900 shadow-sm"
                          : "bg-sunny-200 hover:bg-sunny-300"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Sumbu X Bulan */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between pl-12 pr-4 font-sans text-xs text-neutral-500">
              {foodData.map((d, i) => (
                <span
                  key={i}
                  className={`w-8 sm:w-9 text-center ${
                    selectedBar === i ? "font-semibold text-neutral-900" : ""
                  }`}
                >
                  {d.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
