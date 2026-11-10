import * as React from "react";
import { Box, Building, Search } from "lucide-react";
import { Input } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface InputBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * InputBlock: Dokumentasi field input formulir sistem BBJ (Node 18:221).
 * Menampilkan 6 status visual (default, hover, focus ring tosca 3px, filled, error, disabled)
 * dan area live tester interaktif.
 */
export function InputBlock({ onCopy, copiedToken }: InputBlockProps) {
  const [testInputValue, setTestInputValue] = React.useState(
    "Hotel Tentrem Yogyakarta",
  );

  return (
    <DocBlock
      id="doc-input"
      nodeId="Node 18:221"
      title="3. Input Field"
      subtitle="src/components/ui/input.tsx"
      icon={<Box className="size-4" />}
      copyCode='<Input label="Nama Donatur" placeholder="cth. Hotel Tentrem" />'
      copyTokenKey="input-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-221&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Field input formulir: teks, nomor porsi, email donatur, lokasi
        penjemputan. Dilengkapi label semi-bold, helper text / error message,
        slot leading/trailing icon, dan ring fokus tosca 3px.
      </p>

      {/* 6 Visual Status Grid matching Node 18:220 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Default
          </span>
          <Input
            label="Nama Donatur"
            placeholder="cth. Hotel Tentrem"
            helperText="Wajib diisi."
            forcedState="default"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Hover
          </span>
          <Input
            label="Nama Donatur"
            placeholder="cth. Hotel Tentrem"
            helperText="Wajib diisi."
            forcedState="hover"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Focus (Active Ring)
          </span>
          <Input
            label="Nama Donatur"
            placeholder="cth. Hotel Tentrem"
            helperText="Wajib diisi."
            forcedState="focus"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Filled
          </span>
          <Input
            label="Nama Donatur"
            defaultValue="Hotel Tentrem Yogyakarta"
            forcedState="filled"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Error
          </span>
          <Input
            label="Nama Donatur"
            defaultValue="Hotel ???"
            error="Format nama donatur tidak valid"
            forcedState="error"
          />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Disabled
          </span>
          <Input
            label="ID Transaksi (Otomatis)"
            defaultValue="BBJ-2026-9812"
            disabled
            forcedState="disabled"
          />
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-col md:flex-row gap-6 items-start">
        <div className="space-y-2 w-full max-w-sm">
          <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
            Live Interactive Input (Try typing &amp; focusing):
          </span>
          <Input
            label="Cari Donatur atau Lokasi"
            placeholder="Ketik kata kunci..."
            value={testInputValue}
            onChange={(e) => setTestInputValue(e.target.value)}
            leftIcon={<Search className="size-4 text-neutral-400" />}
            helperText="Tekan Enter untuk memfilter data"
          />
        </div>
        <div className="space-y-2 w-full max-w-sm">
          <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
            Live Interactive With Error:
          </span>
          <Input
            label="Nomor Telepon Hero"
            defaultValue="0812abc"
            error="Format nomor telepon hanya boleh berisi angka"
            leftIcon={<Building className="size-4 text-neutral-400" />}
          />
        </div>
      </div>
    </DocBlock>
  );
}
