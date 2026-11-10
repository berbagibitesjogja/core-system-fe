import * as React from "react";
import { Box } from "lucide-react";
import { toast } from "sonner";
import { Button } from "#/components/ui";
import { Tag } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface TagBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * TagBlock: Dokumentasi komponen Tag sistem BBJ (Node 18:325).
 * Menampilkan varian removable (dengan x) dan non-removable dalam status default dan hover,
 * serta area live test removable tag.
 */
export function TagBlock({ onCopy, copiedToken }: TagBlockProps) {
  const [tags, setTags] = React.useState([
    "Nasi Kotak",
    "Roti",
    "Sayuran Segar",
    "Kue Basah",
  ]);

  return (
    <DocBlock
      id="doc-tag"
      nodeId="Node 18:325"
      title="8. Tag"
      subtitle="src/components/shared/tag.tsx"
      icon={<Box className="size-4" />}
      copyCode="<Tag onRemove={handleRemove}>Universitas Gadjah Mada</Tag>"
      copyTokenKey="tag-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-325&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Item terpilih yang bisa dihapus (×): beneficiary terpilih pada form
        donasi, filter aktif. Klik × menghapus pilihan. Warna tosca lembut
        Bondi-50 dengan teks tosca tua Bondi-900.
      </p>

      {/* Matrix matching Node 18:324 */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="min-w-[500px] w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[180px]">
                Varian
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Hover
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                Removable (dengan ×)
              </td>
              <td className="py-4 px-4">
                <Tag
                  label="Universitas Gadjah Mada"
                  removable
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <Tag
                  label="Universitas Gadjah Mada"
                  removable
                  forcedState="hover"
                />
              </td>
            </tr>

            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                Non-removable
              </td>
              <td className="py-4 px-4">
                <Tag
                  label="Panti Asuhan Sinar Melati"
                  removable={false}
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <Tag
                  label="Panti Asuhan Sinar Melati"
                  removable={false}
                  forcedState="hover"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 space-y-2">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
          Live Removable Tags Tester:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              onRemove={() => {
                setTags((prev) => prev.filter((t) => t !== tag));
                toast.info(`Tag "${tag}" dihapus`);
              }}
            />
          ))}
          {tags.length === 0 && (
            <span className="text-xs text-neutral-400 italic">
              Semua tag telah dihapus.
            </span>
          )}
          {tags.length < 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setTags([
                  "Nasi Kotak",
                  "Roti & Pastry",
                  "Sayuran Segar",
                  "Kue Basah",
                ])
              }
            >
              Reset Tags
            </Button>
          )}
        </div>
      </div>
    </DocBlock>
  );
}
