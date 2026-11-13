import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  REIMBURSE_ALERTS,
  REIMBURSE_ANALYZE_COMPLETE_HOLD_MS,
  REIMBURSE_ANALYZE_HOLD_PROGRESS,
  REIMBURSE_ANALYZE_MIN_DURATION_MS,
  REIMBURSE_FILE_REJECTED_MESSAGE,
  REIMBURSE_MAX_FILE_SIZE_BYTES,
  ReimburseFilePreviewDialog,
  ReimburseHistoryCard,
  ReimburseRequestForm,
  computeReimburseAnalyzeProgress,
  detectSimulatedErrorFromFile,
  detectUploadedFileType,
  emptyReimburseFormValues,
  estimateReimburseAmount,
  formatFileSize,
  formatRupiah,
  getReimbursePresetState,
} from "#/components/pages/reimburse";
import type {
  ReimburseAlertState,
  ReimburseHistoryItem,
  ReimburseRequestFieldErrors,
  ReimburseRequestFormValues,
} from "#/components/pages/reimburse";
import type { FileUploadState } from "#/components/shared/file-upload";
import { toast } from "#/components/ui/toast";
import { useAdminLayout } from "#/routes/admin/_auth";

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
  const [historyItems, setHistoryItems] = React.useState<
    ReimburseHistoryItem[]
  >(initialPreset.historyItems);
  const [previewItem, setPreviewItem] =
    React.useState<ReimburseHistoryItem | null>(null);

  const submitTimerRef = React.useRef<number | null>(null);
  const progressIntervalRef = React.useRef<number | null>(null);
  const completeTimerRef = React.useRef<number | null>(null);
  const objectUrlsRef = React.useRef<Set<string>>(new Set());
  const skipPresetSyncRef = React.useRef(false);

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
    setHistoryItems(preset.historyItems);

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
      title: "Reimburse",
      subtitle: "Ajukan penggantian biaya operasional dan pantau statusnya",
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
      nextErrors.paymentMethod = "Metode pembayaran wajib diisi.";
    }
    if (!formValues.destinationNumber.trim()) {
      nextErrors.destinationNumber = "Nomor tujuan wajib diisi.";
    }
    if (!formValues.note.trim()) {
      nextErrors.note = "Catatan keperluan wajib diisi.";
    }
    if (!formValues.file) {
      nextErrors.file = "Unggah berkas invoice terlebih dahulu.";
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

    // TODO: Integrasikan endpoint API AI pembacaan invoice di sini untuk menggantikan simulasi 5 detik:
    // 1. Jalankan request API paralel dengan durasi minimal 5 detik (`REIMBURSE_ANALYZE_MIN_DURATION_MS`).
    // 2. Jika proses melewati 5 detik dan belum selesai, biarkan progres bar stak di 95% (`REIMBURSE_ANALYZE_HOLD_PROGRESS`).
    // 3. Setelah API selesai (`done`) dan min. 5 detik tercapai, set progres ke 100% lalu tunggu `REIMBURSE_ANALYZE_COMPLETE_HOLD_MS`.
    submitTimerRef.current = window.setTimeout(() => {
      submitTimerRef.current = null;
      if (progressIntervalRef.current !== null) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      // Penuhi bar ke 100% saat analisis selesai sebelum berpindah state hasil
      setAnalyzingProgress(100);

      completeTimerRef.current = window.setTimeout(() => {
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
        const createdItem: ReimburseHistoryItem = {
          id: `rmb-${Date.now()}`,
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

        setHistoryItems((prev) => [
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
          `Pengajuan terkirim. Nominal terdeteksi: ${formatRupiah(detectedAmount)}`,
        );
      }, REIMBURSE_ANALYZE_COMPLETE_HOLD_MS);
    }, REIMBURSE_ANALYZE_MIN_DURATION_MS);
  };

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
      />

      {/* Modal Pratinjau Berkas Invoice */}
      <ReimburseFilePreviewDialog
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </div>
  );
}
