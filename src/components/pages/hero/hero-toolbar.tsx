import { Plus, Search, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Tooltip } from "#/components/ui/tooltip";
import { formatHeroCount } from "./hero-data";
import type { HeroBeneficiaryOption } from "./hero-data";
import { HeroSelectField } from "./hero-select-field";
import type { HeroSelectOption } from "./hero-select-field";

export interface HeroToolbarProps {
  beneficiaries: HeroBeneficiaryOption[];
  selectedBeneficiaryId: string;
  onBeneficiaryChange: (beneficiaryId: string) => void;
  selectedSectorId: string;
  onSectorChange: (sectorId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddHero: () => void;
}

/**
 * HeroToolbar: Toolbar penyaringan berjenjang Beneficiary -> Sektor, pencarian hero, dan tombol tambah hero.
 */
export function HeroToolbar({
  beneficiaries,
  selectedBeneficiaryId,
  onBeneficiaryChange,
  selectedSectorId,
  onSectorChange,
  searchQuery,
  onSearchChange,
  onAddHero,
}: HeroToolbarProps) {
  const activeBeneficiary = beneficiaries.find(
    (b) => b.id === selectedBeneficiaryId,
  );

  const beneficiaryOptions: HeroSelectOption[] = [
    { id: "all", label: "Semua Beneficiary" },
    ...beneficiaries.map((item) => ({
      id: item.id,
      label: item.name,
      meta: `${formatHeroCount(item.totalHeroesCount)} hero`,
    })),
  ];

  const sectorOptions: HeroSelectOption[] = activeBeneficiary
    ? [
        {
          id: "all",
          label: "Semua Sektor",
          meta: `${formatHeroCount(activeBeneficiary.totalHeroesCount)} hero`,
        },
        ...activeBeneficiary.sectors.map((sec) => ({
          id: sec.id,
          label: sec.name,
          meta: `${formatHeroCount(sec.heroesCount)} hero`,
        })),
      ]
    : [];

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs w-full">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
        {/* Pilihan Beneficiary */}
        <div className="w-full lg:w-[240px] shrink-0">
          <HeroSelectField
            value={selectedBeneficiaryId}
            options={beneficiaryOptions}
            placeholder="Semua Beneficiary"
            onChange={onBeneficiaryChange}
            searchable={beneficiaries.length > 7}
            searchPlaceholder="Cari beneficiary..."
            menuClassName="lg:w-[280px]"
          />
        </div>

        {/* Pilihan Sektor (aktif setelah beneficiary dipilih) */}
        <div className="w-full lg:w-[210px] shrink-0">
          <HeroSelectField
            value={activeBeneficiary ? selectedSectorId : ""}
            options={sectorOptions}
            placeholder="Pilih beneficiary dulu"
            onChange={onSectorChange}
            disabled={!activeBeneficiary}
            searchable
            searchPlaceholder="Cari sektor..."
            emptyText="Sektor tidak ditemukan"
            menuClassName="lg:w-[280px]"
          />
        </div>

        {/* Kolom pencarian */}
        <div className="flex-1 min-w-0">
          <Input
            showLabel={false}
            showHelper={false}
            className="max-w-none"
            placeholder="Cari hero (nama atau no. telp)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leadingIcon={<Search className="size-5 text-neutral-400" />}
            trailingIcon={
              searchQuery ? (
                <Tooltip content="Hapus pencarian" placement="top">
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="p-0.5 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                    aria-label="Hapus pencarian"
                  >
                    <X className="size-4" />
                  </button>
                </Tooltip>
              ) : undefined
            }
          />
        </div>

        {/* Tombol aksi tambah hero */}
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="size-5" />}
          className="shrink-0 w-full sm:w-auto"
          onClick={onAddHero}
        >
          Tambah Hero
        </Button>
      </div>
    </div>
  );
}
