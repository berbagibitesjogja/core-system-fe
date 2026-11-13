import * as React from "react";
import { Download, QrCode } from "lucide-react";
import { toast } from "#/components/ui/toast";
import ribbonTrailLoopSvg from "#/assets/illustrations/ribbon-trail-loop.svg";
import volunteerHighFivePng from "#/assets/illustrations/volunteer-high-five.png";
import { Button } from "#/components/ui/button";
import {
  calculateHeroesQuotaSummary,
  calculateSurplusSummary,
  formatShortPosterDate,
} from "./donation-detail-data";
import type { DonationDetailRecord } from "./donation-detail-data";

export interface DonationDetailImpactDialogProps {
  isOpen: boolean;
  detail: DonationDetailRecord;
  onClose: () => void;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal memuat gambar: ${src}`));
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * DonationDetailImpactDialog: Modal pratinjau poster Impact Report 1080x1920 beserta export PNG (Figma 124:5832).
 */
export function DonationDetailImpactDialog({
  isOpen,
  detail,
  onClose,
}: DonationDetailImpactDialogProps) {
  const [isExporting, setIsExporting] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const heroesSummary = React.useMemo(
    () => calculateHeroesQuotaSummary(detail.heroes, detail.quotaTotal),
    [detail.heroes, detail.quotaTotal],
  );
  const surplusSummary = React.useMemo(
    () => calculateSurplusSummary(detail.surplusFoods),
    [detail.surplusFoods],
  );
  const shortDate = React.useMemo(
    () => formatShortPosterDate(detail.date),
    [detail.date],
  );

  const posterMetrics = React.useMemo(
    () => [
      {
        id: "heroes",
        label: "Heroes",
        value: `${heroesSummary.activeHeroesCount} orang`,
      },
      {
        id: "weight",
        label: "Surplus food",
        value: surplusSummary.totalWeightFormatted,
      },
      {
        id: "types",
        label: "Jenis makanan",
        value: `${detail.surplusFoods.length} jenis`,
      },
      { id: "date", label: "Tanggal", value: shortDate },
    ],
    [
      heroesSummary.activeHeroesCount,
      detail.surplusFoods.length,
      shortDate,
      surplusSummary.totalWeightFormatted,
    ],
  );

  const handleDownloadPoster = async () => {
    setIsExporting(true);
    try {
      const width = 1080;
      const height = 1920;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context tidak tersedia");

      // Latar belakang utama poster teal
      ctx.fillStyle = "#009ca6";
      ctx.fillRect(0, 0, width, height);

      // Aksen pita dekoratif penuh di bagian atas
      try {
        const ribbonImg = await loadImage(ribbonTrailLoopSvg);
        const ribbonWidth = width * 1.18;
        const ribbonHeight = ribbonWidth * (184.608 / 406);
        ctx.save();
        ctx.globalAlpha = 0.88;
        ctx.drawImage(
          ribbonImg,
          -width * 0.08,
          -height * 0.015,
          ribbonWidth,
          ribbonHeight,
        );
        ctx.restore();
      } catch {
        // Lewati jika browser memblokir decode SVG ke canvas
      }

      // Pill badge program
      const badgeLabel =
        detail.program === "CSR" ? "AKSI CSR" : "AKSI FOOD RESCUE";
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      drawRoundedRect(ctx, 84, 110, 320, 56, 28);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 24px Inter, sans-serif";
      ctx.fillText(badgeLabel, 114, 146);
      ctx.restore();

      // Judul utama
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 92px Gabarito, sans-serif";
      ctx.fillText("Impact Report", 84, 272);

      // Pill nama sponsor
      const sponsorText = `bersama ${detail.donorName}`;
      ctx.font = "700 32px Inter, sans-serif";
      const sponsorWidth = Math.min(
        ctx.measureText(sponsorText).width + 72,
        912,
      );
      ctx.fillStyle = "#f5bc00";
      drawRoundedRect(ctx, 84, 314, sponsorWidth, 66, 33);
      ctx.fill();
      ctx.fillStyle = "#142023";
      ctx.fillText(sponsorText, 120, 358);

      // Grid 2x2 Metrik Impact
      const cardWidth = 440;
      const cardHeight = 200;
      const startX = 84;
      const startY = 450;
      const gap = 32;

      posterMetrics.forEach((metric, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = startX + col * (cardWidth + gap);
        const y = startY + row * (cardHeight + gap);

        ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
        drawRoundedRect(ctx, x, y, cardWidth, cardHeight, 32);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.84)";
        ctx.font = "500 28px Inter, sans-serif";
        ctx.fillText(metric.label, x + 36, y + 68);

        ctx.fillStyle = "#ffffff";
        ctx.font = "700 52px Gabarito, sans-serif";
        ctx.fillText(metric.value, x + 36, y + 146);
      });

      // Ilustrasi utama relawan
      try {
        const heroImg = await loadImage(volunteerHighFivePng);
        ctx.drawImage(heroImg, 130, 960, 820, 546);
      } catch {
        // Fallback aman jika gagal memuat aset
      }

      // Garis pembatas footer
      ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(84, 1630);
      ctx.lineTo(996, 1630);
      ctx.stroke();

      // Teks ajakan footer
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "500 28px Inter, sans-serif";
      ctx.fillText("Join the mission", 84, 1720);

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 40px Gabarito, sans-serif";
      ctx.fillText("berbagibitesjogja.com", 84, 1780);

      // Kotak QR di pojok kanan bawah
      ctx.fillStyle = "#ffffff";
      drawRoundedRect(ctx, 852, 1676, 144, 144, 20);
      ctx.fill();
      ctx.fillStyle = "#142023";
      ctx.font = "700 28px Inter, sans-serif";
      ctx.fillText("BBJ QR", 872, 1758);

      const dataUrl = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = "BBJ-Impact-Report.png";
      anchor.click();
      toast.success("Poster Impact berhasil diunduh (BBJ-Impact-Report.png).");
    } catch {
      toast.error("Gagal membuat poster impact. Silakan coba lagi.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-[1px] animate-in fade-in duration-150 motion-reduce:animate-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="impact-dialog-title"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-[780px] max-h-[92vh] overflow-y-auto shadow-[0px_20px_24px_rgba(20,32,35,0.18)] border border-neutral-100 animate-in zoom-in-95 duration-150 motion-reduce:animate-none">
        <div className="grid grid-cols-1 md:grid-cols-[310px_1fr] gap-6 items-stretch">
          {/* Kolom Kiri: Pratinjau Poster 9:16 */}
          <div className="flex items-center justify-center">
            <div className="aspect-[9/16] w-full max-w-[300px] mx-auto rounded-lg bg-bondi-500 text-white p-5 relative overflow-hidden flex flex-col justify-between shadow-md select-none">
              <img
                src={ribbonTrailLoopSvg}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -top-[1.5%] -left-[8%] w-[118%] max-w-none h-auto opacity-90"
                draggable={false}
              />

              {/* Bagian Atas Poster */}
              <div className="relative z-10 space-y-2.5">
                <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase text-white">
                  {detail.program === "CSR" ? "AKSI CSR" : "AKSI FOOD RESCUE"}
                </span>

                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-[26px] leading-[1.1] tracking-tight">
                    Impact Report
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-sunny-500 px-3 py-1 font-sans text-[11px] font-bold text-neutral-900 max-w-full truncate">
                    bersama {detail.donorName}
                  </span>
                </div>

                {/* Grid Metrik 2x2 */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {posterMetrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="rounded-md bg-white/15 border border-white/20 px-2.5 py-2 backdrop-blur-[2px]"
                    >
                      <p className="font-sans text-[10px] text-white/85">
                        {metric.label}
                      </p>
                      <p className="font-heading font-bold text-[15px] leading-tight text-white truncate">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ilustrasi Relawan */}
              <div className="relative z-10 flex items-center justify-center py-1">
                <img
                  src={volunteerHighFivePng}
                  alt="Ilustrasi relawan Berbagi Bites Jogja"
                  className="w-full max-h-[155px] object-contain drop-shadow-sm"
                  draggable={false}
                />
              </div>

              {/* Footer Poster */}
              <div className="relative z-10 flex items-center justify-between gap-2 pt-2.5 border-t border-white/25">
                <div className="min-w-0">
                  <p className="font-sans text-[10px] text-white/85">
                    Join the mission
                  </p>
                  <p className="font-heading font-bold text-[13px] truncate">
                    berbagibitesjogja.com
                  </p>
                </div>
                <div
                  className="size-10 shrink-0 rounded-sm bg-white text-neutral-900 flex items-center justify-center shadow-xs"
                  aria-label="QR Code berbagibitesjogja.com"
                >
                  <QrCode className="size-7" />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Panel Unduh & Ringkasan */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h2
                  id="impact-dialog-title"
                  className="font-heading-h3 text-neutral-900"
                >
                  Bagikan Impact
                </h2>
                <p className="font-sans text-sm text-neutral-600 mt-1">
                  Unduh poster laporan dampak siap unggah untuk Instagram Story
                  maupun laporan kepada mitra donatur.
                </p>
              </div>

              <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 space-y-2.5">
                <p className="font-label text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Ringkasan Data Poster
                </p>
                <div className="grid grid-cols-2 gap-3 font-sans text-sm">
                  <div>
                    <p className="text-xs text-neutral-500">Mitra Donatur</p>
                    <p className="font-semibold text-neutral-900">
                      {detail.donorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Program</p>
                    <p className="font-semibold text-neutral-900">
                      {detail.program}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Total Heroes</p>
                    <p className="font-semibold text-neutral-900">
                      {heroesSummary.activeHeroesCount} orang
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Surplus Tercatat</p>
                    <p className="font-semibold text-neutral-900">
                      {surplusSummary.totalWeightFormatted} (
                      {detail.surplusFoods.length} jenis)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="primary"
                className="w-full"
                leftIcon={<Download className="size-4" />}
                isLoading={isExporting}
                onClick={handleDownloadPoster}
              >
                Download Poster Impact
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={onClose}
              >
                Tutup
              </Button>
              <p className="font-sans text-xs text-neutral-500 text-center">
                Format PNG 1080 × 1920 px · BBJ-Impact-Report.png
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
