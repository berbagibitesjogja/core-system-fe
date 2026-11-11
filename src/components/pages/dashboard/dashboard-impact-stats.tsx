import { Heart, Leaf, Package } from "lucide-react";
import { StatCard } from "#/components/shared/stat-card";
import statFastFoodSvg from "#/assets/illustrations/stat-fast-food.svg";
import statOrganicFoodSvg from "#/assets/illustrations/stat-organic-food.svg";
import statCharityHeroesSvg from "#/assets/illustrations/stat-charity-heroes.svg";

/**
 * DashboardImpactStats: Bagian kartu metrik dampak kumulatif BBJ dengan ilustrasi latar.
 */
export function DashboardImpactStats() {
  return (
    <section className="space-y-3">
      {/* Header Bagian */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading-h4 text-lg font-semibold text-neutral-900 leading-tight">
          Dampak Kami
        </h3>
        <span className="font-sans text-xs text-neutral-500">
          Akumulasi sejak BBJ berdiri
        </span>
      </div>

      {/* Grid 3 Kartu Metrik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Metrik 1: Food Rescue */}
        <StatCard
          title="Food Rescue"
          value="372"
          unit="Aksi"
          styleVariant="brand"
          icon={<Package className="size-5 text-white" />}
          trend={{
            value: "+18 aksi",
            label: "bulan ini",
            isPositive: true,
          }}
          className="relative min-h-[148px]"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 top-2 size-48 lg:size-52 pointer-events-none select-none opacity-85"
          >
            <img
              src={statFastFoodSvg}
              alt=""
              className="size-full object-contain pointer-events-none select-none"
            />
          </div>
        </StatCard>

        {/* Metrik 2: Makanan Diselamatkan */}
        <StatCard
          title="Makanan Diselamatkan"
          value="3.077"
          unit="Kg"
          styleVariant="default"
          icon={<Leaf className="size-5 text-brand" />}
          trend={{
            value: "+624 Kg",
            label: "bulan ini",
            isPositive: true,
          }}
          className="relative min-h-[148px] bg-white"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 top-2 size-48 lg:size-52 pointer-events-none select-none opacity-85"
          >
            <img
              src={statOrganicFoodSvg}
              alt=""
              className="size-full object-contain pointer-events-none select-none"
            />
          </div>
        </StatCard>

        {/* Metrik 3: Total Heroes */}
        <StatCard
          title="Total Heroes"
          value="14.933"
          unit="Orang"
          styleVariant="default"
          icon={<Heart className="size-5 text-brand" />}
          trend={{
            value: "+3.020 orang",
            label: "bulan ini",
            isPositive: true,
          }}
          className="relative min-h-[148px] bg-white md:col-span-2 lg:col-span-1"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 top-2 size-48 lg:size-52 pointer-events-none select-none opacity-85"
          >
            <img
              src={statCharityHeroesSvg}
              alt=""
              className="size-full object-contain pointer-events-none select-none"
            />
          </div>
        </StatCard>
      </div>
    </section>
  );
}
