import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, Share2, Users } from "lucide-react";
import { z } from "zod";
import {
  DonationDetailHeroesCard,
  DonationDetailImpactDialog,
  DonationDetailSidebar,
  DonationDetailSkeleton,
  DonationDetailSurplusCard,
  DonationDetailSurplusDialog,
  DonationSurplusDeleteDialog,
  defaultSearchableHeroPool,
  getDonationDetailById,
} from "#/components/pages/donation";
import type {
  DonationDetailRecord,
  DonationHeroClaimRecord,
  DonationHeroSearchOption,
  DonationSurplusFoodItem,
  DonationSurplusFormValues,
} from "#/components/pages/donation";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { useAdminLayout } from "#/routes/admin/_auth";

// Skema validasi parameter query URL untuk halaman detail donasi
const donationDetailSearchSchema = z.object({
  id: z.string().optional().catch(""),
  state: z.enum(["default", "empty"]).optional().catch(undefined),
});

export type DonationDetailSearchParams = z.infer<
  typeof donationDetailSearchSchema
>;

export const Route = createFileRoute("/admin/_auth/donation/detail")({
  validateSearch: (search: Record<string, unknown>) => {
    return donationDetailSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : undefined,
      state:
        search.state === "empty" ||
        search.empty === "1" ||
        search.empty === true
          ? "empty"
          : undefined,
    });
  },
  component: DonationDetailPage,
});

/**
 * DonationDetailPage: Halaman Detail Donasi menampilkan Daftar Heroes, Daftar Surplus Food, Ringkasan Donasi, Catatan, dan Bagikan Impact (Figma 123:4842 - 124:6103).
 */
