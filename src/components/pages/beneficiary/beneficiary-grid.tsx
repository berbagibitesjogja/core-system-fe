import { Button } from "#/components/ui/button";
import { BeneficiaryCard } from "#/components/shared/beneficiary-card";
import { EmptyState } from "#/components/shared/empty-state";
import type { BeneficiaryItem } from "./beneficiary-data";

export interface BeneficiaryGridProps {
  visibleItems: BeneficiaryItem[];
  totalFilteredCount: number;
  totalHeroesPool: number;
  searchQuery: string;
  userRole?: "super_admin" | "core" | "staff";
  onClearSearch: () => void;
  onResetFilter: () => void;
  onShowAll: () => void;
  onDetailItem: (item: BeneficiaryItem) => void;
  onEditItem: (item: BeneficiaryItem) => void;
  onDeleteItem: (item: BeneficiaryItem) => void;
}

/**
 * BeneficiaryGrid: Daftar kartu kelompok penerima manfaat beserta empty state dan footer tampilan.
 */
export function BeneficiaryGrid({
  visibleItems,
  totalFilteredCount,
  totalHeroesPool,
  searchQuery,
  userRole = "super_admin",
  onClearSearch,
  onResetFilter,
  onShowAll,
  onDetailItem,
  onEditItem,
  onDeleteItem,
}: BeneficiaryGridProps) {
  const canDeleteRole = userRole === "super_admin" || userRole === "core";
  const remainingCount = totalFilteredCount - visibleItems.length;

  if (visibleItems.length === 0) {
    const hasSearch = searchQuery.trim().length > 0;

    return (
      <div className="bg-white border border-neutral-200 rounded-2xl w-full shadow-xs">
        <EmptyState
          visual="illustration"
          title="Penerima tidak ditemukan"
          description={
            hasSearch
              ? "Tidak ada penerima manfaat yang cocok dengan kata kunci pencarian."
              : "Belum ada penerima manfaat yang tersedia pada kategori ini."
          }
          action={
            <Button
              variant="secondary"
              size="md"
              onClick={hasSearch ? onClearSearch : onResetFilter}
            >
              {hasSearch ? "Hapus pencarian" : "Tampilkan semua kategori"}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Grid kartu penerima manfaat */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {visibleItems.map((item) => {
          const sharePercent =
            totalHeroesPool > 0
              ? Math.round((item.heroesCount / totalHeroesPool) * 100)
              : 0;

          return (
            <BeneficiaryCard
              key={item.id}
              id={item.id}
              name={item.name}
              type={item.type}
              rank={`#${item.rank}`}
              avatarName={item.initial}
              heroesCount={item.heroesCount.toLocaleString("id-ID")}
              impactCount={item.impactKg.toLocaleString("id-ID")}
              impactUnit="Kg"
              sharePercent={sharePercent}
              shareText={`${sharePercent}% dari total heroes BBJ`}
              showDelete={canDeleteRole}
              onDetail={() => onDetailItem(item)}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
              className="max-w-none"
            />
          );
        })}
      </div>

      {/* Footer jumlah tampilan & tombol tampilkan lainnya */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <p className="font-['Josefin_Sans'] font-normal text-[12px] leading-[16px] text-[#6b777a]">
          Menampilkan {visibleItems.length} dari {totalFilteredCount} penerima
        </p>

        {remainingCount > 0 && (
          <Button variant="secondary" size="md" onClick={onShowAll}>
            Tampilkan {remainingCount} lainnya
          </Button>
        )}
      </div>
    </div>
  );
}
