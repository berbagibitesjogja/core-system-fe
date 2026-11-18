import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Camera, Sparkles } from "lucide-react";
import { z } from "zod";
import {
  DONATION_STATUS_BADGE_TONE,
  DonationDetailHeroesCard,
  DonationDetailImpactDialog,
  DonationDetailSidebar,
  DonationDetailSkeleton,
  DonationDetailSurplusCard,
  DonationDetailSurplusDialog,
  DonationSurplusDeleteDialog,
  calculateHeroesQuotaSummary,
  defaultSearchableHeroPool,
} from "#/components/pages/donation";
import type {
  DonationHeroClaimRecord,
  DonationHeroSearchOption,
  DonationSurplusFoodItem,
  DonationSurplusFormValues,
} from "#/components/pages/donation";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Dialog } from "#/components/ui/dialog";
import { toast } from "#/components/ui/toast";
import { getHeroAvatarSrc } from "#/lib/avatars";
import { idDonation } from "#/locales";
import { useAdminLayout } from "#/routes/admin/_auth";
import {
  createFoodItem,
  getDonationAttendances,
  getDonationDetail,
  getFoodItems,
  mapDonationToDetailRecord,
  markHeroAttendance,
  updateDonation,
} from "#/services/donationService";
import type { DonationFoodPayload } from "#/services/donationService";
import { isApiError } from "#/services/errorService";

// Skema validasi parameter query URL untuk halaman detail donasi
const donationDetailSearchSchema = z.object({
  id: z.string().optional().catch(""),
});

export type DonationDetailSearchParams = z.infer<
  typeof donationDetailSearchSchema
>;

export const Route = createFileRoute("/admin/_auth/donation/detail")({
  validateSearch: (search: Record<string, unknown>) => {
    return donationDetailSearchSchema.parse({
      id: typeof search.id === "string" ? search.id : undefined,
    });
  },
  component: DonationDetailPage,
});

/**
 * DonationDetailPage: Halaman Detail Donasi menampilkan Daftar Heroes, Daftar Surplus Food,
 * Ringkasan Donasi, Catatan, dan Bagikan Impact berbasis data produksi API riil.
 */
