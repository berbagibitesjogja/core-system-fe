import * as React from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  HelpCircle,
  Home,
  Info,
  Menu as MenuIcon,
  Package,
  Pencil,
  Plus,
  Receipt,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  User,
  Users,
  Utensils,
  XCircle,
} from "lucide-react";
import { Alert } from "#/components/ui/alert";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Dialog } from "#/components/ui/dialog";
import { IconButton } from "#/components/ui/icon-button";
import { MenuItem } from "#/components/ui/menu";
import { Toast, toast } from "#/components/ui/toast";
import { Tooltip } from "#/components/ui/tooltip";
import { BottomNavItem } from "#/components/shared/bottom-nav-item";
import { NavItem } from "#/components/shared/nav-item";

interface NavFeedbackSectionProps {
  onCopy: (text: string, token: string) => void;
  copiedToken: string | null;
}

export function NavFeedbackSection({
  onCopy,
  copiedToken,
}: NavFeedbackSectionProps) {
  // Live state for NavItem
  const [activeNavMenu, setActiveNavMenu] = React.useState("donasi");

  // Live state for BottomNavItem
  const [activeBottomNav, setActiveBottomNav] = React.useState("home");

  // Live state for Menu
  const [menuSearch, setMenuSearch] = React.useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = React.useState<
    string[]
  >(["ugm", "brspa"]);

  // Live state for Modal / Dialog
  const [isDefaultModalOpen, setIsDefaultModalOpen] = React.useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(false);

  // Live state for Alert
  const [alertDismissed, setAlertDismissed] = React.useState({
    info: false,
    success: false,
    warning: false,
    danger: false,
  });

  // Toggle multi-select checkbox di Menu
  const toggleBeneficiary = (id: string) => {
    setSelectedBeneficiaries((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleConfirmAction = (isDanger = false) => {
    setIsModalLoading(true);
    setTimeout(() => {
      setIsModalLoading(false);
      setIsDefaultModalOpen(false);
      setIsDangerModalOpen(false);
      if (isDanger) {
        toast.error("Donasi berhasil dihapus permanen.", {
          action: {
            label: "Urungkan",
            onClick: () => toast.info("Penghapusan dibatalkan."),
          },
        });
      } else {
        toast.success("Perubahan data berhasil disimpan.");
      }
    }, 1200);
  };

  return (
    <div className="space-y-12">
      {/* Category Header Banner */}
      <div className="rounded-3xl border border-bondi-200 bg-gradient-to-br from-bondi-50/70 via-white to-sunny-50/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-bondi-200 bg-white px-3 py-1 text-xs font-semibold text-brand shadow-xs">
              <Sparkles className="size-3.5 text-accent" />
              <span>
                Figma Category · Navigation &amp; Feedback (Node 19:220 -
                20:371)
              </span>
            </div>
            <h2 className="font-heading-h1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              7 Komponen Navigasi &amp; Feedback BBJ
            </h2>
            <p className="font-body-m max-w-3xl text-sm text-neutral-600 sm:text-base">
              Spesifikasi resmi sistem navigasi dan respon antarmuka pengguna
              Bagi-Bagi Jogja: Nav Item sidebar (3 status), Bottom Nav Item
              mobile (2 status), Menu dropdown multi-pilihan (8 varian), Modal
              dialog konfirmasi (2 tone), Toast notifikasi tinta gelap BBJ
              penindih Sonner (4 tone), Alert banner inline (4 tone), dan
              Tooltip penunjuk aksi (2 placement).
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
            1. DOC / NAV ITEM (Node 19:220)
      ========================================================================= */}
        <section
          id="doc-nav-item"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 19:220
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  3 Status Resmi (Default, Hover, Active)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                1. Nav Item
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Item navigasi sidebar desktop (lebar 240px, tinggi minimal
                40px). Kelompok menu: Utama (Home, Gallery), Operasional
                (Donasi, Beneficiaries, Heroes, Partner), Tim (Volunteer,
                Presensi, Reimburse), Admin (Logs, khusus super). Chevron untuk
                item dropdown (Reimburse, Logs). Menu yang tidak berhak dilihat
                disembunyikan, bukan dinonaktifkan.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<NavItem\n  label="Donasi"\n  icon={<Package className="size-5" />}\n  isActive={true}\n  onClick={() => {}}\n/>`,
                    "nav-item-code",
                  )
                }
              >
                {copiedToken === "nav-item-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-220"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 3 Status Static Matrix */}
          <div className="space-y-3">
            <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
              Matriks Status Figma (Default, Hover, Active)
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-2">
                <span className="font-label text-xs font-bold text-neutral-700">
                  State: Default
                </span>
                <p className="text-xs text-neutral-500">
                  Latar transparan, teks neutral-600, icon neutral-500.
                </p>
                <div className="pt-2">
                  <NavItem
                    label="Donasi"
                    icon={<Package className="size-5" />}
                    isActive={false}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-2">
                <span className="font-label text-xs font-bold text-neutral-900">
                  State: Hover
                </span>
                <p className="text-xs text-neutral-500">
                  Latar neutral-100 (#EEF1F2), teks neutral-700.
                </p>
                <div className="pt-2">
                  <div className="bg-[#eef1f2] rounded-xl">
                    <NavItem
                      label="Beneficiaries"
                      icon={<Users className="size-5" />}
                      isActive={false}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-2">
                <span className="font-label text-xs font-bold text-brand">
                  State: Active
                </span>
                <p className="text-xs text-neutral-500">
                  Latar tosca Bondi-50 (#E6F5F6), teks &amp; icon tosca pekat
                  (#00464b).
                </p>
                <div className="pt-2">
                  <NavItem
                    label="Daftar Donasi"
                    icon={<Package className="size-5" />}
                    isActive={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Interactive Sidebar Demo */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Mini Sidebar Demo (Klik Menu)
              </span>
              <span className="text-xs text-neutral-500">
                Aktif:{" "}
                <strong className="text-brand uppercase">
                  {activeNavMenu}
                </strong>
              </span>
            </div>

            <div className="w-full max-w-[280px] rounded-2xl border border-neutral-200 bg-white p-3 shadow-xs space-y-1">
              <p className="px-3 py-1 font-label text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Operasional
              </p>
              <NavItem
                label="Donasi Makanan"
                icon={<Package className="size-5" />}
                isActive={activeNavMenu === "donasi"}
                onClick={() => setActiveNavMenu("donasi")}
              />
              <NavItem
                label="Penerima Manfaat"
                icon={<Users className="size-5" />}
                isActive={activeNavMenu === "beneficiaries"}
                onClick={() => setActiveNavMenu("beneficiaries")}
              />
              <NavItem
                label="Hero Relawan"
                icon={<User className="size-5" />}
                isActive={activeNavMenu === "heroes"}
                onClick={() => setActiveNavMenu("heroes")}
              />
              <NavItem
                label="Mitra Donatur"
                icon={<Utensils className="size-5" />}
                isActive={activeNavMenu === "partner"}
                onClick={() => setActiveNavMenu("partner")}
              />

              <div className="my-2 border-t border-neutral-100" />
              <p className="px-3 py-1 font-label text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Tim &amp; Administrasi
              </p>
              <NavItem
                label="Klaim Reimburse"
                icon={<Receipt className="size-5" />}
                hasChildren={true}
                isActive={activeNavMenu === "reimburse"}
                onClick={() => setActiveNavMenu("reimburse")}
              />
              <NavItem
                label="Riwayat Logs"
                icon={<FileText className="size-5" />}
                hasChildren={true}
                badgeCount={3}
                isActive={activeNavMenu === "logs"}
                onClick={() => setActiveNavMenu("logs")}
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
          2. DOC / BOTTOM NAV ITEM (Node 19:236)
      ========================================================================= */}
        <section
          id="doc-bottom-nav"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 19:236
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  Navigasi Bawah Mobile (Lebar 72px × Tinggi 68px)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                2. Bottom Nav Item
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Navigasi bawah untuk mobile (maksimal 5 item): Home, Donasi,
                Heroes, Reimburse, Menu (membuka drawer berisi menu lainnya).
                Indikator aktif berbentuk pill kuning cerah (bg-accent #ffda57)
                bergaris tinta tebal 1.5px (border-ink #142023).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<BottomNavItem\n  label="Donasi"\n  icon={<Package className="size-5" />}\n  active={true}\n  onClick={() => {}}\n/>`,
                    "bottom-nav-code",
                  )
                }
              >
                {copiedToken === "bottom-nav-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-236"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 2 States Comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 space-y-2">
              <span className="font-label text-xs font-bold text-neutral-600">
                State: Default
              </span>
              <p className="text-xs text-neutral-400">
                Icon neutral-600, teks neutral-600, tanpa pill indicator
              </p>
              <div className="pt-2">
                <BottomNavItem
                  label="Home"
                  icon={<Home className="size-5" />}
                  active={false}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 space-y-2">
              <span className="font-label text-xs font-bold text-neutral-900">
                State: Active (Pill Kuning Tinta)
              </span>
              <p className="text-xs text-neutral-400">
                Pill 56×32px bg-accent + border 1.5px tinta hitam #142023
              </p>
              <div className="pt-2">
                <BottomNavItem
                  label="Home"
                  icon={<Home className="size-5" />}
                  active={true}
                />
              </div>
            </div>
          </div>

          {/* Live Interactive Mobile Bottom Bar Demo */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Live Mockup Bar Bawah Mobile (5 Item Resmi)
              </span>
              <span className="text-xs text-neutral-500">
                Aktif:{" "}
                <strong className="text-neutral-900 uppercase">
                  {activeBottomNav}
                </strong>
              </span>
            </div>

            <div className="mx-auto flex max-w-sm items-center justify-around rounded-3xl border border-neutral-200 bg-white p-2 shadow-sm">
              <BottomNavItem
                label="Home"
                icon={<Home className="size-5" />}
                active={activeBottomNav === "home"}
                onClick={() => setActiveBottomNav("home")}
              />
              <BottomNavItem
                label="Donasi"
                icon={<Package className="size-5" />}
                active={activeBottomNav === "donasi"}
                onClick={() => setActiveBottomNav("donasi")}
              />
              <BottomNavItem
                label="Heroes"
                icon={<Users className="size-5" />}
                active={activeBottomNav === "heroes"}
                onClick={() => setActiveBottomNav("heroes")}
              />
              <BottomNavItem
                label="Reimburse"
                icon={<Receipt className="size-5" />}
                active={activeBottomNav === "reimburse"}
                onClick={() => setActiveBottomNav("reimburse")}
              />
              <BottomNavItem
                label="Menu"
                icon={<MenuIcon className="size-5" />}
                active={activeBottomNav === "menu"}
                onClick={() => setActiveBottomNav("menu")}
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
          3. DOC / MENU & MENU ITEM (Node 21:421)
      ========================================================================= */}
        <section
          id="doc-menu"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 21:421
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  8 Varian Menu Item &amp; Panel Menu 300px
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                3. Menu &amp; Menu Item
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Baris pilihan di dropdown (lebar 260px, tinggi 52px). Plain:
                menu navigasi (Ajukan Reimburse, Data Reimburse, Logs) dan
                pilihan tunggal. Checkbox: multi-select beneficiary. Disabled +
                badge Diblokir: hero yang diblokir di pencarian Tambah Heroes.
                Panel Menu (lebar 300px) dilengkapi kotak pencarian untuk daftar
                &gt;7 item.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Menu searchable searchPlaceholder="Cari beneficiary...">\n  <MenuItem type="checkbox" label="Universitas Gadjah Mada" meta="student" selected={true} />\n</Menu>`,
                    "menu-code",
                  )
                }
              >
                {copiedToken === "menu-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-421"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 8-Variant Matrix Table */}
          <div className="space-y-3">
            <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
              Matriks Varian Menu Item (Plain vs Checkbox × 4 States)
            </h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Plain Menu Items */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
                <span className="font-label text-xs font-bold text-neutral-900 border-b border-neutral-200 pb-2 block">
                  Tipe 1: Plain (Navigasi / Aksi Tunggal)
                </span>
                <div className="space-y-2">
                  <MenuItem
                    type="plain"
                    icon={<Receipt className="size-4" />}
                    label="Ajukan Reimburse"
                    meta="Klaim bensin &amp; operasional"
                  />
                  <div className="bg-[#eef1f2] rounded-xl">
                    <MenuItem
                      type="plain"
                      icon={<FileText className="size-4" />}
                      label="Data Reimburse (Hover)"
                      meta="Laporan riwayat klaim"
                    />
                  </div>
                  <MenuItem
                    type="plain"
                    icon={<Package className="size-4" />}
                    label="Daftar Donasi (Selected)"
                    meta="Menu aktif saat ini"
                    selected={true}
                  />
                  <MenuItem
                    type="plain"
                    icon={<User className="size-4" />}
                    label="Akun Staff (Disabled)"
                    meta="Hak akses terbatas"
                    disabled={true}
                  />
                </div>
              </div>

              {/* Checkbox Menu Items */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
                <span className="font-label text-xs font-bold text-neutral-900 border-b border-neutral-200 pb-2 block">
                  Tipe 2: Checkbox (Multi-select Beneficiary / Filter)
                </span>
                <div className="space-y-2">
                  <MenuItem
                    type="checkbox"
                    label="Panti Asuhan Sinar Melati"
                    meta="Kategori: Panti Asuhan"
                    selected={false}
                  />
                  <div className="bg-[#eef1f2] rounded-xl">
                    <MenuItem
                      type="checkbox"
                      label="Komunitas Dapur Berkah (Hover)"
                      meta="Kategori: Komunitas Dhuafa"
                      selected={false}
                    />
                  </div>
                  <MenuItem
                    type="checkbox"
                    label="Universitas Gadjah Mada (Selected)"
                    meta="Kategori: Kantin Mahasiswa"
                    selected={true}
                  />
                  <div className="relative">
                    <MenuItem
                      type="checkbox"
                      label="Hero Donatur (Disabled)"
                      meta="Pelanggaran SOP donasi"
                      disabled={true}
                    />
                    <div className="absolute right-3 top-3">
                      <Badge tone="danger" styleVariant="soft" dot>
                        Diblokir
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Interactive Menu Panel Demo */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Interactive Live Menu Panel (Lebar 300px Sesuai Figma)
              </span>
              <span className="text-xs text-neutral-500">
                Terpilih:{" "}
                <strong>{selectedBeneficiaries.length} Lembaga</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Menu Dropdown Container */}
              <div className="w-[300px] rounded-2xl border border-neutral-200 bg-white p-2 shadow-[0px_8px_16px_rgba(20,32,35,0.12)] space-y-2">
                {/* Search Bar in Menu */}
                <div className="relative flex items-center rounded-xl bg-neutral-100 px-3 py-2">
                  <Search className="size-4 text-neutral-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    placeholder="Cari beneficiary..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
                  />
                </div>

                {/* Items List */}
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  <MenuItem
                    type="checkbox"
                    label="Universitas Gadjah Mada"
                    meta="student · Sleman"
                    selected={selectedBeneficiaries.includes("ugm")}
                    onSelect={() => toggleBeneficiary("ugm")}
                  />
                  <MenuItem
                    type="checkbox"
                    label="Yayasan Hamba"
                    meta="foundation · Pakem"
                    selected={selectedBeneficiaries.includes("yayasan-hamba")}
                    onSelect={() => toggleBeneficiary("yayasan-hamba")}
                  />
                  <MenuItem
                    type="checkbox"
                    label="Masyarakat Umum Maguwo"
                    meta="society · Depok"
                    selected={selectedBeneficiaries.includes("masyarakat")}
                    onSelect={() => toggleBeneficiary("masyarakat")}
                  />
                  <MenuItem
                    type="checkbox"
                    label="BRSPA D.I. Yogyakarta"
                    meta="foundation · Kasihan"
                    selected={selectedBeneficiaries.includes("brspa")}
                    onSelect={() => toggleBeneficiary("brspa")}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3 rounded-2xl border border-neutral-200 bg-white p-5">
                <h5 className="font-label text-sm font-semibold text-neutral-900">
                  Lembaga yang Terpilih:
                </h5>
                {selectedBeneficiaries.length === 0 ? (
                  <p className="text-xs text-neutral-400">
                    Belum ada lembaga yang dipilih. Centang salah satu pilihan
                    pada menu dropdown di samping.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedBeneficiaries.map((id) => (
                      <Badge key={id} tone="brand" styleVariant="soft" dot>
                        {id.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
          4. DOC / MODAL (Node 20:265)
      ========================================================================= */}
        <section
          id="doc-modal"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 20:265
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  2 Tone Resmi (Default &amp; Danger)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                4. Modal (Dialog)
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Dialog konfirmasi (lebar 440px, rounded-3xl 24px). Tone Danger
                dipakai untuk semua aksi hapus (donasi, surplus food,
                beneficiary, sponsor, hero, volunteer, reimburse) dengan tombol
                Hapus merah. Sebut nama objek di pesan. Saat request berjalan,
                tombol konfirmasi masuk State Loading. Overlay:
                bg-neutral-900/50.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Dialog\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  tone="danger"\n  title="Hapus Donasi Makanan?"\n  description="Apakah Anda yakin ingin menghapus donasi dari Royal Ambarrukmo? Tindakan ini tidak dapat dibatalkan."\n  confirmText="Hapus Donasi"\n  onConfirm={() => {}}\n/>`,
                    "dialog-code",
                  )
                }
              >
                {copiedToken === "dialog-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-265"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 2 Tones Static Showcase */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Tone 1: Default */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 space-y-4">
              <span className="font-label text-xs font-bold text-brand uppercase tracking-wider">
                1. Tone: Default (Konfirmasi Biasa / Simpan)
              </span>
              <div className="rounded-[24px] border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-bondi-50 text-brand flex items-center justify-center shrink-0">
                    <HelpCircle className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading-h3 text-lg font-bold text-neutral-900">
                      Konfirmasi Penyaluran Makanan
                    </h4>
                    <p className="font-body-m text-xs text-neutral-600">
                      Apakah Anda yakin ingin menyelesaikan penyaluran 75 porsi
                      ke Panti Asuhan Sinar Melati?
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button variant="secondary" size="md">
                    Batal
                  </Button>
                  <Button variant="primary" size="md">
                    Simpan Penyaluran
                  </Button>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
                onClick={() => setIsDefaultModalOpen(true)}
              >
                Buka Live Modal Default
              </Button>
            </div>

            {/* Tone 2: Danger */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 space-y-4">
              <span className="font-label text-xs font-bold text-red-600 uppercase tracking-wider">
                2. Tone: Danger (Penghapusan / Pembatalan)
              </span>
              <div className="rounded-[24px] border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <AlertTriangle className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading-h3 text-lg font-bold text-neutral-900">
                      Hapus Data Donasi Makanan?
                    </h4>
                    <p className="font-body-m text-xs text-neutral-600">
                      Tindakan ini akan menghapus data donasi Hotel Tentrem
                      secara permanen dan tidak dapat dibatalkan.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button variant="secondary" size="md">
                    Batal
                  </Button>
                  <Button variant="danger" size="md">
                    Hapus Permanen
                  </Button>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                className="w-full justify-center"
                onClick={() => setIsDangerModalOpen(true)}
              >
                Buka Live Modal Danger
              </Button>
            </div>
          </div>

          {/* Live Controlled Modals */}
          <Dialog
            isOpen={isDefaultModalOpen}
            onClose={() => setIsDefaultModalOpen(false)}
            tone="default"
            title="Konfirmasi Penyaluran Donasi"
            description="Apakah Anda yakin data donasi ini telah diterima dengan baik oleh perwakilan lembaga penerima?"
            confirmText="Simpan"
            isConfirmLoading={isModalLoading}
            onConfirm={() => handleConfirmAction(false)}
          />

          <Dialog
            isOpen={isDangerModalOpen}
            onClose={() => setIsDangerModalOpen(false)}
            tone="danger"
            title="Hapus Data Donasi Permanen?"
            description="Donasi nomor #DON-2026-081 akan dihapus permanen dari sistem dan seluruh laporan rekapitulasi."
            confirmText="Hapus Sekarang"
            isConfirmLoading={isModalLoading}
            onConfirm={() => handleConfirmAction(true)}
          />
        </section>

        {/* =========================================================================
          5. DOC / TOAST (Node 20:312) - MENINDIH SONNER
      ========================================================================= */}
        <section
          id="doc-toast"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 20:312
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  4 Tone Resmi (Tinta Gelap #142023 · Menindih Sonner)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                5. Toast (Notifikasi Pop-up)
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Notifikasi sementara setelah aksi (simpan, hapus, gagal). Muncul
                di kanan atas (desktop) atau atas tengah (mobile), hilang
                otomatis 4 detik, error tetap sampai ditutup. Berlatar belakang
                warna tinta gelap pekat (#142023) dengan icon badge bulat 28px
                dan teks putih. Komponen ini menindih Sonner bawaan sehingga
                seluruh pemanggilan{" "}
                <code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                  toast.success()
                </code>
                ,{" "}
                <code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                  toast.error()
                </code>{" "}
                otomatis merender tampilan BBJ ini.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `toast.success("Donasi berhasil disimpan", {\n  action: {\n    label: "Lihat",\n    onClick: () => {}\n  }\n});`,
                    "toast-code",
                  )
                }
              >
                {copiedToken === "toast-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-312"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 4 Tone Static Visual Preview */}
          <div className="space-y-3">
            <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
              Preview Desain 4 Tone Toast BBJ (Lebar 380px)
            </h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[820px]">
              {/* Success Toast */}
              <div className="space-y-1.5">
                <span className="font-label text-xs font-semibold text-green-700">
                  Tone: Success (Simpan / Berhasil)
                </span>
                <Toast
                  tone="success"
                  message="Data donasi berhasil disimpan"
                  actionLabel="Lihat"
                  onAction={() => {}}
                  onClose={() => {}}
                />
              </div>

              {/* Error Toast */}
              <div className="space-y-1.5">
                <span className="font-label text-xs font-semibold text-red-600">
                  Tone: Error (Gagal / Dihapus)
                </span>
                <Toast
                  tone="error"
                  message="Gagal memproses unggahan invoice"
                  actionLabel="Coba Lagi"
                  onAction={() => {}}
                  onClose={() => {}}
                />
              </div>

              {/* Warning Toast */}
              <div className="space-y-1.5">
                <span className="font-label text-xs font-semibold text-orange-600">
                  Tone: Warning (Peringatan Kuota)
                </span>
                <Toast
                  tone="warning"
                  message="Kuota relawan hero hampir penuh"
                  onClose={() => {}}
                />
              </div>

              {/* Info Toast */}
              <div className="space-y-1.5">
                <span className="font-label text-xs font-semibold text-blue-600">
                  Tone: Info (Pemberitahuan Sistem)
                </span>
                <Toast
                  tone="info"
                  message="Sesi login diperbarui otomatis"
                  onClose={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Interactive Toast Triggers */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Pemicu Notifikasi Toast Nyata (Sonner Override)
                </span>
                <p className="text-xs text-neutral-500">
                  Klik salah satu tombol di bawah untuk memunculkan Toast di
                  pojok kanan atas layar!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() =>
                  toast.success("Donasi 120 porsi berhasil dikonfirmasi!", {
                    action: {
                      label: "Lihat Detail",
                      onClick: () => toast.info("Membuka detail donasi..."),
                    },
                  })
                }
              >
                <CheckCircle2 className="size-4" />
                <span>Trigger Toast Success</span>
              </Button>

              <Button
                variant="danger"
                size="md"
                onClick={() =>
                  toast.error("Gagal menghubungkan ke server API BBJ.", {
                    action: {
                      label: "Coba Lagi",
                      onClick: () => toast.info("Menghubungi ulang server..."),
                    },
                  })
                }
              >
                <XCircle className="size-4" />
                <span>Trigger Toast Error</span>
              </Button>

              <Button
                variant="accent"
                size="md"
                onClick={() =>
                  toast.warning("Kuota penjemputan tersisa 2 hero relawan!")
                }
              >
                <AlertTriangle className="size-4" />
                <span>Trigger Toast Warning</span>
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() =>
                  toast.info("Surplus food baru telah ditambahkan oleh mitra.")
                }
              >
                <Info className="size-4" />
                <span>Trigger Toast Info</span>
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
          6. DOC / ALERT (Node 20:359)
      ========================================================================= */}
        <section
          id="doc-alert"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 20:359
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  4 Tone Resmi (Lebar 480px · Banner Inline Menetap)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                6. Alert
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Banner inline yang menetap di halaman: error login
                (not_registered, unauthorized_role, session_expired), hasil
                validasi form di atas formulir, penolakan invoice AI, peringatan
                kuota. Dilengkapi judul Inter SemiBold 14px dan deskripsi
                Josefin Sans Regular 12px.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Alert\n  tone="danger"\n  title="Gagal Mengunggah Berkas"\n  description="Format berkas harus PDF, PNG, atau JPG maksimal 5 MB."\n  onClose={() => {}}\n/>`,
                    "alert-code",
                  )
                }
              >
                {copiedToken === "alert-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-359"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 4 Tone Alert Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Info */}
              {!alertDismissed.info && (
                <Alert
                  tone="info"
                  title="Pembaruan Jadwal Penjemputan"
                  description="Penjemputan makanan surplus wilayah Sleman dialihkan ke pukul 19:30 WIB."
                  onClose={() =>
                    setAlertDismissed((prev) => ({ ...prev, info: true }))
                  }
                />
              )}

              {/* Success */}
              {!alertDismissed.success && (
                <Alert
                  tone="success"
                  title="Validasi Akun Mitra Berhasil"
                  description="Akun mitra donatur Anda telah terverifikasi untuk menyalurkan surplus makanan."
                  onClose={() =>
                    setAlertDismissed((prev) => ({ ...prev, success: true }))
                  }
                />
              )}

              {/* Warning */}
              {!alertDismissed.warning && (
                <Alert
                  tone="warning"
                  title="Peringatan Kuota Bulanan"
                  description="Lembaga telah mencapai 90% dari batas alokasi makanan bulan November."
                  onClose={() =>
                    setAlertDismissed((prev) => ({ ...prev, warning: true }))
                  }
                />
              )}

              {/* Danger */}
              {!alertDismissed.danger && (
                <Alert
                  tone="danger"
                  title="Akses Ditolak (Unauthorized Role)"
                  description="Anda tidak memiliki izin Super Admin untuk mengakses pengaturan log audit."
                  onClose={() =>
                    setAlertDismissed((prev) => ({ ...prev, danger: true }))
                  }
                />
              )}
            </div>

            {(alertDismissed.info ||
              alertDismissed.success ||
              alertDismissed.warning ||
              alertDismissed.danger) && (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setAlertDismissed({
                      info: false,
                      success: false,
                      warning: false,
                      danger: false,
                    })
                  }
                >
                  <RotateCcw className="size-3.5" />
                  <span>Tampilkan Kembali Semua Alert</span>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
          7. DOC / TOOLTIP (Node 20:371)
      ========================================================================= */}
        <section
          id="doc-tooltip"
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                  Node 20:371
                </span>
                <span className="text-neutral-300">•</span>
                <span className="font-label text-xs font-semibold text-neutral-500">
                  2 Placement Resmi (Top &amp; Bottom)
                </span>
              </div>
              <h3 className="font-heading-h2 text-xl font-bold text-neutral-900 sm:text-2xl">
                7. Tooltip
              </h3>
              <p className="font-body-m max-w-3xl text-sm text-neutral-600">
                Label singkat untuk tombol ikon (lihat, edit, hapus, FAB) yang
                muncul saat hover atau long-press. Box berlatar belakang warna
                tinta gelap (#142023) dengan panah segitiga 12×6px mengarah ke
                elemen target. Placement Top dan Placement Bottom.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onCopy(
                    `<Tooltip content="Lihat Detail Donasi" placement="top">\n  <IconButton aria-label="Lihat">\n    <Eye className="size-4" />\n  </IconButton>\n</Tooltip>`,
                    "tooltip-code",
                  )
                }
              >
                {copiedToken === "tooltip-code" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>Salin Tag</span>
              </Button>
              <a
                href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-371"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                title="Lihat di Figma"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* 2 Placements Comparison */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Top Placement */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 space-y-4">
              <span className="font-label text-xs font-bold text-neutral-900">
                1. Placement: Top (Panah di Bawah)
              </span>
              <div className="pt-6">
                <Tooltip
                  content="Edit Data Lembaga"
                  placement="top"
                  isOpen={true}
                >
                  <IconButton aria-label="Edit" variant="secondary" size="md">
                    <Pencil className="size-4" />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="text-xs text-neutral-500 text-center pt-2">
                (Preview statis terbuka: kotak #142023 + panah 12×6px ke bawah)
              </p>
            </div>

            {/* Bottom Placement */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 space-y-4">
              <span className="font-label text-xs font-bold text-neutral-900">
                2. Placement: Bottom (Panah di Atas)
              </span>
              <div className="pb-6">
                <Tooltip
                  content="Hapus Permanen"
                  placement="bottom"
                  isOpen={true}
                >
                  <IconButton aria-label="Hapus" variant="danger" size="md">
                    <Trash2 className="size-4 text-red-600" />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="text-xs text-neutral-500 text-center pt-2">
                (Preview statis terbuka: panah 12×6px ke atas + kotak #142023)
              </p>
            </div>
          </div>

          {/* Live Interactive Hover Demo */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
                Uji Coba Hover Tooltip pada Tombol Aksi
              </span>
              <span className="text-xs text-neutral-500">
                Arahkan kursor mouse ke tombol ikon berikut
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-neutral-200 bg-white p-6">
              <Tooltip content="Lihat Detail Donasi (Top)" placement="top">
                <IconButton aria-label="Lihat" variant="ghost" size="md">
                  <Eye className="size-4" />
                </IconButton>
              </Tooltip>

              <Tooltip content="Ubah Informasi (Top)" placement="top">
                <IconButton aria-label="Edit" variant="secondary" size="md">
                  <Pencil className="size-4" />
                </IconButton>
              </Tooltip>

              <Tooltip
                content="Tambah Donatur Baru (Bottom)"
                placement="bottom"
              >
                <IconButton aria-label="Tambah" variant="primary" size="md">
                  <Plus className="size-4" />
                </IconButton>
              </Tooltip>

              <Tooltip content="Hapus dari Daftar (Bottom)" placement="bottom">
                <IconButton aria-label="Hapus" variant="danger" size="md">
                  <Trash2 className="size-4 text-red-600" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
