import * as React from "react";
import { Inbox, Package, RotateCcw, Search, Users } from "lucide-react";
import { Button } from "#/components/ui";
import { EmptyState } from "#/components/shared";
import { cn } from "#/lib/utils";
import { DocBlock } from "./doc-block";

export interface EmptyStateBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * EmptyStateBlock: Dokumentasi komponen kondisi kosong sistem BBJ (Node 21:287).
 * Menampilkan 4 varian resmi (2 size: default & compact × 2 visual: icon & illustration)
 * serta live tester interaktif.
 */
export function EmptyStateBlock({ onCopy, copiedToken }: EmptyStateBlockProps) {
  const [emptySize, setEmptySize] = React.useState<"default" | "compact">(
    "default",
  );
  const [emptyVisual, setEmptyVisual] = React.useState<"icon" | "illustration">(
    "icon",
  );
  const [showEmptyAction, setShowEmptyAction] = React.useState(true);

  return (
    <DocBlock
      id="doc-empty-state"
      nodeId="Node 21:287"
      title="7. Empty State"
      subtitle="src/components/ui/empty-state.tsx"
      copyCode={`<EmptyState\n  title="Belum ada data donasi"\n  description="Data akan muncul di sini setelah mitra menambahkan makanan surplus."\n  action={<Button variant="primary">Tambah Donasi</Button>}\n  size="default"\n  visual="icon"\n/>`}
      copyTokenKey="empty-state-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-287"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Kondisi data kosong atau pencarian tanpa hasil. Default (lebar 400px)
        untuk halaman/tabel utama, Compact (lebar 320px) untuk kartu dan
        dropdown. Dua varian visual: Icon (container rounded-2xl bg-bondi-50)
        atau Illustration (grafik ilustrasi flat Bondi). Copy hangat dan berikan
        langkah berikutnya yang jelas.
      </p>

      {/* 4-Variant Grid Showcase */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Variant 1: Default + Icon */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            1. Size: Default · Visual: Icon (400px)
          </span>
          <EmptyState
            title="Belum ada data donasi"
            description="Data donasi pangan akan muncul di sini setelah mitra mengirimkan formulir donasi."
            size="default"
            visual="icon"
            icon={<Package className="size-10 text-brand" />}
            action={<Button variant="primary">Tambah Donasi Baru</Button>}
          />
        </div>

        {/* Variant 2: Compact + Icon */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            2. Size: Compact · Visual: Icon (320px)
          </span>
          <EmptyState
            title="Tidak ada hasil pencarian"
            description="Coba ubah kata kunci atau hapus filter yang aktif saat ini."
            size="compact"
            visual="icon"
            icon={<Search className="size-7 text-brand" />}
            action={
              <Button variant="secondary" size="sm">
                Reset Filter
              </Button>
            }
          />
        </div>

        {/* Variant 3: Default + Illustration */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            3. Size: Default · Visual: Illustration (200px)
          </span>
          <EmptyState
            title="Daftar Relawan Kosong"
            description="Belum ada pendaftaran relawan gelombang baru untuk batch akhir pekan ini."
            size="default"
            visual="illustration"
            illustration={
              <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-bondi-50 to-sunny-50 text-brand p-4">
                <Users className="size-16 text-brand mb-1" />
                <span className="text-[11px] font-semibold text-neutral-600">
                  Ilustrasi Relawan BBJ
                </span>
              </div>
            }
            action={<Button variant="primary">Buka Pendaftaran</Button>}
          />
        </div>

        {/* Variant 4: Compact + Illustration */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            4. Size: Compact · Visual: Illustration (140px)
          </span>
          <EmptyState
            title="Notifikasi Kosong"
            description="Semua aktivitas donasi telah selesai ditinjau."
            size="compact"
            visual="illustration"
            illustration={
              <div className="flex size-full flex-col items-center justify-center bg-bondi-50 text-brand p-3">
                <Inbox className="size-10 text-brand mb-1" />
                <span className="text-[10px] font-semibold text-neutral-600">
                  Semua Terbaca
                </span>
              </div>
            }
          />
        </div>
      </div>

      {/* Live Interactive Empty State Tester */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Empty State Tester
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEmptySize("default");
              setEmptyVisual("icon");
              setShowEmptyAction(true);
            }}
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Pilih Ukuran (Size)
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setEmptySize("default")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  emptySize === "default"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Default (400px)
              </button>
              <button
                type="button"
                onClick={() => setEmptySize("compact")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  emptySize === "compact"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Compact (320px)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Gaya Tampilan (Visual)
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setEmptyVisual("icon")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  emptyVisual === "icon"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Icon
              </button>
              <button
                type="button"
                onClick={() => setEmptyVisual("illustration")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  emptyVisual === "illustration"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Illustration
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Tombol Aksi
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setShowEmptyAction(true)}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  showEmptyAction
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Tampilkan
              </button>
              <button
                type="button"
                onClick={() => setShowEmptyAction(false)}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  !showEmptyAction
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Sembunyikan
              </button>
            </div>
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
