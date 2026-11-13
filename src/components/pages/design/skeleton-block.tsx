import * as React from "react";
import { HeartHandshake } from "lucide-react";
import { Avatar, Badge, Button, Skeleton } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface SkeletonBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * SkeletonBlock: Dokumentasi placeholder loading sistem BBJ (Node 20:378).
 * Menampilkan 3 bentuk resmi (text, circle, block) serta simulasi perbandingan loading layout interaktif.
 */
export function SkeletonBlock({ onCopy, copiedToken }: SkeletonBlockProps) {
  const [isSkeletonActive, setIsSkeletonActive] = React.useState(false);

  return (
    <DocBlock
      id="doc-skeleton"
      nodeId="Node 20:378"
      title="8. Skeleton"
      subtitle="src/components/ui/skeleton.tsx"
      copyCode={`<div className="space-y-3">\n  <Skeleton shape="circle" />\n  <Skeleton shape="text" className="w-48" />\n  <Skeleton shape="block" className="h-28" />\n</div>`}
      copyTokenKey="skeleton-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-378"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Placeholder loading untuk kartu metrik, avatar profil, grafik, dan baris
        tabel. Animasi shimmer kiri ke kanan 1.2 detik (pulse). Susun Skeleton
        mengikuti bentuk konten akhir sehingga transisi data terasa halus tanpa
        layout shift.
      </p>

      {/* 3 Shapes Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="font-label text-xs font-bold text-neutral-900">
              1. Shape: Text
            </span>
            <span className="text-xs text-neutral-500">
              Tinggi 12px · rounded
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            Untuk placeholder judul, subjudul, dan keterangan baris teks.
          </p>
          <div className="space-y-2 pt-2">
            <Skeleton shape="text" className="w-full" />
            <Skeleton shape="text" className="w-3/4" />
            <Skeleton shape="text" className="w-1/2" />
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="font-label text-xs font-bold text-neutral-900">
              2. Shape: Circle
            </span>
            <span className="text-xs text-neutral-500">
              40×40px · rounded-full
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            Untuk placeholder avatar pengguna, ikon aksi, dan lencana bulat.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Skeleton shape="circle" className="size-8" />
            <Skeleton shape="circle" className="size-10" />
            <Skeleton shape="circle" className="size-14" />
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="font-label text-xs font-bold text-neutral-900">
              3. Shape: Block
            </span>
            <span className="text-xs text-neutral-500">
              Tinggi 120px · rounded-2xl
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            Untuk kartu statistik, media cover donasi, dan banner dialog.
          </p>
          <div className="pt-2">
            <Skeleton shape="block" className="h-[120px]" />
          </div>
        </div>
      </div>

      {/* Live Loading Simulation: Complex Card */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-700">
              Simulasi Loading Layout (Perbandingan Nyata)
            </span>
            <p className="text-xs text-neutral-500">
              Uji coba animasi Skeleton saat data sedang dimuat vs data siap.
            </p>
          </div>
          <Button
            variant={isSkeletonActive ? "primary" : "secondary"}
            size="sm"
            onClick={() => setIsSkeletonActive(!isSkeletonActive)}
            className="self-start sm:self-auto shrink-0"
          >
            {isSkeletonActive ? "Tampilkan Data Asli" : "Simulasikan Loading"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Card 1: Stat Card Simulation */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
            {isSkeletonActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton shape="text" className="w-36 h-4" />
                  <Skeleton shape="circle" className="size-10" />
                </div>
                <div className="space-y-2">
                  <Skeleton shape="text" className="w-28 h-9" />
                  <Skeleton shape="text" className="w-44 h-3.5" />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label text-sm font-semibold text-neutral-600">
                    Makanan Tersalurkan
                  </span>
                  <div className="size-10 rounded-xl bg-bondi-50 flex items-center justify-center text-brand">
                    <HeartHandshake className="size-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-number-xl text-neutral-900">
                    12.450
                  </span>
                  <span className="font-label font-semibold text-base text-neutral-600">
                    Porsi
                  </span>
                </div>
                <p className="text-xs text-green-700 font-semibold">
                  +18% dari target kuartal ini
                </p>
              </div>
            )}
          </div>

          {/* Card 2: User Row Simulation */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
            {isSkeletonActive ? (
              <div className="flex items-center gap-3.5">
                <Skeleton shape="circle" className="size-12" />
                <div className="flex-1 space-y-2">
                  <Skeleton shape="text" className="w-3/4 h-4" />
                  <Skeleton shape="text" className="w-1/2 h-3" />
                </div>
                <Skeleton shape="block" className="size-8 rounded-full" />
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    size="md"
                    shape="circle"
                  />
                  <div>
                    <p className="font-label text-sm font-bold text-neutral-900">
                      Utari Galih Maharani
                    </p>
                    <p className="text-xs text-neutral-500">
                      Koordinator Wilayah Sleman
                    </p>
                  </div>
                </div>
                <Badge tone="brand" styleVariant="soft" dot>
                  Admin Core
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
