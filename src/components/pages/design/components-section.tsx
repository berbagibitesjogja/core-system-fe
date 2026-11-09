import * as React from "react";
import {
  Box,
  Check,
  Compass,
  Copy,
  Heart,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  Package,
  Plus,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Dialog,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
} from "#/components/ui";
import {
  BottomNavItem,
  EmptyState,
  NavItem,
  Pagination,
  StatCard,
} from "#/components/shared";

export interface ComponentsSectionProps {
  onCopy: (text: string, id?: string) => void;
  copiedToken: string | null;
}

export function ComponentsSection({
  onCopy,
  copiedToken,
}: ComponentsSectionProps) {
  const [activeBottomNav, setActiveBottomNav] = React.useState(0);
  const [menuSearch, setMenuSearch] = React.useState("");
  const [menuSelectedId, setMenuSelectedId] = React.useState("beras");
  const [menuCheckedItems, setMenuCheckedItems] = React.useState({
    halal: true,
    dingin: false,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDangerDialogOpen, setIsDangerDialogOpen] = React.useState(false);

  const handleTestToast = (tone: "success" | "error" | "warning" | "info") => {
    switch (tone) {
      case "success":
        toast.success("Donasi berhasil dikonfirmasi!");
        break;
      case "error":
        toast.error("Gagal menyimpan perubahan donasi.");
        break;
      case "warning":
        toast.warning("Kuota relawan hero hampir penuh.");
        break;
      case "info":
        toast.info("Sesi diperbarui otomatis dari server.");
        break;
    }
  };

  return (
    <section className="space-y-12 animate-in fade-in duration-200">
      {/* Section Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold shadow-2xs">
            <Box className="size-5 text-[#ff8c00]" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block">
              Figma Category · Data Display, Navigation &amp; Feedback
            </span>
            <h2 className="font-heading-h2 text-[#142023]">
              Shared UI Components Library
            </h2>
          </div>
        </div>
        <span className="text-xs text-neutral-500 font-mono bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
          Node 17:197 - 21:421 · 6 Kategori Komponen
        </span>
      </div>

      <div className="space-y-10">
        {/* =============================================================
            1. FIGMA DOC: BADGES & AVATARS (Node 17:197 & 17:237)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-197
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
                    1. Badges &amp; Avatars
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 17:197 &amp; 17:237
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/badge.tsx &amp; src/components/ui/avatar.tsx
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopy(
                  '<Badge tone="brand" styleVariant="soft">Aktif</Badge>',
                  "badge-code",
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedToken === "badge-code" ? (
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
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Badge status dalam 7 varian tone warna semantik (Soft &amp; Solid
            style) dan Avatar profil (Small 32px, Medium 40px, Large 64px;
            bentuk circle &amp; rounded).
          </p>

          {/* Soft Badges */}
          <div className="space-y-2">
            <span className="font-label-s text-neutral-500 block">
              Badges (Soft Style):
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral" styleVariant="soft">
                Neutral
              </Badge>
              <Badge tone="brand" styleVariant="soft">
                Bondi / Brand
              </Badge>
              <Badge tone="accent" styleVariant="soft">
                Sunny / Accent
              </Badge>
              <Badge tone="success" styleVariant="soft">
                Selesai (Success)
              </Badge>
              <Badge tone="warning" styleVariant="soft">
                Menunggu (Warning)
              </Badge>
              <Badge tone="danger" styleVariant="soft">
                Dibatalkan (Danger)
              </Badge>
              <Badge tone="info" styleVariant="soft">
                Dalam Proses (Info)
              </Badge>
            </div>
          </div>

          {/* Solid Badges */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="font-label-s text-neutral-500 block">
              Badges (Solid Style):
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral" styleVariant="solid">
                Neutral
              </Badge>
              <Badge tone="brand" styleVariant="solid">
                Brand
              </Badge>
              <Badge tone="accent" styleVariant="solid">
                Accent
              </Badge>
              <Badge tone="success" styleVariant="solid">
                Success
              </Badge>
              <Badge tone="warning" styleVariant="solid">
                Warning
              </Badge>
              <Badge tone="danger" styleVariant="solid">
                Danger
              </Badge>
              <Badge tone="info" styleVariant="solid">
                Info
              </Badge>
            </div>
          </div>

          {/* Avatars */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="font-label-s text-neutral-500 block">
              Avatars (Small 32px, Medium 40px, Large 64px · Circle &amp;
              Rounded):
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Avatar name="Kurnia Dwi" size="sm" shape="circle" />
                <Avatar name="Hotel Tentrem" size="sm" shape="rounded" />
              </div>
              <div className="flex items-center gap-3">
                <Avatar name="Budi Santoso" size="md" shape="circle" />
                <Avatar name="Panti Asuhan" size="md" shape="rounded" />
              </div>
              <div className="flex items-center gap-3">
                <Avatar name="Admin BBJ" size="lg" shape="circle" />
                <Avatar name="Mitra Hotel" size="lg" shape="rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================
            2. FIGMA DOC: STAT CARDS (Node 19:189)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-189
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
                    2. Stat Cards
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 19:189
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/stat-card.tsx
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopy(
                  '<StatCard title="Total Donasi" value="1.240" unit="Paket" styleVariant="brand" />',
                  "statcard-code",
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedToken === "statcard-code" ? (
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
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Kartu statistik metrik ringkasan dashboard dengan tren
            kenaikan/penurunan (Default, Brand tosca, dan Accent sunny).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              styleVariant="default"
              title="Total Donasi Masuk"
              value="1.240"
              unit="Paket"
              icon={<Package className="size-5" />}
              trend={{
                value: "+14%",
                isPositive: true,
                label: "dari bulan lalu",
              }}
            />
            <StatCard
              styleVariant="brand"
              title="Surplus Food Diselamatkan"
              value="3.077"
              unit="Kg"
              icon={<Utensils className="size-5" />}
              trend={{
                value: "+8.2%",
                isPositive: true,
                label: "efisiensi tinggi",
              }}
            />
            <StatCard
              styleVariant="accent"
              title="Relawan Hero Aktif"
              value="48"
              unit="Orang"
              icon={<Users className="size-5" />}
              trend={{
                value: "+6 hero",
                isPositive: true,
                label: "minggu ini",
              }}
            />
          </div>
        </div>

        {/* =============================================================
            3. FIGMA DOC: SKELETONS & LOADING STATES (Node 20:378)
            https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=20-378
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
                    3. Skeletons &amp; Loading States
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 20:378
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/skeleton.tsx
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopy(
                  '<Skeleton shape="text" className="w-1/3" />',
                  "skeleton-code",
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedToken === "skeleton-code" ? (
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
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Placeholder skeleton animasi pulsa halus saat pemuatan data asinkron
            (Text, Circle, dan Block).
          </p>

          <div className="space-y-4">
            <span className="font-label-s text-neutral-500 block">
              Skeleton Loading Variations:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
                <div className="flex items-center gap-3">
                  <Skeleton shape="circle" className="size-12" />
                  <div className="space-y-2 flex-1">
                    <Skeleton shape="text" className="w-1/3 h-4" />
                    <Skeleton shape="text" className="w-2/3 h-3" />
                  </div>
                </div>
                <Skeleton shape="block" className="h-16 rounded-xl" />
              </div>

              <div className="space-y-3 p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
                <div className="flex justify-between items-center">
                  <Skeleton shape="text" className="w-24 h-4" />
                  <Skeleton shape="text" className="w-16 h-4" />
                </div>
                <Skeleton shape="block" className="h-2 rounded-full" />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Skeleton shape="block" className="h-8 rounded-lg" />
                  <Skeleton shape="block" className="h-8 rounded-lg" />
                  <Skeleton shape="block" className="h-8 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================
            4. FIGMA DOC: NAVIGATION (Node 19:220, 19:236 & 21:421)
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
                    4. Navigation (Sidebar, Bottom Nav, &amp; Menu)
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 19:220, 19:236 &amp; 21:421
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/nav-item.tsx, bottom-nav-item.tsx &amp;
                  src/components/ui/menu.tsx
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopy(
                  '<NavItem icon={<LayoutDashboard className="size-4" />} label="Dashboard" isActive />',
                  "navitem-code",
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedToken === "navitem-code" ? (
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
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Menu sidebar desktop dengan pill badge counter, bottom navigation
            bar mobile (72x68px target sentuh), dan floating menu list dengan
            filter pencarian.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Sidebar Nav Items */}
            <div className="space-y-3">
              <span className="font-label-s text-neutral-500 block">
                Desktop Nav Items:
              </span>
              <div className="space-y-1 p-3 rounded-2xl border border-neutral-200 bg-white shadow-xs">
                <NavItem
                  icon={<LayoutDashboard className="size-4" />}
                  label="Dashboard Overview"
                  isActive
                />
                <NavItem
                  icon={<Package className="size-4" />}
                  label="Kelola Donasi"
                  badgeCount={8}
                />
                <NavItem
                  icon={<Heart className="size-4" />}
                  label="Relawan Heroes"
                  badgeCount={3}
                />
                <NavItem
                  icon={<Compass className="size-4" />}
                  label="Peta Penjemputan"
                />
              </div>
            </div>

            {/* Bottom Nav Mobile */}
            <div className="space-y-3">
              <span className="font-label-s text-neutral-500 block">
                Mobile Bottom Nav Items (72x68):
              </span>
              <div className="flex items-center justify-around p-2 rounded-2xl border border-neutral-200 bg-white shadow-xs">
                <BottomNavItem
                  icon={<Home className="size-5" />}
                  label="Beranda"
                  active={activeBottomNav === 0}
                  onClick={() => setActiveBottomNav(0)}
                />
                <BottomNavItem
                  icon={<Package className="size-5" />}
                  label="Donasi"
                  active={activeBottomNav === 1}
                  onClick={() => setActiveBottomNav(1)}
                />
                <BottomNavItem
                  icon={<User className="size-5" />}
                  label="Profil"
                  active={activeBottomNav === 2}
                  onClick={() => setActiveBottomNav(2)}
                />
              </div>
            </div>

            {/* Menu Dropdown */}
            <div className="space-y-3">
              <span className="font-label-s text-neutral-500 block">
                Menu Dropdown (Plain &amp; Checkbox):
              </span>
              <Menu
                searchable
                searchValue={menuSearch}
                onSearchChange={setMenuSearch}
                className="w-full"
              >
                <MenuItem
                  label="Beras &amp; Sembako"
                  meta="Stok mencukupi"
                  icon={<Package className="size-4" />}
                  selected={menuSelectedId === "beras"}
                  onSelect={() => setMenuSelectedId("beras")}
                />
                <MenuItem
                  label="Makanan Siap Santap"
                  meta="Prioritas hari ini"
                  icon={<Utensils className="size-4" />}
                  selected={menuSelectedId === "siap-santap"}
                  onSelect={() => setMenuSelectedId("siap-santap")}
                />
                <MenuItem
                  type="checkbox"
                  label="Kategori Halal"
                  meta="Tervalidasi"
                  selected={menuCheckedItems.halal}
                  onSelect={() =>
                    setMenuCheckedItems((prev) => ({
                      ...prev,
                      halal: !prev.halal,
                    }))
                  }
                />
                <MenuItem
                  type="checkbox"
                  label="Butuh Pendingin"
                  meta="Suhu 4°C"
                  selected={menuCheckedItems.dingin}
                  onSelect={() =>
                    setMenuCheckedItems((prev) => ({
                      ...prev,
                      dingin: !prev.dingin,
                    }))
                  }
                />
                <MenuItem
                  label="Menu Terkunci"
                  meta="Hanya koordinator"
                  disabled
                />
              </Menu>
            </div>
          </div>
        </div>

        {/* =============================================================
            5. FIGMA DOC: FEEDBACK (Node 20:265, 20:312, 20:359 & 20:371)
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
                    5. Feedback (Toasts, Tooltips, Alerts, &amp; Modals)
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 20:265 - 20:371
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/ui/alert.tsx, dialog.tsx, tooltip.tsx
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopy(
                  '<Alert tone="info" title="Pemberitahuan">Isi pengumuman...</Alert>',
                  "alert-code",
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedToken === "alert-code" ? (
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
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Komponen feedback pengguna: Toast banner 4 status warna, tooltip
            penjelas dengan panah presisi, banner alert, dan modal dialog
            konfirmasi.
          </p>

          {/* Toasts Preview */}
          <div className="space-y-3">
            <span className="font-label-s text-neutral-500 block">
              Simulasi Toast Notifications:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTestToast("success")}
              >
                Toast Sukses
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTestToast("warning")}
              >
                Toast Warning
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTestToast("error")}
              >
                Toast Gagal
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTestToast("info")}
              >
                Toast Info
              </Button>
            </div>
          </div>

          {/* Tooltips */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <span className="font-label-s text-neutral-500 block">
              Tooltips (Arahkan kursor ke tombol untuk melihat):
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip
                content="Tooltip Atas: Informasi bantuan"
                placement="top"
              >
                <Button variant="secondary" size="sm">
                  <HelpCircle className="size-4" /> Tooltip Top
                </Button>
              </Tooltip>
              <Tooltip
                content="Tooltip Bawah: Pengaturan lanjutan"
                placement="bottom"
              >
                <Button variant="secondary" size="sm">
                  <Info className="size-4" /> Tooltip Bottom
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <span className="font-label-s text-neutral-500 block">
              Alert Banners:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert tone="info" title="Pemberitahuan Sistem">
                Penjemputan terjadwal otomatis akan ditutup pukul 17:00 WIB.
              </Alert>
              <Alert tone="success" title="Aksi Berhasil">
                Donasi #BBJ-982 telah diterima oleh relawan di lokasi.
              </Alert>
              <Alert tone="warning" title="Perhatian">
                Makanan siap saji harus didistribusikan dalam waktu maksimal 4
                jam.
              </Alert>
              <Alert tone="danger" title="Donasi Kedaluwarsa">
                Donasi ini melewati batas waktu aman konsumsi dan dibatalkan.
              </Alert>
            </div>
          </div>

          {/* Modals Trigger */}
          <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-label-m text-neutral-900 block font-bold">
                Modal Dialog Interaktif
              </span>
              <span className="font-body-s text-neutral-500">
                Dialog konfirmasi tindakan aksi biasa dan aksi berbahaya
                (Danger).
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                Buka Modal Default
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setIsDangerDialogOpen(true)}
              >
                Buka Modal Danger
              </Button>
            </div>
          </div>
        </div>

        {/* =============================================================
            6. FIGMA DOC: EMPTY STATE & PAGINATION (Node 21:287 & 19:308)
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
                    6. Empty State &amp; Pagination
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Node 21:287 &amp; 19:308
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  src/components/shared/empty-state.tsx &amp;
                  src/components/shared/pagination.tsx
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopy(
                  "<Pagination currentPage={1} totalPages={8} onPageChange={setPage} />",
                  "pagination-code",
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedToken === "pagination-code" ? (
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
          </div>

          <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
            Tampilan visual saat tabel data kosong (Default &amp; Compact) dan
            kontrol penomoran halaman data (Pagination bar).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState
              size="default"
              title="Belum Ada Donasi Hari Ini"
              description="Belum ada donasi makanan surplus yang terdaftar untuk penjemputan hari ini."
              action={
                <Button size="md" variant="primary">
                  <Plus className="size-4" /> Tambah Donasi Baru
                </Button>
              }
            />
            <EmptyState
              size="compact"
              title="Tidak Ada Riwayat"
              description="Pencarian tidak menemukan hasil yang sesuai."
              action={
                <Button size="sm" variant="secondary">
                  Reset Filter
                </Button>
              }
            />
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <span className="font-label-s text-neutral-500 block mb-2">
              Pagination Bar:
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Test Dialogs */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Konfirmasi Penjemputan Makanan"
        description="Apakah Anda yakin ingin menugaskan relawan hero untuk menjemput donasi di Hotel Tentrem Yogyakarta?"
        confirmText="Tugaskan Hero"
        onConfirm={() => {
          setIsDialogOpen(false);
          toast.success("Relawan hero berhasil ditugaskan!");
        }}
      >
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-sans text-neutral-700 space-y-1">
          <div>
            <strong>Lokasi:</strong> Jl. P. Mangkubumi No.72, Cokrodiningratan
          </div>
          <div>
            <strong>Estimasi Muatan:</strong> 75 Porsi (~22 Kg)
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={isDangerDialogOpen}
        onClose={() => setIsDangerDialogOpen(false)}
        tone="danger"
        title="Hapus Data Donasi"
        description="Tindakan ini tidak dapat dibatalkan. Riwayat donasi ini akan dihapus secara permanen dari server."
        confirmText="Hapus Permanen"
        onConfirm={() => {
          setIsDangerDialogOpen(false);
          toast.error("Data donasi telah dihapus permanen.");
        }}
      />
    </section>
  );
}
