import * as React from "react";
import { Box } from "lucide-react";
import { Textarea } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface TextareaBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * TextareaBlock: Dokumentasi input teks panjang sistem BBJ (Node 18:245).
 * Menampilkan 4 status visual (default, focus, error, disabled) serta live tester.
 */
export function TextareaBlock({ onCopy, copiedToken }: TextareaBlockProps) {
  const [testTextareaValue, setTestTextareaValue] = React.useState(
    "Catatan penjemputan surplus food...",
  );

  return (
    <DocBlock
      id="doc-textarea"
      nodeId="Node 18:245"
      title="4. Textarea"
      subtitle="src/components/ui/textarea.tsx"
      icon={<Box className="size-4" />}
      copyCode='<Textarea label="Catatan" placeholder="Tuliskan catatan..." helperText="Opsional" />'
      copyTokenKey="textarea-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-245&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Input teks panjang: deskripsi makanan surplus, catatan penjemputan,
        instruksi relawan hero. Minimal 3 baris.
      </p>

      {/* 4 Visual Status Grid matching Node 18:244 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Default
          </span>
          <Textarea
            label="Catatan Penjemputan"
            placeholder="Tuliskan catatan detail..."
            forcedState="default"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Focus
          </span>
          <Textarea
            label="Catatan Penjemputan"
            placeholder="Tuliskan catatan detail..."
            forcedState="focus"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Error
          </span>
          <Textarea
            label="Catatan Penjemputan"
            defaultValue="Terlalu pendek"
            error="Minimal penjelasan 20 karakter"
            forcedState="error"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Disabled
          </span>
          <Textarea
            label="Catatan Terkunci"
            defaultValue="Riwayat donasi telah divalidasi dan dikunci dari pengeditan."
            disabled
            forcedState="disabled"
          />
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-6 items-start">
        <div className="space-y-2 w-full max-w-lg">
          <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
            Live Interactive Textarea:
          </span>
          <Textarea
            label="Instruksi Akses Lokasi untuk Hero"
            value={testTextareaValue}
            onChange={(e) => setTestTextareaValue(e.target.value)}
            helperText="Berikan petunjuk pintu loading dock atau kontak satpam"
          />
        </div>
      </div>
    </DocBlock>
  );
}