function DonationDetailPage() {
  const { id = "", state } = Route.useSearch();
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const effectiveId = id.trim() ? id.trim() : "donasi-1";

  const [detail, setDetail] = React.useState<DonationDetailRecord>(() =>
    getDonationDetailById(effectiveId, state),
  );

  React.useEffect(() => {
    setDetail(getDonationDetailById(effectiveId, state));
  }, [effectiveId, state]);

  // Simulasi loading skeleton selama 3 detik setiap membuka/berganti detail donasi
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [effectiveId, state]);

  // Sinkronkan judul, subjudul tanggal, dan tombol Kembali pada Header Admin Layout
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: `Daftar Heroes ${detail.donorName}`,
      subtitle: `${detail.day}, ${detail.date}`,
      onBack: () => navigate({ to: "/admin/donation" }),
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, detail.donorName, detail.day, detail.date, navigate]);

  // State modal Surplus Food & Bagikan Impact
  const [surplusDialogMode, setSurplusDialogMode] = React.useState<
    "add" | "edit"
  >("add");
  const [isSurplusDialogOpen, setIsSurplusDialogOpen] = React.useState(false);
  const [editingFood, setEditingFood] =
    React.useState<DonationSurplusFoodItem | null>(null);
  const [deletingFood, setDeletingFood] =
    React.useState<DonationSurplusFoodItem | null>(null);
  const [isImpactDialogOpen, setIsImpactDialogOpen] = React.useState(false);

  const computedStatus = React.useMemo(() => {
    if (detail.status === "Selesai") return "Selesai" as const;
    if (detail.heroes.length >= detail.quotaTotal) return "Penuh" as const;
    return "Aktif" as const;
  }, [detail.status, detail.heroes.length, detail.quotaTotal]);

  const statusTone =
    computedStatus === "Aktif"
      ? "brand"
      : computedStatus === "Penuh"
        ? "warning"
        : "success";

  const handleAddHero = React.useCallback(
    (candidate: DonationHeroSearchOption) => {
      const newClaim: DonationHeroClaimRecord = {
        id: `claim-${Date.now()}`,
        heroId: candidate.id,
        name: candidate.name,
        sectorName: candidate.sectorName,
        beneficiaryName: candidate.beneficiaryName,
        status: "belum-diambil",
      };

      setDetail((prev) => ({
        ...prev,
        heroes: [newClaim, ...prev.heroes],
      }));
      toast.success(`${candidate.name} ditambahkan ke daftar heroes.`);
    },
    [],
  );

  const handleConfirmPickup = React.useCallback((claimId: string) => {
    setDetail((prev) => ({
      ...prev,
      heroes: prev.heroes.map((hero) =>
        hero.id === claimId ? { ...hero, status: "sudah-diambil" } : hero,
      ),
    }));
    toast.success("Status pengambilan donasi hero berhasil dikonfirmasi.");
  }, []);

  const handleRemoveHero = React.useCallback(
    (hero: DonationHeroClaimRecord) => {
      setDetail((prev) => ({
        ...prev,
        heroes: prev.heroes.filter((item) => item.id !== hero.id),
      }));
      toast.info(`${hero.name} dikeluarkan dari daftar heroes donasi ini.`);
    },
    [],
  );

  const handleOpenAddFood = React.useCallback(() => {
    setSurplusDialogMode("add");
    setEditingFood(null);
    setIsSurplusDialogOpen(true);
  }, []);

  const handleOpenEditFood = React.useCallback(
    (food: DonationSurplusFoodItem) => {
      setSurplusDialogMode("edit");
      setEditingFood(food);
      setIsSurplusDialogOpen(true);
    },
    [],
  );

  const handleSubmitFood = React.useCallback(
    (values: DonationSurplusFormValues) => {
      if (surplusDialogMode === "edit" && editingFood) {
        setDetail((prev) => ({
          ...prev,
          surplusFoods: prev.surplusFoods.map((item) =>
            item.id === editingFood.id ? { ...item, ...values } : item,
          ),
        }));
        toast.success(`Data makanan "${values.name}" berhasil diperbarui.`);
      } else {
        const createdFood: DonationSurplusFoodItem = {
          id: `food-${Date.now()}`,
          ...values,
        };
        setDetail((prev) => ({
          ...prev,
          surplusFoods: [...prev.surplusFoods, createdFood],
        }));
        toast.success(`"${values.name}" ditambahkan ke daftar surplus food.`);
      }
      setIsSurplusDialogOpen(false);
      setEditingFood(null);
    },
    [surplusDialogMode, editingFood],
  );

  const handleConfirmDeleteFood = React.useCallback(() => {
    if (!deletingFood) return;
    setDetail((prev) => ({
      ...prev,
      surplusFoods: prev.surplusFoods.filter(
        (item) => item.id !== deletingFood.id,
      ),
    }));
    toast.success(`Item "${deletingFood.name}" berhasil dihapus.`);
    setDeletingFood(null);
  }, [deletingFood]);

  const handleSaveNotes = React.useCallback((nextNotes: string) => {
    setDetail((prev) => ({ ...prev, notes: nextNotes }));
    toast.success("Catatan aksi donasi berhasil disimpan.");
  }, []);

  const handleOpenDocumentation = React.useCallback(() => {
    toast.info(
      `Membuka folder dokumentasi lapangan untuk ${detail.donorName}.`,
    );
  }, [detail.donorName]);

  if (isLoading) {
    return <DonationDetailSkeleton />;
  }

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Action Bar: Ringkasan Kuota, Badge Status, & Tombol Aksi Utama */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4d585b] tabular-nums">
            <Users className="size-4 text-[#007d85]" />
            <span>
              Heroes:{" "}
              <strong className="font-semibold text-[#142023]">
                {detail.heroes.length} / {detail.quotaTotal}
              </strong>
            </span>
          </span>

          <Badge tone={detail.program === "CSR" ? "accent" : "brand"}>
            {detail.program}
          </Badge>

          <Badge tone={statusTone} dot>
            {computedStatus}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            leftIcon={<Camera className="size-4" />}
            onClick={handleOpenDocumentation}
          >
            Dokumentasi
          </Button>
          <Button
            type="button"
            variant="primary"
            leftIcon={<Share2 className="size-4" />}
            onClick={() => setIsImpactDialogOpen(true)}
          >
            Bagikan Impact
          </Button>
        </div>
      </div>

      {/* Konten Utama 2 Kolom */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Kolom Kiri: Daftar Heroes & Daftar Surplus Food */}
        <div className="space-y-6 min-w-0">
          <DonationDetailHeroesCard
            heroes={detail.heroes}
            quotaTotal={detail.quotaTotal}
            searchableHeroes={defaultSearchableHeroPool}
            onAddHero={handleAddHero}
            onConfirmPickup={handleConfirmPickup}
            onRemoveHero={handleRemoveHero}
          />

          <DonationDetailSurplusCard
            foods={detail.surplusFoods}
            onAddFood={handleOpenAddFood}
            onEditFood={handleOpenEditFood}
            onDeleteFood={(food) => setDeletingFood(food)}
          />
        </div>

        {/* Kolom Kanan: Ringkasan Donasi & Catatan */}
        <DonationDetailSidebar detail={detail} onSaveNotes={handleSaveNotes} />
      </div>

      {/* Modal Tambah / Edit Surplus Food */}
      <DonationDetailSurplusDialog
        isOpen={isSurplusDialogOpen}
        mode={surplusDialogMode}
        initialFood={editingFood}
        onClose={() => {
          setIsSurplusDialogOpen(false);
          setEditingFood(null);
        }}
        onSubmit={handleSubmitFood}
      />

      {/* Modal Konfirmasi Hapus Surplus Food */}
      <DonationSurplusDeleteDialog
        food={deletingFood}
        onClose={() => setDeletingFood(null)}
        onConfirm={handleConfirmDeleteFood}
      />

      {/* Modal Bagikan Impact */}
      <DonationDetailImpactDialog
        isOpen={isImpactDialogOpen}
        detail={detail}
        onClose={() => setIsImpactDialogOpen(false)}
      />
    </div>
  );
}
