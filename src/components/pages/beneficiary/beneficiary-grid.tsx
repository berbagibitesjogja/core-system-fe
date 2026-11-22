import { Button } from "#/components/ui/button";
import { BeneficiaryCard } from "#/components/shared/beneficiary-card";
import { EmptyState } from "#/components/shared/empty-state";
import { idBeneficiary } from "#/locales";
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-surface px-6 py-16 shadow-xs min-h-[380px] w-full text-center">
        <EmptyState
          visual="illustration"
          title={idBeneficiary.grid.emptyTitle}
          description={
            hasSearch
              ? idBeneficiary.grid.emptySearchDescription
              : idBeneficiary.grid.emptyCategoryDescription
          }
          action={
            <Button
              variant="secondary"
              size="md"
              onClick={hasSearch ? onClearSearch : onResetFilter}
            >
              {hasSearch
                ? idBeneficiary.grid.clearSearchAction
                : idBeneficiary.grid.showAllCategoriesAction}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Grid kartu penerima manfaat */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full auto-rows-fr">
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
              impactUnit={idBeneficiary.grid.impactUnit}
              sharePercent={sharePercent}
              shareText={idBeneficiary.grid.shareText(sharePercent)}
              showDelete={canDeleteRole}
              address={item.address}
              maps={item.maps}
              emailDomain={item.emailDomain}
              isPriority={item.isPriority}
              hidden={item.hidden}
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
        <p className="font-['Josefin_Sans'] font-normal text-[12px] leading-[16px] text-neutral-500">
          {idBeneficiary.grid.showingText(
            visibleItems.length,
            totalFilteredCount,
          )}
        </p>

        {remainingCount > 0 && (
          <Button variant="secondary" size="md" onClick={onShowAll}>
            {idBeneficiary.grid.showMore(remainingCount)}
          </Button>
        )}
      </div>
    </div>
  );
}
