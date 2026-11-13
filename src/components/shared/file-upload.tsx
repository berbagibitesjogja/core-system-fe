import * as React from "react";
import { AlertTriangle, FileText, Sparkles, Upload, X } from "lucide-react";
import { Tooltip } from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

export type FileUploadState =
  "default" | "dragover" | "analyzing" | "uploaded" | "error";

export interface FileUploadProps {
  label?: string;
  description?: string;
  state?: FileUploadState;
  forcedState?: FileUploadState;
  fileName?: string;
  fileSize?: string;
  errorMessage?: string;
  onFileSelect?: (file: File) => void;
  onRemove?: () => void;
  accept?: string;
  className?: string;
}

export function FileUpload({
  label = "Upload Invoice",
  description = "JPG, PNG, atau PDF. Maks 5MB",
  state = "default",
  forcedState,
  fileName = "struk-gocar-10sept.jpg",
  fileSize = "1,2 MB",
  errorMessage,
  onFileSelect,
  onRemove,
  accept,
  className,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const currentState: FileUploadState =
    forcedState ?? (isDragOver ? "dragover" : state);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      onFileSelect?.(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 items-start w-full max-w-[400px]",
        className,
      )}
    >
      {label && (
        <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-neutral-900">
          {label}
        </span>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFileSelect?.(e.target.files[0]);
          }
        }}
      />

      {currentState === "uploaded" ? (
        /* Uploaded horizontal card (matching Node 21:320) */
        <div className="w-full bg-white border border-neutral-300 border-solid rounded-[12px] p-3 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-[40px] rounded-[8px] bg-bondi-50 flex items-center justify-center shrink-0 text-bondi-700">
              <FileText className="size-5" />
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] text-neutral-900 truncate">
                {fileName}
              </span>
              <span className="font-['Josefin_Sans'] font-normal text-[12px] leading-[16px] text-neutral-600">
                {fileSize}
              </span>
            </div>
          </div>
          <Tooltip content="Hapus berkas">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
              className="size-[24px] inline-flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer rounded"
              aria-label="Hapus berkas"
            >
              <X className="size-[18px]" />
            </button>
          </Tooltip>
        </div>
      ) : (
        /* Dropzone Frame */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => {
            if (currentState !== "analyzing") {
              fileInputRef.current?.click();
            }
          }}
          className={cn(
            "w-full rounded-[12px] p-6 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer select-none",
            currentState === "default" &&
              "bg-neutral-100 border-[1.5px] border-neutral-300 border-dashed hover:bg-neutral-200/70 hover:border-neutral-400",
            currentState === "dragover" &&
              "bg-bondi-50 border-[1.5px] border-bondi-500 border-dashed",
            currentState === "analyzing" &&
              "bg-sunny-50 border-[1.5px] border-sunny-500 border-dashed cursor-wait",
            currentState === "error" &&
              "bg-red-50 border-[1.5px] border-red-500 border-dashed",
          )}
        >
          {/* Icon Badge */}
          <div
            className={cn(
              "size-[44px] rounded-full flex items-center justify-center bg-white shadow-2xs shrink-0",
              currentState === "analyzing" &&
                "border-[1.5px] border-neutral-900",
            )}
          >
            {currentState === "analyzing" ? (
              <Sparkles className="size-[22px] text-neutral-900" />
            ) : currentState === "error" ? (
              <AlertTriangle className="size-[22px] text-red-500" />
            ) : (
              <Upload className="size-[22px] text-bondi-600" />
            )}
          </div>

          {/* Title */}
          <p
            className={cn(
              "font-['Inter'] font-semibold text-[14px] leading-[20px] whitespace-nowrap",
              currentState === "error" ? "text-red-700" : "text-neutral-900",
            )}
          >
            {currentState === "error"
              ? "Berkas ditolak"
              : currentState === "analyzing"
                ? "Menganalisis invoice via AI..."
                : currentState === "dragover"
                  ? "Lepaskan untuk mengunggah"
                  : "Klik atau seret berkas ke sini"}
          </p>

          {/* Description */}
          <p
            className={cn(
              "font-['Josefin_Sans'] font-normal text-[12px] leading-[16px] max-w-[320px]",
              currentState === "error" ? "text-red-700" : "text-neutral-600",
            )}
          >
            {currentState === "error"
              ? errorMessage ||
                "Bukan invoice sah atau tidak memuat nominal. Unggah struk yang jelas."
              : currentState === "analyzing"
                ? "Membaca nominal dari struk, biasanya kurang dari 8 detik"
                : description}
          </p>

          {/* Progress Bar for Analyzing */}
          {currentState === "analyzing" && (
            <div className="w-[200px] h-[6px] rounded-full bg-sunny-100 overflow-hidden mt-1">
              <div className="h-full bg-bondi-700 rounded-full w-[60%] animate-pulse" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
