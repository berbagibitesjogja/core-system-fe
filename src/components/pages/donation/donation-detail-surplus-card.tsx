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
 * DonationDetailSurplusCard: Menampilkan daftar makanan surplus beserta status basi/tidak layak dan aksi kelola (Figma 123:4842, 124:6103).
 */
export function DonationDetailSurplusCard({
  foods,
  onAddFood,
  onEditFood,
  onDeleteFood,
}: DonationDetailSurplusCardProps) {
  return (
    <section className="rounded-[24px] border border-neutral-200 bg-white shadow-xs overflow-hidden">
      {/* Header Kartu Daftar Surplus Food */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="font-['Gabarito'] font-semibold text-[18px] leading-[26px] text-[#142023]">
            Daftar Surplus Food
          </h2>
          <Badge tone="neutral">{foods.length} jenis</Badge>
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
        <div className="p-6">
          <EmptyState
            illustration={<IllustrationCariKosong />}
            title="Belum ada surplus food"
            description="Catat jenis makanan, jumlah, serta berat surplus yang diselamatkan pada aksi donasi ini."
          />
        </div>
      ) : (
        <>
          {/* Tabel Desktop */}
          <div className="hidden md:block">
            <Table containerClassName="rounded-none border-0 shadow-none">
              <TableHeader className="bg-[#eef1f2]">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Nama Makanan</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Berat</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foods.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-[#142023]">
                          {item.name}
                        </span>
                        {item.isSpoiled && (
                          <Badge tone="danger" dot>
                            Basi / Tidak Layak
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#4d585b] tabular-nums">
                      {item.quantity !== undefined
                        ? `${item.quantity} pcs`
                        : "-"}
                    </TableCell>
                    <TableCell className="font-medium text-[#142023] tabular-nums whitespace-nowrap">
                      {item.weight.toLocaleString("id-ID")} {item.unit}
                    </TableCell>
                    <TableCell className="text-[#4d585b] max-w-[260px]">
                      <span className="line-clamp-2">
                        {item.notes?.trim() ? item.notes : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <IconButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`Edit ${item.name}`}
                          tooltip="Edit makanan"
                          onClick={() => onEditFood(item)}
                        >
                          <Pencil className="size-4" />
                        </IconButton>
                        <IconButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`Hapus ${item.name}`}
                          tooltip="Hapus makanan"
                          onClick={() => onDeleteFood(item)}
                          className="text-neutral-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
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
                      <p className="font-semibold text-[14px] text-[#142023]">
                        {item.name}
                      </p>
                      {item.isSpoiled && (
                        <Badge tone="danger" dot>
                          Basi / Tidak Layak
                        </Badge>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6b777a] tabular-nums">
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
                      <Pencil className="size-4" />
                    </IconButton>
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Hapus ${item.name}`}
                      tooltip="Hapus makanan"
                      onClick={() => onDeleteFood(item)}
                      className="text-neutral-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </IconButton>
                  </div>
                </div>

                {item.notes?.trim() && (
                  <p className="text-[12px] text-[#4d585b] leading-relaxed">
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
