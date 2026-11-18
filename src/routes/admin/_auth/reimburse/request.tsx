import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  computeReimburseAnalyzeProgress,
  detectSimulatedErrorFromFile,
  detectUploadedFileType,
  emptyReimburseFormValues,
  estimateReimburseAmount,
  formatFileSize,
  formatRupiah,
  getReimbursePresetState,
  mapReimbursementToHistoryItem,
  REIMBURSE_ALERTS,
  REIMBURSE_ANALYZE_COMPLETE_HOLD_MS,
  REIMBURSE_ANALYZE_HOLD_PROGRESS,
  REIMBURSE_ANALYZE_MIN_DURATION_MS,
  REIMBURSE_FILE_REJECTED_MESSAGE,
  REIMBURSE_MAX_FILE_SIZE_BYTES,
  ReimburseFilePreviewDialog,
  ReimburseHistoryCard,
  ReimburseRequestForm,
  ReimburseRequestSkeleton,
  ReimburseTransferProofDialog,
} from "#/components/pages/reimburse";
import type {
  ReimburseAlertState,
  ReimburseHistoryItem,
  ReimburseRequestFieldErrors,
  ReimburseRequestFormValues,
} from "#/components/pages/reimburse";
import { useAdminLayout } from "#/components/shared/admin-layout-context";
import type { FileUploadState } from "#/components/shared/file-upload";
import { toast } from "#/components/ui/toast";
import { useUserProfile } from "#/hooks";
import { idReimburse } from "#/locales";
import { isApiError } from "#/services/errorService";
import {
  createReimbursement,
  getReimbursements,
} from "#/services/reimburseService";

// Skema validasi URL search params tipe-aman Zod untuk meninjau seluruh state Figma
const reimburseRequestSearchSchema = z.object({
  demo: z
    .enum(["default", "analyzing", "error", "busy", "success", "empty"])
    .optional()
    .catch(undefined),
});

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf"];
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export const Route = createFileRoute("/admin/_auth/reimburse/request")({
  validateSearch: (search: Record<string, unknown>) => {
    const candidate =
      typeof search.demo === "string"
        ? search.demo
        : typeof search.state === "string"
          ? search.state
          : undefined;

    return reimburseRequestSearchSchema.parse({
      demo: candidate,
    });
  },
  component: ReimburseRequestPage,
});

/**
 * ReimburseRequestPage: Halaman Ajukan Reimburse & Riwayat Pengajuan (Figma 152:22156 - 152:23846).
 */
