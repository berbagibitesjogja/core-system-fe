import * as React from "react";
import {
  ArrowDown,
  ArrowUpDown,
  Check,
  ChevronLeft,
  Copy,
  ExternalLink,
  Eye,
  HeartHandshake,
  Inbox,
  Package,
  Pencil,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import { Avatar } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { IconButton } from "#/components/ui/icon-button";
import { Skeleton } from "#/components/ui/skeleton";
import { TableCell, TableHead } from "#/components/ui/table";
import { BeneficiaryCard } from "#/components/shared/beneficiary-card";
import { EmptyState } from "#/components/shared/empty-state";
import { Pagination } from "#/components/shared/pagination";
import { StatCard } from "#/components/shared/stat-card";
import { toast } from "sonner";
import { cn } from "#/lib/utils";

interface DataDisplaySectionProps {
  onCopy: (text: string, token: string) => void;
  copiedToken: string | null;
}

export function DataDisplaySection({
  onCopy,
  copiedToken,
}: DataDisplaySectionProps) {
  // Live state for Badge tester
  const [badgeTone, setBadgeTone] = React.useState<
    "neutral" | "brand" | "accent" | "success" | "warning" | "danger" | "info"
  >("success");
  const [badgeStyle, setBadgeStyle] = React.useState<"soft" | "solid">("soft");
  const [badgeDot, setBadgeDot] = React.useState(true);
  const [badgeLabel, setBadgeLabel] = React.useState("Selesai");

  // Live state for Avatar tester
  const [avatarSize, setAvatarSize] = React.useState<"sm" | "md" | "lg">("md");
  const [avatarShape, setAvatarShape] = React.useState<"circle" | "rounded">(
    "circle",
  );
  const [avatarType, setAvatarType] = React.useState<"initial" | "image">(
    "initial",
  );
  const [avatarName, setAvatarName] = React.useState("Utari Galih");

  // Live state for Stat Card tester
  const [statStyle, setStatStyle] = React.useState<
    "default" | "brand" | "accent"
  >("default");
  const [statLoading, setStatLoading] = React.useState(false);
  const [statValue, setStatValue] = React.useState("3.077");
  const [statUnit, setStatUnit] = React.useState("Kg");

  // Live state for Table Header Sort
  const [sortColumn, setSortColumn] = React.useState<string>("tanggal");
  const [sortDirection, setSortDirection] = React.useState<
    "asc" | "desc" | "none"
  >("desc");

  // Live state for Pagination tester
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 40;

  // Live state for Empty State tester
  const [emptyVisual, setEmptyVisual] = React.useState<"icon" | "illustration">(
    "icon",
  );
  const [emptySize, setEmptySize] = React.useState<"default" | "compact">(
    "default",
  );
  const [showEmptyAction, setShowEmptyAction] = React.useState(true);

  // Live state for Skeleton pulse demo
  const [isSkeletonActive, setIsSkeletonActive] = React.useState(false);

  // Live state for Beneficiary Card tester
  const [beneficiaryName, setBeneficiaryName] = React.useState(
    "Panti Asuhan Sinar Melati",
  );
  const [beneficiaryType, setBeneficiaryType] = React.useState("Panti Asuhan");
  const [beneficiaryRank, setBeneficiaryRank] = React.useState("#1");
  const [beneficiaryHeroes, setBeneficiaryHeroes] = React.useState(65);
  const [beneficiaryImpact, setBeneficiaryImpact] = React.useState(280);
  const [beneficiaryShare, setBeneficiaryShare] = React.useState(60);

  // Sort toggle handler
  const handleSort = (col: string) => {
    if (sortColumn === col) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") setSortDirection("none");
      else setSortDirection("asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Header Banner */}
      <div className="rounded-3xl border border-bondi-200 bg-gradient-to-br from-bondi-50/70 via-white to-sunny-50/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-bondi-200 bg-white px-3 py-1 text-xs font-semibold text-brand shadow-xs">
              <Sparkles className="size-3.5 text-accent" />
              <span>Figma Category · Data Display (Node 17:197 - 137:563)</span>
            </div>
            <h2 className="font-heading-h1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              9 Komponen Data Display, Tabel &amp; Kartu Lembaga BBJ
            </h2>
            <p className="font-body-m max-w-3xl text-sm text-neutral-600 sm:text-base">
              Spesifikasi resmi sistem penyajian data Bagi-Bagi Jogja: status
              Badge (14 varian), Avatar foto &amp; inisial (12 varian), Stat
              Card metrik dampak, sel dan header tabel, paginasi server-side,
              Empty State berilustrasi, placeholder Skeleton, serta Beneficiary
              Card profil lembaga penerima manfaat.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=12-143"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
            >
              <span>Buka di Figma</span>
              <ExternalLink className="size-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* =========================================================================
            1. DOC / BADGE (Node 17:197)
      ========================================================================= */}
        <section
          id="doc-badge"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 17:197
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  14 Varian Resmi (7 Tone × 2 Style)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                1. Badge
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Label status & kategori. Success = Selesai / Sudah Diambil.
                Warning = Proses / Menunggu. Info = Berjalan (ongoing). Danger =
                Diblokir / Basi. Brand = Aktif. Neutral = role & varian
                (student, company). Accent = program CSR. Soft untuk tabel,
                Solid untuk penekanan (mis. badge role SUPER).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Badge tone="success" styleVariant="soft" dot>Selesai</Badge>`,
                    "badge-code",
                  )
                }
              >
                {copiedToken === "badge-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-197"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 14-Variant Matrix Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
                Matriks Varian Figma (7 Tones × Soft & Solid)
              </h4>
              <span className="text-xs text-neutral-400">
                Inter SemiBold 12px · Dot 6px
              </span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-200 text-xs font-semibold text-neutral-500">
                    <th className="pb-3 pl-2">Tone</th>
                    <th className="pb-3">Deskripsi Peruntukan</th>
                    <th className="pb-3">Style: Soft (Tabel/Card)</th>
                    <th className="pb-3">Style: Solid (Penekanan)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/60 font-sans text-xs">
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Neutral
                    </td>
                    <td className="py-3 text-neutral-500">
                      Role & varian mitra (Student, Company)
                    </td>
                    <td className="py-3">
                      <Badge tone="neutral" styleVariant="soft" dot>
                        Neutral
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="neutral" styleVariant="solid" dot>
                        Neutral
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Brand
                    </td>
                    <td className="py-3 text-neutral-500">
                      Status Aktif, program utama BBJ
                    </td>
                    <td className="py-3">
                      <Badge tone="brand" styleVariant="soft" dot>
                        Aktif
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="brand" styleVariant="solid" dot>
                        Aktif
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Accent
                    </td>
                    <td className="py-3 text-neutral-500">
                      Program CSR sponsor, kolaborasi spesial
                    </td>
                    <td className="py-3">
                      <Badge tone="accent" styleVariant="soft" dot>
                        CSR Khusus
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="accent" styleVariant="solid" dot>
                        CSR Khusus
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Success
                    </td>
                    <td className="py-3 text-neutral-500">
                      Selesai, Sudah Diambil, Tuntas
                    </td>
                    <td className="py-3">
                      <Badge tone="success" styleVariant="soft" dot>
                        Selesai
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="success" styleVariant="solid" dot>
                        Selesai
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Warning
                    </td>
                    <td className="py-3 text-neutral-500">
                      Proses, Menunggu Konfirmasi / Kurir
                    </td>
                    <td className="py-3">
                      <Badge tone="warning" styleVariant="soft" dot>
                        Menunggu
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="warning" styleVariant="solid" dot>
                        Menunggu
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Danger
                    </td>
                    <td className="py-3 text-neutral-500">
                      Dibatalkan, Basi, Diblokir
                    </td>
                    <td className="py-3">
                      <Badge tone="danger" styleVariant="soft" dot>
                        Dibatalkan
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="danger" styleVariant="solid" dot>
                        Dibatalkan
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-2 font-semibold text-neutral-900">
                      Info
                    </td>
                    <td className="py-3 text-neutral-500">
                      Berjalan (ongoing), Dalam Pengantaran
                    </td>
                    <td className="py-3">
                      <Badge tone="info" styleVariant="soft" dot>
                        Berjalan
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge tone="info" styleVariant="solid" dot>
                        Berjalan
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Interactive Tester */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Badge Tester
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setBadgeTone("success");
                  setBadgeStyle("soft");
                  setBadgeDot(true);
                  setBadgeLabel("Selesai");
                }}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Pilih Tone
                </label>
                <select
                  value={badgeTone}
                  onChange={(e) => setBadgeTone(e.target.value as any)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-hidden"
                >
                  <option value="neutral">Neutral</option>
                  <option value="brand">Brand</option>
                  <option value="accent">Accent</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                  <option value="info">Info</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Pilih Style
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setBadgeStyle("soft")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      badgeStyle === "soft"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Soft
                  </button>
                  <button
                    type="button"
                    onClick={() => setBadgeStyle("solid")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      badgeStyle === "solid"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Solid
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Indikator Dot
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setBadgeDot(true)}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      badgeDot
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Dot On
                  </button>
                  <button
                    type="button"
                    onClick={() => setBadgeDot(false)}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      !badgeDot
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Tanpa Dot
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Teks Label
                </label>
                <input
                  type="text"
                  value={badgeLabel}
                  onChange={(e) => setBadgeLabel(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
              <span className="text-xs text-neutral-500">Hasil Render:</span>
              <Badge tone={badgeTone} styleVariant={badgeStyle} dot={badgeDot}>
                {badgeLabel || "Label"}
              </Badge>
            </div>
          </div>
        </section>

        {/* =========================================================================
          2. DOC / AVATAR (Node 17:237)
      ========================================================================= */}
        <section
          id="doc-avatar"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 17:237
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  12 Varian Resmi (3 Size × 2 Shape × 2 Type)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                2. Avatar
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Foto profil Google SSO (Type Image) atau inisial (Type Initial).
                Bentuk Circle untuk orang (admin, volunteer, hero). Bentuk
                Rounded untuk lembaga (beneficiary, sponsor/logo mitra). Small
                32px, Medium 40px, Large 64px.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Avatar name="Utari Galih" size="md" shape="circle" />`,
                    "avatar-code",
                  )
                }
              >
                {copiedToken === "avatar-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-237"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 12-Variant Matrix Display */}
          <div className="space-y-3">
            <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
              Matriks Varian Figma (12 Kombinasi)
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Small 32px */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="font-label text-xs font-bold text-neutral-900">
                    Small · 32×32px
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Tabel & Kartu Ringkas
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar name="UG" size="sm" shape="circle" />
                    <span className="text-[11px] text-neutral-600">
                      Circle Initial
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      size="sm"
                      shape="circle"
                    />
                    <span className="text-[11px] text-neutral-600">
                      Circle Image
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar name="BB" size="sm" shape="rounded" />
                    <span className="text-[11px] text-neutral-600">
                      Rounded Initial
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                      size="sm"
                      shape="rounded"
                    />
                    <span className="text-[11px] text-neutral-600">
                      Rounded Image
                    </span>
                  </div>
                </div>
              </div>

              {/* Medium 40px */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="font-label text-xs font-bold text-neutral-900">
                    Medium · 40×40px (Default)
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Header & Profil Nav
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar name="UG" size="md" shape="circle" />
                    <span className="text-[11px] text-neutral-600">
                      Circle Initial
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      size="md"
                      shape="circle"
                    />
                    <span className="text-[11px] text-neutral-600">
                      Circle Image
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar name="BB" size="md" shape="rounded" />
                    <span className="text-[11px] text-neutral-600">
                      Rounded Initial
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                      size="md"
                      shape="rounded"
                    />
                    <span className="text-[11px] text-neutral-600">
                      Rounded Image
                    </span>
                  </div>
                </div>
              </div>

              {/* Large 64px */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="font-label text-xs font-bold text-neutral-900">
                    Large · 64×64px
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Halaman Profil Detail
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar name="UG" size="lg" shape="circle" />
                    <span className="text-[11px] text-neutral-600">
                      Circle Initial
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      size="lg"
                      shape="circle"
                    />
                    <span className="text-[11px] text-neutral-600">
                      Circle Image
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar name="BB" size="lg" shape="rounded" />
                    <span className="text-[11px] text-neutral-600">
                      Rounded Initial
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                      size="lg"
                      shape="rounded"
                    />
                    <span className="text-[11px] text-neutral-600">
                      Rounded Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Interactive Avatar Tester */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Avatar Tester
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAvatarSize("md");
                  setAvatarShape("circle");
                  setAvatarType("initial");
                  setAvatarName("Utari Galih");
                }}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Ukuran (Size)
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setAvatarSize(s)}
                      className={cn(
                        "flex-1 rounded-lg py-1 text-xs font-semibold uppercase transition-colors",
                        avatarSize === s
                          ? "bg-brand text-white"
                          : "text-neutral-600 hover:text-neutral-900",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Bentuk (Shape)
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setAvatarShape("circle")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      avatarShape === "circle"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Circle (Orang)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarShape("rounded")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      avatarShape === "rounded"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Rounded (Mitra)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Tipe Tampilan
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setAvatarType("initial")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      avatarType === "initial"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Initial
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarType("image")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      avatarType === "image"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Image
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Nama / Inisial
                </label>
                <input
                  type="text"
                  value={avatarName}
                  onChange={(e) => setAvatarName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <Avatar
                  name={avatarName}
                  src={
                    avatarType === "image"
                      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                      : undefined
                  }
                  size={avatarSize}
                  shape={avatarShape}
                />
                <div className="space-y-0.5">
                  <p className="font-label text-sm font-semibold text-neutral-900">
                    {avatarName || "Anonim"}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Size: {avatarSize.toUpperCase()} · Shape: {avatarShape} ·
                    Type: {avatarType}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                Inisial:{" "}
                {avatarName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "?"}
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
          3. DOC / STAT CARD (Node 19:189)
      ========================================================================= */}
        <section
          id="doc-stat-card"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 19:189
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  3 Style Resmi (Default, Brand, Accent)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                3. Stat Card
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Kartu metrik untuk Dampak Kami, detail sponsor, beneficiary, dan
                hero. Default untuk sebagian besar metrik, Brand dan Accent
                hanya untuk 1 metrik sorotan per baris. Angka memakai Gabarito
                (Number/XL 40px) dengan pemisah ribuan titik, satuan terpisah
                (Aksi, Kg, Orang, Porsi, Rp).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<StatCard\n  title="Makanan Diselamatkan"\n  value="3.077"\n  unit="Kg"\n  trend={{ value: "+128 Kg", isPositive: true, label: "bulan ini" }}\n  styleVariant="default"\n/>`,
                    "statcard-code",
                  )
                }
              >
                {copiedToken === "statcard-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-189"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 3 Styles Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Style 1: Default */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-neutral-700">
                  Style: Default
                </span>
                <span className="text-xs text-neutral-400">
                  Putih + border neutral-200
                </span>
              </div>
              {statLoading ? (
                <div className="h-[174px] rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
                  <Skeleton shape="text" className="w-1/2" />
                  <Skeleton shape="block" className="h-12 w-3/4" />
                  <Skeleton shape="text" className="w-1/3" />
                </div>
              ) : (
                <StatCard
                  title="Makanan Diselamatkan"
                  value="3.077"
                  unit="Kg"
                  icon={<Utensils className="size-5" />}
                  trend={{
                    value: "+128 Kg",
                    isPositive: true,
                    label: "bulan ini",
                  }}
                  styleVariant="default"
                />
              )}
            </div>

            {/* Style 2: Brand */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-brand">
                  Style: Brand (Sorotan)
                </span>
                <span className="text-xs text-neutral-400">
                  Bg Bondi tosca + teks putih
                </span>
              </div>
              {statLoading ? (
                <div className="h-[172px] rounded-2xl border border-transparent bg-bondi-700/80 p-5 space-y-3">
                  <Skeleton shape="text" className="w-1/2 bg-white/30" />
                  <Skeleton shape="block" className="h-12 w-3/4 bg-white/30" />
                  <Skeleton shape="text" className="w-1/3 bg-white/30" />
                </div>
              ) : (
                <StatCard
                  title="Porsi Makanan Terbagi"
                  value="9.240"
                  unit="Porsi"
                  icon={<HeartHandshake className="size-5" />}
                  trend={{
                    value: "+14%",
                    isPositive: true,
                    label: "dari target",
                  }}
                  styleVariant="brand"
                />
              )}
            </div>

            {/* Style 3: Accent */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-neutral-900">
                  Style: Accent (Pop-Art)
                </span>
                <span className="text-xs text-neutral-400">
                  Kuning + border 1.5px + shadow-pop
                </span>
              </div>
              {statLoading ? (
                <div className="h-[175px] rounded-2xl border-[1.5px] border-neutral-900 bg-accent p-5 space-y-3">
                  <Skeleton shape="text" className="w-1/2 bg-neutral-900/20" />
                  <Skeleton
                    shape="block"
                    className="h-12 w-3/4 bg-neutral-900/20"
                  />
                  <Skeleton shape="text" className="w-1/3 bg-neutral-900/20" />
                </div>
              ) : (
                <StatCard
                  title="Penerima Manfaat Aktif"
                  value="48"
                  unit="Lembaga"
                  icon={<Users className="size-5" />}
                  trend={{
                    value: "+6 Baru",
                    isPositive: true,
                    label: "bulan ini",
                  }}
                  styleVariant="accent"
                />
              )}
            </div>
          </div>

          {/* Live Interactive Stat Card Tester */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Stat Card Tester
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatStyle("default");
                  setStatValue("3.077");
                  setStatUnit("Kg");
                  setStatLoading(false);
                }}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Pilih Varian
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  {(["default", "brand", "accent"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatStyle(st)}
                      className={cn(
                        "flex-1 rounded-lg py-1 text-xs font-semibold capitalize transition-colors",
                        statStyle === st
                          ? "bg-brand text-white"
                          : "text-neutral-600 hover:text-neutral-900",
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Nilai Angka
                </label>
                <input
                  type="text"
                  value={statValue}
                  onChange={(e) => setStatValue(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Satuan (Unit)
                </label>
                <select
                  value={statUnit}
                  onChange={(e) => setStatUnit(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-hidden"
                >
                  <option value="Kg">Kg (Kilogram)</option>
                  <option value="Porsi">Porsi</option>
                  <option value="Orang">Orang</option>
                  <option value="Lembaga">Lembaga</option>
                  <option value="Aksi">Aksi</option>
                  <option value="Rp">Rp (Rupiah)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Simulasi Loading
                </label>
                <Button
                  variant={statLoading ? "primary" : "secondary"}
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => setStatLoading(!statLoading)}
                >
                  {statLoading ? "Matikan Skeleton" : "Nyalakan Skeleton"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
          4. DOC / TABLE HEADER CELL (Node 19:252)
      ========================================================================= */}
        <section
          id="doc-table-header"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 19:252
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  4 Varian Resmi (Left/Right × None/Sorted)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                4. Table Header Cell
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Header kolom tabel. Tinggi 44px, latar belakang subtle
                neutral-100 (#EEF1F2), border-b 1px, teks Inter Bold 11px
                uppercase dengan tracking 0.66px. Rata kanan untuk angka (Kuota,
                Berat, Jumlah, Nominal). Sorted menandai kolom urutan default
                (mis. Tanggal terbaru).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<TableHead sort="asc" onSort={() => {}} align="left">NAMA DONATUR</TableHead>`,
                    "table-header-code",
                  )
                }
              >
                {copiedToken === "table-header-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-252"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 4-Variant Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-neutral-800">
                  1. Align: Left, Sort: None
                </span>
                <span className="text-[11px] text-neutral-500">Teks Biasa</span>
              </div>
              <div className="h-11 rounded-xl border border-neutral-200 bg-[#eef1f2] px-4 flex items-center justify-between">
                <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  NAMA DONATUR
                </span>
                <ArrowUpDown className="size-3.5 text-neutral-400 opacity-60" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-brand">
                  2. Align: Left, Sort: Sorted (Active)
                </span>
                <span className="text-[11px] text-neutral-500">
                  Urutan Default
                </span>
              </div>
              <div className="h-11 rounded-xl border border-bondi-200 bg-[#eef1f2] px-4 flex items-center justify-between shadow-xs">
                <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                  TANGGAL DONASI
                </span>
                <ArrowDown className="size-3.5 text-brand" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-neutral-800">
                  3. Align: Right, Sort: None
                </span>
                <span className="text-[11px] text-neutral-500">
                  Kolom Angka/Berat
                </span>
              </div>
              <div className="h-11 rounded-xl border border-neutral-200 bg-[#eef1f2] px-4 flex items-center justify-end gap-1.5">
                <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  BERAT TOTAL (KG)
                </span>
                <ArrowUpDown className="size-3.5 text-neutral-400 opacity-60" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-bold text-brand">
                  4. Align: Right, Sort: Sorted
                </span>
                <span className="text-[11px] text-neutral-500">
                  Angka Terbesar
                </span>
              </div>
              <div className="h-11 rounded-xl border border-bondi-200 bg-[#eef1f2] px-4 flex items-center justify-end gap-1.5 shadow-xs">
                <span className="font-label text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                  ESTIMASI PORSI
                </span>
                <ArrowDown className="size-3.5 text-brand" />
              </div>
            </div>
          </div>

          {/* Interactive Header Sort Tester Bar */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Uji Coba Sort Header Tabel (Klik Kolom)
              </span>
              <span className="text-xs text-neutral-500">
                Aktif: Kolom{" "}
                <strong className="text-neutral-900 uppercase">
                  {sortColumn}
                </strong>{" "}
                ({sortDirection})
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#eef1f2] border-b border-neutral-200">
                    <TableHead
                      sort={sortColumn === "donatur" ? sortDirection : "none"}
                      onSort={() => handleSort("donatur")}
                    >
                      DONATUR
                    </TableHead>
                    <TableHead
                      sort={sortColumn === "makanan" ? sortDirection : "none"}
                      onSort={() => handleSort("makanan")}
                    >
                      JENIS MAKANAN
                    </TableHead>
                    <TableHead
                      sort={sortColumn === "tanggal" ? sortDirection : "none"}
                      onSort={() => handleSort("tanggal")}
                    >
                      TANGGAL
                    </TableHead>
                    <TableHead
                      align="right"
                      sort={sortColumn === "jumlah" ? sortDirection : "none"}
                      onSort={() => handleSort("jumlah")}
                    >
                      JUMLAH PORSI
                    </TableHead>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-xs text-neutral-500">
                    <td className="px-4 py-3">Hotel Tentrem</td>
                    <td className="px-4 py-3">Pastry & Roti Aneka</td>
                    <td className="px-4 py-3">08 Nov 2026</td>
                    <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                      45 Porsi
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
          5. DOC / TABLE CELL (Node 19:298)
      ========================================================================= */}
        <section
          id="doc-table-cell"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 19:298
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  6 Tipe Konten Resmi
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                5. Table Cell
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Sel isi tabel, tinggi standar 64px, garis bawah 1px
                (border-neutral-100). 6 tipe: Text, Text + Subtext, Avatar +
                Text, Number (rata kanan), Badge (status), dan Actions (Lihat,
                Edit, Hapus - hapus disembunyikan untuk role staff). Di mobile
                (&lt;768px) baris tabel dapat bertransformasi menjadi kartu
                tumpuk.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<TableCell>\n  <div className="flex flex-col">\n    <span className="font-label text-sm font-semibold text-neutral-900">Royal Ambarrukmo</span>\n    <span className="text-xs text-neutral-500">Sleman, DI Yogyakarta</span>\n  </div>\n</TableCell>`,
                    "table-cell-code",
                  )
                }
              >
                {copiedToken === "table-cell-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-298"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 6 Types Demonstration Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
                Live Showcase 6 Tipe Sel Tabel BBJ (Tinggi 64px)
              </h4>
              <span className="text-xs text-neutral-400">
                Desktop Table View & Actions
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="bg-[#eef1f2] border-b border-neutral-200">
                    <TableHead className="w-56">
                      1. TYPE: TEXT + SUBTEXT
                    </TableHead>
                    <TableHead className="w-64">
                      2. TYPE: AVATAR + TEXT
                    </TableHead>
                    <TableHead className="w-40" align="right">
                      3. TYPE: NUMBER
                    </TableHead>
                    <TableHead className="w-36">4. TYPE: BADGE</TableHead>
                    <TableHead className="w-40" align="right">
                      5. TYPE: ACTIONS
                    </TableHead>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 bg-white">
                  {/* Row 1 */}
                  <tr className="hover:bg-neutral-50/70 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-label text-sm font-semibold text-neutral-900">
                          Nasi Kotak Ayam Bakar
                        </span>
                        <span className="font-sans text-xs text-neutral-500">
                          Menu lengkap + lalapan sayur
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar name="RA" size="sm" shape="rounded" />
                        <div className="flex flex-col">
                          <span className="font-label text-sm font-semibold text-neutral-900">
                            Royal Ambarrukmo
                          </span>
                          <span className="font-sans text-xs text-neutral-500">
                            Depok, Sleman
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <span className="font-label text-sm font-bold text-neutral-900">
                        75 Porsi
                      </span>
                      <span className="block text-xs text-neutral-500">
                        ~22.5 Kg
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge tone="success" styleVariant="soft" dot>
                        Selesai
                      </Badge>
                    </TableCell>
                    <TableCell align="right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        <IconButton
                          aria-label="Lihat Detail"
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="size-4" />
                        </IconButton>
                        <IconButton
                          aria-label="Edit Data"
                          variant="ghost"
                          size="sm"
                        >
                          <Pencil className="size-4" />
                        </IconButton>
                        <IconButton
                          aria-label="Hapus (Admin)"
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-neutral-50/70 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-label text-sm font-semibold text-neutral-900">
                          Roti Manis & Pastry
                        </span>
                        <span className="font-sans text-xs text-neutral-500">
                          Kemasan higienis tertutup
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                          size="sm"
                          shape="circle"
                        />
                        <div className="flex flex-col">
                          <span className="font-label text-sm font-semibold text-neutral-900">
                            Budi Santoso
                          </span>
                          <span className="font-sans text-xs text-neutral-500">
                            Hero Volunteer
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <span className="font-label text-sm font-bold text-neutral-900">
                        120 Pcs
                      </span>
                      <span className="block text-xs text-neutral-500">
                        ~14.0 Kg
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge tone="warning" styleVariant="soft" dot>
                        Menunggu
                      </Badge>
                    </TableCell>
                    <TableCell align="right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        <IconButton
                          aria-label="Lihat Detail"
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="size-4" />
                        </IconButton>
                        <IconButton
                          aria-label="Edit Data"
                          variant="ghost"
                          size="sm"
                        >
                          <Pencil className="size-4" />
                        </IconButton>
                        <IconButton
                          aria-label="Hapus (Admin)"
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-neutral-50/70 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-label text-sm font-semibold text-neutral-900">
                          Bahan Pangan Segar
                        </span>
                        <span className="font-sans text-xs text-neutral-500">
                          Sayuran & buah surplus panen
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar name="PS" size="sm" shape="rounded" />
                        <div className="flex flex-col">
                          <span className="font-label text-sm font-semibold text-neutral-900">
                            Pasar Stan Maguwo
                          </span>
                          <span className="font-sans text-xs text-neutral-500">
                            Mitra Komunitas
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <span className="font-label text-sm font-bold text-neutral-900">
                        50 Kg
                      </span>
                      <span className="block text-xs text-neutral-500">
                        Pangan Segar
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge tone="info" styleVariant="soft" dot>
                        Berjalan
                      </Badge>
                    </TableCell>
                    <TableCell align="right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        <IconButton
                          aria-label="Lihat Detail"
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="size-4" />
                        </IconButton>
                        <IconButton
                          aria-label="Edit Data"
                          variant="ghost"
                          size="sm"
                        >
                          <Pencil className="size-4" />
                        </IconButton>
                        <IconButton
                          aria-label="Hapus (Admin)"
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
          6. DOC / PAGINATION (Node 19:308)
      ========================================================================= */}
        <section
          id="doc-pagination"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 19:308
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  Komponen Server-side Paginasi
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                6. Pagination
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Paginasi server-side. Kiri: rentang data (&quot;1 - 10 dari
                392&quot;). Kanan: tombol prev bulat, nomor halaman (Page Item
                36×36px), tombol next bulat. Halaman aktif berwarna tinta
                (bg-neutral-900). Di mobile sembunyikan nomor tengah dan
                tampilkan &quot;Hal 1 / 40&quot;.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Pagination\n  currentPage={1}\n  totalPages={40}\n  rangeText="1 - 10 dari 392 data"\n  onPageChange={(page) => {}}\n/>`,
                    "pagination-code",
                  )
                }
              >
                {copiedToken === "pagination-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-308"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* Page Item States */}
          <div className="space-y-3">
            <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
              States Tombol Nomor (Page Item · 36×36px)
            </h4>
            <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
              <div className="flex items-center gap-2">
                <span className="size-9 rounded-md border border-neutral-200 bg-white flex items-center justify-center font-label text-sm font-semibold text-neutral-700 shadow-2xs">
                  1
                </span>
                <span className="text-xs text-neutral-600">State: Default</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-9 rounded-md bg-neutral-100 flex items-center justify-center font-label text-sm font-semibold text-neutral-900">
                  1
                </span>
                <span className="text-xs text-neutral-600">State: Hover</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-9 rounded-md bg-neutral-900 flex items-center justify-center font-label text-sm font-semibold text-white shadow-xs">
                  1
                </span>
                <span className="text-xs text-neutral-600 font-semibold">
                  State: Active (Tinta)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-9 rounded-md border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 shadow-2xs">
                  <ChevronLeft className="size-4" />
                </span>
                <span className="text-xs text-neutral-600">
                  Prev/Next (rounded-md)
                </span>
              </div>
            </div>
          </div>

          {/* Live Interactive Pagination Component */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Pagination Demo
              </span>
              <span className="text-xs text-neutral-500">
                Halaman Aktif:{" "}
                <strong className="text-neutral-900">{currentPage}</strong> dari{" "}
                {totalPages}
              </span>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                rangeText={`${(currentPage - 1) * 10 + 1} - ${Math.min(currentPage * 10, 392)} dari 392 donasi`}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <span>
                ℹ️ Coba klik nomor halaman, prev, atau next untuk menguji logika
                ellipsis dinamis.
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(1)}
              >
                Reset ke Hal 1
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
          7. DOC / EMPTY STATE (Node 21:287)
      ========================================================================= */}
        <section
          id="doc-empty-state"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 21:287
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  4 Varian Resmi (2 Size × 2 Visual)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                7. Empty State
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Kondisi data kosong atau pencarian tanpa hasil. Default (lebar
                400px) untuk halaman/tabel utama, Compact (lebar 320px) untuk
                kartu dan dropdown. Dua varian visual: Icon (container
                rounded-2xl bg-bondi-50) atau Illustration (grafik ilustrasi
                flat Bondi). Copy hangat dan berikan langkah berikutnya yang
                jelas.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<EmptyState\n  title="Belum ada data donasi"\n  description="Data akan muncul di sini setelah mitra menambahkan makanan surplus."\n  action={<Button variant="primary">Tambah Donasi</Button>}\n  size="default"\n  visual="icon"\n/>`,
                    "empty-state-code",
                  )
                }
              >
                {copiedToken === "empty-state-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-287"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 4-Variant Grid Showcase */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Variant 1: Default + Icon */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                1. Size: Default · Visual: Icon (400px)
              </span>
              <EmptyState
                title="Belum ada data donasi"
                description="Data donasi pangan akan muncul di sini setelah mitra mengirimkan formulir donasi."
                size="default"
                visual="icon"
                icon={<Package className="size-10 text-brand" />}
                action={<Button variant="primary">Tambah Donasi Baru</Button>}
              />
            </div>

            {/* Variant 2: Compact + Icon */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                2. Size: Compact · Visual: Icon (320px)
              </span>
              <EmptyState
                title="Tidak ada hasil pencarian"
                description="Coba ubah kata kunci atau hapus filter yang aktif saat ini."
                size="compact"
                visual="icon"
                icon={<Search className="size-7 text-brand" />}
                action={
                  <Button variant="secondary" size="sm">
                    Reset Filter
                  </Button>
                }
              />
            </div>

            {/* Variant 3: Default + Illustration */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                3. Size: Default · Visual: Illustration (200px)
              </span>
              <EmptyState
                title="Daftar Relawan Kosong"
                description="Belum ada pendaftaran relawan gelombang baru untuk batch akhir pekan ini."
                size="default"
                visual="illustration"
                illustration={
                  <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-bondi-50 to-sunny-50 text-brand p-4">
                    <Users className="size-16 text-brand mb-1" />
                    <span className="text-[11px] font-semibold text-neutral-600">
                      Ilustrasi Relawan BBJ
                    </span>
                  </div>
                }
                action={<Button variant="primary">Buka Pendaftaran</Button>}
              />
            </div>

            {/* Variant 4: Compact + Illustration */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                4. Size: Compact · Visual: Illustration (140px)
              </span>
              <EmptyState
                title="Notifikasi Kosong"
                description="Semua aktivitas donasi telah selesai ditinjau."
                size="compact"
                visual="illustration"
                illustration={
                  <div className="flex size-full flex-col items-center justify-center bg-bondi-50 text-brand p-3">
                    <Inbox className="size-10 text-brand mb-1" />
                    <span className="text-[10px] font-semibold text-neutral-600">
                      Semua Terbaca
                    </span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Live Interactive Empty State Tester */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Empty State Tester
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEmptySize("default");
                  setEmptyVisual("icon");
                  setShowEmptyAction(true);
                }}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Pilih Ukuran (Size)
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setEmptySize("default")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      emptySize === "default"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Default (400px)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmptySize("compact")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      emptySize === "compact"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Compact (320px)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Gaya Tampilan (Visual)
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setEmptyVisual("icon")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      emptyVisual === "icon"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Icon
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmptyVisual("illustration")}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      emptyVisual === "illustration"
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Illustration
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Tombol Aksi
                </label>
                <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setShowEmptyAction(true)}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      showEmptyAction
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Tampilkan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmptyAction(false)}
                    className={cn(
                      "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                      !showEmptyAction
                        ? "bg-brand text-white"
                        : "text-neutral-600 hover:text-neutral-900",
                    )}
                  >
                    Sembunyikan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
          8. DOC / SKELETON (Node 20:378)
      ========================================================================= */}
        <section
          id="doc-skeleton"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 20:378
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  3 Bentuk Resmi (Text, Circle, Block)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                8. Skeleton
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Placeholder loading untuk kartu metrik, avatar profil, grafik,
                dan baris tabel. Animasi shimmer kiri ke kanan 1.2 detik
                (pulse). Susun Skeleton mengikuti bentuk konten akhir sehingga
                transisi data terasa halus tanpa layout shift.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<div className="space-y-3">\n  <Skeleton shape="circle" />\n  <Skeleton shape="text" className="w-48" />\n  <Skeleton shape="block" className="h-28" />\n</div>`,
                    "skeleton-code",
                  )
                }
              >
                {copiedToken === "skeleton-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-378"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 3 Shapes Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="font-label text-xs font-bold text-neutral-900">
                  1. Shape: Text
                </span>
                <span className="text-xs text-neutral-500">
                  Tinggi 12px · rounded
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Untuk placeholder judul, subjudul, dan keterangan baris teks.
              </p>
              <div className="space-y-2 pt-2">
                <Skeleton shape="text" className="w-full" />
                <Skeleton shape="text" className="w-3/4" />
                <Skeleton shape="text" className="w-1/2" />
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="font-label text-xs font-bold text-neutral-900">
                  2. Shape: Circle
                </span>
                <span className="text-xs text-neutral-500">
                  40×40px · rounded-full
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Untuk placeholder avatar pengguna, ikon aksi, dan lencana bulat.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Skeleton shape="circle" className="size-8" />
                <Skeleton shape="circle" className="size-10" />
                <Skeleton shape="circle" className="size-14" />
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="font-label text-xs font-bold text-neutral-900">
                  3. Shape: Block
                </span>
                <span className="text-xs text-neutral-500">
                  Tinggi 120px · rounded-2xl
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Untuk kartu statistik, media cover donasi, dan banner dialog.
              </p>
              <div className="pt-2">
                <Skeleton shape="block" className="h-[120px]" />
              </div>
            </div>
          </div>

          {/* Live Loading Simulation: Complex Card */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Simulasi Loading Layout (Perbandingan Nyata)
                </span>
                <p className="text-xs text-neutral-500">
                  Uji coba animasi Skeleton saat data sedang dimuat vs data
                  siap.
                </p>
              </div>
              <Button
                variant={isSkeletonActive ? "primary" : "secondary"}
                size="sm"
                onClick={() => setIsSkeletonActive(!isSkeletonActive)}
              >
                {isSkeletonActive
                  ? "Tampilkan Data Asli"
                  : "Simulasikan Loading"}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Card 1: Stat Card Simulation */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
                {isSkeletonActive ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton shape="text" className="w-36 h-4" />
                      <Skeleton shape="circle" className="size-10" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton shape="text" className="w-28 h-9" />
                      <Skeleton shape="text" className="w-44 h-3.5" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label text-sm font-semibold text-neutral-600">
                        Makanan Tersalurkan
                      </span>
                      <div className="size-10 rounded-xl bg-bondi-50 flex items-center justify-center text-brand">
                        <HeartHandshake className="size-5" />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-number-xl text-neutral-900">
                        12.450
                      </span>
                      <span className="font-label font-semibold text-base text-neutral-600">
                        Porsi
                      </span>
                    </div>
                    <p className="text-xs text-green-700 font-semibold">
                      +18% dari target kuartal ini
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: User Row Simulation */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
                {isSkeletonActive ? (
                  <div className="flex items-center gap-3.5">
                    <Skeleton shape="circle" className="size-12" />
                    <div className="flex-1 space-y-2">
                      <Skeleton shape="text" className="w-3/4 h-4" />
                      <Skeleton shape="text" className="w-1/2 h-3" />
                    </div>
                    <Skeleton shape="block" className="size-8 rounded-full" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                        size="md"
                        shape="circle"
                      />
                      <div>
                        <p className="font-label text-sm font-bold text-neutral-900">
                          Utari Galih Maharani
                        </p>
                        <p className="text-xs text-neutral-500">
                          Koordinator Wilayah Sleman
                        </p>
                      </div>
                    </div>
                    <Badge tone="brand" styleVariant="soft" dot>
                      Admin Core
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
          9. DOC / BENEFICIARY CARD (Node 137:563)
      ========================================================================= */}
        <section
          id="doc-beneficiary-card"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 137:563
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  Kartu Profil Penerima Manfaat
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                9. Beneficiary Card
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Kartu presentasi profil lembaga penerima manfaat (panti asuhan,
                komunitas dhuafa, yayasan, universitas). Menampilkan identitas
                lembaga dengan Avatar rounded 64px, pill type lembaga, rank
                nomor, dua kolom metrik terpisah divider vertikal (Heroes Orang
                &amp; Impact Kg), Progress Bar kuota bulanan tersalurkan, serta
                tombol aksi cepat (Detail, Edit, Hapus).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<BeneficiaryCard\n  name="Panti Asuhan Sinar Melati"\n  type="Panti Asuhan"\n  rank="#1"\n  heroesCount={65}\n  impactCount={280}\n  sharePercent={60}\n  onDetail={() => {}}\n  onEdit={() => {}}\n  onDelete={() => {}}\n/>`,
                    "beneficiary-card-code",
                  )
                }
              >
                {copiedToken === "beneficiary-card-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=137-563"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 3 Real-World Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
                Showcase Kartu Lembaga Penerima (Lebar 352px · Responsive)
              </h4>
              <span className="text-xs text-neutral-400">
                Uji Coba Aksi Detail / Edit / Hapus via Toast
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BeneficiaryCard
                name="Universitas Gadjah Mada"
                type="Kantin Dhuafa"
                rank="#1"
                heroesCount={120}
                impactCount={450}
                sharePercent={75}
                onDetail={() =>
                  toast.info("Membuka detail dampak UGM...", {
                    description: "450 Kg makanan telah tersalurkan bulan ini.",
                  })
                }
                onEdit={() => toast.success("Membuka formulir edit data UGM")}
                onDelete={() =>
                  toast.error("Aksi hapus hanya untuk Super Admin")
                }
              />

              <BeneficiaryCard
                name="Panti Asuhan Sinar Melati"
                type="Panti Asuhan"
                rank="#2"
                heroesCount={65}
                impactCount={280}
                sharePercent={45}
                onDetail={() =>
                  toast.info("Membuka detail Panti Asuhan Sinar Melati...", {
                    description: "280 Kg makanan telah tersalurkan bulan ini.",
                  })
                }
                onEdit={() =>
                  toast.success("Membuka formulir edit data Sinar Melati")
                }
                onDelete={() =>
                  toast.error("Aksi hapus hanya untuk Super Admin")
                }
              />

              <BeneficiaryCard
                name="Komunitas Dapur Berkah Jogja"
                type="Komunitas Relawan"
                rank="#3"
                heroesCount={90}
                impactCount={320}
                sharePercent={90}
                onDetail={() =>
                  toast.info("Membuka detail Komunitas Dapur Berkah...", {
                    description: "320 Kg makanan telah tersalurkan bulan ini.",
                  })
                }
                onEdit={() =>
                  toast.success("Membuka formulir edit data Dapur Berkah")
                }
                onDelete={() =>
                  toast.error("Aksi hapus hanya untuk Super Admin")
                }
              />
            </div>
          </div>

          {/* Live Interactive Beneficiary Card Tester */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Beneficiary Card Tester
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setBeneficiaryName("Panti Asuhan Sinar Melati");
                  setBeneficiaryType("Panti Asuhan");
                  setBeneficiaryRank("#1");
                  setBeneficiaryHeroes(65);
                  setBeneficiaryImpact(280);
                  setBeneficiaryShare(60);
                }}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Nama Lembaga
                </label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Kategori Lembaga (Type)
                </label>
                <select
                  value={beneficiaryType}
                  onChange={(e) => setBeneficiaryType(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-hidden"
                >
                  <option value="Panti Asuhan">Panti Asuhan</option>
                  <option value="Komunitas Relawan">Komunitas Relawan</option>
                  <option value="Kantin Dhuafa">Kantin Dhuafa</option>
                  <option value="Pondok Pesantren">Pondok Pesantren</option>
                  <option value="Yayasan Sosial">Yayasan Sosial</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Peringkat (Rank)
                </label>
                <input
                  type="text"
                  value={beneficiaryRank}
                  onChange={(e) => setBeneficiaryRank(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Heroes (Orang)
                </label>
                <input
                  type="number"
                  value={beneficiaryHeroes}
                  onChange={(e) => setBeneficiaryHeroes(Number(e.target.value))}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs font-semibold text-neutral-600">
                  Impact (Kg)
                </label>
                <input
                  type="number"
                  value={beneficiaryImpact}
                  onChange={(e) => setBeneficiaryImpact(Number(e.target.value))}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label text-xs font-semibold text-neutral-600">
                    Persentase Kuota
                  </label>
                  <span className="font-mono text-xs font-bold text-brand">
                    {beneficiaryShare}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={beneficiaryShare}
                  onChange={(e) => setBeneficiaryShare(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4">
              <span className="text-xs text-neutral-500">
                Hasil Preview Real-time:
              </span>
              <BeneficiaryCard
                name={beneficiaryName || "Lembaga Tanpa Nama"}
                type={beneficiaryType}
                rank={beneficiaryRank}
                heroesCount={beneficiaryHeroes}
                impactCount={beneficiaryImpact}
                sharePercent={beneficiaryShare}
                onDetail={() =>
                  toast.info(`Detail untuk ${beneficiaryName}...`)
                }
                onEdit={() => toast.success(`Edit ${beneficiaryName}...`)}
                onDelete={() => toast.error("Hanya untuk Admin Super")}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
