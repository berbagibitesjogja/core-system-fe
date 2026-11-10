import { Box, Edit2, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { IconButton } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface ActionIconButtonBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * ActionIconButtonBlock: Dokumentasi tombol ikon sistem BBJ (Node 17:127).
 * Menampilkan matriks 4 varian (primary, secondary, ghost, danger) dalam 3 status
 * (default, hover, disabled) untuk ukuran Medium (44x44px) dan Small (36x36px).
 */
export function ActionIconButtonBlock({
  onCopy,
  copiedToken,
}: ActionIconButtonBlockProps) {
  return (
    <DocBlock
      id="doc-icon-button"
      nodeId="Node 17:127"
      title="2. Icon Button"
      subtitle="src/components/ui/icon-button.tsx"
      icon={<Box className="size-4" />}
      copyCode='<IconButton variant="primary" size="md" aria-label="Tambah"><Plus /></IconButton>'
      copyTokenKey="icon-btn-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-127&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Tombol ikon tanpa label teks: tambah cepat (+), cari (kaca pembesar),
        menu titik tiga (more), filter, close (×), dan hapus (trash). Medium
        44×44px, Small 36×36px.
      </p>

      {/* 24-variant Matrix (6 columns x 4 rows) */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="min-w-[960px] w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[120px]">
                Variant
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider text-center">
                Med / Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider text-center">
                Med / Hover
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider text-center">
                Med / Disabled
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider text-center">
                Sm / Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider text-center">
                Sm / Hover
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider text-center">
                Sm / Disabled
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {/* Row 1: Primary */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                Primary
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="primary"
                  size="md"
                  forcedState="default"
                  aria-label="Tambah"
                >
                  <Plus />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="primary"
                  size="md"
                  forcedState="hover"
                  aria-label="Tambah"
                >
                  <Plus />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="primary"
                  size="md"
                  forcedState="disabled"
                  aria-label="Tambah"
                >
                  <Plus />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="primary"
                  size="sm"
                  forcedState="default"
                  aria-label="Tambah"
                >
                  <Plus />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="primary"
                  size="sm"
                  forcedState="hover"
                  aria-label="Tambah"
                >
                  <Plus />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="primary"
                  size="sm"
                  forcedState="disabled"
                  aria-label="Tambah"
                >
                  <Plus />
                </IconButton>
              </td>
            </tr>

            {/* Row 2: Secondary */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                Secondary
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="secondary"
                  size="md"
                  forcedState="default"
                  aria-label="Cari"
                >
                  <Search />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="secondary"
                  size="md"
                  forcedState="hover"
                  aria-label="Cari"
                >
                  <Search />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="secondary"
                  size="md"
                  forcedState="disabled"
                  aria-label="Cari"
                >
                  <Search />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="secondary"
                  size="sm"
                  forcedState="default"
                  aria-label="Cari"
                >
                  <Search />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="secondary"
                  size="sm"
                  forcedState="hover"
                  aria-label="Cari"
                >
                  <Search />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="secondary"
                  size="sm"
                  forcedState="disabled"
                  aria-label="Cari"
                >
                  <Search />
                </IconButton>
              </td>
            </tr>

            {/* Row 3: Ghost */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                Ghost
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="ghost"
                  size="md"
                  forcedState="default"
                  aria-label="Menu"
                >
                  <MoreVertical />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="ghost"
                  size="md"
                  forcedState="hover"
                  aria-label="Menu"
                >
                  <MoreVertical />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="ghost"
                  size="md"
                  forcedState="disabled"
                  aria-label="Menu"
                >
                  <MoreVertical />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="ghost"
                  size="sm"
                  forcedState="default"
                  aria-label="Menu"
                >
                  <MoreVertical />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="ghost"
                  size="sm"
                  forcedState="hover"
                  aria-label="Menu"
                >
                  <MoreVertical />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="ghost"
                  size="sm"
                  forcedState="disabled"
                  aria-label="Menu"
                >
                  <MoreVertical />
                </IconButton>
              </td>
            </tr>

            {/* Row 4: Danger */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                Danger
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="danger"
                  size="md"
                  forcedState="default"
                  aria-label="Hapus"
                >
                  <Trash2 />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="danger"
                  size="md"
                  forcedState="hover"
                  aria-label="Hapus"
                >
                  <Trash2 />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="danger"
                  size="md"
                  forcedState="disabled"
                  aria-label="Hapus"
                >
                  <Trash2 />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="danger"
                  size="sm"
                  forcedState="default"
                  aria-label="Hapus"
                >
                  <Trash2 />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="danger"
                  size="sm"
                  forcedState="hover"
                  aria-label="Hapus"
                >
                  <Trash2 />
                </IconButton>
              </td>
              <td className="py-4 px-4 text-center">
                <IconButton
                  variant="danger"
                  size="sm"
                  forcedState="disabled"
                  aria-label="Hapus"
                >
                  <Trash2 />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3 sm:gap-4">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 w-full sm:w-auto">
          Live Test Clicks:
        </span>
        <IconButton
          variant="primary"
          size="md"
          onClick={() => toast.success("Add icon button")}
          aria-label="Tambah"
        >
          <Plus />
        </IconButton>
        <IconButton
          variant="secondary"
          size="md"
          onClick={() => toast.info("Search icon button")}
          aria-label="Cari"
        >
          <Search />
        </IconButton>
        <IconButton
          variant="ghost"
          size="md"
          onClick={() => toast.info("More menu button")}
          aria-label="Menu"
        >
          <MoreVertical />
        </IconButton>
        <IconButton
          variant="danger"
          size="md"
          onClick={() => toast.error("Delete button")}
          aria-label="Hapus"
        >
          <Trash2 />
        </IconButton>
        <IconButton
          variant="secondary"
          size="sm"
          onClick={() => toast.info("Small secondary")}
          aria-label="Edit"
        >
          <Edit2 />
        </IconButton>
        <IconButton
          variant="danger"
          size="sm"
          onClick={() => toast.error("Small danger")}
          aria-label="Hapus kecil"
        >
          <Trash2 />
        </IconButton>
      </div>
    </DocBlock>
  );
}