function ReimburseRequestPage() {
  const { demo: demoState } = Route.useSearch();
  const navigate = useNavigate();
  const adminLayout = useAdminLayout();
  const setHeaderOverride = adminLayout?.setHeaderOverride;

  const profile = useUserProfile();
  const queryClient = useQueryClient();

  const getReimbursementsFn = useServerFn(getReimbursements);
  const createReimbursementFn = useServerFn(createReimbursement);

  const initialPreset = React.useMemo(
    () => getReimbursePresetState(demoState),
    [demoState],
  );

  const [formValues, setFormValues] =
    React.useState<ReimburseRequestFormValues>(initialPreset.formValues);
  const [fieldErrors, setFieldErrors] =
    React.useState<ReimburseRequestFieldErrors>({});
  const [uploadState, setUploadState] = React.useState<FileUploadState>(
    initialPreset.uploadState,
  );
  const [uploadErrorMessage, setUploadErrorMessage] = React.useState<
    string | undefined
  >(initialPreset.uploadErrorMessage);
  const [alert, setAlert] = React.useState<ReimburseAlertState | null>(
    initialPreset.alert,
  );
  const [isAnalyzing, setIsAnalyzing] = React.useState<boolean>(
    initialPreset.isAnalyzing,
  );
  const [analyzingProgress, setAnalyzingProgress] = React.useState<number>(
    initialPreset.analyzingProgress ?? 0,
  );
  const [previewItem, setPreviewItem] =
    React.useState<ReimburseHistoryItem | null>(null);
  const [transferProofItem, setTransferProofItem] =
    React.useState<ReimburseHistoryItem | null>(null);

  const submitTimerRef = React.useRef<number | null>(null);
  const progressIntervalRef = React.useRef<number | null>(null);
  const completeTimerRef = React.useRef<number | null>(null);
  const objectUrlsRef = React.useRef<Set<string>>(new Set());
  const skipPresetSyncRef = React.useRef(false);

  // Mengambil riwayat pengajuan reimburse staf yang sedang login
  const myReimbursementsQuery = useQuery({
    queryKey: ["my-reimbursements", profile.user?.id],
    queryFn: () =>
      getReimbursementsFn({
        data: {
          user_id: profile.user?.id,
          limit: 20,
        },
      }),
    enabled: Boolean(profile.user?.id) && !demoState,
  });

  const queryHistoryItems = React.useMemo<ReimburseHistoryItem[]>(() => {
    if (
      !myReimbursementsQuery.data ||
      !("data" in myReimbursementsQuery.data) ||
      !Array.isArray(myReimbursementsQuery.data.data)
    ) {
      return [];
    }
    return myReimbursementsQuery.data.data.map(mapReimbursementToHistoryItem);
  }, [myReimbursementsQuery.data]);

  const [localHistoryItems, setLocalHistoryItems] = React.useState<
    ReimburseHistoryItem[]
  >(initialPreset.historyItems);

  React.useEffect(() => {
    if (!demoState && queryHistoryItems.length > 0) {
      setLocalHistoryItems(queryHistoryItems);
    }
  }, [demoState, queryHistoryItems]);

  const historyItems = demoState
    ? initialPreset.historyItems
    : localHistoryItems.length > 0
      ? localHistoryItems
      : queryHistoryItems;

  const isLoading =
    !demoState && (profile.isLoading || myReimbursementsQuery.isLoading);

  // Membersihkan seluruh timer & interval animasi analisis invoice
  const clearAnalyzeTimers = React.useCallback(() => {
    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
    }
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (completeTimerRef.current !== null) {
      window.clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
  }, []);

  // Memulai kenaikan progres interaktif 0% -> 95% selama min. 5 detik (stak di 95% jika belum selesai)
  const startProgressRamp = React.useCallback(() => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
    }

    const startedAt = Date.now();
    const tick = () => {
      const nextProgress = computeReimburseAnalyzeProgress(
        Date.now() - startedAt,
      );
      setAnalyzingProgress(nextProgress);

      if (
        nextProgress >= REIMBURSE_ANALYZE_HOLD_PROGRESS &&
        progressIntervalRef.current !== null
      ) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };

    tick();
    progressIntervalRef.current = window.setInterval(tick, 50);
  }, []);

  // Sinkronkan preset bila query parameter `?state=...` berubah dari URL / navigasi
  React.useEffect(() => {
    if (skipPresetSyncRef.current) {
      skipPresetSyncRef.current = false;
      return;
    }

    clearAnalyzeTimers();

    const preset = getReimbursePresetState(demoState);
    setFormValues(preset.formValues);
    setFieldErrors({});
    setUploadState(preset.uploadState);
    setUploadErrorMessage(preset.uploadErrorMessage);
    setAlert(preset.alert);
    setIsAnalyzing(preset.isAnalyzing);
    setAnalyzingProgress(preset.analyzingProgress ?? 0);
    setLocalHistoryItems(preset.historyItems);
    setPreviewItem(null);
    setTransferProofItem(null);

    if (demoState === "analyzing") {
      startProgressRamp();
    }

    if (preset.initialToastMessage) {
      toast.success(preset.initialToastMessage, { id: "reimburse-demo-toast" });
    }
  }, [demoState, clearAnalyzeTimers, startProgressRamp]);

  // Bersihkan timer serta Object URL ketika halaman dilepas
  React.useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      clearAnalyzeTimers();
      for (const url of urls) {
        URL.revokeObjectURL(url);
      }
      urls.clear();
    };
  }, [clearAnalyzeTimers]);

  // Konfigurasi Top Bar Header Layout (tanpa tombol kembali karena menu berdiri sendiri)
  React.useEffect(() => {
    if (!setHeaderOverride) return;

    setHeaderOverride({
      title: idReimburse.request.title,
      subtitle: idReimburse.request.subtitle,
    });

    return () => setHeaderOverride(null);
  }, [setHeaderOverride]);

  const handleFieldChange = (
    field: "paymentMethod" | "destinationNumber" | "note",
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileSelect = (file: File) => {
    const lowerName = file.name.toLowerCase();
    const isValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
      lowerName.endsWith(ext),
    );
    const isValidMime = ALLOWED_MIME_TYPES.includes(file.type);

    if (!isValidExtension && !isValidMime) {
      setUploadState("error");
      setUploadErrorMessage(
        "Format berkas tidak didukung. Unggah berkas JPG, PNG, atau PDF.",
      );
      setFieldErrors((prev) => ({ ...prev, file: undefined }));
      return;
    }

    if (file.size > REIMBURSE_MAX_FILE_SIZE_BYTES) {
      setUploadState("error");
      setUploadErrorMessage(
        "Ukuran berkas melebihi 5MB. Kompres atau unggah berkas lain.",
      );
      setFieldErrors((prev) => ({ ...prev, file: undefined }));
      return;
    }

    // Cabut URL sementara file sebelumnya bila belum disubmit
    if (
      formValues.file?.previewUrl &&
      objectUrlsRef.current.has(formValues.file.previewUrl)
    ) {
      URL.revokeObjectURL(formValues.file.previewUrl);
      objectUrlsRef.current.delete(formValues.file.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    objectUrlsRef.current.add(previewUrl);

    setFormValues((prev) => ({
      ...prev,
      file: {
        name: file.name,
        sizeLabel: formatFileSize(file.size),
        fileType: detectUploadedFileType(file.name),
        previewUrl,
      },
    }));
    setUploadState("uploaded");
    setUploadErrorMessage(undefined);
    setFieldErrors((prev) => ({ ...prev, file: undefined }));
    setAlert(null);
  };

  const handleFileRemove = () => {
    if (
      formValues.file?.previewUrl &&
      objectUrlsRef.current.has(formValues.file.previewUrl)
    ) {
      URL.revokeObjectURL(formValues.file.previewUrl);
      objectUrlsRef.current.delete(formValues.file.previewUrl);
    }

    setFormValues((prev) => ({ ...prev, file: null }));
    setUploadState("default");
    setUploadErrorMessage(undefined);
    setFieldErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAnalyzing) return;

    const nextErrors: ReimburseRequestFieldErrors = {};
    if (!formValues.paymentMethod.trim()) {
      nextErrors.paymentMethod = idReimburse.validation.methodRequired;
    }
    if (!formValues.destinationNumber.trim()) {
      nextErrors.destinationNumber = idReimburse.validation.destinationRequired;
    }
    if (!formValues.note.trim()) {
      nextErrors.note = idReimburse.validation.noteRequired;
    }
    if (!formValues.file) {
      nextErrors.file = idReimburse.validation.fileRequired;
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    const attachedFile = formValues.file;
    if (!attachedFile) return;

    clearAnalyzeTimers();
    setFieldErrors({});
    setAlert(null);
    setIsAnalyzing(true);
    setAnalyzingProgress(0);
    setUploadState("analyzing");
    setUploadErrorMessage(undefined);
    startProgressRamp();

    // Jalankan request API pembacaan invoice dan pembuatan klaim
    submitTimerRef.current = window.setTimeout(() => {
      submitTimerRef.current = null;
      if (progressIntervalRef.current !== null) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      // Penuhi bar ke 100% saat analisis selesai sebelum berpindah state hasil
      setAnalyzingProgress(100);

      completeTimerRef.current = window.setTimeout(async () => {
        completeTimerRef.current = null;
        setAnalyzingProgress(0);
        const simulatedError = detectSimulatedErrorFromFile(attachedFile.name);

        if (simulatedError === 422) {
          if (
            attachedFile.previewUrl &&
            objectUrlsRef.current.has(attachedFile.previewUrl)
          ) {
            URL.revokeObjectURL(attachedFile.previewUrl);
            objectUrlsRef.current.delete(attachedFile.previewUrl);
          }

          setIsAnalyzing(false);
          setAlert(REIMBURSE_ALERTS[422]);
          setFormValues((prev) => ({ ...prev, file: null }));
          setUploadState("error");
          setUploadErrorMessage(REIMBURSE_FILE_REJECTED_MESSAGE);
          return;
        }

        if (simulatedError === 504) {
          setIsAnalyzing(false);
          setAlert(REIMBURSE_ALERTS[504]);
          setUploadState("uploaded");
          return;
        }

        const detectedAmount = estimateReimburseAmount(formValues.note);

        try {
          const res = await createReimbursementFn({
            data: {
              amount: detectedAmount,
              method: formValues.paymentMethod.trim(),
              target: formValues.destinationNumber.trim(),
              notes: formValues.note.trim(),
            },
          });

          queryClient.invalidateQueries({ queryKey: ["my-reimbursements"] });
          queryClient.invalidateQueries({ queryKey: ["reimbursements"] });

          const createdItem: ReimburseHistoryItem = {
            id: res.data.id,
            method: formValues.paymentMethod.trim(),
            destinationNumber: formValues.destinationNumber.trim(),
            dateLabel: "Hari ini",
            amount: detectedAmount,
            note: formValues.note.trim(),
            status: "Proses",
            fileName: attachedFile.name,
            fileSize: attachedFile.sizeLabel,
            fileType: attachedFile.fileType,
            filePreviewUrl: attachedFile.previewUrl,
            isHighlighted: true,
          };

          setLocalHistoryItems((prev) => [
            createdItem,
            ...prev.map((item) => ({ ...item, isHighlighted: false })),
          ]);
          setFormValues(emptyReimburseFormValues);
          setUploadState("default");
          setUploadErrorMessage(undefined);
          setAlert(null);
          setIsAnalyzing(false);

          if (demoState && demoState !== "default") {
            skipPresetSyncRef.current = true;
            navigate({
              to: "/admin/reimburse/request",
              search: {},
              replace: true,
            });
          }

          toast.success(
            idReimburse.request.toasts.createSuccess(
              formatRupiah(detectedAmount),
            ),
          );
        } catch (err: unknown) {
          setIsAnalyzing(false);
          setUploadState("uploaded");
          if (isApiError(err) && err.message) {
            toast.error(err.message);
          } else {
            toast.error(idReimburse.request.toasts.createFailed);
          }
        }
      }, REIMBURSE_ANALYZE_COMPLETE_HOLD_MS);
    }, REIMBURSE_ANALYZE_MIN_DURATION_MS);
  };

  // Tampilkan skeleton saat loading aktif
  if (isLoading) {
    return <ReimburseRequestSkeleton />;
  }

  return (
    <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
      {/* Kolom Kiri: Form Pengajuan Reimburse */}
      <ReimburseRequestForm
        values={formValues}
        fieldErrors={fieldErrors}
        uploadState={uploadState}
        uploadErrorMessage={uploadErrorMessage}
        alert={alert}
        isAnalyzing={isAnalyzing}
        analyzingProgress={analyzingProgress}
        onFieldChange={handleFieldChange}
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        onDismissAlert={() => setAlert(null)}
        onSubmit={handleSubmit}
      />

      {/* Kolom Kanan: Daftar Riwayat Pengajuan */}
      <ReimburseHistoryCard
        items={historyItems}
        onPreviewFile={(item) => setPreviewItem(item)}
        onPreviewTransferProof={(item) => setTransferProofItem(item)}
      />

      {/* Modal Pratinjau Berkas Invoice */}
      <ReimburseFilePreviewDialog
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />

      {/* Modal Pratinjau Bukti Transfer (khusus status Selesai) */}
      <ReimburseTransferProofDialog
        item={transferProofItem}
        onClose={() => setTransferProofItem(null)}
      />
    </div>
  );
}
