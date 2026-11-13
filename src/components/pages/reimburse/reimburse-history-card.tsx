import { FileText } from "lucide-react";
import {
  EmptyState,
  IllustrationCariKosong,
} from "#/components/shared/empty-state";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { REIMBURSE_STATUS_BADGE_TONE, formatRupiah } from "./reimburse-data";
import type { ReimburseHistoryItem } from "./reimburse-data";

export interface ReimburseHistoryCardProps {
  items: ReimburseHistoryItem[];
  onPreviewFile: (item: ReimburseHistoryItem) => void;
  onPreviewTransferProof: (item: ReimburseHistoryItem) => void;
}

interface HistoryCardAction {
  id: string;
  label: string;
  onClick: () => void;
}

/**
 * ReimburseHistoryCard: Panel samping kanan yang menampilkan daftar riwayat pengajuan
 * beserta highlight item baru dan empty state compact (Figma 152:22507, 152:23846).
 */
export function ReimburseHistoryCard({
  items,
  onPreviewFile,
  onPreviewTransferProof,
}: ReimburseHistoryCardProps) {
  return (
    <aside
      aria-label="Riwayat Pengajuan Reimburse"
      className="w-full xl:w-[440px] shrink-0 rounded-lg border border-neutral-200 bg-surface p-6 flex flex-col gap-4 shadow-xs"
    >
      {/* Header Panel Riwayat */}
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
          Riwayat Pengajuan
        </h2>
        <p className="font-body text-xs leading-4 text-neutral-500">
          Pantau status pengajuan reimburse kamu
        </p>
      </div>

      {/* Konten Daftar atau Empty State */}
      {items.length === 0 ? (
        <div className="flex w-full items-center justify-center py-4">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationCariKosong />}
            title="Belum ada pengajuan"
            description="Belum ada riwayat pengajuan reimburse. Pengajuan pertamamu akan muncul di sini."
            className="max-w-none px-4 py-8"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {items.map((item) => {
            const cardActions: HistoryCardAction[] = [
              {
                id: "invoice",
                label: "Invoice",
                onClick: () => onPreviewFile(item),
              },
              ...(item.status === "Selesai"
                ? [
                    {
                      id: "transfer-proof",
                      label: "Bukti transfer",
                      onClick: () => onPreviewTransferProof(item),
                    },
                  ]
                : []),
            ];

            return (
              <article
                key={item.id}
                className={cn(
                  "rounded-md border border-neutral-200 p-4 flex flex-col gap-2 transition-colors duration-200 motion-reduce:transition-none",
                  item.isHighlighted ? "bg-bondi-50" : "bg-surface",
                )}
              >
                {/* Metode, Nomor Tujuan, Tanggal, dan Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-label text-sm font-semibold leading-5 text-neutral-900 truncate">
                      {item.method}
                    </p>
                    <p className="font-sans text-xs font-medium leading-4 text-neutral-500 truncate">
                      {item.destinationNumber} · {item.dateLabel}
                    </p>
                  </div>
                  <Badge
                    tone={REIMBURSE_STATUS_BADGE_TONE[item.status]}
                    styleVariant="soft"
                    dot
                    className="shrink-0"
                  >
                    {item.status}
                  </Badge>
                </div>

                {/* Nominal Terdeteksi / Diajukan */}
                <p className="font-heading text-xl font-bold leading-6 text-brand-strong">
                  {formatRupiah(item.amount)}
                </p>

                {/* Catatan Keperluan */}
                <p className="font-body text-xs leading-4 text-neutral-600">
                  {item.note}
                </p>

                {/* Tautan Berkas Invoice & Bukti Transfer */}
                <div className="flex flex-col items-start gap-1">
                  {cardActions.map((action) => (
                    <Button
                      key={action.id}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={action.onClick}
                      leftIcon={<FileText className="size-3.5" />}
                      className="h-auto px-1.5 py-0.5 -ml-1.5 gap-1 text-xs leading-4 text-brand hover:bg-bondi-100/60"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </aside>
  );
}
