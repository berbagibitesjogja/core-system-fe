import type * as React from "react";
import { Sparkles, Upload } from "lucide-react";
import reimburseHeaderTrailSvg from "#/assets/illustrations/reimburse-header-trail.svg";
import { FileUpload } from "#/components/shared/file-upload";
import type { FileUploadState } from "#/components/shared/file-upload";
import { Alert } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
  REIMBURSE_UPLOAD_DEFAULT_DESC,
  reimburseDestinationFields,
  reimburseNoteField,
} from "./reimburse-data";
import type {
  ReimburseAlertState,
  ReimburseRequestFieldErrors,
  ReimburseRequestFormValues,
  ReimburseTextFieldConfig,
} from "./reimburse-data";

export interface ReimburseRequestFormProps {
  values: ReimburseRequestFormValues;
  fieldErrors: ReimburseRequestFieldErrors;
  uploadState: FileUploadState;
  uploadErrorMessage?: string;
  alert: ReimburseAlertState | null;
  isAnalyzing: boolean;
  onFieldChange: (
    field: "paymentMethod" | "destinationNumber" | "note",
    value: string,
  ) => void;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onDismissAlert?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * ReimburseRequestForm: Kartu formulir pengajuan reimburse berbasis AI invoice reading
 * (Figma Node 152:22156, 152:22641, 152:22945, 152:23251).
 */
export function ReimburseRequestForm({
  values,
  fieldErrors,
  uploadState,
  uploadErrorMessage,
  alert,
  isAnalyzing,
  onFieldChange,
  onFileSelect,
  onFileRemove,
  onDismissAlert,
  onSubmit,
}: ReimburseRequestFormProps) {
  const renderTextField = (field: ReimburseTextFieldConfig) => (
    <Input
      key={field.id}
      label={field.label}
      placeholder={field.placeholder}
      helperText={field.helperText}
      value={values[field.id]}
      error={fieldErrors[field.id]}
      readOnly={isAnalyzing}
      className="w-full max-w-none"
      onChange={(e) => onFieldChange(field.id, e.target.value)}
    />
  );

  const effectiveUploadState: FileUploadState = fieldErrors.file
    ? "error"
    : uploadState;
  const effectiveUploadError = fieldErrors.file ?? uploadErrorMessage;

  return (
    <section
      aria-label="Form Ajukan Reimburse"
      className="flex-1 min-w-0 w-full rounded-lg border border-neutral-200 bg-surface overflow-hidden shadow-xs"
    >
      {/* Card Header Teal dengan Dekorasi Pita */}
      <div className="bg-brand px-6 py-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-1">
          <h2 className="font-heading text-xl font-semibold leading-7 text-white">
            Ajukan Reimburse
          </h2>
          <p className="font-body text-xs leading-4 text-white/95">
            Lengkapi form untuk mengajukan penggantian biaya
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute h-[90px] right-[-30px] top-[-6px] w-[330px]"
        >
          <div className="absolute -inset-x-[2.42%] -inset-y-[8.89%]">
            <img
              src={reimburseHeaderTrailSvg}
              alt=""
              className="block max-w-none size-full"
            />
          </div>
        </div>
      </div>

      {/* Isi Form dan Aksi Kirim */}
      <form onSubmit={onSubmit} noValidate className="flex flex-col">
        <div className="p-6 flex flex-col gap-5">
          {alert && (
            <Alert
              tone={alert.code === 422 ? "danger" : "warning"}
              title={alert.title}
              description={alert.description}
              onClose={onDismissAlert}
            />
          )}

          {/* Banner Informasi AI */}
          <div className="bg-bondi-50 rounded-md px-4 py-3 flex items-start gap-3">
            <Sparkles
              className="size-5 shrink-0 text-brand mt-0.5"
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="font-label text-sm font-semibold leading-5 text-neutral-900">
                Nominal dibaca otomatis dari invoice
              </p>
              <p className="font-body text-xs leading-4 text-neutral-600">
                Tidak perlu mengetik jumlah uang. AI akan membaca total dari
                struk yang kamu unggah.
              </p>
            </div>
          </div>

          {/* Baris Metode & Nomor Tujuan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {reimburseDestinationFields.map(renderTextField)}
          </div>

          {/* Catatan Keperluan */}
          {renderTextField(reimburseNoteField)}

          {/* Unggah Berkas Invoice */}
          <FileUpload
            label="Upload Invoice"
            description={REIMBURSE_UPLOAD_DEFAULT_DESC}
            accept=".jpg,.jpeg,.png,.pdf"
            state={effectiveUploadState}
            fileName={values.file?.name}
            fileSize={values.file?.sizeLabel}
            errorMessage={effectiveUploadError}
            onFileSelect={onFileSelect}
            onRemove={onFileRemove}
            className="max-w-none"
          />
        </div>

        {/* Footer Tombol Submit */}
        <div className="px-6 pb-6">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            leftIcon={<Upload className="size-5" />}
            isLoading={isAnalyzing}
            loadingText="Menganalisis invoice via AI..."
          >
            Ajukan Reimburse
          </Button>
        </div>
      </form>
    </section>
  );
}
