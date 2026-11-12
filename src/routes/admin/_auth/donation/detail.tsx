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
  calculateHeroesQuotaSummary,
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
import { Dialog } from "#/components/ui/dialog";
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
 * DonationDetailPage: Halaman Detail Donasi menampilkan Daftar Heroes, Daftar Surplus Food, Ringkasan Donasi, Catatan, dan Bagikan Impact.
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

  // State modal Konfirmasi Ambil & Keluarkan Hero (mengikuti aturan Dialog design.tsx)
  const [pickupTargetHero, setPickupTargetHero] =
    React.useState<DonationHeroClaimRecord | null>(null);
  const [isConfirmingPickup, setIsConfirmingPickup] = React.useState(false);

  const [removeTargetHero, setRemoveTargetHero] =
    React.useState<DonationHeroClaimRecord | null>(null);
  const [isRemovingHero, setIsRemovingHero] = React.useState(false);

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

  const heroesSummary = React.useMemo(
    () => calculateHeroesQuotaSummary(detail.heroes, detail.quotaTotal),
    [detail.heroes, detail.quotaTotal],
  );

  const computedStatus = React.useMemo(() => {
    if (detail.status === "Selesai") return "Selesai" as const;
    if (heroesSummary.isQuotaFull) return "Penuh" as const;
    return "Aktif" as const;
  }, [detail.status, heroesSummary.isQuotaFull]);

  const statusTone =
    computedStatus === "Aktif"
      ? "brand"
      : computedStatus === "Penuh"
        ? "warning"
        : "neutral";

  const handleAddHero = React.useCallback(
    (candidate: DonationHeroSearchOption) => {
      const generatedCode = String(100000 + (Date.now() % 900000));
      const newClaim: DonationHeroClaimRecord = {
        id: `claim-${Date.now()}`,
        heroId: candidate.id,
        name: candidate.name,
        sectorName: candidate.sectorName,
        beneficiaryName: candidate.beneficiaryName,
        claimCode: generatedCode,
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

  // Buka modal konfirmasi pengambilan donasi
  const handleRequestConfirmPickup = React.useCallback(
    (hero: DonationHeroClaimRecord) => {
      if (hero.status !== "belum-diambil") return;
      setPickupTargetHero(hero);
    },
    [],
  );

  const handleConfirmPickupAction = React.useCallback(() => {
    if (!pickupTargetHero) return;
    setIsConfirmingPickup(true);
    window.setTimeout(() => {
      setDetail((prev) => ({
        ...prev,
        heroes: prev.heroes.map((hero) =>
          hero.id === pickupTargetHero.id
            ? { ...hero, status: "sudah-diambil" }
            : hero,
        ),
      }));
      setIsConfirmingPickup(false);
      toast.success(
        `Pengambilan donasi oleh ${pickupTargetHero.name} berhasil dikonfirmasi.`,
      );
      setPickupTargetHero(null);
    }, 300);
  }, [pickupTargetHero]);

  // Buka modal konfirmasi keluarkan hero (tetap diizinkan setelah konfirmasi ambil)
  const handleRequestRemoveHero = React.useCallback(
    (hero: DonationHeroClaimRecord) => {
      if (hero.status === "tidak-jadi-ambil") return;
      setRemoveTargetHero(hero);
    },
    [],
  );

  const handleConfirmRemoveHero = React.useCallback(() => {
    if (!removeTargetHero) return;
    setIsRemovingHero(true);
    window.setTimeout(() => {
      const wasConfirmed = removeTargetHero.status === "sudah-diambil";

      setDetail((prev) => ({
        ...prev,
        heroes: wasConfirmed
          ? // Jika sudah konfirmasi ambil, status diubah menjadi tidak jadi ambil dan kuota hangus
            prev.heroes.map((item) =>
              item.id === removeTargetHero.id
                ? { ...item, status: "tidak-jadi-ambil" }
                : item,
            )
          : // Jika belum konfirmasi ambil, keluarkan sepenuhnya dan kembalikan kuota
            prev.heroes.filter((item) => item.id !== removeTargetHero.id),
      }));

      setIsRemovingHero(false);
      if (wasConfirmed) {
        toast.warning(
          `${removeTargetHero.name} dinyatakan tidak jadi ambil dan kuotanya hangus.`,
        );
      } else {
        toast.info(
          `${removeTargetHero.name} dikeluarkan dari daftar heroes donasi ini.`,
        );
      }
      setRemoveTargetHero(null);
    }, 300);
  }, [removeTargetHero]);

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

  const isRemovingConfirmedHero = removeTargetHero?.status === "sudah-diambil";

  return (
    <div className="space-y-6 w-full pb-8 animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Action Bar: Ringkasan Kuota, Badge Status, & Tombol Aksi Utama */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-neutral-600 tabular-nums">
            <Users className="size-4 text-neutral-500 shrink-0" />
            <span>
              Heroes:{" "}
              <strong className="font-semibold text-neutral-900">
                {heroesSummary.usedQuotaCount} / {detail.quotaTotal}
              </strong>
              {heroesSummary.forfeitedCount > 0 && (
                <span className="ml-1.5 text-xs text-red-700 font-semibold">
                  ({heroesSummary.forfeitedCount} kuota hangus)
                </span>
              )}
            </span>
          </div>

          <Badge
            tone={detail.program === "CSR" ? "accent" : "brand"}
            styleVariant="soft"
          >
            {detail.program}
          </Badge>

          <Badge tone={statusTone} styleVariant="soft" dot>
            {computedStatus}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            leftIcon={<Camera className="size-4" />}
            onClick={handleOpenDocumentation}
          >
            Dokumentasi
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
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
            onConfirmPickup={handleRequestConfirmPickup}
            onRemoveHero={handleRequestRemoveHero}
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

      {/* Modal Konfirmasi Ambil Donasi Hero (Dialog Default design.tsx) */}
      <Dialog
        isOpen={Boolean(pickupTargetHero)}
        onClose={() => {
          if (!isConfirmingPickup) setPickupTargetHero(null);
        }}
        tone="default"
        title="Konfirmasi Pengambilan Donasi?"
        description={
          pickupTargetHero
            ? `Apakah Anda yakin ${pickupTargetHero.name} sudah mengambil jatah donasi dari ${detail.donorName} untuk ${pickupTargetHero.beneficiaryName}?`
            : undefined
        }
        cancelText="Batal"
        confirmText="Konfirmasi Ambil"
        isConfirmLoading={isConfirmingPickup}
        onConfirm={handleConfirmPickupAction}
      />

      {/* Modal Konfirmasi Keluarkan Hero dari Donasi (Dialog Danger design.tsx) */}
      <Dialog
        isOpen={Boolean(removeTargetHero)}
        onClose={() => {
          if (!isRemovingHero) setRemoveTargetHero(null);
        }}
        tone="danger"
        title={
          isRemovingConfirmedHero
            ? "Keluarkan Hero yang Sudah Konfirmasi?"
            : "Keluarkan Hero dari Donasi?"
        }
        description={
          removeTargetHero
            ? isRemovingConfirmedHero
              ? `${removeTargetHero.name} sudah melakukan konfirmasi ambil pada donasi ${detail.donorName}. Jika dikeluarkan, ia dinyatakan Tidak Jadi Ambil dan kuota ini akan hangus (tidak kembali tersedia).`
              : `Apakah Anda yakin ingin mengeluarkan ${removeTargetHero.name} dari daftar heroes donasi ${detail.donorName}? Kuota klaim hero akan dilepaskan dan tersedia kembali.`
            : undefined
        }
        cancelText="Batal"
        confirmText={
          isRemovingConfirmedHero ? "Keluarkan & Hanguskan" : "Keluarkan Hero"
        }
        isConfirmLoading={isRemovingHero}
        onConfirm={handleConfirmRemoveHero}
      />

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
