import * as React from "react";
import {
  FileText,
  Navigation,
  Package,
  Receipt,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { NavItem } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface NavItemBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * NavItemBlock: Dokumentasi item navigasi sidebar sistem BBJ (Node 19:220).
 * Menampilkan matriks status Figma (Default, Hover, Active) dan mini sidebar interaktif.
 */
export function NavItemBlock({ onCopy, copiedToken }: NavItemBlockProps) {
  const [activeNavMenu, setActiveNavMenu] = React.useState<string>("donasi");

  return (
    <DocBlock
      id="doc-nav-item"
      nodeId="Node 19:220"
      title="1. Nav Item"
      subtitle="src/components/shared/nav-item.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`<NavItem\n  label="Donasi"\n  icon={<Package className="size-5" />}\n  isActive={true}\n  onClick={() => {}}\n/>`}
      copyTokenKey="nav-item-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-220"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Item navigasi sidebar desktop (lebar 240px, tinggi minimal 40px).
        Kelompok menu: Utama (Home, Gallery), Operasional (Donasi,
        Beneficiaries, Heroes, Partner), Tim (Volunteer, Presensi, Reimburse),
        Admin (Logs, khusus super). Chevron untuk item dropdown (Reimburse,
        Logs). Menu yang tidak berhak dilihat disembunyikan, bukan
        dinonaktifkan.
      </p>

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
              <div className="bg-neutral-100 rounded-xl">
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
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Mini Sidebar Demo (Klik Menu)
          </span>
          <span className="text-xs text-neutral-500">
            Aktif:{" "}
            <strong className="text-brand uppercase">{activeNavMenu}</strong>
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
    </DocBlock>
  );
}
