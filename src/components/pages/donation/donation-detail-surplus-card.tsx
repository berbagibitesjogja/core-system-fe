import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { IconButton } from "#/components/ui/icon-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import {
  EmptyState,
  IllustrationCariKosong,
} from "#/components/shared/empty-state";
import type { DonationSurplusFoodItem } from "./donation-detail-data";

export interface DonationDetailSurplusCardProps {
  foods: DonationSurplusFoodItem[];
  onAddFood: () => void;
  onEditFood: (food: DonationSurplusFoodItem) => void;
  onDeleteFood: (food: DonationSurplusFoodItem) => void;
}

/**
 * DonationDetailSurplusCard: Menampilkan daftar makanan surplus beserta status basi/tidak layak dan aksi kelola.
 */
export function DonationDetailSurplusCard({
  foods,
  onAddFood,
  onEditFood,
  onDeleteFood,
}: DonationDetailSurplusCardProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
      {/* Header Kartu Daftar Surplus Food */}
      <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="font-heading text-lg font-semibold leading-6 text-neutral-900">
            Daftar Surplus Food
          </h2>
          <Badge tone="neutral" styleVariant="soft">
            {foods.length} jenis
          </Badge>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="size-4" />}
          onClick={onAddFood}
        >
          Tambah Makanan
        </Button>
      </div>

      {/* Konten Surplus Food */}
      {foods.length === 0 ? (
        <div className="flex items-center justify-center px-6 py-10">
          <EmptyState
            size="compact"
            visual="illustration"
            illustration={<IllustrationCariKosong />}
            title="Belum ada surplus food"
            description="Catat jenis makanan, jumlah, serta berat surplus yang diselamatkan pada aksi donasi ini."
            className="max-w-[380px] p-4"
          />
        </div>
      ) : (
        <>
          {/* Tabel Desktop */}
          <div className="hidden md:block">
            <Table containerClassName="rounded-none border-0 shadow-none">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="uppercase tracking-[0.04em]">
                    Nama Makanan
                  </TableHead>
                  <TableHead className="uppercase tracking-[0.04em]">
                    Jumlah
                  </TableHead>
                  <TableHead className="uppercase tracking-[0.04em]">
                    Berat
                  </TableHead>
                  <TableHead className="uppercase tracking-[0.04em]">
                    Keterangan
                  </TableHead>
                  <TableHead
                    align="right"
                    className="uppercase tracking-[0.04em]"
                  >
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foods.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans font-semibold text-sm text-neutral-900">
                          {item.name}
                        </span>
                        {item.isSpoiled && (
                          <Badge tone="danger" styleVariant="soft" dot>
                            Basi / Tidak Layak
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-sans text-sm text-neutral-600 tabular-nums">
                      {item.quantity !== undefined
                        ? `${item.quantity} pcs`
                        : "-"}
                    </TableCell>
                    <TableCell className="font-sans font-medium text-sm text-neutral-900 tabular-nums whitespace-nowrap">
                      {item.weight.toLocaleString("id-ID")} {item.unit}
                    </TableCell>
                    <TableCell className="font-sans text-sm text-neutral-600 max-w-[260px]">
                      <span className="line-clamp-2">
                        {item.notes?.trim() ? item.notes : "-"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1">
                        <IconButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`Edit ${item.name}`}
                          tooltip="Edit makanan"
                          onClick={() => onEditFood(item)}
                        >
                          <Pencil className="size-[18px]" />
                        </IconButton>
                        <IconButton
                          type="button"
                          variant="danger"
                          size="sm"
                          aria-label={`Hapus ${item.name}`}
                          tooltip="Hapus makanan"
                          onClick={() => onDeleteFood(item)}
                        >
                          <Trash2 className="size-[18px]" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Kartu Mobile */}
          <div className="md:hidden divide-y divide-neutral-100">
            {foods.map((item) => (
              <div key={item.id} className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-sans font-semibold text-sm text-neutral-900">
                        {item.name}
                      </p>
                      {item.isSpoiled && (
                        <Badge tone="danger" styleVariant="soft" dot>
                          Basi / Tidak Layak
                        </Badge>
                      )}
                    </div>
                    <p className="font-sans text-xs text-neutral-500 tabular-nums">
                      {item.quantity !== undefined
                        ? `${item.quantity} pcs · `
                        : ""}
                      {item.weight.toLocaleString("id-ID")} {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Edit ${item.name}`}
                      tooltip="Edit makanan"
                      onClick={() => onEditFood(item)}
                    >
                      <Pencil className="size-[18px]" />
                    </IconButton>
                    <IconButton
                      type="button"
                      variant="danger"
                      size="sm"
                      aria-label={`Hapus ${item.name}`}
                      tooltip="Hapus makanan"
                      onClick={() => onDeleteFood(item)}
                    >
                      <Trash2 className="size-[18px]" />
                    </IconButton>
                  </div>
                </div>

                {item.notes?.trim() && (
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
