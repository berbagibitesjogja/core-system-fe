import * as React from "react";
import { AlertTriangle, HelpCircle, Navigation } from "lucide-react";
import { toast } from "sonner";
import { Button, Dialog } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface ModalBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * ModalBlock: Dokumentasi dialog konfirmasi sistem BBJ (Node 20:265).
 * Menampilkan 2 tone resmi (default & danger) serta tombol peluncur live dialog.
 */
export function ModalBlock({ onCopy, copiedToken }: ModalBlockProps) {
  const [isDefaultModalOpen, setIsDefaultModalOpen] = React.useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(false);

  const handleConfirmAction = (isDanger: boolean) => {
    setIsModalLoading(true);
    setTimeout(() => {
      setIsModalLoading(false);
      if (isDanger) {
        setIsDangerModalOpen(false);
        toast.error("Donasi berhasil dihapus secara permanen");
      } else {
        setIsDefaultModalOpen(false);
        toast.success("Penyaluran donasi berhasil dikonfirmasi!");
      }
    }, 1000);
  };

  return (
    <DocBlock
      id="doc-modal"
      nodeId="Node 20:265"
      title="4. Modal (Dialog)"
      subtitle="src/components/ui/dialog.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`<Dialog\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  tone="danger"\n  title="Hapus Donasi Makanan?"\n  description="Apakah Anda yakin ingin menghapus donasi dari Royal Ambarrukmo? Tindakan ini tidak dapat dibatalkan."\n  confirmText="Hapus Donasi"\n  onConfirm={() => {}}\n/>`}
      copyTokenKey="dialog-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-265"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Dialog konfirmasi (lebar 440px, rounded-3xl 24px). Tone Danger dipakai
        untuk semua aksi hapus (donasi, surplus food, beneficiary, sponsor,
        hero, volunteer, reimburse) dengan tombol Hapus merah. Sebut nama objek
        di pesan. Saat request berjalan, tombol konfirmasi masuk State Loading.
        Overlay: bg-neutral-900/50.
      </p>

      {/* 2 Tones Static Showcase */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Tone 1: Default */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 sm:p-6 space-y-4">
          <span className="font-label text-xs font-bold text-brand uppercase tracking-wider">
            1. Tone: Default (Konfirmasi Biasa / Simpan)
          </span>
          <div className="rounded-[24px] border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full bg-bondi-50 text-brand flex items-center justify-center shrink-0">
                <HelpCircle className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading-h3 text-lg font-bold text-neutral-900">
                  Konfirmasi Penyaluran Makanan
                </h4>
                <p className="font-body-m text-xs text-neutral-600">
                  Apakah Anda yakin ingin menyelesaikan penyaluran 75 porsi ke
                  Panti Asuhan Sinar Melati?
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button variant="secondary" size="md">
                Batal
              </Button>
              <Button variant="primary" size="md">
                Simpan Penyaluran
              </Button>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-center"
            onClick={() => setIsDefaultModalOpen(true)}
          >
            Buka Live Modal Default
          </Button>
        </div>

        {/* Tone 2: Danger */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 sm:p-6 space-y-4">
          <span className="font-label text-xs font-bold text-red-600 uppercase tracking-wider">
            2. Tone: Danger (Penghapusan / Pembatalan)
          </span>
          <div className="rounded-[24px] border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading-h3 text-lg font-bold text-neutral-900">
                  Hapus Data Donasi Makanan?
                </h4>
                <p className="font-body-m text-xs text-neutral-600">
                  Tindakan ini akan menghapus data donasi Hotel Tentrem secara
                  permanen dan tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button variant="secondary" size="md">
                Batal
              </Button>
              <Button variant="danger" size="md">
                Hapus Permanen
              </Button>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            className="w-full justify-center"
            onClick={() => setIsDangerModalOpen(true)}
          >
            Buka Live Modal Danger
          </Button>
        </div>
      </div>

      {/* Live Controlled Modals */}
      <Dialog
        isOpen={isDefaultModalOpen}
        onClose={() => setIsDefaultModalOpen(false)}
        tone="default"
        title="Konfirmasi Penyaluran Donasi"
        description="Apakah Anda yakin data donasi ini telah diterima dengan baik oleh perwakilan lembaga penerima?"
        confirmText="Simpan"
        isConfirmLoading={isModalLoading}
        onConfirm={() => handleConfirmAction(false)}
      />

      <Dialog
        isOpen={isDangerModalOpen}
        onClose={() => setIsDangerModalOpen(false)}
        tone="danger"
        title="Hapus Data Donasi Permanen?"
        description="Donasi nomor #DON-2026-081 akan dihapus permanen dari sistem dan seluruh laporan rekapitulasi."
        confirmText="Hapus Sekarang"
        isConfirmLoading={isModalLoading}
        onConfirm={() => handleConfirmAction(true)}
      />
    </DocBlock>
  );
}
