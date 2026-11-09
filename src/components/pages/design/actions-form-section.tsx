import * as React from "react";
import {
  Box,
  Building,
  Check,
  Copy,
  Edit2,
  ExternalLink,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  Badge,
  Button,
  Checkbox,
  IconButton,
  Input,
  Textarea,
  Toggle,
} from "#/components/ui";
import {
  BeneficiaryCard,
  FileUpload,
  FilterChip,
  GoogleSignInButton,
  OptionCard,
  ProgressBar,
  Tag,
} from "#/components/shared";
import { cn } from "#/lib/utils";

export interface ActionsFormSectionProps {
  onCopy: (text: string, id?: string) => void;
  copiedToken: string | null;
}

export function ActionsFormSection({
  onCopy,
  copiedToken,
}: ActionsFormSectionProps) {
  // Local Interactive States
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [testInputValue, setTestInputValue] = React.useState(
    "Hotel Tentrem Yogyakarta",
  );
  const [testTextareaValue, setTestTextareaValue] = React.useState(
    "Catatan penjemputan surplus food...",
  );
  const [checkbox1, setCheckbox1] = React.useState(true);
  const [checkbox2, setCheckbox2] = React.useState<"indeterminate" | boolean>(
    "indeterminate",
  );
  const [switchState, setSwitchState] = React.useState(true);
  const [interactiveToggle, setInteractiveToggle] = React.useState(true);
  const [selectedFilter, setSelectedFilter] = React.useState("semua");
  const [tags, setTags] = React.useState([
    "Nasi Kotak",
    "Roti",
    "Sayuran Segar",
    "Kue Basah",
  ]);
  const [selectedOptionKey, setSelectedOptionKey] =
    React.useState("universitas");
  const [uploadState, setUploadState] = React.useState<
    "default" | "analyzing" | "uploaded"
  >("default");
  const [uploadedFileName, setUploadedFileName] = React.useState<string>("");
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [sliderProgress, setSliderProgress] = React.useState(65);

  const handleFileUpload = (file: File) => {
    setUploadState("analyzing");
    setUploadedFileName(file.name);
    setTimeout(() => {
      setUploadState("uploaded");
      toast.success(`Berkas ${file.name} siap diproses`);
    }, 1200);
  };

  return (
    <section className="space-y-12 animate-in fade-in duration-200">
      {/* Section Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold shadow-2xs">
            <Box className="size-5" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold block">
              Figma Category · Actions &amp; Form
            </span>
            <h2 className="font-heading-h2 text-[#142023]">
              Actions &amp; Form Components
            </h2>
          </div>
        </div>
        <span className="text-xs text-neutral-500 font-mono bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
          Node 16:273 - 138:11319 · 13 Komponen
        </span>
      </div>

      <div className="space-y-8">
        {/* =============================================================
            1. FIGMA DOC: BUTTON (Node 16:273)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=16-273
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    1. Button
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 16:273
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/button.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<Button variant="primary" size="md">Simpan Donasi</Button>',
                    "btn-primary",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "btn-primary" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=16-273&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setButtonLoading((v) => !v)}
              >
                {buttonLoading ? "Normal State" : "Simulasi Loading"}
              </Button>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Tombol aksi. Primary: 1 aksi utama per layar. Accent: CTA fun (mis.
            Bagikan Impact, Download Poster). Secondary: aksi pendamping. Ghost:
            aksi ringan/tersier. Danger: hapus/batal (hanya role super dan
            core). Loading: saat request berjalan, cegah klik ganda. Tinggi
            Medium 44px (target sentuh mobile), Small 36px. Bentuk pill.
          </p>

          {/* 40-variant Matrix (8 columns x 5 rows) */}
          <div className="overflow-x-auto pb-4">
            <table className="min-w-[1280px] w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[120px]">
                    Variant
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Med / Default
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Med / Hover
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Med / Loading
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Med / Disabled
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Sm / Default
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Sm / Hover
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Sm / Loading
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    Sm / Disabled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {(
                  ["primary", "accent", "secondary", "ghost", "danger"] as const
                ).map((variant) => (
                  <tr key={variant} className="hover:bg-neutral-50/50">
                    <td className="py-4 px-4 font-['Inter'] font-semibold text-sm capitalize text-[#142023]">
                      {variant}
                    </td>
                    <td className="py-4 px-4">
                      <Button variant={variant} size="md" forcedState="default">
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant={variant} size="md" forcedState="hover">
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant={variant} size="md" forcedState="loading">
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant={variant}
                        size="md"
                        forcedState="disabled"
                      >
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant={variant} size="sm" forcedState="default">
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant={variant} size="sm" forcedState="hover">
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant={variant} size="sm" forcedState="loading">
                        Simpan Donasi
                      </Button>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant={variant}
                        size="sm"
                        forcedState="disabled"
                      >
                        Simpan Donasi
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Tester */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
              Live Test Buttons (Interactive with Pop Shadow):
            </span>
            <Button
              variant="primary"
              size="md"
              isLoading={buttonLoading}
              onClick={() => toast.success("Tombol Primary diklik!")}
            >
              <Plus className="size-4" /> Tambah Donasi
            </Button>
            <Button
              variant="accent"
              size="md"
              onClick={() => toast("Membagikan impact relawan!")}
            >
              <Sparkles className="size-4" /> Bagikan Impact
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => toast.info("Tombol Secondary")}
            >
              Batal
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast("Tombol Ghost")}
            >
              Lihat Detail
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => toast.error("Hapus data donasi!")}
            >
              <Trash2 className="size-3.5" /> Hapus
            </Button>
          </div>
        </div>

        {/* =============================================================
            2. FIGMA DOC: ICON BUTTON (Node 17:127)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-127
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    2. Icon Button
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 17:127
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/icon-button.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<IconButton variant="primary" size="md" aria-label="Tambah"><Plus /></IconButton>',
                    "icon-btn-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "icon-btn-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-127&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Tombol ikon tanpa label teks: tambah cepat (+), cari (kaca
            pembesar), menu titik tiga (more), filter, close (×), dan hapus
            (trash). Medium 44×44px, Small 36×36px.
          </p>

          {/* 24-variant Matrix (6 columns x 4 rows) */}
          <div className="overflow-x-auto pb-4">
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
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
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
        </div>

        {/* =============================================================
            3. FIGMA DOC: INPUT (Node 18:221)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-221
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    3. Input Field
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 18:221
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/input.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<Input label="Nama Donatur" placeholder="cth. Hotel Tentrem" />',
                    "input-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "input-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-221&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Field input formulir: teks, nomor porsi, email donatur, lokasi
            penjemputan. Dilengkapi label semi-bold, helper text / error
            message, slot leading/trailing icon, dan ring fokus tosca 3px.
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
              <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
                Live Interactive Input (Try typing &amp; focusing):
              </span>
              <Input
                label="Cari Donatur atau Lokasi"
                placeholder="Ketik kata kunci..."
                value={testInputValue}
                onChange={(e) => setTestInputValue(e.target.value)}
                leadingIcon={<Search />}
                helperText="Tekan Enter untuk memfilter data"
              />
            </div>
            <div className="space-y-2 w-full max-w-sm">
              <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
                Live Interactive With Error:
              </span>
              <Input
                label="Nomor Telepon Hero"
                defaultValue="0812abc"
                error="Format nomor telepon hanya boleh berisi angka"
                leadingIcon={<Building />}
              />
            </div>
          </div>
        </div>

        {/* =============================================================
            4. FIGMA DOC: TEXTAREA (Node 18:245)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-245
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    4. Textarea
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 18:245
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/textarea.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<Textarea label="Catatan" placeholder="Tuliskan catatan..." helperText="Opsional" />',
                    "textarea-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "textarea-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-245&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
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
              <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
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
        </div>

        {/* =============================================================
            5. FIGMA DOC: CHECKBOX (Node 18:275)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-275
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    5. Checkbox
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 18:275
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/checkbox.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<Checkbox checked={true} label="Basi / Tidak Layak" />',
                    "checkbox-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "checkbox-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-275&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Pilihan on/off di form: Basi / Tidak Layak, Blokir Hero,
            multi-select beneficiary di dropdown. Area klik mencakup label.
          </p>

          {/* 6-variant Matrix (2 columns x 3 rows) matching Node 18:274 */}
          <div className="overflow-x-auto pb-4">
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[180px]">
                    Checked State
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    State = Default
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    State = Disabled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    Checked = False
                  </td>
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={false}
                      label="Basi / Tidak Layak"
                      forcedState="default"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={false}
                      label="Basi / Tidak Layak"
                      forcedState="disabled"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    Checked = True
                  </td>
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={true}
                      label="Basi / Tidak Layak"
                      forcedState="default"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={true}
                      label="Basi / Tidak Layak"
                      forcedState="disabled"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    Checked = Indeterminate
                  </td>
                  <td className="py-4 px-4">
                    <Checkbox
                      checked="indeterminate"
                      label="Basi / Tidak Layak"
                      forcedState="default"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <Checkbox
                      checked="indeterminate"
                      label="Basi / Tidak Layak"
                      forcedState="disabled"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Tester */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-6">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
              Live Interactive Checkbox:
            </span>
            <Checkbox
              checked={checkbox1}
              onChange={(c) => setCheckbox1(c === true)}
              label="Makanan butuh box berpendingin (4°C)"
            />
            <Checkbox
              checked={checkbox2}
              onChange={() => {
                setCheckbox2((prev) => {
                  if (prev === "indeterminate") return true;
                  if (prev === true) return false;
                  return "indeterminate";
                });
              }}
              label="Pilih Semua Mitra (Klik untuk siklus Tri-State)"
            />
          </div>
        </div>

        {/* =============================================================
            6. FIGMA DOC: TOGGLE (Node 18:295)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-295
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    6. Toggle (Switch)
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 18:295
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/switch.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<Toggle on={switchState} onChange={setSwitchState} label="Umumkan" />',
                    "toggle-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "toggle-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-295&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Switch untuk pengaturan yang langsung berlaku: Donasi (CSR) dan
            Umumkan (broadcast ke relawan) di form donasi. Track 48×28px pill,
            Thumb 22×22px white circle with 2px stroke and pop-shadow.
          </p>

          {/* 4-variant Matrix (2 columns x 2 rows) matching Node 18:294 */}
          <div className="overflow-x-auto pb-4">
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[180px]">
                    On State
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    State = Default
                  </th>
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    State = Disabled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    On = False
                  </td>
                  <td className="py-4 px-4">
                    <Toggle on={false} label="Umumkan" forcedState="default" />
                  </td>
                  <td className="py-4 px-4">
                    <Toggle on={false} label="Umumkan" forcedState="disabled" />
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    On = True
                  </td>
                  <td className="py-4 px-4">
                    <Toggle on={true} label="Umumkan" forcedState="default" />
                  </td>
                  <td className="py-4 px-4">
                    <Toggle on={true} label="Umumkan" forcedState="disabled" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Tester */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-6">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
              Live Interactive Toggle:
            </span>
            <Toggle
              on={interactiveToggle}
              onChange={setInteractiveToggle}
              label={`Broadcast ke Relawan (${interactiveToggle ? "Aktif" : "Non-aktif"})`}
            />
            <Toggle
              checked={switchState}
              onChange={setSwitchState}
              label={`Notifikasi WhatsApp (${switchState ? "Aktif" : "Non-aktif"})`}
            />
          </div>
        </div>

        {/* =============================================================
            7. FIGMA DOC: FILTER CHIP (Node 18:311)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-311
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    7. Filter Chip
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 18:311
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/filter-chip.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    "<FilterChip selected count={12}>Universitas</FilterChip>",
                    "filter-chip-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "filter-chip-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-311&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Filter kategori satu-pilihan di toolbar: CSR / Food Rescue, Semua /
            Universitas / Yayasan / Masyarakat Umum, status reimburse. Selected
            memakai tinta gelap (#142023) + angka kuning (#ffda57) agar terasa
            fun namun tetap jelas.
          </p>

          {/* 6-variant Matrix matching Node 18:310 */}
          <div className="overflow-x-auto pb-4">
            <table className="min-w-[640px] w-full border-collapse">
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
                  <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                    State = Selected
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    Dengan Counter
                  </td>
                  <td className="py-4 px-4">
                    <FilterChip
                      label="Universitas"
                      count="12"
                      forcedState="default"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <FilterChip
                      label="Universitas"
                      count="12"
                      forcedState="hover"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <FilterChip
                      label="Universitas"
                      count="12"
                      forcedState="selected"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50">
                  <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-[#142023]">
                    Tanpa Counter
                  </td>
                  <td className="py-4 px-4">
                    <FilterChip
                      label="Universitas"
                      showCount={false}
                      forcedState="default"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <FilterChip
                      label="Universitas"
                      showCount={false}
                      forcedState="hover"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <FilterChip
                      label="Universitas"
                      showCount={false}
                      forcedState="selected"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Tester */}
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
              Live Interactive Filter Toolbar:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: "semua", label: "Semua", count: 24 },
                { key: "csr", label: "CSR / Food Rescue", count: 8 },
                { key: "universitas", label: "Universitas", count: 12 },
                { key: "yayasan", label: "Yayasan", count: 4 },
                { key: "masyarakat", label: "Masyarakat Umum", count: 5 },
              ].map((item) => (
                <FilterChip
                  key={item.key}
                  selected={selectedFilter === item.key}
                  onClick={() => setSelectedFilter(item.key)}
                  count={item.count}
                >
                  {item.label}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>

        {/* =============================================================
            8. FIGMA DOC: TAG (Node 18:325)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-325
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    8. Tag
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 18:325
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/tag.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    "<Tag onRemove={handleRemove}>Universitas Gadjah Mada</Tag>",
                    "tag-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "tag-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-325&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Item terpilih yang bisa dihapus (×): beneficiary terpilih pada form
            donasi, filter aktif. Klik × menghapus pilihan. Warna tosca lembut
            Bondi-50 dengan teks tosca tua Bondi-900.
          </p>

          {/* Matrix matching Node 18:324 */}
          <div className="overflow-x-auto pb-4">
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
        </div>

        {/* =============================================================
            9. FIGMA DOC: OPTION CARD (Node 138:11319)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=138-11319
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    9. Option Card
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 138:11319
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/option-card.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<OptionCard title="Universitas" description="Kampus & mahasiswa" selected={true} />',
                    "option-card-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "option-card-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=138-11319&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Pilihan tunggal berbentuk kartu (radio). Gunakan untuk 2–4 opsi yang
            perlu dibandingkan, mis. jenis beneficiary atau tipe donatur. 220px
            width, 40px icon badge, custom radio circle.
          </p>

          {/* 4-variant Matrix matching Node 138:11319 */}
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1050px]">
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
          </div>

          {/* Interactive Tester */}
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500 block">
              Live Interactive Radio Selection Group:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[760px]">
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
        </div>

        {/* =============================================================
            10. FIGMA DOC: FILE UPLOAD (Node 21:347)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-347
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    10. File Upload
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 21:347
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/file-upload.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<FileUpload state="default" onFileSelect={handleSelect} />',
                    "upload-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "upload-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-347&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

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
              Live Interactive Dropzone (Coba drag &amp; drop file
              foto/dokumen):
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
        </div>

        {/* =============================================================
            11. FIGMA DOC: GOOGLE SIGN-IN BUTTON (Node 32:536)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=32-536
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    11. Google Sign-In Button
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 32:536
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/google-sign-in-button.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    "<GoogleSignInButton onClick={handleSignIn} />",
                    "google-btn-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "google-btn-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=32-536&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Satu-satunya jalan masuk admin (PRD: Google Identity Services). Klik
            membuka Google Account Chooser. Loading: setelah token diterima dan
            dikirim ke POST /api/v1/auth/google. Jika popup ditutup, kembali ke
            Default tanpa request. Logo Google mengikuti pedoman merek Google,
            jangan diubah warnanya.
          </p>

          {/* 4-variant Matrix matching Node 32:535 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                State = Default
              </span>
              <GoogleSignInButton forcedState="default" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                State = Hover
              </span>
              <GoogleSignInButton forcedState="hover" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                State = Loading
              </span>
              <GoogleSignInButton forcedState="loading" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                State = Disabled
              </span>
              <GoogleSignInButton forcedState="disabled" />
            </div>
          </div>

          {/* Interactive Tester */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4">
            <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
              Live Interactive Button (Simulasi verifikasi 1.2 detik):
            </span>
            <div className="max-w-sm w-full">
              <GoogleSignInButton
                isLoading={googleLoading}
                onClick={() => {
                  setGoogleLoading(true);
                  setTimeout(() => {
                    setGoogleLoading(false);
                    toast.success("Berhasil terautentikasi via Google!");
                  }, 1200);
                }}
              />
            </div>
          </div>
        </div>

        {/* =============================================================
            12. FIGMA DOC: BENEFICIARY CARD (Node 137:563)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=137-563
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    12. Beneficiary Card
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 137:563
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/beneficiary-card.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<BeneficiaryCard name="Universitas Gadjah Mada" type="Kampus" rank="#1" heroesCount={24} impactCount="2.450" sharePercent={92} onDetail={handleDetail} onEdit={handleEdit} onDelete={handleDelete} />',
                    "beneficiary-card-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "beneficiary-card-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=137-563&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Kartu profil penerima manfaat (panti asuhan, yayasan, komunitas
            warga) dengan metrik relawan Heroes, kilogram dampak surplus pangan,
            indikator kuota bulanan (6px Progress Bar), serta aksi Detail, Edit,
            dan Hapus (Figma Node 137:563). Lebar kartu 352px, avatar 64px,
            tombol detail 38px height.
          </p>

          {/* 3 Live Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BeneficiaryCard
              name="Universitas Gadjah Mada"
              type="Kampus"
              rank="#1"
              avatarName="UGM"
              heroesCount={24}
              impactCount="2.450"
              sharePercent={92}
              shareText="92% dari kuota bulanan tersalurkan"
              onDetail={() =>
                toast.info("Membuka detail Universitas Gadjah Mada")
              }
              onEdit={() => toast.info("Edit data penerima UGM")}
              onDelete={() => toast.error("Hapus data penerima UGM")}
            />
            <BeneficiaryCard
              name="Panti Asuhan Sinar Melati"
              type="Panti Asuhan"
              rank="#2"
              avatarName="Sinar Melati"
              heroesCount={14}
              impactCount="1.240"
              sharePercent={85}
              shareText="85% dari kuota bulanan tersalurkan"
              onDetail={() =>
                toast.info("Membuka detail Panti Asuhan Sinar Melati")
              }
              onEdit={() => toast.info("Edit data penerima Sinar Melati")}
              onDelete={() => toast.error("Hapus data penerima Sinar Melati")}
            />
            <BeneficiaryCard
              name="Komunitas Dapur Berkah"
              type="Komunitas Warga"
              rank="#3"
              avatarName="Dapur Berkah"
              heroesCount={8}
              impactCount="680"
              sharePercent={60}
              shareText="60% dari kuota bulanan tersalurkan"
              onDetail={() =>
                toast.info("Membuka detail Komunitas Dapur Berkah")
              }
              onEdit={() => toast.info("Edit data penerima Dapur Berkah")}
              onDelete={() => toast.error("Hapus data penerima Dapur Berkah")}
            />
          </div>
        </div>

        {/* =============================================================
            13. FIGMA DOC: PROGRESS BAR (Node 138:7817)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=138-7817
            ============================================================= */}
        <div className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-10 shadow-xs flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Gabarito'] font-bold text-2xl text-[#142023] tracking-tight">
                    13. Progress Bar
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 138:7817
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/progress-bar.tsx
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    '<ProgressBar value={65} color="brand" showLabel />',
                    "progbar-code",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedToken === "progbar-code" ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Salin Tag</span>
                  </>
                )}
              </button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=138-7817&t=SzCwTYJWBfVK4FdY-4"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:text-brand hover:border-brand/40 bg-white transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>Figma</span>
              </a>
            </div>
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Indikator progres kuota penyaluran makanan surplus dan kuota
            penerima manfaat. Track 6px pill (#e2e7e8) dengan rounded-[999px]
            dan fill bar tosca brand (#007d85), kuning accent (#f5bc00), atau
            hijau success (#15803d) (Figma Node 138:7817).
          </p>

          {/* 21-Step Scale Matrix (Figma Node 138:7817) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Figma Variant Set: 21 Steps (0% - 100% · Interval 5%)
              </span>
              <span className="font-mono text-xs text-neutral-400">
                Width: 300px · Height: 6px
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 p-4 bg-neutral-50/70 rounded-2xl border border-neutral-200 max-h-[340px] overflow-y-auto">
              {Array.from({ length: 21 }, (_, i) => i * 5).map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-neutral-500 w-12 shrink-0">
                    {val}%
                  </span>
                  <div className="flex-1">
                    <ProgressBar value={val} color="brand" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Variants */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Color Variants &amp; Label
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2 shadow-2xs">
                <span className="text-xs font-mono font-medium text-neutral-700 block">
                  color="brand" (#007D85)
                </span>
                <ProgressBar value={75} color="brand" showLabel />
              </div>
              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2 shadow-2xs">
                <span className="text-xs font-mono font-medium text-neutral-700 block">
                  color="accent" (#F5BC00)
                </span>
                <ProgressBar value={50} color="accent" showLabel />
              </div>
              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2 shadow-2xs">
                <span className="text-xs font-mono font-medium text-neutral-700 block">
                  color="success" (#15803D)
                </span>
                <ProgressBar value={100} color="success" showLabel />
              </div>
            </div>
          </div>

          {/* Interactive Slider Tester */}
          <div className="pt-4 border-t border-neutral-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-['Inter'] font-semibold text-xs text-neutral-500">
                Live Interactive Slider Tester:
              </span>
              <div className="flex items-center gap-1.5">
                {[0, 25, 50, 75, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSliderProgress(preset)}
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer",
                      sliderProgress === preset
                        ? "bg-brand text-white font-bold"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700",
                    )}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={sliderProgress}
                onChange={(e) => setSliderProgress(Number(e.target.value))}
                className="flex-1 accent-[#007d85] cursor-pointer"
              />
              <span className="font-mono text-sm font-bold text-neutral-800 w-12 text-right">
                {sliderProgress}%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <ProgressBar value={sliderProgress} color="brand" showLabel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
