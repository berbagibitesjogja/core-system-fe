import * as React from "react";
import {
  Home,
  Menu as MenuIcon,
  Navigation,
  Package,
  Receipt,
  Users,
} from "lucide-react";
import { BottomNavItem } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface BottomNavBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * BottomNavBlock: Dokumentasi navigasi bawah mobile sistem BBJ (Node 19:236).
 * Menampilkan status default vs aktif (pill kuning cerah bergaris tinta tebal 1.5px),
 * serta mockup bar bawah interaktif.
 */
export function BottomNavBlock({ onCopy, copiedToken }: BottomNavBlockProps) {
  const [activeBottomNav, setActiveBottomNav] = React.useState<string>("home");

  return (
    <DocBlock
      id="doc-bottom-nav"
      nodeId="Node 19:236"
      title="2. Bottom Nav Item"
      subtitle="src/components/shared/bottom-nav-item.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`<BottomNavItem\n  label="Donasi"\n  icon={<Package className="size-5" />}\n  active={true}\n  onClick={() => {}}\n/>`}
      copyTokenKey="bottom-nav-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=19-236"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Navigasi bawah untuk mobile (maksimal 5 item): Home, Donasi, Heroes,
        Reimburse, Menu (membuka drawer berisi menu lainnya). Indikator aktif
        berbentuk pill kuning cerah (bg-accent #ffda57) bergaris tinta tebal
        1.5px (border-ink #142023).
      </p>

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
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
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
    </DocBlock>
  );
}
