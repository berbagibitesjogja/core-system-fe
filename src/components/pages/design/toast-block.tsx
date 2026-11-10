import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Navigation,
  XCircle,
} from "lucide-react";
import { Button, Toast, toast } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface ToastBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * ToastBlock: Dokumentasi notifikasi toast pop-up sistem BBJ (Node 20:312).
 * Menampilkan preview desain 4 tone resmi berlatar belakang tinta pekat (#142023)
 * serta tombol live trigger yang langsung memunculkan notifikasi nyata.
 */
export function ToastBlock({ onCopy, copiedToken }: ToastBlockProps) {
  return (
    <DocBlock
      id="doc-toast"
      nodeId="Node 20:312"
      title="5. Toast (Notifikasi Pop-up)"
      subtitle="src/components/ui/toast.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`toast.success("Donasi berhasil disimpan", {\n  action: {\n    label: "Lihat",\n    onClick: () => {}\n  }\n});`}
      copyTokenKey="toast-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-312"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Notifikasi sementara setelah aksi (simpan, hapus, gagal). Muncul di
        kanan atas (desktop) atau atas tengah (mobile), hilang otomatis 4 detik,
        error tetap sampai ditutup. Berlatar belakang warna tinta gelap pekat
        (#142023) dengan icon badge bulat 28px dan teks putih. Komponen ini
        menindih Sonner bawaan sehingga seluruh pemanggilan{" "}
        <code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
          toast.success()
        </code>
        ,{" "}
        <code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
          toast.error()
        </code>{" "}
        otomatis merender tampilan BBJ ini.
      </p>

      {/* 4 Tone Static Visual Preview */}
      <div className="space-y-3">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          Preview Desain 4 Tone Toast BBJ (Lebar 380px)
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 max-w-[820px]">
          {/* Success Toast */}
          <div className="space-y-1.5">
            <span className="font-label text-xs font-semibold text-green-700">
              Tone: Success (Simpan / Berhasil)
            </span>
            <Toast
              tone="success"
              message="Data donasi berhasil disimpan"
              actionLabel="Lihat"
              onAction={() => {}}
              onClose={() => {}}
            />
          </div>

          {/* Error Toast */}
          <div className="space-y-1.5">
            <span className="font-label text-xs font-semibold text-red-600">
              Tone: Error (Gagal / Dihapus)
            </span>
            <Toast
              tone="error"
              message="Gagal memproses unggahan invoice"
              actionLabel="Coba Lagi"
              onAction={() => {}}
              onClose={() => {}}
            />
          </div>

          {/* Warning Toast */}
          <div className="space-y-1.5">
            <span className="font-label text-xs font-semibold text-orange-600">
              Tone: Warning (Peringatan Kuota)
            </span>
            <Toast
              tone="warning"
              message="Kuota relawan hero hampir penuh"
              onClose={() => {}}
            />
          </div>

          {/* Info Toast */}
          <div className="space-y-1.5">
            <span className="font-label text-xs font-semibold text-blue-600">
              Tone: Info (Pemberitahuan Sistem)
            </span>
            <Toast
              tone="info"
              message="Sesi login diperbarui otomatis"
              onClose={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Interactive Toast Triggers */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div>
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Pemicu Notifikasi Toast Nyata (Sonner Override)
          </span>
          <p className="text-xs text-neutral-500">
            Klik salah satu tombol di bawah untuk memunculkan Toast di pojok
            kanan atas layar!
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() =>
              toast.success("Donasi 120 porsi berhasil dikonfirmasi!", {
                action: {
                  label: "Lihat Detail",
                  onClick: () => toast.info("Membuka detail donasi..."),
                },
              })
            }
          >
            <CheckCircle2 className="size-4" />
            <span>Trigger Toast Success</span>
          </Button>

          <Button
            variant="danger"
            size="md"
            onClick={() =>
              toast.error("Gagal menghubungkan ke server API BBJ.", {
                action: {
                  label: "Coba Lagi",
                  onClick: () => toast.info("Menghubungi ulang server..."),
                },
              })
            }
          >
            <XCircle className="size-4" />
            <span>Trigger Toast Error</span>
          </Button>

          <Button
            variant="accent"
            size="md"
            onClick={() =>
              toast.warning("Kuota penjemputan tersisa 2 hero relawan!")
            }
          >
            <AlertTriangle className="size-4" />
            <span>Trigger Toast Warning</span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              toast.info("Surplus food baru telah ditambahkan oleh mitra.")
            }
          >
            <Info className="size-4" />
            <span>Trigger Toast Info</span>
          </Button>
        </div>
      </div>
    </DocBlock>
  );
}
