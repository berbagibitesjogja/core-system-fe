import * as React from "react";
import { Box } from "lucide-react";
import { toast } from "#/components/ui";
import { FileUpload } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface FileUploadBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * FileUploadBlock: Dokumentasi komponen upload berkas/dropzone sistem BBJ (Node 21:347).
 * Menampilkan 5 status visual (default, dragover, analyzing, uploaded, error)
 * serta dropzone interaktif yang siap menerima file asli.
 */
export function FileUploadBlock({ onCopy, copiedToken }: FileUploadBlockProps) {
  const [uploadState, setUploadState] = React.useState<
    "default" | "analyzing" | "uploaded"
  >("default");
  const [uploadedFileName, setUploadedFileName] = React.useState<string>("");

  const handleFileUpload = (file: File) => {
    setUploadState("analyzing");
    setUploadedFileName(file.name);
    setTimeout(() => {
      setUploadState("uploaded");
      toast.success(`Berkas ${file.name} siap diproses`);
    }, 1200);
  };

  return (
    <DocBlock
      id="doc-file-upload"
      nodeId="Node 21:347"
      title="10. File Upload"
      subtitle="src/components/shared/file-upload.tsx"
      icon={<Box className="size-4" />}
      copyCode='<FileUpload state="default" onFileSelect={handleSelect} />'
      copyTokenKey="upload-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-347&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Unggah berkas foto makanan, bukti serah terima, nota reimburse, atau
        dokumen mitra. Mendukung drag &amp; drop, pembacaan ukuran file, dan
        status analyzing AI.
      </p>

      {/* 5 Visual Status Grid matching Node 21:346 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Default
          </span>
          <FileUpload forcedState="default" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Dragover
          </span>
          <FileUpload forcedState="dragover" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Analyzing (AI Processing)
          </span>
          <FileUpload forcedState="analyzing" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Uploaded
          </span>
          <FileUpload
            forcedState="uploaded"
            fileName="foto_surplus_nasi_box_01.jpg"
            fileSize="1.8 MB"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Error
          </span>
          <FileUpload
            forcedState="error"
            errorMessage="Ukuran berkas melebihi batas 10 MB"
          />
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 space-y-2">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
          Live Interactive Dropzone (Coba drag &amp; drop file foto/dokumen):
        </span>
        <div className="max-w-xl">
          <FileUpload
            state={uploadState}
            fileName={uploadedFileName}
            fileSize="2.4 MB"
            onFileSelect={handleFileUpload}
            onRemove={() => {
              setUploadState("default");
              setUploadedFileName("");
              toast.info("Berkas dihapus");
            }}
          />
        </div>
      </div>
    </DocBlock>
  );
}
