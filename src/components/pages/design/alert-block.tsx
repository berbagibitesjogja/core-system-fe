import * as React from "react";
import { Navigation, RotateCcw } from "lucide-react";
import { Alert, Button } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface AlertBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * AlertBlock: Dokumentasi banner inline alert sistem BBJ (Node 20:359).
 * Menampilkan 4 tone resmi (info, success, warning, danger) dengan fungsi penutupan banner.
 */
export function AlertBlock({ onCopy, copiedToken }: AlertBlockProps) {
  const [alertDismissed, setAlertDismissed] = React.useState({
    info: false,
    success: false,
    warning: false,
    danger: false,
  });

  return (
    <DocBlock
      id="doc-alert"
      nodeId="Node 20:359"
      title="6. Alert"
      subtitle="src/components/ui/alert.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`<Alert\n  tone="danger"\n  title="Gagal Mengunggah Berkas"\n  description="Format berkas harus PDF, PNG, atau JPG maksimal 5 MB."\n  onClose={() => {}}\n/>`}
      copyTokenKey="alert-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-359"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Banner inline yang menetap di halaman: error login (not_registered,
        unauthorized_role, session_expired), hasil validasi form di atas
        formulir, penolakan invoice AI, peringatan kuota. Dilengkapi judul Inter
        SemiBold 14px dan deskripsi Josefin Sans Regular 12px.
      </p>

      {/* 4 Tone Alert Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Info */}
          {!alertDismissed.info && (
            <Alert
              tone="info"
              title="Pembaruan Jadwal Penjemputan"
              description="Penjemputan makanan surplus wilayah Sleman dialihkan ke pukul 19:30 WIB."
              onClose={() =>
                setAlertDismissed((prev) => ({ ...prev, info: true }))
              }
            />
          )}

          {/* Success */}
          {!alertDismissed.success && (
            <Alert
              tone="success"
              title="Validasi Akun Mitra Berhasil"
              description="Akun mitra donatur Anda telah terverifikasi untuk menyalurkan surplus makanan."
              onClose={() =>
                setAlertDismissed((prev) => ({ ...prev, success: true }))
              }
            />
          )}

          {/* Warning */}
          {!alertDismissed.warning && (
            <Alert
              tone="warning"
              title="Peringatan Kuota Bulanan"
              description="Lembaga telah mencapai 90% dari batas alokasi makanan bulan November."
              onClose={() =>
                setAlertDismissed((prev) => ({ ...prev, warning: true }))
              }
            />
          )}

          {/* Danger */}
          {!alertDismissed.danger && (
            <Alert
              tone="danger"
              title="Akses Ditolak (Unauthorized Role)"
              description="Anda tidak memiliki izin Super Admin untuk mengakses pengaturan log audit."
              onClose={() =>
                setAlertDismissed((prev) => ({ ...prev, danger: true }))
              }
            />
          )}
        </div>

        {(alertDismissed.info ||
          alertDismissed.success ||
          alertDismissed.warning ||
          alertDismissed.danger) && (
          <div className="pt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setAlertDismissed({
                  info: false,
                  success: false,
                  warning: false,
                  danger: false,
                })
              }
            >
              <RotateCcw className="size-3.5" />
              <span>Tampilkan Kembali Semua Alert</span>
            </Button>
          </div>
        )}
      </div>
    </DocBlock>
  );
}
