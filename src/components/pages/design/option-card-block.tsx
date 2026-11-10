import * as React from "react";
import { Box } from "lucide-react";
import { Badge } from "#/components/ui";
import { OptionCard } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface OptionCardBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * OptionCardBlock: Dokumentasi komponen pilihan kartu radio sistem BBJ (Node 138:11319).
 * Menampilkan 4 varian status (default, hover, selected, error) serta live interactive group.
 */
export function OptionCardBlock({ onCopy, copiedToken }: OptionCardBlockProps) {
  const [selectedOptionKey, setSelectedOptionKey] =
    React.useState("universitas");

  return (
    <DocBlock
      id="doc-option-card"
      nodeId="Node 138:11319"
      title="9. Option Card"
      subtitle="src/components/shared/option-card.tsx"
      icon={<Box className="size-4" />}
      copyCode='<OptionCard title="Universitas" description="Kampus & mahasiswa" selected={true} />'
      copyTokenKey="option-card-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=138-11319&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Pilihan tunggal berbentuk kartu (radio). Gunakan untuk 2–4 opsi yang
        perlu dibandingkan, mis. jenis beneficiary atau tipe donatur. 220px
        width, 40px icon badge, custom radio circle.
      </p>

      {/* 4-variant Matrix matching Node 138:11319 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Default
          </span>
          <OptionCard
            title="Universitas"
            description="Kampus & mahasiswa"
            forcedState="default"
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Hover
          </span>
          <OptionCard
            title="Universitas"
            description="Kampus & mahasiswa"
            forcedState="hover"
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Selected
          </span>
          <OptionCard
            title="Universitas"
            description="Kampus & mahasiswa"
            forcedState="selected"
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Error
          </span>
          <OptionCard
            title="Universitas"
            description="Kampus & mahasiswa"
            forcedState="error"
          />
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 space-y-2">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
          Live Interactive Radio Selection Group:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-[760px] w-full">
          <OptionCard
            title="Universitas"
            description="Kampus & organisasi mahasiswa"
            selected={selectedOptionKey === "universitas"}
            onClick={() => setSelectedOptionKey("universitas")}
            badge={<Badge tone="brand">Prioritas</Badge>}
          />
          <OptionCard
            title="Panti Asuhan"
            description="Lembaga kesejahteraan sosial anak"
            selected={selectedOptionKey === "panti"}
            onClick={() => setSelectedOptionKey("panti")}
          />
          <OptionCard
            title="Komunitas Warga"
            description="Dapur umum & relawan RT/RW"
            selected={selectedOptionKey === "komunitas"}
            onClick={() => setSelectedOptionKey("komunitas")}
          />
        </div>
      </div>
    </DocBlock>
  );
}