function DonationDetailPage() {
  const { id = "" } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const getDonationDetailFn = useServerFn(getDonationDetail);
  const getDonationAttendancesFn = useServerFn(getDonationAttendances);
  const markHeroAttendanceFn = useServerFn(markHeroAttendance);
  const updateDonationFn = useServerFn(updateDonation);
  const getFoodItemsFn = useServerFn(getFoodItems);
  const createFoodItemFn = useServerFn(createFoodItem);

  const trimmedId = id.trim();

  // Redirect jika parameter ID tidak valid
  React.useEffect(() => {
    if (!trimmedId) {
      toast.error("ID donasi tidak ditemukan.");
      navigate({ to: "/admin/donation" });
    }
  }, [trimmedId, navigate]);

  // Query detail donasi dari backend
  const donationQuery = useQuery({
    queryKey: ["donation-detail", trimmedId],
    queryFn: async () => {
      if (!trimmedId) return null;
      return getDonationDetailFn({ data: { id: trimmedId } });
    },
    enabled: Boolean(trimmedId),
  });

  // Query daftar presensi & klaim heroes dari backend
  const attendancesQuery = useQuery({
    queryKey: ["donation-attendances", trimmedId],
    queryFn: async () => {
      if (!trimmedId) return null;
      return getDonationAttendancesFn({ data: { id: trimmedId, limit: 100 } });
    },
    enabled: Boolean(trimmedId),
  });

  // Query katalog master food items untuk autocomplete input makanan
  const foodItemsQuery = useQuery({
    queryKey: ["food-items-autocomplete"],
    queryFn: async () => {
      return getFoodItemsFn({ data: { limit: 150 } });
    },
  });

  React.useEffect(() => {
    if (donationQuery.isError) {
      toast.error("Data donasi tidak ditemukan di server.");
      navigate({ to: "/admin/donation" });
    }
  }, [donationQuery.isError, navigate]);

  // State heroes yang ditambahkan manual oleh admin di donasi ini
  const [manualHeroes, setManualHeroes] = React.useState<
    DonationHeroClaimRecord[]
  >([]);

  // Pemetaan detail record dari respons API riil digabungkan dengan hero manual
  const detail = React.useMemo(() => {
    const rawDonation = donationQuery.data?.data;
    if (!rawDonation) return null;

    const rawAttendances = attendancesQuery.data?.data ?? [];
    const baseDetail = mapDonationToDetailRecord(rawDonation, rawAttendances);

    // Gabungkan hero yang mendaftar otomatis via API dengan hero yang ditambahkan manual
    const existingHeroIds = new Set(baseDetail.heroes.map((h) => h.heroId));
    const activeManualHeroes = manualHeroes.filter(
      (m) => !existingHeroIds.has(m.heroId),
    );

    return {
      ...baseDetail,
      heroes: [...activeManualHeroes, ...baseDetail.heroes],
    };
  }, [donationQuery.data, attendancesQuery.data, manualHeroes]);

  const isLoading = donationQuery.isLoading || !detail;

  // Sinkronkan judul, subjudul tanggal, dan tombol Kembali pada Header Admin Layout
  React.useEffect(() => {
    if (!setHeaderOverride || !detail) return;

    setHeaderOverride({
      title: `Daftar Heroes ${detail.donorName}`,
      subtitle: `${detail.day}, ${detail.date}`,
      onBack: () => navigate({ to: "/admin/donation" }),
      backLabel: "Kembali",
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride, detail, navigate]);

  // State modal Konfirmasi Ambil & Keluarkan Hero
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
  const [isSubmittingFood, setIsSubmittingFood] = React.useState(false);
  const [editingFood, setEditingFood] =
    React.useState<DonationSurplusFoodItem | null>(null);
  const [deletingFood, setDeletingFood] =
    React.useState<DonationSurplusFoodItem | null>(null);
  const [isDeletingFood, setIsDeletingFood] = React.useState(false);
  const [isImpactDialogOpen, setIsImpactDialogOpen] = React.useState(false);

  const heroesSummary = React.useMemo(() => {
    if (!detail) {
      return {
        claimedCount: 0,
        quotaTotal: 0,
        attendedCount: 0,
        unattendedCount: 0,
        isQuotaFull: false,
      };
    }
    return calculateHeroesQuotaSummary(detail.heroes, detail.quotaTotal);
  }, [detail]);

  const computedStatus = React.useMemo(() => {
    if (!detail) return "Aktif" as const;
    if (detail.status === "Selesai") return "Selesai" as const;
    if (heroesSummary.isQuotaFull) return "Penuh" as const;
    return "Aktif" as const;
  }, [detail, heroesSummary.isQuotaFull]);

  const statusTone = DONATION_STATUS_BADGE_TONE[computedStatus];

  const handleAddHero = React.useCallback(
    (candidate: DonationHeroSearchOption) => {
      const newClaimRecord: DonationHeroClaimRecord = {
        id: `manual-${candidate.id}-${Date.now()}`,
        heroId: candidate.id,
        name: candidate.name,
        avatarSrc: getHeroAvatarSrc({
          id: candidate.id,
          name: candidate.name,
        }),
        sectorName: candidate.sectorName,
        beneficiaryName: candidate.beneficiaryName,
        claimCode: `CLM-${Math.floor(100000 + Math.random() * 900000)}`,
        status: "belum-diambil",
      };

      setManualHeroes((prev) => [newClaimRecord, ...prev]);
      toast.success(
        `${candidate.name} berhasil ditambahkan ke daftar hero donasi.`,
      );
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

  const handleConfirmPickupAction = React.useCallback(async () => {
    if (!pickupTargetHero || !trimmedId) return;
    setIsConfirmingPickup(true);

    try {
      if (pickupTargetHero.id.startsWith("manual-")) {
        // Hero ditambahkan manual: update status secara lokal
        const currentHours = new Date().getHours().toString().padStart(2, "0");
        const currentMinutes = new Date()
          .getMinutes()
          .toString()
          .padStart(2, "0");
        setManualHeroes((prev) =>
          prev.map((h) =>
            h.id === pickupTargetHero.id
              ? {
                  ...h,
                  status: "sudah-diambil",
                  claimedAt: `${currentHours}.${currentMinutes} WIB`,
                }
              : h,
          ),
        );
      } else {
        // Hero terdaftar otomatis dari API backend
        await markHeroAttendanceFn({
          data: {
            donationId: trimmedId,
            attendanceId: pickupTargetHero.id,
            status: "attended",
          },
        });

        await queryClient.invalidateQueries({
          queryKey: ["donation-attendances", trimmedId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["donation-detail", trimmedId],
        });
        await queryClient.invalidateQueries({ queryKey: ["donations"] });
      }

      toast.success(idDonation.detail.toasts.attendanceAttendedSuccess);
      setPickupTargetHero(null);
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idDonation.detail.toasts.attendanceFailed);
      }
    } finally {
      setIsConfirmingPickup(false);
    }
  }, [pickupTargetHero, trimmedId, markHeroAttendanceFn, queryClient]);

  // Buka modal konfirmasi keluarkan hero (tandai tidak hadir)
  const handleRequestRemoveHero = React.useCallback(
    (hero: DonationHeroClaimRecord) => {
      if (hero.status === "tidak-jadi-ambil") return;
      setRemoveTargetHero(hero);
    },
    [],
  );

  const handleConfirmRemoveHero = React.useCallback(async () => {
    if (!removeTargetHero || !trimmedId) return;
    setIsRemovingHero(true);

    try {
      if (removeTargetHero.id.startsWith("manual-")) {
        // Hero manual: tandai tidak hadir atau hapus
        setManualHeroes((prev) =>
          prev.map((h) =>
            h.id === removeTargetHero.id
              ? { ...h, status: "tidak-jadi-ambil" }
              : h,
          ),
        );
      } else {
        // Hero dari API backend
        await markHeroAttendanceFn({
          data: {
            donationId: trimmedId,
            attendanceId: removeTargetHero.id,
            status: "absent",
          },
        });

        await queryClient.invalidateQueries({
          queryKey: ["donation-attendances", trimmedId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["donation-detail", trimmedId],
        });
        await queryClient.invalidateQueries({ queryKey: ["donations"] });
      }

      toast.success(idDonation.detail.toasts.attendanceAbsentSuccess);
      setRemoveTargetHero(null);
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error(idDonation.detail.toasts.attendanceFailed);
      }
    } finally {
      setIsRemovingHero(false);
    }
  }, [removeTargetHero, trimmedId, markHeroAttendanceFn, queryClient]);

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
    async (values: DonationSurplusFormValues) => {
      if (!trimmedId) return;
      const rawDonation = donationQuery.data?.data;
      if (!rawDonation) return;

      setIsSubmittingFood(true);
      try {
        const trimmedName = values.name.trim();
        const catalogItems = foodItemsQuery.data?.data ?? [];

        // 1. Cari atau buat item makanan di master catalog food items
        let targetFoodItemId: number | undefined = editingFood?.foodItemId;

        if (
          surplusDialogMode === "add" ||
          !targetFoodItemId ||
          (editingFood &&
            editingFood.name.toLowerCase() !== trimmedName.toLowerCase())
        ) {
          const matchedItem = catalogItems.find(
            (item) => item.name.toLowerCase() === trimmedName.toLowerCase(),
          );

          if (matchedItem) {
            targetFoodItemId = matchedItem.id;
          } else {
            const createdRes = await createFoodItemFn({
              data: { name: trimmedName },
            });
            targetFoodItemId = createdRes.data.id;
            await queryClient.invalidateQueries({
              queryKey: ["food-items-autocomplete"],
            });
          }
        }

        if (!targetFoodItemId) {
          toast.error("Gagal memproses jenis makanan.");
          return;
        }

        // 2. Tentukan quantity & unit yang valid untuk backend API
        // Backend units: "kg" | "g" | "l" | "ml" | "portion" | "pack" | "piece"
        const targetUnit = values.quantity
          ? "portion"
          : values.unit === "ml"
            ? "ml"
            : "g";
        const targetQuantity = values.quantity ?? values.weight;

        const currentFoods = rawDonation.foods;
        let nextFoods: DonationFoodPayload[];

        if (surplusDialogMode === "add") {
          const existingIndex = currentFoods.findIndex(
            (f) => f.food_item_id === targetFoodItemId,
          );

          if (existingIndex >= 0) {
            nextFoods = currentFoods.map((f, idx) =>
              idx === existingIndex
                ? {
                    ...f,
                    quantity: f.quantity + targetQuantity,
                    unit: targetUnit,
                  }
                : f,
            );
          } else {
            nextFoods = [
              ...currentFoods,
              {
                food_item_id: targetFoodItemId,
                quantity: targetQuantity,
                unit: targetUnit,
              },
            ];
          }
        } else {
          // Mode edit: ganti item makanan yang sedang diedit
          nextFoods = currentFoods.map((f) => {
            const isTarget =
              f.food_item_id === editingFood?.foodItemId ||
              f.name?.toLowerCase() === editingFood?.name.toLowerCase();

            if (isTarget) {
              return {
                food_item_id: targetFoodItemId,
                quantity: targetQuantity,
                unit: targetUnit,
              };
            }
            return f;
          });
        }

        // 3. Simpan perubahan ke backend via PATCH /v1/donations/:id
        await updateDonationFn({
          data: {
            id: trimmedId,
            foods: nextFoods.map((f) => ({
              food_item_id: f.food_item_id,
              quantity: f.quantity,
              unit: f.unit,
            })),
          },
        });

        await queryClient.invalidateQueries({
          queryKey: ["donation-detail", trimmedId],
        });
        await queryClient.invalidateQueries({ queryKey: ["donations"] });

        setIsSurplusDialogOpen(false);
        setEditingFood(null);

        if (surplusDialogMode === "edit") {
          toast.success(idDonation.detail.toasts.surplusUpdateSuccess);
        } else {
          toast.success(idDonation.detail.toasts.surplusAddSuccess);
        }
      } catch (err: unknown) {
        if (isApiError(err) && err.message) {
          toast.error(err.message);
        } else {
          toast.error("Gagal menyimpan data makanan.");
        }
      } finally {
        setIsSubmittingFood(false);
      }
    },
    [
      trimmedId,
      donationQuery.data,
      foodItemsQuery.data,
      editingFood,
      surplusDialogMode,
      createFoodItemFn,
      updateDonationFn,
      queryClient,
    ],
  );

  const handleConfirmDeleteFood = React.useCallback(async () => {
    if (!deletingFood || !trimmedId) return;
    const rawDonation = donationQuery.data?.data;
    if (!rawDonation) return;

    const currentFoods = rawDonation.foods;
    if (currentFoods.length <= 1) {
      toast.error(idDonation.detail.toasts.surplusMinOneRequired);
      setDeletingFood(null);
      return;
    }

    setIsDeletingFood(true);
    try {
      const remainingFoods = currentFoods.filter(
        (f) =>
          f.food_item_id !== deletingFood.foodItemId &&
          f.name?.toLowerCase() !== deletingFood.name.toLowerCase(),
      );

      await updateDonationFn({
        data: {
          id: trimmedId,
          foods: remainingFoods.map((f) => ({
            food_item_id: f.food_item_id,
            quantity: f.quantity,
            unit: f.unit,
          })),
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["donation-detail", trimmedId],
      });
      await queryClient.invalidateQueries({ queryKey: ["donations"] });

      toast.success(idDonation.detail.toasts.surplusDeleteSuccess);
      setDeletingFood(null);
    } catch (err: unknown) {
      if (isApiError(err) && err.message) {
        toast.error(err.message);
      } else {
        toast.error("Gagal menghapus makanan dari donasi.");
      }
    } finally {
      setIsDeletingFood(false);
    }
  }, [
    deletingFood,
    trimmedId,
    donationQuery.data,
    updateDonationFn,
    queryClient,
  ]);

  const handleSaveNotes = React.useCallback(
    async (nextNotes: string) => {
      if (!trimmedId) return;
      try {
        await updateDonationFn({
          data: {
            id: trimmedId,
            message: nextNotes,
          },
        });
        await queryClient.invalidateQueries({
          queryKey: ["donation-detail", trimmedId],
        });
        toast.success("Catatan aksi donasi berhasil disimpan.");
      } catch (err: unknown) {
        if (isApiError(err) && err.message) {
          toast.error(err.message);
        } else {
          toast.error("Gagal menyimpan catatan.");
        }
      }
    },
    [trimmedId, updateDonationFn, queryClient],
  );

  const handleOpenDocumentation = React.useCallback(() => {
    if (detail?.documentationUrl) {
      window.open(detail.documentationUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.info("Tautan dokumentasi belum dikonfigurasi.");
    }
  }, [detail?.documentationUrl]);

  if (isLoading) {
    return <DonationDetailSkeleton />;
  }

  const isRemovingConfirmedHero = removeTargetHero?.status === "sudah-diambil";

  return (
    <div className="space-y-6 w-full pb-8 animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Action Bar: Ringkasan Kuota, Badge Status, & Tombol Aksi Utama */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge tone={statusTone}>{computedStatus}</Badge>
          <span className="text-sm font-medium text-foreground">
            {detail.program}
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-sm text-muted-foreground">
            {detail.pickupSchedule}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Camera className="size-4" />}
            onClick={handleOpenDocumentation}
          >
            Dokumentasi
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Sparkles className="size-4" />}
            onClick={() => setIsImpactDialogOpen(true)}
          >
            Bagikan Impact
          </Button>
        </div>
      </div>

      {/* Grid Konten: 2 Kolom (Kiri: Heroes & Surplus, Kanan: Sidebar Rincian) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        {/* Kolom Kiri: Tabel Heroes & Surplus Food */}
        <div className="lg:col-span-2 space-y-6">
          <DonationDetailHeroesCard
            heroes={detail.heroes}
            quotaTotal={detail.quotaTotal}
            searchableHeroes={defaultSearchableHeroPool}
            onConfirmPickup={handleRequestConfirmPickup}
            onRemoveHero={handleRequestRemoveHero}
            onAddHero={handleAddHero}
          />

          <DonationDetailSurplusCard
            foods={detail.surplusFoods}
            onAddFood={handleOpenAddFood}
            onEditFood={handleOpenEditFood}
            onDeleteFood={(food) => setDeletingFood(food)}
          />
        </div>

        {/* Kolom Kanan: Rincian Donasi, Lokasi, Catatan */}
        <div className="lg:col-span-1">
          <DonationDetailSidebar
            detail={detail}
            onSaveNotes={handleSaveNotes}
          />
        </div>
      </div>

      {/* Modal Dialog: Konfirmasi Pengambilan Donasi */}
      <Dialog
        isOpen={Boolean(pickupTargetHero)}
        onClose={() => setPickupTargetHero(null)}
        title="Konfirmasi Pengambilan Donasi"
        description={
          pickupTargetHero
            ? `Pastikan voucher ${pickupTargetHero.claimCode} milik ${pickupTargetHero.name} telah diverifikasi di lokasi.`
            : ""
        }
        confirmText="Konfirmasi Ambil"
        cancelText="Batal"
        isConfirmLoading={isConfirmingPickup}
        onConfirm={handleConfirmPickupAction}
      />

      {/* Modal Dialog: Konfirmasi Keluarkan / Tandai Tidak Hadir */}
      <Dialog
        isOpen={Boolean(removeTargetHero)}
        onClose={() => setRemoveTargetHero(null)}
        title={
          isRemovingConfirmedHero
            ? "Tandai Hero Tidak Jadi Ambil?"
            : "Keluarkan Hero dari Donasi?"
        }
        description={
          removeTargetHero
            ? isRemovingConfirmedHero
              ? `${removeTargetHero.name} sebelumnya telah dikonfirmasi. Menandai tidak hadir akan membatalkan status pengambilan.`
              : `Apakah kamu yakin ingin mengeluarkan ${removeTargetHero.name} dari aksi donasi ini?`
            : ""
        }
        tone={isRemovingConfirmedHero ? "danger" : "default"}
        confirmText={
          isRemovingConfirmedHero ? "Tandai Tidak Jadi" : "Keluarkan"
        }
        cancelText="Batal"
        isConfirmLoading={isRemovingHero}
        onConfirm={handleConfirmRemoveHero}
      />

      {/* Modal Dialog: Tambah / Edit Surplus Food */}
      <DonationDetailSurplusDialog
        isOpen={isSurplusDialogOpen}
        mode={surplusDialogMode}
        initialFood={editingFood}
        foodSuggestions={foodItemsQuery.data?.data ?? []}
        isSubmitting={isSubmittingFood}
        onClose={() => setIsSurplusDialogOpen(false)}
        onSubmit={handleSubmitFood}
      />

      {/* Modal Dialog: Konfirmasi Hapus Surplus Food */}
      <DonationSurplusDeleteDialog
        food={deletingFood}
        isDeleting={isDeletingFood}
        onClose={() => setDeletingFood(null)}
        onConfirm={handleConfirmDeleteFood}
      />

      {/* Modal Dialog: Kartu Bagikan Impact */}
      <DonationDetailImpactDialog
        isOpen={isImpactDialogOpen}
        onClose={() => setIsImpactDialogOpen(false)}
        detail={detail}
      />
    </div>
  );
}
